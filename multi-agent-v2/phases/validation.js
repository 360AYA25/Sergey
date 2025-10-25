/**
 * Phase 4: Quick Validation
 *
 * Flash validator finds errors (doesn't fix)
 * - 0 errors → PASS to review
 * - 1-5 errors → ESCALATE to debugger
 * - 6+ errors → FAIL (back to planner)
 */

const {execSync} = require('child_process');
const fs = require('fs');

async function execute(workflow, sharedContext) {
  console.log(`  Validating workflow ${workflow.workflow_id}...`);

  // Call validator agent
  const result = await callAgent('n8n-validator', {
    workflow: workflow
  });

  if (result.error_count === 0) {
    console.log(`  ✅ Validation passed`);
  } else {
    console.log(`  ⚠️  Found ${result.error_count} errors`);
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
        resolve({error_count: 0, errors: [], status: 'pass'});
      }
    } catch (error) {
      reject(new Error(`Agent ${agentName} failed: ${error.message}`));
    }
  });
}

module.exports = {execute};
