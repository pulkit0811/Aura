import { AppShell } from "@/components/app-shell";
import { ApiStatus } from "@/components/api-status";

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

        <section className="welcome-panel" aria-labelledby="welcome-title">
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
        </section>

        <section className="overview-grid" aria-label="Workspace status">
          <article className="overview-card overview-card-wide">
            <p className="card-label">System status</p>
            <ApiStatus />
          </article>
          <article className="overview-card">
            <p className="card-label">Conversations</p>
            <p className="card-value">—</p>
            <p className="card-caption">Chat will be connected next.</p>
          </article>
          <article className="overview-card">
            <p className="card-label">Knowledge sources</p>
            <p className="card-value">—</p>
            <p className="card-caption">Your document library is coming soon.</p>
          </article>
        </section>
      </main>
    </AppShell>
  );
}

