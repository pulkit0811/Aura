import { ApiStatus } from "@/components/api-status";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <div className="eyebrow">Personal AI workspace</div>
        <h1 id="page-title">AURA</h1>
        <p className="hero-copy">
          A focused workspace for research, knowledge, and controlled execution.
        </p>

        <ApiStatus />
      </section>
    </main>
  );
}

