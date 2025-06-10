import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Area,
  AreaChart
} from "recharts";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Calendar,
  CreditCard
} from "lucide-react";

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
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric"
  });
}

function formatCurrency(value: string | number) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(numValue);
}

export default function EnhancedDashboard() {
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  if (leadsLoading || usersLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const totalReferrals = 247;
  const pendingEarnings = 1875.50;
  const withdrawableBalance = 3420.75;

  // Chart data for referral performance matching the screenshot
  const referralPerformanceData = [
    { month: "Jan", completed: 18, pending: 8, earnings: 450 },
    { month: "Feb", completed: 25, pending: 12, earnings: 675 },
    { month: "Mar", completed: 32, pending: 15, earnings: 825 },
    { month: "Apr", completed: 38, pending: 18, earnings: 1050 },
    { month: "May", completed: 45, pending: 22, earnings: 1275 },
    { month: "Jun", completed: 52, pending: 25, earnings: 1500 },
  ];

  const recentReferrals = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face",
      date: "May 12, 2023",
      status: "Completed",
      earnings: 250.00
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      date: "May 10, 2023",
      status: "Pending",
      earnings: 175.50
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "e.rodriguez@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      date: "May 8, 2023",
      status: "Completed",
      earnings: 300.00
    },
    {
      id: 4,
      name: "David Wilson",
      email: "d.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      date: "May 5, 2023",
      status: "Rejected",
      earnings: 0.00
    }
  ];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, Alex!</h1>
        <p className="text-gray-600">Here's an overview of your referral performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-3xl font-bold">{totalReferrals}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  12% vs last month
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  View details
                </Button>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Earnings Pending</p>
                <p className="text-3xl font-bold">{formatCurrency(pendingEarnings)}</p>
                <p className="text-sm text-gray-600">Processing - Est. release: 7 days</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  View details
                </Button>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Withdrawable Balance</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(withdrawableBalance)}</p>
                <p className="text-sm text-gray-600">Available</p>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Withdraw Funds
                </Button>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Referral Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: {
                  label: "Completed Referrals",
                  color: "#3B82F6",
                },
                pending: {
                  label: "Pending Referrals",
                  color: "#94A3B8",
                },
                earnings: {
                  label: "Earnings ($)",
                  color: "#10B981",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={referralPerformanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    stackId="1"
                    stroke="#94A3B8" 
                    fill="#94A3B8"
                    fillOpacity={0.6}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center mt-4 space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Completed Referrals</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span>Pending Referrals</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Earnings ($)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Create New Referral
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Follow-up
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Request Payout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Referrals</CardTitle>
            <Button variant="link" className="text-blue-600">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReferrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback>
                          {referral.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{referral.name}</div>
                        <div className="text-sm text-gray-500">{referral.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{referral.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(referral.status)}>
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(referral.earnings)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}