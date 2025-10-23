# 🤖 AI Subagent Integration для Claude Code

> Интеграция GPT-4o Mini и Google Gemini как подагентов для экономии токенов

## 📁 Структура проекта

```
ai-subagent-integration/
├── README.md                           ← Ты здесь
├── INTEGRATION-PLAN.md                 ← Детальный план
├── QUICK-START.md                      ← Быстрый старт
└── examples/
    ├── mcp-server/                     ← MCP сервер (рекомендуется)
    │   ├── src/
    │   │   └── index.js               ← Основной код сервера
    │   ├── package.json               ← Зависимости
    │   ├── .env.example               ← Шаблон переменных окружения
    │   └── .gitignore
    ├── n8n-workflow.json              ← n8n workflow для импорта
    ├── usage-monitor.js               ← Мониторинг расходов
    └── claude-config-example.json     ← Пример конфига Claude
```

### 📋 Документация
- [INTEGRATION-PLAN.md](INTEGRATION-PLAN.md) - Детальный план с 3 подходами
- [QUICK-START.md](QUICK-START.md) - Быстрый старт за 5 минут

### 💻 Готовые примеры
- [examples/mcp-server/](examples/mcp-server/) - Полный MCP сервер с инструментами
- [examples/n8n-workflow.json](examples/n8n-workflow.json) - Workflow для визуальной настройки
- [examples/usage-monitor.js](examples/usage-monitor.js) - Трекинг использования и экономии

## 🚀 Выбери свой путь

### Вариант A: MCP сервер (Рекомендуется)
**Для тех, кто хочет полную интеграцию в Claude Code**

1. Скопируй стартовый проект
2. Добавь API ключи
3. Настрой Claude config
4. Используй через `/mcp__` команды

✅ Плюсы: Нативная интеграция, быстрый отклик
⚠️ Минусы: Требует базовых знаний Node.js

### Вариант B: n8n workflow
**Для визуальной настройки без кода**

1. Импортируй workflow в n8n
2. Добавь credentials
3. Активируй workflow
4. Вызывай через webhook

✅ Плюсы: Без программирования, легко менять
⚠️ Минусы: Дополнительная задержка

## 💰 Экономия

| Задача | Claude Sonnet | GPT-4o Mini | Gemini | Экономия |
|--------|---------------|-------------|---------|----------|
| 100 простых запросов | $4.50 | $0.23 | $0.00 | 95-100% |
| Суммаризация 10 документов | $15.00 | $0.75 | $0.00 | 95-100% |
| Перевод 50 текстов | $7.50 | $0.38 | $0.00 | 95-100% |

## 📊 Мониторинг использования

```bash
# Посмотреть отчёт
node examples/usage-monitor.js report

# Сегодняшняя статистика
node examples/usage-monitor.js today

# Подсчёт экономии
node examples/usage-monitor.js savings
```

## 🔗 Полезные ссылки

### Получить API ключи:
- [OpenAI API Keys](https://platform.openai.com/api-keys) - для GPT-4o Mini
- [Google AI Studio](https://aistudio.google.com/apikey) - для Gemini
- [n8n сервер](https://n8n.srv1068954.hstgr.cloud) - твой n8n instance

### Документация:
- [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp.md)
- [OpenAI API docs](https://platform.openai.com/docs/models/gpt-4o-mini)
- [Gemini API docs](https://ai.google.dev/gemini-api/docs)

## ❓ FAQ

**Q: Какой подход выбрать?**
A: Начни с n8n для быстрого теста, потом переходи на MCP для production

**Q: Сколько можно сэкономить?**
A: 90-95% на простых задачах, 50-70% в среднем по всем задачам

**Q: Какие задачи делегировать?**
A: Простые запросы, переводы, форматирование, базовый анализ кода

**Q: Что оставить Claude?**
A: Сложную архитектуру, debug, работу с файлами, критические решения

## 🎯 Следующие шаги

1. ✅ План создан
2. ✅ Примеры готовы
3. ⏳ Выбери подход (MCP или n8n)
4. ⏳ Получи API ключи
5. ⏳ Настрой интеграцию
6. ⏳ Начни экономить!

---

**Вопросы? Начни с [QUICK-START.md](QUICK-START.md)!**