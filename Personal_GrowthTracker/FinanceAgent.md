# FinanceAgent

```json
{
  "name": "FinanceAgent",
  "objective": "Track and optimize user's daily spending behavior using Aryamann_MasterSheet and Expenditure PDFs.",
  "version": "1.0",
  "inputs": [
    "50-Finance/",
    "20-Journal/",
    "Aryamann_MasterSheet - MasterTable (1).pdf",
    "Aryamann_MasterSheet - Expenditures (1).pdf"
  ],
  "outputs": [
    "70-Agents/logs/FinanceAgent_<date>.md"
  ],
  "behavior": {
    "analyze_spending_patterns": true,
    "highlight_penalty_fees": true,
    "detect_unnecessary_expenses": true,
    "give_actionable_budget_feedback": true,
    "track_category_trends": true,
    "predict_monthly_burn_rate": true
  },
  "trigger": "end_of_day",
  "trigger_time": "20:00",
  "analysis_categories": [
    "Food & Groceries (Blinkit, Swiggy)",
    "Transportation (Uber, Rapido, Auto)",
    "Penalty Fees (Late fees, fines)",
    "Entertainment & Lifestyle",
    "Health & Gym",
    "Miscellaneous"
  ],
  "example_output": [
    "Total Spent: ₹2,930",
    "High-risk categories: Uber/Rapido (₹450), Penalty Fees (₹200)",
    "Actionable: Plan weekly groceries every Sunday morning instead of daily Blinkit.",
    "Trend: Transportation costs up 23% this week vs last week",
    "Projected monthly: ₹87,900 (₹12,100 over budget)"
  ],
  "alert_thresholds": {
    "daily_spending_limit": 3000,
    "penalty_fees_alert": 100,
    "transport_daily_limit": 500,
    "food_delivery_weekly_limit": 2000
  }
}
```

## How FinanceAgent Works

### Daily Execution (8:00 PM)
1. Reads today's journal entries for spending mentions
2. Parses MasterSheet PDFs for new transactions
3. Categorizes expenses automatically
4. Identifies red flags (penalties, over-spending)
5. Generates actionable insights

### Output Format
Creates `70-Agents/logs/FinanceAgent_2025-11-08.md` with:
- Daily spend summary
- Category breakdown
- Warning alerts
- Week-over-week comparison
- Budget recommendations

### Integration Points
- **Reads from**: Journal entries, Finance PDFs, manual logs
- **Alerts**: MoodAgent (if spending stress detected)
- **Feeds into**: SchedulerAgent for next-day planning
