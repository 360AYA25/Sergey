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

  # Detect Codex CLI capability: newer codex-cli (>=0.4x) does NOT accept --config <file>
  # and instead uses `-c key=value` overrides. Fall back to best-effort flags.
  if codex --help 2>/dev/null | grep -qE '^[[:space:]]*-c, --config <key=value>'; then
    # Fallback path: approximate config via flags
    local cfg_dir="$(dirname "$cfg")"
    local preset_rel
    preset_rel="$(sed -n 's/^\s*preset:\s*\(.*\)$/\1/p' "$cfg" | head -n1 | tr -d '"')"
    local preset_path="$cfg_dir/$preset_rel"
    # Extract model.name from preset YAML (simple awk across the model: block)
    local model_name
    if [ -f "$preset_path" ]; then
      model_name="$(awk '
        /^model:/ {inmodel=1; next}
        /^[^[:space:]]/ {inmodel=0}
        inmodel && /name:/ {print $2; exit}
      ' "$preset_path")"
    fi
    [ -n "${model_name-}" ] || model_name="gpt-4o-mini"

    echo "codex-cli does not support --config <file>. Starting with flags instead..." >&2
    echo "Using model: $model_name" >&2
    echo "Note: custom system/developer prompts from $preset_path cannot be injected automatically in this mode." >&2
    exec codex -m "$model_name" -a on-request -s workspace-write -C "$ROOT_DIR" "$@"
  else
    # Legacy/alt Codex that supports --config <file>
    exec codex --config "$cfg" "$@"
  fi
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
    if codex --help 2>/dev/null | grep -qE '^[[:space:]]*-c, --config <key=value>'; then
      # Fallback flags mode
      local cfg_dir="$(dirname "$cfg")"
      local preset_rel
      preset_rel="$(sed -n 's/^\s*preset:\s*\(.*\)$/\1/p' "$cfg" | head -n1 | tr -d '"')"
      local preset_path="$cfg_dir/$preset_rel"
      local model_name
      if [ -f "$preset_path" ]; then
        model_name="$(awk '
          /^model:/ {inmodel=1; next}
          /^[^[:space:]]/ {inmodel=0}
          inmodel && /name:/ {print $2; exit}
        ' "$preset_path")"
      fi
      [ -n "${model_name-}" ] || model_name="gpt-4o-mini"
      echo "codex-cli lacks --config <file>; starting with flags (model=$model_name)." >&2
      exec script -q "$log_file" codex -m "$model_name" -a on-request -s workspace-write -C "$ROOT_DIR"
    else
      exec script -q "$log_file" codex --config "$cfg"
    fi
  else
    echo "'script' utility not found. Starting without transcript logging." >&2
    if codex --help 2>/dev/null | grep -qE '^[[:space:]]*-c, --config <key=value>'; then
      local cfg_dir="$(dirname "$cfg")"
      local preset_rel
      preset_rel="$(sed -n 's/^\s*preset:\s*\(.*\)$/\1/p' "$cfg" | head -n1 | tr -d '"')"
      local preset_path="$cfg_dir/$preset_rel"
      local model_name
      if [ -f "$preset_path" ]; then
        model_name="$(awk '
          /^model:/ {inmodel=1; next}
          /^[^[:space:]]/ {inmodel=0}
          inmodel && /name:/ {print $2; exit}
        ' "$preset_path")"
      fi
      [ -n "${model_name-}" ] || model_name="gpt-4o-mini"
      exec codex -m "$model_name" -a on-request -s workspace-write -C "$ROOT_DIR"
    else
      exec codex --config "$cfg"
    fi
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
