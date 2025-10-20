# 📖 Как работать с Sergey Projects Workspace

> **Шпаргалка для ежедневной работы**
> Быстрый старт и полезные советы

---

## 🚀 Быстрый старт

### 1️⃣ Открыть workspace:

**Вариант А: Из файлового менеджера**
```
Finder → Projects → Sergey-Projects.code-workspace
Двойной клик → VS Code откроется
```

**Вариант Б: Из терминала**
```bash
code ~/Projects/Sergey-Projects.code-workspace
```

**Вариант В: Из VS Code**
```
File → Open Workspace from File...
→ Выбрать Sergey-Projects.code-workspace
```

### 2️⃣ Что вы увидите:

```
Explorer (левая панель):
├── 🎯 SERGEY (MAIN)        ← Главный проект
│   ├── CLAUDE-GLOBAL-INSTRUCTIONS.md
│   ├── PROJECT-STRUCTURE.md
│   └── HOW-TO-USE.md (этот файл)
│
├── 📚 N8N-DOCS             ← Документация
├── 🤖 MULTIBOT             ← Telegram бот
├── 🍎 FOOD TRACKER V2      ← Food tracking
├── 🎥 YOUTUBE TRANSCRIPT   ← Транскрипция
├── 📝 TRANSCRIPT SERVICE   ← Transcript service
├── 🔌 MCP SERVER           ← MCP server
└── 📦 ARCHIVES (N8N)       ← Архивы
```

Все проекты **одновременно** в одном окне! 🎉

---

## 🎯 Работа с проектами

### Переключение между проектами:

**Быстро:**
```
Cmd+P                    # Quick Open
Введите часть имени файла
Enter
```

**Через Explorer:**
```
Клик на название проекта в левой панели
→ Развернуть папку
→ Открыть нужный файл
```

### Поиск по всем проектам:

```
Cmd+Shift+F              # Глобальный поиск
Введите текст
→ Результаты из ВСЕХ проектов
```

### Открыть терминал для конкретного проекта:

```
1. Кликните правой кнопкой на название проекта
2. "Open in Integrated Terminal"
3. Терминал откроется в папке этого проекта
```

---

## 🤖 Работа с Claude Code

### Как Claude знает что делать:

1. **Сначала** Claude читает `Sergey/CLAUDE-GLOBAL-INSTRUCTIONS.md` (глобальные правила)
2. **Потом** ищет локальный `project/docs/CLAUDE-INSTRUCTIONS.md` (если есть)
3. **Применяет** локальные правила поверх глобальных

### Примеры:

**В проекте MultiBOT:**
```
Вы: "Добавь новую функцию"
Claude: [Читает CLAUDE-GLOBAL-INSTRUCTIONS.md]
        [Читает MultiBOT/docs/CLAUDE-INSTRUCTIONS.md]
        [Применяет правила MultiBOT + глобальные]
```

**В проекте без локальных инструкций:**
```
Вы: "Помоги с кодом"
Claude: [Читает только CLAUDE-GLOBAL-INSTRUCTIONS.md]
        [Работает по глобальным правилам]
```

### Активировать глубокое обдумывание:

Используйте ключевые фразы:
```
"Подумай стратегически над..."
"Проанализируй все варианты..."
"Сравни несколько подходов..."
"Рассмотри архитектуру с точки зрения масштабирования..."
```

Claude переключится в режим **максимального анализа** 🧠

---

## ⚙️ Настройки VS Code

### Где какие настройки:

```
Sergey-Projects.code-workspace      ← Глобальные для ВСЕХ проектов
├── settings (workspace level)
│
├── Sergey/.vscode/settings.json    ← Только для Sergey
├── MultiBOT/.vscode/settings.json  ← Только для MultiBOT
└── ... другие проекты
```

### Приоритет настроек:

```
Локальные (.vscode/settings.json)
    ↓ переопределяют
Workspace (Sergey-Projects.code-workspace)
    ↓ переопределяют
Глобальные VS Code (User Settings)
```

### Как изменить настройки:

