# 📚 Multi-Agent System - Навигация

## 🚀 Быстрый старт

```bash
cd /Users/sergey/Projects/Sergey/multi-agent-v2
./start.sh "Create webhook that logs to Notion"
```

---

## 📖 Документация

| Файл | Описание | Для кого |
|------|----------|----------|
| **[QUICK-START.md](QUICK-START.md)** | Быстрое начало работы | Начинающим ⭐ |
| **[FINAL-SUMMARY.md](FINAL-SUMMARY.md)** | Краткая сводка проекта | Всем ⭐ |
| [TEST-REPORT.md](TEST-REPORT.md) | Полный отчёт тестов | Технические детали |
| [STATUS.md](STATUS.md) | Текущий статус системы | Разработчикам |
| [README.md](README.md) | Архитектура системы | Разработчикам |
| [shared/protocol.md](shared/protocol.md) | Протокол агентов | Разработчикам |

---

## 🎯 Что читать в какой ситуации

### Хочу быстро начать:
→ [QUICK-START.md](QUICK-START.md)

### Хочу понять что создано:
→ [FINAL-SUMMARY.md](FINAL-SUMMARY.md)

### Хочу узнать результаты тестов:
→ [TEST-REPORT.md](TEST-REPORT.md)

### Хочу понять ограничения:
→ [STATUS.md](STATUS.md)

### Хочу разобраться в архитектуре:
→ [README.md](README.md)

---

## ⚡ Быстрые команды

```bash
# Запустить систему
./start.sh "Your task"

# Запустить тест
./test.sh

# Полный тест
./full-test.sh

# Посмотреть базу знаний
cat shared/PATTERNS.json | jq .successful_workflows

# Посмотреть логи агентов
ls -la logs/agents/

# Посмотреть статистику
cat shared/PATTERNS.json | jq .statistics
```

---

## 📊 Текущий статус

✅ **Работает полностью**
- 2 теста пройдено успешно
- 7 агентов работают
- 3 MCP сервера подключены
- База знаний обновляется

⏱️ **Производительность**
- Время: ~3 минуты на workflow
- Качество: 7/10 в среднем

---

**Последнее обновление:** 2025-10-24 22:30
**Версия:** 1.0.0
