"use client";

import { GlassCard, GlassCardProps } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ScrollGlassCardProps extends GlassCardProps {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
}

export function ScrollGlassCard({ 
  direction = "up", 
  delay = 0, 
  className,
  children,
  ...props 
}: ScrollGlassCardProps) {
  return (
    <ScrollReveal direction={direction} delay={delay} className="h-full">
      <GlassCard className={className} {...props}>
        {children}
      </GlassCard>
    </ScrollReveal>
  );
}
