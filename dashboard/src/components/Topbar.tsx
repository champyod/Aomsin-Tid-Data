"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, ExternalLink } from "lucide-react";

const REPO_URL = "https://github.com/champyod/Aomsin-Tid-Data";

export function Topbar() {
  const pathname = usePathname();
  
  const getBreadcrumbs = () => {
    // 1. Always start with Home/Overview if you want the root to be clickable too? 
    // The current design has "Aomsin Tid Data" separate. Let's keep that non-clickable or separate for now unless requested.
    // The user asked for "navigate link".
    
    // 2. Split path into segments
    const segments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    // 3. Map segments to formatted titles and hrefs
    return segments.map(segment => {
      currentPath += `/${segment}`;
      const href = currentPath;
      
      // Decode URI components
      const decoded = decodeURIComponent(segment);
      
      // Handle special cases
      const customTitles: Record<string, string> = {
        "api": "API",
        "ui": "UI",
        "faq": "FAQ"
      };

      let title = decoded;
      if (customTitles[decoded.toLowerCase()]) {
        title = customTitles[decoded.toLowerCase()];
      } else {
        // Default: Capitalize first letter of each word
        title = decoded
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      
      return { title, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className="hidden lg:block fixed top-4 z-50 select-none"
      style={{
        left: "calc(var(--sidebar-width, 18rem) + 1rem)",
        right: "1rem",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/10">
        {/* Left: Project Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Aomsin Tid Data
            </span>
          </Link>
          <span className="text-white/30">/</span>
          
          {/* Dynamic Breadcrumbs */}
          <div className="flex items-center gap-2">
            {pathname === "/" ? (
               <span className="text-sm font-semibold text-white">Overview</span>
            ) : (
                breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center gap-2">
                    {index > 0 && <span className="text-white/30">/</span>}
                    <Link 
                      href={crumb.href}
                      className={`text-sm font-semibold transition-colors hover:text-white ${
                        index === breadcrumbs.length - 1 ? "text-white cursor-default" : "text-white/60"
                      }`}
                      aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                    >
                      {crumb.title}
                    </Link>
                  </div>
                ))
            )}
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
