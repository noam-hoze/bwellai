import FriendlyGreeting from "@/components/dashboard/FriendlyGreeting";
import OnboardingFlow from "@/components/first-time/OnboardingFlow";
import DataEntryPrompts from "@/components/first-time/DataEntryPrompts";
import WellnessTips from "@/components/first-time/WellnessTips";
import HealthNavigator from "@/components/dashboard/HealthNavigator";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import AddDataDropdown from "@/components/dashboard/AddDataDropdown";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const DashboardFirstTime = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useAuth();

  if (!loading && !isAuthenticated) {
    return <Navigate to="/onboarding/0" replace />;
  }

  const handleLogMeal = () => {
    navigate("/nutrition");
  };

  const handleUploadLabReport = () => {
    navigate("/reports");
  };

  const handleConnectWearable = () => {
    navigate("/connections");
  };

  const handleScanFace = () => {
    navigate("/face-scan");
  };
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
        <div className="space-y-6">
          <FriendlyGreeting />
          <OnboardingFlow />
          <DataEntryPrompts />
          <HealthNavigator />
          <WellnessTips />
        </div>
      </main>
    </div>
  );
};

export default DashboardFirstTime;
