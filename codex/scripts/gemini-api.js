#!/usr/bin/env node

/**
 * Gemini API executor with n8n-MCP tools
 * Direct API calls without Gemini CLI
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { spawn } = require('child_process');
const readline = require('readline');

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCz1MUFvR6zqlGxZ4RCwQWib8RaVU-geUE';
const MODEL_NAME = 'gemini-2.5-flash';
const N8N_API_URL = 'https://n8n.srv1068954.hstgr.cloud';
const N8N_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZTQ2N2ZlMS0xMzhlLTQ2ZWEtODcxYS0zNzM3OTZmYzU2MTgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYwNjM5MTMwfQ.L0GhZcAum9HRaIAxjzEZ0FSsqcQ8N08SOGG0bDKq5cA';

// Get prompt from command line
const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.error('Error: No prompt provided');
  console.error('Usage: node gemini-api.js "your prompt here"');
  process.exit(1);
}

// MCP Client for n8n-mcp
class MCPClient {
  constructor() {
    this.process = null;
    this.tools = new Map();
    this.ready = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      // Spawn n8n-mcp process
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

      let buffer = '';

      this.process.stdout.on('data', (data) => {
        buffer += data.toString();

        // Try to parse JSON-RPC messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const message = JSON.parse(line);
            this.handleMessage(message);
          } catch (e) {
            // Ignore non-JSON lines
          }
        }
      });

      this.process.stderr.on('data', (data) => {
        // Ignore stderr (MCP debug logs)
      });

      // Initialize MCP connection
      const initMessage = {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {}
        }
      };

      this.process.stdin.write(JSON.stringify(initMessage) + '\n');

      // Wait for initialization
      setTimeout(() => {
        if (this.ready) {
          resolve();
        } else {
          // List tools
          const listToolsMessage = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/list',
            params: {}
          };
          this.process.stdin.write(JSON.stringify(listToolsMessage) + '\n');

          setTimeout(() => resolve(), 2000);
        }
      }, 1000);
    });
  }

  handleMessage(message) {
    if (message.result && message.result.tools) {
      // Store available tools
      for (const tool of message.result.tools) {
        this.tools.set(tool.name, tool);
      }
      this.ready = true;
    }
  }

  async callTool(name, args) {
    return new Promise((resolve, reject) => {
      const id = Date.now();
      const message = {
        jsonrpc: '2.0',
        id,
        method: 'tools/call',
        params: {
          name,
          arguments: args
        }
      };

      let buffer = '';
      let resolved = false;

      const dataHandler = (data) => {
        buffer += data.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const response = JSON.parse(line);
            if (response.id === id) {
              resolved = true;
              this.process.stdout.removeListener('data', dataHandler);
              if (response.error) {
                reject(new Error(response.error.message));
              } else {
                resolve(response.result);
              }
            }
          } catch (e) {
            // Ignore
          }
        }
      };

      this.process.stdout.on('data', dataHandler);
      this.process.stdin.write(JSON.stringify(message) + '\n');

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!resolved) {
          this.process.stdout.removeListener('data', dataHandler);
          reject(new Error('Tool call timeout'));
        }
      }, 30000);
    });
  }

  close() {
    if (this.process) {
      this.process.kill();
    }
  }
}

// Main execution
async function main() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Connect to MCP
  const mcp = new MCPClient();
  await mcp.connect();

  console.error(`✓ Connected to n8n-MCP (${mcp.tools.size} tools available)`);

  // Simple execution without function calling (MCP limitation with Gemini API)
  // Instead, execute n8n_list_workflows directly
  try {
    const result = await mcp.callTool('n8n_list_workflows', { limit: 100 });

    // Parse result
    const workflows = JSON.parse(result.content[0].text);

    // Format with Gemini
    const formattedPrompt = `Based on this n8n workflows data, ${prompt}

Data: ${JSON.stringify(workflows, null, 2)}`;

    const response = await model.generateContent(formattedPrompt);
    console.log(response.response.text());
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
