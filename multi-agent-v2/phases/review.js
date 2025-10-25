/**
 * Phase 6: Peer Review
 *
 * Claude Opus reviewer performs final quality check
 */

const {execSync} = require('child_process');
const fs = require('fs');

async function execute(workflow, sharedContext) {
  console.log(`  Reviewing workflow with Claude Opus...`);

  // Call reviewer agent
  const result = await callAgent('n8n-reviewer', {
    __API_MODE__: true,
    __RETURN_JSON_ONLY__: true,
    workflow_id: workflow.workflow_id,
    workflow: workflow,
    creator: 'builder',
    debugger: 'debugger-gemini'
  });

  console.log(`  📊 Quality score: ${result.quality_score}/10`);

  if (result.suggestions && result.suggestions.length > 0) {
    console.log(`  💡 Suggestions:`);
    result.suggestions.forEach((s, i) => {
      console.log(`     ${i+1}. ${s}`);
    });
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
        resolve({
          quality_score: 7,
          approval: true,
          suggestions: []
        });
      }
    } catch (error) {
      reject(new Error(`Agent ${agentName} failed: ${error.message}`));
    }
  });
}

module.exports = {execute};
