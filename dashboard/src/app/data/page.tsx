'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable } from "@/components/DataTable";
import { Activity, FileSpreadsheet, Download } from "lucide-react";
import { getBasePath } from "@/utils/basePath";

interface AnalysisData {
  total_records: number;
  average_price: number;
  total_stock: number;
  min_price: number;
  max_price: number;
  brand_distribution: { name: string; value: number }[];
  price_trend: { year: string; avg_price: number }[];
  engine_distribution: { name: string; value: number }[];
  status_distribution: { name: string; value: number; percentage: number }[];
  transmission_distribution: { name: string; value: number }[];
  stock_by_brand: { brand: string; stock: number }[];
}

export default function DataPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = getBasePath();
    fetch(`${basePath}/data/analysis/analysis_summary.json`)
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Raw Data Explorer</h2>
            <p className="text-gray-400 text-sm mt-1">Explore aggregated data from the Cars dataset</p>
          </div>
          <a 
            href="https://www.kaggle.com/datasets/yukeshgk/raw-car-sales-data-set?select=Sales.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm border border-primary/20 hover:bg-primary/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download from Kaggle
          </a>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Records</p>
            <p className="text-xl font-bold text-white mt-1">{data?.total_records?.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Price</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">${data?.average_price?.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Stock</p>
            <p className="text-xl font-bold text-blue-400 mt-1">{data?.total_stock?.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Min Price</p>
            <p className="text-xl font-bold text-amber-400 mt-1">${data?.min_price?.toLocaleString()}</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Max Price</p>
            <p className="text-xl font-bold text-purple-400 mt-1">${data?.max_price?.toLocaleString()}</p>
          </GlassCard>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable 
            title="Brand Distribution"
            columns={[
              { header: "Brand", accessorKey: "name" },
              { header: "Car Count", accessorKey: "value" },
            ]}
            data={data?.brand_distribution || []}
          />
          <DataTable 
            title="Engine Type Distribution"
            columns={[
              { header: "Engine Type", accessorKey: "name" },
              { header: "Count", accessorKey: "value" },
            ]}
            data={data?.engine_distribution || []}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable 
            title="Inventory Status"
            columns={[
              { header: "Status", accessorKey: "name" },
              { header: "Count", accessorKey: "value" },
              { header: "Percentage", accessorKey: "percentage", cell: (item: { percentage: number }) => `${item.percentage}%` },
            ]}
            data={data?.status_distribution || []}
          />
          <DataTable 
            title="Transmission Distribution"
            columns={[
              { header: "Transmission", accessorKey: "name" },
              { header: "Count", accessorKey: "value" },
            ]}
            data={data?.transmission_distribution || []}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable 
            title="Stock by Brand"
            columns={[
              { header: "Brand", accessorKey: "brand" },
              { header: "Stock Units", accessorKey: "stock" },
            ]}
            data={data?.stock_by_brand || []}
          />
          <DataTable 
            title="Yearly Price Trend"
            columns={[
              { header: "Year", accessorKey: "year" },
              { header: "Avg Price", accessorKey: "avg_price", cell: (item: { avg_price: number }) => `$${item.avg_price.toLocaleString()}` },
            ]}
            data={data?.price_trend || []}
          />
        </div>

        {/* Dataset Info */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Dataset Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Source</p>
              <p className="text-white mt-1">Kaggle - Raw Car Sales Dataset</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Files</p>
              <p className="text-white mt-1">Cars.csv, Customers.csv, Sales.csv</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Columns (Cars)</p>
              <p className="text-white mt-1 font-mono text-xs">Car_ID, Brand, Model, Year, Color, Engine_Type, Transmission, Price, Quantity_In_Stock, Status</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
}
