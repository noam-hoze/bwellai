import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import AddDataDropdown from "@/components/dashboard/AddDataDropdown";
import BodyHealthMap from "@/components/dashboard/BodyHealthMap";
import HealthAlerts from "@/components/dashboard/HealthAlerts";
import DailyCheckin from "@/components/dashboard/DailyCheckin";
import HealthOverview from "@/components/dashboard/HealthOverview";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import FaceScanModal from "@/components/face-scan/FaceScanModal";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BodyModelEnhanced from "@/components/dashboard/BodyModelEnhanced";
import EnhancedFaceScanModal from "@/components/face-scan/EnhancedFaceScanModal";

const Index = () => {
  const { toast } = useToast();
  const { isAuthenticated, loading } = useAuth();
  const [isFaceScanOpen, setIsFaceScanOpen] = useState(false);
  const [iframeModal, setIframeModal] = useState(false);

  // Redirect to welcome page if not authenticated
  if (!loading && !localStorage.getItem("token")) {
    return <Navigate to="/welcome" replace />;
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
      title: "Coming Soon",
      description: "Wearable connections will be available in the next update.",
    });
  };

  const handleScanFace = () => {
    setIsFaceScanOpen(true);
    // setIframeModal(true);
  };

  const handleIFrameModalClose = () => {
    setIframeModal(false);
  };

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

        <HealthOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-3">
            <BodyHealthMap />
          </div>
        </div>

        <BodyModelEnhanced />
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>

      <EnhancedFaceScanModal
        isOpen={isFaceScanOpen}
        onClose={() => setIsFaceScanOpen(false)}
      />

      <Dialog open={iframeModal} onOpenChange={handleIFrameModalClose}>
        <DialogHeader className="p-4 bg-gray-900 text-white">
          <DialogTitle className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={handleIFrameModalClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <DialogContent className="sm:max-w-md h-[40em] p-0 overflow-hidden">
          <DialogHeader>
            <iframe
              src="https://app-dev.bwellai.com/facescan"
              allow="cross-origin-isolated"
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
