
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  X, 
  Loader, 
  Heart, 
  ActivitySquare, 
  Zap, 
  Star, 
  RefreshCw, 
  Save, 
  HelpCircle 
} from "lucide-react";

type ScanStep = "capture" | "processing" | "results";

interface FaceScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FaceScanModal = ({ isOpen, onClose }: FaceScanModalProps) => {
  const [step, setStep] = useState<ScanStep>("capture");
  const [scanProgress, setScanProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  
  // Mock scan results - in a real app, these would come from an actual scan
  const scanResults = {
    heartRate: 72,
    bloodPressure: { systolic: 118, diastolic: 78 },
    stressLevel: "Low",
    scanQuality: 4, // Out of 5
  };

  // Handle scan simulation
  React.useEffect(() => {
    let interval: number | null = null;
    
    if (isOpen && step === "capture") {
      // Simulate scan progress
      interval = window.setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep("processing");
            // Reset scan progress for next time
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    } else if (step === "processing") {
      // Simulate processing progress
      interval = window.setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep("results");
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, step]);

  const handleRetakeScan = () => {
    setScanProgress(0);
    setProcessingProgress(0);
    setStep("capture");
  };

  const handleSaveData = () => {
    // Here you would save the data to your backend or local storage
    // For now, let's just close the modal and show a success message
    onClose();
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  const renderScanStep = () => {
    switch (step) {
      case "capture":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-sm h-64 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
              <Camera className="h-16 w-16 text-gray-400 animate-pulse" />
              <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
                Ensure good lighting and keep your face steady
              </div>
            </div>
            
            <div className="w-full max-w-sm">
              <div className="flex justify-between text-sm mb-1">
                <span>Starting scan...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
            
            <Button variant="destructive" onClick={onClose} className="mt-4">
              <X className="mr-2 h-4 w-4" />
              Cancel Scan
            </Button>
          </div>
        );
        
      case "processing":
        return (
          <div className="flex flex-col items-center space-y-6 py-8">
            <Loader className="h-16 w-16 text-wellness-bright-green animate-spin" />
            <h3 className="text-xl font-semibold">Analyzing your vitals...</h3>
            
            <div className="w-full max-w-sm">
              <div className="flex justify-between text-sm mb-1">
                <span>Processing scan data</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
            
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Our AI is analyzing your facial features to extract vital signs.
              This might take a few moments.
            </p>
          </div>
        );
        
      case "results":
        return (
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-semibold">Scan Results</h3>
            
            <div className="relative w-full max-w-sm h-48 bg-gray-100 rounded-lg overflow-hidden">
              {/* This would be the actual scanned face with overlay in a real implementation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-red-400/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            
            <div className="w-full max-w-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f9fafb] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium">Heart Rate</h4>
                  </div>
                  <p className="text-2xl font-bold">{scanResults.heartRate} <span className="text-sm font-normal">bpm</span></p>
                </div>
                
                <div className="bg-[#f9fafb] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ActivitySquare className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Blood Pressure</h4>
                  </div>
                  <p className="text-2xl font-bold">
                    {scanResults.bloodPressure.systolic}/{scanResults.bloodPressure.diastolic}
                  </p>
                </div>
                
                <div className="bg-[#f9fafb] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium">Stress Level</h4>
                  </div>
                  <p className="text-2xl font-bold">{scanResults.stressLevel}</p>
                </div>
                
                <div className="bg-[#f9fafb] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-medium">Scan Quality</h4>
                  </div>
                  <div className="pt-1">
                    {renderStarRating(scanResults.scanQuality)}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button onClick={handleSaveData} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Keep Scan & Save Data
                </Button>
                <Button variant="outline" onClick={handleRetakeScan} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake Scan
                </Button>
                <Button variant="ghost" onClick={() => {}} className="flex-1">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  More Info
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <div className="p-2">
          {renderScanStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FaceScanModal;
