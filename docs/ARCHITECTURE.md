# AURA Architecture

## Purpose

This document defines the initial architecture for AURA: a personal AI research and execution workspace.

The architecture is intentionally small at the beginning. It gives the frontend, backend, AI integrations, persistence, and future background work clear boundaries without introducing infrastructure before the product needs it.

## Architectural goals

AURA should be:

- Useful for a single primary user before expanding toward multi-user support.
- Modular enough to support multiple model providers and retrieval strategies.
- Inspectable, so plans, evidence, tool calls, and task state can be understood.
- Reliable when models, external providers, documents, or long-running tasks fail.
- Testable without requiring a live model or external service for every test.
- Simple enough to develop locally with minimal setup.
- Safe by default, especially around files, tools, secrets, and external content.

## High-level system

```text
┌─────────────────────┐
│  Next.js Web App    │
│  UI and interaction  │
└──────────┬──────────┘
           │ HTTPS / JSON / SSE
           ▼
┌─────────────────────┐
│  FastAPI Application │
│  HTTP and validation │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Application Services│
│  Use-case orchestration│
└──────┬────────┬─────┘
       │        │
       ▼        ▼
┌────────────┐ ┌──────────────────────┐
│ Persistence│ │ External adapters     │
│ SQLite     │ │ Model, search, files  │
└────────────┘ └──────────────────────┘

Long-running work will later be moved behind a background-job boundary.
```

The browser communicates only with the backend API. It does not access the database, model providers, embedding providers, or protected filesystem operations directly.

## Repository structure

The target monorepo structure is:

```text
aura/
├── apps/
│   └── web/                  # Next.js frontend
├── services/
│   └── api/                  # FastAPI backend
├── docs/                     # Architecture, decisions, and development notes
├── tests/                    # Cross-service and end-to-end tests when needed
├── .env.example              # Documented environment variable names only
├── README.md                 # Product overview and long-term roadmap
└── .gitignore
```

The frontend and backend are separate applications in one repository. This keeps local development straightforward while preserving a clear boundary between presentation and application logic.

## Component responsibilities

### Web application

The web application owns:

- Page layouts and navigation.
- Chat, document, research, task, memory, and settings interfaces.
- Local UI state such as selected conversations, open panels, and loading states.
- Form interaction and client-side validation for user experience.
- Rendering Markdown, citations, task progress, and execution traces.
- Calling the backend through a typed API client.

The web application does not own:

- API keys or provider credentials.
- Database access.
- AI orchestration decisions.
- Filesystem permissions.
- Trust decisions about tool outputs or external content.

### API service

The API service owns:

- HTTP endpoints and request/response validation.
- Authentication and ownership boundaries when they become necessary.
- Application-service orchestration.
- Conversation and task lifecycle operations.
- Provider selection and normalized error handling.
- Document ingestion and retrieval coordination.
- Tool permission enforcement.
- Persistence transactions.

Routes should remain thin. Business behavior belongs in application services rather than being embedded directly in route handlers.

### Application services

Application services represent user-facing use cases, such as:

- Create a conversation.
- Send a message.
- Upload and ingest a document.
- Search the knowledge collection.
- Run a research task.
- Execute an approved tool step.
- Save or retrieve an explicit memory.

They coordinate domain rules, repositories, and external adapters. They should be testable with mocked or fake adapters.

### Domain layer

The domain layer contains concepts and rules that should not depend on FastAPI, Next.js, a specific model provider, or a specific database. Examples include:

- Conversation and message state.
- Document ingestion states.
- Retrieval results and evidence references.
- Task and step states.
- Tool definitions and permission requirements.
- Memory approval rules.

The domain layer should be introduced as complexity appears. It should not become a large speculative framework before the corresponding feature exists.

### Infrastructure adapters

Infrastructure adapters connect the application to external systems:

- SQLite and future PostgreSQL persistence.
- Chat model providers.
- Embedding providers.
- Document parsers.
- Search providers.
- Filesystem storage.
- Background job systems.

The rest of the application should depend on interfaces or narrow contracts rather than provider-specific SDK details.

## Communication patterns

### Request/response API

Ordinary CRUD operations and short-running commands will use JSON over HTTP. API contracts should validate both incoming requests and outgoing responses.

### Streaming

