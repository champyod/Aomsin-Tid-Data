'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Activity } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";
import { DataTable } from "@/components/DataTable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AnalysisPage() {
  const [items, setItems] = useState<any[]>([]);
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
          setItems([]);
          setLoading(false);
          return;
        }

        const { files } = await res.json();

        if (!files || files.length === 0) {
            console.warn("No analysis files found.");
            setItems([]);
            return;
        }

        // 2. Fetch content for each TOML file
        const loadedItems: any[] = [];

        for (const file of files) {
            try {
                // Using data from manifest if available
                const config = file.data || await fetchToml(`${basePath}${file.path}`);

                if (config) {
                    // Check if it's a wrapper { charts: [...] }
                    if ((config as any).charts) {
                        loadedItems.push(...(config as any).charts);
                    } else {
                        loadedItems.push(config);
                    }
                }
            } catch (e) {
                console.error(`Failed to load ${file.name}:`, e);
            }
        }

        // Sort by order field (ascending)
        loadedItems.sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));

        setItems(loadedItems);

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

        {items.length === 0 ? (
           <div className="text-center text-gray-400 py-10">
             No chart data available. Run the analysis notebook to generate insights.
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {items.map((item, index) => (
                <ScrollReveal
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.1}
                  className={item.size === 'full' ? "lg:col-span-2" : ""}
                >
                   {item.type === 'table' ? (
                     <DataTable
                        title={item.title}
                        data={item.data}
                        columns={item.columns}
                     />
                   ) : item.type === 'text' ? (
                     <GlassCard className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-primary prose-strong:text-white prose-li:text-white/80">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.description}</ReactMarkdown>
                        </div>
                     </GlassCard>
                   ) : (
                     <UniversalChart config={item} />
                   )}
                </ScrollReveal>
             ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
