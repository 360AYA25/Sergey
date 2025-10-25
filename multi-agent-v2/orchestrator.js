#!/usr/bin/env node
/**
 * Multi-Agent Workflow Orchestrator
 *
 * Manages 7-phase collaborative workflow:
 * 1. Planning (3 planners in parallel)
 * 2. Voting (choose best plan)
 * 3. Building (builder implements)
 * 4. Validation (flash finds errors)
 * 5. Debugging (gemini fixes errors)
 * 6. Review (opus reviews)
 * 7. Knowledge (save pattern)
 *
 * Usage:
 *   node orchestrator.js "Create Telegram logger"
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

// Import phases
const planning = require('./phases/planning');
const voting = require('./phases/voting');
const building = require('./phases/building');
const validation = require('./phases/validation');
const debugging = require('./phases/debugging');
const review = require('./phases/review');
const knowledge = require('./phases/knowledge');

class WorkflowOrchestrator {
  constructor(options = {}) {
    this.sessionId = `session-${Date.now()}`;
    this.logDir = path.join(__dirname, 'logs/orchestrator');

    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, {recursive: true});
    }

    // Shared context across all phases
    this.sharedContext = {
      patterns: this.loadPATTERNS(),
      learnings: this.loadLEARNINGS(),
      decisions: [],
      sessionId: this.sessionId,
      interactive: options.interactive || false,
      preferences: options.preferences || {}
    };
  }

  loadPATTERNS() {
    try {
      const patternsPath = path.join(__dirname, 'shared/PATTERNS.json');
      return JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️  PATTERNS.json not found, using empty knowledge base');
      return {patterns: [], successful_workflows: []};
    }
  }

  loadLEARNINGS() {
    try {
      const learningsPath = '/Users/sergey/Projects/n8n-docs/LEARNINGS.md';
      return fs.readFileSync(learningsPath, 'utf8');
    } catch (e) {
      console.warn('⚠️  LEARNINGS.md not found');
      return '';
    }
  }

  async execute(userTask) {
    console.log(`\n🚀 Multi-Agent Workflow Orchestrator`);
    console.log(`📋 Session: ${this.sessionId}`);
    console.log(`📝 Task: ${userTask}\n`);

    const startTime = Date.now();

    try {
      // Phase 1: Collaborative Planning (3 planners in parallel)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📐 Phase 1/7: Collaborative Planning...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const plans = await planning.execute(userTask, this.sharedContext);
      this.sharedContext.decisions.push({phase: 'planning', plans});

      console.log(`\n✅ Received ${plans.length} plans`);
      plans.forEach((p, i) => {
        console.log(`   ${i+1}. ${p.from}: complexity ${p.complexity}, ${p.estimated_time}`);
      });

      // Phase 2: Voting (choose best plan)
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🗳️  Phase 2/7: Voting for Best Plan...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const selectedPlan = await voting.execute(plans, this.sharedContext);
      this.sharedContext.decisions.push({phase: 'voting', selected: selectedPlan});

      console.log(`\n✅ Selected: ${selectedPlan.from} (score: ${selectedPlan.score.toFixed(1)})`);

      // Phase 3: Building (implement plan)
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔨 Phase 3/7: Building Workflow...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const workflow = await building.execute(selectedPlan, this.sharedContext);
      this.sharedContext.decisions.push({phase: 'building', workflow});

      console.log(`\n✅ Created workflow: ${workflow.workflow_id}`);
      console.log(`   Nodes: ${workflow.nodes_created}, Connections: ${workflow.connections_created}`);

      // Phase 4: Validation (quick check)
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Phase 4/7: Validating Workflow...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const validationResult = await validation.execute(workflow, this.sharedContext);
      this.sharedContext.decisions.push({phase: 'validation', result: validationResult});

      if (validationResult.error_count === 0) {
        console.log(`\n✅ No errors found`);
      } else {
        console.log(`\n⚠️  Found ${validationResult.error_count} errors`);
        validationResult.errors.forEach((err, i) => {
          console.log(`   ${i+1}. ${err.node}: ${err.type} (${err.severity})`);
        });

        // Phase 5: Debugging (fix errors)
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🐛 Phase 5/7: Debugging & Fixing...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const fixedWorkflow = await debugging.execute(
          workflow,
          validationResult.errors,
          this.sharedContext
        );
        this.sharedContext.decisions.push({phase: 'debugging', fixes: fixedWorkflow});

        console.log(`\n✅ Applied ${fixedWorkflow.fixes_applied} fixes`);
        if (fixedWorkflow.patterns_used.length > 0) {
          console.log(`   Patterns: ${fixedWorkflow.patterns_used.join(', ')}`);
        }

        // Re-validate
        console.log('\n✅ Re-validating...');
        const revalidation = await validation.execute(fixedWorkflow, this.sharedContext);
        if (revalidation.error_count > 0) {
          throw new Error(`Still ${revalidation.error_count} errors after debugging`);
        }
        console.log(`✅ All errors fixed`);
      }

      // Phase 6: Peer Review (final check)
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('👀 Phase 6/7: Peer Review...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const reviewResult = await review.execute(workflow, this.sharedContext);
      this.sharedContext.decisions.push({phase: 'review', result: reviewResult});

      console.log(`\n📊 Quality score: ${reviewResult.quality_score}/10`);

      if (!reviewResult.approval) {
        console.log(`⚠️  Review not approved`);
        console.log(`   Suggestions: ${reviewResult.suggestions.join(', ')}`);
      } else {
        console.log(`✅ Review approved!`);
      }

      // Phase 7: Save Pattern (knowledge base)
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('💾 Phase 7/7: Saving Pattern...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      await knowledge.execute({
        task: userTask,
        plan: selectedPlan,
        workflow,
        review: reviewResult
      });

      console.log(`✅ Pattern saved to knowledge base`);

      // Final summary
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 Workflow Complete!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log(`📝 Task: ${userTask}`);
      console.log(`🆔 Workflow ID: ${workflow.workflow_id}`);
      console.log(`📊 Quality Score: ${reviewResult.quality_score}/10`);
      console.log(`⏱️  Time: ${elapsed}s`);
      console.log(`📋 Session: ${this.sessionId}\n`);

      return {
        success: true,
        workflow,
        review: reviewResult,
        elapsed
      };

    } catch (error) {
      console.error(`\n❌ Orchestration failed: ${error.message}`);
      throw error;
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  // Parse flags
  const options = {
    interactive: false,
    preferences: {}
  };

  const taskParts = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--interactive' || arg === '-i') {
      options.interactive = true;
    } else if (arg === '--prefer' || arg === '-p') {
      // --prefer "Airtable,Supabase" or --prefer "avoid:Notion"
      i++;
      if (i < args.length) {
        const prefs = args[i].split(',');
        prefs.forEach(pref => {
          if (pref.startsWith('avoid:')) {
            const service = pref.substring(6);
            options.preferences.avoid = options.preferences.avoid || [];
            options.preferences.avoid.push(service);
          } else {
            options.preferences.prefer = options.preferences.prefer || [];
            options.preferences.prefer.push(pref);
          }
        });
      }
    } else {
      taskParts.push(arg);
    }
  }

  const task = taskParts.join(' ');

  if (!task) {
    console.error('Usage: node orchestrator.js [options] "task description"');
    console.error('');
    console.error('Options:');
    console.error('  -i, --interactive        Human chooses the best plan');
    console.error('  -p, --prefer <services>  Preferred services (comma-separated)');
    console.error('                           Use "avoid:Service" to blacklist');
    console.error('');
    console.error('Examples:');
    console.error('  node orchestrator.js "Create webhook"');
    console.error('  node orchestrator.js -i "Create Telegram bot"');
    console.error('  node orchestrator.js -p "Airtable,Supabase" "Create database workflow"');
    console.error('  node orchestrator.js -p "avoid:Notion" -i "Create logger"');
    process.exit(1);
  }

  if (options.interactive) {
    console.log('🎮 Interactive mode enabled - you will choose the best plan!');
  }
  if (options.preferences.prefer) {
    console.log(`👍 Preferred services: ${options.preferences.prefer.join(', ')}`);
  }
  if (options.preferences.avoid) {
    console.log(`👎 Avoiding services: ${options.preferences.avoid.join(', ')}`);
  }
  console.log('');

  const orchestrator = new WorkflowOrchestrator(options);
  orchestrator.execute(task)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = WorkflowOrchestrator;
