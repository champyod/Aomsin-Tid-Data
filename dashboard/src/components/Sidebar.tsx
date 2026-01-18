"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart2, 
  Database, 
  Brain,
  Users
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Analysis", icon: BarChart2, href: "/analysis" },
  { label: "Modeling", icon: Brain, href: "/modeling" },
  { label: "Data", icon: Database, href: "/data" },
  { label: "Credits", icon: Users, href: "/credits" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl m-4 rounded-3xl select-none">
      <div className="flex flex-col h-full">
        <div className="p-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
            Aomsin<br />Tid Data
          </h1>
          <p className="text-xs text-gray-400 mt-2 font-light tracking-wide">Car Market Intelligence</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center w-full px-5 py-4 text-sm font-medium rounded-2xl relative",
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {/* Single moving indicator with layoutId - moves between items */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-2xl"
                    style={{ originX: 0.5, originY: 0.5 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 30,
                    }}
                  />
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-4 relative z-10",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 text-xs text-gray-500 text-center font-light">
           &copy; {new Date().getFullYear()} Aomsin Tid Data
        </div>
      </div>
    </aside>
  );
}
