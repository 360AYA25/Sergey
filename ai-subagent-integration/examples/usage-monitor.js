/**
 * Usage Monitor for AI Subagent
 * Track API usage and costs across different models
 */

import fs from 'fs';
import path from 'path';

class UsageMonitor {
  constructor(logPath = './logs/usage.json') {
    this.logPath = logPath;
    this.usage = this.loadUsage();
    this.pricing = {
      'gpt-4o-mini': {
        input: 0.15 / 1_000_000,  // $0.15 per 1M tokens
        output: 0.60 / 1_000_000, // $0.60 per 1M tokens
      },
      'gemini-pro': {
        input: 0,  // Free tier
        output: 0, // Free tier
        freeLimit: 1_000_000, // Daily limit
      },
      'claude-sonnet': {
        input: 3.00 / 1_000_000,  // $3 per 1M tokens
        output: 15.00 / 1_000_000, // $15 per 1M tokens
      }
    };
  }

  loadUsage() {
    if (fs.existsSync(this.logPath)) {
      return JSON.parse(fs.readFileSync(this.logPath, 'utf8'));
    }
    return {
      daily: {},
      total: {
        tokens: { input: 0, output: 0 },
        cost: 0,
        requests: 0,
        byModel: {}
      }
    };
  }

  saveUsage() {
    const dir = path.dirname(this.logPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.logPath, JSON.stringify(this.usage, null, 2));
  }

  trackUsage(model, inputTokens, outputTokens, taskType = 'general') {
    const today = new Date().toISOString().split('T')[0];

    // Initialize daily stats if needed
    if (!this.usage.daily[today]) {
      this.usage.daily[today] = {
        tokens: { input: 0, output: 0 },
        cost: 0,
        requests: 0,
        byModel: {}
      };
    }

    // Initialize model stats
    if (!this.usage.daily[today].byModel[model]) {
      this.usage.daily[today].byModel[model] = {
        tokens: { input: 0, output: 0 },
        cost: 0,
        requests: 0,
        taskTypes: {}
      };
    }

    if (!this.usage.total.byModel[model]) {
      this.usage.total.byModel[model] = {
        tokens: { input: 0, output: 0 },
        cost: 0,
        requests: 0,
        taskTypes: {}
      };
    }

    // Calculate cost
    const cost = this.calculateCost(model, inputTokens, outputTokens);

    // Update daily stats
    this.usage.daily[today].tokens.input += inputTokens;
    this.usage.daily[today].tokens.output += outputTokens;
    this.usage.daily[today].cost += cost;
    this.usage.daily[today].requests += 1;

    this.usage.daily[today].byModel[model].tokens.input += inputTokens;
    this.usage.daily[today].byModel[model].tokens.output += outputTokens;
    this.usage.daily[today].byModel[model].cost += cost;
    this.usage.daily[today].byModel[model].requests += 1;

    // Track task types
    if (!this.usage.daily[today].byModel[model].taskTypes[taskType]) {
      this.usage.daily[today].byModel[model].taskTypes[taskType] = 0;
    }
    this.usage.daily[today].byModel[model].taskTypes[taskType] += 1;

    // Update total stats
    this.usage.total.tokens.input += inputTokens;
    this.usage.total.tokens.output += outputTokens;
    this.usage.total.cost += cost;
    this.usage.total.requests += 1;

    this.usage.total.byModel[model].tokens.input += inputTokens;
    this.usage.total.byModel[model].tokens.output += outputTokens;
    this.usage.total.byModel[model].cost += cost;
    this.usage.total.byModel[model].requests += 1;

    if (!this.usage.total.byModel[model].taskTypes[taskType]) {
      this.usage.total.byModel[model].taskTypes[taskType] = 0;
    }
    this.usage.total.byModel[model].taskTypes[taskType] += 1;

    // Save to file
    this.saveUsage();

    return {
      cost,
      totalCostToday: this.usage.daily[today].cost,
      totalCostAllTime: this.usage.total.cost
    };
  }

  calculateCost(model, inputTokens, outputTokens) {
    const pricing = this.pricing[model];
    if (!pricing) return 0;

    const inputCost = inputTokens * pricing.input;
    const outputCost = outputTokens * pricing.output;
    return inputCost + outputCost;
  }

