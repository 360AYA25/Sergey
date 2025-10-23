#!/usr/bin/env bash
set -euo pipefail

# Non-interactive n8n agent executor
# Runs codex exec with n8n-MCP tools and returns result
#
# Usage:
#   bash scripts/n8n-exec.sh "create Telegram webhook workflow"
#   bash scripts/n8n-exec.sh --task "validate all workflows"
#
# Claude Code integration:
#   Called by Claude Code via Bash tool to run n8n subagent tasks

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOGS_DIR="$ROOT_DIR/logs"
CONFIG="$ROOT_DIR/configs/n8n.config.yaml"

# Parse arguments
task=""
while (( "$#" )); do
  case "$1" in
    --task)
      shift
      task="${1-}"
      shift || true
      ;;
    *)
      # First non-flag argument is the task
      if [ -z "$task" ]; then
        task="$1"
      fi
      shift || true
      ;;
  esac
done

if [ -z "$task" ]; then
  echo "Error: No task specified" >&2
  echo "Usage: $0 \"your task description\"" >&2
  echo "   or: $0 --task \"your task description\"" >&2
  exit 1
fi

# Check codex CLI
if ! command -v codex >/dev/null 2>&1; then
  echo "Error: 'codex' CLI not found in PATH" >&2
  exit 1
fi

# Check config file
if [ ! -f "$CONFIG" ]; then
  echo "Error: Config file not found: $CONFIG" >&2
  exit 1
fi

# Create logs directory
mkdir -p "$LOGS_DIR"
timestamp="$(date +%Y%m%d-%H%M%S)"
log_dir="$LOGS_DIR/exec-n8n-$timestamp"
mkdir -p "$log_dir"

# Output files
output_file="$log_dir/result.txt"
log_file="$log_dir/execution.log"

# Prepend n8n system prompt to task
system_prompt="You are an expert in n8n automation software using n8n-MCP tools.

Execute tools silently. Only respond with final result in Russian.

Task: $task"

# Run codex exec non-interactively
echo "🤖 Running n8n agent (codex exec)..." >&2
echo "📋 Task: $task" >&2
echo "📁 Logs: $log_dir/" >&2
echo "" >&2

# Execute with error handling
if codex exec \
  -m gpt-5 \
  -s workspace-write \
  -C "$ROOT_DIR" \
  -o "$output_file" \
  "$system_prompt" \
  2>&1 | tee "$log_file" >&2; then

  # Success - return result
  echo "" >&2
  echo "✅ Agent completed successfully" >&2
  echo "📄 Result saved to: $output_file" >&2
  echo "" >&2

  # Output result to stdout (for Claude Code to read)
  if [ -f "$output_file" ]; then
    cat "$output_file"
  else
    echo "Warning: Output file not found" >&2
    exit 1
  fi
else
  # Error
  echo "" >&2
  echo "❌ Agent execution failed" >&2
  echo "📄 Check logs: $log_file" >&2
  exit 1
fi
