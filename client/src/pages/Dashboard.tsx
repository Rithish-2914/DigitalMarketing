import { useGenerations } from "@/hooks/use-generations";
import { Sidebar } from "@/components/Sidebar";
import { GenerationCard } from "@/components/GenerationCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: generations, isLoading } = useGenerations();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-white mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your marketing generation pipeline.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search history..." 
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            <Button variant="outline" className="gap-2 border-border bg-card hover:bg-white/5">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Link href="/content">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 gap-2">
                <Plus className="w-4 h-4" /> New Generation
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Generated", value: generations?.length || 0, change: "+12%" },
            { label: "Credits Used", value: "1,240", change: "+5%" },
            { label: "Active Campaigns", value: "8", change: "+2" },
            { label: "Engagement Rate", value: "4.8%", change: "+0.4%" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 border border-white/5 rounded-xl p-6"
            >
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-3xl font-bold font-display text-white">{stat.value}</h4>
                <span className="text-sm text-green-400 font-medium">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Generations Grid */}
        <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
          Recent Activity
          <div className="h-px bg-white/10 flex-1 ml-4" />
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-card/30 animate-pulse" />
            ))}
          </div>
        ) : generations?.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-2xl border border-dashed border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No generations yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
              Start by creating your first AI-powered marketing asset.
            </p>
            <Link href="/content">
              <Button>Create Content</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
            {generations?.map((gen, idx) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <GenerationCard generation={gen} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
