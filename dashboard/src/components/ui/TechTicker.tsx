import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechItem {
  name: string;
  icon: LucideIcon;
}

interface TechTickerProps {
  items: TechItem[];
  direction?: "left" | "right";
  className?: string;
  speed?: number;
}

export function TechTicker({ items, direction = "left", className, speed = 25 }: TechTickerProps) {
  return (
    <div className={cn("relative flex overflow-hidden py-6 group", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1e1e2e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1e1e2e] to-transparent z-10 pointer-events-none" />
      
      <div className="flex overflow-hidden w-full select-none">
        <motion.div
            className="flex gap-16 items-center pr-16"
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
                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                    <item.icon className="w-8 h-8 md:w-10 md:h-10 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl md:text-4xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200 group-hover:from-white group-hover:to-gray-100">
                        {item.name}
                    </span>
                </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
