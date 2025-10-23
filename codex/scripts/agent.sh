#!/usr/bin/env bash
set -euo pipefail

# Codex agent launcher with ephemeral mode
# Usage:
#   ./scripts/agent.sh ls
#   ./scripts/agent.sh run <name> [-- <codex-args>]
#   ./scripts/agent.sh ephemeral <name> [--task "one-off task text"]
# Backward-compatible:
#   ./scripts/agent.sh <name>

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOGS_DIR="$ROOT_DIR/logs"
PROMPTS_DIR="$ROOT_DIR/prompts"

list_configs() {
  echo "Available agents (presets):"
  echo "  - n8n"
  echo "  - codex (default)"
}

need_codex() {
  if ! command -v codex >/dev/null 2>&1; then
    echo "Error: 'codex' CLI not found in PATH. Install or add to PATH." >&2
    exit 1
  fi
}

run_agent() {
  local name="${1:-n8n}"; shift || true
  need_codex
  mkdir -p "$LOGS_DIR"
  echo "Launching Codex (flags mode)." >&2
  if [ "$name" = "n8n" ]; then
    echo "After launch: paste the n8n system prompt from $PROMPTS_DIR/n8n-system.md" >&2
    echo "Tip: show/copy prompt -> bash scripts/prompt.sh show n8n | bash scripts/prompt.sh copy n8n" >&2
  fi
  exec codex -m gpt-5-mini -a on-request -s workspace-write -C "$ROOT_DIR" "$@"
}

run_ephemeral() {
  local name="$1"; shift || true
  local task=""
  while (( "$#" )); do
    case "$1" in
      --task)
        shift; task="${1-}"|| true; shift || true ;;
      *) break ;;
    esac
  done
  need_codex
  mkdir -p "$LOGS_DIR"
  local ts
  ts="$(date +%Y%m%d-%H%M%S)"
  local run_dir="$LOGS_DIR/ephemeral-$name-$ts"
  mkdir -p "$run_dir"
  local log_file="$run_dir/session.log"
  if command -v script >/dev/null 2>&1; then
    echo "Ephemeral session log: $log_file"
    echo "Tip: paste this task after start:" > "$run_dir/TASK.txt"
    if [ -n "$task" ]; then echo "$task" >> "$run_dir/TASK.txt"; fi
    if [ "$name" = "n8n" ]; then
      echo "After launch: paste the n8n system prompt from $PROMPTS_DIR/n8n-system.md" >&2
      echo "Tip: show/copy prompt -> bash scripts/prompt.sh show n8n | bash scripts/prompt.sh copy n8n" >&2
    fi
    # Start interactive codex and capture transcript (flags mode)
    exec script -q "$log_file" codex -m gpt-5-mini -a on-request -s workspace-write -C "$ROOT_DIR"
  else
    echo "'script' utility not found. Starting without transcript logging." >&2
    if [ "$name" = "n8n" ]; then
      echo "After launch: paste the n8n system prompt from $PROMPTS_DIR/n8n-system.md" >&2
      echo "Tip: show/copy prompt -> bash scripts/prompt.sh show n8n | bash scripts/prompt.sh copy n8n" >&2
    fi
    exec codex -m gpt-5-mini -a on-request -s workspace-write -C "$ROOT_DIR"
  fi
}

cmd="${1-}"
case "$cmd" in
  ls)
    list_configs ;;
  run)
    shift || true
    if [ "${1-}" = "" ]; then echo "Usage: $0 run <name>" >&2; exit 1; fi
    name="$1"; shift || true
    run_agent "$name" "$@" ;;
  ephemeral)
    shift || true
    if [ "${1-}" = "" ]; then echo "Usage: $0 ephemeral <name> [--task \"...\"]" >&2; exit 1; fi
    name="$1"; shift || true
    run_ephemeral "$name" "$@" ;;
  "")
    echo "Usage: $(basename "$0") <ls|run|ephemeral|name> ..." >&2
    list_configs; exit 1 ;;
  *)
    # Backward-compat: treat as <name>
    run_agent "$cmd" "$@" ;;
esac
