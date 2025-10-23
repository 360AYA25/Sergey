# 📁 Project Structure Map

> **Complete overview of Sergey's workspace**
> All projects, integrations, and configurations

---

## 🏗️ Main Architecture

```
Projects/
│
├── 🎯 Sergey/                           [MAIN CONTROL CENTER]
│   ├── CLAUDE.md                        ← Global instructions
│   ├── PROJECT-STRUCTURE.md             ← This file (map of all projects)
│   ├── README.md                        ← Project overview
│   └── .vscode/                         ← Global VS Code settings
│
├── 🔌 mcp-server/                       [MCP SERVERS HUB]
│   ├── README.md                        ← MCP servers overview
│   ├── .mcp.json                        ← MCP project config
│   ├── .gitignore                       ← Security rules
│   │
│   └── mcp/                             ← All MCP servers
│       ├── README.md                    ← Servers directory guide
│       │
│       └── n8n/                         ← n8n-MCP (workflow automation)
│           ├── README.md                ← n8n-MCP overview
│           ├── SETUP.md                 ← Installation guide
│           ├── QUICK-START.md           ← 5-minute setup
│           ├── .vscode/mcp.json         ← VS Code integration
│           ├── .github/                 ← Copilot enhancement
│           ├── config/                  ← Configuration files
│           ├── docs/                    ← Complete documentation
│           └── examples/                ← Sample workflows
│
├── 🤖 MultiBOT/                         [TELEGRAM BOT PROJECT]
│   ├── src/                             ← Bot source code
│   ├── docs/                            ← Project documentation
│   └── .env → ~/credentials/.env        ← Symlink to credentials
│
├── 🍎 food-tracker-v2/                  [FOOD TRACKING SYSTEM]
│   ├── workflows/                       ← n8n workflow exports
│   └── docs/                            ← Project documentation
│
├── 🎥 youtube-transcript-service/       [YOUTUBE TRANSCRIPTION]
│   ├── src/                             ← Service code
│   └── workflows/                       ← n8n workflows
│
├── 📚 n8n-docs/                         [SHARED DOCUMENTATION]
│   ├── LEARNINGS.md                     ← Knowledge base
│   ├── PATTERNS.md                      ← Solution patterns
│   └── shared/                          ← Common resources
│
├── 📦 n8n-automation-archive/            [ARCHIVED PROJECTS]
│   └── old-workflows/                   ← Legacy automations
│
└── 💼 Sergey-Projects.code-workspace    [VS CODE WORKSPACE]
```

---

## 🔌 Integrations & Services

### n8n Automation (VPS: srv1068954.hstgr.cloud)
- **URL**: https://n8n.srv1068954.hstgr.cloud
- **MCP Integration**: n8n-mcp v2.21.0
- **Capabilities**: 536 nodes, 2,500+ templates
- **Config**: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Databases
- **Supabase**: PostgreSQL for all projects
  - URL: https://qyemyvplvtzpukvktkae.supabase.co
  - Tables: namespaced per project

### AI Services
- **OpenAI API**: GPT-4, Whisper, Vision
- **Claude**: Through MCP integration
- **LangChain**: Via n8n nodes

### External Services
- **Telegram Bot API**: MultiBOT integration
- **Notion API**: Data storage and tracking
- **Google Sheets API**: Data import/export
- **YouTube API**: Video monitoring

---

## 🔐 Credentials Management

```
~/credentials/                           [OUTSIDE GIT]
├── .env                                 ← All API keys & tokens
├── n8n-access.md                        ← Access documentation
└── google-sheets-credentials.json      ← Google API credentials

project/
└── .env → ~/credentials/.env           ← Symlink (never commit)
```

---

## 📊 Project Status

