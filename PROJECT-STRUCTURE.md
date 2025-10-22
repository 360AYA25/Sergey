# 🗺️ Sergey's Projects Map

> **Complete structure of all workspace projects**
> Updated: 2025-10-22

---

## 📊 Overall Architecture

**Real workspace structure:**

```
Projects/
│
├── 🎯 Sergey/                           ← MAIN project (global instructions)
│   ├── CLAUDE.md                        ← Global Claude Code instructions
│   ├── PROJECT-STRUCTURE.md             ← This file
│   ├── .mcp.json                        ← MCP server config (n8n-server)
│   └── .claude/settings.local.json      ← Permissions config
│
├── 📚 n8n-docs/                         ← Documentation hub
│   ├── MUST-READ.md                     ← n8n-specific instructions
│   ├── LEARNINGS.md                     ← Past errors and solutions
│   └── PATTERNS.md                      ← Ready-made solutions
│
├── 🤖 MultiBOT/                         ← Telegram bot platform (ACTIVE)
│   ├── src/telegram-bot.js              ← Main bot code
│   ├── docs/CLAUDE-INSTRUCTIONS.md      ← MultiBOT-specific instructions
│   └── FoodTrackerBOT/                  ← Food tracking sub-bot
│
├── 🍎 food-tracker-v2/                  ← Food tracking V2 (DEPRECATED)
│   └── docs/DEPRECATED.md               ← See Sergey/CLAUDE.md
│
├── 🎥 youtube-transcript-service/       ← YouTube transcription
│   └── src/                             ← Transcript service code
│
├── 🔌 mcp-server/                       ← MCP server for n8n API
│   ├── mcp-local-server.js              ← Server code
│   └── docs/DEPRECATED.md               ← See Sergey/CLAUDE.md
│
├── 📦 n8n-automation-archive/           ← Archived n8n workflows
│   └── docs/                            ← Old documentation
│
└── 📄 Sergey-Projects.code-workspace    ← Workspace config (combines all)
```

**Active projects:** Sergey, MultiBOT, n8n-docs, youtube-transcript-service, mcp-server
**Deprecated:** food-tracker-v2 (migrated to MultiBOT)
**Archived:** n8n-automation-archive

---

## 🎯 Project: Sergey (Main)

**Location:** `/Users/sergey/Projects/Sergey/`

### Purpose:
Main project with **global instructions** and **shared documentation** for all projects.

### Content:

| File | Description |
|------|----------|
| `CLAUDE.md` | 🤖 Main Claude Code prompt |
| `PROJECT-STRUCTURE.md` | 🗺️ All projects map (this file) |
| `HOW-TO-USE.md` | 📖 Cheatsheet: how to work with workspace |
| `docs/` | 📚 Shared documentation |
| `.vscode/settings.json` | ⚙️ Global VS Code settings |

### Relations:
- **Parent** for all other projects
- **Read first** when starting Claude Code
- **Priority**: Local instructions override global

---

## 🤖 Project: MultiBOT

**Location:** `/Users/sergey/Projects/MultiBOT/`

### Purpose:
Modular platform for Telegram bots with shared infrastructure.

### Tech Stack:
- **Backend**: Node.js 20, JavaScript
- **Bot**: node-telegram-bot-api
- **DB**: Supabase (PostgreSQL)
- **AI**: OpenAI (Whisper, GPT-4o Vision)
- **Automation**: n8n
- **Barcode**: @zxing/library

### Status:
🚧 **Active Development** - Week 2 (Phase 1)

### Current Focus:
- Voice handler (Whisper transcription)
- Photo handler (GPT-4o Vision)
- Barcode scanner (OpenFoodFacts API)
- Product search (3-tier fallback)

### Structure:

```
MultiBOT/
├── src/telegram-bot.js              # Main bot code
├── workflows/router-mini.json       # n8n workflow
├── mini-app/server.js               # Barcode scanner web app
├── docs/CLAUDE-INSTRUCTIONS.md      # Local prompt
├── docs/ARCHITECTURE.md             # System architecture
├── docs/DATABASE-CURRENT-SCHEMA.md  # DB schema
├── docs/ROADMAP.md                  # Development plan (Week 1-12)
├── docs/CURRENT-STATUS.md           # Current status
├── .vscode/settings.json            # VS Code settings
├── .vscode/tasks.json               # Git automation
├── package.json                     # Dependencies
├── .env                             # Credentials (gitignored)
└── README.md                        # Documentation
```

### Database:
**Supabase Project**: One project, namespaced tables

**Shared tables** (for all bots):
- `users` - all users
- `user_settings` - settings
- `goals` - goals (calories, protein, steps, water, sleep)
- `daily_summaries` - daily aggregates

**MultiBOT tables** (`multibot_*`):
- Coming soon...

### Git:
- **Repo**: https://github.com/360AYA25/MultiBOT
- **Branch**: `feature/week-2-handlers`
- **Main**: `main`

---

## 🍎 Project: FoodTracker

**Location:** `/Users/sergey/Projects/n8n-docs/FoodTracker/`

### Purpose:
Telegram bot for food tracking, calories, macronutrients.

### Tech Stack:
- **Backend**: Node.js
- **Bot**: Telegram Bot API
- **DB**: Supabase (`foodtracker_*` tables)
- **AI**: OpenAI GPT for product search
- **Visualization**: Notion (Phase 1), QuickChart (Phase 3+)

