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

interface ModelData {
  model_name: string;
  accuracy: number;
  r2_score: number;
  feature_importance: { feature: string; importance: number }[];
}

export default function ModelingPage() {
  const [data, setData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/modeling/model_metrics.json")
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Model Performance</h2>
          <div className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-mono border border-primary/20">
            {data?.model_name || "No Model Loaded"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Feature Importance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data?.feature_importance || []} margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="feature" type="category" stroke="#9ca3af" width={100} />
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", borderRadius: "8px" }} />
                  <Bar dataKey="importance" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-sm text-gray-400">Accuracy</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{((data?.accuracy || 0) * 100).toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-sm text-gray-400">R² Score</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{((data?.r2_score || 0) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
