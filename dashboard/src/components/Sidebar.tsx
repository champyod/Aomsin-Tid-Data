"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart2, 
  Database, 
  Brain
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Analysis", icon: BarChart2, href: "/analysis" },
  { label: "Modeling", icon: Brain, href: "/modeling" },
  { label: "Data", icon: Database, href: "/data" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
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
                    className="absolute inset-0 bg-primary/20 rounded-2xl overflow-hidden"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30,
                      mass: 0.8 // lighter mass for quicker initial movement
                    }}
                  >
                    {/* Internal Liquid Flow */}
                    <motion.div
                      className="absolute -inset-[100%] opacity-30"
                      style={{
                        background: "radial-gradient(circle, rgba(245,194,231,0.6) 0%, rgba(203,166,247,0.2) 50%, transparent 80%)",
                      }}
                      animate={{
                        transform: [
                          "translate(0%, 0%) scale(1)",
                          "translate(10%, -10%) scale(1.2)",
                          "translate(-5%, 5%) scale(0.9)",
                          "translate(0%, 0%) scale(1)",
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-4 transition-colors duration-300 relative z-10",
                    isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
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
