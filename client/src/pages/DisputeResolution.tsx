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
import { Filter, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface Dispute {
  id: number;
  caseId: string;
  businessClaim: string;
  referrerResponse: string | null;
  status: string;
  createdAt: string | null;
  resolvedAt: string | null;
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "pending":
      return "status-badge status-pending";
    case "approved":
      return "status-badge status-approved";
    case "rejected":
      return "status-badge status-rejected";
    case "escalated":
      return "status-badge status-escalated";
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

const samplePendingDisputes = [
  {
    id: 1,
    caseId: "#DR-7829",
    date: "Oct 12, 2023",
    businessName: "TechSolutions Inc.",
    businessClaim: "Client was already in our database before referral",
    referrerResponse: "Initial contact was made through my referral link",
    status: "pending"
  },
  {
    id: 2,
    caseId: "#DR-7831",
    date: "Oct 13, 2023",
    businessName: "Global Marketing Partners",
    businessClaim: "Referral code used after direct contact was established",
    referrerResponse: "Client confirmed they found us through my social media campaign",
    status: "pending"
  },
  {
    id: 3,
    caseId: "#DR-7834",
    date: "Oct 14, 2023",
    businessName: "Nexus Healthcare",
    businessClaim: "Referral was made but contract negotiations began",
    referrerResponse: "I introduced the client before any negotiations started",
    status: "pending"
  },
  {
    id: 4,
    caseId: "#DR-7836",
    date: "Oct 15, 2023",
    businessName: "Evergreen Retail Solutions",
    businessClaim: "Multiple referrers claiming the same lead",
    referrerResponse: "My referral link was used first and can be verified in system logs",
    status: "pending"
  },
  {
    id: 5,
    caseId: "#DR-7840",
    date: "Oct 16, 2023",
    businessName: "Quantum Financial Services",
    businessClaim: "Referral commission disputed",
    referrerResponse: "Premium tier referral should apply based on client's contract value",
    status: "pending"
  }
];

const sampleResolvedDisputes = [
  {
    id: 6,
    caseId: "#DR-7820",
    date: "Oct 10, 2023",
    business: "Bright Ideas Co.",
    referrer: "Sarah Johnson",
    decision: "approved",
    admin: "Alex Morgan"
  },
  {
    id: 7,
    caseId: "#DR-7822",
    date: "Oct 11, 2023",
    business: "Pinnacle Systems",
    referrer: "Michael Chen",
    decision: "rejected",
    admin: "Alex Morgan"
  },
  {
    id: 8,
    caseId: "#DR-7825",
    date: "Oct 12, 2023",
    business: "Velocity Partners",
    referrer: "Emma Rodriguez",
    decision: "escalated",
    admin: "Taylor Wilson"
  }
];

export default function DisputeResolution() {
  const { data: disputes = [], isLoading } = useQuery<Dispute[]>({
    queryKey: ["/api/disputes"],
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
          <h1 className="text-2xl font-bold text-gray-800">Dispute Resolution</h1>
          <p className="text-gray-600">Review and resolve cases requiring administrative attention</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Link href="/analytics">
            <Button size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Button>
          </Link>
        </div>
      </div>

      {/* Cases Requiring Attention */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Cases Requiring Attention</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select defaultValue="date-newest">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-newest">Date (Newest)</SelectItem>
                  <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Business Claim</TableHead>
                <TableHead>Referrer Response</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samplePendingDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-sm">{dispute.caseId}</TableCell>
                  <TableCell>{dispute.date}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{dispute.businessName}</div>
                    <div className="text-sm text-gray-600">{dispute.businessClaim}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{dispute.referrerResponse}</div>
                    <Button variant="link" className="text-blue-500 text-sm p-0 h-auto">
                      View evidence
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(dispute.status)}>
                      {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve referral</SelectItem>
                        <SelectItem value="reject">Reject referral</SelectItem>
                        <SelectItem value="more-info">Request more info</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recently Resolved Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Resolved Cases</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleResolvedDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-sm">{dispute.caseId}</TableCell>
                  <TableCell>{dispute.date}</TableCell>
                  <TableCell>{dispute.business}</TableCell>
                  <TableCell>{dispute.referrer}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(dispute.decision)}>
                      {dispute.decision.charAt(0).toUpperCase() + dispute.decision.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.admin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
