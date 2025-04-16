import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import AddDataDropdown from "@/components/dashboard/AddDataDropdown";
import HealthOverview from "@/components/dashboard/HealthOverview";
import FriendlyGreeting from "@/components/dashboard/FriendlyGreeting";
import BodyHealthInterface from "@/components/dashboard/BodyHealthInterface";
import HealthNavigator from "@/components/dashboard/HealthNavigator";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProtocolTracker from "@/components/dashboard/ProtocolTracker";
import HealthVisualizations from "@/components/dashboard/HealthVisualizations";
import LabResultsSummary from "@/components/dashboard/LabResultsSummary";
import MessagesCenter from "@/components/dashboard/MessagesCenter";
import NextActions from "@/components/dashboard/NextActions";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  console.log(!loading && !isAuthenticated, loading, isAuthenticated);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/onboarding/0" replace />;
  }

  const handleLogMeal = () => {
    toast({
      title: "Coming Soon",
      description: "Meal logging will be available in the next update.",
    });
  };

  const handleUploadLabReport = () => {
    toast({
      title: "Coming Soon",
      description: "Lab report uploads will be available in the next update.",
    });
  };

  const handleConnectWearable = () => {
    toast({
      title: "Connecting Wearable",
      description: "Taking you to the Connections Hub...",
    });
  };

  const handleScanFace = () => {
    navigate("/face-scan");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <img
            src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
            alt="B-Well Logo"
            className="h-16 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <Button
            onClick={handleScanFace}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
          >
            <ScanFace className="mr-2 h-4 w-4" />
            Scan Face for Vitals
          </Button>

          <AddDataDropdown
            onLogMeal={handleLogMeal}
            onUploadLabReport={handleUploadLabReport}
            onConnectWearable={handleConnectWearable}
            onScanFace={handleScanFace}
          />
        </div>

        <FriendlyGreeting />

        <HealthOverview />

        <HealthNavigator />

        <div className="grid gap-6 md:grid-cols-2 mt-6 space-y-6">
          <ProtocolTracker />
          <NextActions />
        </div>

        <div className="mt-6">
          <HealthVisualizations />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <LabResultsSummary />
          <MessagesCenter />
        </div>

        <BodyHealthInterface />
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
