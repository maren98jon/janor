import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-surface border border-border shadow-sm",
      elevated: "bg-surface-elevated border border-border-strong shadow-md",
      subtle: "bg-accent-subtle border border-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-xl p-4 transition-all duration-200", variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
