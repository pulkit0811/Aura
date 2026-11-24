import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type StatusTone = "accent" | "danger" | "neutral" | "success";

type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone;
};

export function StatusBadge({
  className,
  tone = "neutral",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn("ui-status-badge", `ui-status-badge-${tone}`, className)}
      {...props}
    />
  );
}

