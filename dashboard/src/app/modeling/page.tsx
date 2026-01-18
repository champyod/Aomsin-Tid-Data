'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine,
  LineChart,
  Line,
} from "recharts";
import { Activity, Brain, Target, Layers, Settings } from "lucide-react";
import { getBasePath } from "@/utils/basePath";

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
  feature_importance: { feature: string; importance: number }[];
  cross_validation_scores: number[];
  cv_mean: number;
  cv_std: number;
  hyperparameters: {
    n_estimators: number;
    max_depth: number;
    learning_rate: number;
    subsample: number;
  };
  predictions_sample: { actual: number; predicted: number }[];
}

export default function ModelingPage() {
  const [data, setData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = getBasePath();
    fetch(`${basePath}/data/modeling/model_metrics.json`)
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

  const cvData = data?.cross_validation_scores.map((score, i) => ({ fold: `Fold ${i + 1}`, score: score * 100 })) || [];

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Model Performance</h2>
            <p className="text-gray-400 text-sm mt-1">Trained on {data?.training_date}</p>
          </div>
          <div className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-mono border border-primary/20 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            {data?.model_type || "XGBoost"}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{((data?.accuracy || 0) * 100).toFixed(1)}%</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">R² Score</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{((data?.r2_score || 0) * 100).toFixed(1)}%</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">RMSE</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">${data?.rmse?.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">MAE</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">${data?.mae?.toLocaleString()}</p>
          </GlassCard>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feature Importance */}
          <GlassCard className="p-6" variant="hover">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Feature Importance</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data?.feature_importance || []} margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                  <YAxis dataKey="feature" type="category" stroke="#9ca3af" fontSize={11} width={90} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }} 
                    formatter={(value: any) => [`${(Number(value) * 100).toFixed(1)}%`, 'Importance']}
                  />
                  <Bar dataKey="importance" fill="#f5c2e7" radius={[0, 6, 6, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Cross Validation */}
          <GlassCard className="p-6" variant="hover">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Cross-Validation Scores</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cvData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="fold" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[90, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }} 
                    formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Score']}
                  />
                  <ReferenceLine y={(data?.cv_mean || 0) * 100} stroke="#a6e3a1" strokeDasharray="5 5" label={{ value: 'Mean', fill: '#a6e3a1', fontSize: 11 }} />
                  <Bar dataKey="score" fill="#89b4fa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Mean: {((data?.cv_mean || 0) * 100).toFixed(1)}% ± {((data?.cv_std || 0) * 100).toFixed(2)}%
            </p>
          </GlassCard>
        </div>

        {/* Predictions vs Actual */}
        <GlassCard className="p-6" variant="hover">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Predictions vs Actual Prices</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis 
                  type="number" 
                  dataKey="actual" 
                  name="Actual" 
                  stroke="#9ca3af" 
                  fontSize={12} 
                  tickFormatter={(v) => `$${v/1000}k`}
                  label={{ value: 'Actual Price', position: 'bottom', fill: '#9ca3af', fontSize: 11 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="predicted" 
                  name="Predicted" 
                  stroke="#9ca3af" 
                  fontSize={12} 
                  tickFormatter={(v) => `$${v/1000}k`}
                  label={{ value: 'Predicted Price', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: "#1e1e2e", borderRadius: "12px", border: "none", color: "#f3f4f6" }} 
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <ReferenceLine segment={[{ x: 20000, y: 20000 }, { x: 95000, y: 95000 }]} stroke="#a6e3a1" strokeDasharray="5 5" />
                <Scatter name="Predictions" data={data?.predictions_sample || []} fill="#f5c2e7" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Points closer to the diagonal line indicate better predictions
          </p>
        </GlassCard>

        {/* Hyperparameters */}
        <GlassCard className="p-6" variant="hover">
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
        </GlassCard>
      </div>
    </Layout>
  );
}
