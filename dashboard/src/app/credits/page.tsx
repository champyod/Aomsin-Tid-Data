"use client";

import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Github, Database, User, Server, Cpu, BarChart } from "lucide-react";

export default function CreditsPage() {
  const contributors = [
    {
      name: "ก้องภพ รักษาธรรม",
      id: "10",
      role: "Data Analysis",
      icon: BarChart,
      description: "Led the exploratory data analysis (EDA), uncovering key trends and insights from the raw car sales data."
    },
    {
      name: "คุณานนต์ ไขเหลาคำ",
      id: "11",
      role: "Modelling & Data Cleaning",
      icon: Cpu,
      description: "Responsible for data preprocessing, cleaning the raw dataset, and developing machine learning models for price prediction."
    },
    {
      name: "ยศกร นวเลิศปัญญา",
      id: "22",
      role: "Infrastructure & Dashboard",
      icon: Server,
      description: "Designed and implemented the dashboard UI, set up the CI/CD infrastructure, and managed data integration."
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h2 className="text-3xl font-bold text-white font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Project Credits
                </h2>
                <p className="text-gray-400 mt-2 font-light">Meet the team behind Aomsin Tid Data</p>
            </div>
        </div>

        {/* Dataset Source */}
        <GlassCard className="p-8" variant="hover">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                    <Database className="w-6 h-6" />
                </div>
                <div>
                     <h3 className="text-xl font-bold text-white mb-2">Dataset Source</h3>
                     <p className="text-gray-300 leading-relaxed font-light mb-4">
                        We utilized the <strong>Raw Car Sales Data Set</strong> from Kaggle. This comprehensive dataset serves as the foundation for our analysis and modeling.
                     </p>
                     <a 
                        href="https://www.kaggle.com/datasets/yukeshgk/raw-car-sales-data-set?select=Sales.csv" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                     >
                        View on Kaggle
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                     </a>
                </div>
            </div>
        </GlassCard>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((member) => (
                <GlassCard key={member.id} className="p-6 flex flex-col h-full" variant="hover">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-xl text-primary">
                            <member.icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-400 border border-white/5">
                            ID: {member.id}
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1 font-display">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                            {member.description}
                        </p>
                    </div>
                </GlassCard>
            ))}
        </div>

        {/* Tech Stack Tickers */}
        <div className="space-y-4 pt-8 border-t border-white/5">
            <h3 className="text-xl font-bold text-white mb-4 px-2">Technology Stack</h3>
            
            <TechTicker 
                label="Python & Data"
                items={["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter", "Kaggle API"]}
                direction="left"
            />
            
            <TechTicker 
                label="Web & Dashboard"
                items={["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "Lucide React", "Bun", "Glassmorphism"]}
                direction="right"
            />
        </div>
      </div>
    </Layout>
  );
}

import { ArrowUpRight } from "lucide-react";
import { TechTicker } from "@/components/ui/TechTicker";
