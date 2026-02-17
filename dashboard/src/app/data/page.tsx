'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { Activity, Database } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import ReactMarkdown from "react-markdown";
import { DataTable } from "@/components/DataTable";

interface MetricData {
  label: string;
  value: string;
  unit?: string;
  description?: string;
  variant?: string;
  icon?: string;
}

interface ContentBlock {
  order: number;
  type: "text" | "stats" | "chart" | "table";
  size?: "full" | "half";
  variant?: string;
  title: string;
  description: string;
  metrics?: MetricData[];
  columns?: { header: string; accessorKey: string }[];
  data?: any[];
}

export default function DataPage() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const basePath = getBasePath();
      try {
        setLoading(true);

        // Fetch manifest.json to get list of TOML files
        const res = await fetch(`${basePath}/data/data/manifest.json`);
        if (!res.ok) {
          console.warn("No manifest.json found for data page");
          setContentBlocks([]);
          setLoading(false);
          return;
        }

        const { files } = await res.json();

        if (!files || files.length === 0) {
            console.warn("No data files found.");
            setContentBlocks([]);
            return;
        }

        // Load each TOML file
        const blocks: ContentBlock[] = [];

        for (const file of files) {
            try {
                const config = await fetchToml(`${basePath}${file.path}`);

                if (config) {
                    blocks.push(config as unknown as ContentBlock);
                }
            } catch (e) {
                console.error(`Failed to load ${file.name}:`, e);
            }
        }

        // Sort by order field (ascending)
        blocks.sort((a, b) => (a.order || 0) - (b.order || 0));

        setContentBlocks(blocks);

      } catch (err) {
        console.error("Error loading data page content:", err);
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
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-white">Dataset Documentation</h2>
          </div>
        </ScrollReveal>

        {contentBlocks.length === 0 ? (
           <div className="text-center text-gray-400 py-10">
             No data documentation available. Run the cleaning notebook to generate dataset information.
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {contentBlocks.map((block, index) => (
                <ScrollReveal
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.1}
                  className={block.size === 'full' ? "lg:col-span-2" : ""}
                >
                   {block.type === 'text' && (
                     <GlassCard className="p-6">
                       <h3 className="text-xl font-semibold text-white mb-2">{block.title}</h3>
                       <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-primary prose-strong:text-white prose-li:text-white/80">
                         <ReactMarkdown>{block.description}</ReactMarkdown>
                       </div>
                     </GlassCard>
                   )}

                   {block.type === 'stats' && block.metrics && (
                     <GlassCard className="p-6">
                       <h3 className="text-xl font-semibold text-white mb-4">{block.title}</h3>
                       {block.description && (
                         <p className="text-white/60 text-sm mb-6">{block.description}</p>
                       )}
                       <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                         {block.metrics.map((metric, idx) => (
                           <StaggerItem key={idx} index={idx}>
                             <StatCard
                               label={metric.label}
                               value={metric.value}
                               unit={metric.unit}
                               description={metric.description}
                               icon={metric.icon}
                             />
                           </StaggerItem>
                         ))}
                       </StaggerContainer>
                     </GlassCard>
                   )}

                   {block.type === 'table' && block.data && block.columns && (
                     <DataTable 
                        title={block.title}
                        data={block.data}
                        columns={block.columns as any}
                     />
                   )}
                </ScrollReveal>
             ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
