/**
 * MCP AI Subagent Starter Template
 * Quick start template for integrating GPT-4o Mini and Gemini into Claude Code
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AI providers
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// Create MCP server
const server = new Server(
  {
    name: 'ai-subagent',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool: Simple query with GPT-4o Mini
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'simple_query': {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: args.query }
          ],
          max_tokens: args.max_tokens || 500,
          temperature: 0.7,
        });

        return {
          content: [
            {
              type: 'text',
              text: response.choices[0].message.content,
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error calling GPT-4o Mini: ${error.message}`,
            }
          ],
          isError: true,
        };
      }
    }

    case 'analyze_with_gemini': {
      try {
        const result = await geminiModel.generateContent(args.prompt);
        const response = await result.response;

        return {
          content: [
            {
              type: 'text',
              text: response.text(),
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error calling Gemini: ${error.message}`,
            }
          ],
          isError: true,
        };
      }
    }

    case 'smart_router': {
      // Intelligent routing based on task type
      const taskType = detectTaskType(args.query);

      if (taskType === 'simple' || taskType === 'translation') {
        // Use GPT-4o Mini for simple tasks
        return await callGPTMini(args.query);
      } else if (taskType === 'analysis' || taskType === 'summarization') {
        // Use Gemini for analysis tasks
        return await callGemini(args.query);
      } else {
        // Default to cheaper option (GPT-4o Mini)
        return await callGPTMini(args.query);
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// List available tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'simple_query',
        description: 'Ask GPT-4o Mini a simple question (fast & cheap)',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The question to ask',
            },
            max_tokens: {
              type: 'number',
              description: 'Maximum tokens in response (default: 500)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'analyze_with_gemini',
        description: 'Analyze text or code with Gemini (free tier available)',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'The text or code to analyze',
            },
          },
          required: ['prompt'],
        },
      },
      {
        name: 'smart_router',
        description: 'Automatically route to the best AI model based on task type',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The task or question',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// Helper functions
function detectTaskType(query) {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('translate') || lowerQuery.includes('перевод')) {
    return 'translation';
  }
  if (lowerQuery.includes('analyze') || lowerQuery.includes('analysis')) {
    return 'analysis';
  }
  if (lowerQuery.includes('summarize') || lowerQuery.includes('summary')) {
    return 'summarization';
  }
  if (lowerQuery.includes('explain') && lowerQuery.length < 100) {
    return 'simple';
  }

  return 'general';
}

async function callGPTMini(query) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: query }],
    max_tokens: 500,
    temperature: 0.7,
  });

  return {
    content: [
      {
        type: 'text',
        text: `[GPT-4o Mini]: ${response.choices[0].message.content}`,
      }
    ]
  };
}

async function callGemini(query) {
  const result = await geminiModel.generateContent(query);
  const response = await result.response;

  return {
    content: [
      {
        type: 'text',
        text: `[Gemini]: ${response.text()}`,
      }
    ]
  };
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP AI Subagent server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});