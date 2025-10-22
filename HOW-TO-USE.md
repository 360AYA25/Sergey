# 📖 How to Use Sergey Projects Workspace

> **Daily workflow cheatsheet**
> Quick start & useful tips

---

## 🚀 Quick Start

### 1️⃣ Open workspace:

**Option A: From Finder**
```
Finder → Projects → Sergey-Projects.code-workspace
Double click → VS Code opens
```

**Option B: From Terminal**
```bash
code ~/Projects/Sergey-Projects.code-workspace
```

**Option C: From VS Code**
```
File → Open Workspace from File...
→ Select Sergey-Projects.code-workspace
```

### 2️⃣ What you'll see:

```
Explorer (left panel):
├── 🎯 SERGEY (MAIN)        ← Main project
│   ├── CLAUDE.md
│   ├── PROJECT-STRUCTURE.md
│   └── HOW-TO-USE.md (this file)
│
├── 📚 N8N-DOCS             ← Documentation
├── 🤖 MULTIBOT             ← Telegram bot
├── 🍎 FOOD TRACKER V2      ← Food tracking
├── 🎥 YOUTUBE TRANSCRIPT   ← Transcription
├── 📝 TRANSCRIPT SERVICE   ← Transcript service
├── 🔌 MCP SERVER           ← MCP server
└── 📦 ARCHIVES (N8N)       ← Archives
```

All projects **simultaneously** in one window! 🎉

---

## 🎯 Working with Projects

### Switch between projects:

**Quick:**
```
Cmd+P                    # Quick Open
Type part of filename
Enter
```

**Via Explorer:**
```
Click on project name in left panel
→ Expand folder
→ Open needed file
```

### Search across all projects:

```
Cmd+Shift+F              # Global search
Enter text
→ Results from ALL projects
```

### Open terminal for specific project:

```
1. Right-click on project name
2. "Open in Integrated Terminal"
3. Terminal opens in that project folder
```

---

## 🤖 Working with Claude Code

### How Claude knows what to do:

1. **First** Claude reads `Sergey/CLAUDE.md` (global rules)
2. **Then** looks for local `project/docs/CLAUDE-INSTRUCTIONS.md` (if exists)
3. **Applies** local rules on top of global

### Examples:

**In MultiBOT project:**
```
Вы: "Добавь новую функцию"
Claude: [Reads CLAUDE.md]
        [Reads MultiBOT/docs/CLAUDE-INSTRUCTIONS.md]
        [Applies MultiBOT + global rules]
```

**In project without local instructions:**
```
Вы: "Помоги с кодом"
Claude: [Reads only CLAUDE.md]
        [Works by global rules]
```

### Activate deep thinking:

Use key phrases:
```
"Подумай стратегически над..."
"Проанализируй все варианты..."
"Сравни несколько подходов..."
"Рассмотри архитектуру с точки зрения масштабирования..."
```

Claude switches to **maximum analysis mode** 🧠

---

## ⚙️ VS Code Settings

### Where are settings:

```
Sergey-Projects.code-workspace      ← Global for ALL projects
├── settings (workspace level)
│
├── Sergey/.vscode/settings.json    ← Only for Sergey
├── MultiBOT/.vscode/settings.json  ← Only for MultiBOT
└── ... other projects
```

### Settings priority:

```
Local (.vscode/settings.json)
    ↓ override
Workspace (Sergey-Projects.code-workspace)
    ↓ override
Global VS Code (User Settings)
```

### How to change settings:

**For all projects:**
```
Code → Settings → Workspace
Or edit Sergey-Projects.code-workspace
```

**For one project:**
```
Create/edit project/.vscode/settings.json
```

---

## 🔄 Git Workflow

### Basic workflow:

```bash
# 1. Start work
git pull                 # Get latest changes

# 2. Code work
# ... make changes ...

# 3. Check
git status               # What changed?
git diff                 # What exactly?

# 4. Save
git add .                # Add all
git commit -m "feat: description"  # Commit
git push                 # Push to GitHub
```

### Via VS Code Tasks:

```
Cmd+Shift+P → "Tasks: Run Task"

Popular tasks:
├─ 🚀 Start Development  (pull + install + run)
├─ 📦 Finish Work        (add + commit + push)
├─ Git: Status
├─ Git: Quick Push
└─ Git: Log
```

### Source Control panel:

```
Cmd+Shift+G              # Open Source Control
→ See all changes
→ + near file = git add
→ Checkmark on top = commit
→ ... menu = push/pull
```

---

## 💡 Useful Shortcuts

### Navigation:

```bash
Cmd+P                # Quick Open (files)
Cmd+Shift+P          # Command Palette (commands)
Cmd+B                # Toggle Sidebar
Cmd+Shift+E          # Explorer
Cmd+Shift+F          # Search across files
Cmd+Shift+G          # Source Control (Git)
Cmd+`                # Terminal
```

### Editing:

```bash
Cmd+D                # Select next occurrence
Cmd+Shift+L          # Select all occurrences
Cmd+/                # Comment line
Cmd+[                # Decrease indent
Cmd+]                # Increase indent
Option+↑ / ↓         # Move line up/down
Shift+Option+↑ / ↓   # Duplicate line
```

### Files:

```bash
Cmd+N                # New file
Cmd+W                # Close file
Cmd+S                # Save
Cmd+Shift+S          # Save as...
Cmd+K Cmd+W          # Close all files
```

---

## 📁 File Structure (best practices)

### Each project should have:

```
project/
├── README.md                    ← Project description
├── docs/                        ← Documentation
│   ├── CLAUDE-INSTRUCTIONS.md   ← Claude prompt (if needed)
│   ├── ARCHITECTURE.md          ← Architecture (for complex projects)
│   └── API.md                   ← API docs (if has API)
├── src/                         ← Source code
├── .vscode/                     ← VS Code settings
│   ├── settings.json            ← Local settings
│   └── tasks.json               ← Automation tasks
├── .gitignore                   ← What not to commit
├── package.json                 ← Dependencies (for Node.js)
└── .env                         ← Credentials (DON'T commit!)
```

---

## 🔍 Search & Navigation

### Find files:

```bash
Cmd+P                            # By filename
→ Type part of name
→ Enter

Examples:
"arc"         → finds ARCHITECTURE.md
"telbot"      → finds telegram-bot.js
"readme"      → finds all README.md
```

### Search by content:

```bash
Cmd+Shift+F                      # Global search
→ Enter text
→ Can filter by file type

Examples:
"async function"                 # Find all async functions
"TODO"                           # Find all TODOs
"supabase"                       # Find Supabase usage
```

### Go to definition:

```bash
F12                              # Go to Definition
Cmd+Click                        # Same
Cmd+T                            # Go to Symbol in Workspace
```

---

## 🎓 Typical Workday

### Morning (start work):

```bash
1. Open workspace:
   code ~/Projects/Sergey-Projects.code-workspace

2. Get latest changes:
   Cmd+Shift+P → "Tasks: Run Task" → "🚀 Start Development"

3. Check TODOs:
   Cmd+Shift+F → "TODO" → Enter
```

### Day (work):

```bash
1. Work with Claude Code:
   - Ask for help
   - Make changes
   - Test

2. Commit periodically:
   git add . && git commit -m "feat: description"

3. Switch between projects:
   Cmd+P → type filename
```

### Evening (finish):

```bash
1. Save everything:
   Cmd+Shift+P → "Tasks: Run Task" → "📦 Finish Work"

2. Check what's pushed:
   git log -1

3. Close VS Code with clear conscience 😊
```

---

## 🚨 Common Issues & Solutions

### Issue: "Git conflict on pull"

**Solution:**
```bash
1. git status                    # See conflicting files
2. Open files, find markers:
   <<<<<<< HEAD
   your code
   =======
   their code
   >>>>>>> origin/main

3. Fix manually (keep needed)
4. Remove markers
5. git add . && git commit -m "resolve merge conflict"
```

### Issue: "VS Code lags"

**Solution:**
```bash
1. Close unnecessary files: Cmd+K Cmd+W
2. Restart VS Code
3. Check node_modules not indexed:
   Settings → Files: Exclude → add **/node_modules
```

### Issue: "Claude doesn't see my instructions"

**Solution:**
```bash
1. Check file exists:
   Sergey/CLAUDE.md

2. Check format:
   - File must be .md
   - Encoding UTF-8

3. Restart Claude Code session
```

### Issue: "Can't find project"

**Solution:**
```bash
1. Ensure workspace is open:
   File → Open Workspace → Sergey-Projects.code-workspace

2. Check project is added:
   Edit Sergey-Projects.code-workspace
   → Should be in "folders"
```

---

## 📚 Useful Resources

### Documentation:

- [CLAUDE.md](CLAUDE.md) - Main prompt
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Project map
- [MultiBOT/README.md](../MultiBOT/README.md) - MultiBOT docs
- [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md) - Git cheatsheet

### VS Code:

- Official docs: https://code.visualstudio.com/docs
- Shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf
- Multi-Root Workspaces: https://code.visualstudio.com/docs/editor/multi-root-workspaces

### Git:

- Git cheatsheet: [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md)
- Git book: https://git-scm.com/book/en/v2

---

## 💬 Need Help?

### Ask Claude Code:

```
"Как работать с workspace?"
"Объясни структуру проектов"
"Покажи как использовать Git Tasks"
"Подумай стратегически: как организовать новый проект?"
```

### Check documentation:

1. First check files in `Sergey/` project
2. Then local project documentation
3. Then ask Claude

---

## 🎯 Next Steps

### For beginner:

1. ✅ Open workspace
2. ✅ Read [CLAUDE.md](CLAUDE.md)
3. ✅ Read [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
4. ⏭️ Work with MultiBOT (main project)
5. ⏭️ Learn Git workflow

### For advanced:

1. ⏭️ Setup custom shortcuts
2. ⏭️ Install recommended extensions
3. ⏭️ Create custom Tasks for automation
4. ⏭️ Setup Git aliases

---

**Good work! 🚀**

**Questions? Ask Claude Code - I'm always happy to help! 😊**
