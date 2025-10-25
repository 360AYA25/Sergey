# 🚀 Quick Start Guide

## Быстрый запуск (30 секунд)

```bash
cd /Users/sergey/Projects/Sergey/multi-agent-v2

# Запуск
./start.sh "Create webhook that logs messages to Notion"
```

**Что произойдёт:**
1. 3 AI планировщика создадут планы (GPT-5, Gemini Pro 2.0, Claude)
2. Система выберет лучший план (голосование)
3. Builder создаст workflow
4. Validator проверит качество
5. Reviewer оценит (1-10)
6. Паттерн сохранится в базу знаний

**Время:** ~3 минуты
**Результат:** Детальный план + оценка качества

---

## 📋 Примеры задач

```bash
# Простой webhook
./start.sh "Create webhook that returns success message"

# Telegram bot
./start.sh "Create Telegram bot that responds to commands"

# Интеграция
./start.sh "Create workflow: Telegram → Gemini AI → Notion"

# Backup
./start.sh "Create scheduler that backs up workflows to GitHub daily"

# Парсинг
./start.sh "Create RSS parser that sends updates to Slack"
```

---

## 📊 Проверка результатов

### База знаний:
```bash
cat shared/PATTERNS.json | jq .successful_workflows
```

### Логи агентов:
```bash
ls -la logs/agents/
cat logs/agents/n8n-planner-gemini-*.txt
```

### Статистика:
```bash
cat shared/PATTERNS.json | jq .statistics
```

---

## 🎯 Текущий статус

✅ **Система работает!**
- Время тестов: 2 успешных запуска
- Workflows в базе: 2
- Средняя оценка: 7/10
- Все MCP серверы подключены

📖 **Подробности:**
- [TEST-REPORT.md](TEST-REPORT.md) - полный отчёт тестирования
- [STATUS.md](STATUS.md) - текущий статус системы
- [README.md](README.md) - документация

---

## 🔧 Настройка (уже сделано)

✅ MCP серверы подключены:
- OpenAI MCP (GPT-5)
- Gemini MCP (Gemini Pro 2.0)
- n8n-MCP (n8n workflows)

✅ Агенты готовы (7 шт):
- n8n-planner-gpt
- n8n-planner-gemini
- n8n-architect
- n8n-builder
- n8n-validator
- n8n-debugger
- n8n-reviewer

---

## 💡 Советы

### Для лучших результатов:

1. **Будь конкретным:**
   - ❌ "Create workflow"
   - ✅ "Create webhook that receives JSON and saves to Notion database"

2. **Укажи детали:**
   - Источник данных (webhook, Telegram, RSS)
   - Обработка (фильтры, трансформация)
   - Назначение (Notion, Slack, email)

3. **Используй паттерны:**
   Система помнит все успешные workflows и применяет их автоматически!

---

## 🐛 Если что-то не работает

### Проблема: MCP серверы "Failed to connect"
**Решение:** Это нормально! Они работают при вызове агентов.

### Проблема: Долго выполняется
**Решение:** Первый запуск ~3 мин, следующие быстрее.

### Проблема: "workflow_id: undefined"
**Решение:** Это stub режим. Для реальных workflows запусти n8n:
```bash
docker run -d -p 5678:5678 n8nio/n8n
```

---

## 📚 Дальше

### Использовать планы:
Агенты создают детальные планы - можно создать workflow вручную в n8n UI.

### База знаний растёт:
Каждый новый workflow улучшает систему! Следующие будут лучше.

### Production режим:
См. [STATUS.md](STATUS.md) → "Варианты дальнейшего развития"

---

**Готов к работе! 🚀**