**Для всех проектов:**
```
Code → Settings → Workspace
Или редактировать Sergey-Projects.code-workspace
```

**Для одного проекта:**
```
Создать/редактировать project/.vscode/settings.json
```

---

## 🔄 Git workflow

### Базовый workflow:

```bash
# 1. Начало работы
git pull                 # Получить последние изменения

# 2. Работа с кодом
# ... делаете изменения ...

# 3. Проверка
git status               # Что изменилось?
git diff                 # Какие именно изменения?

# 4. Сохранение
git add .                # Добавить всё
git commit -m "feat: описание"  # Коммит
git push                 # Отправить на GitHub
```

### Через VS Code Tasks:

```
Cmd+Shift+P → "Tasks: Run Task"

Популярные задачи:
├─ 🚀 Start Development  (pull + install + run)
├─ 📦 Finish Work        (add + commit + push)
├─ Git: Status
├─ Git: Quick Push
└─ Git: Log
```

### Source Control панель:

```
Cmd+Shift+G              # Открыть Source Control
→ Видите все изменения
→ + рядом с файлом = git add
→ Галочка вверху = commit
→ ... меню = push/pull
```

---

## 💡 Полезные горячие клавиши

### Навигация:

```bash
Cmd+P                # Quick Open (файлы)
Cmd+Shift+P          # Command Palette (команды)
Cmd+B                # Toggle Sidebar (показать/скрыть)
Cmd+Shift+E          # Explorer
Cmd+Shift+F          # Поиск по всем файлам
Cmd+Shift+G          # Source Control (Git)
Cmd+`                # Терминал
```

### Редактирование:

```bash
Cmd+D                # Выделить следующее совпадение
Cmd+Shift+L          # Выделить все совпадения
Cmd+/                # Закомментировать строку
Cmd+[                # Уменьшить отступ
Cmd+]                # Увеличить отступ
Option+↑ / ↓         # Переместить строку вверх/вниз
Shift+Option+↑ / ↓   # Дублировать строку
```

### Работа с файлами:

```bash
Cmd+N                # Новый файл
Cmd+W                # Закрыть файл
Cmd+S                # Сохранить
Cmd+Shift+S          # Сохранить как...
Cmd+K Cmd+W          # Закрыть все файлы
```

---

## 📁 Структура файлов (best practices)

### В каждом проекте должно быть:

```
project/
├── README.md                    ← Описание проекта
├── docs/                        ← Документация
│   ├── CLAUDE-INSTRUCTIONS.md   ← Промпт для Claude (если нужен)
│   ├── ARCHITECTURE.md          ← Архитектура (для сложных проектов)
│   └── API.md                   ← API документация (если есть API)
├── src/                         ← Исходный код
├── .vscode/                     ← Настройки VS Code
│   ├── settings.json            ← Локальные настройки
│   └── tasks.json               ← Tasks для автоматизации
├── .gitignore                   ← Что не коммитить
├── package.json                 ← Зависимости (для Node.js)
└── .env                         ← Credentials (НЕ коммитить!)
```

---

## 🔍 Поиск и навигация

### Поиск файлов:

```bash
Cmd+P                            # По имени файла
→ Введите часть имени
→ Enter

Примеры:
"arc"         → найдёт ARCHITECTURE.md
"telbot"      → найдёт telegram-bot.js
"readme"      → найдёт все README.md
```

### Поиск по содержимому:

```bash
Cmd+Shift+F                      # Глобальный поиск
→ Введите текст
→ Можно фильтровать по типу файлов

Примеры:
"async function"                 # Найти все async функции
"TODO"                           # Найти все TODO
"суpabase"                       # Найти где используется Supabase
```

### Переход к определению:

```bash
F12                              # Go to Definition
Cmd+Click                        # Тоже самое
Cmd+T                            # Go to Symbol in Workspace
```

---

## 🎓 Типичный рабочий день

### Утро (начало работы):

```bash
1. Открыть workspace:
   code ~/Projects/Sergey-Projects.code-workspace

