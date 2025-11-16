# Orchestrator Agent - Master Controller

```json
{
  "name": "OrchestratorAgent",
  "role": "Master coordinator of all AI agents in Aryamann's daily routine",
  "objective": "Manage agent execution timing, data flow, and daily planning synthesis",
  "version": "1.0",
  "last_updated": "2025-11-08",
  
  "daily_schedule": {
    "06:30": {
      "trigger": "SchedulerAgent",
      "action": "Initialize daily workflow and read previous day's logs"
    },
    "06:45": {
      "trigger": "MoodAgent",
      "action": "Check sleep quality and morning energy levels from journal"
    },
    "07:30": {
      "trigger": "FocusAgent",
      "action": "Inject morning cognitive puzzle (5-10 min)"
    },
    "08:00": {
      "trigger": "LearningAgent",
      "action": "Set today's learning focus based on tech roadmap"
    },
    "12:00": {
      "trigger": "MoodAgent",
      "action": "Midday energy check and productivity assessment"
    },
    "20:00": {
      "trigger": "FinanceAgent",
      "action": "Analyze daily spending and update budget insights"
    },
    "21:00": {
      "trigger": "MoodAgent",
      "action": "Evening reflection and energy pattern analysis"
    },
    "22:00": {
      "trigger": "FocusAgent",
      "action": "Light evening puzzle for wind-down"
    },
    "22:30": {
      "trigger": "SchedulerAgent",
      "action": "Compile all agent logs and generate Tomorrow's Action Plan"
    }
  },
  
  "inputs": [
    "70-Agents/logs/",
    "20-Journal/",
    "10-Projects/",
    "40-Learning/",
    "50-Finance/",
    "60-Habits_Trackers/"
  ],
  
  "outputs": [
    "70-Agents/logs/Orchestrator_<date>.md",
    "00-Inbox/DailyBrief_<date>.md"
  ],
  
  "behavior": {
    "coordinate_agent_execution": true,
    "detect_scheduling_conflicts": true,
    "prioritize_urgent_tasks": true,
    "generate_daily_synthesis": true,
    "track_cross_agent_dependencies": true,
    "auto_adjust_based_on_mood": true
  },
  
  "data_flow": {
    "morning_flow": "MoodAgent → FocusAgent → LearningAgent",
    "midday_flow": "MoodAgent → SchedulerAgent (priority adjust)",
    "evening_flow": "FinanceAgent → MoodAgent → FocusAgent → SchedulerAgent"
  },
  
  "agent_dependencies": {
    "FinanceAgent": ["Journal mood notes", "MasterSheet PDFs"],
    "LearningAgent": ["Tech stack roadmap", "Project timelines"],
    "FocusAgent": ["Mood energy levels", "Distraction triggers"],
    "MoodAgent": ["Journal entries", "Gym logs", "Sleep data"],
    "SchedulerAgent": ["All agent logs", "Priority queue"]
  },
  
  "example_daily_output": {
    "morning_brief": "Energy: 8/10 | Puzzle: Pattern Recognition L2 | Focus: FastAPI JWT auth",
    "midday_adjust": "Energy dip detected. Suggest: 15min walk + hydration",
    "evening_summary": "Spent: ₹2,930 (Warn: Penalty fees) | Learning: 2hrs FastAPI | Tomorrow: LangGraph nodes"
  }
}
```

## How It Works

The Orchestrator acts as your **AI operating system**, coordinating all agents throughout the day:

### Morning Initialization (6:30-8:00 AM)
- SchedulerAgent reads yesterday's performance
- MoodAgent sets energy baseline
- FocusAgent injects cognitive puzzle
- LearningAgent recommends daily topic

### Midday Check (12:00 PM)
- MoodAgent monitors energy dip
- Auto-adjusts afternoon priorities

### Evening Synthesis (8:00-10:30 PM)
- FinanceAgent analyzes spending
- MoodAgent logs reflection
- FocusAgent provides wind-down puzzle
- SchedulerAgent compiles Tomorrow's Plan

### Output
Daily brief appears in `00-Inbox/DailyBrief_<date>.md` with:
- Morning focus areas
- Energy optimization tips
- Financial alerts
- Tomorrow's priority queue
