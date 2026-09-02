# Taste
- Prefers the agent to learn about the application and its context docs (project overview, architecture, conventions) before starting any work. Confidence: 0.9
- Prefers a phased development workflow: work is planned as ordered phases, each with a goal, tasks, and a verifiable "done when" checklist, documented in a `phases.md` file. Confidence: 0.8
- Likes self-contained, copy-paste-ready prompts embedded in project documentation that can be handed directly to an AI agent to execute a phase of work. Confidence: 0.7
- Prefers project phase docs to state setup/installation steps explicitly (e.g., naming the actual install command) rather than implying them with vague wording like "initialize the project." Confidence: 0.6
- Prefers plain JavaScript only — no TypeScript. Explicitly stated "No typescript please. Only Javascript"; expects scaffolds, config files (e.g., `content.config.js`), and generated code to avoid `.ts` files and TS-specific setup (no `tsconfig.json`, no strict-TypeScript prompt). Confidence: 0.9
- Prefers using the `/impeccable` skill (and its playbooks) for UI polish and animation work when the task warrants it, but is also fine with the agent proceeding directly for simpler changes ("If needed use /impeccable. Else do it yourself"). Confidence: 0.85
- Does not want a `Co-authored-by` trailer (e.g., `Co-authored-by: CommandCodeBot`) in git commit messages; explicitly asked to remove it from a commit and re-confirmed this on a later commit. Confidence: 0.95
- Does not want any modules or packages used that are not already locally available — prefers working only with installed/available tools (e.g., curl) over installing anything new, whether for testing or otherwise. Confidence: 0.9
