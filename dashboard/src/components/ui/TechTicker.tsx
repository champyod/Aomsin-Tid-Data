"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface TechTickerProps {
  items: string[];
  direction?: "left" | "right";
  className?: string;
  label: string;
}

export function TechTicker({ items, direction = "left", className, label }: TechTickerProps) {
  return (
    <div className={cn("relative flex overflow-hidden mask-linear-fade py-4", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1e1e2e] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1e1e2e] to-transparent z-10" />
      
      <div className="flex items-center gap-4 px-4 min-w-[200px] z-20">
         <span className="text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            {label}
         </span>
      </div>

      <div className="flex overflow-hidden w-full">
        <motion.div
            className="flex gap-8 items-center pr-8"
            animate={{
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }}
        >
            {[...items, ...items, ...items, ...items].map((item, i) => (
                <span 
                    key={`${item}-${i}`} 
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200 whitespace-nowrap font-display hover:text-white transition-colors cursor-default"
                >
                    {item}
                </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
