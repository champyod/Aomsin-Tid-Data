import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  // We don't need usePathname or navItems here anymore as they moved to Sidebar
  
  return (
    <div className="flex min-h-screen font-sans text-gray-100 bg-transparent">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
           {children}
        </div>
      </main>
    </div>
  );
}
