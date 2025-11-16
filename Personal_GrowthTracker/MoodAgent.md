# MoodAgent

```json
{
  "name": "MoodAgent",
  "objective": "Observe user's emotional trends and link them to productivity and environment.",
  "version": "1.0",
  "inputs": [
    "20-Journal/",
    "60-Habits_Trackers/",
    "GeminiPersonal_Habits_Maker.md",
    "30-OfficeJournal/",
    "10-Projects/"
  ],
  "outputs": [
    "70-Agents/logs/MoodAgent_<date>.md",
    "60-Habits_Trackers/MoodTrends_<week>.md"
  ],
  "behavior": {
    "detect_peak_energy_hours": true,
    "flag_negative_mood_loops": true,
    "suggest_recovery_actions": true,
    "track_sleep_quality_correlation": true,
    "identify_stress_sources": true,
    "celebrate_wins": true
  },
  "trigger": "morning_midday_evening",
  "trigger_times": ["06:45", "12:00", "21:00"],
  "energy_scale": {
    "1-3": "Low energy - suggest rest/recovery",
    "4-6": "Moderate - standard tasks",
    "7-8": "High - deep work ideal",
    "9-10": "Peak - tackle hardest challenges"
  },
  "mood_categories": {
    "motivated": "High drive, clear goals",
    "focused": "Deep work mode",
    "distracted": "Fragmented attention",
    "stressed": "Overwhelmed, anxious",
    "reflective": "Thoughtful, introspective",
    "creative": "Idea generation mode",
    "fatigued": "Low energy, need rest"
  },
  "example_output": [
    "Morning Check (6:45 AM): Energy 8/10 - Slept well, gym energized",
    "Midday Check (12:00 PM): Energy 6/10 - Office chatter fatigue",
    "Evening Check (9:00 PM): Energy 5/10 - Productive day, mentally tired",
    "Peak Energy Window: 9:00-11:00 AM",
    "Dip Detected: 2:00-4:00 PM (common pattern)",
    "Recovery Suggestion: Brief walk + hydration at 2 PM",
    "Stress Source: Billing Dashboard deadline pressure",
    "Win Today: Completed FastAPI auth challenge"
  ],
  "correlation_tracking": {
    "sleep_vs_energy": "7+ hrs sleep → 8+ energy",
    "gym_vs_mood": "Morning gym → +2 motivation",
    "office_environment_vs_stress": "Open office → distraction spike",
    "learning_time_vs_satisfaction": "2+ hrs learning → high satisfaction"
  },
  "recovery_actions": {
    "low_energy": ["15-min power nap", "Protein snack", "Fresh air walk"],
    "stressed": ["5-min breathing", "Task breakdown", "Talk to someone"],
    "distracted": ["Pomodoro reset", "Change environment", "Noise-cancelling music"],
    "fatigued": ["Early sleep tonight", "Skip evening puzzle", "Light stretching"]
  },
  "weekly_report": {
    "average_morning_energy": "calculated",
    "most_productive_days": "identified",
    "stress_peak_times": "flagged",
    "recovery_effectiveness": "measured"
  }
}
```

## How MoodAgent Works

### Morning Check (6:45 AM)
1. Reads last night's journal entry
2. Checks sleep duration/quality
3. Sets energy baseline for the day
4. Predicts peak productivity window

### Midday Check (12:00 PM)
1. Monitors energy dip patterns
2. Suggests recovery if needed
3. Flags stress triggers from work

### Evening Check (9:00 PM)
1. Reviews day's emotional journey
2. Identifies wins to celebrate
3. Analyzes stress sources
4. Recommends tomorrow's energy optimization

### Output Format
Creates `70-Agents/logs/MoodAgent_2025-11-08.md` with:
- Three daily energy checks
- Peak/dip windows
- Mood correlations (sleep, gym, work)
- Recovery suggestions
- Wins & stress sources

### Weekly Trends
Every Sunday, generates `60-Habits_Trackers/MoodTrends_Week45.md`:
- Average energy patterns
- Best productivity days
- Common stress triggers
- Successful recovery strategies

### Integration Points
- **Reads from**: Journal entries, gym logs, project updates
- **Syncs with**: FocusAgent (adjust puzzle difficulty)
- **Alerts**: SchedulerAgent (reschedule if low energy)
- **Feeds into**: LearningAgent (optimal learning times)
