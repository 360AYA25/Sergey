# Convenience aliases/functions for Codex agents

# Base dir (edit if your path differs)
CODex_DIR=~/Projects/Sergey/codex

# List available agents
alias agents='bash "$CODex_DIR"/scripts/agent.sh ls'

# Run agent by name (interactive session)
alias agent='bash "$CODex_DIR"/scripts/agent.sh run'

# Ephemeral agent session (short-lived, logs to logs/)
alias agent-ep='bash "$CODex_DIR"/scripts/agent.sh ephemeral'

# Quick helper: run ephemeral n8n with a free-form task
# Usage: n8n-task validate agent-gateway.json and prepare updates
n8n-task() {
  bash "$CODex_DIR"/scripts/agent.sh ephemeral n8n --task "$*"
}

# Interactive picker
alias agent-select='bash "$CODex_DIR"/scripts/agent-menu.sh'
alias agents-menu='bash "$CODex_DIR"/scripts/agent-menu.sh'
