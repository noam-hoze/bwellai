import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import MealLoggingSection from "@/components/nutrition/MealLoggingSection";
import DailyIntakeSection from "@/components/nutrition/DailyIntakeSection";
import MealHistorySection from "@/components/nutrition/MealHistorySection";
import TrendsInsightsSection from "@/components/nutrition/TrendsInsightsSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useGetUserFoodReportUpload,
  useGetUserLoggedMealDataFetcherV4,
} from "@/service/hooks/nutrition/useGetFoodReportUpload";
import SavedItemsSection from "@/components/nutrition/SavedItemsSection";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import { calorieNumberDisplayed } from "@/utils/utils";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "trends">("daily");
  const [activeView, setActiveView] = useState<"meals" | "savedItems">("meals");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const navigate = useNavigate();

  const {
    data: getProfileIsData,
    isSuccess: getProfileIsSuccess,
    refetch: getUserProfileRefetch,
  } = useGetUserProfile();

  const { data: loggedMealData, refetch: refetchLoggedMeals } =
    useGetUserLoggedMealDataFetcherV4(
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(date || new Date())),
      true
    );

  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [totalDailyProtein, setTotalDailyProtein] = useState(0);
  const [totalDailyFats, setTotalDailyFats] = useState(0);
  const [totalDailyCarbs, setTotalDailyCarbs] = useState(0);

  const [totalDailyRequiredCalories, setTotalDailyRequiredCalories] =
    useState(0);

  useEffect(() => {
    const requiredCalories = calorieNumberDisplayed({
      age: getProfileIsData?.age,
      gender: getProfileIsData?.gender,
      height: getProfileIsData?.height,
      weight: getProfileIsData?.weight,
      frequency:
        getProfileIsData?.additionalDetails?.[
          "How often do you exercise in a week?"
        ]?.answersArray?.[0],
    });

    setTotalDailyRequiredCalories(requiredCalories);
  }, [getProfileIsData]);

  useEffect(() => {
    if (loggedMealData) {
      let tc = 0;
      let pc = 0;
      let fc = 0;
      let cc = 0;

      loggedMealData?.forEach((d) => {
        tc += d.ai_response?.calories?.quantity;
      });
      loggedMealData?.forEach((d) => {
        pc += d.ai_response?.protein?.quantity;
      });
      loggedMealData?.forEach((d) => {
        fc += d.ai_response?.fats?.quantity;
      });
      loggedMealData?.forEach((d) => {
        cc += d.ai_response?.carbohydrates?.quantity;
      });
      setTotalDailyCalories(tc);
      setTotalDailyProtein(pc);
      setTotalDailyFats(fc);
      setTotalDailyCarbs(cc);
    }
  }, [loggedMealData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-gray-50">
        <NutritionHeader />
        <div className="mb-6">
          <MealLoggingSection
            refetchLoggedMeals={refetchLoggedMeals}
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyCarbs={totalDailyCarbs}
            totalDailyRequiredCalories={totalDailyRequiredCalories}
          />
          <DailyIntakeSection
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyCarbs={totalDailyCarbs}
            totalDailyFats={totalDailyFats}
            totalDailyRequiredCalories={totalDailyRequiredCalories}
          />

          <Tabs
            defaultValue="meals"
            value={activeView}
            onValueChange={(value) =>
              setActiveView(value as "meals" | "savedItems")
            }
            className="w-full mt-8"
          >
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="meals">Meals</TabsTrigger>
              <TabsTrigger value="savedItems">Saved Items</TabsTrigger>
            </TabsList>

            <TabsContent value="meals" className="space-y-8">
              <MealHistorySection
                date={date}
                setDate={setDate}
                loggedMealData={loggedMealData}
                refetchLoggedMeals={refetchLoggedMeals}
                totalDailyCalories={totalDailyCalories}
                totalDailyProtein={totalDailyProtein}
                totalDailyCarbs={totalDailyCarbs}
                totalDailyRequiredCalories={totalDailyRequiredCalories}
              />
              {activeTab === "trends" && <TrendsInsightsSection />}
            </TabsContent>

            <TabsContent value="savedItems">
              <SavedItemsSection
                loggedMealData={loggedMealData}
                totalDailyCalories={totalDailyCalories}
                totalDailyProtein={totalDailyProtein}
                totalDailyCarbs={totalDailyCarbs}
                totalDailyRequiredCalories={totalDailyRequiredCalories}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Nutrition;
