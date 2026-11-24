const iconGlyphs = {
  overview: "◈",
  chat: "◌",
  research: "⌁",
  knowledge: "▱",
  agent: "◇",
  tasks: "✓",
  memory: "⊙",
  evaluation: "◎",
  settings: "⚙",
} as const;

export type NavIconName = keyof typeof iconGlyphs;

export function NavIcon({ name }: { name: NavIconName }) {
  return (
    <span className="nav-icon" aria-hidden="true">
      {iconGlyphs[name]}
    </span>
  );
}

