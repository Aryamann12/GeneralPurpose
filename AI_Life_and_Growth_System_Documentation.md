# AI-Facing Documentation: Life & Growth Systems

**Scope**: This document explains two related knowledge systems so that any AI model can safely read, reason over, and extend them:
- `Aryamann_LifeTracker/`
- `Personal_GrowthTracker/`

The goal is to make these folders **machine-usable** while preserving their original human intent.

---

## 1. High-Level Conceptual Model

- **Owner**: Aryamann (location: Hyderabad, India).
- **LifeTracker** (`Aryamann_LifeTracker/`): Static and semi-structured knowledge about devices, daily routine, wardrobe, gym progress, entertainment, and learning resources.
- **GrowthTracker** (`Personal_GrowthTracker/`): Specification of an AI agent ecosystem that operates on life data (journals, finance, learning, mood, focus) and writes daily logs and plans.
- **Relationship**:
  - LifeTracker describes *what the life looks like* (routines, assets, resources, wardrobe, physical progress).
  - GrowthTracker describes *how AI agents should act* on broader life data to improve productivity, learning, finance, focus, and wellbeing.

AI models should treat these as:
- A **knowledge base** (LifeTracker) and
- An **agent orchestration spec** (GrowthTracker).

---

## 2. Directory-Level Overview

### 2.1 `Aryamann_LifeTracker/` (Life Knowledge Base)

**Intent**: Curated personal knowledge hub to support AI-assisted life tracking and planning.

Key files/directories:
- `Aryamann-Devices.md` — Inventory of personal/office devices and TV connectivity.
- `LifeTracker_925AM_Nov15.md` — Daily routine specification (time blocks, activities, reflection prompts).
- `CEO/companies&CEOs.md` — Placeholder for company/CEO tracking (currently empty).
- `Entertainment/` — Leisure options.
  - `Games.md` — Physical game options (e.g., badminton, table tennis).
  - `Mobility.md` — (Not inspected; likely transport/commute-related entertainment or mobility context).
  - `MusicInstrument.md` — (Not inspected; likely music practice context).
  - `SocialPlatforms.md` — (Not inspected; likely social media accounts/platforms).
  - `SteamingApps_Music_Video.md` — Streaming services available.
- `Gym/Progress.json` — Structured gym progress data (JSON).
- `Research/newPapers.md` — (Not inspected; intended to track research papers and ideas).
- `Resources/` — Learning resources and course progress.
  - `10xiitan/courses.md` — JSON-like progress structure for GFG courses (Tech Foundations, Full Stack MERN).
  - `Books/Ai-Books.md` — AI and ML book inventory.
  - `Books/NonFictionBooks.md`, `Books/Religious.md` — (Not inspected; other reading lists).
  - `CodingNinjas/*.md` — Placeholders for coding courses.
  - `TLE_Eliminators/LvL3/LvL3_Course_Syllabus.md` — Syllabus notes.
  - `TLE_Eliminators/LvL4/questions.md` — Access constraints note.
  - `Udemy/UnlimitedAccesstoAllCoursespresent.md` — Note about wide Udemy access.
- `Resources-Guide.md` — Meta note about the difference between completing courses and real-life application.
- `Wardrobe/schema-instructions.md` — JSON schema + partial inventory for wardrobe.

### 2.2 `Personal_GrowthTracker/` (AI Agent System)

**Intent**: Define a multi-agent AI “operating system” that runs on user data and produces structured daily outputs.

Key files:
- `README.md` — Master documentation for the AI agent system.
- `FinanceAgent.md` — JSON configuration + narrative description of the FinanceAgent.
- `LearningAgent.md` — JSON configuration + narrative description of the LearningAgent.
- `FocusAgent.md` — JSON configuration + narrative description of the FocusAgent.
- `MoodAgent.md` — JSON configuration + narrative description of the MoodAgent.
- `SchedulerAgent.md` — JSON configuration + narrative description of the SchedulerAgent.
- `logs/00_Orchestrator.md` — Detailed spec for the OrchestratorAgent (timeline, dependencies, flows).
- `logs/README.md` — Log directory structure, format, and retention policy.
- `logs/FinanceAgent_2025-11-08.md` — Example daily log for FinanceAgent (structure implied by README).

