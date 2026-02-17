import { cn } from "@/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover";
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative bg-surface-0/40 backdrop-blur-lg border border-white/5 shadow-lg rounded-2xl transition-all duration-300 ease-in-out overflow-hidden group",
        variant === "hover" && "hover:bg-surface-0/60 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5",
        className
      )}
      {...props}
    >
      {/* Liquid Flow Background */}
      <motion.div
        className="absolute -inset-[100%] z-0 opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-primary) 0%, var(--color-secondary) 50%, transparent 80%)",
        }}
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(10%, 10%) scale(1.1)",
            "translate(-5%, 20%) scale(0.9)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      {/* Content wrapper to ensure z-index above background */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
