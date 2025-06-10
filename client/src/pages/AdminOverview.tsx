import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  UserPlus,
  AlertTriangle,
  Megaphone,
  FileText
} from "lucide-react";
import { Link } from "wouter";

interface AnalyticsData {
  totalReferrals: number;
  conversionRate: number;
  totalPayouts: number;
  activeCampaigns: number;
  pendingDisputes: number;
}

const totalReferralsData = [
  { value: 6500 },
  { value: 7200 },
  { value: 7800 },
  { value: 8100 },
  { value: 8400 },
  { value: 8742 },
];

const conversionRateData = [
  { value: 28 },
  { value: 31 },
  { value: 29 },
  { value: 25 },
  { value: 27 },
  { value: 24.7 },
];

const totalPayoutsData = [
  { value: 95000 },
  { value: 105000 },
  { value: 115000 },
  { value: 118000 },
  { value: 125000 },
  { value: 127845 },
];

const recentSearches = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya@partners.com",
    avatar: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
  }
];

const flaggedReferrals = [
  {
    id: "REF-7845",
    referrer: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=24&h=24",
    date: "Oct 12, 2023",
    amount: "$449.00",
    status: "fraud_alert"
  },
  {
    id: "REF-5432",
    referrer: "Lisa Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=24&h=24",
    date: "Oct 15, 2023",
    amount: "$275.50",
    status: "dispute"
  },
  {
    id: "REF-2271",
    referrer: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=24&h=24",
    date: "Oct 8, 2023",
    amount: "$1,200.00",
    status: "fraud_alert"
  },
  {
    id: "REF-6521",
    referrer: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=24&h=24",
    date: "Oct 5, 2023",
    amount: "$125.75",
    status: "dispute"
  }
];

const topPerformers = [
  {
    name: "Thomas Anderson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    referrals: 124,
    generated: 17450,
    earnings: 3725
  },
  {
    name: "Lisa Wong",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    referrals: 98,
    generated: 14200,
    earnings: 3262
  },
  {
    name: "Robert Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    referrals: 87,
    generated: 12850,
    earnings: 2877
  },
  {
    name: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    referrals: 75,
    generated: 11200,
    earnings: 2265
  }
];

const recentActivities = [
  {
    type: "new_referrer",
    icon: UserPlus,
    title: "New referrer joined the network",
    description: "David Smith registered through the affiliate program",
    time: "2 hours ago",
    color: "blue"
  },
  {
    type: "payout_processed",
    icon: DollarSign,
    title: "Payout processed for October earnings",
    description: "$45,230 distributed to 124 referrers",
    time: "5 hours ago",
    color: "green"
  },
  {
    type: "fraud_alert",
    icon: AlertTriangle,
    title: "Fraud alert triggered for REF-7845",
    description: "Multiple referrals from same IP address detected",
    time: "3 hours ago",
    color: "red"
  },
  {
    type: "campaign_milestone",
    icon: Megaphone,
    title: "Campaign milestone reached",
    description: "Fall promotion exceeded 1,000 qualified leads",
    time: "Yesterday",
    color: "purple"
  },
  {
    type: "dispute_filed",
    icon: FileText,
    title: "Dispute filed for referral REF-6543",
    description: "Business claims they were already in contact",
    time: "Yesterday",
    color: "yellow"
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "fraud_alert":
      return "bg-red-100 text-red-800";
    case "dispute":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function AdminOverview() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics/overview"],
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
          <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>
          <p className="text-gray-600">Monitor network performance and manage referrals</p>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Referrals</h3>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics?.totalReferrals?.toLocaleString() || "8,742"}
                </div>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </div>
            <ChartContainer
              config={{
                value: { label: "Referrals", color: "#10B981" },
              }}
              className="h-16"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalReferralsData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics?.conversionRate || "24.7"}%
                </div>
              </div>
              <div className="text-sm text-red-600 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2.3%
              </div>
            </div>
            <ChartContainer
              config={{
                value: { label: "Rate", color: "#6B7280" },
              }}
              className="h-16"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionRateData}>
                  <Bar dataKey="value" fill="#6B7280" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Payouts</h3>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analytics?.totalPayouts || 127845)}
                </div>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.7%
              </div>
            </div>
            <ChartContainer
              config={{
                value: { label: "Payouts", color: "#10B981" },
              }}
              className="h-16"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalPayoutsData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Lookup */}
        <Card>
          <CardHeader>
            <CardTitle>User Lookup</CardTitle>
            <p className="text-sm text-gray-600">Search by Email or Username</p>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Enter email or username"
                className="pl-10"
              />
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h4>
              <div className="space-y-2">
                {recentSearches.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">
              Advanced User Search
            </Button>
          </CardContent>
        </Card>

        {/* Flagged Referrals */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Flagged Referrals</CardTitle>
              <Link href="/dispute-resolution">
                <Button variant="link" className="text-blue-500 text-sm p-0">
                  View All Disputes
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-left text-gray-600">
                  <TableHead className="text-xs">Referrer ID</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flaggedReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={referral.avatar} />
                          <AvatarFallback className="text-xs">
                            {referral.referrer.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-mono text-xs">{referral.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{referral.referrer}</TableCell>
                    <TableCell className="text-sm">{referral.date}</TableCell>
                    <TableCell className="text-sm">{referral.amount}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusBadgeClass(referral.status)}`}>
                        {referral.status === "fraud_alert" ? "Fraud Alert" : "Dispute"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Top Performing Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={performer.avatar} />
                      <AvatarFallback>
                        {performer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-sm text-gray-600">
                        {performer.referrals} referrals • ${performer.generated.toLocaleString()} generated
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-green-600">
                    {formatCurrency(performer.earnings)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${activity.color}-500`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{activity.title}</div>
                      <div className="text-xs text-gray-600">{activity.description}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
