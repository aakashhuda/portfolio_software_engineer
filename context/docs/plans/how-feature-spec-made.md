# Create the feature spec file

Determine a short, kebab-case feature name derived from the idea file's H1 for the feature's filename (e.g. `user-notifications-spec.md`). Create the file `@context/features/{feature-name}-spec.md`

Fill out **exactly** this structure — do not add, remove, or rename sections. The purpose is to create and understand the whole feature to develop.

```markdown
# Feature Name

## Overview

2-4 sentences: what this feature is, why it's being built (the problem/value from
the idea), and the high-level approach given this project's stack and patterns.

## Requirements

- Concrete, testable requirements derived from the idea. Break multi-part ideas into
  separate bullets. Where the idea is vague on a point, make a reasonable
  implementation decision given the project's existing patterns and note it as such
  rather than leaving it open-ended.
- Include both functional requirements and any implementation-relevant specifics you
  inferred from the codebase (e.g. "extends the existing `NotificationService`
  pattern in `@app/services/`").

## Note

- Open questions, assumptions made while filling gaps in the idea, edge cases worth
  flagging, or scope explicitly excluded. Keep this to genuinely useful caveats, not
  filler.

## References

- Paths to existing files/modules in this repo that are relevant precedent or will be
  touched, and any other(external/internal) reference material (stack element's documentation eg. tailwind). Omit external links unless the idea or repo already pointed to them.
- Include the plan file for this feature
```

Keep it tight — a spec should be scannable in under four-five minutes. Prefer concrete
detail over padding; an empty or thin section is fine if there's genuinely nothing
to say, but don't pad `Note` or `Reference` just to fill space.

Please make the file in such a way so that the whole phase can be seen as a feature
