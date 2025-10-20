# 🎯 Sergey - Главный проект

> **Центр управления всеми проектами Сергея**
> Global instructions, documentation, и настройки для всех проектов

---

## 📋 Что здесь:

| Файл | Описание |
|------|----------|
| **[CLAUDE.md](CLAUDE.md)** | 🤖 Главный промпт для Claude Code |
| **[PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)** | 🗺️ Карта всех проектов |
| **[HOW-TO-USE.md](HOW-TO-USE.md)** | 📖 Шпаргалка: как работать с workspace |
| `.vscode/settings.json` | ⚙️ Настройки VS Code для этой папки |

---

## 🚀 Быстрый старт

### Открыть workspace:

```bash
code ~/Projects/Sergey-Projects.code-workspace
```

Или двойной клик на `Sergey-Projects.code-workspace`

### Прочитать документацию:

1. **Начни с** [HOW-TO-USE.md](HOW-TO-USE.md) - шпаргалка для работы
2. **Потом** [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - карта проектов
3. **Для Claude** [CLAUDE.md](CLAUDE.md) - промпт

---

## 🎯 Назначение этого проекта

### Для пользователя (Sergey):
- 📚 **Центральная документация** для всех проектов
- 🗺️ **Навигация** - карта всех проектов
- 📖 **Шпаргалки** - как работать с VS Code, Git, workspace

### Для Claude Code:
- 🤖 **Главный промпт** - глобальные правила работы
- 🎓 **Контекст** - понимание структуры всех проектов
- 🔗 **Связи** - как проекты связаны между собой

---

## 📊 Структура проектов

```
Projects/
│
├── 🎯 Sergey/                       ← ВЫ ЗДЕСЬ
│   ├── CLAUDE.md
│   ├── PROJECT-STRUCTURE.md
│   ├── HOW-TO-USE.md
│   ├── README.md (этот файл)
│   └── .vscode/
│
├── 📚 n8n-docs/                     ← Документация
├── 🤖 MultiBOT/                     ← Telegram бот
├── 🍎 food-tracker-v2/              ← Food tracking
├── 🎥 youtube-transcript/           ← YouTube транскрипция
├── 📝 transcript-service/           ← Transcript service
├── 🔌 mcp-server/                   ← MCP server
├── 📦 n8n-automation-archive/       ← Архивы
│
└── Sergey-Projects.code-workspace   ← Workspace (объединяет всё)
```

---

## 💡 Зачем нужен этот проект?

### Проблема (было):
- Каждый проект в отдельном окне VS Code
- Переключение между проектами неудобно
- Настройки дублируются в каждом проекте
- Claude не видит общую картину
- Нет единых правил работы

### Решение (стало):
- ✅ **Multi-Root Workspace** - все проекты в одном окне
- ✅ **Глобальные инструкции** для Claude
- ✅ **Центральная документация** и карта проектов
- ✅ **Единые настройки** VS Code для всех проектов
- ✅ **Навигация** между проектами одним кликом

---

## 🔗 Связанные документы

### В этом проекте:
- [HOW-TO-USE.md](HOW-TO-USE.md) - Как работать
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Карта проектов
- [CLAUDE.md](CLAUDE.md) - Промпт для Claude

### В других проектах:
- [MultiBOT/README.md](../MultiBOT/README.md) - Документация MultiBOT
- [MultiBOT/ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md) - Архитектура системы
- [MultiBOT/GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md) - Git шпаргалка

---

## 🛠️ Как редактировать

### Изменить промпт для Claude:

1. Открыть [CLAUDE.md](CLAUDE.md)
2. Внести изменения
3. Сохранить (Cmd+S)
4. При следующей сессии Claude прочитает обновленный файл

### Добавить проект в workspace:

1. Открыть `~/Projects/Sergey-Projects.code-workspace`
2. Добавить в секцию `"folders"`:
```json
{
  "name": "🔥 New Project",
  "path": "/Users/sergey/Projects/new-project"
}
```
3. Сохранить
4. Reload workspace (Command Palette → "Reload Window")

### Обновить карту проектов:

1. Открыть [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
2. Добавить описание нового проекта
3. Обновить диаграммы
4. Сохранить

---

## 🎓 Для новичков

### Если вы впервые здесь:

1. **Читайте по порядку:**
   - [HOW-TO-USE.md](HOW-TO-USE.md) ← НАЧНИ ЗДЕСЬ
   - [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
   - [CLAUDE.md](CLAUDE.md)

2. **Откройте workspace:**
   ```bash
   code ~/Projects/Sergey-Projects.code-workspace
   ```

3. **Попробуйте:**
   - Переключиться между проектами (Cmd+P)
   - Найти файл глобально (Cmd+Shift+F)
   - Открыть терминал для проекта (правый клик → Terminal)

4. **Попросите помощь у Claude:**
   ```
   "Объясни структуру проектов"
   "Как работать с workspace?"
   "Покажи примеры использования"
   ```

---

## 📝 Версия

**Версия**: 1.0
**Создано**: 2025-10-20
**Автор**: Claude Code (по запросу Sergey)

### Changelog:
- `1.0` (2025-10-20) - Первая версия проекта Sergey

---

## 🎯 Следующие шаги

### Для проекта Sergey:
- ⏭️ Добавить Git integration (инициализировать репозиторий)
- ⏭️ Добавить templates для новых проектов
- ⏭️ Создать автоматизацию для создания новых проектов

### Для вас:
- ⏭️ Прочитать всю документацию
- ⏭️ Поработать с workspace
- ⏭️ Настроить под себя (если нужно)

---

**Этот проект - фундамент для всех остальных! 🚀**

**Вопросы? Читай [HOW-TO-USE.md](HOW-TO-USE.md) или спроси Claude Code! 😊**