---

## 3. Data Structures & Schemas

This section describes the main **machine-readable schemas** that are either explicit JSON or implied by markdown.

### 3.1 Gym Progress Schema (`Aryamann_LifeTracker/Gym/Progress.json`)

File: `Aryamann_LifeTracker/Gym/Progress.json`

Top-level JSON:
```json
{
  "gymProgress": [ /* GymSession */ ]
}
```

**GymSession object**:
```json
{
  "date": "string",          // e.g., "April 12th", "June 26th"
  "location": "string|null", // e.g., "Hyderabad", "Hamirpur", or null
  "push": [ /* ExerciseEntry */ ],
  "pull": [ /* ExerciseEntry */ ],
  "legs": [ /* ExerciseEntry */ ]
}
```

**ExerciseEntry object**:
```json
{
  "exercise": "string",   // e.g., "Inclined_Flat", "PeckDeck"
  "progress": "string",   // e.g., "x27.5kg", "~60", "x15kg x35kg"
  "sets": 3               // integer, typically 3
}
```

AI notes:
- `progress` is a **free-form string** mixing weight and reps. Do not assume a single numeric field.
- Exercises are grouped by training splits: `push`, `pull`, `legs`.
- `date` is natural language rather than ISO; normalize if you require strict date processing.

### 3.2 Wardrobe Schema (`Aryamann_LifeTracker/Wardrobe/schema-instructions.md`)

This file contains:
1. A **JSON schema** for wardrobe data.
2. A partial **natural-language inventory** of items.

Target JSON structure:
```json
{
  "wardrobe": {
    "owner": {
      "name": "Aryamann Tomar",
      "location": "Hyderabad, India"
    },
    "categories": {
      "pyjamas": [],
      "tshirts": [],
      "shirts": [],
      "pants": [],
      "shoes": [],
      "shorts": [],
      "workout_tshirts": []
    },
    "item_schema": {
      "type": "object",
      "required": ["id", "name", "color", "style", "material", "condition"],
      "properties": {
        "id": { "type": "string", "pattern": "^[A-Z]{1,2}[0-9]{3,}$" },
        "name": { "type": "string" },
        "color": { "type": "string" },
        "style": { "type": "string", "enum": ["casual", "formal", "semi_formal", "athletic", "lounge"] },
        "material": { "type": "string" },
        "condition": { "type": "string", "enum": ["new", "good", "worn", "needs_repair"] },
        "last_worn": { "type": ["string", "null"], "format": "date" },
        "wash_count": { "type": "integer", "minimum": 0, "default": 0 }
      }
    },
    "pairing_suggestions": {
      "rules": [],
      "outfits": []
    },
    "outfit_schema": {
      "type": "object",
      "required": ["outfit_id", "items", "occasion"],
      "properties": {
        "outfit_id": { "type": "string", "pattern": "^O[0-9]{3,}$" },
        "items": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
        "occasion": { "type": "string" }
      }
    }
  }
}
```

AI notes:
- When ingesting new wardrobe data, conform to `item_schema` and `outfit_schema`.
- The natural-language section lists items (e.g., “Green Louis Philippe Full Sleeve CrewNeck Tee”). You can map these into objects using generated IDs and inferred attributes.
- `pairing_suggestions.rules` and `.outfits` are currently empty, intended for future AI-generated style rules.

### 3.3 Learning Resource Progress (`Aryamann_LifeTracker/Resources/10xiitan/courses.md`)

File is valid JSON with this top-level shape:
```json
{
  "GFG_Progress": {
    "Tech_Foundations": [ /* ModuleProgress */ ],
    "Full_Stack_MERN": [ /* ModuleProgress */ ],
    "Locked_Tracks": {
      "AI_ML": "string",
      "Competitive_Programming": "string"
    }
  }
}
```

