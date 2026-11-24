"use client";

import { useState, type ReactNode } from "react";

import { NavIcon, type NavIconName } from "@/components/nav-icon";

type NavigationItem = {
  label: string;
  icon: NavIconName;
  active?: boolean;
};

const workspaceItems: NavigationItem[] = [
  { label: "Overview", icon: "overview", active: true },
  { label: "Chat", icon: "chat" },
  { label: "Research", icon: "research" },
  { label: "Knowledge", icon: "knowledge" },
];

const executionItems: NavigationItem[] = [
  { label: "Agent Studio", icon: "agent" },
  { label: "Tasks", icon: "tasks" },
  { label: "Memory", icon: "memory" },
  { label: "Evaluation", icon: "evaluation" },
];

function NavigationGroup({
  label,
  items,
}: {
  label: string;
  items: NavigationItem[];
}) {
  return (
    <div className="navigation-group">
      <p className="navigation-label">{label}</p>
      <div className="navigation-items">
        {items.map((item) =>
          item.active ? (
            <a className="navigation-item navigation-item-active" href="/" key={item.label}>
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ) : (
            <span
              className="navigation-item navigation-item-disabled"
              aria-disabled="true"
              key={item.label}
              title={`${item.label} will be added in a later milestone`}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
              <span className="navigation-soon">Soon</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <button
        className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay-visible" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            A
          </div>
          <div>
            <p className="brand-name">AURA</p>
            <p className="brand-caption">Research workspace</p>
          </div>
        </div>

        <nav className="sidebar-navigation" aria-label="Primary navigation">
          <NavigationGroup label="Workspace" items={workspaceItems} />
          <NavigationGroup label="Execution" items={executionItems} />
        </nav>

        <div className="sidebar-footer">
          <span className="workspace-indicator" aria-hidden="true" />
          <div>
            <p className="workspace-name">Personal workspace</p>
            <p className="workspace-caption">Local environment</p>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button
            className="menu-toggle"
            type="button"
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="topbar-context">
            <span className="topbar-context-muted">Workspace</span>
            <span className="topbar-divider">/</span>
            <span>Overview</span>
          </div>
          <div className="topbar-status">
            <span className="topbar-status-dot" aria-hidden="true" />
            Local mode
          </div>
        </header>

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

