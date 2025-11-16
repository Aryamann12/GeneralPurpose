# SchedulerAgent

```json
{
  "name": "SchedulerAgent",
  "objective": "Orchestrate all agents daily; generate task queue and sync with Notion/Apple Watch (Phase 2).",
  "version": "1.0",
  "inputs": [
    "70-Agents/logs/",
    "20-Journal/",
    "10-Projects/",
    "30-OfficeJournal/",
    "40-Learning/",
    "60-Habits_Trackers/"
  ],
  "outputs": [
    "70-Agents/logs/SchedulerAgent_<date>.md",
    "00-Inbox/TomorrowsPlan_<date>.md"
  ],
  "behavior": {
    "read_all_agent_logs": true,
    "generate_daily_action_plan": true,
    "prioritize_tasks_by_energy_window": true,
    "mark_carry_forwards": true,
    "detect_deadline_conflicts": true,
    "optimize_deep_work_blocks": true,
    "sync_with_external_calendars": false
  },
  "trigger": "morning_and_evening",
  "trigger_times": ["06:30", "22:30"],
  "time_blocks": {
    "06:30-07:30": "Morning Kickstart (Gym + Reflection)",
    "07:30-08:00": "Cognitive Puzzle + Breakfast",
    "08:00-11:00": "Deep Learning Sprint (Peak Energy)",
    "11:30-20:00": "Office Block (Work Projects)",
    "20:00-21:00": "Commute + Audio Learning",
    "21:00-22:00": "Daily Review (Finance + Journal)",
    "22:00-22:30": "Wind Down Puzzle",
    "22:30-23:00": "Tomorrow's Planning + Sleep Prep"
  },
  "example_output": [
    "=== Tomorrow's Plan: 2025-11-09 ===",
    "",
    "Morning Block (8:00-11:00):",
    "  • FastAPI Micro Challenge: JWT implementation (LearningAgent)",
    "  • Expected completion: 90 min",
    "",
    "Office Block (11:30-20:00):",
    "  • Billing Dashboard: Complete invoice filtering logic",
    "  • Deadline: Nov 15 (6 days remaining)",
    "  • Priority: HIGH",
    "",
    "Evening Block (20:00-22:00):",
    "  • Finance review: Analyze weekly spending pattern (FinanceAgent)",
    "  • Gym reflection: Energy assessment (MoodAgent)",
    "  • Tara Sutaria mindset audio (InspirationAgent)",
    "",
    "Carry Forwards from Today:",
    "  • LangGraph conditional edges (move to Nov 10)",
    "",
    "Energy Optimization:",
    "  • Peak window: 9-11 AM → Use for hardest task",
    "  • Expected dip: 2-4 PM → Schedule routine work",
    "  • Recovery: 15-min walk at 2 PM"
  ],
  "priority_matrix": {
    "urgent_important": "Do first (9-11 AM peak energy)",
    "important_not_urgent": "Schedule in deep work blocks",
    "urgent_not_important": "Delegate or batch process",
    "neither": "Eliminate or defer"
  },
  "carry_forward_rules": {
    "max_carry_forwards": 3,
    "auto_reschedule_if": "low_energy OR deadline_conflict",
    "escalate_after_days": 3
  },
  "integration_targets": {
    "phase_1": "Obsidian-only (current)",
    "phase_2": "Sync with Notion databases",
    "phase_3": "Apple Watch reminders",
    "phase_4": "Auto-block Google Calendar"
  }
}
```

## How SchedulerAgent Works

### Morning Execution (6:30 AM)
1. Reads yesterday's performance from all agent logs
2. Checks today's deadlines and priorities
3. Initializes daily workflow
4. Triggers other agents in sequence
5. Creates `00-Inbox/TomorrowsPlan_<today>.md`

### Evening Execution (10:30 PM)
1. Compiles all agent outputs:
   - FinanceAgent: Daily spending summary
   - LearningAgent: Topic progress
   - FocusAgent: Distraction patterns
   - MoodAgent: Energy trends
2. Generates Tomorrow's Action Plan
3. Identifies carry-forwards
4. Optimizes time blocks based on energy
5. Creates `00-Inbox/TomorrowsPlan_<tomorrow>.md`

### Output Format
Creates `70-Agents/logs/SchedulerAgent_2025-11-08.md` with:
- Agent execution log
- Task completion status
- Priority adjustments
- Energy-optimized schedule
- Deadline warnings

### Daily Brief Structure
`00-Inbox/TomorrowsPlan_2025-11-09.md`:
```
# Tomorrow's Plan - Friday, Nov 09, 2025

## Morning Focus (Peak Energy 9-11 AM)
- [ ] FastAPI JWT auth challenge
- [ ] Continue LangGraph study

## Office Priority (11:30-8:00 PM)
- [ ] Billing Dashboard: Invoice filters (DEADLINE: Nov 15)

## Evening Reflection (8:00-10:30 PM)
- [ ] Finance review
- [ ] Gym + mood log
- [ ] Wind-down puzzle

## Carry Forwards (Max 3)
- [ ] LangGraph conditional edges

## Energy Optimization
- Peak: 9-11 AM → Hardest task first
- Dip: 2-4 PM → Routine work only
- Recovery: Walk at 2 PM
```

### Integration Points
- **Reads from**: All agent logs, project deadlines
- **Coordinates**: Agent execution sequence
- **Generates**: Daily action plan
- **Future**: Sync with Notion, Apple Watch, Google Calendar
