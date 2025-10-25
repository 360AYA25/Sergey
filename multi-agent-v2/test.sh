#!/bin/bash
# Quick test after MCP setup

echo "🧪 Testing Multi-Agent System"
echo ""

# Test 1: Check MCP servers
echo "1️⃣ Checking MCP servers..."
if claude mcp list | grep -q "openai"; then
  echo "   ✅ OpenAI MCP"
else
  echo "   ❌ OpenAI MCP not found"
  exit 1
fi

if claude mcp list | grep -q "gemini"; then
  echo "   ✅ Gemini MCP"
else
  echo "   ❌ Gemini MCP not found"
  exit 1
fi

if claude mcp list | grep -q "n8n-mcp"; then
  echo "   ✅ n8n-MCP"
else
  echo "   ⚠️  n8n-MCP not found (optional for test)"
fi

echo ""

# Test 2: Simple workflow
echo "2️⃣ Creating test workflow..."
echo ""

./start.sh "Create simple webhook that returns success message"

echo ""
echo "✅ Test complete!"
