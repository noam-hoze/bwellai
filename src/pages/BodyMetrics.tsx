
import React from "react";
import Layout from "@/components/layout/Layout";
import DailySummarySection from "@/components/body-metrics/DailySummarySection";
import WeeklyTrendsSection from "@/components/body-metrics/WeeklyTrendsSection";
import InsightsRecommendations from "@/components/body-metrics/InsightsRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const BodyMetrics = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Redirect to welcome page if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <img
            src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
            alt="B-Well Logo"
            className="h-16 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your body metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Body Metrics</h1>
        
        <Tabs defaultValue="daily" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily Summary</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <DailySummarySection />
          </TabsContent>
          
          <TabsContent value="weekly">
            <WeeklyTrendsSection />
          </TabsContent>
        </Tabs>
        
        <InsightsRecommendations />
      </div>
    </Layout>
  );
};

export default BodyMetrics;
