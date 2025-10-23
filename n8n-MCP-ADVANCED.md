# 🚀 n8n-MCP Advanced Features & Integration

> **Complete guide to all capabilities of n8n-MCP**
> Beyond basic setup - unlock full potential

---

## 📊 ALL 23 TOOLS EXPLAINED

### 🔍 Documentation Tools (8)

| Tool | What It Does | When To Use |
|------|-------------|-------------|
| `tools_documentation` | Reference for all MCP tools | Learn available commands |
| `list_nodes` | Browse 536 n8n nodes with filters | Find nodes by category |
| `get_node_info` | Full documentation for specific node | Understand node capabilities |
| `get_node_essentials` | 10-20 key properties + examples | Quick node overview |
| `search_nodes` | Full-text search with configs | "Find node that sends email" |
| `search_node_properties` | Search specific parameters | "Which nodes have 'timeout' property?" |
| `list_ai_tools` | Show 263 AI-capable nodes | Build AI workflows |
| `get_node_as_tool_info` | How to use node as AI tool | LangChain agent setup |

### 📚 Template Tools (6)

| Tool | What It Does | Example Query |
|------|-------------|---------------|
| `list_templates` | Browse 2,500+ templates | Show all CRM templates |
| `search_templates` | Text search in templates | "invoice processing" |
| `search_templates_by_metadata` | Filter by complexity, duration | complexity: beginner |
| `list_node_templates` | Templates using specific node | Templates with Gmail node |
| `get_template` | Get full workflow JSON | Get template by ID |
| `get_templates_for_task` | Curated solutions | "customer onboarding" |

### ✅ Validation Tools (5)

| Tool | What It Does | Critical For |
|------|-------------|--------------|
| `validate_workflow` | Complete workflow analysis | Before deployment |
| `validate_workflow_connections` | Check structure & links | After building |
| `validate_workflow_expressions` | Verify n8n expressions | Complex workflows |
| `validate_node_operation` | Operation-aware validation | Node configuration |
| `validate_node_minimal` | Quick required field check | Fast validation |

### 🔧 Advanced Analysis (3)

| Tool | What It Does | Use Case |
|------|-------------|----------|
| `get_property_dependencies` | Map property conditions | Understand node logic |
| `get_node_documentation` | Parsed official docs | Deep dive |
| `get_database_statistics` | Coverage metrics | System health |

### 🚀 n8n Management (1 category)

All workflow and execution management through API:
- Create, update, delete workflows
- Execute workflows
- Monitor executions
- Manage credentials

---

## 🔌 Integration Methods

### 1️⃣ **Claude Desktop** (Already Configured)
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": { ... }
    }
  }
}
```
Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

### 2️⃣ **Claude Code CLI** (Alternative)
```bash
claude mcp add n8n-mcp \
  -e N8N_API_URL=https://n8n.srv1068954.hstgr.cloud \
  -e N8N_API_KEY=your_key \
  -e MCP_MODE=stdio \
  -- npx n8n-mcp
```

Commands:
- `claude mcp list` - Show all MCP servers
- `claude mcp get n8n-mcp` - Check status
- `claude mcp remove n8n-mcp` - Uninstall
- `/mcp` - View tools during chat

### 3️⃣ **VS Code Project Config** (New!)
File: `.vscode/mcp.json`
```json
{
  "servers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "N8N_API_URL": "https://n8n.srv1068954.hstgr.cloud",
        "N8N_API_KEY": "${input:n8nApiKey}",
        "MCP_MODE": "stdio"
      }
    }
  },
  "inputs": {
    "n8nApiKey": {
      "type": "promptString",
      "description": "n8n API Key",
      "password": true
    }
  }
}
```

**Benefits**:
- ✅ Secure credential input
- ✅ Team sharing (without exposing keys)
- ✅ Project-specific configuration

### 4️⃣ **GitHub Copilot Instructions**
File: `.github/copilot-instructions.md`

Enhances Copilot with n8n-specific knowledge:
- Workflow patterns
- Validation requirements
- Best practices
- Security rules

---

## 🆕 Additional Plugins

### n8n-skills Plugin
```bash
# Install in Claude chat
/plugin install czlonkowski/n8n-skills
```

**Capabilities**:
- Expert guidance on n8n expressions
- Workflow pattern recommendations
- Advanced validation techniques
- Code node development help

---

## 🌐 Deployment Options

### Local (Current Setup)
```bash
npx n8n-mcp  # Runs locally on Mac
```

### HTTP Mode (Remote Access)
```bash
# On server
MCP_MODE=http PORT=3000 AUTH_TOKEN=secret npx n8n-mcp

# In config
{
  "url": "https://your-server.com:3000",
  "headers": {
    "Authorization": "Bearer secret"
  }
}
```

### Docker (Production)
```bash
docker pull ghcr.io/czlonkowski/n8n-mcp:latest
docker run -p 3000:3000 \
  -e N8N_API_URL=https://n8n.srv1068954.hstgr.cloud \
  -e N8N_API_KEY=your_key \
  ghcr.io/czlonkowski/n8n-mcp:latest
