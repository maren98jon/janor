"use client";

import { ReactNode, useEffect, useState } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
