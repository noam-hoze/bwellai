
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScanProcessingLoader from "./ScanProcessingLoader";
import SimpleCameraModal from "./SimpleCameraModal";
import { ScanResult } from "@/types/scanResults";

interface EyeScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete: (result: ScanResult) => void;
}

const EyeScanModal = ({ open, onOpenChange, onAnalysisComplete }: EyeScanModalProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showCamera, setShowCamera] = useState(true);


  const eyeGuidelines = [
    "Ensure bright, even lighting",
    "Look directly at the camera",
    "Remove glasses or contact lenses",
    "Keep eye wide open and steady"
  ];

  console.log("EyeScanModal render - State:", {
    open,
    capturedImage: !!capturedImage,
    showLoader,
    showCamera
  });

  const handleImageCaptured = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
    setShowLoader(true);
  };


  const handleAnalysisComplete = (result: ScanResult) => {
    console.log("EyeScanModal: Analysis complete");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
    onAnalysisComplete(result);
    onOpenChange(false);
  };

  const handleRetry = () => {
    console.log("EyeScanModal: Retrying scan");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleClose = () => {
    console.log("EyeScanModal: Closing modal");
    setCapturedImage(null);
    setShowLoader(false);
    setShowCamera(true);
    onOpenChange(false);
  };

  console.log("EyeScanModal: Checking render conditions - showLoader:", showLoader);

  if (showLoader) {
    console.log("EyeScanModal: Rendering ScanProcessingLoader");
    return (
      <Dialog open={open} onOpenChange={() => { }}>
        <DialogContent className="sm:max-w-md">
          <ScanProcessingLoader
            scanType="eye"
            onAnalysisComplete={handleAnalysisComplete}
            onRetry={handleRetry}
            imageData={capturedImage || undefined}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  console.log("EyeScanModal: Rendering SimpleCameraModal");
  return (
    <SimpleCameraModal
      open={open && showCamera}
      onOpenChange={handleClose}
      onImageCaptured={handleImageCaptured}
      title="Eye Analysis"
      guidelines={eyeGuidelines}
    />
  );
};

export default EyeScanModal;
