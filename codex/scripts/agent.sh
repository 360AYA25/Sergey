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
CONFIGS_DIR="$ROOT_DIR/configs"
LOGS_DIR="$ROOT_DIR/logs"

list_configs() {
  echo "Available agents:"
  for f in "$CONFIGS_DIR"/*.config.yaml; do
    [ -e "$f" ] || continue
    base="$(basename "$f")"
    name="${base%.config.yaml}"
    echo "  - $name"
  done
}

need_codex() {
  if ! command -v codex >/dev/null 2>&1; then
    echo "Error: 'codex' CLI not found in PATH. Install or add to PATH." >&2
    exit 1
  fi
}

run_agent() {
  local name="$1"; shift || true
  local cfg="$CONFIGS_DIR/$name.config.yaml"
  if [ ! -f "$cfg" ]; then
    echo "Config not found: $cfg" >&2
    list_configs
    exit 1
  fi
  need_codex
  exec codex --config "$cfg" "$@"
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
  local cfg="$CONFIGS_DIR/$name.config.yaml"
  if [ ! -f "$cfg" ]; then
    echo "Config not found: $cfg" >&2
    list_configs
    exit 1
  fi
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
    # Start interactive codex and capture transcript
    exec script -q "$log_file" codex --config "$cfg"
  else
    echo "'script' utility not found. Starting without transcript logging." >&2
    exec codex --config "$cfg"
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
