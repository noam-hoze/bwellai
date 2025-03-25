import { useState } from "react";

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
      new Date(date || new Date())?.toISOString()?.split("T")?.[0],
      true
    );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-gray-50">
        <NutritionHeader />
        <div className="space-y-8">
          <MealLoggingSection refetchLoggedMeals={refetchLoggedMeals} />
          <DailyIntakeSection />
          <MealHistorySection
            date={date}
            setDate={setDate}
            loggedMealData={loggedMealData}
          />
          {activeTab === "trends" && <TrendsInsightsSection />}
        </div>
      </div>
    </Layout>
  );
};

export default Nutrition;
