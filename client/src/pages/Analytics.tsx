import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { useGenerations } from "@/hooks/use-generations";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Loader2 } from "lucide-react";

export default function Analytics() {
  const { data: generations, isLoading } = useGenerations();

  // Mock data simulation based on real counts if available, otherwise static for visual
  // In a real app, we'd aggregate `generations` by date/type.
  
  const activityData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 18 },
    { name: "Wed", value: 15 },
    { name: "Thu", value: 25 },
    { name: "Fri", value: 32 },
    { name: "Sat", value: 10 },
    { name: "Sun", value: 8 },
  ];

  const typeDistribution = [
    { name: "Social", value: 35, color: "#ec4899" }, // pink
    { name: "SEO", value: 20, color: "#60a5fa" }, // blue
    { name: "Email", value: 15, color: "#34d399" }, // emerald
    { name: "Ads", value: 30, color: "#fb923c" }, // orange
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-display text-white mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Performance metrics for your generated content.
          </p>
        </header>

        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Activity Chart */}
            <Card className="col-span-1 lg:col-span-2 glass-panel p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Generation Activity</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9D7BFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9D7BFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9D7BFF" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Type Distribution */}
            <Card className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Content Mix</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeDistribution} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      width={60}
                    />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Performance Stats */}
            <Card className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Top Performing Keywords</h3>
              <div className="space-y-4">
                {[
                  { word: "AI Marketing", score: 98 },
                  { word: "Growth Hacking", score: 85 },
                  { word: "SEO Strategies", score: 72 },
                  { word: "Social Trends", score: 64 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-300">#{item.word}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all duration-500" 
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