### Status:
🔄 **Migration to MultiBOT** - moving to MultiBOT as sub-bot

### Database:

**FoodTracker tables** (`foodtracker_*`):
- `foodtracker_entries` - food entries (all meals)
- `food_products` - products database

### Features:
- **Input**: text, voice, photo, barcode
- **Processing**: Smart product search (3-tier: DB → OpenFoodFacts → GPT)
- **Output**: Daily format (1 day = 1 entry), Notion sync

---

## ⚡ Project: n8n-automation

**Location:** `/Users/sergey/Projects/n8n-docs/n8n-automation/`

### Purpose:
n8n workflows storage for automation and integrations.

### Content:
- **Workflows**: JSON files with n8n workflows
- **Shared workflows**: Common for all projects
- **Documentation**: Description of each workflow

### Workflow Types:
- **Router workflows** - request routing
- **Integration workflows** - API integrations
- **Processing workflows** - data processing
- **Notification workflows** - notifications

### Relations:
- Used by **MultiBOT** for orchestration
- Used by **FoodTracker** for processing
- Integration with **Supabase**, **OpenAI**, **Notion**

---

## 🎥 Project: youtube-transcription

**Location:** `/Users/sergey/Projects/n8n-docs/youtube-transcription/`

### Purpose:
Tools for YouTube video transcription.

### Tech Stack:
- **AI**: OpenAI Whisper (transcription)
- **Video**: youtube-dl / yt-dlp
- **Output**: Text, SRT subtitles

### Status:
⏸️ **Planning** - planned

### Capabilities:
- YouTube video transcription
- Subtitle generation
- Translation to other languages
- Content summarization

---

## 📦 Project: archives

**Location:** `/Users/sergey/Projects/n8n-docs/archives/`

### Purpose:
Archive of old projects, documentation, experiments.

### Content:
- Old project versions
- Outdated documentation
- Experiments and prototypes

---

## 🔗 Project Relations

### Dependency Diagram:

```
┌─────────────────────────────────────────────────┐
│           Supabase (PostgreSQL)                 │
│        Single DB for all projects               │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐    ┌───────▼────────┐
│   n8n Hub      │    │   Bot Layer    │
│ (Orchestration)│◄───┤  (MultiBOT,    │
│                │    │   FoodTracker) │
└───────┬────────┘    └───────┬────────┘
        │                     │
        │                     │
┌───────▼─────────────────────▼────────┐
│         OpenAI API                   │
│  (GPT-4, Whisper, Vision)            │
└──────────────────────────────────────┘
```

### Shared Resources:

| Resource | Location | Used In |
|--------|--------------|----------------|
| **Credentials** | `~/credentials/n8n-access.md` | All projects |
| **Supabase DB** | Cloud (qyemyvplvtzpukvktkae) | All projects |
| **OpenAI API** | One key | MultiBOT, FoodTracker, YouTube |
| **n8n Instance** | n8n.srv1068954.hstgr.cloud | All projects |

---

## 📋 Workspace: Sergey-Projects.code-workspace

**Location:** `/Users/sergey/Projects/Sergey-Projects.code-workspace`

### Purpose:
Multi-Root Workspace file that combines **all projects** into one workspace.

### Content:

```json
{
  "folders": [
    { "name": "🎯 Sergey (Main)", "path": "/Users/sergey/Projects/Sergey" },
    { "name": "🤖 MultiBOT", "path": "/Users/sergey/Projects/MultiBOT" },
    { "name": "📚 n8n-docs", "path": "/Users/sergey/Projects/n8n-docs" },
    // ... other projects
  ],
  "settings": { /* global settings */ }
}
```

### How to open:
```bash
# From terminal
code ~/Projects/Sergey-Projects.code-workspace

# Or double-click on file
```

---

## 🎯 Development Priorities

### Phase 1 (Week 1-2) - CURRENT:
✅ Week 1: Foundation (DONE)
🔄 Week 2: MultiBOT Feature Parity (IN PROGRESS)

### Phase 2 (Week 3-4):
⏸️ Production Polish & Deployment

### Phase 3+ (Week 5-12):
⏸️ Evolution (Cache, Frugal AI, Security, Reports)

---

## 📊 Project Statistics

| Project | Status | Language | Lines | Files |
|--------|--------|----------|-------|-------|
| **Sergey** | 📚 Docs | Markdown | ~500 | 4 |
| **MultiBOT** | 🚧 Dev | JavaScript | ~2000 | 15+ |
| **FoodTracker** | 🔄 Migration | JavaScript | ~1500 | 10+ |
| **n8n-automation** | ⏸️ Stable | JSON | ~5000 | 20+ |
| **YouTube** | ⏸️ Planning | - | - | - |

---

## 🔄 Versioning

**Version**: 1.0
**Created**: 2025-10-20
**Author**: Claude Code
**Last Update**: 2025-10-22

### Changelog:
- `1.0` (2025-10-20) - First version of project map

---

## 📚 Related Documents

- [CLAUDE.md](CLAUDE.md) - Main prompt
- [HOW-TO-USE.md](HOW-TO-USE.md) - How to work with workspace
- [MultiBOT/README.md](../MultiBOT/README.md) - MultiBOT documentation
- [MultiBOT/ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md) - System architecture

---

**This map helps navigate all projects! 🗺️**
