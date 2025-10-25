/**
 * Phase 5: Debugging & Fixing
 *
 * Gemini Pro debugger applies fixes using full context (2M tokens)
 */

const {execSync} = require('child_process');
const fs = require('fs');

async function execute(workflow, errors, sharedContext) {
  console.log(`  Fixing ${errors.length} errors with Gemini Pro (2M context)...`);

  // Call debugger agent with FULL context
  const result = await callAgent('n8n-debugger', {
    workflow_id: workflow.workflow_id,
    workflow: workflow,
    errors: errors,
    full_context: {
      patterns: sharedContext.patterns,
      learnings: sharedContext.learnings
    }
  });

  console.log(`  ✅ Applied ${result.fixes_applied} fixes`);

  if (result.patterns_used && result.patterns_used.length > 0) {
    console.log(`  📚 Used patterns: ${result.patterns_used.join(', ')}`);
  }

  return result;
}

function callAgent(agentName, input) {
  return new Promise((resolve, reject) => {
    try {
      const inputJson = JSON.stringify(input);
      const tempFile = `/tmp/agent-input-${Date.now()}.json`;

      fs.writeFileSync(tempFile, inputJson);

      const result = execSync(
        `claude agent run ${agentName} < ${tempFile}`,
        {encoding: 'utf8', stdio: 'pipe'}
      );

      fs.unlinkSync(tempFile);

      try {
        resolve(JSON.parse(result));
      } catch (e) {
        resolve({fixes_applied: 0, patterns_used: []});
      }
    } catch (error) {
      reject(new Error(`Agent ${agentName} failed: ${error.message}`));
    }
  });
}

module.exports = {execute};
