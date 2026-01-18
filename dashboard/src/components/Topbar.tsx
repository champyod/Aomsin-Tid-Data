"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, ExternalLink } from "lucide-react";

const REPO_URL = "https://github.com/champyod/Aomsin-Tid-Data";

export function Topbar() {
  const pathname = usePathname();
  
  const getBreadcrumbs = () => {
    // 1. Handle root path
    if (pathname === "/") return ["Overview"];

    // 2. Split path into segments
    const segments = pathname.split("/").filter(Boolean);

    // 3. Map segments to formatted titles
    return segments.map(segment => {
      // Decode URI components (e.g. "my%20page" -> "my page")
      const decoded = decodeURIComponent(segment);
      
      // Handle special cases or generic formatting
      // You can add a map here if needed, e.g. { "api": "API" }
      const customTitles: Record<string, string> = {
        "api": "API",
        "ui": "UI",
        "faq": "FAQ"
      };

      if (customTitles[decoded.toLowerCase()]) {
        return customTitles[decoded.toLowerCase()];
      }

      // Default: Capitalize first letter of each word
      return decoded
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className="hidden lg:block fixed top-4 z-50"
      style={{
        // Center in content area: start at sidebar width, configurable via CSS variable
        // Uses --sidebar-width if defined; falls back to 18rem to preserve current behavior
        left: "calc(var(--sidebar-width, 18rem) + 1rem)", // sidebar + padding
        right: "1rem",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/10">
        {/* Left: Project Name */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-white/80">
            Aomsin Tid Data
          </span>
          <span className="text-white/30">/</span>
          
          {/* Dynamic Breadcrumbs */}
          <div className="flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/30">/</span>}
                <span className={`text-sm font-semibold ${index === breadcrumbs.length - 1 ? "text-white" : "text-white/60"}`}>
                  {crumb}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-white/70 hover:text-white group"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </header>
  );
}
