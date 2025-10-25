/**
 * Phase 7: Save Pattern
 *
 * Updates PATTERNS.json with successful workflow
 */

const fs = require('fs');
const path = require('path');

async function execute(workflowData) {
  const {task, plan, workflow, review} = workflowData;

  console.log(`  Updating knowledge base...`);

  // Load existing patterns
  const patternsPath = path.join(__dirname, '../shared/PATTERNS.json');
  let patterns;

  try {
    patterns = JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
  } catch (e) {
    console.warn('  ⚠️  PATTERNS.json not found, creating new one');
    patterns = {
      version: "1.0.0",
      patterns: [],
      successful_workflows: []
    };
  }

  // Create new workflow entry
  const newWorkflow = {
    id: workflow.workflow_id,
    task: task,
    plan_chosen: plan.plan_id,
    plan_from: plan.from,
    quality_score: review.quality_score,
    complexity: plan.complexity,
    estimated_time: plan.estimated_time,
    patterns_used: workflow.patterns_used || [],
    created_at: new Date().toISOString()
  };

  // Add to successful workflows
  patterns.successful_workflows = patterns.successful_workflows || [];
  patterns.successful_workflows.push(newWorkflow);

  // Update statistics
  patterns.statistics = patterns.statistics || {};
  patterns.statistics.total_workflows = patterns.successful_workflows.length;
  patterns.statistics.avg_quality_score = (
    patterns.successful_workflows.reduce((sum, w) => sum + w.quality_score, 0) /
    patterns.successful_workflows.length
  ).toFixed(2);
  patterns.statistics.last_updated = new Date().toISOString();

  // Save
  fs.writeFileSync(patternsPath, JSON.stringify(patterns, null, 2));

  console.log(`  ✅ Pattern saved`);
  console.log(`  📊 Total workflows: ${patterns.successful_workflows.length}`);
  console.log(`  📊 Avg quality: ${patterns.statistics.avg_quality_score}/10`);

  // Save workflow JSON (optional)
  const workflowDir = '/Users/sergey/Projects/n8n-docs/workflows/successful';

  try {
    if (!fs.existsSync(workflowDir)) {
      fs.mkdirSync(workflowDir, {recursive: true});
    }

    const workflowPath = path.join(workflowDir, `${workflow.workflow_id}.json`);
    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));

    console.log(`  📁 Workflow saved: workflows/successful/${workflow.workflow_id}.json`);
  } catch (e) {
    console.warn(`  ⚠️  Could not save workflow JSON: ${e.message}`);
  }
}

module.exports = {execute};
