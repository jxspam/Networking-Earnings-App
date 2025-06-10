import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, 
  Share2, 
  Mail, 
  MessageSquare, 
  Facebook, 
  Twitter, 
  Linkedin,
  QrCode,
  Download,
  Link as LinkIcon
} from "lucide-react";

const referralLinks = [
  {
    id: 1,
    name: "General Referral",
    url: "https://networkearnings.com/ref/alex-morgan",
    code: "ALEX-2023",
    clicks: 245,
    conversions: 12
  },
  {
    id: 2,
    name: "Home Services Campaign",
    url: "https://networkearnings.com/ref/alex-morgan?c=home",
    code: "ALEX-HOME",
    clicks: 189,
    conversions: 8
  },
  {
    id: 3,
    name: "Tech Services Campaign", 
    url: "https://networkearnings.com/ref/alex-morgan?c=tech",
    code: "ALEX-TECH",
    clicks: 156,
    conversions: 15
  }
];

const socialTemplates = [
  {
    platform: "Email",
    icon: Mail,
    template: "Hi [Name],\n\nI've been working with Network Earnings and thought you might be interested in their referral program. You can earn great commissions by referring quality leads.\n\nCheck it out: [LINK]\n\nBest regards,\nAlex"
  },
  {
    platform: "SMS",
    icon: MessageSquare,
    template: "Hey! Check out this great referral opportunity with Network Earnings. You can earn commissions for quality leads: [LINK]"
  },
  {
    platform: "Facebook",
    icon: Facebook,
    template: "Just discovered an amazing referral program! 💰 Earn commissions by connecting businesses with quality leads. Join me at Network Earnings: [LINK] #ReferralProgram #EarnExtra"
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    template: "Excited to share a professional opportunity with my network! Network Earnings offers a rewarding referral program for quality business leads. Check it out: [LINK]"
  }
];

export default function ShareReferral() {
  const { toast } = useToast();
  const [selectedBusiness, setSelectedBusiness] = useState("SaaS Technology Solutions");
  const [referralLink, setReferralLink] = useState("https://networkearnings.com/ref/alex-morgan/saas-tech");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "QR code has been generated for your referral link",
    });
  };

  const useTemplate = (template: string) => {
    toast({
      title: "Template Applied",
      description: "Message template has been applied",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Share Referral Link</h1>
          <p className="text-gray-600">Create and share personalized referral links to grow your network and increase your earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Referral Link */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generate Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business">Select Business or Category</Label>
              <select 
                id="business"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
              >
                <option value="SaaS Technology Solutions">SaaS Technology Solutions</option>
                <option value="Home Services">Home Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <Label htmlFor="link">Your Referral Link</Label>
              <div className="mt-1 p-3 bg-gray-100 rounded-md font-mono text-sm">
                {referralLink}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="text-blue-600 border-blue-200"
              onClick={generateQRCode}
            >
              Generate QR Code
            </Button>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Personalize Your Message</h3>
              
              <div className="mb-3">
                <Label>Message Template</Label>
                <div className="mt-1 p-3 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-700">
                    Hey! I've been using this amazing SaaS platform that has really helped streamline our 
                    business operations. I thought you might find it useful too. Check it out with my 
                    referral link and you'll get 20% off your first month!
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">AI Message Suggestions</h4>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Powered by GPT</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-md bg-blue-50">
                    <p className="text-sm text-gray-700 mb-2">
                      Hi there! I wanted to share this amazing SaaS tool that's saved me hours each 
                      week on project management. Use my link for a free 30-day trial!
                    </p>
                    <Button 
                      variant="link" 
                      className="text-blue-600 text-xs p-0 h-auto"
                      onClick={() => useTemplate("template1")}
                    >
                      Use this template
                    </Button>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-700 mb-2">
                      Looking to improve your team's productivity? This platform helped us 
                      increase efficiency by 40%. Click my referral link for a special discount!
                    </p>
                    <Button 
                      variant="link" 
                      className="text-blue-600 text-xs p-0 h-auto"
                      onClick={() => useTemplate("template2")}
                    >
                      Use this template
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate More Suggestions
                </Button>
                <Button variant="outline" className="text-blue-600">
                  Save Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Your Link and QR Code */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Share via WhatsApp
            </Button>
            <Button variant="outline" className="w-full justify-start text-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Share via Email
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Share via SMS
            </Button>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">QR Code</h3>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                <div className="w-32 h-32 mx-auto bg-white border rounded-lg flex items-center justify-center">
                  {/* QR Code Pattern */}
                  <div className="w-24 h-24 grid grid-cols-8 gap-px">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 text-blue-600">
                Download QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Performance Stats</CardTitle>
            <Button variant="link" className="text-blue-600">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Total Links Created:</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Clicks:</p>
              <p className="text-2xl font-bold">387</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate:</p>
              <p className="text-2xl font-bold">8.2%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Earnings Generated:</p>
              <p className="text-2xl font-bold text-green-600">$1,245.00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
