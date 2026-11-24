import { SectionPage } from "@/components/section-page";

export default function TasksPage() {
  return (
    <SectionPage
      eyebrow="Execution center"
      title="Tasks"
      description="A central view of active work, progress, approvals, outputs, and failures."
      plannedWork="Persisted task state, progress, cancellation, retry, resumption, approval requests, and task history will be added with the agent runtime."
    />
  );
}

