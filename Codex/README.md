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
