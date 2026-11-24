import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PanelElement = "article" | "div" | "section";

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: PanelElement;
};

export function Panel({ as: Element = "div", className, ...props }: PanelProps) {
  return <Element className={cn("ui-panel", className)} {...props} />;
}

