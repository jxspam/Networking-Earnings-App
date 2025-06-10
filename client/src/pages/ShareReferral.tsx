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
  const [selectedTemplate, setSelectedTemplate] = useState(socialTemplates[0]);
  const [customMessage, setCustomMessage] = useState(selectedTemplate.template);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const shareViaEmail = (link: string) => {
    const subject = "Join Network Earnings Referral Program";
    const body = customMessage.replace("[LINK]", link).replace("[Name]", "");
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaSocial = (platform: string, link: string) => {
    const message = customMessage.replace("[LINK]", link);
    let url = "";
    
    switch (platform.toLowerCase()) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(message)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
        break;
    }
    
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Share Referral</h1>
          <p className="text-gray-600">Share your referral links and grow your network</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR Code
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Assets
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Referral Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralLinks.map((link) => (
                <div key={link.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{link.name}</h3>
                      <p className="text-sm text-gray-600">Code: {link.code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => shareViaEmail(link.url)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded text-sm font-mono break-all mb-3">
                    {link.url}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex space-x-4">
                      <span className="text-gray-600">Clicks: <strong>{link.clicks}</strong></span>
                      <span className="text-gray-600">Conversions: <strong>{link.conversions}</strong></span>
                    </div>
                    <Badge variant="secondary">
                      {((link.conversions / link.clicks) * 100).toFixed(1)}% CVR
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle>Share Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform Template</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTemplate.platform}
                  onChange={(e) => {
                    const template = socialTemplates.find(t => t.platform === e.target.value);
                    if (template) {
                      setSelectedTemplate(template);
                      setCustomMessage(template.template);
                    }
                  }}
                >
                  {socialTemplates.map((template) => (
                    <option key={template.platform} value={template.platform}>
                      {template.platform}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="message">Custom Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Use [LINK] as placeholder for your referral link</p>
              </div>

              <div className="space-y-2">
                <Label>Quick Share</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareViaEmail(referralLinks[0].url)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareViaSocial("facebook", referralLinks[0].url)}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareViaSocial("twitter", referralLinks[0].url)}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareViaSocial("linkedin", referralLinks[0].url)}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">590</div>
              <div className="text-sm text-gray-600">Total Clicks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">35</div>
              <div className="text-sm text-gray-600">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5.9%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">$875</div>
              <div className="text-sm text-gray-600">Earnings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
