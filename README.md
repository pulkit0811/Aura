# AURA

## Personal AI Research & Execution Workspace

AURA is a long-term personal AI workspace designed to help transform questions, information, and goals into useful, organized, and verifiable outcomes.

It is intended for academic work, technical learning, machine-learning research, software development, project planning, document understanding, knowledge organization, and personal productivity.

AURA is not intended to be only a chatbot, a thin wrapper around an AI API, a basic PDF summarizer, or a dashboard of disconnected features. Its value will come from the complete system built around AI models:

- Research workflows.
- Knowledge retrieval.
- Context management.
- Controlled agent execution.
- Tool execution.
- Task state management.
- Evidence collection.
- Document processing.
- User control.
- Evaluation and reliability.

AI models are components of AURA, not the entire product.

## Product vision

AURA will gradually become a unified personal research and execution environment where the user can:

- Have persistent, meaningful conversations with AI.
- Work with personal documents and knowledge.
- Perform evidence-based research.
- Generate grounded reports with citations.
- Create and execute controlled multi-step workflows.
- Inspect plans, tools, progress, errors, and outputs.
- Manage explicitly saved memories.
- Organize work into persistent workspaces and projects.
- Evaluate the quality of AI-generated results.
- Resume interrupted tasks and recover from failures.

The initial product is optimized for a single user. The architecture should remain extensible without introducing unnecessary enterprise complexity too early.

## Development approach

AURA will be developed incrementally through focused daily milestones. Each “day” represents one coherent development session and does not necessarily mean one calendar day.

Every development day follows this process:

1. Inspect the current state.
2. Define that day’s scope.
3. Implement only the selected feature.
4. Test and verify it.
5. Update relevant documentation.
6. Report what changed, what was tested, known limitations, and the next recommended task.

Advanced features will be introduced only after the underlying systems are reliable. We will not implement the entire product at once, add fake functionality, or introduce infrastructure before it is needed.

## Development roadmap

### Phase 1 — Foundation

| Day | Focus | Expected result |
|---|---|---|
| 1 | Repository audit | Understand the existing codebase, tools, dependencies, and current state |
| 2 | Architecture baseline | Establish frontend/backend boundaries and document the initial architecture |
| 3 | Project configuration | Configure environment variables, formatting, linting, type checking, and testing |
| 4 | Backend foundation | Create the FastAPI application, health endpoint, configuration, and error handling |
| 5 | Frontend foundation | Create the Next.js application structure and API communication layer |
| 6 | Application shell | Add the main layout, sidebar, navigation, and responsive structure |
| 7 | Documentation baseline | Create or update README, roadmap, architecture, development log, and decisions |
| 8 | Foundation verification | Run the application locally and verify frontend/backend connectivity |

**Checkpoint:** AURA has a clean, documented, runnable foundation.

### Phase 2 — Application experience

| Day | Focus | Expected result |
|---|---|---|
| 9 | Design system | Establish colors, typography, spacing, borders, buttons, inputs, and panels |
| 10 | Navigation pages | Add Overview, Chat, Research, Knowledge, Tasks, Memory, Evaluation, and Settings routes |
| 11 | Empty and loading states | Create reusable states for unfinished or unavailable sections |
| 12 | Overview dashboard | Add a useful initial dashboard based on real application state |
| 13 | Settings shell | Add configuration sections without pretending unfinished settings work |
| 14 | Responsive behavior | Improve desktop, tablet, and mobile layouts |
| 15 | Accessibility pass | Add keyboard navigation, labels, focus states, and semantic structure |

**Checkpoint:** AURA looks and behaves like a real application shell.

### Phase 3 — Chat core

| Day | Focus | Expected result |
|---|---|---|
| 16 | Conversation data model | Add conversations and messages with persistence |
| 17 | Conversation API | Add create, read, rename, archive, and delete operations |
| 18 | Model provider interface | Create a provider abstraction independent of one AI vendor |
| 19 | Environment configuration | Add safe model and API configuration using environment variables |
| 20 | Chat interface | Build the conversation screen and message composer |
| 21 | Message rendering | Add Markdown, code blocks, copy actions, and basic message states |
| 22 | Model integration | Connect the chat to one configurable provider |
| 23 | Streaming responses | Add streamed assistant responses |
| 24 | Error and retry handling | Handle failed requests, timeouts, and retries clearly |
| 25 | Conversation history | Add conversation list, selection, search or filtering, and persistence |
| 26 | Chat testing | Add backend API tests and frontend tests for critical interactions |

**Checkpoint:** AURA can hold real persistent conversations with a configurable AI model.

### Phase 4 — Knowledge and documents

| Day | Focus | Expected result |
|---|---|---|
| 27 | Document data model | Add documents, metadata, status, and ownership boundaries |
| 28 | Upload system | Add validated document upload |
| 29 | Text and Markdown ingestion | Support simple text-based files first |
| 30 | PDF extraction | Add page-aware PDF text extraction |
| 31 | Ingestion status | Track pending, processing, completed, and failed states |
| 32 | Chunking service | Create configurable chunks with metadata and page references |
| 33 | Chunk inspection | Make extracted text and chunks inspectable for debugging |
| 34 | Embedding abstraction | Add a provider-independent embedding interface |
| 35 | Baseline vector storage | Store embeddings using a simple local strategy |
| 36 | Retrieval service | Implement basic semantic document retrieval |
| 37 | Knowledge interface | Build document library, upload status, and document details |
| 38 | Grounded chat | Allow chat to use retrieved document context |
| 39 | Citations | Display source document and page references |
| 40 | Retrieval tests | Test extraction, chunking, retrieval, and citation metadata |

