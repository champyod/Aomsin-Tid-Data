"use client";

import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollGlassCard } from "@/components/ui/ScrollGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TechTicker } from "@/components/ui/TechTicker";
import { 
    Database, 
    Server, 
    Cpu, 
    BarChart2,
    Bot,
    ArrowUpRight
} from "lucide-react";

export default function CreditsPage() {
  const contributors = [
    {
      name: "ก้องภพ รักษาธรรม",
      id: "10",
      role: "Data Analysis",
      icon: BarChart2,
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
        {/* Dataset Source */}
        <ScrollGlassCard direction="up" delay={0.1} className="p-8" variant="hover">
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
        </ScrollGlassCard>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((member, index) => (
                <ScrollGlassCard 
                    key={member.id} 
                    direction="up" 
                    delay={0.2 + (index * 0.1)} 
                    className="p-6 flex flex-col h-full" 
                    variant="hover"
                >
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
                </ScrollGlassCard>
            ))}
        </div>

        {/* Tech Stack Tickers */}
        <ScrollReveal direction="up" delay={0.4}>
        <div className="space-y-6 pt-12 border-t border-white/5">
            <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 pl-4 flex items-center gap-2">
                    <img className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="" />
                    Python & Data Science Stack
                </h3>
                <TechTicker 
                    speed={30}
                    direction="left"
                    fallbackIcon="python"
                    items={[
                        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                        { name: "uv", icon: "https://docs.astral.sh/uv/assets/logo-letter-dark.svg" },
                        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                        { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                        { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
                        { name: "SciPy", icon: "https://raw.githubusercontent.com/scipy/scipy/main/doc/source/_static/logo.svg" },
                        { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
                        { name: "Seaborn", icon: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg" },
                        { name: "Polars", icon: "https://raw.githubusercontent.com/pola-rs/polars-static/master/logos/polars-logo-dark-medium.png" },
                        { name: "Plotly", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg" },
                        { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
                        { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
                    ]}
                />
            </div>
            
            <div>
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 pl-4 flex items-center gap-2">
                     <img className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" />
                     Web & Dashboard Stack
                </h3>
                <TechTicker 
                    speed={35}
                    direction="right"
                    fallbackIcon="web"
                    items={[
                        { name: "Next.js 16", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                        { name: "React 19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                        { name: "Tailwind CSS 4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                        { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
                        { name: "Recharts", icon: "https://recharts.org/favicon.ico" },
                        { name: "Lucide", icon: "https://lucide.dev/logo.dark.svg" },
                        { name: "Bun", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg" },
                    ]}
                />
            </div>
        </div>
        </ScrollReveal>

        {/* AI Tools Credit */}
        <ScrollReveal direction="up" delay={0.5}>
        <div className="pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 text-gray-500 text-sm font-light">
                <Bot className="w-4 h-4 text-gray-600" />
                <p>Built with assistance from <span className="text-gray-400">GitHub Copilot</span>, <span className="text-gray-400">Claude</span>, and <span className="text-gray-400">Gemini</span>.</p>
            </div>
        </div>
        </ScrollReveal>
      </div>
    </Layout>
  );
}

