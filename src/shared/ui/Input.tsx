import { cn } from "@/shared/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-11 px-4 rounded-lg border border-border bg-surface text-text-primary text-base",
            "placeholder:text-text-tertiary",
            "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            "transition-all duration-150",
            error && "border-danger focus:ring-danger/30 focus:border-danger",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
