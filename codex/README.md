Purpose
Single place for agent prompts, presets, and configs for the Sergey project.

Structure
- prompts/ — system/developer prompt templates.
- agents/ — agent presets (YAML): model, tools, policies.
- configs/ — local launch presets and env bridges.
- secrets/ — local secrets (not in git); see secrets/README.md.

Principles
- No secrets in git. Use env or a secrets manager.
- Deterministic templates: explicit placeholders and docs.
- Loose coupling: agents reference prompts by path; secrets via env.

Quick Start
- Copy secrets/.env.example → secrets/.env and fill values.
- Optionally load via direnv/dotenv in scripts.
- Adjust prompts/system.md and agents/default.yaml as needed.

Usage
- See `USAGE.md` for the one‑command start, ephemeral subagent, scripts, and how to change the model.

N8N Agent
- Files:
  - `prompts/n8n-system.md` — system prompt for n8n MCP.
  - `agents/n8n.yaml` — agent preset with n8n-MCP tools.
  - `configs/n8n.config.yaml` — runtime config with MCP server configuration.
  - `scripts/n8n-exec.sh` — non-interactive wrapper for Claude Code integration.
- Env vars (no secrets in git):
  - OpenAI key env var (e.g., OPENAI_API_…)
  - N8N_API_KEY — n8n API key from ~/credentials/n8n-access.md
- MCP Integration:
  - n8n-MCP tools configured in ~/.codex/config.toml
  - 37 specialized tools, 536 nodes, 2,500+ templates available
- Use:
  - Standard: `bash scripts/agent.sh run n8n`
  - Ephemeral: `bash scripts/agent.sh ephemeral n8n --task "..."`
  - Non-interactive (from Claude Code): `bash scripts/n8n-exec.sh "task description"`

Ephemeral Subagent
- Run n8n agent in a separate, short-lived session without polluting your main chat:
  - `bash scripts/agent.sh ephemeral n8n --task "validate agent-gateway.json and prepare updates"`
- Session transcript is saved under `logs/ephemeral-n8n-<timestamp>/session.log` (auto-ignored by git).
- Use this when you want the agent to execute a task in isolation and return only a short summary to the main chat.

Additional Presets (Integrations)
Removed to keep setup minimal. Use the base `n8n` preset for all tasks; it assumes access to Notion/Telegram/OFF via n8n.

Convenience (optional)
- Make it executable: `chmod +x scripts/agent.sh`
- Add shell alias (zsh): `alias agent='bash ~/Projects/Sergey/codex/scripts/agent.sh'`
- Then run: `agent n8n`

Zsh Aliases
- Predefined alias file: `scripts/aliases.zsh`
  - Add to your `~/.zshrc`:
    - `source ~/Projects/Sergey/codex/scripts/aliases.zsh`
  - Reload shell: `source ~/.zshrc`
- Included commands:
  - `agents` — список доступных агентов
  - `agent <name>` — запуск агента (например, `agent n8n`)
  - `agent-ep <name> --task "..."` — эпемерная сессия
  - `n8n-task ...` — быстрый эпемерный запуск под n8n с произвольным описанием задачи
  - `agent-select` / `agents-menu` — интерактивное меню выбора (fzf при наличии)

Slash Commands in Codex
- Внутри Codex-чата можно писать:
  - `/agents` — ассистент выведет список доступных пресетов и команды запуска
  - `/agent <name>` — ассистент предложит команду запуска нужного пресета
  - `/agent-ep <name> --task "..."` — ассистент предложит команду эпемерного запуска
- Команды не запускают агентов автоматически; дают понятные шаги, запуск — по вашему подтверждению.
