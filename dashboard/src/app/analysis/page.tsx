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
        setLoading(true);

        // Fetch manifest.json to get list of TOML files
        const res = await fetch(`${basePath}/data/analysis/manifest.json`);
        if (!res.ok) {
          console.warn("No manifest.json found for analysis data");
          setCharts([]);
          setLoading(false);
          return;
        }

        const { files } = await res.json();
        
        if (!files || files.length === 0) {
            console.warn("No analysis files found.");
            setCharts([]);
            return;
        }

        // 2. Fetch content for each TOML file
        const loadedCharts: ChartConfig[] = [];
        
        for (const file of files) {
            try {
                // Using fetchToml to parse the file content
                // Note: file.path from API is relative to public (e.g. /data/analysis/foo.toml)
                const config = await fetchToml(`${basePath}${file.path}`);
                
                if (config) {
                    // Check if it's a wrapper { charts: [...] } or single config
                    if ((config as any).charts) {
                        loadedCharts.push(...(config as any).charts);
                    } else {
                        loadedCharts.push(config as unknown as ChartConfig);
                    }
                }
            } catch (e) {
                console.error(`Failed to load ${file.name}:`, e);
            }
        }
        
        // Sort by order field (ascending)
        loadedCharts.sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));
        
        setCharts(loadedCharts);

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
                  className={config.size === 'full' ? "lg:col-span-2" : ""}
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
