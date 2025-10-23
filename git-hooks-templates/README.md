# 🔧 Git Hooks Templates

> **Git automation through hooks**
> Scripts run automatically during git operations

---

## 📋 Available Hooks

| Hook | When it runs | What it does |
|------|--------------|--------------|
| **pre-commit** | Before `git commit` | Checks credentials, large files, .env |
| **commit-msg** | During `git commit` | Validates message format |
| **pre-push** | Before `git push` | Checks branch, WIP commits |

---

## 🚀 Installation

### Automatic (for specific project):

```bash
cd ~/Projects/your-project/
bash ~/Projects/Sergey/git-hooks-templates/install.sh
```

### Manual:

```bash
# 1. Navigate to project
cd ~/Projects/your-project/

# 2. Copy hooks
cp ~/Projects/Sergey/git-hooks-templates/pre-commit .git/hooks/
cp ~/Projects/Sergey/git-hooks-templates/commit-msg .git/hooks/
cp ~/Projects/Sergey/git-hooks-templates/pre-push .git/hooks/

# 3. Make executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-push
```

---

## 📝 What Hooks Do

### 🔒 pre-commit

**Runs:** Before every `git commit`

**Checks:**
- ✅ No credentials in code (API keys, tokens, passwords)
- ✅ No large files (>5MB)
- ✅ No .env files being committed

**Example:**
```bash
git add .
git commit -m "feat: add new feature"

# Hook runs:
🔍 Running pre-commit checks...
  Checking for credentials...
  Checking for large files...
  Checking for .env files...
✅ Pre-commit checks passed!
```

---

### 📝 commit-msg

**Runs:** During `git commit` (validates message)

**Checks:**
- ✅ Format: `<type>: <description>`
- ✅ Valid types: feat, fix, docs, refactor, test, chore, style, perf
- ✅ Minimum description length (10 characters)

**Examples:**

✅ **Correct:**
```bash
git commit -m "feat: add voice handler with Whisper"
git commit -m "fix: resolve barcode scanner bug"
git commit -m "docs: update README with setup"
```

❌ **Incorrect:**
```bash
git commit -m "added stuff"              # no type
git commit -m "feature: fix"             # wrong type (should be feat)
git commit -m "fix: bug"                 # too short description
```

---

### 🚀 pre-push

**Runs:** Before `git push`

**Checks:**
- ✅ Not pushing to main/master (asks confirmation)
- ✅ No WIP/TODO/FIXME commits

**Example:**
```bash
git push

# Hook runs:
🚀 Running pre-push checks...
  ⚠️  WARNING: You are pushing to main branch!
  Are you sure you want to push to main? (yes/no):
```

---

## ⚙️ Configuration

### Temporarily disable hook:

```bash
# For one commit
git commit --no-verify -m "feat: something"

# For one push
git push --no-verify
```

### Remove hooks:

```bash
rm .git/hooks/pre-commit
rm .git/hooks/commit-msg
rm .git/hooks/pre-push
```

### Edit hook:

```bash
# Edit template
nano ~/Projects/Sergey/git-hooks-templates/pre-commit

# Reinstall in project
bash ~/Projects/Sergey/git-hooks-templates/install.sh
```

---

## 📊 Recommendations

### For beginners:

✅ **Install all hooks** - they help avoid mistakes
✅ **Read messages** - hooks explain what's wrong
✅ **Don't use --no-verify** without understanding why

### For advanced users:

✅ Customize hooks for your workflow
✅ Add your own checks (linting, tests)
✅ Use husky for Node.js projects

---

## 🔧 Extending Hooks

### Add custom check to pre-commit:

```bash
# Edit ~/Projects/Sergey/git-hooks-templates/pre-commit

# Add at the end (before "checks passed"):

# ============================================
# 4️⃣ Your custom check
# ============================================

echo "  Running custom check..."

# Your code here
if [ condition ]; then
  echo "  ❌ Custom check failed!"
  exit 1
fi
```

---

## 💡 Usage Examples

### Scenario 1: Accidentally added .env

```bash
git add .
git commit -m "feat: new feature"

# Hook blocks:
❌ ERROR: .env files should not be committed!
Files:
.env

Add to .gitignore and remove from staging:
git reset HEAD .env*

# Fix:
git reset HEAD .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: add .env to gitignore"
```

### Scenario 2: Wrong commit format

```bash
git commit -m "fixed bug"

# Hook blocks:
❌ Invalid commit message format!
Format should be: <type>: <description>

# Fix:
git commit -m "fix: resolve authentication bug"
```

### Scenario 3: Push to main

```bash
git push

# Hook warns:
⚠️  WARNING: You are pushing to main branch!
Are you sure you want to push to main? (yes/no): no
❌ Push aborted.

# Switch to feature branch:
git checkout -b feature/my-changes
git push -u origin feature/my-changes
```

---

## 🎯 Why Use These Hooks?

### Security:
- 🔒 **Prevents credential leaks** - catches API keys before they're committed
- 🔒 **Protects sensitive data** - blocks .env files from being committed
- 🔒 **Saves from security incidents** - one leaked key = big problems

### Code Quality:
- 📝 **Consistent commit messages** - easier to read git history
- 📝 **Professional standards** - follows industry conventions
- 📝 **Better collaboration** - team understands commit purpose

### Workflow:
- ⚡ **Catches mistakes early** - before they reach remote
- ⚡ **Saves time** - no need to fix after push
- ⚡ **Automated checks** - don't rely on memory

---

## 🔗 Related Documents

- [docs/guides/README.md](../docs/guides/README.md) - Git workflow guide
- Update links after docs reorganization

---

## 🔄 Version

**Version**: 2.0
**Created**: 2025-10-20
**Updated**: 2025-10-23 (translated to English)

---

**Hooks help avoid mistakes and improve Git workflow! 🚀**
