"use client";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, BookOpen, CalendarDays, ShoppingCart } from "lucide-react";

const tabs = [
  { href: "/home", label: "Inicio", icon: Home },
  { href: "/inventory", label: "Despensa", icon: Package },
  { href: "/recipes", label: "Recetas", icon: BookOpen },
  { href: "/plan", label: "Plan", icon: CalendarDays },
  { href: "/shopping", label: "Compra", icon: ShoppingCart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 h-full flex-1 transition-colors duration-150",
                isActive ? "text-accent" : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
