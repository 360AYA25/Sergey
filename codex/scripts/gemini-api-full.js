#!/usr/bin/env node

/**
 * Gemini API with full MCP function calling support
 * Dynamically loads all n8n-MCP tools and uses Gemini function calling
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { spawn } = require('child_process');

// Configuration
// IMPORTANT: All credentials MUST be set in environment variables
// Load from ~/credentials/.env or set in shell
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-pro';
const N8N_API_URL = process.env.N8N_URL;
const N8N_API_KEY = process.env.N8N_API_KEY;
const MAX_ITERATIONS = 10;

// Validate required environment variables
if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is required');
  console.error('Set it in ~/credentials/.env or export GEMINI_API_KEY="your-key"');
  process.exit(1);
}
if (!N8N_API_URL || !N8N_API_KEY) {
  console.error('Error: N8N_URL and N8N_API_KEY environment variables are required');
  console.error('Set them in ~/credentials/.env');
  process.exit(1);
}

// Get prompt from command line
const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.error('Error: No prompt provided');
  console.error('Usage: node gemini-api-full.js "your prompt here"');
  process.exit(1);
}

// MCP Client with full tool support
class MCPClient {
  constructor() {
    this.process = null;
    this.tools = new Map();
    this.ready = false;
    this.messageId = 1;
    this.pendingRequests = new Map();
    this.buffer = '';
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.process = spawn('npx', ['n8n-mcp'], {
        env: {
          ...process.env,
          N8N_API_URL,
          N8N_API_KEY,
          MCP_MODE: 'stdio',
          LOG_LEVEL: 'error',
          DISABLE_CONSOLE_OUTPUT: 'true'
        },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      this.process.stdout.on('data', (data) => {
        this.buffer += data.toString();
        this.processBuffer();
      });

      this.process.stderr.on('data', () => {
        // Ignore stderr
      });

      // Initialize MCP
      this.sendMessage({
        jsonrpc: '2.0',
        id: this.messageId++,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          clientInfo: {
            name: 'gemini-mcp-client',
            version: '1.0.0'
          }
        }
      }).then(() => {
        // List all tools
        return this.sendMessage({
          jsonrpc: '2.0',
          id: this.messageId++,
          method: 'tools/list',
          params: {}
        });
      }).then((response) => {
        if (response.result && response.result.tools) {
          for (const tool of response.result.tools) {
            this.tools.set(tool.name, tool);
          }
          this.ready = true;
          resolve();
        }
      }).catch(reject);
    });
  }

  processBuffer() {
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const message = JSON.parse(line);
        if (message.id && this.pendingRequests.has(message.id)) {
          const { resolve, reject } = this.pendingRequests.get(message.id);
          this.pendingRequests.delete(message.id);
          if (message.error) {
            reject(new Error(message.error.message));
          } else {
            resolve(message);
          }
        }
      } catch (e) {
        // Ignore invalid JSON
      }
    }
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(message.id);
        reject(new Error('Request timeout'));
      }, 30000);

      this.pendingRequests.set(message.id, {
        resolve: (response) => {
          clearTimeout(timeout);
          resolve(response);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });

      this.process.stdin.write(JSON.stringify(message) + '\n');
    });
  }

  async callTool(name, args) {
    const response = await this.sendMessage({
      jsonrpc: '2.0',
      id: this.messageId++,
      method: 'tools/call',
      params: {
        name,
        arguments: args || {}
      }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.result;
  }

  sanitizeSchema(schema) {
    // Remove unsupported fields for Gemini API
    if (!schema || typeof schema !== 'object') return schema;

    const sanitized = {};

    for (const [key, value] of Object.entries(schema)) {
      // Skip unsupported fields
      if (key === 'additionalProperties' || key === '$schema' || key === 'definitions') {
        continue;
      }

      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          sanitized[key] = value.map(item => this.sanitizeSchema(item));
        } else {
          sanitized[key] = this.sanitizeSchema(value);
        }
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  getToolsAsGeminiFunctions() {
    const functions = [];

    for (const [name, tool] of this.tools) {
      const functionDeclaration = {
        name: name,
        description: tool.description || `Execute ${name}`,
        parameters: {
          type: 'object',
          properties: {},
          required: []
        }
      };

      // Convert MCP inputSchema to Gemini parameters
      if (tool.inputSchema && tool.inputSchema.properties) {
        // Sanitize schema to remove unsupported fields
        functionDeclaration.parameters.properties = this.sanitizeSchema(tool.inputSchema.properties);

        if (tool.inputSchema.required) {
          functionDeclaration.parameters.required = tool.inputSchema.required;
        }
      }

      functions.push(functionDeclaration);
    }

    return functions;
  }

  close() {
    if (this.process) {
      this.process.kill();
    }
  }
}

// Main execution with function calling
async function main() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Connect to MCP
  const mcp = new MCPClient();
  await mcp.connect();

  console.error(`✓ Connected to n8n-MCP (${mcp.tools.size} tools available)`);

  // Get all tools as Gemini function declarations
  const tools = mcp.getToolsAsGeminiFunctions();

  // Create model with function calling
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    tools: [{ functionDeclarations: tools }],
  });

  const chat = model.startChat({
    history: [],
  });

  let result;
  let iteration = 0;

  try {
    // Send initial prompt
    result = await chat.sendMessage(prompt);

    // Function calling loop
    while (iteration < MAX_ITERATIONS) {
      iteration++;

      const response = result.response;

      // Safety checks for response structure
      if (!response.candidates || !response.candidates[0]) {
        console.error('No candidates in response');
        break;
      }

      const candidate = response.candidates[0];

      if (!candidate.content || !candidate.content.parts) {
        console.error('No content.parts in candidate');
        break;
      }

      // Check if we have a final text response
      if (candidate.content.parts.some(part => part.text)) {
        const textParts = candidate.content.parts.filter(part => part.text);
        console.log(textParts.map(part => part.text).join(''));
        break;
      }

      // Check for function calls
      const functionCalls = candidate.content.parts.filter(part => part.functionCall);

      if (functionCalls.length === 0) {
        console.log('No more function calls, ending.');
        break;
      }

      // Execute all function calls
      const functionResponses = [];

      for (const part of functionCalls) {
        const functionCall = part.functionCall;
        const toolName = functionCall.name;
        const toolArgs = functionCall.args || {};

        console.error(`→ Calling tool: ${toolName}`);

        try {
          const toolResult = await mcp.callTool(toolName, toolArgs);

          // Extract text content from MCP response
          let resultText;
          if (toolResult.content && Array.isArray(toolResult.content)) {
            resultText = toolResult.content
              .filter(c => c.type === 'text')
              .map(c => c.text)
              .join('\n');
          } else {
            resultText = JSON.stringify(toolResult);
          }

          // Debug: log result length
          console.error(`  Result length: ${resultText.length} chars`);
          if (resultText.length > 500) {
            console.error(`  Result preview: ${resultText.substring(0, 200)}...`);
          }

          functionResponses.push({
            functionResponse: {
              name: toolName,
              response: {
                result: resultText
              }
            }
          });

          console.error(`✓ Tool ${toolName} completed`);
        } catch (error) {
          console.error(`✗ Tool ${toolName} failed: ${error.message}`);

          functionResponses.push({
            functionResponse: {
              name: toolName,
              response: {
                error: error.message
              }
            }
          });
        }
      }

      // Send function responses back to model
      result = await chat.sendMessage(functionResponses);
    }

    if (iteration >= MAX_ITERATIONS) {
      console.error('\n⚠️  Reached maximum iterations');
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    mcp.close();
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
