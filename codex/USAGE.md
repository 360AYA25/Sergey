# Codex n8n Agent — Быстрый старт

## Запуск (1 команда)
- Открой терминал и выполни:
  - `cd ~/Projects/Sergey/codex && codex`
- Здесь лежит `AGENTS.md`, поэтому Codex воспринимает эту папку как контекст n8n‑агента.
- Пиши задачу обычным текстом (без `/`).

## Что под капотом
- Роль: специалист по n8n (проектные правила в `AGENTS.md`).
- Модель: `gpt-5-mini` (быстрая и дешёвая). Настроена в:
  - `agents/n8n.yaml` и `agents/default.yaml`
  - сценарии запуска используют `-m gpt-5-mini`.
- Доступы: предполагается работа через ноды/HTTP в n8n (Notion, Telegram, OpenFoodFacts — через креды n8n).

## Эфемерный подагент (отдельная сессия)
- Запуск из терминала (не из Codex):
  - `cd ~/Projects/Sergey/codex`
  - `bash scripts/agent.sh ephemeral n8n --task "твоя_задача"`
- Лог: `logs/ephemeral-n8n-<timestamp>/session.log` (в git не попадает).

## Полезные скрипты
- Список пресетов: `bash scripts/agent.sh ls`
- Запуск пресета: `bash scripts/agent.sh run n8n`
- Копия промпта (если потребуется): `bash scripts/prompt.sh copy n8n`
- Интерактивное меню: `bash scripts/agent-menu.sh` (опционально)

## Где менять модель
- `agents/n8n.yaml` и `agents/default.yaml` → `model.name: gpt-5-mini`
- `scripts/agent.sh` → параметр `-m gpt-5-mini`

## Переменные окружения
- Обязательно: OpenAI ключ в окружении (например, переменная вида OPENAI_API_…)
- По необходимости: база URL для n8n (например, N8N_BASE_URL), ключ для n8n (например, N8N_…_KEY), ключи для Notion/Telegram
- Рекомендуется добавить в `~/.zshrc` экспорт нужных переменных, но не хранить значения в репозитории.

## Трюки
- Хочешь короткую команду? Добавь в `~/.zshrc`:
  - `alias n8n='cd ~/Projects/Sergey/codex && codex'`
- Тогда просто вызывай: `n8n`

## Диагностика
- Codex не видит правила? Убедись, что запущен в папке `codex` (там `AGENTS.md`).
- Ошибки сети/ключа: проверь, что в окружении задан ключ OpenAI (переменная окружения с префиксом `OPENAI_API_`).
