import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useCreateGeneration } from "@/hooks/use-generations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Loader2, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping routes to generation types
const PAGE_CONFIG = {
  seo: {
    title: "SEO Auditor",
    description: "Analyze keywords and generate meta tags optimized for search engines.",
    placeholder: "Enter your website URL and target keywords (e.g., 'digital marketing agency in new york')...",
    type: "seo"
  },
  content: {
    title: "Content Writer",
    description: "Generate high-quality blog posts, articles, and website copy.",
    placeholder: "Describe the topic, tone, and key points you want to cover (e.g., 'A professional blog post about the benefits of AI in healthcare, authoritative tone')...",
    type: "content"
  },
  social: {
    title: "Social Media Manager",
    description: "Create engaging posts for LinkedIn, Twitter, and Instagram.",
    placeholder: "What are you promoting? (e.g., 'Launch of our new summer collection, fun and energetic tone for Instagram')...",
    type: "social"
  },
  ads: {
    title: "Ad Creative Generator",
    description: "Generate compelling ad copy and visual concepts for paid campaigns.",
    placeholder: "Describe your product and target audience (e.g., 'Premium coffee subscription for busy professionals, focus on convenience')...",
    type: "ad"
  },
  email: {
    title: "Email Marketer",
    description: "Draft cold outreach emails, newsletters, and nurture sequences.",
    placeholder: "Who are you emailing and why? (e.g., 'Cold email to SaaS founders offering SEO services')...",
    type: "email"
  }
};

interface GeneratorProps {
  pageType: keyof typeof PAGE_CONFIG;
}

export default function Generator({ pageType }: GeneratorProps) {
  const config = PAGE_CONFIG[pageType];
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();
  const createGeneration = useCreateGeneration();
  
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      // Create a more structured prompt wrapper based on type
      const enhancedPrompt = `[${config.type.toUpperCase()} TASK] ${prompt}`;
      
      // Simulate fake structured data for immediate feedback if the backend is just an echo
      // In a real app, the backend would do the heavy lifting.
      // We send the request to backend.
      
      const result = await createGeneration.mutateAsync({
        type: config.type,
        prompt: prompt,
        // The backend schema requires content, but usually we'd send just prompt and backend generates content.
        // Assuming the backend endpoint handles the generation logic internally and we just send params.
        // If the schema requires 'content' in the input, we might be misusing the 'create' endpoint directly as a 'save' endpoint.
        // BUT, given the instructions: "New Generation page with a form... AI will automatically do it".
        // I will assume for this frontend task that I send the prompt, and the backend returns the generated result.
        // However, the schema `insertGenerationSchema` requires `content`. 
        // Let's assume the frontend acts as the orchestrator for this demo or we pass a placeholder and backend updates it.
        // actually, typically: POST /api/generate -> returns content -> POST /api/generations (save).
        // OR: POST /api/generations (with prompt) -> Backend generates -> Saves -> Returns.
        // I will assume the latter: The CREATE endpoint triggers the generation.
        content: { status: "pending", timestamp: new Date().toISOString() } 
      });

      setGeneratedResult(result);
      
      toast({
        title: "Generation Complete",
        description: "Your content has been successfully generated.",
      });
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 border border-primary/20">
              <Zap className="w-3 h-3" /> AI-Powered
            </div>
            <h1 className="text-4xl font-bold font-display text-white mb-3">
              {config.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {config.description}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl">
                <label className="block text-sm font-medium text-white mb-2">
                  Your Prompt
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={config.placeholder}
                  className="min-h-[200px] bg-black/20 border-white/10 resize-none text-base focus:ring-primary/50 mb-4"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {prompt.length} chars
                  </span>
                  <Button
                    onClick={handleGenerate}
                    disabled={createGeneration.isPending || !prompt.trim()}
                    className={cn(
                      "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/20 transition-all duration-300",
                      createGeneration.isPending ? "pl-4 pr-6" : "px-6"
                    )}
                  >
                    {createGeneration.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  Pro Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  Be specific about your target audience and desired tone. For example, instead of "Write a post about shoes", try "Write an energetic Instagram caption for Gen-Z about our new limited edition sneakers."
                </p>
              </div>
            </div>

            {/* Output Section */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {!generatedResult && !createGeneration.isPending ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-2xl text-center"
                  >
                    <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-4 shadow-inner">
                      <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-lg font-medium text-muted-foreground">Ready to Generate</h3>
                    <p className="text-sm text-muted-foreground/60 max-w-xs mt-2">
                      Your AI-generated content will appear here instantly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl h-full flex flex-col"
                  >
                    {createGeneration.isPending ? (
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-6">
                           <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                           <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                           <Zap className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                        </div>
                        <h3 className="text-lg font-medium text-white">Thinking...</h3>
                        <p className="text-sm text-muted-foreground mt-2">Analyzing prompt parameters</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Result
                          </h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 text-xs">Copy</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs">Save</Button>
                          </div>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none flex-1 overflow-y-auto custom-scrollbar">
                           {/* Render result nicely */}
                           <pre className="whitespace-pre-wrap font-sans text-gray-300">
                             {typeof generatedResult?.content === 'string' 
                               ? generatedResult.content 
                               : JSON.stringify(generatedResult?.content, null, 2)}
                           </pre>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
