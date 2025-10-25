# 🤖 Multi-Agent System v2.1

> Collaborative n8n workflow creation using Claude Code Sub-Agents + MCP Tools

## ✅ STATUS: WORKING!

**v1.0 успешно протестирован** 2025-10-24:
- ⏱️ Время: 203.8 сек (~3.5 мин)
- 📊 Качество: 7/10
- 🎯 Все 7 фаз выполнены
- 💾 База знаний обновляется

**[Подробнее → STATUS.md](STATUS.md)**

---

## 📋 Architecture

7 specialized agents working together:

1. **n8n-planner-gpt** (GPT-5) - Fast prototyping
2. **n8n-planner-gemini** (Gemini Pro 2.0) - Full context analysis (2M tokens!)
3. **n8n-architect** (Claude Sonnet) - Best practices enforcement
4. **n8n-builder** (GPT-5) - Fast implementation
5. **n8n-validator** (Gemini Flash 2.0) - Quick error detection
6. **n8n-debugger** (Gemini Pro 2.0) - Strategic debugging with full context
7. **n8n-reviewer** (Claude Opus) - Final quality assurance

## 🎯 Key Innovation

**Claude Sub-Agents + MCP Tools**
- All agents are Claude models (Sonnet/Haiku/Opus)
- But call GPT/Gemini via MCP tools
- Claude = orchestrator, GPT/Gemini = specialized workers

## 📦 Prerequisites

### 1. Claude Code CLI

```bash
# Install Claude Code
# https://docs.claude.com/en/docs/claude-code
```

### 2. MCP Servers

#### A) OpenAI MCP (for GPT-5)

```bash
git clone https://github.com/thadius83/mcp-server-openai
cd mcp-server-openai
pip install .

# Add to Claude Code
claude mcp add --transport stdio openai \
  --env OPENAI_API_KEY=$YOUR_OPENAI_API_KEY \
  -- python -m src.mcp_server_openai.server
```

#### B) Gemini MCP (for Gemini Pro 2.0)

```bash
# Quick install via npx
claude mcp add --transport stdio gemini \
  --env GEMINI_API_KEY=$YOUR_GEMINI_API_KEY \
  -- npx -y github:aliargun/mcp-server-gemini
```

#### C) n8n-MCP

```bash
# Already installed if you're using n8n
# Check: claude mcp list
```

### 3. Verify Setup

```bash
claude mcp list

# Expected output:
# ✅ openai (stdio)
# ✅ gemini (stdio)
# ✅ n8n-mcp (stdio)
```

## 🚀 Usage

### Quick Start

```bash
cd /Users/sergey/Projects/Sergey/multi-agent-v2

# Simple workflow
./start.sh "Create webhook that sends Slack notification"

# Complex workflow
./start.sh "Create Telegram bot with OpenAI analysis and Notion storage"
```

### Direct Orchestrator

```bash
node orchestrator.js "Create simple HTTP API workflow"
```

### Call Agent Directly

```bash
# Via Claude Code CLI
claude agent run n8n-planner-gpt "Plan Telegram logger workflow"

# Or in Claude Code UI
/agent n8n-planner-gpt Plan Telegram bot workflow
```

## 📊 Workflow Phases

### Phase 1: Collaborative Planning (parallel)
3 planners analyze task simultaneously:
- GPT-5: Fast prototyping
- Gemini Pro: Deep analysis with 2M context
- Claude: Best practices

### Phase 2: Voting
Score plans based on:
- Simplicity (complexity score)
- Template usage
- Time estimate
- Maintainability

### Phase 3: Building
GPT-5 implements selected plan with:
- Explicit parameters (no defaults!)
- Proper error handling
- Null-safe property reads

### Phase 4: Validation
Gemini Flash checks for:
- Missing parameters
- Disconnected nodes
- Invalid expressions

### Phase 5: Debugging (if needed)
Gemini Pro fixes errors using:
- Full project context (PATTERNS.json + LEARNINGS.md)
- Proven patterns
- Past solutions

### Phase 6: Peer Review
Claude Opus performs final check:
- Quality scoring (0-10)
- Best practices compliance
- Approval decision

