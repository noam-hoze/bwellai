
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import MealLoggingSection from "@/components/nutrition/MealLoggingSection";
import DailyIntakeSection from "@/components/nutrition/DailyIntakeSection";
import MealHistorySection from "@/components/nutrition/MealHistorySection";
import TrendsInsightsSection from "@/components/nutrition/TrendsInsightsSection";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "trends">("daily");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-gray-50">
        <NutritionHeader />
        <div className="space-y-8">
          <MealLoggingSection />
          <DailyIntakeSection />
          <MealHistorySection />
          {activeTab === "trends" && <TrendsInsightsSection />}
        </div>
      </div>
    </Layout>
  );
};

export default Nutrition;
