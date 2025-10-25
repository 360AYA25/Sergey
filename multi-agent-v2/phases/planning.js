/**
 * Phase 1: Collaborative Planning
 *
 * Executes 3 planners in PARALLEL:
 * - GPT-5 (fast prototyping)
 * - Gemini Pro 2.0 (full context, 2M tokens)
 * - Claude Sonnet (best practices)
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

async function execute(userTask, sharedContext) {
  console.log('  Invoking 3 planners in parallel...\n');

  // Prepare context for Gemini (full project)
  const fullContext = prepareFullContext(sharedContext);

  // Call 3 agents in parallel
  const plannerPromises = [
    callAgent('n8n-planner-gpt', {
      __API_MODE__: true,
      __RETURN_JSON_ONLY__: true,
      task: userTask,
      user_context: "Beginner, wants simple solution"
    }),

    callAgent('n8n-planner-gemini', {
      __API_MODE__: true,
      __RETURN_JSON_ONLY__: true,
      task: userTask,
      full_project_context: fullContext,
      patterns: sharedContext.patterns,
      learnings: sharedContext.learnings
    }),

    callAgent('n8n-architect', {
      __API_MODE__: true,
      __RETURN_JSON_ONLY__: true,
      task: userTask,
      constraint: "Must be maintainable for beginners",
      patterns: sharedContext.patterns
    })
  ];

  const [planGPT, planGemini, planClaude] = await Promise.all(plannerPromises);

  console.log(`  ✅ GPT: complexity ${planGPT.complexity}, ${planGPT.estimated_time}`);
  console.log(`  ✅ Gemini: complexity ${planGemini.complexity}, ${planGemini.estimated_time}`);
  console.log(`  ✅ Claude: maintainability ${planClaude.maintainability_score}/10`);

  // Add metadata
  planGPT.from = 'planner-gpt';
  planGemini.from = 'planner-gemini';
  planClaude.from = 'architect';

  return [planGPT, planGemini, planClaude];
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

      // Log raw response for debugging
      const logDir = path.join(__dirname, '../logs/agents');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, {recursive: true});
      }
      fs.writeFileSync(
        path.join(logDir, `${agentName}-${Date.now()}.txt`),
        result
      );

      // Try to parse JSON response
      try {
        // First try direct parse
        resolve(JSON.parse(result));
      } catch (e) {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          try {
            resolve(JSON.parse(jsonMatch[1]));
            return;
          } catch (e2) {
            // Continue to fallback
          }
        }

        // If not JSON, return raw output with default structure
        console.warn(`  ⚠️  ${agentName} returned non-JSON response`);
        resolve({
          output: result,
          raw: true,
          complexity: 3,
          estimated_time: '30 minutes',
          maintainability_score: 7
        });
      }
    } catch (error) {
      reject(new Error(`Agent ${agentName} failed: ${error.message}`));
    }
  });
}

function prepareFullContext(sharedContext) {
  const context = {
    patterns: sharedContext.patterns,
    learnings: sharedContext.learnings,
    successful_workflows: sharedContext.patterns.successful_workflows || [],
    total_tokens: 0
  };

  // Calculate approximate tokens
  context.total_tokens +=
    JSON.stringify(context.patterns).length / 4 +
    context.learnings.length / 4;

  console.log(`  📊 Full context: ~${Math.round(context.total_tokens / 1000)}K tokens`);

  return context;
}

module.exports = {execute};