**ModuleProgress object**:
```json
{
  "sr_no": 1,
  "module": "string",
  "total_hours": "string",        // e.g., "8+"
  "completed_percentage": 31,     // integer 0–100
  "status": "string"              // e.g., "🟦 In Progress"
}
```

AI notes:
- Emojis in `status` encode qualitative progress states (e.g., “Barely Started”, “Almost Done”).
- `Locked_Tracks` indicates dependency-locked learning tracks (e.g., AI_ML locked until foundations are done).

### 3.4 Daily Routine Specification (`Aryamann_LifeTracker/LifeTracker_925AM_Nov15.md`)

Content structure (markdown):
- Top-level: “Aryamann's Daily Routine”
- Time blocks:
  - Morning Block (6:30–10:20 AM)
  - Office Chronicle (11:30 AM – 8:10 PM)
  - Evening Block (8:45 PM – 11:30 PM)
- Each block is a markdown table with:
  - `StartTime` (string, backticked, e.g., `6:18AM`)
  - `EndTime` (string)
  - `TimeDuration` (string, e.g., `22min`, `1hr 30mins`)
  - `Activity` (string description; may embed backticked task names like `Gym`, `MorningRitual`).
- Additional section:
  - “System-Thinking Review” — reflection prompts about progress and improvement.
  - “Daily Improvement Log” — space for daily micro-optimizations.

AI notes:
- This file is intended as a **template** for daily execution, not a log.
- Use it as a baseline schedule when generating tasks, but treat it as modifiable based on agent outputs (e.g., SchedulerAgent recommendations).

### 3.5 Entertainment & Streaming (`Aryamann_LifeTracker/Entertainment/*`)

Representative patterns:
- `Games.md`:
  - Lists game types and notes on accessibility (e.g., “I can basically go anytime to play badminton”).
- `SteamingApps_Music_Video.md`:
  - Bullet list of available streaming services (Netflix, Prime, YouTube Premium, Jio Hotstar).

AI notes:
- These files are **capability inventories** for leisure planning. Use them when suggesting rest/reward activities or low-energy tasks.

---

## 4. AI Agent System (Personal_GrowthTracker)

### 4.1 Global Architecture

The system defines an AI **multi-agent architecture** operating over the user’s data. Main artifacts:

- `Personal_GrowthTracker/README.md` — High-level system overview (already AI-friendly).
- Individual agent files (`FinanceAgent.md`, `LearningAgent.md`, `FocusAgent.md`, `MoodAgent.md`, `SchedulerAgent.md`) — Each contains:
  - A **JSON configuration block** inside a fenced code block.
  - Human-readable instructions describing daily behavior.
- `logs/00_Orchestrator.md` — JSON spec and explanation for the OrchestratorAgent (master coordinator).
- `logs/README.md` — Log directory format and retention rules.

All agents follow a similar **schema pattern**:

```json
{
  "name": "AgentName",
  "objective": "What it does",
  "version": "1.0",
  "inputs": [ "Data folders or files" ],
  "outputs": [ "Log files or artifacts" ],
  "behavior": {
    "key_feature_1": true,
    "key_feature_2": true
  },
  "trigger": "time_of_day or event",
  "trigger_time": "HH:MM",           // when applicable
  "example_output": [ "Examples..." ]
}
```

AI notes:
- The JSON in these files is intended as a **machine-consumable configuration**, not just documentation.
- You may parse these blocks to construct actual agent nodes in a LangGraph / LangChain-style system.

### 4.2 Core Agents

Summaries (see each `*.md` file for full JSON):

1. **FinanceAgent** (`FinanceAgent.md`)
   - **Objective**: Track and optimize daily spending.
   - **Inputs**:
     - `50-Finance/` (financial data folder).
     - `20-Journal/` (journal entries).
     - `Aryamann_MasterSheet - MasterTable (1).pdf`.
     - `Aryamann_MasterSheet - Expenditures (1).pdf`.
   - **Outputs**:
     - `70-Agents/logs/FinanceAgent_<date>.md`
   - **Behavior flags**: `analyze_spending_patterns`, `highlight_penalty_fees`, `detect_unnecessary_expenses`, `give_actionable_budget_feedback`, `track_category_trends`, `predict_monthly_burn_rate`.
   - **Trigger**: `end_of_day`, `20:00`.
   - **Analysis categories**: Food & Groceries, Transportation, Penalty Fees, Entertainment & Lifestyle, Health & Gym, Miscellaneous.

