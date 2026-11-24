import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { ApiStatus } from "@/components/api-status";
import { EmptyState } from "@/components/ui/feedback-state";
import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";

export default function Home() {
  return (
    <AppShell>
      <main className="overview-page" aria-labelledby="page-title">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Personal AI workspace</div>
            <h1 id="page-title">Good to see you.</h1>
            <p className="page-description">
              A focused space for research, knowledge, and controlled execution.
            </p>
          </div>
          <div className="date-context">Workspace overview</div>
        </div>

        <Panel as="section" className="welcome-panel" aria-labelledby="welcome-title">
          <div>
            <p className="panel-kicker">AURA workspace</p>
            <h2 id="welcome-title">Build knowledge that works for you.</h2>
            <p>
              Your conversations, research, documents, and future workflows will
              come together here as the workspace grows.
            </p>
          </div>
          <div className="welcome-orbit" aria-hidden="true">
            <span className="orbit-ring orbit-ring-large" />
            <span className="orbit-ring orbit-ring-small" />
            <span className="orbit-core">A</span>
          </div>
        </Panel>

        <section className="overview-grid" aria-label="Workspace status">
          <Panel as="article" className="overview-card overview-card-wide">
            <p className="card-label">System status</p>
            <ApiStatus />
          </Panel>
          <Panel as="article" className="overview-card">
            <p className="card-label">Conversations</p>
            <p className="card-value card-value-muted">Empty</p>
            <p className="card-caption">No conversations have been created yet.</p>
          </Panel>
          <Panel as="article" className="overview-card">
            <p className="card-label">Knowledge sources</p>
            <p className="card-value card-value-muted">Empty</p>
            <p className="card-caption">No documents are connected yet.</p>
          </Panel>
          <Panel as="article" className="overview-card">
            <p className="card-label">Active tasks</p>
            <p className="card-value card-value-muted">Idle</p>
            <p className="card-caption">No execution tasks are running.</p>
          </Panel>
        </section>

        <section className="dashboard-lower-grid" aria-label="Workspace activity">
          <Panel as="section" className="activity-panel">
            <div className="section-title-row">
              <div>
                <p className="card-label">Recent activity</p>
                <h2>What is happening in AURA</h2>
              </div>
              <StatusBadge tone="neutral">No activity</StatusBadge>
            </div>
            <EmptyState
              compact
              title="Your workspace is ready for its first piece of work."
              description="Conversations, research, documents, and tasks will appear here as they are created."
            />
          </Panel>

          <Panel as="section" className="workspace-panel">
            <div className="section-title-row">
              <div>
                <p className="card-label">Workspace</p>
                <h2>Personal workspace</h2>
              </div>
              <StatusBadge tone="accent">Local</StatusBadge>
            </div>
            <dl className="workspace-details">
              <div>
                <dt>Environment</dt>
                <dd>Development</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>Single user</dd>
              </div>
              <div>
                <dt>Data source</dt>
                <dd>Local services</dd>
              </div>
            </dl>
          </Panel>
        </section>

        <section className="quick-actions-panel" aria-labelledby="quick-actions-title">
          <div className="section-title-row">
            <div>
              <p className="card-label">Quick actions</p>
              <h2 id="quick-actions-title">Choose where to begin</h2>
            </div>
            <p className="section-helper">These areas are being built incrementally.</p>
          </div>
          <div className="quick-actions-grid">
            <Link className="quick-action" href="/chat">
              <span className="quick-action-icon" aria-hidden="true">◌</span>
              <span>
                <strong>Explore Chat</strong>
                <small>Open the conversation workspace.</small>
              </span>
              <span className="quick-action-arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="quick-action" href="/knowledge">
              <span className="quick-action-icon" aria-hidden="true">▱</span>
              <span>
                <strong>Explore Knowledge</strong>
                <small>See the document-grounded workspace.</small>
              </span>
              <span className="quick-action-arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="quick-action" href="/research">
              <span className="quick-action-icon" aria-hidden="true">⌁</span>
              <span>
                <strong>Explore Research</strong>
                <small>Review the planned research workflow.</small>
              </span>
              <span className="quick-action-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

