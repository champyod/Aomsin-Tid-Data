import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen font-sans text-gray-100 bg-transparent">
      <Topbar />
      <Sidebar />

      {/* Main Content - lg:pt-24 reserves space for floating topbar */}
      <main className="flex-1 lg:ml-72 min-h-screen p-4 lg:p-8 lg:pt-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
           {children}
        </div>
      </main>
    </div>
  );
}
