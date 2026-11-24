"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { NavIcon, type NavIconName } from "@/components/nav-icon";

type NavigationItem = {
  label: string;
  icon: NavIconName;
  href: string;
};

const workspaceItems: NavigationItem[] = [
  { label: "Overview", icon: "overview", href: "/" },
  { label: "Chat", icon: "chat", href: "/chat" },
  { label: "Research", icon: "research", href: "/research" },
  { label: "Knowledge", icon: "knowledge", href: "/knowledge" },
];

const executionItems: NavigationItem[] = [
  { label: "Agent Studio", icon: "agent", href: "/agent-studio" },
  { label: "Tasks", icon: "tasks", href: "/tasks" },
  { label: "Memory", icon: "memory", href: "/memory" },
  { label: "Evaluation", icon: "evaluation", href: "/evaluation" },
];

const settingsItem: NavigationItem = {
  label: "Settings",
  icon: "settings",
  href: "/settings",
};

function NavigationGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: NavigationItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="navigation-group">
      <p className="navigation-label">{label}</p>
      <div className="navigation-items">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              className={`navigation-item ${isActive ? "navigation-item-active" : ""}`}
              href={item.href}
              key={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentPage = [...workspaceItems, ...executionItems, settingsItem].find(
    (item) => item.href === pathname,
  );
  const closeSidebar = () => setSidebarOpen(false);

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
          <NavigationGroup
            label="Workspace"
            items={workspaceItems}
            pathname={pathname}
            onNavigate={closeSidebar}
          />
          <NavigationGroup
            label="Execution"
            items={executionItems}
            pathname={pathname}
            onNavigate={closeSidebar}
          />
        </nav>

        <Link
          className={`sidebar-footer ${pathname === settingsItem.href ? "sidebar-footer-active" : ""}`}
          href={settingsItem.href}
          aria-current={pathname === settingsItem.href ? "page" : undefined}
          onClick={closeSidebar}
        >
          <span className="workspace-indicator" aria-hidden="true" />
          <div>
            <p className="workspace-name">Personal workspace</p>
            <p className="workspace-caption">Local environment</p>
          </div>
          <NavIcon name={settingsItem.icon} />
        </Link>
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
            <span>{currentPage?.label ?? "Workspace"}</span>
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