| Project | Status | Type | Description |
|---------|--------|------|-------------|
| **Sergey** | ✅ Active | Control | Main configuration & documentation hub |
| **mcp-server** | ✅ Production | Integration | n8n-MCP configuration & setup |
| **MultiBOT** | ✅ Production | Bot | Telegram assistant |
| **FoodTracker** | ✅ Production | Automation | Nutrition tracking |
| **YouTube Transcription** | ✅ Production | Service | Video processing |
| **n8n-automation** | 📦 Archive | Legacy | Old workflows |

---

## 🚀 Quick Start Commands

### Project Navigation:
```bash
# Main control center
cd ~/Projects/Sergey

# MCP Servers hub
cd ~/Projects/mcp-server

# n8n-MCP configuration
cd ~/Projects/mcp-server/mcp/n8n

# Active projects
cd ~/Projects/MultiBOT
cd ~/Projects/food-tracker-v2

# Open workspace
code ~/Projects/Sergey-Projects.code-workspace
```

### n8n-MCP Commands:
```bash
# Test MCP installation
npx n8n-mcp --version

# Quick start guide
cd ~/Projects/mcp-server/mcp/n8n
cat QUICK-START.md

# See all MCP servers
cd ~/Projects/mcp-server
cat README.md
```

### Git Operations:
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/new-automation

# Commit changes
git add .
git commit -m "feat: add new n8n workflow"
```

---

## 📝 Documentation Structure

### Global Documentation:
- `Sergey/CLAUDE.md` - Main instructions for all projects
- `Sergey/PROJECT-STRUCTURE.md` - This file (project map)
- `mcp-server/README.md` - MCP servers hub overview
- `mcp-server/mcp/n8n/docs/` - Complete n8n-MCP documentation

### Project Documentation:
- `project/docs/CLAUDE-INSTRUCTIONS.md` - Local overrides
- `project/docs/README.md` - Project specifics
- `project/workflows/` - n8n workflow exports

### Shared Knowledge:
- `n8n-docs/LEARNINGS.md` - Problem solutions
- `n8n-docs/PATTERNS.md` - Common patterns
- `n8n-docs/shared/` - Reusable resources

---

## 🎯 Workflow Development Process

1. **Describe automation need** to Claude
2. **Claude creates workflow** using n8n-MCP
3. **Test on VPS** at n8n.srv1068954.hstgr.cloud
4. **Export workflow** to project/workflows/
5. **Document** in project docs
6. **Commit** to Git repository

---

## 🔄 Version Control

### Branch Strategy:
- `main` - Production code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `test/*` - Experiments

### Commit Convention:
```
feat: new feature
fix: bug fix
docs: documentation
refactor: code improvement
test: add tests
chore: maintenance
```

---

## 📈 System Capabilities

### What Claude Can Do:
- ✅ Create complete n8n workflows
- ✅ Manage all 536 n8n nodes
- ✅ Access 2,500+ templates
- ✅ Fix workflow errors
- ✅ Optimize automations
- ✅ Full CRUD on workflows
- ✅ Execute and monitor

### Automation Types:
- Telegram bots
- Data pipelines
- API integrations
- Scheduled tasks
- Webhook handlers
- AI processing
- Database sync

---

## 🚨 Important Notes

1. **Never commit credentials** - Use symlinks to ~/credentials/
2. **Test in development** before production
3. **Document all workflows** in project docs
4. **Use feature branches** for new work
5. **Follow naming conventions** consistently

---

## 🔗 Quick Links

- **n8n Instance**: https://n8n.srv1068954.hstgr.cloud
- **Supabase**: https://qyemyvplvtzpukvktkae.supabase.co
- **GitHub**: Profile configurations in each project
- **MCP Docs**: https://github.com/czlonkowski/n8n-mcp

---

**Version**: 1.0
**Updated**: 2025-10-23
**Author**: Sergey Novikov
**Status**: ✅ ACTIVE

---

## 🤖 For Claude Code

This is your navigation map. Use it to:
1. Understand project locations
2. Find documentation
3. Access credentials safely
4. Create new automations
5. Maintain consistency

**Remember**: You have FULL n8n automation capabilities through n8n-MCP!