# 🗺️ Карта проектов Сергея

> **Полная структура всех проектов в workspace**
> Обновлено: 2025-10-20

---

## 📊 Общая архитектура

**Реальная структура workspace:**

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

## 🎯 Проект: Sergey (Главный)

**Расположение:** `/Users/sergey/Projects/Sergey/`

### Назначение:
Главный проект с **глобальными инструкциями** и **общей документацией** для всех проектов.

### Содержимое:

| Файл | Описание |
|------|----------|
| `CLAUDE.md` | 🤖 Главный промпт для Claude Code |
| `PROJECT-STRUCTURE.md` | 🗺️ Карта всех проектов (этот файл) |
| `HOW-TO-USE.md` | 📖 Шпаргалка: как работать с workspace |
| `docs/` | 📚 Общая документация |
| `.vscode/settings.json` | ⚙️ Глобальные настройки VS Code |

### Связи:
- **Родитель** для всех остальных проектов
- **Читается первым** при запуске Claude Code
- **Приоритет**: Локальные инструкции переопределяют глобальные

---

## 🤖 Проект: MultiBOT

**Расположение:** `/Users/sergey/Projects/MultiBOT/`

### Назначение:
Модульная платформа для Telegram ботов с общей инфраструктурой.

### Технологии:
- **Backend**: Node.js 20, JavaScript
- **Bot**: node-telegram-bot-api
- **DB**: Supabase (PostgreSQL)
- **AI**: OpenAI (Whisper, GPT-4o Vision)
- **Automation**: n8n
- **Barcode**: @zxing/library

### Статус:
🚧 **Active Development** - Week 2 (Phase 1)

### Текущий фокус:
- Voice handler (Whisper transcription)
- Photo handler (GPT-4o Vision)
- Barcode scanner (OpenFoodFacts API)
- Product search (3-tier fallback)

### Структура:

```
MultiBOT/
├── src/
│   └── telegram-bot.js              # Main bot code
├── workflows/
│   └── router-mini.json             # n8n workflow
├── mini-app/
│   └── server.js                    # Barcode scanner web app
├── docs/
│   ├── CLAUDE-INSTRUCTIONS.md       # Локальный промпт
│   ├── ARCHITECTURE.md              # Архитектура системы
│   ├── DATABASE-CURRENT-SCHEMA.md   # Схема БД
│   ├── ROADMAP.md                   # План развития (Week 1-12)
│   └── CURRENT-STATUS.md            # Текущий статус
├── .vscode/
│   ├── settings.json                # Настройки VS Code
│   └── tasks.json                   # Git автоматизация
├── package.json                     # Dependencies
├── .env                             # Credentials (gitignored)
└── README.md                        # Документация
```

### База данных:
**Supabase Project**: One project, namespaced tables

**Shared tables** (для всех ботов):
- `users` - все пользователи
- `user_settings` - настройки
- `goals` - цели (calories, protein, steps, water, sleep)
- `daily_summaries` - дневные агрегаты

**MultiBOT tables** (`multibot_*`):
- Coming soon...

### Git:
- **Repo**: https://github.com/360AYA25/MultiBOT
- **Branch**: `feature/week-2-handlers`
- **Main**: `main`

### Документация:
- [ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md) - Архитектура
- [ROADMAP.md](../MultiBOT/ROADMAP.md) - План развития
- [CURRENT-STATUS.md](../MultiBOT/CURRENT-STATUS.md) - Текущий статус
- [GIT-COMMANDS.md](../MultiBOT/GIT-COMMANDS.md) - Git шпаргалка

---

## 🍎 Проект: FoodTracker

**Расположение:** `/Users/sergey/Projects/n8n-docs/FoodTracker/`

### Назначение:
Telegram бот для трекинга еды, калорий, макронутриентов.

### Технологии:
- **Backend**: Node.js
- **Bot**: Telegram Bot API
- **DB**: Supabase (`foodtracker_*` tables)
- **AI**: OpenAI GPT для поиска продуктов
- **Visualization**: Notion (Phase 1), QuickChart (Phase 3+)

### Статус:
🔄 **Migration to MultiBOT** - переносится в MultiBOT как sub-bot

### База данных:

**FoodTracker tables** (`foodtracker_*`):
- `foodtracker_entries` - записи о еде (все приёмы пищи)
- `food_products` - база продуктов

### Особенности:
- **Input**: text, voice, photo, barcode
- **Processing**: Smart product search (3-tier: DB → OpenFoodFacts → GPT)
- **Output**: Daily format (1 day = 1 entry), Notion sync

---

## ⚡ Проект: n8n-automation

**Расположение:** `/Users/sergey/Projects/n8n-docs/n8n-automation/`

