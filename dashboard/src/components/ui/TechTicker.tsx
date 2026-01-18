"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface TechItem {
  name: string;
  icon: string; // URL to icon image
}

interface TechTickerProps {
  items: TechItem[];
  direction?: "left" | "right";
  className?: string;
  speed?: number;
}

export function TechTicker({ items, direction = "left", className, speed = 25 }: TechTickerProps) {
  return (
    <GlassCard className={cn("relative overflow-hidden py-4 px-2", className)}>
      {/* Edge fades - matching GlassCard background */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/5 to-transparent z-10 pointer-events-none rounded-l-2xl" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/5 to-transparent z-10 pointer-events-none rounded-r-2xl" />
      
      <div className="flex overflow-hidden w-full select-none">
        <motion.div
            className="flex gap-10 items-center pr-10"
            animate={{
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
                duration: speed,
                ease: "linear",
                repeat: Infinity,
            }}
        >
            {[...items, ...items, ...items, ...items].map((item, i) => (
                <div 
                    key={`${item.name}-${i}`} 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 shrink-0"
                >
                    <img 
                        src={item.icon} 
                        alt={item.name} 
                        className="w-6 h-6 object-contain" 
                    />
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                        {item.name}
                    </span>
                </div>
            ))}
        </motion.div>
      </div>
    </GlassCard>
  );
}
