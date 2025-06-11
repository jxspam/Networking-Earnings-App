import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Area, AreaChart } from "recharts";

interface Lead {
  id: number;
  referrerId: number | null;
  customerName: string;
  service: string;
  value: string;
  status: string;
  createdAt: string | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "pending":
      return "status-badge status-pending";
    case "approved":
      return "status-badge status-approved";
    case "rejected":
      return "status-badge status-rejected";
    case "completed":
      return "status-badge status-completed";
    default:
      return "status-badge";
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(parseFloat(value));
}

// Enhanced chart data
const performanceData = [
  { month: "Jan", leads: 45, conversions: 32, earnings: 1200 },
  { month: "Feb", leads: 52, conversions: 38, earnings: 1580 },
  { month: "Mar", leads: 48, conversions: 35, earnings: 1340 },
  { month: "Apr", leads: 61, conversions: 45, earnings: 1950 },
  { month: "May", leads: 55, conversions: 42, earnings: 1720 },
  { month: "Jun", leads: 68, conversions: 52, earnings: 2100 },
];

const recentActivity = [
  { type: "lead", message: "New lead from Sarah Johnson", time: "2 minutes ago", icon: Users },
  { type: "approval", message: "Lead approved for $2,450", time: "15 minutes ago", icon: CheckCircle },
  { type: "payout", message: "Payout processed: $1,250", time: "1 hour ago", icon: DollarSign },
  { type: "alert", message: "Campaign budget 80% used", time: "2 hours ago", icon: AlertCircle },
];

export default function Dashboard() {
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const getUserById = (id: number | null) => {
    if (!id) return null;
    return users.find(user => user.id === id);
  };

  if (leadsLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalLeads = leads.length;
  const approvedLeads = leads.filter(lead => lead.status === "approved").length;
  const pendingLeads = leads.filter(lead => lead.status === "pending").length;
  const conversionRate = totalLeads > 0 ? ((approvedLeads / totalLeads) * 100).toFixed(1) : "0";
  const totalValue = leads.reduce((sum, lead) => sum + parseFloat(lead.value), 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your incoming leads and referrals</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search leads..."
              className="search-input w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="filter-button">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="filter-button">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="button-primary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Business Dashboard
          </Button>
        </div>
      </div>

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-label">Total Leads</div>
              <div className="metric-value">{totalLeads}</div>
              <div className="metric-change positive">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% vs last month
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-label">Conversion Rate</div>
              <div className="metric-value">{conversionRate}%</div>
              <div className="metric-change positive">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.4% vs last month
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-label">Pending Review</div>
              <div className="metric-value">{pendingLeads}</div>
              <div className="metric-change">
                <Clock className="w-4 h-4 mr-1 text-yellow-600" />
                Requires attention
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-label">Total Value</div>
              <div className="metric-value">{formatCurrency(totalValue.toString())}</div>
              <div className="metric-change positive">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2% vs last month
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="card-enhanced">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Performance Overview</CardTitle>
                  <CardDescription>Lead generation and conversion trends</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Last 6 months
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  leads: { label: "Leads", color: "#3B82F6" },
                  conversions: { label: "Conversions", color: "#10B981" },
                  earnings: { label: "Earnings", color: "#F59E0B" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stackId="1"
                      stroke="#3B82F6" 
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="conversions" 
                      stackId="2"
                      stroke="#10B981" 
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700">
              View all activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Leads Table */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Active Leads</CardTitle>
              <CardDescription>Manage and track your referral leads</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                All Status
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="table-enhanced">
            <Table>
              <TableHeader className="table-header">
                <TableRow>
                  <TableHead className="table-cell font-semibold">Date</TableHead>
                  <TableHead className="table-cell font-semibold">Referrer</TableHead>
                  <TableHead className="table-cell font-semibold">Customer</TableHead>
                  <TableHead className="table-cell font-semibold">Service</TableHead>
                  <TableHead className="table-cell font-semibold">Value</TableHead>
                  <TableHead className="table-cell font-semibold">Status</TableHead>
                  <TableHead className="table-cell font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.slice(0, 8).map((lead) => {
                  const referrer = getUserById(lead.referrerId);
                  return (
                    <TableRow key={lead.id} className="table-row">
                      <TableCell className="table-cell text-gray-600">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell className="table-cell">
                        {referrer && (
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8 avatar-enhanced">
                              <AvatarImage src={referrer.avatar || ""} />
                              <AvatarFallback className="text-xs">
                                {referrer.firstName[0]}{referrer.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {referrer.firstName} {referrer.lastName}
                              </div>
                              <div className="text-xs text-gray-500">Referrer</div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="table-cell">
                        <div>
                          <div className="font-medium text-gray-900">{lead.customerName}</div>
                          <div className="text-xs text-gray-500">Customer</div>
                        </div>
                      </TableCell>
                      <TableCell className="table-cell">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                          {lead.service}
                        </span>
                      </TableCell>
                      <TableCell className="table-cell">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(lead.value)}
                        </span>
                      </TableCell>
                      <TableCell className="table-cell">
                        <Badge className={getStatusBadgeClass(lead.status)}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="table-cell">
                        <div className="flex items-center space-x-2">
                          {lead.status === "pending" && (
                            <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 text-white">
                              Approve
                            </Button>
                          )}
                          {lead.status === "approved" && (
                            <Button size="sm" variant="outline" className="text-xs">
                              Mark Complete
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1-8</span> of <span className="font-medium">{leads.length}</span> leads
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="text-xs">
                Previous
              </Button>
              <Button size="sm" className="text-xs bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm" className="text-xs">2</Button>
              <Button variant="outline" size="sm" className="text-xs">3</Button>
              <Button variant="outline" size="sm" className="text-xs">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}