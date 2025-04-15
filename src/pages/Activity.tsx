import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import DateNavigation from "@/components/activity/DateNavigation";
import ActivityHeader from "@/components/activity/ActivityHeader";
import DailyTabContent from "@/components/activity/DailyTabContent";
import WeeklyTabContent from "@/components/activity/WeeklyTabContent";
import MonthlyTabContent from "@/components/activity/MonthlyTabContent";
import {
  getDateDisplay,
  goToPreviousDate,
  goToNextDate,
  isToday,
} from "@/components/activity/ActivityDateUtils";
import { Calendar } from "lucide-react";
import {
  useGetUserInfoTerraData,
  useGetWearableDailySleepDataV4,
} from "@/service/hooks/wearable/terra/useGetUserInfo";

type ViewType = "day" | "week" | "month";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const Activity = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>("day");

  const { data: connectedDevicesData, refetch: connectedDevicesRefetch } =
    useGetUserInfoTerraData({ isAuthenticated: true });

  const {
    data: wearableDailySleepData,
    isSuccess: wearableDailySleepIsSuccess,
    isLoading: wearableDailySleepIsLoading,
  } = useGetWearableDailySleepDataV4({
    resource: connectedDevicesData?.[0]?.device,
    startDate: formatDate(selectedDate),
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
  });

  const handlePrevious = () => {
    setSelectedDate((prev) => goToPreviousDate(prev, viewType));
  };

  const handleNext = () => {
    setSelectedDate((prev) => goToNextDate(prev, viewType));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const isTodaySelected = isToday(selectedDate) && viewType === "day";
  const dateDisplay = getDateDisplay(selectedDate, viewType);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <ActivityHeader />

          <div className="space-y-4">
            <DateNavigation
              dateDisplay={dateDisplay}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToday={handleToday}
              isToday={isTodaySelected}
            />

            <Tabs
              value={viewType}
              onValueChange={(value) => setViewType(value as ViewType)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full bg-gray-50 p-1 rounded-lg">
                <TabsTrigger
                  value="day"
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Day
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Week
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Month
                </TabsTrigger>
              </TabsList>

              <TabsContent value="day" className="mt-6">
                <DailyTabContent
                  selectedDate={selectedDate}
                  wearableDailySleepData={wearableDailySleepData}
                />
              </TabsContent>

              <TabsContent value="week" className="mt-6">
                <WeeklyTabContent selectedDate={selectedDate} />
              </TabsContent>

              <TabsContent value="month" className="mt-6">
                <MonthlyTabContent selectedDate={selectedDate} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activity;