2. **LearningAgent** (`LearningAgent.md`)
   - **Objective**: Accelerate skill acquisition (LangGraph, FastAPI, SDK, NodeJS, System Design, etc.).
   - **Inputs**:
     - `40-Learning/`, `Technologies_Learning_Schemas.md`, `TECH_STACK.md`, `10-Projects/`, `30-OfficeJournal/`.
   - **Outputs**:
     - `70-Agents/logs/LearningAgent_<date>.md`
     - `40-Learning/DailyChallenges/<date>_challenge.md`
   - **Behavior flags**: `recommend_next_topic`, `generate_micro_challenges`, `track_retention`, `prioritize_based_on_time`, `align_with_projects`, `spaced_repetition`.
   - **Learning tracks**: backend, frontend, ai_ml, infrastructure.
   - **Time blocks**: deep_sprint, project_application, review_retention.

3. **FocusAgent** (`FocusAgent.md`)
   - **Objective**: Enhance mental sharpness; inject cognitive puzzles; track distractions.
   - **Typical triggers**: Morning and evening times (e.g., 07:30, 22:00).
   - **Outputs**: Focus-related puzzle logs and recommendations in `70-Agents/logs/`.

4. **MoodAgent** (`MoodAgent.md`)
   - **Objective**: Monitor energy and mood; identify stress; suggest recovery.
   - **Triggers**: Multiple times per day (e.g., 06:45, 12:00, 21:00).
   - **Inputs**: Journal entries, gym logs, sleep data (intended).

5. **SchedulerAgent** (`SchedulerAgent.md`)
   - **Objective**: Compile insights from all agents into a prioritized action plan for the next day.
   - **Triggers**: 06:30, 22:30 (morning/evening planning).
   - **Inputs**: Other agents’ logs, journal, projects, habits trackers.
   - **Outputs**: Tomorrow’s Action Plan (e.g., `00-Inbox/DailyBrief_<date>.md` or related files).

### 4.3 OrchestratorAgent (Master Coordinator)

File: `logs/00_Orchestrator.md`

Defines:
- **Daily execution timeline** from early morning to night, including:
  - 06:30 — Orchestrator initializes.
  - 06:45 — MoodAgent morning check.
  - 07:30 — FocusAgent morning puzzle.
  - 08:00 — LearningAgent topic selection.
  - 12:00 — MoodAgent midday check.
  - 20:00 — FinanceAgent spending analysis.
  - 21:00 — MoodAgent evening reflection.
  - 22:00 — FocusAgent wind-down.
  - 22:30 — SchedulerAgent tomorrow-plan generation.
- **Inputs**:
  - `70-Agents/logs/`, `20-Journal/`, `10-Projects/`, `40-Learning/`, `50-Finance/`, `60-Habits_Trackers/`.
- **Outputs**:
  - `70-Agents/logs/Orchestrator_<date>.md`
  - `00-Inbox/DailyBrief_<date>.md`
- **Behavior**:
  - `coordinate_agent_execution`, `detect_scheduling_conflicts`, `prioritize_urgent_tasks`, `generate_daily_synthesis`, `track_cross_agent_dependencies`, `auto_adjust_based_on_mood`.
- **Data flows**:
  - `morning_flow`: MoodAgent → FocusAgent → LearningAgent.
  - `midday_flow`: MoodAgent → SchedulerAgent.
  - `evening_flow`: FinanceAgent → MoodAgent → FocusAgent → SchedulerAgent.

### 4.4 Logs Directory (`Personal_GrowthTracker/logs/`)

File: `logs/README.md`

