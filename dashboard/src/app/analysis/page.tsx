'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

interface AnalysisData {
  price_trend: { year: string; avg_price: number }[];
}

export default function AnalysisPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/analysis/analysis_summary.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center text-primary">
          <Activity className="w-10 h-10 animate-pulse" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-white">Detailed Analysis</h2>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Average Price per Year</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.price_trend || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  cursor={{fill: '#ffffff10'}} 
                  contentStyle={{ backgroundColor: "#18181b", borderRadius: "8px" }} 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Avg Price"]}
                />
                <Bar dataKey="avg_price" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
