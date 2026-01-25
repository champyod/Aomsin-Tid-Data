'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DataTable } from "@/components/DataTable";
import { Activity, FileSpreadsheet, Download } from "lucide-react";
import { getBasePath } from "@/utils/basePath";
import { fetchToml } from "@/utils/tomlLoader";
import { UniversalChart, ChartConfig } from "@/components/UniversalChart";

interface ProjectInfo {
  title: string;
  description: string;
  dataset_name: string;
  dataset_source_link: string;
  dataset_files: string;
  dataset_columns: string;
}

interface AnalysisData {
  metrics: {
    total_records: number;
    total_stock: number;
    average_price: number;
    min_price: number;
    max_price: number;
  };
  project_info: ProjectInfo;
  brand_distribution: { name: string; value: number }[];
  price_trend: { year: string; avg_price: number }[];
  engine_distribution: { name: string; value: number }[];
  status_distribution: { name: string; value: number; percentage: number }[];
  transmission_distribution: { name: string; value: number }[];
  stock_by_brand: { brand: string; stock: number }[];
}

export default function DataPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = getBasePath();
        
        // 1. Fetch Metrics (Real)
        const metrics = await fetchToml(`${basePath}/data/analysis/analysis_summary.toml`);
        if (metrics) {
            setData(metrics as unknown as AnalysisData);
        }

        // 2. Fetch Charts (Real -> Fallback to Demo)
        const realCharts = await fetchToml(`${basePath}/data/analysis/data_charts.toml`);
        if (realCharts && (realCharts as any).charts) {
            setCharts((realCharts as any).charts as ChartConfig[]);
        } else {
            console.warn("Real data charts missing. Loading Demo.");
            const demoCharts = await fetchToml(`${basePath}/data/analysis/demo_data_charts.toml`);
            if (demoCharts && (demoCharts as any).charts) {
                setCharts((demoCharts as any).charts as ChartConfig[]);
            }
        }
      } catch (err) {
        console.error("Failed to load data page content", err);
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

  const { metrics, project_info } = data || {};

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Raw Data Explorer</h2>
            <p className="text-gray-400 text-sm mt-1">Explore aggregated data from the {project_info?.dataset_name || "dataset"}</p>
          </div>
          {project_info?.dataset_source_link && (
            <a 
              href={project_info.dataset_source_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm border border-primary/20 hover:bg-primary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Source
            </a>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ScrollGlassCard direction="up" delay={0.1} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Records</p>
            <p className="text-xl font-bold text-white mt-1">{metrics?.total_records?.toLocaleString()}</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.2} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Price</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">${metrics?.average_price?.toLocaleString()}</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.3} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Stock</p>
            <p className="text-xl font-bold text-blue-400 mt-1">{metrics?.total_stock?.toLocaleString()}</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.4} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Min Price</p>
            <p className="text-xl font-bold text-amber-400 mt-1">${metrics?.min_price?.toLocaleString()}</p>
          </ScrollGlassCard>
          <ScrollGlassCard direction="up" delay={0.5} className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Max Price</p>
            <p className="text-xl font-bold text-purple-400 mt-1">${metrics?.max_price?.toLocaleString()}</p>
          </ScrollGlassCard>
        </div>

        {/* Dynamic Charts Grid */}
        {charts.length > 0 && (
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
        )}

        {/* Detailed Tables */}
        <h3 className="text-xl font-bold text-white mt-8 mb-4">Detailed Tables</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal direction="left" delay={0.1}>
            <DataTable 
              title="Stock by Brand"
              columns={[
                { header: "Brand", accessorKey: "brand" },
                { header: "Stock Units", accessorKey: "stock" },
              ]}
              data={data?.stock_by_brand || []}
            />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <DataTable 
              title="Yearly Price Trend"
              columns={[
                { header: "Year", accessorKey: "year" },
                { header: "Avg Price", accessorKey: "avg_price", cell: (item: { avg_price: number }) => `$${item.avg_price.toLocaleString()}` },
              ]}
              data={data?.price_trend || []}
            />
          </ScrollReveal>
        </div>

        {/* Dataset Info */}
        <ScrollGlassCard direction="up" delay={0.3} className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Dataset Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Source</p>
              <p className="text-white mt-1">{project_info?.dataset_name || "Custom Data"}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Files</p>
              <p className="text-white mt-1">{project_info?.dataset_files || "-"}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Columns</p>
              <p className="text-white mt-1 font-mono text-xs break-words">{project_info?.dataset_columns || "Dynamic"}</p>
            </div>
          </div>
        </ScrollGlassCard>
      </div>
    </Layout>
  );
}
