"use client";

import { cn } from "@/shared/lib/utils";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./Button";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Sheet({ open, onOpenChange, title, children, className }: SheetProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "relative w-full max-w-lg bg-surface rounded-t-2xl shadow-lg animate-slide-up max-h-[85vh] flex flex-col",
          className
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {title && <h2 className="text-lg font-semibold text-text-primary">{title}</h2>}
          <div className={cn("flex-1", !title && "flex justify-end")}>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="rounded-full w-8 h-8 p-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
