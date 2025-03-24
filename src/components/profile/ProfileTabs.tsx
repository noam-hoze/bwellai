import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountTab from "./tabs/AccountTab";
import PreferencesTab from "./tabs/PreferencesTab";
import HealthProfileTab from "./tabs/HealthProfileTab";

const ProfileTabs = ({ getProfileIsData }) => {
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const [language, setLanguage] = useState("English");

  const [activeTab, setActiveTab] = useState("account");

  return (
    <Tabs
      defaultValue="account"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="w-full grid grid-cols-3 mb-6">
        <TabsTrigger value="account" className="text-base">
          Account
        </TabsTrigger>
        <TabsTrigger value="preferences" className="text-base">
          Preferences
        </TabsTrigger>
        <TabsTrigger value="health-profile" className="text-base">
          Health Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="mt-0">
        <AccountTab getProfileIsData={getProfileIsData} />
      </TabsContent>

      <TabsContent value="preferences" className="mt-0">
        <PreferencesTab
          getProfileIsData={getProfileIsData}
          weightUnit={weightUnit}
          heightUnit={heightUnit}
          distanceUnit={distanceUnit}
          temperatureUnit={temperatureUnit}
          language={language}
          setWeightUnit={setWeightUnit}
          setHeightUnit={setHeightUnit}
          setDistanceUnit={setDistanceUnit}
          setTemperatureUnit={setTemperatureUnit}
          setLanguage={setLanguage}
        />
      </TabsContent>

      <TabsContent value="health-profile" className="mt-0">
        <HealthProfileTab
          getProfileIsData={getProfileIsData}
          weightUnit={weightUnit}
          heightUnit={heightUnit}
          distanceUnit={distanceUnit}
          temperatureUnit={temperatureUnit}
          language={language}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
