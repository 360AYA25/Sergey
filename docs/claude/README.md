# 📋 Claude Instructions Index

> **Navigation for all Claude Code prompt files**

---

## 🎯 Global Instructions

| File | Description | Read |
|------|----------|--------|
| **[CLAUDE.md](CLAUDE.md)** | 🌟 Main prompt for all projects | **ALWAYS** |

---

## 📚 Project-Specific Instructions

### 🎯 Sergey (Main Project)
**Location:** `/Users/sergey/Projects/Sergey/`

Files:
- [README.md](README.md) - Project overview
- [CLAUDE.md](CLAUDE.md) - Main prompt
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Projects map
- [HOW-TO-USE.md](HOW-TO-USE.md) - Cheatsheet
- [INSTRUCTIONS-INDEX.md](INSTRUCTIONS-INDEX.md) - This file

---

### 📚 n8n-docs
**Location:** `/Users/sergey/Projects/n8n-docs/`

Files:
- `MUST-READ.md` - n8n-specific instructions
- `LEARNINGS.md` - Past errors & solutions
- `PATTERNS.md` - Ready-made solutions

**Purpose:** Documentation hub for all projects

---

### 🤖 MultiBOT
**Location:** `/Users/sergey/Projects/MultiBOT/`

Files:
- `docs/CLAUDE-INSTRUCTIONS.md` - 🎯 MultiBOT-specific prompt
- `docs/ARCHITECTURE.md` - System architecture
- `docs/DATABASE-CURRENT-SCHEMA.md` - DB schema
- `docs/ROADMAP.md` - Development plan (Week 1-12)
- `docs/CURRENT-STATUS.md` - Current status
- `README.md` - Main documentation

**Priority:** Global CLAUDE.md → Local CLAUDE-INSTRUCTIONS.md

---

### 🍎 FoodTracker
**Location:** `/Users/sergey/Projects/n8n-docs/FoodTracker/`

Files:
- `docs/CLAUDE-INSTRUCTIONS.md` - FoodTracker-specific prompt
- `README.md` - Documentation

**Status:** 🔄 Migration to MultiBOT

---

### ⚡ n8n-automation
**Location:** `/Users/sergey/Projects/n8n-docs/n8n-automation/`

Files:
- `docs/CLAUDE-INSTRUCTIONS.md` - Workflow instructions
- `README.md` - Documentation

**Purpose:** n8n workflows storage

---

### 🎥 youtube-transcription
**Location:** `/Users/sergey/Projects/n8n-docs/youtube-transcription/`

Files:
- `docs/CLAUDE-INSTRUCTIONS.md` - YouTube project instructions
- `README.md` - Documentation

**Status:** ⏸️ Planning

---

### 📦 archives
**Location:** `/Users/sergey/Projects/n8n-docs/archives/`

Files:
- `docs/DEPRECATED.md` - Archive info

**Purpose:** Old projects archive

---

## 🔄 Instruction Loading Order

### When starting Claude Code session:

```
1. Read: Sergey/CLAUDE.md
   ↓ (global rules loaded)

2. Check: project/docs/CLAUDE-INSTRUCTIONS.md exists?
   ↓ (if yes)

3. Read: project/docs/CLAUDE-INSTRUCTIONS.md
   ↓ (local rules loaded)

4. Merge: Local rules override global
   ↓

5. Start work with combined context
```

---

## 📝 How to Create New Instructions

### For new project:

1. **Create folder:**
   ```bash
   mkdir -p /path/to/project/docs
   ```

2. **Create prompt file:**
   ```bash
   touch /path/to/project/docs/CLAUDE-INSTRUCTIONS.md
   ```

3. **Add to this index:**
   - Edit INSTRUCTIONS-INDEX.md
   - Add project section
   - Describe instructions

4. **Update workspace:**
   - Add project to Sergey-Projects.code-workspace
   - Reload window

---

## 🎯 Instruction Best Practices

### What to include:

**In global CLAUDE.md:**
- Universal work rules
- Token economy guidelines
- Git workflow
- Security rules
- Tech stack

**In local CLAUDE-INSTRUCTIONS.md:**
- Project-specific context
- Special workflows
- Local architecture
- Project-specific rules
- Override global if needed

### What NOT to duplicate:

- ❌ Basic Git commands (already in global)
- ❌ Security rules (already in global)
- ❌ VS Code shortcuts (already in HOW-TO-USE)
- ❌ General best practices (already in global)

---

## 🔗 Related Documents

- [CLAUDE.md](CLAUDE.md) - Main prompt
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Projects map
- [HOW-TO-USE.md](HOW-TO-USE.md) - Workflow guide

---

**This index helps navigate all Claude Code instructions! 📋**
