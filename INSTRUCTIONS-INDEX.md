# 📋 Индекс всех Claude Instructions

> **Навигация по всем файлам-промптам для Claude Code**

---

## 🎯 Глобальные инструкции

| Файл | Описание | Читать |
|------|----------|--------|
| **[CLAUDE-GLOBAL-INSTRUCTIONS.md](CLAUDE-GLOBAL-INSTRUCTIONS.md)** | 🌟 Главный промпт для всех проектов | **ВСЕГДА** |

---

## 📚 Локальные инструкции по проектам

### 🎯 Sergey (Main Project)
**Расположение:** `/Users/sergey/Projects/Sergey/`

Файлы:
- [README.md](README.md) - Обзор проекта
- [CLAUDE-GLOBAL-INSTRUCTIONS.md](CLAUDE-GLOBAL-INSTRUCTIONS.md) - Главный промпт
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Карта проектов
- [HOW-TO-USE.md](HOW-TO-USE.md) - Шпаргалка
- [INSTRUCTIONS-INDEX.md](INSTRUCTIONS-INDEX.md) - Этот файл

---

### 📚 n8n-docs
**Расположение:** `/Users/sergey/Projects/n8n-docs/`
**Статус:** 📚 Active Documentation

**Claude Instructions:**
- [CLAUDE-INSTRUCTIONS.md](../n8n-docs/CLAUDE-INSTRUCTIONS.md) - Локальные инструкции

**Дополнительно (КРИТИЧНО):**
- [MUST-READ.md](../n8n-docs/MUST-READ.md) - ⭐ Читать ВСЕГДА!
- [LEARNINGS.md](../n8n-docs/LEARNINGS.md) - Ошибки прошлого
- [PATTERNS.md](../n8n-docs/PATTERNS.md) - Готовые решения
- [CLAUDE_CODE_WORKFLOW.md](../n8n-docs/CLAUDE_CODE_WORKFLOW.md) - Workflow

---

### 🤖 MultiBOT
**Расположение:** `/Users/sergey/Projects/MultiBOT/`
**Статус:** 🚧 Active Development (Week 2)

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../MultiBOT/docs/CLAUDE-INSTRUCTIONS.md)

**Дополнительная документация:**
- [ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md)
- [DATABASE-CURRENT-SCHEMA.md](../MultiBOT/DATABASE-CURRENT-SCHEMA.md)
- [ROADMAP.md](../MultiBOT/ROADMAP.md)
- [CURRENT-STATUS.md](../MultiBOT/CURRENT-STATUS.md)
- [GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md)

---

### 🍎 Food Tracker V2
**Расположение:** `/Users/sergey/Projects/food-tracker-v2/`
**Статус:** 🔄 Migration to MultiBOT

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../food-tracker-v2/docs/CLAUDE-INSTRUCTIONS.md)

**Примечание:** Legacy project, переносится в MultiBOT

---

### 🎥 YouTube Transcript
**Расположение:** `/Users/sergey/Projects/youtube-transcript/`
**Статус:** ⏸️ Planning

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../youtube-transcript/docs/CLAUDE-INSTRUCTIONS.md)

---

### 📝 Transcript Service
**Расположение:** `/Users/sergey/Projects/transcript-service/`
**Статус:** ⏸️ Planning

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../transcript-service/docs/CLAUDE-INSTRUCTIONS.md)

---

### 🔌 MCP Server
**Расположение:** `/Users/sergey/Projects/mcp-server/`
**Статус:** ⏸️ Planning/Development

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../mcp-server/docs/CLAUDE-INSTRUCTIONS.md)

---

### 📦 n8n Automation Archive
**Расположение:** `/Users/sergey/Projects/n8n-automation-archive/`
**Статус:** 📦 Archive (read-only)

**Claude Instructions:**
- [docs/CLAUDE-INSTRUCTIONS.md](../n8n-automation-archive/docs/CLAUDE-INSTRUCTIONS.md)

**Примечание:** Только для референса, активная работа в n8n-docs

---

## 🔄 Приоритет чтения инструкций

### Когда Claude начинает работу с проектом:

```
1. Sergey/CLAUDE-GLOBAL-INSTRUCTIONS.md           (глобальные правила)
        ↓
2. project/docs/CLAUDE-INSTRUCTIONS.md            (локальные правила)
        ↓
3. Дополнительные файлы проекта (если есть)
   - n8n-docs: MUST-READ.md, LEARNINGS.md, PATTERNS.md
   - MultiBOT: ARCHITECTURE.md, DATABASE-CURRENT-SCHEMA.md
```

---

## 📊 Статистика проектов

| Проект | Статус | Instructions | Дополнительно |
|--------|--------|--------------|---------------|
| **Sergey** | 📚 Docs | ✅ Global | 4 файла |
| **n8n-docs** | 📚 Active | ✅ Local | 4 критичных |
| **MultiBOT** | 🚧 Dev | ✅ Local | 5 docs |
| **Food Tracker V2** | 🔄 Migration | ✅ Local | - |
| **YouTube Transcript** | ⏸️ Planning | ✅ Local | - |
| **Transcript Service** | ⏸️ Planning | ✅ Local | - |
| **MCP Server** | ⏸️ Planning | ✅ Local | - |
| **n8n Archive** | 📦 Archive | ✅ Local | Read-only |

**Всего:** 8 проектов, 8 наборов инструкций

---

## 🎓 Для новых проектов

### Checklist при создании нового проекта:

```bash
new-project/
├── docs/
│   └── CLAUDE-INSTRUCTIONS.md    ← Создать из template
├── README.md                      ← Описание проекта
├── .gitignore                     ← Что не коммитить
└── .vscode/
    ├── settings.json              ← Локальные настройки
    └── tasks.json                 ← Tasks для автоматизации
```

### Template для CLAUDE-INSTRUCTIONS.md:

См. `/Users/sergey/Projects/Sergey/templates/` (будет создан следующим шагом)

---

## 🔄 Обновление инструкций

### Как обновлять:

1. **Глобальные:** Редактируй `Sergey/CLAUDE-GLOBAL-INSTRUCTIONS.md`
2. **Локальные:** Редактируй `project/docs/CLAUDE-INSTRUCTIONS.md`
3. **Этот индекс:** Добавь новый проект сюда

### Git workflow:

```bash
git add docs/CLAUDE-INSTRUCTIONS.md
git commit -m "docs: update Claude instructions for [project]"
git push
```

---

## 🔗 Связанные документы

- [CLAUDE-GLOBAL-INSTRUCTIONS.md](CLAUDE-GLOBAL-INSTRUCTIONS.md) - Главный промпт
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Карта проектов
- [HOW-TO-USE.md](HOW-TO-USE.md) - Как работать с workspace

---

## 🔄 Версионирование

**Версия**: 1.0
**Создано**: 2025-10-20
**Обновлено**: 2025-10-20

### Changelog:
- `1.0` (2025-10-20) - Первая версия индекса, все проекты покрыты инструкциями

---

**Этот индекс поможет найти нужные инструкции для любого проекта! 🗺️**

**Claude, используй этот индекс для навигации по инструкциям! 🤖**
