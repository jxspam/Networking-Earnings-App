import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  avatar: text("avatar"),
  role: text("role").notNull().default("referrer"), // referrer, admin, business
  tier: text("tier").default("standard"), // standard, premium
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").references(() => users.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  service: text("service").notNull(),
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected, completed
  businessName: text("business_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  serviceArea: text("service_area").notNull(),
  rewardPerConversion: decimal("reward_per_conversion", { precision: 10, scale: 2 }).notNull(),
  maxBudget: decimal("max_budget", { precision: 10, scale: 2 }).notNull(),
  budgetUsed: decimal("budget_used", { precision: 10, scale: 2 }).default("0"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  postcode: jsonb("postcode"), // {start: string, end: string}
  status: text("status").default("active"), // active, paused, completed
  leads: integer("leads").default(0),
  conversions: integer("conversions").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const disputes = pgTable("disputes", {
  id: serial("id").primaryKey(),
  caseId: text("case_id").notNull().unique(),
  leadId: integer("lead_id").references(() => leads.id),
  businessId: integer("business_id").references(() => users.id),
  referrerId: integer("referrer_id").references(() => users.id),
  businessClaim: text("business_claim").notNull(),
  referrerResponse: text("referrer_response"),
  status: text("status").default("pending"), // pending, approved, rejected, escalated
  decision: text("decision"),
  adminId: integer("admin_id").references(() => users.id),
  adminNotes: text("admin_notes"),
  evidence: jsonb("evidence"), // URLs, documents, etc.
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const earnings = pgTable("earnings", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").references(() => users.id),
  leadId: integer("lead_id").references(() => leads.id),
  campaignId: integer("campaign_id").references(() => campaigns.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // pending, paid, disputed
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // new_referrer, payout_processed, fraud_alert, campaign_milestone, dispute_filed
  title: text("title").notNull(),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  budgetUsed: true,
  leads: true,
  conversions: true,
  createdAt: true,
});

export const insertDisputeSchema = createInsertSchema(disputes).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertEarningSchema = createInsertSchema(earnings).omit({
  id: true,
  paidAt: true,
  createdAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export type InsertDispute = z.infer<typeof insertDisputeSchema>;
export type Dispute = typeof disputes.$inferSelect;

export type InsertEarning = z.infer<typeof insertEarningSchema>;
export type Earning = typeof earnings.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
