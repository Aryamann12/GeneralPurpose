# AI Agent System - Master Documentation

**Version**: 1.0  
**Launch Date**: November 08, 2025  
**Status**: Phase 1 - Active

---
## 🎯 System Overview

This is your personal AI operating system that orchestrates your daily routine through specialized agents. Each agent monitors specific domains of your life and provides intelligent insights to optimize productivity, learning, health, and financial wellbeing.

## 🤖 Agent Architecture

### Core Agents (5)

1. **OrchestratorAgent** - Master coordinator
   - Manages all agent timing and execution
   - Generates daily synthesis
   - Creates Tomorrow's Action Plan
   
2. **FinanceAgent** - Financial optimizer
   - Tracks daily spending
   - Identifies wasteful patterns
   - Provides budget recommendations
   - **Triggers**: Daily at 8:00 PM
   
3. **LearningAgent** - Skill accelerator
   - Recommends daily learning topics
   - Generates micro-challenges
   - Tracks knowledge retention
   - **Triggers**: Daily at 8:00 AM
   
4. **FocusAgent** - Mental sharpness enhancer
   - Injects cognitive puzzles
   - Tracks distraction patterns
   - Optimizes peak focus windows
   - **Triggers**: 7:30 AM, 10:00 PM
   
5. **SchedulerAgent** - Daily planner
   - Compiles all agent insights
   - Prioritizes tasks by energy
   - Manages carry-forwards
   - **Triggers**: 6:30 AM, 10:30 PM

### MoodAgent - Wellbeing tracker
   - Monitors energy levels
   - Identifies stress triggers
   - Suggests recovery actions
   - **Triggers**: 6:45 AM, 12:00 PM, 9:00 PM

---

## ⏰ Daily Execution Timeline

```
06:30 AM → OrchestratorAgent initializes
06:45 AM → MoodAgent: Morning energy check
07:30 AM → FocusAgent: Morning puzzle injection
08:00 AM → LearningAgent: Daily topic selection

12:00 PM → MoodAgent: Midday energy check

20:00 PM → FinanceAgent: Daily spending analysis
21:00 PM → MoodAgent: Evening reflection
22:00 PM → FocusAgent: Wind-down puzzle
22:30 PM → SchedulerAgent: Tomorrow's plan generation
```

---

## 📁 Directory Map

```
70-Agents/
├── 00_Orchestrator.md          # Master coordinator
├── FinanceAgent.md              # Financial tracking
├── LearningAgent.md             # Skill development
├── FocusAgent.md                # Mental clarity
├── MoodAgent.md                 # Wellbeing monitoring
├── SchedulerAgent.md            # Daily planning
├── logs/                        # Daily execution logs
│   ├── README.md
│   ├── Orchestrator_<date>.md
│   ├── FinanceAgent_<date>.md
│   ├── LearningAgent_<date>.md
│   ├── FocusAgent_<date>.md
│   ├── MoodAgent_<date>.md
│   └── SchedulerAgent_<date>.md
└── README.md                    # This file
```

---

## 🔄 Data Flow

```
Morning:
Journal → MoodAgent → Energy Baseline
         ↓
   FocusAgent → Puzzle
         ↓
Tech Roadmap → LearningAgent → Daily Topic

Evening:
Finance PDFs → FinanceAgent → Spending Insights
         ↓
Journal → MoodAgent → Reflection
         ↓
All Logs → SchedulerAgent → Tomorrow's Plan
```

---
## 🎛️ Configuration
```json
{
  "name": "AgentName",
  "objective": "What it does",
  "inputs": ["Folders it reads"],
  "outputs": ["Files it creates"],
  "behavior": {
    "key_feature_1": true,
    "key_feature_2": true
  },
  "trigger": "when_it_runs",
  "example_output": ["Sample results"]
}
```


### Agent Behavior (Minimal JSON Format)
Each agent file contains:
### Customization
Edit agent `.md` files to:
- Adjust trigger times
- Modify alert thresholds
- Change output formats
- Enable/disable features

## ## 🚀 Getting Started
### Phase 1 (Current) - Obsidian Foundation
- ✅ All agents created
- ✅ Directory structure set up
- ✅ MindPuzzles system active
- 🔄 Manual trigger (run agents on demand)
- 🔄 Manual journal entries

### Phase 2 (Coming Soon) - Automation
- [ ] LangGraph integration for auto-execution
- [ ] Auto-read from Journal entries
- [ ] Auto-parse Finance PDFs
- [ ] Obsidian Git Plugin for auto-backup
- [ ] Notion sync for task management

### Phase 3 (Future) - Full Automation
- [ ] Apple Watch integration
- [ ] Google Calendar auto-blocking
- [ ] Slack notifications
- [ ] Voice command activation

## 📖 How to Use Daily

### Morning (6:30-8:00 AM)
1. Check `00-Inbox/TomorrowsPlan_<today>.md`
2. Complete morning puzzle from FocusAgent
3. Review LearningAgent's daily topic
4. Log morning energy in journal

### During Day (Work Hours)
1. Follow SchedulerAgent's priority queue
2. Log work progress in `30-OfficeJournal/`
3. Note distractions for FocusAgent

### Evening (8:00-10:30 PM)
1. Log daily expenses in journal
2. Complete FocusAgent's evening puzzle
3. Write reflection in journal
4. Review SchedulerAgent's Tomorrow Plan

## 🔍 Monitoring Agent Health

Check these regularly:
- Are logs being generated daily?
- Are insights actionable?
- Are recommendations followed?
- Is the system reducing friction?

**Feedback Loop**: Update agent behaviors based on what works.

## 📈 Success Metrics

Track monthly:
- [ ] Budget adherence improved
- [ ] Learning consistency (daily challenges completed)
- [ ] Focus time increased
- [ ] Energy patterns optimized
- [ ] Task completion rate higher

---

## 🔗 Integration Points

**Current**:
- 20-Journal/ → All agents read
- 50-Finance/ → FinanceAgent
- 40-Learning/ → LearningAgent
- 80-MindPuzzles/ → FocusAgent
- 60-Habits_Trackers/ → MoodAgent

**Future**:
- Notion → Task sync
- Google Calendar → Auto time-blocking
- Apple Watch → Health data
- Jira → Work tracking
- GitHub → Code commits analysis

---

## 📝 Development Roadmap

**Week 1-2**: System stabilization
- Test all agents
- Refine triggers
- Adjust outputs

**Week 3-4**: Automation layer
- LangGraph integration
- Auto-execution setup
- Backup automation

**Month 2**: External integrations
- Notion sync
- Calendar integration
- Advanced analytics

---

**Last Updated**: 2025-11-08  
**Maintained By**: Aryamann + AI Agent System  
**Questions?**: Review agent `.md` files or check logs for details
## 🛠️ Troubleshooting

**Agent not generating logs?**
→ Check trigger times and input data availability

**Recommendations not relevant?**
→ Adjust agent behavior settings in `.md` files

**Too many alerts?**
→ Modify alert thresholds in agent configs

**Missing data?**
→ Ensure journal entries and source files are updated
## 📊 Agent Outputs

Each agent creates:
1. **Daily Log** in `logs/` directory
   - Execution summary
   - Analysis results
   - Actionable insights
   - Alerts/warnings

2. **Integration Outputs**
   - FinanceAgent → Updates 50-Finance/
   - LearningAgent → Creates 40-Learning/DailyChallenges/
   - FocusAgent → Generates 80-MindPuzzles/
   - MoodAgent → Updates 60-Habits_Trackers/
   - SchedulerAgent → Creates 00-Inbox/TomorrowsPlan_<date>.md