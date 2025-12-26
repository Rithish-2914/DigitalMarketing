import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Dashboard from "@/pages/Dashboard";
import Generator from "@/pages/Generator";
import Analytics from "@/pages/Analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      
      {/* Dynamic routes for different generator types using the same component */}
      <Route path="/seo">
        {() => <Generator pageType="seo" />}
      </Route>
      <Route path="/content">
        {() => <Generator pageType="content" />}
      </Route>
      <Route path="/social">
        {() => <Generator pageType="social" />}
      </Route>
      <Route path="/ads">
        {() => <Generator pageType="ads" />}
      </Route>
      <Route path="/email">
        {() => <Generator pageType="email" />}
      </Route>

      <Route path="/analytics" component={Analytics} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