```

### Railway (Cloud)
One-click deploy with built-in monitoring and HTTPS

---

## 🎛️ Advanced Configuration

### Environment Variables

#### Core:
```bash
MCP_MODE=stdio                    # stdio or http
LOG_LEVEL=error                   # error, warn, info, debug
DISABLE_CONSOLE_OUTPUT=true       # Quiet mode
```

#### n8n Integration:
```bash
N8N_API_URL=https://your.n8n.cloud
N8N_API_KEY=your_jwt_token
WEBHOOK_SECURITY_MODE=production  # moderate for localhost
```

#### Performance:
```bash
SQLJS_SAVE_INTERVAL_MS=5000      # DB save frequency (sql.js only)
N8N_MCP_TELEMETRY_DISABLED=true  # Opt-out telemetry
```

### Database Adapters

**better-sqlite3** (Default):
- Native C++ bindings
- ~100-120MB stable memory
- Direct disk writes
- Best performance

**sql.js** (Fallback):
- Pure JavaScript
- ~150-200MB memory
- In-memory with periodic saves
- Works everywhere

---

## 🔥 Advanced Usage Patterns

### 1. Template-Driven Development
```
1. search_templates: "customer support automation"
2. get_template: [select best match]
3. Customize for your needs
4. validate_workflow: [modified workflow]
5. n8n_create_workflow: [deploy]
```

### 2. Node Discovery Workflow
```
1. "I need to send SMS"
2. search_nodes: "SMS"
3. get_node_info: "Twilio"
4. get_node_essentials: "Twilio" (with examples)
5. Build workflow with examples
```

### 3. Validation Pipeline
```
1. Build workflow
2. validate_node_minimal: each node
3. validate_workflow_connections: structure
4. validate_workflow_expressions: logic
5. validate_workflow: complete check
6. Deploy with confidence
```

### 4. AI Agent Creation
```
1. list_ai_tools: find AI nodes
2. get_node_as_tool_info: setup guidance
3. search_templates: "AI agent"
4. Build custom agent workflow
```

---

## 💡 Pro Tips

### Tip 1: Use Validation Early and Often
```
✅ Validate after each node addition
✅ Validate before any test
✅ Validate before deployment
❌ Build entire workflow then validate
```

### Tip 2: Search Before Building
```
✅ Check templates first
✅ Find similar workflows
✅ Learn from examples
❌ Start from scratch
```

### Tip 3: Understand Dependencies
```javascript
// Use get_property_dependencies to understand:
// "When is this field visible?"
// "What depends on this setting?"
```

### Tip 4: Leverage Examples
```javascript
// get_node_essentials with examples=true
// Shows real-world configurations
```

---

## 📊 Telemetry Control

### Check Status:
```bash
npx n8n-mcp telemetry status
```

### Disable:
```bash
npx n8n-mcp telemetry disable
# or
export N8N_MCP_TELEMETRY_DISABLED=true
```

**What's Collected** (if enabled):
- Which tools are used (no parameters)
- Workflow structures (sanitized, no data)
- Error patterns (hashed)
- Performance metrics

**Never Collected**:
- URLs, API keys, credentials
- Actual workflow content
- Personal information
- n8n instance details

---

## 🚨 Troubleshooting

### MCP Not Loading
```bash
# 1. Check version
npx n8n-mcp --version

# 2. Test direct run
npx n8n-mcp

# 3. Check logs
LOG_LEVEL=debug npx n8n-mcp

# 4. Restart Claude Desktop/Code
Cmd+Q, then reopen
```

### API Connection Issues
```bash
# Test API access
curl -H "X-N8N-API-KEY: your_key" \
  https://n8n.srv1068954.hstgr.cloud/api/v1/workflows

# Check webhook mode
WEBHOOK_SECURITY_MODE=moderate  # for localhost
WEBHOOK_SECURITY_MODE=production  # for VPS
```

### Memory Issues
```bash
# Switch to better-sqlite3 (if using sql.js)
# It uses 50% less memory

# Or adjust save interval
SQLJS_SAVE_INTERVAL_MS=10000
```

---

## 📚 Additional Resources

### Official Documentation
- **Main Repo**: https://github.com/czlonkowski/n8n-mcp
- **HTTP Setup**: docs/HTTP_DEPLOYMENT.md
- **Docker Guide**: docs/DOCKER_DEPLOYMENT.md
- **Changelog**: docs/CHANGELOG.md

### Your Configuration Files
- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`
- VS Code: `/Users/sergey/Projects/Sergey/.vscode/mcp.json`
- Copilot: `/Users/sergey/Projects/Sergey/.github/copilot-instructions.md`

### n8n Resources
- **Instance**: https://n8n.srv1068954.hstgr.cloud
- **Docs**: https://docs.n8n.io
- **Community**: https://community.n8n.io

---

## 🎯 Next Steps

### Immediate Actions:
1. ✅ Restart Claude Code to load VS Code config
2. ✅ Try validation tools on existing workflows
3. ✅ Explore template library with `search_templates`
4. ✅ Test GitHub Copilot with new instructions

### Advanced Exploration:
1. Try n8n-skills plugin for expert guidance
2. Experiment with HTTP mode for team access
3. Set up Docker deployment for production
4. Create custom workflow templates

---

## 🔗 Quick Reference Card

```bash
# Discovery
search_nodes: "email"
get_node_info: "Gmail"
search_templates: "CRM"

# Validation
validate_workflow: [json]
validate_node_operation: [node]

# Deployment
n8n_create_workflow: [json]
n8n_execute_workflow: [id]

# Management
claude mcp list
npx n8n-mcp --version
/mcp (in chat)
```

---

**Version**: 1.0
**Updated**: 2025-10-23
**Status**: ✅ FULLY CONFIGURED

**You now have COMPLETE n8n automation capabilities with ALL advanced features!** 🚀