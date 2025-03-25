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
      <TabsList className="w-full grid grid-cols-3 h-12 bg-gray-200 p-1.5 rounded-lg">
        <TabsTrigger
          value="account"
          className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Preferences
        </TabsTrigger>
        <TabsTrigger
          value="health-profile"
          className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
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
