#!/usr/bin/env bash
set -euo pipefail

# Gemini n8n agent executor (non-interactive)
# Uses Google Gemini 2.5 Pro with n8n-MCP tools
#
# Usage:
#   bash scripts/gemini-n8n-exec.sh "create Telegram webhook workflow"
#   bash scripts/gemini-n8n-exec.sh --task "validate all workflows"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load credentials from central .env file
ENV_FILE="$HOME/credentials/.env"
if [ -f "$ENV_FILE" ]; then
  # Export all variables from .env (ignore comments and empty lines)
  set -a
  source "$ENV_FILE"
  set +a
else
  echo "Warning: Credentials file not found at $ENV_FILE" >&2
  echo "Required variables: GEMINI_API_KEY, N8N_URL, N8N credentials" >&2
fi
LOGS_DIR="$ROOT_DIR/logs"
PROMPTS_DIR="$ROOT_DIR/prompts"
N8N_PROMPT="$PROMPTS_DIR/n8n-system.md"

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

# Check node
if ! command -v node >/dev/null 2>&1; then
  echo "Error: 'node' not found in PATH" >&2
  exit 1
fi

# Check gemini-api-full.js exists
GEMINI_SCRIPT="$ROOT_DIR/scripts/gemini-api-full.js"
if [ ! -f "$GEMINI_SCRIPT" ]; then
  echo "Error: Gemini API script not found: $GEMINI_SCRIPT" >&2
  exit 1
fi

# Create logs directory
mkdir -p "$LOGS_DIR"
timestamp="$(date +%Y%m%d-%H%M%S)"
log_dir="$LOGS_DIR/gemini-n8n-$timestamp"
mkdir -p "$log_dir"

# Output files
result_file="$log_dir/result.txt"
log_file="$log_dir/execution.log"

# Run Gemini API with n8n-MCP
echo "🤖 Running Gemini n8n agent..." >&2
echo "📋 Task: $task" >&2
echo "🔬 Model: gemini-2.5-pro (function calling)" >&2
echo "📁 Logs: $log_dir/" >&2
echo "" >&2

# Gemini API key loaded from ~/credentials/.env (lines 14-23)
# No need to export again - already in environment

# Execute with error handling
if (cd "$ROOT_DIR" && node "$GEMINI_SCRIPT" "$task" 2>&1) | tee "$log_file" > "$result_file"; then

  # Success - return result
  echo "" >&2
  echo "✅ Agent completed successfully" >&2
  echo "📄 Result saved to: $result_file" >&2
  echo "" >&2

  # Output result to stdout (for Claude Code to read)
  if [ -f "$result_file" ]; then
    cat "$result_file"
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
