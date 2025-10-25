#!/bin/bash
# Full system test with n8n-MCP

echo "🧪 Full Multi-Agent System Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check MCP servers
echo "1️⃣ MCP Servers:"
claude mcp list | grep -E "(openai|gemini|n8n-mcp)" || echo "   ❌ Some servers missing"
echo ""

# Check n8n connection
echo "2️⃣ Checking n8n connection..."
if curl -s http://localhost:5678 > /dev/null 2>&1; then
  echo "   ✅ n8n running on localhost:5678"
else
  echo "   ⚠️  n8n not running (will create JSON only)"
fi
echo ""

# Run test
echo "3️⃣ Creating real workflow..."
echo ""

./start.sh "Create webhook that receives POST data and responds with success message"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Full test complete!"
echo ""
echo "Check results:"
echo "  - Knowledge base: cat shared/PATTERNS.json | jq .successful_workflows"
echo "  - Agent logs: ls -la logs/agents/"
