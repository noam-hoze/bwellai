import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import DateNavigation from "@/components/sleep/DateNavigation";
import SleepHeader from "@/components/sleep/SleepHeader";
import DailyTabContent from "@/components/sleep/DailyTabContent";
import WeeklyTabContent from "@/components/sleep/WeeklyTabContent";
import MonthlyTabContent from "@/components/sleep/MonthlyTabContent";
import {
  getDateDisplay,
  goToPreviousDate,
  goToNextDate,
  isToday,
} from "@/components/sleep/SleepDateUtils";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetUserInfoTerraData,
  useGetWearableDailyDataV4,
  useGetWearableDailyRecommendationDataV4,
  useGetWearableMonthlyDataV4,
  useGetWearableMonthlyRecommendationDataV4,
  useGetWearableWeeklyDataV4,
  useGetWearableWeeklyRecommendationDataV4,
} from "@/service/hooks/wearable/terra/useGetUserInfo";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";

type ViewType = "day" | "week" | "month";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const Sleep = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>("day");

  const { data: connectedDevicesData, refetch: connectedDevicesRefetch } =
    useGetUserInfoTerraData({ isAuthenticated: true });

  const {
    data: wearableDailyRecommendationData,
    isSuccess: wearableDailyRecommendationIsSuccess,
    isLoading: wearableDailyRecommendationIsLoading,
  } = useGetWearableDailyRecommendationDataV4({
    resource: connectedDevicesData?.[0],
    startDate: formatDate(selectedDate),
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
    language: "english",
  });
  const {
    data: wearableDailyData,
    isSuccess: wearableDailyIsSuccess,
    isLoading: wearableDailyIsLoading,
  } = useGetWearableDailyDataV4({
    resource: connectedDevicesData?.[0],
    startDate: formatDate(selectedDate),
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
  });
  const {
    data: wearableMonthlyData,
    isSuccess: wearableMonthlyIsSuccess,
    isLoading: wearableMonthlyIsLoading,
  } = useGetWearableMonthlyDataV4({
    resource: connectedDevicesData?.[0],
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
    startDate: formatDate(selectedDate),
  });

  const {
    data: wearableWeeklyRecommendationData,
    isSuccess: wearableWeeklyRecommendationIsSuccess,
    isLoading: wearableWeeklyRecommendationIsLoading,
  } = useGetWearableWeeklyRecommendationDataV4({
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
    language: "english",
    startDate: formatDate(selectedDate),
  });
  const {
    data: wearableMonthlyRecommendationData,
    isSuccess: wearableMonthlyRecommendationIsSuccess,
    isLoading: wearableMonthlyRecommendationIsLoading,
  } = useGetWearableMonthlyRecommendationDataV4({
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
    language: "english",
    startDate: formatDate(selectedDate),
  });

  const {
    data: wearableWeeklyData,
    isSuccess: wearableWeeklyIsSuccess,
    isLoading: wearableWeeklyIsLoading,
  } = useGetWearableWeeklyDataV4({
    resource: connectedDevicesData?.[0],
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0] : "",
    startDate: formatDate(selectedDate),
  });

  const { data: getProfileIsData } = useGetUserProfile();

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
          <SleepHeader />

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
                  Day
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  Week
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  Month
                </TabsTrigger>
              </TabsList>

              <TabsContent value="day" className="mt-6">
                <DailyTabContent
                  selectedDate={selectedDate}
                  wearableDailyRecommendationData={
                    wearableDailyRecommendationData?.ai_response?.insights
                  }
                  wearableDailyData={wearableDailyData}
                  getProfileIsData={getProfileIsData}
                />
              </TabsContent>

              <TabsContent value="week" className="mt-6">
                <WeeklyTabContent
                  selectedDate={selectedDate}
                  wearableWeeklyRecommendationData={
                    wearableWeeklyRecommendationData?.ai_response?.insights
                  }
                  wearableWeeklyData={wearableWeeklyData}
                  getProfileIsData={getProfileIsData}
                />
              </TabsContent>

              <TabsContent value="month" className="mt-6">
                <MonthlyTabContent
                  selectedDate={selectedDate}
                  wearableMonthlyRecommendationData={
                    wearableMonthlyRecommendationData?.ai_response?.insights
                  }
                  wearableMonthlyData={wearableMonthlyData}
                  getProfileIsData={getProfileIsData}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sleep;
