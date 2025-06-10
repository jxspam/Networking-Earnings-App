import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import EnhancedDashboard from "@/pages/EnhancedDashboard";
import DisputeResolution from "@/pages/DisputeResolution";
import Campaigns from "@/pages/Campaigns";
import CreateOffer from "@/pages/CreateOffer";
import AdminOverview from "@/pages/AdminOverview";
import Settings from "@/pages/Settings";
import MyNetwork from "@/pages/MyNetwork";
import ShareReferral from "@/pages/ShareReferral";
import ReferralHistory from "@/pages/ReferralHistory";
import Earnings from "@/pages/Earnings";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        <Route path="/" component={EnhancedDashboard} />
        <Route path="/dashboard" component={EnhancedDashboard} />
        <Route path="/network" component={MyNetwork} />
        <Route path="/share-referral" component={ShareReferral} />
        <Route path="/referral-history" component={ReferralHistory} />
        <Route path="/dispute-resolution" component={DisputeResolution} />
        <Route path="/earnings" component={Earnings} />
        <Route path="/analytics" component={AdminOverview} />
        <Route path="/campaigns" component={Campaigns} />
        <Route path="/create-offer" component={CreateOffer} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Layout>
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
