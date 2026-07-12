import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-hover",
      secondary: "bg-surface text-text-primary border border-border hover:bg-accent-subtle active:bg-accent-subtle",
      ghost: "bg-transparent text-text-secondary hover:bg-accent-subtle active:bg-accent-subtle",
      danger: "bg-danger text-text-inverse hover:bg-danger-text active:bg-danger-text",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
