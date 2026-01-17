'use client';

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DataTable } from "@/components/DataTable";
import { Activity } from "lucide-react";

interface AnalysisData {
  time_series: { date: string; value: number }[];
}

export default function DataPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/analysis/analysis_summary.json")
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
        <DataTable 
          title="Recent Records"
          columns={[
            { header: "Date", accessorKey: "date" },
            { header: "Value", accessorKey: "value" },
          ]}
          data={data?.time_series || []}
        />
      </div>
    </Layout>
  );
}
