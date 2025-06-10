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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Users, 
  TrendingUp, 
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "wouter";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  tier: string | null;
  role: string;
  createdAt: string | null;
}

const networkData = [
  { month: "Jan", referrals: 45, earnings: 1200 },
  { month: "Feb", referrals: 52, earnings: 1580 },
  { month: "Mar", referrals: 48, earnings: 1340 },
  { month: "Apr", referrals: 61, earnings: 1950 },
  { month: "May", referrals: 55, earnings: 1720 },
  { month: "Jun", referrals: 68, earnings: 2100 },
];

const networkStats = [
  {
    title: "Total Network Size",
    value: "247",
    change: "+23",
    changeType: "positive",
    icon: Users
  },
  {
    title: "Active Referrers",
    value: "189",
    change: "+12",
    changeType: "positive", 
    icon: TrendingUp
  },
  {
    title: "This Month Earnings",
    value: "$2,100",
    change: "+18%",
    changeType: "positive",
    icon: TrendingUp
  }
];

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function MyNetwork() {
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const referrers = users.filter(user => user.role === "referrer");

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
          <h1 className="text-2xl font-bold text-gray-800">My Network</h1>
          <p className="text-gray-600">Manage your referral network and track performance</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Referrer
          </Button>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {networkStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Network Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                referrals: {
                  label: "Referrals",
                  color: "#3B82F6",
                },
                earnings: {
                  label: "Earnings",
                  color: "#10B981",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networkData}>
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
                    dataKey="earnings" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Newsletter
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite New Referrer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
              <Link href="/campaigns">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Members */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Network Members</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search members..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Total Referrals</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrers.map((referrer) => (
                <TableRow key={referrer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={referrer.avatar || ""} />
                        <AvatarFallback>
                          {referrer.firstName[0]}{referrer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{referrer.firstName} {referrer.lastName}</div>
                        <div className="text-sm text-gray-600">{referrer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={referrer.tier === "premium" ? "default" : "secondary"}>
                      {referrer.tier?.charAt(0).toUpperCase() + referrer.tier?.slice(1) || "Standard"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(referrer.createdAt)}</TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {referrers.length} members
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
