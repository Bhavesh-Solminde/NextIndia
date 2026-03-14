## 🤖 Antigravity IDE: Agent Architecture

This repository is strictly configured for the Google Antigravity IDE agent engine. We do not use conversational prompts for project standards; instead, we rely on a deterministic, file-based architecture divided into **Rules**, **Skills**, and **Workflows**.

### 1. Rules (`.agents/rules/`) = The Laws
- **Status:** Always ON. Passive and invisible.
- **Who triggers it:** Nobody. The agent engine permanently injects these into its system prompt. It reads them before it types a single line of code, every single time.
- **Purpose:** To restrict behavior, enforce architectural decisions, and maintain global standards across the entire project.
- **Example:** A file stating, "Never use `var`. Always use strict TypeScript. Never write raw SQL; always use the ORM." If you want the agent to stop doing something stupid globally, you write a Rule.

### 2. Skills (`.agents/skills/`) = The Tools
- **Status:** On-Demand.
- **Who triggers it:** The Agent. It reads your prompts, looks at its toolbox (your skills), and decides if it needs to pull one out based on the YAML description you wrote.
- **Purpose:** To teach the agent *how* to execute a highly specific, complex task that it shouldn't be thinking about 24/7. It is a localized playbook, often paired with an executable script.
- **Example:** A `database-migration` skill. The agent doesn't need to know how to migrate a database when it's writing a CSS button. But when you tell it to "update the schema," it grabs that skill, reads the exact steps to run your migration scripts, executes them, and puts the skill away.

### 3. Workflows (`.agents/workflows/`) = The Macros
- **Status:** Manual.
- **Who triggers it:** YOU. You invoke it explicitly, usually via a slash command in the chat (e.g., `/scaffold-route`).
- **Purpose:** To automate your own repetitive tasks. It is essentially a saved, multi-step prompt that forces the agent through a predefined pipeline.
- **Example:** A `scaffold-api` workflow. Instead of typing "Please build a controller, then write the unit tests, then update the API docs" every time you need a new endpoint, you trigger the workflow, and it executes that exact sequence perfectly.

---

### Architecture Quick Reference

| Feature | What is it? | Who triggers it? | When is it active? |
| :--- | :--- | :--- | :--- |
| **Rules** | Global constraints & standards | Automatic | 100% of the time |
| **Skills** | Specialized abilities & scripts | The Agent | Only when semantically relevant |
| **Workflows**| Multi-step automated sequences | YOU | Only via explicit slash command |