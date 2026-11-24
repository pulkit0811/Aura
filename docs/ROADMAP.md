# AURA Roadmap

AURA is developed through focused milestones. The detailed day-by-day plan is included in `README.md`; this document describes the goal and completion boundary of each major phase.

## Phase 1 — Foundation (Days 1–8)

Establish a documented monorepo, local development conventions, FastAPI backend, Next.js frontend, and a verified connection between them.

**Exit condition:** The project has a reproducible local foundation with basic testing, configuration, and documentation.

## Phase 2 — Application experience (Days 9–15)

Build the visual system, navigation routes, loading and empty states, overview dashboard, settings shell, responsive behavior, and accessibility baseline.

**Exit condition:** The application shell is cohesive, responsive, accessible, and honest about unfinished functionality.

## Phase 3 — Chat core (Days 16–26)

Add persistent conversations, messages, provider abstraction, model configuration, streaming, message actions, conversation history, retries, and tests.

**Exit condition:** AURA supports reliable persistent conversations through a configurable model provider.

## Phase 4 — Knowledge and documents (Days 27–40)

Build validated uploads, text and PDF extraction, ingestion state, chunking, embeddings, baseline vector storage, retrieval, grounded chat, citations, and retrieval tests.

**Exit condition:** AURA can answer questions from personal documents with inspectable evidence.

## Phase 5 — Research workspace (Days 41–50)

Add research tasks, planning, source abstraction, evidence collection, source comparison, grounded reports, citation management, research UI, export, and tests.

**Exit condition:** AURA can execute transparent, evidence-based research workflows.

## Phase 6 — Agent runtime and tools (Days 51–62)

Create tool contracts, a registry, approved initial tools, agent state, single-agent planning, step execution, persistence, task progress, cancellation, retries, approval checkpoints, traces, and security tests.

**Exit condition:** AURA can execute controlled multi-step tasks with visible state and enforced permissions.

## Phase 7 — Memory and context (Days 63–69)

Add explicit memories, management controls, retrieval, approval flows, conversation summaries, context assembly, and privacy review.

**Exit condition:** AURA provides useful long-term context that remains visible and user-controlled.

## Phase 8 — Evaluation and observability (Days 70–78)

Add structured logs, tracing, evaluation datasets, retrieval and answer metrics, tool evaluation, regression tests, usage metrics, and an evaluation interface.

**Exit condition:** AURA’s quality and reliability can be measured reproducibly.

## Phase 9 — Hardening and polish (Days 79–88)

Perform security, recovery, performance, export, backup, UI consistency, end-to-end testing, documentation, release preparation, and future capability planning.

**Exit condition:** AURA has a stable, documented milestone suitable for continued development and real personal use.

## Prioritization principles

1. Solve a real personal workflow before adding novelty.
2. Prefer a reliable baseline before advanced AI techniques.
3. Keep evidence and user control visible.
4. Measure behavior instead of relying on demos.
5. Delay advanced infrastructure until the product demonstrates the need.