### Назначение:
Хранилище n8n workflows для автоматизации и интеграций.

### Содержимое:
- **Workflows**: JSON файлы с n8n workflows
- **Shared workflows**: Общие для всех проектов
- **Документация**: Описание каждого workflow

### Типы workflows:
- **Router workflows** - маршрутизация запросов
- **Integration workflows** - интеграции с API
- **Processing workflows** - обработка данных
- **Notification workflows** - уведомления

### Связи:
- Используется **MultiBOT** для оркестрации
- Используется **FoodTracker** для обработки
- Интеграция с **Supabase**, **OpenAI**, **Notion**

---

## 🎥 Проект: youtube-transcription

**Расположение:** `/Users/sergey/Projects/n8n-docs/youtube-transcription/`

### Назначение:
Инструменты для транскрипции YouTube видео.

### Технологии:
- **AI**: OpenAI Whisper (transcription)
- **Video**: youtube-dl / yt-dlp
- **Output**: Text, SRT субтитры

### Статус:
⏸️ **Planning** - в планах

### Возможности:
- Транскрипция YouTube видео
- Генерация субтитров
- Перевод на другие языки
- Саммаризация контента

---

## 📦 Проект: archives

**Расположение:** `/Users/sergey/Projects/n8n-docs/archives/`

### Назначение:
Архив старых проектов, документации, экспериментов.

### Содержимое:
- Старые версии проектов
- Устаревшая документация
- Эксперименты и прототипы

---

## 🔗 Связи между проектами

### Диаграмма зависимостей:

```
┌─────────────────────────────────────────────────┐
│           Supabase (PostgreSQL)                 │
│        Единая БД для всех проектов              │
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

### Общие ресурсы:

| Ресурс | Расположение | Используется в |
|--------|--------------|----------------|
| **Credentials** | `~/credentials/n8n-access.md` | Все проекты |
| **Supabase DB** | Cloud (qyemyvplvtzpukvktkae) | Все проекты |
| **OpenAI API** | Один ключ | MultiBOT, FoodTracker, YouTube |
| **n8n Instance** | n8n.srv1068954.hstgr.cloud | Все проекты |

---

## 📋 Workspace: Sergey-Projects.code-workspace

**Расположение:** `/Users/sergey/Projects/Sergey-Projects.code-workspace`

### Назначение:
Multi-Root Workspace файл который объединяет **все проекты** в один workspace.

### Содержимое:

```json
{
  "folders": [
    { "name": "🎯 Sergey (Main)", "path": "/Users/sergey/Projects/Sergey" },
    { "name": "🤖 MultiBOT", "path": "/Users/sergey/Projects/MultiBOT" },
    { "name": "📚 n8n-docs", "path": "/Users/sergey/Projects/n8n-docs" },
    // ... другие проекты
  ],
  "settings": { /* глобальные настройки */ }
}
```

### Как открыть:
```bash
# Из терминала
code ~/Projects/Sergey-Projects.code-workspace

# Или двойной клик на файл
```

---

## 🎯 Приоритеты разработки

### Phase 1 (Week 1-2) - ТЕКУЩИЙ:
✅ Week 1: Foundation (DONE)
🔄 Week 2: MultiBOT Feature Parity (IN PROGRESS)

### Phase 2 (Week 3-4):
⏸️ Production Polish & Deployment

### Phase 3+ (Week 5-12):
⏸️ Evolution (Cache, Frugal AI, Security, Reports)

---

## 📊 Статистика проектов

| Проект | Статус | Language | Lines | Files |
|--------|--------|----------|-------|-------|
| **Sergey** | 📚 Docs | Markdown | ~500 | 4 |
| **MultiBOT** | 🚧 Dev | JavaScript | ~2000 | 15+ |
| **FoodTracker** | 🔄 Migration | JavaScript | ~1500 | 10+ |
| **n8n-automation** | ⏸️ Stable | JSON | ~5000 | 20+ |
| **YouTube** | ⏸️ Planning | - | - | - |

---

## 🔄 Версионирование

**Версия**: 1.0
**Создано**: 2025-10-20
**Автор**: Claude Code
**Последнее обновление**: 2025-10-20

### Changelog:
- `1.0` (2025-10-20) - Первая версия карты проектов

---

## 📚 Связанные документы

- [CLAUDE.md](CLAUDE.md) - Главный промпт
- [HOW-TO-USE.md](HOW-TO-USE.md) - Как работать с workspace
- [MultiBOT/README.md](../MultiBOT/README.md) - Документация MultiBOT
- [MultiBOT/ARCHITECTURE.md](../MultiBOT/ARCHITECTURE.md) - Архитектура системы

---

**Эта карта поможет ориентироваться во всех проектах! 🗺️**
