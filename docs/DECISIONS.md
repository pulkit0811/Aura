# Architecture Decisions

This file records decisions that shape AURA’s architecture. Decisions should be updated when the underlying reasoning changes.

## ADR-001: Use a frontend/backend monorepo

**Status:** Accepted

**Decision:** Keep the Next.js frontend and FastAPI backend in one repository under separate application/service directories.

**Reasoning:** AURA is initially a single-user local application. A monorepo makes local development, documentation, and coordinated changes simple while preserving a clear runtime boundary between the browser and backend.

## ADR-002: Use Next.js and React for the frontend

**Status:** Accepted

**Decision:** Build the web interface with Next.js, React, TypeScript, Tailwind CSS, and accessible reusable components.

**Reasoning:** This provides a productive foundation for the responsive workspace, streaming chat interface, document views, task progress, and future interactive workflows.

## ADR-003: Use Python and FastAPI for the backend

**Status:** Accepted

**Decision:** Build the backend with Python, FastAPI, Pydantic, and pytest.

**Reasoning:** Python provides a strong ecosystem for document processing, retrieval, evaluation, and AI integrations. FastAPI and Pydantic provide explicit API contracts and validation.

## ADR-004: Start with SQLite

**Status:** Accepted

**Decision:** Use SQLite for the initial local application and isolate database access behind repositories or data-access services.

**Reasoning:** The first version is single-user and local. SQLite minimizes setup while leaving a migration path to PostgreSQL when concurrency, deployment, or vector storage requirements justify it.

## ADR-005: Use REST and Server-Sent Events initially

**Status:** Accepted

**Decision:** Use JSON over HTTP for ordinary API operations and Server-Sent Events for server-to-browser streaming.

**Reasoning:** These patterns cover CRUD, chat streaming, and progress updates without introducing the complexity of WebSockets before bidirectional communication is required.

## ADR-006: Keep model providers behind adapters

**Status:** Accepted

**Decision:** Application services depend on provider-neutral interfaces rather than directly on a model vendor SDK.

**Reasoning:** AURA should support different hosted and local providers, normalized errors, configurable models, and future model routing without rewriting application features.

## ADR-007: Start with a controlled single-agent runtime

**Status:** Accepted

**Decision:** Implement a single-agent state machine with explicit tool contracts, permissions, persistence, and execution traces before considering multi-agent workflows.

**Reasoning:** Reliability, inspectability, cancellation, and safe tool execution are more important than adding autonomous complexity early.

