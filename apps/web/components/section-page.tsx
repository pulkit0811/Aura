import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/feedback-state";

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  plannedWork: string;
};

export function SectionPage({
  description,
  eyebrow,
  plannedWork,
  title,
}: SectionPageProps) {
  return (
    <main className="section-page" aria-labelledby="section-page-title">
      <header className="section-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1 id="section-page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <StatusBadge tone="accent">Scaffolded</StatusBadge>
      </header>

      <Panel className="module-placeholder">
        <EmptyState
          title={`${title} is scaffolded, not functional yet.`}
          description={plannedWork}
        />
      </Panel>
    </main>
  );
}

