/**
 * Phase 3: Building Workflow
 *
 * Builder implements the selected plan using GPT-5 via MCP
 */

const {execSync} = require('child_process');
const fs = require('fs');

async function execute(plan, sharedContext) {
  console.log(`  Building workflow from ${plan.from} plan...`);
  console.log(`  Strategy: ${plan.strategy}`);

  // Call builder agent
  const workflow = await callAgent('n8n-builder', {
    __API_MODE__: true,
    __RETURN_JSON_ONLY__: true,
    plan: plan,
    patterns: sharedContext.patterns,
    learnings: sharedContext.learnings
  });

  console.log(`  ✅ Created ${workflow.nodes_created} nodes`);
  console.log(`  ✅ Created ${workflow.connections_created} connections`);

  return workflow;
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
        resolve({output: result, raw: true});
      }
    } catch (error) {
      reject(new Error(`Agent ${agentName} failed: ${error.message}`));
    }
  });
}

module.exports = {execute};
