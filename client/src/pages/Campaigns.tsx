import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Plus, Download, Filter, Tag, Laptop, GraduationCap, Heart, TrendingUp, TrendingDown } from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  description: string | null;
  rewardPerConversion: string;
  maxBudget: string;
  budgetUsed: string;
  leads: number;
  conversions: number;
  status: string;
  endDate: string;
}

const campaignIcons: { [key: string]: any } = {
  "Summer Sale": Tag,
  "Tech Product": Laptop,
  "Education": GraduationCap,
  "Wellness": Heart,
};

const campaignColors: { [key: string]: string } = {
  "Summer Sale": "blue",
  "Tech Product": "purple",
  "Education": "green",
  "Wellness": "teal",
};

const chartData = [
  { week: "Week 1", leads: 120, conversions: 45, budget: 800 },
  { week: "Week 2", leads: 150, conversions: 60, budget: 1200 },
  { week: "Week 3", leads: 180, conversions: 72, budget: 1600 },
  { week: "Week 4", leads: 200, conversions: 85, budget: 2000 },
];

const sampleCampaigns = [
  {
    id: 1,
    name: "Summer Sale Referrals",
    endDate: "Jul 31, 2023",
    rewardPerConversion: "25.00",
    maxBudget: "5000.00",
    budgetUsed: "3750.00",
    leads: 124,
    conversions: 50,
    changeLeads: 12,
    changeConversions: 8,
    status: "active"
  },
  {
    id: 2,
    name: "Tech Product Launch",
    endDate: "Sep 15, 2023",
    rewardPerConversion: "40.00",
    maxBudget: "10000.00",
    budgetUsed: "6200.00",
    leads: 95,
    conversions: 38,
    changeLeads: 23,
    changeConversions: -15,
    status: "active"
  },
  {
    id: 3,
    name: "Education Program",
    endDate: "Nov 31, 2023",
    rewardPerConversion: "30.00",
    maxBudget: "15000.00",
    budgetUsed: "8100.00",
    leads: 230,
    conversions: 63,
    changeLeads: 18,
    changeConversions: 9,
    status: "active"
  },
  {
    id: 4,
    name: "Wellness Program",
    endDate: "Sep 30, 2023",
    rewardPerConversion: "35.00",
    maxBudget: "7500.00",
    budgetUsed: "2450.00",
    leads: 145,
    conversions: 70,
    changeLeads: -3,
    changeConversions: 2,
    status: "active"
  }
];

const topPerformingCampaigns = [
  {
    name: "Summer Sale Referrals",
    conversionRate: 40,
    earnings: 1250,
    conversions: 50,
    icon: Tag,
    color: "blue"
  },
  {
    name: "Tech Product Launch",
    conversionRate: 40,
    earnings: 1520,
    conversions: 38,
    icon: Laptop,
    color: "purple"
  },
  {
    name: "Wellness Program",
    conversionRate: 48,
    earnings: 2450,
    conversions: 70,
    icon: Heart,
    color: "teal"
  },
  {
    name: "Education Program",
    conversionRate: 27,
    earnings: 1890,
    conversions: 63,
    icon: GraduationCap,
    color: "green"
  }
];

function formatCurrency(value: string | number) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(numValue);
}

function getCampaignIcon(name: string) {
  const key = Object.keys(campaignIcons).find(k => name.includes(k));
  return key ? campaignIcons[key] : Tag;
}

function getCampaignColor(name: string) {
  const key = Object.keys(campaignColors).find(k => name.includes(k));
  return key ? campaignColors[key] : "blue";
}

export default function Campaigns() {
  const { data: campaigns = [], isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Referral Campaigns</h1>
        </div>
        
        <div className="flex space-x-3">
          <Link href="/create-offer">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create New Offer
            </Button>
          </Link>
        </div>
      </div>

      {/* Campaign Performance */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CardTitle>Campaign Performance</CardTitle>
              <span className="text-sm text-gray-600">Last 30 days</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Information</TableHead>
                <TableHead>Reward per Conversion</TableHead>
                <TableHead>Budget Left</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCampaigns.map((campaign) => {
                const Icon = getCampaignIcon(campaign.name);
                const color = getCampaignColor(campaign.name);
                const budgetPercentage = (parseFloat(campaign.budgetUsed) / parseFloat(campaign.maxBudget)) * 100;
                
                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${color}-500`} />
                        </div>
                        <div>
                          <div className="font-semibold">{campaign.name}</div>
                          <div className="text-sm text-gray-600">Active until {campaign.endDate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">${campaign.rewardPerConversion}</div>
                      <div className="text-sm text-gray-600">Per qualified lead</div>
                    </TableCell>
                    <TableCell>
                      <Progress value={budgetPercentage} className="w-full mb-1" />
                      <div className="text-sm text-gray-600">
                        ${campaign.budgetUsed} / ${campaign.maxBudget}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{campaign.leads}</div>
                      <div className={`text-sm flex items-center ${campaign.changeLeads >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.changeLeads >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(campaign.changeLeads)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{campaign.conversions}</div>
                      <div className={`text-sm flex items-center ${campaign.changeConversions >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.changeConversions >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(campaign.changeConversions)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Leads
                        </Button>
                        <Button variant="outline" size="sm">
                          Button
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                leads: {
                  label: "Leads",
                  color: "#3B82F6",
                },
                conversions: {
                  label: "Conversions",
                  color: "#10B981",
                },
                budget: {
                  label: "Budget Used",
                  color: "#6B7280",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fill="rgba(59, 130, 246, 0.1)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    fill="rgba(16, 185, 129, 0.1)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Leads</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Conversions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Budget Used</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingCampaigns.map((campaign, index) => {
                const Icon = campaign.icon;
                return (
                  <div key={index} className={`flex items-center justify-between p-3 bg-${campaign.color}-50 rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-${campaign.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 text-${campaign.color}-500`} />
                      </div>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-600">{campaign.conversionRate}% conversion rate</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">{formatCurrency(campaign.earnings)}</div>
                      <div className="text-sm text-gray-600">{campaign.conversions} conversions</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
