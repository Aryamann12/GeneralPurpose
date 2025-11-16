# FocusAgent

```json
{
  "name": "FocusAgent",
  "objective": "Enhance mental clarity through structured focus and daily puzzles.",
  "version": "1.0",
  "inputs": [
    "80-MindPuzzles/",
    "20-Journal/",
    "60-Habits_Trackers/"
  ],
  "outputs": [
    "70-Agents/logs/FocusAgent_<date>.md",
    "80-MindPuzzles/<date>_Morning.md",
    "80-MindPuzzles/<date>_Evening.md"
  ],
  "behavior": {
    "inject_morning_puzzle": true,
    "track_distraction_triggers": true,
    "propose_evening_recovery_task": true,
    "calibrate_difficulty": true,
    "measure_completion_time": true,
    "identify_peak_focus_windows": true
  },
  "trigger": "morning_and_evening",
  "trigger_times": ["07:30", "22:00"],
  "puzzle_categories": {
    "logic": "Sequence patterns, deductive reasoning",
    "pattern_recognition": "Visual/numerical patterns",
    "data_thinking": "Algorithm optimization, data structures",
    "lateral_thinking": "Creative problem-solving",
    "memory": "Retention and recall exercises"
  },
  "difficulty_levels": {
    "level_1": "5 min warmup",
    "level_2": "10 min standard",
    "level_3": "15 min challenging",
    "level_4": "20 min expert"
  },
  "example_output": [
    "Morning Puzzle: Logical sequence (Level 2)",
    "Find the next number: 2, 6, 12, 20, 30, ?",
    "Estimated time: 10 minutes",
    "Category: Pattern Recognition",
    "Evening Reset: Reflect 5 mins on what caused distraction today",
    "Focus Peak: Detected 9-11 AM (98% concentration)",
    "Distraction Trigger: Slack notifications at 3 PM"
  ],
  "distraction_tracking": {
    "common_triggers": ["Phone notifications", "Slack", "Email", "Colleagues", "Low energy"],
    "recovery_actions": ["5-min walk", "Hydration", "Desk stretch", "Music change", "Task switch"]
  },
  "focus_metrics": {
    "track_deep_work_minutes": true,
    "identify_flow_state_entries": true,
    "measure_context_switching": true,
    "calculate_productivity_score": true
  }
}
```

## How FocusAgent Works

### Morning Execution (7:30 AM)
1. Generates cognitive puzzle matching current difficulty
2. Estimates completion time
3. Logs puzzle in `80-MindPuzzles/2025-11-08_Morning.md`
4. Sets mental baseline for the day

### Evening Execution (10:00 PM)
1. Reviews distraction patterns from journal
2. Provides lighter wind-down puzzle
3. Suggests tomorrow's focus improvements
4. Logs in `80-MindPuzzles/2025-11-08_Evening.md`

### Output Format
Creates `70-Agents/logs/FocusAgent_2025-11-08.md` with:
- Morning puzzle + solution (revealed next day)
- Focus time analysis
- Distraction log
- Peak productivity windows
- Evening recovery task

### Puzzle Progression
- **Week 1**: Level 1-2 (build baseline)
- **Week 2-4**: Level 2-3 (challenge zone)
- **Month 2+**: Adaptive difficulty based on completion rate

### Integration Points
- **Reads from**: Journal mood, energy levels
- **Syncs with**: MoodAgent (fatigue impacts difficulty)
- **Feeds into**: SchedulerAgent (optimal work windows)
