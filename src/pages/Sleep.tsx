import { useEffect, useState } from "react";
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
  useGetExcludeDataV4,
  useGetUserInfoTerraData,
  useGetWearableDailyDataV4,
  useGetWearableDailyRecommendationDataV4,
  useGetWearableMonthlyDataV4,
  useGetWearableMonthlyRecommendationDataV4,
  useGetWearableWeeklyDataV4,
  useGetWearableWeeklyRecommendationDataV4,
} from "@/service/hooks/wearable/terra/useGetUserInfo";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";

type ViewType = "day" | "week" | "month";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const Sleep = () => {
  const { toast } = useToast();
  const { isAuthenticated, loading } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const debouncedSearch = useDebounce(selectedDate, 700);
  const [excludeActionType, setExcludeActionType] = useState("");
  const [viewType, setViewType] = useState<ViewType>("day");

  const { data: connectedDevicesData, refetch: connectedDevicesRefetch } =
    useGetUserInfoTerraData({ isAuthenticated: true });

  const {
    data: wearableDailyRecommendationData,
    isSuccess: wearableDailyRecommendationIsSuccess,
    isLoading: wearableDailyRecommendationIsLoading,
  } = useGetWearableDailyRecommendationDataV4({
    resource: connectedDevicesData?.[0]?.device,
    startDate: formatDate(debouncedSearch),
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
    language: "english",
  });
  const {
    data: wearableDailyData,
    isSuccess: wearableDailyIsSuccess,
    isLoading: wearableDailyIsLoading,
    refetch: wearableDailyRefetch,
  } = useGetWearableDailyDataV4({
    resource: connectedDevicesData?.[0]?.device,
    startDate: formatDate(debouncedSearch),
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
  });
  const {
    data: wearableMonthlyData,
    isSuccess: wearableMonthlyIsSuccess,
    isLoading: wearableMonthlyIsLoading,
  } = useGetWearableMonthlyDataV4({
    resource: connectedDevicesData?.[0]?.device,
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
    startDate: formatDate(debouncedSearch),
  });

  const {
    data: wearableWeeklyRecommendationData,
    isSuccess: wearableWeeklyRecommendationIsSuccess,
    isLoading: wearableWeeklyRecommendationIsLoading,
  } = useGetWearableWeeklyRecommendationDataV4({
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
    language: "english",
    startDate: formatDate(debouncedSearch),
  });
  const {
    data: wearableMonthlyRecommendationData,
    isSuccess: wearableMonthlyRecommendationIsSuccess,
    isLoading: wearableMonthlyRecommendationIsLoading,
  } = useGetWearableMonthlyRecommendationDataV4({
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
    language: "english",
    startDate: formatDate(debouncedSearch),
  });

  const {
    data: wearableWeeklyData,
    isSuccess: wearableWeeklyIsSuccess,
    isLoading: wearableWeeklyIsLoading,
  } = useGetWearableWeeklyDataV4({
    resource: connectedDevicesData?.[0]?.device,
    isEnable:
      connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : "",
    startDate: formatDate(debouncedSearch),
  });

  const { data: getProfileIsData } = useGetUserProfile({ isAuthenticated });

  const { mutate: excludeMutate, isSuccess: excludeIsSuccess } =
    useGetExcludeDataV4();

  const handleExcludeMutate = ({ type }) => {
    setExcludeActionType(type);
    excludeMutate({
      data_type: "sleep",
      date: formatDate(debouncedSearch),
      type,
    });
  };

  useEffect(() => {
    if (excludeIsSuccess) {
      wearableDailyRefetch();

      toast({
        title: "",
        description: `Data ${excludeActionType}d successfully`,
      });
    }
  }, [excludeIsSuccess]);

  const handlePrevious = () => {
    setSelectedDate((prev) => goToPreviousDate(prev, viewType));
  };

  const handleNext = () => {
    setSelectedDate((prev) => goToNextDate(prev, viewType));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const isTodaySelected = isToday(debouncedSearch) && viewType === "day";
  const dateDisplay = getDateDisplay(debouncedSearch, viewType);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

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
              wearableDailyData={wearableDailyData}
              handleExcludeMutate={handleExcludeMutate}
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
                  selectedDate={debouncedSearch}
                  wearableDailyRecommendationData={
                    wearableDailyRecommendationData?.aiResponse?.insights
                  }
                  wearableDailyData={wearableDailyData}
                  getProfileIsData={getProfileIsData}
                />
              </TabsContent>

              <TabsContent value="week" className="mt-6">
                <WeeklyTabContent
                  selectedDate={debouncedSearch}
                  wearableWeeklyRecommendationData={
                    wearableWeeklyRecommendationData?.aiResponse?.insights
                  }
                  wearableWeeklyData={wearableWeeklyData}
                  getProfileIsData={getProfileIsData}
                />
              </TabsContent>

              <TabsContent value="month" className="mt-6">
                <MonthlyTabContent
                  selectedDate={debouncedSearch}
                  wearableMonthlyRecommendationData={
                    wearableMonthlyRecommendationData?.aiResponse?.insights
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