Chat token streaming and progress updates will use Server-Sent Events (SSE) initially. SSE is sufficient for server-to-browser streams while keeping the system simpler than introducing WebSockets.

### Background work

Document ingestion, embeddings, long research tasks, report generation, and agent workflows may become background jobs. The initial implementation should keep short operations synchronous and introduce a job queue only when a real operation requires it.

Background work must have:

- A persisted status.
- Clear failure information.
- Retry behavior appropriate to the operation.
- Cancellation behavior where possible.
- An observable result or artifact.

## Data and persistence

SQLite is the initial persistence choice for local development. It is appropriate for the first single-user version and avoids requiring a separate database service.

Persistence access should be isolated behind repositories or data-access services. Application services should not construct SQL throughout the codebase. This keeps a later PostgreSQL migration, including possible vector storage, manageable.

Data should be introduced feature by feature. Early entities may include conversations, messages, and documents. Research tasks, agent runs, memories, evaluations, and artifacts should be added only when their features are implemented.

Every persisted entity should eventually have:

- A stable identifier.
- Creation and update timestamps.
- Validation rules.
- Clear ownership or workspace boundaries.
- Explicit deletion behavior where applicable.

## AI provider boundary

AI features will use provider-neutral interfaces. A chat provider should expose capabilities such as:

- Generate a response.
- Stream a response.
- Report supported model capabilities.
- Return normalized usage information when available.

An embedding provider should expose:

- Embed one or more texts.
- Report dimensions and model metadata.

Provider-specific authentication, request formats, retries, timeouts, and error types belong inside adapters. Application code should work with normalized results and errors.

API keys and provider credentials belong only in backend environment configuration or another secure configuration mechanism. They must never be sent to the browser or committed to the repository.

## Knowledge and evidence boundary

The knowledge pipeline will remain separated into stages:

```text
Upload → Validate → Extract → Clean → Chunk → Embed → Index
                                              ↓
Query → Retrieve → Select evidence → Generate grounded answer
```

Document processing, retrieval, evidence selection, and answer generation must remain independently testable. A successful upload must not be treated as proof that a document was correctly extracted or indexed.

Evidence objects should preserve enough metadata to identify the source document and, where available, its page, section, chunk, or external URL.

## Tool and agent boundary

AI-generated instructions do not receive unrestricted execution authority.

Each tool must define:

- A stable name.
- A human-readable description.
- A validated input schema.
- A predictable output shape.
- An execution handler.
- Error behavior.
- Permission requirements.

Tool permissions are enforced by application code independently of model output. External documents, web pages, and tool results are treated as untrusted information and cannot change the system’s permissions by instruction alone.

The first agent runtime will be a controlled single-agent state machine. Multi-agent orchestration is a later capability, not a foundation requirement.

## Security and privacy boundaries

The initial architecture follows least privilege:

- Secrets remain on the backend.
- Uploaded files are validated before processing.
- Filesystem access is restricted to approved locations and operations.
- Tool execution is allowlisted and schema-validated.
- Sensitive operations can require explicit approval.
- Logs avoid secrets and unnecessary document or conversation content.
- Memory is explicitly saved and user-manageable rather than silently inferred as permanent data.
- Deletion and export behavior will be designed alongside the corresponding data feature.

## Testing boundaries

The architecture supports multiple testing levels:

- Frontend component tests for important interactions.
- API tests for request validation and response behavior.
- Application-service unit tests using fake repositories and providers.
- Adapter tests for persistence and external integrations.
- Retrieval tests using fixed documents and queries.
- Agent and tool tests for permissions, invalid input, retries, and failures.
- End-to-end tests for critical user workflows.
- Evaluation tests for retrieval quality, grounding, citations, and model behavior.

Tests should not require live model calls unless the test is explicitly an integration or evaluation test.

## Evolution path

The architecture is expected to evolve in this order:

1. Local frontend and backend applications.
2. Persistent conversations and configurable model providers.
3. Document ingestion and baseline retrieval.
4. Evidence-grounded research workflows.
5. Controlled tools and single-agent task execution.
6. Explicit memory and context management.
7. Evaluation, tracing, and quality improvements.
8. Background workers, PostgreSQL, advanced retrieval, local models, and other capabilities when justified.

Each later capability should solve a demonstrated product need and preserve the boundaries established here.

