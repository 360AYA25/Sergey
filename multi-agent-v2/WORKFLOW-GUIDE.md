# 🚀 Multi-Agent Orchestrator - Гайд по запуску

## 📍 Где ты находишься vs Что делать

### Сценарий 1: Работа с оркестратором

```
📂 /Users/sergey/Projects/Sergey/multi-agent-v2/  ← ТЫ ЗДЕСЬ
```

**✅ Правильный workflow:**

```bash
# 1. Запускаешь Claude Code CLI здесь
cd /Users/sergey/Projects/Sergey/multi-agent-v2
code .

# 2. В Claude Code говоришь:
"Создай webhook для Telegram уведомлений"

# 3. Claude Code ДОЛЖЕН запустить:
./start.sh -i "Create webhook for Telegram notifications"

# 4. Ты выбираешь план (1-3 или Enter)

# 5. Оркестратор автоматически:
#    Phase 1: Planning (3 агента создают планы)
#    Phase 2: Voting (ты выбираешь лучший)
#    Phase 3: Building (n8n-builder создает workflow)
#    Phase 4: Validation (n8n-validator проверяет)
#    Phase 5: Debugging (n8n-debugger чинит ошибки)
#    Phase 6: Review (n8n-reviewer оценивает качество)
#    Phase 7: Knowledge (сохраняет в PATTERNS.json)
```

**❌ НЕПРАВИЛЬНО - Claude НЕ ДОЛЖЕН делать:**

```bash
# Claude не должен вызывать агентов напрямую:
claude agent run n8n-planner-gpt      # ❌ НЕТ!
claude agent run n8n-builder          # ❌ НЕТ!

# Claude не должен сам строить workflow   # ❌ НЕТ!
# Он должен быть ИНТЕРФЕЙСОМ, не EXECUTOR!
```

---

### Сценарий 2: Работа в MultiBOT проекте

```
📂 /Users/sergey/Projects/MultiBOT/  ← ТЫ ЗДЕСЬ
```

**Вариант A: Создать n8n workflow через оркестратор**

```bash
# 1. Переходишь в multi-agent-v2:
cd /Users/sergey/Projects/Sergey/multi-agent-v2

# 2. Запускаешь оркестратор:
./start.sh -i "Create webhook for MultiBOT food tracking"

# 3. Workflow создан, копируешь в MultiBOT
```

**Вариант B: Ручная работа с workflow (без оркестратора)**

```bash
# Остаешься в MultiBOT
cd /Users/sergey/Projects/MultiBOT

# Запускаешь Claude Code
code .

# Claude Code работает напрямую с n8n
# Следует инструкциям из docs/shared/CLAUDE.md
```

---

## 🎯 Ключевые понятия

### Claude Code в multi-agent-v2/

```
┌─────────────────────────────────────┐
│  Ты (Сергей)                        │
│  "Создай webhook для Telegram"      │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Claude Code (UI/Interface)         │
│  Понимает задачу                    │
│  Запускает: ./start.sh -i "..."    │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  orchestrator.js (Coordinator)      │
│  Координирует 7 агентов             │
└──────────────┬──────────────────────┘
               ↓
      ┌────────┴────────┐
      ↓                 ↓
┌──────────┐      ┌──────────┐
│ Planner  │ ...  │ Builder  │ ... (7 agents)
│   GPT    │      │   GPT    │
└──────────┘      └──────────┘
```

**Роль Claude Code:** Интерфейс (не executor!)

---

### Claude Code в MultiBOT/

```
┌─────────────────────────────────────┐
│  Ты (Сергей)                        │
│  "Добавь обработку фото в workflow" │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Claude Code (Executor)             │
│  Сам делает изменения в n8n         │
│  Использует MCP tools напрямую      │
└─────────────────────────────────────┘
```

**Роль Claude Code:** Executor (делает сам!)

---

## 📋 Правила приоритета промптов

### Когда в `/multi-agent-v2/`:

```
1. Sergey/CLAUDE.md (Multi-Agent Orchestrator правило)
   └─> "Use orchestrator, don't call agents directly"

2. .claude/agents/* (игнорируются в interactive mode)
   └─> Агенты вызываются ТОЛЬКО через orchestrator.js
```

### Когда в `/MultiBOT/`:

```
1. Sergey/CLAUDE.md (глобальные правила)
2. MultiBOT/CLAUDE.md (проект-специфичные)
3. docs/shared/CLAUDE.md (n8n workflow правила)
```

---

## 🧪 Тестирование правильного поведения

### Проверь, что Claude Code ведет себя как ОРКЕСТРАТОР:

```bash
# 1. Зайди в multi-agent-v2
cd /Users/sergey/Projects/Sergey/multi-agent-v2

# 2. Запусти Claude Code
code .

# 3. Скажи Claude:
"Создай простой webhook"

# 4. Claude ДОЛЖЕН ответить:
"Запускаю оркестратор с задачей..."
# И выполнить:
./start.sh -i "Create simple webhook"

# 5. Claude НЕ ДОЛЖЕН:
# - Вызывать агентов напрямую
# - Сам создавать workflow
# - Использовать MCP tools для n8n
```

---

## ⚠️ Конфликты и как их избежать

### ❌ Проблема: Claude работает как executor в multi-agent-v2/

**Причина:**
- Видит `.claude/agents/` и думает "могу вызвать n8n-builder"
- Игнорирует правило "Use orchestrator"

**Решение:**
- Добавлено правило в CLAUDE.md (уже сделано!)
- Claude теперь знает: в multi-agent-v2/ = только ./start.sh

### ✅ Правильное поведение:

```
User: "Создай webhook"
Location: /multi-agent-v2/

Claude: "Запускаю оркестратор..."
Command: ./start.sh -i "Create webhook"

❌ NOT: claude agent run n8n-builder
```

---

## 📊 Итоговая схема

```
┌────────────────────────────────────────────────────┐
│ WHERE AM I?                                        │
├────────────────────────────────────────────────────┤
│                                                    │
│ /Sergey/multi-agent-v2/  ─────> USE ORCHESTRATOR  │
│   Claude = UI Interface                           │
│   Runs: ./start.sh -i "task"                      │
│                                                    │
│ /MultiBOT/  ──────────────────> WORK DIRECTLY     │
│   Claude = Executor                               │
│   Uses: MCP tools, builds workflows               │
│                                                    │
│ /Sergey/ (root) ───────────────> DOCUMENTATION    │
│   Claude = General assistant                      │
│   Follows: CLAUDE.md rules                        │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

**Version:** 1.0
**Last Updated:** 2025-10-25
**Author:** Claude Code Agent System
