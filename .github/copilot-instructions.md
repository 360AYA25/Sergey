# n8n Workflow Development Instructions

> **For GitHub Copilot & Claude Code**
> Enhanced n8n automation with MCP integration

---

## 🎯 Core Principles

1. **ALWAYS validate before building** - Use validation tools first
2. **Search before creating** - Check templates for existing solutions
3. **Test thoroughly** - Never deploy to production without testing
4. **Document workflows** - Explain complex logic in workflow descriptions

---

## 🔧 Available Tools

You have access to n8n-MCP with 23 specialized tools:

### Discovery Tools:
- `search_nodes` - Find appropriate nodes for your task
- `get_node_info` - Get detailed node documentation
- `search_templates` - Find existing workflow templates
- `list_ai_tools` - Discover AI-capable nodes

### Validation Tools:
- `validate_workflow` - Complete workflow validation
- `validate_node_operation` - Check node configuration
- `validate_workflow_expressions` - Verify n8n expressions

### Building Tools:
- `n8n_create_workflow` - Deploy new workflows
- `n8n_update_workflow` - Modify existing workflows
- `n8n_execute_workflow` - Test workflow execution

---

## 📝 Workflow Development Process

### Step 1: Discover
```
1. Search for templates: "search_templates: email automation"
2. Find relevant nodes: "search_nodes: send email"
3. Check node details: "get_node_info: Gmail"
```

### Step 2: Design
```
1. Choose trigger type (webhook, schedule, manual)
2. Plan data flow (input → process → output)
3. Add error handling nodes
4. Consider edge cases
```

### Step 3: Build
```
1. Start with template if available
2. Configure each node carefully
3. Use Set nodes for data transformation
4. Add IF nodes for conditional logic
```

### Step 4: Validate
```
1. validate_workflow - Check entire workflow
2. validate_workflow_connections - Verify structure
3. validate_workflow_expressions - Test expressions
```

### Step 5: Deploy & Test
```
1. Create workflow on n8n instance
2. Run test execution
3. Check execution logs
4. Iterate if needed
```

---

## 🚨 Common Patterns

### Pattern: Webhook → Process → Store
```
Webhook Trigger
  ↓
Set (transform data)
  ↓
IF (validate input)
  ↓ TRUE              ↓ FALSE
OpenAI Node       Error Response
  ↓
Notion (save)
  ↓
Response (success)
```

### Pattern: Scheduled Data Sync
```
Schedule Trigger (cron)
  ↓
Google Sheets (read)
  ↓
Loop Over Items
  ↓
HTTP Request (enrich)
  ↓
Supabase (upsert)
  ↓
Telegram (notify)
```

### Pattern: AI Agent Workflow
```
Webhook Trigger
  ↓
Agent (LangChain)
  ├─ Tool: Search Database
  ├─ Tool: Call API
  └─ Tool: Generate Response
  ↓
Response (result)
```

---

## ✅ Best Practices

### Node Configuration:
- Always set node names descriptively
- Use "Continue on Fail" for optional steps
- Add "Retry on Fail" for API calls
- Set proper timeout values

### Data Handling:
- Use Set node to clean data structure
- Validate incoming data early
- Use Code node for complex transformations
- Always handle null/undefined values

### Error Handling:
- Add Error Trigger nodes
- Send notifications on failures
- Log errors to database
- Implement retry logic

### Performance:
- Use "Execute Once" when appropriate
- Batch API requests when possible
- Cache frequently used data
- Optimize webhook response time

---

## 🔐 Security Rules

- **NEVER** hardcode API keys in workflows
- Use Credentials for authentication
- Validate webhook sources
- Sanitize user inputs
- Use HTTPS for all external calls

---

## 📊 Available n8n Nodes

### Popular Categories:
- **Communication**: Telegram, Slack, Discord, Email
- **AI**: OpenAI, Anthropic, Google AI, LangChain
- **Databases**: Supabase, PostgreSQL, MongoDB, Notion
- **Storage**: Google Drive, AWS S3, Dropbox
- **Automation**: Schedule, Webhook, Manual Trigger
- **Transform**: Set, Code, IF, Switch, Merge

### AI-Capable Nodes (263 total):
Use `list_ai_tools` to see complete list with descriptions

---

## 🎓 n8n Expression Syntax

### Accessing Data:
```javascript
{{ $json.fieldName }}          // Current item field
{{ $node["Node Name"].json }}  // Specific node output
{{ $input.all() }}             // All input items
{{ $input.first() }}           // First input item
```

### JavaScript Expressions:
```javascript
{{ $json.price * 1.2 }}        // Math operations
{{ $json.name.toUpperCase() }} // String methods
{{ $now.format('YYYY-MM-DD') }}// Date formatting
```

### Functions:
```javascript
{{ $jmespath($json, "path") }} // JMESPath query
{{ $parseJson($json.text) }}   // Parse JSON string
{{ $uuid() }}                  // Generate UUID
```

---

## 🚀 Quick Commands

When user asks for workflow automation:

1. **Search templates first**: `search_templates: [task description]`
2. **Find relevant nodes**: `search_nodes: [capability]`
3. **Get node details**: `get_node_info: [node name]`
4. **Validate before deploy**: `validate_workflow: [workflow JSON]`
5. **Deploy to n8n**: `n8n_create_workflow: [validated workflow]`

---

## ⚠️ Critical Reminders

- 🔴 NEVER edit production workflows without backup
- 🔴 ALWAYS test in development first
- 🔴 VALIDATE workflow before deployment
- 🔴 CHECK execution logs after deployment
- 🔴 DOCUMENT complex workflows

---

## 📚 Resources

- **n8n Instance**: https://n8n.srv1068954.hstgr.cloud
- **Official Docs**: https://docs.n8n.io
- **Template Library**: Use `search_templates` tool
- **Node Reference**: Use `get_node_info` tool

---

**Remember**: You have 536 nodes and 2,500+ templates at your disposal. Almost any automation is possible!