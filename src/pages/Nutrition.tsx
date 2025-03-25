import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import MealLoggingSection from "@/components/nutrition/MealLoggingSection";
import DailyIntakeSection from "@/components/nutrition/DailyIntakeSection";
import MealHistorySection from "@/components/nutrition/MealHistorySection";
import TrendsInsightsSection from "@/components/nutrition/TrendsInsightsSection";
import { useGetUserFoodReportUpload } from "@/service/hooks/nutrition/useGetFoodReportUpload";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "trends">("daily");
  const navigate = useNavigate();

  const {
    data: foodReportData,
    isSuccess: foodReportSuccess,
    isError: foodReportIsError,
    // error: foodReportError,
    isPending: foodReportPending,
    mutate: foodReportMutate,
  } = useGetUserFoodReportUpload();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    foodReportMutate({ PdfFile: file, language: "English" });
  };

  const inputChangeHandler = (e) => {
    if (localStorage.getItem("token")) {
      handleFileChange(e);
    } else {
      navigate("/login");
    }
  };

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
