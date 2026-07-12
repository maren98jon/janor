"use client";

import { useEffect } from "react";
import { useAppStore } from "@/shared/lib/store";
import { PageTransition } from "@/shared/ui/PageTransition";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialize = useAppStore((state) => state.initialize);
  const initialized = useAppStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  return <PageTransition>{children}</PageTransition>;
}
