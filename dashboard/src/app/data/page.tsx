'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { Activity } from "lucide-react";

interface AnalysisData {
  brand_distribution: { name: string; value: number }[];
  price_trend: { year: string; avg_price: number }[];
}

import { getBasePath } from "@/utils/basePath";

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
        <h2 className="text-2xl font-bold text-white">Raw Data Explorer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataTable 
              title="Brand Distribution"
              columns={[
                { header: "Brand", accessorKey: "name" },
                { header: "Count", accessorKey: "value" },
              ]}
              data={data?.brand_distribution || []}
            />
            <DataTable 
              title="Yearly Price Trend"
              columns={[
                { header: "Year", accessorKey: "year" },
                { header: "Avg Price", accessorKey: "avg_price" },
              ]}
              data={data?.price_trend || []}
            />
        </div>
      </div>
    </Layout>
  );
}
