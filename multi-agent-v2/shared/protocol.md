# Inter-Agent Communication Protocol

## Version: 1.0.0

## Overview

This document defines the communication protocol between agents in the Multi-Agent System v2.1.

## Key Principles

1. **English Only** - All inter-agent communication in English (not Russian)
2. **JSON Format** - Structured input/output for machine parsing
3. **Silent Execution** - No commentary between tool calls
4. **Context Passing** - Orchestrator manages shared context

## Agent Roles

| Agent | Model | Specialization | Context Size |
|-------|-------|---------------|--------------|
| n8n-planner-gpt | GPT-5 (via MCP) | Fast prototyping | 128K tokens |
| n8n-planner-gemini | Gemini Pro 2.0 (via MCP) | Full project context | 2M tokens |
| n8n-architect | Claude Sonnet | Best practices | 200K tokens |
| n8n-builder | GPT-5 (via MCP) | Fast building | 128K tokens |
| n8n-validator | Gemini Flash 2.0 (via MCP) | Quick validation | 1M tokens |
| n8n-debugger | Gemini Pro 2.0 (via MCP) | Strategic debugging | 2M tokens |
| n8n-reviewer | Claude Opus | Final review | 200K tokens |

## Input/Output Formats

### Planning Phase

**Input:**
```json
{
  "task": "Create Telegram logger to Google Sheets",
  "user_context": "Beginner, wants simple solution",
  "patterns": {...},
  "learnings": "..."
}
```

**Output:**
```json
{
  "plan_id": "plan-gpt-001",
  "strategy": "template" | "from_scratch" | "hybrid",
  "complexity": 3,
  "estimated_time": "20 minutes",
  "nodes": [...],
  "connections": [...]
}
```

### Building Phase

**Input:**
```json
{
  "plan": {...},
  "patterns": {...},
  "learnings": "..."
}
```

**Output:**
```json
{
  "workflow_id": "wf-123",
  "nodes_created": 5,
  "connections_created": 4,
  "validation_passed": true
}
```

### Validation Phase

**Input:**
```json
{
  "workflow": {...}
}
```

**Output:**
```json
{
  "error_count": 2,
  "errors": [
    {"node": "Slack", "type": "missing_param", "severity": "critical"}
  ],
  "recommendation": "escalate_to_debugger"
}
```

### Debugging Phase

**Input:**
```json
{
  "workflow_id": "wf-123",
  "errors": [...],
  "full_context": {
    "patterns": {...},
    "learnings": "..."
  }
}
```

**Output:**
```json
{
  "fixes_applied": 3,
  "patterns_used": ["Pattern #2", "Pattern #14"],
  "validation_passed": true
}
```

### Review Phase

**Input:**
```json
{
  "workflow_id": "wf-123",
  "workflow": {...}
}
```

**Output:**
```json
{
  "quality_score": 9,
  "approval": true,
  "suggestions": [...]
}
```

## Context Sharing

### Shared Context Structure

```json
{
  "patterns": {
    "patterns": [...],
    "successful_workflows": [...]
  },
  "learnings": "...",
  "decisions": [
    {"phase": "planning", "plans": [...]},
    {"phase": "voting", "selected": {...}},
    {"phase": "building", "workflow": {...}}
  ],
  "sessionId": "session-123"
}
```

## Error Handling

### Escalation Rules

| Error Count | Action | Next Phase |
|-------------|--------|-----------|
| 0 | PASS | Review |
| 1-5 | ESCALATE | Debug |
| 6+ | FAIL | Re-plan |

### Error Severity

- **Critical**: Blocks workflow execution
- **Warning**: Can execute but may fail
- **Info**: Best practice violations

## MCP Tool Usage

### OpenAI MCP (for GPT-5)

```json
{
  "tool": "openai_chat_completion",
  "model": "gpt-5",
  "messages": [...],
  "temperature": 0.2
}
```

### Gemini MCP (for Gemini Pro/Flash)

```json
{
  "tool": "gemini_generate_content",
  "model": "gemini-exp-1206",  // Pro 2.0
  "contents": [...],
  "generationConfig": {
    "temperature": 0.2
  }
}
```

### n8n-MCP (all agents)

Available tools:
- `search_templates_by_metadata`
- `get_node_essentials`
- `validate_workflow`
- `n8n_create_workflow`
- [37 more tools...]

## Version History

- **1.0.0** (2025-01-24): Initial protocol definition
