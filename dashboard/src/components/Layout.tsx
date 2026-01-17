'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, BrainCircuit, Activity } from "lucide-react";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/analysis", label: "Analysis", icon: BarChart3 },
    { href: "/modeling", label: "Modeling", icon: BrainCircuit },
    { href: "/data", label: "Raw Data", icon: Activity },
  ] as const;

  return (
    <div className="flex min-h-screen font-sans text-gray-100 bg-transparent">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block transform transition-transform duration-300 ease-in-out bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl m-4 rounded-3xl">
        <div className="flex flex-col h-full">
          <div className="p-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-display">
              Aomsin<br />Tid Data
            </h1>
            <p className="text-xs text-gray-400 mt-2 font-light tracking-wide">Car Market Intelligence</p>
          </div>

          <nav className="flex-1 px-4 space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center w-full px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "text-white bg-primary/20 shadow-lg shadow-primary/20 border border-primary/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-4 transition-colors duration-300",
                      isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-6 text-xs text-gray-500 text-center font-light">
             &copy; 2025 Aomsin Tid Data
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
           {children}
        </div>
      </main>
    </div>
  );
}
