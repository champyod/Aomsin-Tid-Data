'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Activity, Database, Brain } from "lucide-react";

interface AnalysisData {
  total_records: number;
  average_value: number;
  distributions: { name: string; value: number }[];
  time_series: { date: string; value: number }[];
}

interface ModelData {
  model_name: string;
  accuracy: number;
  f1_score: number;
  confusion_matrix: number[][];
  feature_importance: { feature: string; importance: number }[];
}

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analysisRes, modelRes] = await Promise.all([
          fetch("/data/analysis/analysis_summary.json"),
          fetch("/data/modeling/model_metrics.json"),
        ]);

        if (analysisRes.ok) setAnalysisData(await analysisRes.json());
        if (modelRes.ok) setModelData(await modelRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Records"
            value={analysisData?.total_records?.toLocaleString() || "0"}
            icon={Database}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            label="Model Accuracy"
            value={`${((modelData?.accuracy || 0) * 100).toFixed(1)}%`}
            icon={Brain}
            trend={{ value: 2.5, isPositive: true }}
          />
          <StatCard
            label="Average Value"
            value={analysisData?.average_value?.toFixed(2) || "0"}
            icon={Activity}
          />
          <StatCard
            label="Active Models"
            value="1"
            icon={Brain}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Trends Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisData?.time_series || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #ffffff20", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysisData?.distributions || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(analysisData?.distributions || []).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", borderRadius: "8px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
