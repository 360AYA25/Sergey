#!/bin/bash
# Multi-Agent System Quick Start
#
# Usage:
#   ./start.sh "Create Telegram logger"
#   ./start.sh -i "Create webhook"                    # Interactive mode
#   ./start.sh -p "Airtable" "Create database logger" # Prefer Airtable
#   ./start.sh -p "avoid:Notion" "Create logger"      # Avoid Notion

# Show help if no args
if [ $# -eq 0 ]; then
  echo "Usage: ./start.sh [options] \"task description\""
  echo ""
  echo "Options:"
  echo "  -i, --interactive        🎮 You choose the best plan"
  echo "  -p, --prefer <services>  👍 Preferred services (comma-separated)"
  echo "                           Use 'avoid:Service' to blacklist"
  echo ""
  echo "Examples:"
  echo "  ./start.sh \"Create Telegram bot\""
  echo "  ./start.sh -i \"Create webhook\""
  echo "  ./start.sh -p \"Airtable,Supabase\" \"Create database logger\""
  echo "  ./start.sh -p \"avoid:Notion\" -i \"Create logger\""
  exit 1
fi

# Check if Claude Code is installed
if ! command -v claude &> /dev/null; then
  echo "❌ Claude Code CLI not found!"
  echo "Install: https://docs.claude.com/en/docs/claude-code"
  exit 1
fi

# Check if agents exist
if [ ! -d "../.claude/agents" ] || [ -z "$(ls -A ../.claude/agents 2>/dev/null)" ]; then
  echo "❌ No agents found in .claude/agents/"
  echo "Expected agents:"
  echo "  - n8n-planner-gpt"
  echo "  - n8n-planner-gemini"
  echo "  - n8n-architect"
  echo "  - n8n-builder"
  echo "  - n8n-validator"
  echo "  - n8n-debugger"
  echo "  - n8n-reviewer"
  exit 1
fi

# Check MCP servers
echo "🔍 Checking MCP servers..."
if ! claude mcp list | grep -q "openai"; then
  echo "⚠️  OpenAI MCP server not found"
  echo "Install: See README.md for instructions"
fi

if ! claude mcp list | grep -q "gemini"; then
  echo "⚠️  Gemini MCP server not found"
  echo "Install: See README.md for instructions"
fi

if ! claude mcp list | grep -q "n8n-mcp"; then
  echo "⚠️  n8n-MCP server not found"
  echo "Install: See README.md for instructions"
fi

echo ""
echo "🚀 Starting Multi-Agent Workflow Orchestrator..."
echo ""

# Run orchestrator
node orchestrator.js "$@"
