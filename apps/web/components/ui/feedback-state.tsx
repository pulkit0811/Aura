import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FeedbackVariant = "empty" | "error" | "loading";

type FeedbackStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

const variantLabels: Record<FeedbackVariant, string> = {
  empty: "Nothing here yet",
  error: "Something went wrong",
  loading: "Please wait",
};

const variantIcons: Record<FeedbackVariant, string> = {
  empty: "◇",
  error: "!",
  loading: "…",
};

function FeedbackState({
  action,
  className,
  compact = false,
  description,
  title,
  variant,
}: FeedbackStateProps & { variant: FeedbackVariant }) {
  return (
    <div
      className={cn(
        "feedback-state",
        `feedback-state-${variant}`,
        compact && "feedback-state-compact",
        className,
      )}
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="feedback-state-icon" aria-hidden="true">
        {variantIcons[variant]}
      </div>
      <div className="feedback-state-content">
        <p className="feedback-state-label">{variantLabels[variant]}</p>
        <h3 className="feedback-state-title">{title}</h3>
        <p className="feedback-state-description">{description}</p>
        {action && <div className="feedback-state-action">{action}</div>}
      </div>
    </div>
  );
}

export function EmptyState(props: FeedbackStateProps) {
  return <FeedbackState {...props} variant="empty" />;
}

export function ErrorState(props: FeedbackStateProps) {
  return <FeedbackState {...props} variant="error" />;
}

export function LoadingState(props: FeedbackStateProps) {
  return <FeedbackState {...props} variant="loading" />;
}

