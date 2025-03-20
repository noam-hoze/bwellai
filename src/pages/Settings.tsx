
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Lock, 
  User, 
  Smartphone, 
  Database, 
  Globe,
  ChevronRight
} from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account and application preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="wellness-card p-0 overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-medium">Settings Menu</h3>
              </div>
              <nav className="p-2">
                <a 
                  href="#profile" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
                <a 
                  href="#notifications" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Notifications</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
                <a 
                  href="#privacy" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Privacy & Security</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
                <a 
                  href="#devices" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Connected Devices</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
                <a 
                  href="#data" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Database className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Data Management</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
                <a 
                  href="#language" 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Language & Region</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
              </nav>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <Card className="wellness-card p-6" id="profile">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Jacob" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Smith" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="jacob.smith@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" defaultValue="1990-01-15" />
                </div>
                
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
            
            <Card className="wellness-card p-6" id="notifications">
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Daily Health Summaries</h3>
                    <p className="text-sm text-gray-500">Receive a daily report of your health metrics</p>
                  </div>
                  <Switch id="daily-summary" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Health Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified about important health changes</p>
                  </div>
                  <Switch id="health-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Progress</h3>
                    <p className="text-sm text-gray-500">Weekly summary of your health journey</p>
                  </div>
                  <Switch id="weekly-progress" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tips & Recommendations</h3>
                    <p className="text-sm text-gray-500">Personalized health recommendations</p>
                  </div>
                  <Switch id="tips" />
                </div>
              </div>
            </Card>
            
            {/* Additional settings sections would be added here */}
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Settings;
