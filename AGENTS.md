# AURA Development Guide

This document defines the working agreement for contributors and coding assistants working on AURA.

## Project context

AURA is a personal AI research and execution workspace. It is being developed incrementally as a real product, with emphasis on useful workflows, evidence, reliability, user control, and maintainable engineering.

The current architectural boundaries are documented in:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`

## Development workflow

Each development day should focus on one coherent, independently verifiable feature.

Before implementation:

1. Inspect the relevant files and existing behavior.
2. Identify the milestone and define the day’s scope.
3. Explain important architectural implications.

During implementation:

- Preserve existing behavior unless the task explicitly changes it.
- Prefer small modules with clear responsibilities.
- Avoid speculative infrastructure and unnecessary dependencies.
- Keep unfinished features visibly unfinished.
- Never expose secrets in source code, logs, or client-side bundles.

After implementation:

1. Run the relevant tests, type checks, linting, or build checks.
2. Record meaningful architectural changes in the appropriate documentation.
3. Report implemented work, verification results, limitations, and a suggested commit message.

## Git boundary

Do not commit, push, reset, or otherwise modify Git history unless the project owner explicitly requests it. Daily progress should be represented in suggested commit messages using this format:

```text
Day N: describe the completed feature
```

## Architecture rules

- The browser communicates with the backend through the API boundary.
- API routes should validate requests and delegate behavior to application services.
- Model providers, embedding providers, persistence, and external integrations belong behind adapters.
- Tool permissions must be enforced by application code, independently of model output.
- Documents, web pages, and tool results are untrusted input.
- Start with reliable single-agent behavior before considering multi-agent orchestration.
- Add background processing only for operations that genuinely need it.
- Introduce persisted entities when their corresponding feature is being built.

## Verification rules

Never claim that a test, build, type check, or lint check passed unless it actually ran. If an environment limitation prevents verification, describe the limitation clearly and validate everything that can be checked locally.

## Documentation rules

- Keep `README.md` focused on the stable product idea and roadmap.
- Use `docs/DEVELOPMENT_LOG.md` for daily progress.
- Use `docs/ARCHITECTURE.md` for system boundaries and structural changes.
- Use `docs/DECISIONS.md` for decisions and their reasoning.
- Use `CHANGELOG.md` for meaningful user-facing changes.

