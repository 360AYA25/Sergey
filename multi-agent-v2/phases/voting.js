/**
 * Phase 2: Voting for Best Plan
 *
 * Scoring criteria:
 * - Simplicity (lower complexity = higher score)
 * - Template usage (template > from_scratch)
 * - Time estimate (faster = higher score)
 * - Maintainability (higher = better)
 */

async function execute(plans, sharedContext) {
  console.log('  Scoring plans...\n');

  const scoredPlans = plans.map((plan) => {
    let score = 0;

    // Set defaults for missing values
    const complexity = plan.complexity || 5;
    const maintainability = plan.maintainability_score || 5;

    // 1. Simplicity (max 40 points)
    score += Math.max(0, 40 - (complexity * 4));

    // 2. Template usage (20 points)
    if (plan.strategy === 'template') score += 20;
    if (plan.strategy === 'hybrid') score += 10;

    // 3. Time estimate (20 points)
    const timeMinutes = parseTimeEstimate(plan.estimated_time);
    score += Math.max(0, 20 - (timeMinutes / 10));

    // 4. Maintainability (20 points)
    score += maintainability * 2;

    console.log(`  ${plan.from}: ${score.toFixed(1)} points`);
    console.log(`    - Simplicity: ${40 - (complexity * 4)} (complexity: ${complexity})`);
    console.log(`    - Strategy: ${plan.strategy}`);
    console.log(`    - Time: ${plan.estimated_time}`);

    return {...plan, score};
  });

  // Sort by score
  scoredPlans.sort((a, b) => b.score - a.score);

  // Interactive mode - let user choose
  if (sharedContext.interactive) {
    return await interactiveVote(scoredPlans);
  }

  return scoredPlans[0];
}

async function interactiveVote(scoredPlans) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 ИНТЕРАКТИВНЫЙ РЕЖИМ - Выбери план!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  scoredPlans.forEach((plan, i) => {
    console.log(`${i + 1}. ${plan.from} (Score: ${plan.score.toFixed(1)})`);
    console.log(`   Сложность: ${plan.complexity || '?'}`);
    console.log(`   Время: ${plan.estimated_time || '?'}`);
    console.log(`   Maintainability: ${plan.maintainability_score || '?'}/10`);
    if (plan.output) {
      const preview = plan.output.substring(0, 150).replace(/\n/g, ' ');
      console.log(`   План: ${preview}...`);
    }
    console.log('');
  });

  console.log('AI рекомендует: ' + scoredPlans[0].from + ' (лучший score)');
  console.log('');

  return new Promise((resolve) => {
    rl.question('Твой выбор (1-3, Enter = рекомендация AI): ', (answer) => {
      rl.close();

      const choice = answer.trim();
      if (!choice) {
        console.log(`\n✅ Выбран: ${scoredPlans[0].from} (рекомендация AI)\n`);
        resolve(scoredPlans[0]);
      } else {
        const index = parseInt(choice) - 1;
        if (index >= 0 && index < scoredPlans.length) {
          console.log(`\n✅ Выбран: ${scoredPlans[index].from}\n`);
          resolve(scoredPlans[index]);
        } else {
          console.log(`\n⚠️  Неверный выбор, использую рекомендацию AI\n`);
          resolve(scoredPlans[0]);
        }
      }
    });
  });
}

function parseTimeEstimate(estimate) {
  // "20 minutes" → 20
  // "1-2 hours" → 90 (average)
  // "2-3 hours" → 150
  if (!estimate || typeof estimate !== 'string') {
    return 60; // default 1 hour
  }

  const match = estimate.match(/(\d+)(?:-(\d+))?\s*(min|hour)/i);
  if (!match) return 60; // default 1 hour

  const num1 = parseInt(match[1]);
  const num2 = match[2] ? parseInt(match[2]) : num1;
  const unit = match[3].toLowerCase();

  const avg = (num1 + num2) / 2;
  return unit.startsWith('hour') ? avg * 60 : avg;
}

module.exports = {execute};
