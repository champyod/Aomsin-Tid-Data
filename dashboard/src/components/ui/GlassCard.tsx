import { cn } from "@/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover";
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl transition-all duration-300 ease-in-out",
        variant === "hover" && "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
