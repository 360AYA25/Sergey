# 🔧 Git Hooks Templates

> **Автоматизация Git через hooks**
> Скрипты запускаются автоматически при git операциях

---

## 📋 Доступные hooks

| Hook | Когда запускается | Что делает |
|------|-------------------|------------|
| **pre-commit** | Перед `git commit` | Проверка credentials, больших файлов, .env |
| **commit-msg** | При `git commit` | Проверка формата сообщения |
| **pre-push** | Перед `git push` | Проверка ветки, WIP коммитов |

---

## 🚀 Установка

### Автоматическая (для конкретного проекта):

```bash
cd ~/Projects/your-project/
bash ~/Projects/Sergey/git-hooks-templates/install.sh
```

### Ручная:

```bash
# 1. Перейти в проект
cd ~/Projects/your-project/

# 2. Скопировать hooks
cp ~/Projects/Sergey/git-hooks-templates/pre-commit .git/hooks/
cp ~/Projects/Sergey/git-hooks-templates/commit-msg .git/hooks/
cp ~/Projects/Sergey/git-hooks-templates/pre-push .git/hooks/

# 3. Сделать исполняемыми
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-push
```

---

## 📝 Что делают hooks

### 🔒 pre-commit

**Запускается:** Перед каждым `git commit`

**Проверяет:**
- ✅ Нет ли credentials в коде (API keys, tokens, passwords)
- ✅ Нет ли больших файлов (>5MB)
- ✅ Не коммитятся ли .env файлы

**Пример:**
```bash
git add .
git commit -m "feat: add new feature"

# Hook запускается:
🔍 Running pre-commit checks...
  Checking for credentials...
  Checking for large files...
  Checking for .env files...
✅ Pre-commit checks passed!
```

---

### 📝 commit-msg

**Запускается:** При `git commit` (проверяет сообщение)

**Проверяет:**
- ✅ Формат: `<type>: <description>`
- ✅ Допустимые типы: feat, fix, docs, refactor, test, chore, style, perf
- ✅ Минимальная длина описания (10 символов)

**Примеры:**

✅ **Правильно:**
```bash
git commit -m "feat: add voice handler with Whisper"
git commit -m "fix: resolve barcode scanner bug"
git commit -m "docs: update README with setup"
```

❌ **Неправильно:**
```bash
git commit -m "added stuff"              # нет типа
git commit -m "feature: fix"             # неверный тип (должен быть feat)
git commit -m "fix: bug"                 # слишком короткое описание
```

---

### 🚀 pre-push

**Запускается:** Перед `git push`

**Проверяет:**
- ✅ Не пушим ли в main/master (спрашивает подтверждение)
- ✅ Нет ли WIP/TODO/FIXME коммитов

**Пример:**
```bash
git push

# Hook запускается:
🚀 Running pre-push checks...
  ⚠️  WARNING: You are pushing to main branch!
  Are you sure you want to push to main? (yes/no):
```

---

## ⚙️ Настройка

### Отключить hook временно:

```bash
# Для одного коммита
git commit --no-verify -m "feat: something"

# Для одного push
git push --no-verify
```

### Удалить hooks:

```bash
rm .git/hooks/pre-commit
rm .git/hooks/commit-msg
rm .git/hooks/pre-push
```

### Редактировать hook:

```bash
# Редактировать template
nano ~/Projects/Sergey/git-hooks-templates/pre-commit

# Переустановить в проект
bash ~/Projects/Sergey/git-hooks-templates/install.sh
```

---

## 📊 Рекомендации

### Для новичков:

✅ **Установите все hooks** - они помогут избежать ошибок
✅ **Читайте сообщения** - hooks объясняют что не так
✅ **Не используйте --no-verify** без понимания зачем

### Для продвинутых:

✅ Настройте hooks под свой workflow
✅ Добавьте свои проверки (linting, tests)
✅ Используйте husky для Node.js проектов

---

## 🔧 Расширение hooks

### Добавить свою проверку в pre-commit:

```bash
# Редактировать ~/Projects/Sergey/git-hooks-templates/pre-commit

# Добавить в конец (перед "checks passed"):

# ============================================
# 4️⃣ Ваша проверка
# ============================================

echo "  Running custom check..."

# Ваш код здесь
if [ условие ]; then
  echo "  ❌ Custom check failed!"
  exit 1
fi
```

---

## 💡 Примеры использования

### Сценарий 1: Случайно добавил .env

```bash
git add .
git commit -m "feat: new feature"

# Hook блокирует:
❌ ERROR: .env files should not be committed!
Files:
.env

Add to .gitignore and remove from staging:
git reset HEAD .env*

# Исправляем:
git reset HEAD .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: add .env to gitignore"
```

### Сценарий 2: Неправильный формат commit

```bash
git commit -m "fixed bug"

# Hook блокирует:
❌ Invalid commit message format!
Format should be: <type>: <description>

# Исправляем:
git commit -m "fix: resolve authentication bug"
```

### Сценарий 3: Push в main

```bash
git push

# Hook предупреждает:
⚠️  WARNING: You are pushing to main branch!
Are you sure you want to push to main? (yes/no): no
❌ Push aborted.

# Переключаемся на feature ветку:
git checkout -b feature/my-changes
git push -u origin feature/my-changes
```

---

## 🔗 Связанные документы

- [HOW-TO-USE.md](../HOW-TO-USE.md) - Git workflow
- [MultiBOT/GIT-COMMANDS.md](../../MultiBOT/GIT-COMMANDS.md) - Git шпаргалка

---

## 🔄 Версионирование

**Версия**: 1.0
**Создано**: 2025-10-20

---

**Hooks помогут избежать ошибок и улучшат Git workflow! 🚀**
