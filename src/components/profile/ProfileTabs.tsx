
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountTab from "./tabs/AccountTab";
import PreferencesTab from "./tabs/PreferencesTab";
import HealthProfileTab from "./tabs/HealthProfileTab";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-6">
        <TabsTrigger value="account" className="text-base">Account</TabsTrigger>
        <TabsTrigger value="preferences" className="text-base">Preferences</TabsTrigger>
        <TabsTrigger value="health-profile" className="text-base">Health Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account" className="mt-0">
        <AccountTab />
      </TabsContent>
      
      <TabsContent value="preferences" className="mt-0">
        <PreferencesTab />
      </TabsContent>
      
      <TabsContent value="health-profile" className="mt-0">
        <HealthProfileTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
