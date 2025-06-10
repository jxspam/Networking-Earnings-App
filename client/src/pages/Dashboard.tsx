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
import { Search, Filter, Download, BarChart3 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Doughnut } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

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

const conversionData = [
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 48 },
  { month: "Apr", rate: 61 },
  { month: "May", rate: 55 },
  { month: "Jun", rate: 68 },
];

const sourcesData = [
  { name: "Direct Referrals", value: 42, color: "#3B82F6" },
  { name: "Social Media", value: 28, color: "#10B981" },
  { name: "Website", value: 16, color: "#F59E0B" },
  { name: "Other", value: 14, color: "#6B7280" },
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

  const topReferrers = [
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
      leadsCount: 12,
      earnings: 3450
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
      leadsCount: 8,
      earnings: 2850
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
      leadsCount: 6,
      earnings: 2100
    }
  ];

  if (leadsLoading) {
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
          <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
          <p className="text-gray-600">Track and manage your incoming leads</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Business Dashboard
          </Button>
        </div>
      </div>

      {/* Active Leads Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Leads</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.slice(0, 5).map((lead) => {
                const referrer = getUserById(lead.referrerId);
                return (
                  <TableRow key={lead.id}>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                    <TableCell>
                      {referrer && (
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={referrer.avatar || ""} />
                            <AvatarFallback>
                              {referrer.firstName[0]}{referrer.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{referrer.firstName} {referrer.lastName}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{lead.customerName}</TableCell>
                    <TableCell>{lead.service}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(lead.value)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {lead.status === "pending" && (
                          <Button size="sm" className="text-xs">
                            Approve
                          </Button>
                        )}
                        {lead.status === "approved" && (
                          <Button size="sm" variant="secondary" className="text-xs bg-green-500 hover:bg-green-600 text-white">
                            Confirm Job Done
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-xs">
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing 5 of {leads.length} leads
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>←</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">5</Button>
              <Button variant="outline" size="sm">→</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Conversion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: {
                  label: "Conversion Rate",
                  color: "#3B82F6",
                },
              }}
              className="h-48"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-green-600">68%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <div className="text-sm text-green-600">+12% vs Last Month</div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                },
              }}
              className="h-48"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {sourcesData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name} ({item.value}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReferrers.map((referrer) => (
                <div key={referrer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={referrer.avatar} />
                      <AvatarFallback>
                        {referrer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{referrer.name}</div>
                      <div className="text-sm text-gray-600">{referrer.leadsCount} leads this month</div>
                    </div>
                  </div>
                  <div className="font-semibold text-green-600">
                    ${referrer.earnings.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-blue-500 hover:text-blue-600">
              View All Referrers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
