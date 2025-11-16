# Project Portfolio – Business-Level Overview

This workspace contains three main pieces of work that all revolve around developer productivity, learning, and data‑driven apps.

## 1. ConnectNest (Full‑Stack CRUD Demo)
- **Purpose**: A full‑stack demo application that shows how a modern frontend (Vite + vanilla JS UI) talks to a NestJS backend API and MongoDB database.
- **Core value**: Acts as a reference implementation for building, testing, and securing CRUD APIs (items, tools) end‑to‑end, including environment setup and security hardening.
- **Key capabilities**:
  - Simple “Items” inventory: create, read, update, delete items with name/description.
  - “Tools” management API for seeding and clearing demo tools in bulk.
  - Live request logging in the backend so users can see how the UI interacts with the API.
- **Architecture**:
  - `ConnectNest/server`: NestJS REST API, MongoDB integration, items & tools modules.
  - `ConnectNest/client`: Vite‑based UI that calls the API, with a dashboard‑style CRUD experience and JSON/field‑based request modes.
- **Intended usage**:
  - Training/education for junior engineers on REST, MongoDB, and environment variables.
  - Internal demo for showing API patterns, error handling, and basic security conversations.

## 2. cpp-problems-nest (Coding Problems Notebook Web App)
- **Purpose**: A Next.js web app that acts as a personal “coding problems memo deck” where users can store, browse, and manage algorithm problems.
- **Core value**: Helps engineers systematically prepare for interviews and practice problem‑solving by organizing problems, solutions, notes, and visual aids in one place.
- **Key capabilities**:
  - Add, edit, and delete problems with metadata (title, category, difficulty, notes, code, optional image).
  - Filter and search by category and title; view details in rich modals.
  - Data is stored in browser `localStorage`, so each user keeps their own personal deck without needing a backend.
- **Architecture**:
  - Built on Next.js 16 with a modern component library and Tailwind‑style design system (`components/ui`).
  - Core domain types live in `cpp-problems-nest/lib/types.ts`; stateful UI logic in `app/page.tsx`.
- **Intended usage**:
  - Personal productivity tool for tracking LeetCode/DSA progress.
  - Can be extended into a team knowledge base or interview prep portal.

## 3. Gemini-Powered-design.jsx (Standalone Advanced UI Variant)
- **Purpose**: A single‑file React application that provides a richer, more futuristic version of the “coding memo decks” experience.
- **Core value**: Serves as a design and interaction prototype, showcasing an upgraded UX (categories, solved tracking, images, cyberpunk styling) that could be plugged into a larger app.
- **Key capabilities**:
  - Group problems by category with collapsible sections, solved/unsolved tracking, and detailed problem modals.
  - Enhanced form experience for adding/editing problems, including image upload and code snippets.
  - Persists data in `localStorage` under a dedicated key (`coding-memo-decks`).
- **Intended usage**:
  - Design reference when evolving the Next.js app or similar tools.
  - Drop‑in React component for a “coding problems” feature inside another product.

## How These Pieces Fit Together
- The **ConnectNest** project demonstrates full‑stack CRUD and environment/security practices.
- The **cpp-problems-nest** app focuses on **front‑end experience and developer learning workflows** (tracking coding practice).
- **Gemini-Powered-design.jsx** is an experimental, higher‑fidelity UI for the same “coding memo deck” problem space and can inform future iterations of the Next.js app or other learning tools.

