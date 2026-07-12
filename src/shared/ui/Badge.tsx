import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  size?: "sm" | "md";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", children, ...props }, ref) => {
    const variants = {
      default: "bg-accent-subtle text-accent-text",
      success: "bg-success-subtle text-success-text",
      warning: "bg-warning-subtle text-warning-text",
      danger: "bg-danger-subtle text-danger-text",
      accent: "bg-accent text-text-inverse",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center font-medium rounded-full", variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
