import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Users, 
  Share, 
  History, 
  DollarSign, 
  BarChart3, 
  Megaphone, 
  Settings,
  Bell,
  Network,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/network", icon: Users, label: "My Network" },
  { path: "/share-referral", icon: Share, label: "Share Referral" },
  { path: "/referral-history", icon: History, label: "Referral History" },
  { path: "/earnings", icon: DollarSign, label: "Earnings" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/campaigns", icon: Megaphone, label: "Campaigns" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [notificationCount] = useState(3);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="gradient-header text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Network className="w-6 h-6" />
          <span className="text-xl font-bold">Network Earnings</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/create-offer">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">
              New Referral
            </Button>
          </Link>
          
          <div className="bg-white text-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="text-sm">Notifications</span>
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                <div className="text-right">
                  <div className="text-sm font-semibold">Alex</div>
                  <div className="text-xs opacity-80">Premium Referrer</div>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <nav className="bg-white w-60 shadow-lg flex flex-col">
          <div className="p-4 flex-1">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path || (item.path === "/" && location === "/dashboard");
                
                return (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <div className={`sidebar-item ${isActive ? "active" : ""}`}>
                        <Icon className="w-5 h-5 text-blue-500" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="p-4">
            <Link href="/create-offer">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Create New Referral
              </Button>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
