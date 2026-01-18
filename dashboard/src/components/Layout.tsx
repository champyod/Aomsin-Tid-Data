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
      <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block transform transition-transform duration-300 ease-in-out glass-panel m-4 rounded-2xl border-white/5">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Satasci
            </h1>
            <p className="text-xs text-gray-400 mt-1">Data Science Dashboard</p>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "text-white bg-primary/20 shadow-lg shadow-primary/10 border border-primary/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-colors",
                      isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center p-3 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                TD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Team Data</p>
                <p className="text-xs text-gray-400">View Only</p>
              </div>
            </div>
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