Defines canonical log layout:
```text
logs/
├── Orchestrator_YYYY-MM-DD.md
├── FinanceAgent_YYYY-MM-DD.md
├── LearningAgent_YYYY-MM-DD.md
├── FocusAgent_YYYY-MM-DD.md
├── MoodAgent_YYYY-MM-DD.md
└── SchedulerAgent_YYYY-MM-DD.md
```

Each log includes:
- Execution time.
- Inputs processed.
- Outputs generated.
- Alerts/Warnings.
- Next steps.

Logs are:
- Human-readable (markdown).
- Machine-parseable (JSON blocks inside).
- Cross-referenced (links between agents).

Retention:
- Keep last 90 days.
- Older logs to `logs/archive/YYYY/MM/`.

---

## 5. How an AI Model Should Use These Folders

### 5.1 Inference-Time Usage Patterns

When acting as an AI assistant:

1. **Understand Context**
   - Read `Personal_GrowthTracker/README.md` to understand the agent ecosystem.
   - Use `Aryamann_LifeTracker/LifeTracker_*.md` to understand baseline daily routine.
   - Use devices, wardrobe, and entertainment files to understand capabilities and constraints.

2. **Ground Suggestions**
   - When suggesting workouts or health changes, consult `Gym/Progress.json` to align with actual capabilities and history.
   - When suggesting outfits or wardrobe optimization, follow the `Wardrobe` schema and existing items.
   - When proposing study plans, read `Resources/10xiitan/courses.md` and `Resources/Books/*` to consider current progress and available materials.

3. **Simulate Agents (If Implemented)**
   - Parse each agent’s JSON config in `Personal_GrowthTracker/*.md`.
   - Implement pseudo-agents that read their defined `inputs` and write synthetic `outputs` (log lines, recommendations) following `logs/README.md` structure.

4. **Maintain Structure**
   - When writing new files or logs, respect:
     - Naming conventions: `AgentName_YYYY-MM-DD.md`, `DailyBrief_<date>.md`, etc.
     - JSON schemas where provided (e.g., Gym, Wardrobe, GFG_Progress, agent configs).
     - Markdown structure (sections, bullet lists, tables).

### 5.2 Generation-Time Guidelines

If generating new content:

- **For LifeTracker**:
  - Gym progress: append new `GymSession` objects to `gymProgress` array, keeping consistent lifting notation.
  - Wardrobe: transform natural-language clothing descriptions into structured objects conforming to `item_schema`.
  - Resources: extend existing JSON or markdown lists instead of changing semantics of existing entries.

- **For GrowthTracker**:
  - Agent configs: keep JSON **valid and minimal**, only extend with fields that are clearly needed and documented.
  - Logs: include timestamps, inputs, outputs, and next steps in a consistent, parseable format.
  - New agents: follow the same config pattern and integrate with Orchestrator `data_flow` if relevant.

### 5.3 Safety & Integrity

- Do **not** delete or overwrite existing progress data (gym, learning, wardrobe, finances).
- When uncertain:
  - Prefer adding new entries over editing existing ones.
  - Add clarifying comments in markdown (not inside JSON objects) if you change behavior.
- Respect privacy: these folders are personal. Use them only for user-serving tasks (planning, reflection, optimization).

---

## 6. Quick Reference

- **LifeTracker root**: `Aryamann_LifeTracker/`
  - Devices: `Aryamann_LifeTracker/Aryamann-Devices.md`
  - Routine template: `Aryamann_LifeTracker/LifeTracker_*.md`
  - Gym data: `Aryamann_LifeTracker/Gym/Progress.json`
  - Wardrobe schema: `Aryamann_LifeTracker/Wardrobe/schema-instructions.md`
  - Learning resources: `Aryamann_LifeTracker/Resources/...`

- **GrowthTracker root**: `Personal_GrowthTracker/`
  - System overview: `Personal_GrowthTracker/README.md`
  - Agent configs: `Personal_GrowthTracker/*Agent.md`
  - Orchestrator spec: `Personal_GrowthTracker/logs/00_Orchestrator.md`
  - Logs format: `Personal_GrowthTracker/logs/README.md`

This document should be used as the **primary onboarding reference** for any AI model interacting with these two folders.