**Checkpoint:** AURA can answer questions using personal documents with inspectable evidence.

### Phase 5 — Research workspace

| Day | Focus | Expected result |
|---|---|---|
| 41 | Research task model | Represent research requests, status, sources, and outputs |
| 42 | Research planning | Generate and display a structured research plan |
| 43 | Source abstraction | Define a safe interface for external and internal sources |
| 44 | Evidence collection | Store source metadata and relevant evidence |
| 45 | Source comparison | Compare findings, agreements, disagreements, and limitations |
| 46 | Report generation | Generate structured reports grounded in collected evidence |
| 47 | Citation management | Connect claims and report sections to sources |
| 48 | Research UI | Add research creation, progress, review, and output screens |
| 49 | Export | Export reports as Markdown and later other formats |
| 50 | Research tests | Test planning, source handling, evidence, and report generation |

**Checkpoint:** AURA can perform transparent, evidence-based research workflows.

### Phase 6 — Agent runtime and tools

| Day | Focus | Expected result |
|---|---|---|
| 51 | Tool contract | Define names, descriptions, input schemas, outputs, and permissions |
| 52 | Tool registry | Register and discover approved tools |
| 53 | Initial tools | Add calculator, document search, and file-reading tools |
| 54 | Agent state | Define task state, step state, and transitions |
| 55 | Single-agent planner | Convert a request into a controlled execution plan |
| 56 | Step executor | Execute one approved step at a time |
| 57 | Execution persistence | Save plans, steps, outputs, and errors |
| 58 | Task center | Display active tasks and execution progress |
| 59 | Retry and cancellation | Add safe retry and cancellation behavior |
| 60 | Approval checkpoints | Require user approval for sensitive operations |
| 61 | Execution traces | Display tool calls, results, failures, and timing |
| 62 | Agent security tests | Test permissions, invalid inputs, and unsafe execution attempts |

**Checkpoint:** AURA has a transparent single-agent execution system.

### Phase 7 — Memory and context

| Day | Focus | Expected result |
|---|---|---|
| 63 | Memory model | Add explicit, editable saved memories |
| 64 | Memory management | Create, inspect, edit, and delete memories |
| 65 | Memory retrieval | Select relevant memories for conversations |
| 66 | User approval flow | Prevent silent permanent memory creation |
| 67 | Conversation summaries | Add summaries for long conversations |
| 68 | Context assembly | Combine conversation, memory, and knowledge context safely |
| 69 | Privacy review | Review retention, deletion, export, and sensitive-data behavior |

**Checkpoint:** AURA has controlled, user-visible long-term context.

### Phase 8 — Evaluation and observability

| Day | Focus | Expected result |
|---|---|---|
| 70 | Structured logging | Add useful logs without exposing secrets |
| 71 | Request and task tracing | Track model calls, retrieval, tools, and task transitions |
| 72 | Evaluation data model | Add datasets, cases, and evaluation runs |
| 73 | Retrieval evaluation | Measure retrieval quality |
| 74 | Answer evaluation | Measure grounding, relevance, and citation quality |
| 75 | Tool evaluation | Measure tool success and failure behavior |
| 76 | Regression tests | Create repeatable quality checks |
| 77 | Usage and latency metrics | Track timing, token usage, and errors where available |
| 78 | Evaluation interface | Add a practical evaluation dashboard |

**Checkpoint:** AURA can be measured and improved rather than judged only by appearance.

### Phase 9 — Hardening and polish

| Day | Focus | Expected result |
|---|---|---|
| 79 | Security review | Review uploads, permissions, secrets, and filesystem access |
| 80 | Failure recovery | Test API failures, interrupted tasks, and incomplete ingestion |
| 81 | Performance review | Identify slow database, retrieval, and frontend operations |
| 82 | Data export and deletion | Add user-controlled export and deletion workflows |
| 83 | Backup strategy | Document and implement an appropriate local backup approach |
| 84 | UI consistency pass | Refine spacing, states, icons, and interaction behavior |
| 85 | End-to-end testing | Test critical user journeys from start to finish |
| 86 | Documentation review | Update architecture, decisions, roadmap, and development log |
| 87 | Release preparation | Prepare a stable milestone and changelog |
| 88 | Future planning | Decide which advanced capability is justified next |

## Initial architecture direction

The first implementation will remain intentionally simple:

- Use Next.js, React, and TypeScript for the frontend.
- Use Python, FastAPI, Pydantic, and pytest for the backend.
- Use SQLite initially when persistence is required.
- Keep database access behind service or repository boundaries so migration to PostgreSQL remains possible.
- Use provider interfaces for chat models and embeddings.
- Start with basic retrieval before hybrid search or reranking.
- Use a custom state machine before introducing a complex agent framework.
- Start with one reliable agent instead of multiple autonomous agents.
- Introduce background jobs only when an operation is genuinely long-running.
- Keep unfinished modules visible but clearly marked as incomplete.
- Treat documents, web content, and tool outputs as untrusted input.
- Never expose API keys in frontend code or commit them to Git.

## Engineering standards

AURA will follow these standards throughout development:

- Type-safe, modular, maintainable code.
- Clear frontend and backend boundaries.
- Input validation and sensible error handling.
- Unit, integration, API, and end-to-end tests where appropriate.
- Reproducible evaluation for AI features.
- Structured logs that avoid secrets and unnecessary sensitive data.
- Explicit user control over memory, tools, tasks, and personal data.
- Documentation updated alongside meaningful architectural changes.
- No claims of success without actual verification.

