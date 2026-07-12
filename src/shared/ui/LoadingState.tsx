import { cn } from "@/shared/lib/utils";

interface LoadingStateProps {
  className?: string;
  label?: string;
}

export function LoadingState({ className, label = "Cargando..." }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 gap-3", className)}>
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      {label && <p className="text-sm text-text-tertiary">{label}</p>}
    </div>
  );
}
