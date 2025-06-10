import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCampaignSchema, insertDisputeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Leads routes
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLead(parseInt(req.params.id));
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ message: "Invalid lead data" });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.updateLead(parseInt(req.params.id), req.body);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // Campaigns routes
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(parseInt(req.params.id));
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(400).json({ message: "Invalid campaign data" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.updateCampaign(parseInt(req.params.id), req.body);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  // Disputes routes
  app.get("/api/disputes", async (req, res) => {
    try {
      const disputes = await storage.getDisputes();
      res.json(disputes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch disputes" });
    }
  });

  app.get("/api/disputes/:id", async (req, res) => {
    try {
      const dispute = await storage.getDispute(parseInt(req.params.id));
      if (!dispute) {
        return res.status(404).json({ message: "Dispute not found" });
      }
      res.json(dispute);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dispute" });
    }
  });

  app.post("/api/disputes", async (req, res) => {
    try {
      const validatedData = insertDisputeSchema.parse(req.body);
      const dispute = await storage.createDispute(validatedData);
      res.status(201).json(dispute);
    } catch (error) {
      res.status(400).json({ message: "Invalid dispute data" });
    }
  });

  app.patch("/api/disputes/:id", async (req, res) => {
    try {
      const dispute = await storage.updateDispute(parseInt(req.params.id), req.body);
      if (!dispute) {
        return res.status(404).json({ message: "Dispute not found" });
      }
      res.json(dispute);
    } catch (error) {
      res.status(500).json({ message: "Failed to update dispute" });
    }
  });

  // Earnings routes
  app.get("/api/earnings", async (req, res) => {
    try {
      const earnings = await storage.getEarnings();
      res.json(earnings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch earnings" });
    }
  });

  app.get("/api/earnings/referrer/:referrerId", async (req, res) => {
    try {
      const earnings = await storage.getEarningsByReferrer(parseInt(req.params.referrerId));
      res.json(earnings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch referrer earnings" });
    }
  });

  // Activities routes
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/overview", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const campaigns = await storage.getCampaigns();
      const earnings = await storage.getEarnings();
      
      const totalReferrals = leads.length;
      const approvedLeads = leads.filter(lead => lead.status === "approved").length;
      const conversionRate = totalReferrals > 0 ? (approvedLeads / totalReferrals * 100).toFixed(1) : "0";
      const totalPayouts = earnings.reduce((sum, earning) => sum + parseFloat(earning.amount || "0"), 0);

      res.json({
        totalReferrals,
        conversionRate: parseFloat(conversionRate),
        totalPayouts,
        activeCampaigns: campaigns.filter(c => c.status === "active").length,
        pendingDisputes: (await storage.getDisputesByStatus("pending")).length,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