2. Получить последние изменения:
   Cmd+Shift+P → "Tasks: Run Task" → "🚀 Start Development"

3. Проверить TODO:
   Cmd+Shift+F → "TODO" → Enter
```

### День (работа):

```bash
1. Работаете с Claude Code:
   - Просите помощь
   - Делаете изменения
   - Тестируете

2. Периодически коммитите:
   git add . && git commit -m "feat: описание"

3. Переключаетесь между проектами:
   Cmd+P → вводите имя файла
```

### Вечер (завершение):

```bash
1. Сохранить всё:
   Cmd+Shift+P → "Tasks: Run Task" → "📦 Finish Work"

2. Проверить что залито:
   git log -1

3. Закрыть VS Code с чистой совестью 😊
```

---

## 🚨 Частые проблемы и решения

### Проблема: "Git конфликт при pull"

**Решение:**
```bash
1. git status                    # Посмотреть конфликтующие файлы
2. Открыть файлы, найти маркеры:
   <<<<<<< HEAD
   ваш код
   =======
   чужой код
   >>>>>>> origin/main

3. Исправить вручную (оставить нужное)
4. Удалить маркеры
5. git add . && git commit -m "resolve merge conflict"
```

### Проблема: "VS Code тормозит"

**Решение:**
```bash
1. Закрыть ненужные файлы: Cmd+K Cmd+W
2. Перезапустить VS Code
3. Проверить что не индексируется node_modules:
   Settings → Files: Exclude → добавить **/node_modules
```

### Проблема: "Claude не видит мои инструкции"

**Решение:**
```bash
1. Проверить файл существует:
   Sergey/CLAUDE-GLOBAL-INSTRUCTIONS.md

2. Проверить формат:
   - Файл должен быть .md
   - Кодировка UTF-8

3. Перезапустить Claude Code сессию
```

### Проблема: "Не могу найти проект"

**Решение:**
```bash
1. Убедитесь что workspace открыт:
   File → Open Workspace → Sergey-Projects.code-workspace

2. Проверьте что проект добавлен:
   Редактировать Sergey-Projects.code-workspace
   → Должен быть в "folders"
```

---

## 📚 Полезные ресурсы

### Документация:

- [CLAUDE-GLOBAL-INSTRUCTIONS.md](CLAUDE-GLOBAL-INSTRUCTIONS.md) - Главный промпт
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Карта проектов
- [MultiBOT/README.md](../MultiBOT/README.md) - Документация MultiBOT
- [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md) - Git шпаргалка

### VS Code:

- Официальная документация: https://code.visualstudio.com/docs
- Shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf
- Multi-Root Workspaces: https://code.visualstudio.com/docs/editor/multi-root-workspaces

### Git:

- Git шпаргалка: [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md)
- Git книга: https://git-scm.com/book/ru/v2

---

## 💬 Нужна помощь?

### Спросите Claude Code:

```
"Как работать с workspace?"
"Объясни структуру проектов"
"Покажи как использовать Git Tasks"
"Подумай стратегически: как организовать новый проект?"
```

### Проверьте документацию:

1. Сначала смотрите файлы в проекте `Sergey/`
2. Потом локальную документацию проекта
3. Потом спрашивайте Claude

---

## 🎯 Следующие шаги

### Для новичка:

1. ✅ Открыть workspace
2. ✅ Прочитать [CLAUDE-GLOBAL-INSTRUCTIONS.md](CLAUDE-GLOBAL-INSTRUCTIONS.md)
3. ✅ Прочитать [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
4. ⏭️ Поработать с MultiBOT (основной проект)
5. ⏭️ Изучить Git workflow

### Для продвинутого:

1. ⏭️ Настроить свои горячие клавиши
2. ⏭️ Установить рекомендуемые расширения
3. ⏭️ Создать свои Tasks для автоматизации
4. ⏭️ Настроить Git aliases

---

**Удачной работы! 🚀**

**Есть вопросы? Спросите Claude Code - я всегда рад помочь! 😊**