  getSavings() {
    const claudeCost = this.calculateCost(
      'claude-sonnet',
      this.usage.total.tokens.input,
      this.usage.total.tokens.output
    );

    const actualCost = this.usage.total.cost;
    const savings = claudeCost - actualCost;
    const savingsPercent = (savings / claudeCost * 100).toFixed(2);

    return {
      claudeWouldCost: claudeCost.toFixed(4),
      actualCost: actualCost.toFixed(4),
      savedAmount: savings.toFixed(4),
      savedPercent: savingsPercent + '%'
    };
  }

  getDailyReport(date = null) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const stats = this.usage.daily[targetDate];

    if (!stats) {
      return { message: 'No usage data for this date' };
    }

    return {
      date: targetDate,
      totalRequests: stats.requests,
      totalTokens: {
        input: stats.tokens.input,
        output: stats.tokens.output,
        total: stats.tokens.input + stats.tokens.output
      },
      totalCost: `$${stats.cost.toFixed(4)}`,
      byModel: Object.entries(stats.byModel).map(([model, data]) => ({
        model,
        requests: data.requests,
        tokens: data.tokens,
        cost: `$${data.cost.toFixed(4)}`,
        taskTypes: data.taskTypes
      }))
    };
  }

  getModelComparison() {
    const comparison = [];

    for (const [model, data] of Object.entries(this.usage.total.byModel)) {
      comparison.push({
        model,
        totalRequests: data.requests,
        totalTokens: data.tokens.input + data.tokens.output,
        totalCost: `$${data.cost.toFixed(4)}`,
        averageTokensPerRequest: Math.round(
          (data.tokens.input + data.tokens.output) / data.requests
        ),
        mostCommonTasks: Object.entries(data.taskTypes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([task, count]) => `${task} (${count})`)
      });
    }

    return comparison.sort((a, b) => b.totalRequests - a.totalRequests);
  }

  printReport() {
    console.log('\n📊 AI SUBAGENT USAGE REPORT\n');
    console.log('='.repeat(50));

    // Today's usage
    const today = this.getDailyReport();
    console.log('\n📅 Today:', today.date);
    console.log('Requests:', today.totalRequests || 0);
    console.log('Cost:', today.totalCost || '$0.0000');

    // Total usage
    console.log('\n💰 Total Usage:');
    console.log('Requests:', this.usage.total.requests);
    console.log('Input tokens:', this.usage.total.tokens.input.toLocaleString());
    console.log('Output tokens:', this.usage.total.tokens.output.toLocaleString());
    console.log('Total cost:', `$${this.usage.total.cost.toFixed(4)}`);

    // Savings
    const savings = this.getSavings();
    console.log('\n💸 Savings vs Claude Sonnet:');
    console.log('Claude would cost:', `$${savings.claudeWouldCost}`);
    console.log('Actual cost:', `$${savings.actualCost}`);
    console.log('You saved:', `$${savings.savedAmount} (${savings.savedPercent})`);

    // Model comparison
    console.log('\n🤖 Model Usage:');
    const comparison = this.getModelComparison();
    comparison.forEach(model => {
      console.log(`\n${model.model}:`);
      console.log(`  Requests: ${model.totalRequests}`);
      console.log(`  Cost: ${model.totalCost}`);
      console.log(`  Avg tokens/request: ${model.averageTokensPerRequest}`);
      if (model.mostCommonTasks.length > 0) {
        console.log(`  Top tasks: ${model.mostCommonTasks.join(', ')}`);
      }
    });

    console.log('\n' + '='.repeat(50));
  }
}

// Export for use in MCP server
export default UsageMonitor;

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new UsageMonitor();

  const command = process.argv[2];

  switch (command) {
    case 'report':
      monitor.printReport();
      break;
    case 'today':
      console.log(JSON.stringify(monitor.getDailyReport(), null, 2));
      break;
    case 'savings':
      console.log(JSON.stringify(monitor.getSavings(), null, 2));
      break;
    case 'models':
      console.log(JSON.stringify(monitor.getModelComparison(), null, 2));
      break;
    default:
      console.log('Usage: node usage-monitor.js [report|today|savings|models]');
  }
}