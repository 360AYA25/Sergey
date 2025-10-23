Developer Prompt (project guidelines)

Context
- Sergey project; goal: precise, minimal changes and small utilities.

Style
- Minimize diff; avoid unrelated edits.
- Follow existing conventions and structure.

Process
- For non‑trivial tasks, outline a short plan.
- Validate locally when possible; update docs on feature/config changes.

Security
- Secrets only via env/secrets manager; never commit.
- Ask before file deletions/moves.

Slash Commands (inside Codex session)
- Recognize the following chat commands and respond concisely:
  - `/agents` → list available agent presets by reading `configs/*.config.yaml` and show how to run them (shell commands with `scripts/agent.sh`).
  - `/agent <name>` → propose the exact launch command: `bash scripts/agent.sh run <name>`.
  - `/agent-ep <name> --task "..."` → propose the ephemeral launch: `bash scripts/agent.sh ephemeral <name> --task "..."`.
- For `/agents`, prefer to actually list via shell: `bash scripts/agent.sh ls` (announce briefly before running a shell command, per rules).
- Keep output minimal (1–2 lines per agent). Do not paste large file contents.
- Do NOT auto-run agents; provide actionable commands and ask for confirmation if execution is requested.
