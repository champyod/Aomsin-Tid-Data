'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Activity, Brain, Settings } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";

interface ModelData {
  model_name: string;
  model_type: string;
  accuracy: number;
  r2_score: number;
  mse: number;
  rmse: number;
  mae: number;
  training_samples: number;
  testing_samples: number;
  training_date: string;
  hyperparameters: {
    n_estimators: number;
    max_depth: number;
    learning_rate: number;
    subsample: number;
  };
}

export default function ModelingPage() {
  const [data, setData] = useState<ModelData | null>(null);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = getBasePath();
        
        // 1. Fetch Metrics
        const metrics = await fetchToml(`${basePath}/data/modeling/model_metrics.toml`);
        if (metrics) {
            setData(metrics as unknown as ModelData);
        }

        // 2. Fetch Charts
        const realCharts = await fetchToml(`${basePath}/data/modeling/modeling_charts.toml`);
        if (realCharts && (realCharts as any).charts) {
            setCharts((realCharts as any).charts as ChartConfig[]);
        } else {
            console.warn("Real modeling charts missing. Loading Demo.");
            const demoCharts = await fetchToml(`${basePath}/data/modeling/demo_modeling_charts.toml`);
            if (demoCharts && (demoCharts as any).charts) {
                setCharts((demoCharts as any).charts as ChartConfig[]);
            }
        }
      } catch (err) {
        console.error("Failed to load modeling data", err);
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
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{data?.model_name || "Model Performance"}</h2>
            <p className="text-gray-400 text-sm mt-1">Trained on {data?.training_date}</p>
          </div>
          <div className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-mono border border-primary/20 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            {data?.model_type || "Unknown Model"}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScrollGlassCard direction="up" delay={0.1} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{((data?.accuracy || 0) * 100).toFixed(1)}%</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.2} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">R² Score</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{((data?.r2_score || 0) * 100).toFixed(1)}%</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.3} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">RMSE</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">${data?.rmse?.toLocaleString()}</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.4} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">MAE</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">${data?.mae?.toLocaleString()}</p>
          </ScrollGlassCard>
        </div>

        {/* Dynamic Charts Grid */}
        {charts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {charts.map((config, index) => (
                <ScrollReveal 
                  key={index} 
                  direction={index % 2 === 0 ? "left" : "right"} 
                  delay={0.1 * (index + 1)}
                  className="w-full"
                >
                   <UniversalChart config={config} />
                </ScrollReveal>
             ))}
          </div>
        ) : (
            <div className="text-center text-gray-400 py-10">
                No modeling chart data available.
            </div>
        )}

        {/* Hyperparameters */}
        <ScrollGlassCard direction="up" delay={0.5} className="p-6" variant="hover">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Model Hyperparameters</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400">n_estimators</p>
              <p className="text-lg font-mono text-white">{data?.hyperparameters?.n_estimators}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400">max_depth</p>
              <p className="text-lg font-mono text-white">{data?.hyperparameters?.max_depth}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400">learning_rate</p>
              <p className="text-lg font-mono text-white">{data?.hyperparameters?.learning_rate}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400">subsample</p>
              <p className="text-lg font-mono text-white">{data?.hyperparameters?.subsample}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span>📊 Training: {data?.training_samples} samples</span>
            <span>🧪 Testing: {data?.testing_samples} samples</span>
          </div>
        </ScrollGlassCard>
      </div>
    </Layout>
  );
}
