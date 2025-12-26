import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  PenTool, 
  Share2, 
  Megaphone, 
  Mail, 
  PieChart, 
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "SEO Audit", icon: Zap, href: "/seo" },
  { label: "Content Writer", icon: PenTool, href: "/content" },
  { label: "Social Media", icon: Share2, href: "/social" },
  { label: "Ad Campaigns", icon: Megaphone, href: "/ads" },
  { label: "Email Marketing", icon: Mail, href: "/email" },
  { label: "Analytics", icon: PieChart, href: "/analytics" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-card border-r border-border/50 flex flex-col z-50">
      <div className="p-6 border-b border-border/50">
        <h1 className="text-xl font-bold font-display flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-white">Nexus<span className="text-primary">AI</span></span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3 mt-2">
          Pipeline
        </div>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <div 
              className={cn(
                "sidebar-link cursor-pointer",
                location === item.href && "sidebar-link-active"
              )}
            >
              <item.icon className={cn("w-5 h-5", location === item.href ? "text-primary" : "text-muted-foreground")} />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-white">System Operational</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI Models ready for generation tasks.
          </p>
        </div>
      </div>
    </aside>
  );
}
