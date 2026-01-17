import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { GlassCard } from "./ui/GlassCard";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ElementType;
  className?: string;
}

export function StatCard({ label, value, trend, icon: Icon, className }: StatCardProps) {
  return (
    <GlassCard 
      className={cn("p-6 relative overflow-hidden group", className)}
      whileHover={{ y: -5 }}
      variant="hover"
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 font-light tracking-wide">{label}</p>
          <h3 className="text-3xl font-bold text-white mt-2 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">{value}</h3>
        </div>
        {Icon && (
          <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:text-white group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center">
          <div
            className={cn(
              "flex items-center text-xs font-medium px-2 py-1 rounded-full",
              trend.isPositive
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-rose-400 bg-rose-400/10"
            )}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            )}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      )}
      
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl rounded-full group-hover:opacity-100 opacity-50 transition-opacity" />
    </GlassCard>
  );
}
