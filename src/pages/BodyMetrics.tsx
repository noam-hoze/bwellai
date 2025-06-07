import React from "react";
import Layout from "@/components/layout/Layout";
import DailySummarySection from "@/components/body-metrics/DailySummarySection";
import WeeklyTrendsSection from "@/components/body-metrics/WeeklyTrendsSection";
import InsightsRecommendations from "@/components/body-metrics/InsightsRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BodyMetrics = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

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

  const handleUpdateMetrics = () => {
    // do a hard reload, so that the vite server (vite.config.ts) will add Cross-Origin-Embedder-Policy and other stuff that face-scan requires for SharedArrayBuffer.
    window.location.href = "/face-scan";
    // navigate("/face-scan");
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="relative mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Body Metrics</h1>
              <Badge
                variant="coming-soon"
                className="inline-flex w-fit text-base px-3 py-1"
              >
                Coming Soon
              </Badge>
            </div>
            <Button
              onClick={handleUpdateMetrics}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md w-full sm:w-auto"
            >
              <ScanFace className="mr-2 h-4 w-4" />
              Update Your Metrics
            </Button>
          </div>
        </div>

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
