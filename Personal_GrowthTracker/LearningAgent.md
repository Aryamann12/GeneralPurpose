# LearningAgent

```json
{
  "name": "LearningAgent",
  "objective": "Accelerate skill acquisition across LangGraph, FastAPI, SDK, NodeJS, and System Design.",
  "version": "1.0",
  "inputs": [
    "40-Learning/",
    "Technologies_Learning_Schemas.md",
    "TECH_STACK.md",
    "10-Projects/",
    "30-OfficeJournal/"
  ],
  "outputs": [
    "70-Agents/logs/LearningAgent_<date>.md",
    "40-Learning/DailyChallenges/<date>_challenge.md"
  ],
  "behavior": {
    "recommend_next_topic": true,
    "generate_micro_challenges": true,
    "track_retention": true,
    "prioritize_based_on_time": true,
    "align_with_projects": true,
    "spaced_repetition": true
  },
  "trigger": "morning",
  "trigger_time": "08:00",
  "learning_tracks": {
    "backend": ["FastAPI", "LangGraph", "System Design", "SDK Development"],
    "frontend": ["React", "NodeJS", "TypeScript"],
    "ai_ml": ["LangChain", "Agents", "RAG Systems"],
    "infrastructure": ["Docker", "AWS", "CI/CD"]
  },
  "time_blocks": {
    "deep_sprint": "08:00-11:00 (3 hrs)",
    "project_application": "11:30-20:00 (work hours)",
    "review_retention": "21:00-22:00 (1 hr)"
  },
  "example_output": [
    "Today's Focus: FastAPI auth layer with JWT tokens",
    "Micro Challenge: Build a simple API route returning 'Hello AI World'",
    "Project Link: Apply JWT to Billing Dashboard login endpoint",
    "Retention Check: Review yesterday's LangGraph node patterns",
    "Tomorrow Prep: Learn LangGraph conditional edges and routing"
  ],
  "difficulty_progression": {
    "beginner": "Build hello world endpoint",
    "intermediate": "Add authentication middleware",
    "advanced": "Design multi-tenant auth system",
    "expert": "Implement distributed auth with caching"
  },
  "retention_strategy": {
    "day_1": "Learn new concept",
    "day_3": "Quick recall quiz",
    "day_7": "Apply to real project",
    "day_14": "Teach/document for others",
    "day_30": "Build something from scratch"
  }
}
```

## How LearningAgent Works

### Morning Execution (8:00 AM)
1. Reviews current tech stack progress
2. Checks active projects for skill gaps
3. Generates today's learning focus
4. Creates micro-challenge (15-30 min)
5. Plans project application opportunity

### Output Format
Creates `70-Agents/logs/LearningAgent_2025-11-08.md` with:
- Today's primary topic
- Micro-challenge with solution skeleton
- Link to active project where it applies
- Retention check from previous topics
- Tomorrow's prep reading

### Integration Points
- **Reads from**: Project requirements, tech roadmap
- **Syncs with**: WorkAgent (apply learning at office)
- **Feeds into**: SchedulerAgent for time blocking
