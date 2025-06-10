import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Search, Filter, Download, Calendar, TrendingUp } from "lucide-react";

interface Lead {
  id: number;
  referrerId: number | null;
  customerName: string;
  service: string;
  value: string;
  status: string;
  createdAt: string | null;
  businessName: string | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

const historyData = [
  { month: "Jan", referrals: 8, approved: 6, earnings: 450 },
  { month: "Feb", referrals: 12, approved: 9, earnings: 675 },
  { month: "Mar", referrals: 15, approved: 11, earnings: 825 },
  { month: "Apr", referrals: 18, approved: 14, earnings: 1050 },
  { month: "May", referrals: 22, approved: 17, earnings: 1275 },
  { month: "Jun", referrals: 25, approved: 20, earnings: 1500 },
];

const statusData = [
  { status: "Approved", count: 77, color: "#10B981" },
  { status: "Pending", count: 23, color: "#F59E0B" },
  { status: "Rejected", count: 8, color: "#EF4444" },
  { status: "Completed", count: 65, color: "#3B82F6" },
];

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

export default function ReferralHistory() {
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
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const totalReferrals = leads.length;
  const approvedReferrals = leads.filter(lead => lead.status === "approved").length;
  const pendingReferrals = leads.filter(lead => lead.status === "pending").length;
  const totalEarnings = leads
    .filter(lead => lead.status === "approved" || lead.status === "completed")
    .reduce((sum, lead) => sum + parseFloat(lead.value), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Referral History</h1>
          <p className="text-gray-600">Track your referral performance and earnings over time</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{totalReferrals}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedReferrals}</p>
              </div>
              <div className="text-sm text-green-600">
                {totalReferrals > 0 ? ((approvedReferrals / totalReferrals) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReferrals}</p>
              </div>
              <div className="text-sm text-yellow-600">
                {totalReferrals > 0 ? ((pendingReferrals / totalReferrals) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalEarnings.toString())}
                </p>
              </div>
              <div className="text-sm text-green-600">+15.3%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                referrals: {
                  label: "Referrals",
                  color: "#3B82F6",
                },
                approved: {
                  label: "Approved",
                  color: "#10B981",
                },
                earnings: {
                  label: "Earnings",
                  color: "#F59E0B",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="referrals" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Count" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Referral History Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Referrals</CardTitle>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search referrals..."
                  className="pl-10 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => {
                const commission = parseFloat(lead.value) * 0.1; // 10% commission rate
                return (
                  <TableRow key={lead.id}>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                    <TableCell>
                      <div className="font-medium">{lead.customerName}</div>
                    </TableCell>
                    <TableCell>{lead.businessName || "N/A"}</TableCell>
                    <TableCell>{lead.service}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(lead.value)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {lead.status === "approved" || lead.status === "completed" 
                        ? formatCurrency(commission.toString())
                        : "-"
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {leads.length} referrals
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>←</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">→</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
