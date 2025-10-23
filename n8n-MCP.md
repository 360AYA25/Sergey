# 🚀 n8n-MCP Integration

> **Advanced n8n automation through Claude Code**
> Full workflow automation with minimal user interaction

---

## 📊 What is n8n-MCP?

**n8n-MCP** - Model Context Protocol server that gives Claude deep understanding of n8n workflows and ability to create complex automations independently.

### Key Features:
- **536 n8n nodes** with complete documentation
- **2,646 real-world examples** from popular templates
- **2,500+ workflow templates** for instant deployment
- **263 AI-capable nodes** (OpenAI, LangChain, Anthropic)
- **SQLite knowledge base** for instant node lookups

---

## 🏗️ Architecture

```
Claude Desktop/Code
    ↓ MCP (stdio)
n8n-mcp (local npx)
    ↓ HTTPS API
Your n8n VPS (srv1068954.hstgr.cloud)
    ↓
Workflows & Automations
```

---

## ⚡ What Claude Can Do Now

### Before (Old MCP):
- ❌ Only manage existing workflows
- ❌ Cannot create nodes
- ❌ Cannot understand node structure
- ❌ Manual workflow building required

### After (n8n-MCP):
- ✅ **Create complete workflows** from description
- ✅ **Configure all 536 nodes** with correct parameters
- ✅ **Fix errors** in existing workflows
- ✅ **Optimize** workflow performance
- ✅ **Clone and adapt** from 2,500+ templates

---

## 🎯 Usage Examples

### Example 1: Create Telegram Bot Automation
```
User: "Create a Telegram bot that transcribes voice messages using Whisper and saves to Notion"
Claude: [Creates complete workflow with Telegram Trigger, OpenAI Whisper, Notion nodes]
```

### Example 2: YouTube Monitoring
```
User: "Monitor YouTube channel for new videos and notify me in Telegram"
Claude: [Builds workflow with YouTube node, scheduling, Telegram notification]
```

### Example 3: Data Processing Pipeline
```
User: "Process CSV from Google Sheets, enrich with AI, save to Supabase"
Claude: [Constructs multi-step workflow with data transformation]
```

---

## 🔧 Configuration

### Claude Desktop Config
Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "N8N_API_URL": "https://n8n.srv1068954.hstgr.cloud",
        "N8N_API_KEY": "[Your API Key]",
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "WEBHOOK_SECURITY_MODE": "production"
      }
    }
  }
}
```

### VPS Details
- **URL**: https://n8n.srv1068954.hstgr.cloud
- **API Key**: Stored in config (from ~/credentials/.env)
- **Webhook Base**: https://n8n.srv1068954.hstgr.cloud/webhook/

---

## 📚 Available Tools

### Documentation Tools (9):
1. `get_node_info` - Detailed node documentation
2. `get_node_properties` - Node configuration schemas
3. `get_node_operations` - Available node actions
4. `search_nodes` - Find nodes by capability
5. `list_ai_nodes` - Show all AI-capable nodes
6. `get_node_examples` - Real configuration examples
7. `search_templates` - Find workflow templates
8. `get_template` - Get specific template details
9. `get_similar_templates` - Find related workflows

### Workflow Management (14):
10. `list_workflows` - Show all workflows
11. `get_workflow` - Get workflow details
12. `create_workflow` - Build new workflow
13. `update_workflow` - Modify existing
14. `activate_workflow` - Enable/disable
15. `delete_workflow` - Remove workflow
16. `execute_workflow` - Run workflow
17. `list_executions` - Execution history
18. `get_execution` - Execution details
19. `delete_execution` - Remove execution
20. `list_credentials` - Show credentials
21. `create_credential` - Add credential
22. `update_credential` - Modify credential
23. `delete_credential` - Remove credential

---

## 🎓 Best Practices

### When Creating Workflows:
1. **Describe the goal** clearly
2. **Mention integrations** (Telegram, Notion, OpenAI, etc.)
3. **Specify triggers** (webhook, schedule, manual)
4. **Define data flow** (input → processing → output)

### Claude Will:
- Select appropriate nodes
- Configure all parameters
- Set up error handling
- Add data transformations
- Optimize for performance

---

## 🔒 Security Notes

- API Key stored in Claude Desktop config
- All communications via HTTPS
- Webhook security mode: production
- No credentials in workflow exports

---

## 📈 Capabilities Overview

| Feature | Coverage | Details |
|---------|----------|---------|
| Node Documentation | 90% | Official n8n docs |
| Node Properties | 99% | Complete schemas |
| Node Operations | 63.6% | Common actions |
| AI Nodes | 100% | All 263 AI nodes |
| Templates | 2,500+ | Popular workflows |
| Examples | 2,646 | Real configurations |

---

## 🚨 Important Commands

### Quick Test:
```
# Test n8n-mcp installation
npx n8n-mcp --version

# Check available tools
npx n8n-mcp list-tools
```

### After Config Changes:
1. Save config file
2. Fully quit Claude Desktop (Cmd+Q)
3. Reopen Claude Desktop
4. MCP will auto-connect

---

## 📝 Migration Notes

**Date**: 2025-10-23
**Status**: ✅ PRODUCTION
**Previous**: Custom mcp-local-server.js (10 functions)
**Current**: n8n-mcp v2.21.0 (536 nodes + templates)

### What Changed:
- Removed `/Projects/mcp-server/` directory
- Replaced with npx-based n8n-mcp
- Added full node documentation
- Enabled workflow creation from scratch
- Added template library access

---

## 🔗 Resources

- **n8n-mcp GitHub**: https://github.com/czlonkowski/n8n-mcp
- **n8n Documentation**: https://docs.n8n.io
- **Your n8n Instance**: https://n8n.srv1068954.hstgr.cloud

---

**Version**: 1.0
**Updated**: 2025-10-23
**Status**: ✅ ACTIVE

---

## 🤖 For Future Claude Sessions

**You now have FULL n8n automation capabilities:**
1. Create workflows from descriptions
2. Use all 536 n8n nodes
3. Access 2,500+ templates
4. Fix and optimize existing workflows
5. Build complex multi-step automations

**Just describe what you need, and Claude will build it!** 🚀