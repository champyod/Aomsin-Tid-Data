'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Activity } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";

interface ChartsPayload {
  charts: ChartConfig[];
}

export default function AnalysisPage() {
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const basePath = getBasePath();
      try {
        // Fetch Real Charts Config
        // The notebook exports a wrapper: {"charts": [c1, c2, ...]}
        const realData = await fetchToml(`${basePath}/data/analysis/analysis_charts.toml`);
        
        if (realData && (realData as any).charts) {
            setCharts((realData as any).charts as ChartConfig[]);
        } else {
            console.warn("Real analysis charts missing. Attempting fallback.");
            
            // Fallback: Check for demo_chart.toml
            // Note: demo_chart.toml currently contains a SINGLE chart config, not a wrapper "charts".
            const demo = await fetchToml(`${basePath}/data/analysis/demo_chart.toml`);
            if (demo) {
                // Wrap it in a list to satisfy the UI loop
                setCharts([demo as unknown as ChartConfig]);
            }
        }

      } catch (err) {
        console.error("Error loading analysis data:", err);
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
        <ScrollReveal direction="none">
          <h2 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h2>
        </ScrollReveal>
        
        {charts.length === 0 ? (
           <div className="text-center text-gray-400 py-10">
             No chart data available. Run the analysis notebook to generate insights.
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {charts.map((config, index) => (
                <ScrollReveal 
                  key={index} 
                  direction={index % 2 === 0 ? "left" : "right"} 
                  delay={index * 0.1}
                  className={config.type === 'area' || config.type === 'line' || config.type === 'bar' ? "lg:col-span-2" : ""}
                >
                   <UniversalChart config={config} />
                </ScrollReveal>
             ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
