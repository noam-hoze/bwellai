import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import AccountTab from "./tabs/AccountTab";
import PreferencesTab from "./tabs/PreferencesTab";
import HealthProfileTab from "./tabs/HealthProfileTab";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConnectionsOverviewTab from "./tabs/ConnectionsOverviewTab";
import {
  convertHeightValueUnits,
  convertWeightValueUnits,
} from "@/utils/utils";

const ProfileTabs = ({ getProfileIsData, getUserProfileRefetch }) => {
  const [activeMainTab, setActiveMainTab] = useState("profile");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const [language, setLanguage] = useState("English");

  const [activeProfileTab, setActiveProfileTab] = useState("account");

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value);
    if (value === "connections") {
      navigate({ search: `?tab=connections` });
    } else {
      navigate({ search: `?tab=${activeProfileTab}` });
    }
  };

  const handleProfileTabChange = (value: string) => {
    setActiveProfileTab(value);
    navigate({ search: `?tab=${value}` });
  };

  const scrollTabs = (direction: "left" | "right") => {
    const tabsList = document.getElementById("profile-tabs-list");
    if (!tabsList) return;

    const scrollAmount = 100;
    const scrollPosition =
      direction === "left"
        ? tabsList.scrollLeft - scrollAmount
        : tabsList.scrollLeft + scrollAmount;

    tabsList.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleWeightUnitChange = (_, newUnit) => {
    if (newUnit !== null) {
      setWeightUnit((prevUnit) => {
        setWeight((prevWeight) => {
          const changedValue = convertWeightValueUnits(
            prevUnit,
            newUnit,
            prevWeight
          );

          return changedValue;
        });

        return newUnit;
      });
    }
  };

  const handleHeightUnitChange = (_event, newUnit) => {
    if (newUnit !== null) {
      setHeightUnit((prevUnit) => {
        setHeight((prevHeight) => {
          const changedValue = convertHeightValueUnits(
            prevUnit,
            newUnit,
            prevHeight
          );

          return changedValue;
        });

        return newUnit;
      });
    }
  };

  useEffect(() => {
    if (getProfileIsData) {
      if (getProfileIsData?.weightUnit) {
        setWeightUnit(getProfileIsData?.weightUnit);
      }
      if (getProfileIsData?.heightUnit) {
        setHeightUnit(getProfileIsData?.heightUnit);
      }
      if (getProfileIsData?.distanceUnit) {
        setDistanceUnit(getProfileIsData?.distanceUnit);
      }
      if (getProfileIsData?.temperatureUnit) {
        setTemperatureUnit(getProfileIsData?.temperatureUnit);
      }
      if (getProfileIsData?.language) {
        setLanguage(getProfileIsData?.language);
      }
    }
  }, [
    getProfileIsData?.weightUnit,
    getProfileIsData?.heightUnit,
    getProfileIsData?.distanceUnit,
    getProfileIsData?.temperatureUnit,
    getProfileIsData?.language,
  ]);

  return (
    <>
      <div className="w-full">
        <Tabs
          value={activeMainTab}
          onValueChange={handleMainTabChange}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 h-12 bg-gray-200 p-1.5 rounded-lg">
            <TabsTrigger
              value="profile"
              className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="connections"
              className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Tabs
              value={activeProfileTab}
              onValueChange={handleProfileTabChange}
              className="w-full"
            >
              {isMobile ? (
                <div className="relative">
                  <button
                    onClick={() => scrollTabs("left")}
                    className="absolute left-0 top-0 bottom-0 z-10 px-1 flex items-center justify-center bg-gradient-to-r from-gray-100 to-transparent"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>

                  <ScrollArea className="w-full overflow-x-auto">
                    <TabsList
                      id="profile-tabs-list"
                      className="h-10 bg-gray-100 p-1 rounded-lg mb-4 inline-flex min-w-full whitespace-nowrap px-4"
                    >
                      <TabsTrigger
                        value="account"
                        className="text-sm h-full px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="preferences"
                        className="text-sm h-full px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Preferences
                      </TabsTrigger>
                      <TabsTrigger
                        value="health-profile"
                        className="text-sm h-full px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        Health Profile
                      </TabsTrigger>
                    </TabsList>
                  </ScrollArea>

                  <button
                    onClick={() => scrollTabs("right")}
                    className="absolute right-0 top-0 bottom-0 z-10 px-1 flex items-center justify-center bg-gradient-to-l from-gray-100 to-transparent"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <TabsList className="w-full grid grid-cols-3 h-10 bg-gray-100 p-1 rounded-lg mb-4">
                  <TabsTrigger
                    value="account"
                    className="text-sm h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="text-sm h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="health-profile"
                    className="text-sm h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Health Profile
                  </TabsTrigger>
                </TabsList>
              )}

              <TabsContent value="account" className="mt-0">
                <AccountTab getProfileIsData={getProfileIsData} />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <PreferencesTab
                  getProfileIsData={getProfileIsData}
                  weight={weight}
                  height={height}
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
                  getUserProfileRefetch={getUserProfileRefetch}
                  handleWeightUnitChange={handleWeightUnitChange}
                  handleHeightUnitChange={handleHeightUnitChange}
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
                  getUserProfileRefetch={getUserProfileRefetch}
                  weight={weight}
                  setWeight={setWeight}
                  height={height}
                  setHeight={setHeight}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="connections" className="mt-4">
            <ConnectionsOverviewTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileTabs;
