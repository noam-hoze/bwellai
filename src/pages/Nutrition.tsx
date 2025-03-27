import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import MealLoggingSection from "@/components/nutrition/MealLoggingSection";
import DailyIntakeSection from "@/components/nutrition/DailyIntakeSection";
import MealHistorySection from "@/components/nutrition/MealHistorySection";
import TrendsInsightsSection from "@/components/nutrition/TrendsInsightsSection";
import {
  useGetUserFoodReportUpload,
  useGetUserLoggedMealDataFetcherV4,
} from "@/service/hooks/nutrition/useGetFoodReportUpload";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "trends">("daily");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const navigate = useNavigate();

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
        <div className="space-y-8">
          <MealLoggingSection refetchLoggedMeals={refetchLoggedMeals} />
          <DailyIntakeSection
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyFats={totalDailyFats}
            totalDailyCarbs={totalDailyCarbs}
          />
          <MealHistorySection
            date={date}
            setDate={setDate}
            loggedMealData={loggedMealData}
            refetchLoggedMeals={refetchLoggedMeals}
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyCarbs={totalDailyCarbs}
          />
          {activeTab === "trends" && <TrendsInsightsSection />}
        </div>
      </div>
    </Layout>
  );
};

export default Nutrition;