### Phase 7: Knowledge Update
Save to PATTERNS.json:
- Successful workflow
- Patterns used
- Quality score
- Statistics

## 📁 Project Structure

```
.claude/agents/           # Claude Code sub-agents
├── n8n-planner-gpt.md
├── n8n-planner-gemini.md
├── n8n-architect.md
├── n8n-builder.md
├── n8n-validator.md
├── n8n-debugger.md
└── n8n-reviewer.md

multi-agent-v2/          # Orchestrator system
├── orchestrator.js      # Main orchestrator
├── phases/              # 7 phase implementations
│   ├── planning.js
│   ├── voting.js
│   ├── building.js
│   ├── validation.js
│   ├── debugging.js
│   ├── review.js
│   └── knowledge.js
├── shared/
│   ├── PATTERNS.json    # Knowledge base
│   └── protocol.md      # Communication protocol
├── package.json
├── start.sh
└── README.md
```

## 🧠 Auto-Learning

After each successful workflow:
- Patterns are saved to `PATTERNS.json`
- Pattern usage tracked (`success_count`)
- Workflow saved to `n8n-docs/workflows/successful/`
- Statistics updated

## 🔑 Key Features

### 1. Gemini Pro 2M Context
Planner and Debugger load:
- All PATTERNS.json (~20K tokens)
- All LEARNINGS.md (~50K tokens)
- All successful workflows
- Full project context

### 2. Multi-Model Collaboration
- GPT-5: Fast execution
- Gemini Pro 2.0: Deep analysis
- Claude: Best practices

### 3. Persistent Knowledge
- PATTERNS.json grows with each workflow
- Similar tasks get faster over time
- Proven solutions reused

## 📖 Examples

### Example 1: Simple Webhook

```bash
./start.sh "Create webhook that logs to console"

# Output:
# Phase 1: Planning (3 agents)
# Phase 2: Voting → Selected GPT plan (score: 85)
# Phase 3: Building (2 nodes, 1 connection)
# Phase 4: Validation → 0 errors
# Phase 6: Review → Score 9/10, Approved
# Phase 7: Saved to PATTERNS.json
# ✅ Complete in 12.3s
```

### Example 2: Complex Integration

```bash
./start.sh "Create Telegram bot that analyzes messages with OpenAI and saves to Notion"

# Output:
# Phase 1: Planning (3 agents)
#   - GPT: complexity 6, 1-2 hours
#   - Gemini: complexity 7, 2-3 hours (found similar in LEARNINGS!)
#   - Claude: maintainability 9/10
# Phase 2: Voting → Selected Gemini plan (score: 78)
# Phase 3: Building (5 nodes, 6 connections)
# Phase 4: Validation → 3 errors found
# Phase 5: Debugging → Applied Pattern #2, #14
# Phase 6: Review → Score 8/10, Approved
# Phase 7: Saved to PATTERNS.json
# ✅ Complete in 45.8s
```

## 🔧 Troubleshooting

### No agents found in /agents

```bash
# Check agents exist
ls -la /Users/sergey/Projects/Sergey/.claude/agents

# Should see 7 .md files
```

### MCP server not connected

```bash
# List MCP servers
claude mcp list

# Reconnect if needed
claude mcp add --transport stdio openai ...
```

### Agent returns raw output instead of JSON

- Agent may need prompt adjustment
- Check MCP tool is working: `claude mcp get openai`

## 📝 Development

### Adding New Pattern

Edit `shared/PATTERNS.json`:

```json
{
  "id": "pattern-15",
  "name": "Your Pattern Name",
  "problem": "What problem it solves",
  "solution": {...},
  "use_cases": ["..."],
  "complexity": 3
}
```

### Modifying Agent Prompts

Edit `.claude/agents/n8n-*.md` files directly.

## 📚 Resources

- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code)
- [Claude Sub-Agents Guide](https://docs.claude.com/en/docs/claude-code/sub-agents.md)
- [MCP Protocol](https://docs.claude.com/en/docs/claude-code/mcp.md)
- [n8n-MCP Tools](https://github.com/czlonkowski/n8n-mcp)

## 📄 License

MIT

## 👤 Author

Sergey - Multi-Agent System v2.1
