# 🚀 Быстрый старт: AI Subagent за 5 минут

## Вариант 1: n8n (Самый быстрый)

### Шаг 1: Импортируй workflow
1. Открой n8n: https://n8n.srv1068954.hstgr.cloud
2. Создай новый workflow
3. Import from File → выбери `examples/n8n-ai-subagent-workflow.json`

### Шаг 2: Настрой API ключи
1. В n8n перейди в Settings → Credentials
2. Добавь OpenAI credentials (API key)
3. Добавь Google AI credentials (API key)

### Шаг 3: Активируй workflow
1. Нажми "Activate"
2. Скопируй webhook URL

### Шаг 4: Используй в Claude Code
```bash
# Простой запрос к GPT-4o Mini
curl -X POST [твой-webhook-url] \
  -H "Content-Type: application/json" \
  -d '{"task_type": "simple", "query": "Explain what is React"}'

# Анализ с Gemini
curl -X POST [твой-webhook-url] \
  -H "Content-Type: application/json" \
  -d '{"task_type": "analysis", "query": "Analyze this code for improvements..."}'
```

---

## Вариант 2: MCP сервер (Рекомендуется)

### Шаг 1: Создай проект
```bash
mkdir ~/Projects/ai-subagent-mcp
cd ~/Projects/ai-subagent-mcp
cp ~/Projects/Sergey/examples/package.json .
cp ~/Projects/Sergey/examples/mcp-ai-subagent-starter.js src/index.js
```

### Шаг 2: Установи зависимости
```bash
npm install
```

### Шаг 3: Добавь API ключи
```bash
# Создай .env файл
echo "OPENAI_API_KEY=sk-..." >> .env
echo "GOOGLE_AI_API_KEY=AIza..." >> .env
```

### Шаг 4: Добавь в Claude Config
Открой: `~/Library/Application Support/Claude/claude_desktop_config.json`

Добавь:
```json
{
  "mcpServers": {
    "ai-subagent": {
      "command": "node",
      "args": ["/Users/sergey/Projects/ai-subagent-mcp/src/index.js"],
      "env": {
        "OPENAI_API_KEY": "твой-ключ",
        "GOOGLE_AI_API_KEY": "твой-ключ"
      }
    }
  }
}
```

### Шаг 5: Перезапусти Claude Code
Полностью закрой и открой Claude Code

### Шаг 6: Используй!
Теперь доступны команды:
- `/mcp__ai-subagent__simple_query` - быстрые вопросы через GPT-4o Mini
- `/mcp__ai-subagent__analyze_with_gemini` - анализ через Gemini
- `/mcp__ai-subagent__smart_router` - автоматический выбор модели

---

## 🔑 Где взять API ключи?

### OpenAI (GPT-4o Mini):
1. Перейди на https://platform.openai.com/api-keys
2. Create new secret key
3. Скопируй ключ (начинается с `sk-`)

### Google AI (Gemini):
1. Перейди на https://aistudio.google.com/apikey
2. Create API Key
3. Скопируй ключ (начинается с `AIza`)

---

## 💡 Примеры использования

### В Claude Code после настройки MCP:
```
User: /mcp__ai-subagent__simple_query {"query": "What is useState in React?"}

User: /mcp__ai-subagent__smart_router {"query": "Analyze this function and suggest improvements: function add(a,b) { return a+b; }"}
```

### Через n8n webhook:
```bash
# Bash инструмент в Claude Code
curl -X POST https://n8n.srv1068954.hstgr.cloud/webhook/ai-subagent \
  -H "Content-Type: application/json" \
  -d '{"task_type": "simple", "query": "List 5 JavaScript array methods"}'
```

---

## ✅ Проверка работы

### Для MCP:
1. В Claude Code введи: `/`
2. Должны появиться команды `mcp__ai-subagent__*`
3. Если нет - проверь логи: `~/Library/Logs/Claude/`

### Для n8n:
1. Открой n8n workflow
2. Посмотри Executions
3. Должны быть успешные запуски

---

## 🎯 Что дальше?

1. **Добавь больше функций** в MCP сервер
2. **Настрой умный роутинг** по типу задач
3. **Добавь кэширование** для одинаковых запросов
4. **Отслеживай расходы** на API

---

**Готово! Теперь у тебя есть AI подагент для экономии токенов! 🚀**