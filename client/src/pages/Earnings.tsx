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
  Target,
  Clock
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

  // Enhanced data matching the screenshot
  const availableBalance = 247;
  const pendingEarnings = 1875.50;
  const totalEarned = 12345.80;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-gray-600">Manage and withdraw your referral earnings</p>
        </div>
      </div>

      {/* Earnings Summary - Matching Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-3xl font-bold">{availableBalance}</p>
                <p className="text-sm text-gray-600">Ready to withdraw</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CreditCard className="w-6 h-6 text-blue-600" />
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
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalEarned)}</p>
                <p className="text-sm text-gray-600">Lifetime earnings</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdraw Funds and Payout Methods Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Amount to withdraw</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="$1,500.00"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Select payout method</label>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">Stripe</span>
                  <span className="text-xs text-gray-500">Connected</span>
                </button>
                
                <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:border-blue-300">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <span className="text-sm font-medium">PayPal</span>
                  <span className="text-xs text-gray-500">Connected</span>
                </button>
                
                <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:border-blue-300">
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <span className="text-sm font-medium">Bank</span>
                  <span className="text-xs text-gray-500">Connect</span>
                </button>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Withdraw $1,500.00
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Withdrawals are typically processed within 1-3 business days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div>
                  <p className="font-medium">Stripe Account</p>
                  <p className="text-sm text-gray-500">Connected on May 15, 2023</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Default</Badge>
            </div>
            
            <Button variant="outline" className="w-full text-blue-600 border-blue-200">
              Add New Payout Method
            </Button>
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
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="link" className="text-blue-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Withdrawal to Stripe</p>
                    <p className="text-sm text-gray-500">June 12, 2023</p>
                  </div>
                </div>
                <span className="font-semibold text-red-600">-$750.00</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Referral Commission</p>
                    <p className="text-sm text-gray-500">June 10, 2023</p>
                  </div>
                </div>
                <span className="font-semibold text-green-600">+$325.50</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Referral Commission</p>
                    <p className="text-sm text-gray-500">June 8, 2023</p>
                  </div>
                </div>
                <span className="font-semibold text-green-600">+$450.00</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Withdrawal to Stripe</p>
                    <p className="text-sm text-gray-500">June 1, 2023</p>
                  </div>
                </div>
                <span className="font-semibold text-red-600">-$1,200.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Need help with your earnings?</h3>
              <p className="text-gray-600">Our support team is available 24/7 to assist you with any questions.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
