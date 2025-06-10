import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  Wallet,
  CreditCard,
  Target
} from "lucide-react";

interface Earning {
  id: number;
  referrerId: number | null;
  leadId: number | null;
  campaignId: number | null;
  amount: string;
  status: string;
  createdAt: string | null;
  paidAt: string | null;
}

const earningsData = [
  { month: "Jan", earnings: 450, payouts: 400, pending: 50 },
  { month: "Feb", earnings: 675, payouts: 675, pending: 0 },
  { month: "Mar", earnings: 825, payouts: 750, pending: 75 },
  { month: "Apr", earnings: 1050, payouts: 950, pending: 100 },
  { month: "May", earnings: 1275, payouts: 1200, pending: 75 },
  { month: "Jun", earnings: 1500, payouts: 1400, pending: 100 },
];

const payoutHistory = [
  {
    id: 1,
    date: "2023-10-15",
    amount: 1400,
    method: "Bank Transfer",
    status: "completed",
    reference: "PAY-2023-0015"
  },
  {
    id: 2,
    date: "2023-10-01",
    amount: 1200,
    method: "Bank Transfer", 
    status: "completed",
    reference: "PAY-2023-0012"
  },
  {
    id: 3,
    date: "2023-09-15",
    amount: 950,
    method: "Bank Transfer",
    status: "completed",
    reference: "PAY-2023-0009"
  },
  {
    id: 4,
    date: "2023-09-01",
    amount: 750,
    method: "Bank Transfer",
    status: "completed", 
    reference: "PAY-2023-0006"
  },
  {
    id: 5,
    date: "2023-08-15",
    amount: 675,
    method: "Bank Transfer",
    status: "completed",
    reference: "PAY-2023-0003"
  }
];

const earningsBySource = [
  { source: "Home Services", amount: 2400, percentage: 40, color: "#3B82F6" },
  { source: "Technology", amount: 1800, percentage: 30, color: "#10B981" },
  { source: "Healthcare", amount: 1200, percentage: 20, color: "#F59E0B" },
  { source: "Education", amount: 600, percentage: 10, color: "#EF4444" },
];

function formatCurrency(value: number | string) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(numValue);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function Earnings() {
  const { data: earnings = [], isLoading } = useQuery<Earning[]>({
    queryKey: ["/api/earnings"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.amount), 0);
  const pendingEarnings = earnings
    .filter(earning => earning.status === "pending")
    .reduce((sum, earning) => sum + parseFloat(earning.amount), 0);
  const paidEarnings = earnings
    .filter(earning => earning.status === "paid")
    .reduce((sum, earning) => sum + parseFloat(earning.amount), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-gray-600">Track your earnings and payment history</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            Request Payout
          </Button>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">{formatCurrency(totalEarnings)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Out</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(paidEarnings)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingEarnings)}</p>
                <p className="text-sm text-yellow-600">Next payout: Oct 31</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(1500)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18.7%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Earnings Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "#3B82F6",
                },
                payouts: {
                  label: "Payouts",
                  color: "#10B981",
                },
                pending: {
                  label: "Pending",
                  color: "#F59E0B",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="payouts" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Earnings by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsBySource.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm font-bold">{formatCurrency(source.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${source.percentage}%`, 
                        backgroundColor: source.color 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{source.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Earnings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Earnings</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings.slice(0, 5).map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell>
                      {earning.createdAt ? formatDate(earning.createdAt) : "N/A"}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(earning.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(earning.status)}>
                        {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>{formatDate(payout.date)}</TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(payout.amount)}
                    </TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(payout.status)}>
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
