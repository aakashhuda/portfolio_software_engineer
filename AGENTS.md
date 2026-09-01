## Docs — read these, in this order, before starting new work

1. `@context/project-overview.md` — business context, domain vocabulary, scope
2. `@context/architecture.md` — tech stack, data model, API contracts, directory layout
3. `@context/coding-standards.md` — conventions, error handling, security rules
4. `@context/phases.md` — the sequential build plan; work happens one phase at a time
5. `@context/git-conventions.md` — branching/commit conventions tied to phases
6. `@context/ai-interaction.md` — how the agent should communicate
7. `@context/references/` — UI

## Working through phases

Development follows `phases.md`, one phase at a time, in order. Before
starting a phase:

- Branch off an up-to-date `main`: `phase-N-short-description`
- Confirm the previous phase's "done when" checklist actually passed

Before merging a phase:

- Recheck the current phase's "done when" checklist in `phases.md`
- Commit messages tagged `[phase-N] ...` per `git-conventions.md`
- Tag the merge commit on `main` as `phase-N-complete`

Don't jump ahead to a later phase's work while an earlier phase is still in progress — later phases
assume earlier ones are already solid in mock mode.

## Non-negotiables (security)

- Never commit `.env` or real credentials. Commit `.env.example` with
  placeholder values only.

## Common commands

```bash
npm run dev             # local dev, mock mode by default
npm run build            # production build (needed before VPS deploy)
npm run preview          # preview the production build locally
```

## When in doubt

Prefer asking a clarifying question over guessing on anything that touches
the five business rules above, secrets handling, or which phase a piece of
work belongs in. Everything else — implementation details within a
phase's scope — is fair game to proceed on using best judgment per
`coding-standards.md`.
