import { Generation } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  Megaphone, 
  Mail, 
  Share2, 
  PenTool, 
  Search,
  ExternalLink,
  Copy,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const TYPE_CONFIG = {
  seo: { icon: Search, color: "text-blue-400", bg: "bg-blue-400/10", label: "SEO Audit" },
  content: { icon: PenTool, color: "text-purple-400", bg: "bg-purple-400/10", label: "Blog Content" },
  social: { icon: Share2, color: "text-pink-400", bg: "bg-pink-400/10", label: "Social Post" },
  ad: { icon: Megaphone, color: "text-orange-400", bg: "bg-orange-400/10", label: "Ad Creative" },
  email: { icon: Mail, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Email Campaign" },
};

export function GenerationCard({ generation }: { generation: Generation }) {
  const [copied, setCopied] = useState(false);
  
  // Safe type check
  const type = generation.type as keyof typeof TYPE_CONFIG;
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.content;
  const Icon = config.icon;

  const handleCopy = () => {
    // In a real app, this would extract the text content properly based on JSON structure
    const contentText = JSON.stringify(generation.content, null, 2);
    navigator.clipboard.writeText(contentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="glass-panel overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-white">{config.label}</h3>
              <p className="text-xs text-muted-foreground">
                {generation.createdAt ? formatDistanceToNow(new Date(generation.createdAt), { addSuffix: true }) : 'Just now'}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-black/20 border-white/10 text-xs font-normal">
            {type.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground line-clamp-2 italic">
            "{generation.prompt}"
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 border border-white/5 font-mono text-sm text-gray-300 overflow-hidden relative group-hover:bg-black/40 transition-colors">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="h-8 w-8 hover:bg-white/10"
                 onClick={handleCopy}
               >
                 {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
               </Button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm max-h-[150px] overflow-y-auto custom-scrollbar">
              {/* Simple render of content - ideally this would be a specialized renderer per type */}
              {typeof generation.content === 'string' 
                ? generation.content 
                : JSON.stringify(generation.content, null, 2).replace(/[{}"]/g, '')}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">ID: #{generation.id.toString().padStart(4, '0')}</span>
        <Button variant="link" className="text-primary text-xs h-auto p-0 hover:text-accent">
          View Full Details <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
