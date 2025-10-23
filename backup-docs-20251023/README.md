# 🎯 Sergey - Main Project

> **Control center for all Sergey's projects**
> Global instructions, documentation, settings for all projects

---

## 📋 What's here:

| File | Description |
|------|----------|
| **[CLAUDE.md](CLAUDE.md)** | 🤖 Main Claude Code prompt |
| **[PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)** | 🗺️ All projects map |
| **[HOW-TO-USE.md](HOW-TO-USE.md)** | 📖 Cheatsheet: how to work with workspace |
| `.vscode/settings.json` | ⚙️ VS Code settings for this folder |

---

## 🚀 Quick Start

### Open workspace:

```bash
code ~/Projects/Sergey-Projects.code-workspace
```

Or double-click `Sergey-Projects.code-workspace`

### Read documentation:

1. **Start with** [HOW-TO-USE.md](HOW-TO-USE.md) - workflow cheatsheet
2. **Then** [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - projects map
3. **For Claude** [CLAUDE.md](CLAUDE.md) - prompt

---

## 🎯 Project Purpose

### For user (Sergey):
- 📚 **Central documentation** for all projects
- 🗺️ **Navigation** - map of all projects
- 📖 **Cheatsheets** - how to work with VS Code, Git, workspace

### For Claude Code:
- 🤖 **Main prompt** - global work rules
- 🎓 **Context** - understanding all projects structure
- 🔗 **Relations** - how projects connect

---

## 📊 Project Structure

```
Projects/
│
├── 🎯 Sergey/                       ← YOU ARE HERE
│   ├── CLAUDE.md
│   ├── PROJECT-STRUCTURE.md
│   ├── HOW-TO-USE.md
│   ├── README.md (this file)
│   └── .vscode/
│
├── 📚 n8n-docs/                     ← Documentation
├── 🤖 MultiBOT/                     ← Telegram bot
├── 🍎 food-tracker-v2/              ← Food tracking
├── 🎥 youtube-transcript/           ← YouTube transcription
├── 📝 transcript-service/           ← Transcript service
├── 🔌 mcp-server/                   ← MCP server
├── 📦 n8n-automation-archive/       ← Archives
│
└── Sergey-Projects.code-workspace   ← Workspace (combines all)
```

---

## 💡 Why this project?

### Problem (was):
- Each project in separate VS Code window
- Switching between projects inconvenient
- Settings duplicated in each project
- Claude doesn't see big picture
- No unified work rules

### Solution (now):
- ✅ **Multi-Root Workspace** - all projects in one window
- ✅ **Global instructions** for Claude
- ✅ **Central documentation** and projects map
- ✅ **Unified VS Code settings** for all projects
- ✅ **Navigation** between projects with one click

---

## 🔗 Related Documents

### In this project:
- [HOW-TO-USE.md](HOW-TO-USE.md) - How to work
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Projects map
- [CLAUDE.md](CLAUDE.md) - Claude prompt

### In other projects:
- [MultiBOT/README.md](../MultiBOT/README.md) - MultiBOT documentation
- [MultiBOT/ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md) - System architecture
- [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md) - Git cheatsheet

---

## 🛠️ How to Edit

### Change Claude prompt:

1. Open [CLAUDE.md](CLAUDE.md)
2. Make changes
3. Save (Cmd+S)
4. Next session Claude reads updated file

### Add project to workspace:

1. Open `~/Projects/Sergey-Projects.code-workspace`
2. Add to `"folders"` section:
```json
{
  "name": "🔥 New Project",
  "path": "/Users/sergey/Projects/new-project"
}
```
3. Save
4. Reload workspace (Command Palette → "Reload Window")

### Update projects map:

1. Open [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
2. Add new project description
3. Update diagrams
4. Save

---

## 🎓 For Beginners

### If you're here first time:

1. **Read in order:**
   - [HOW-TO-USE.md](HOW-TO-USE.md) ← START HERE
   - [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
   - [CLAUDE.md](CLAUDE.md)

2. **Open workspace:**
   ```bash
   code ~/Projects/Sergey-Projects.code-workspace
   ```

3. **Try:**
   - Switch between projects (Cmd+P)
   - Find file globally (Cmd+Shift+F)
   - Open terminal for project (right-click → Terminal)

4. **Ask Claude for help:**
   ```
   "Объясни структуру проектов"
   "Как работать с workspace?"
   "Покажи примеры использования"
   ```

---

## 📝 Version

**Version**: 1.0
**Created**: 2025-10-20
**Author**: Claude Code (by Sergey's request)

### Changelog:
- `1.0` (2025-10-20) - First version of Sergey project

---

## 🎯 Next Steps

### For Sergey project:
- ⏭️ Add Git integration (initialize repository)
- ⏭️ Add templates for new projects
- ⏭️ Create automation for new project creation

### For you:
- ⏭️ Read all documentation
- ⏭️ Work with workspace
- ⏭️ Customize if needed

---

**This project is foundation for all others! 🚀**

**Questions? Read [HOW-TO-USE.md](HOW-TO-USE.md) or ask Claude Code! 😊**
