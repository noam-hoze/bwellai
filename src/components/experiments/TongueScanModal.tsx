
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScanProcessingLoader from "./ScanProcessingLoader";
import SimpleCameraModal from "./SimpleCameraModal";
import { ScanResult } from "@/types/scanResults";

interface TongueScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete: (result: ScanResult) => void;
}

const TongueScanModal = ({ open, onOpenChange, onAnalysisComplete }: TongueScanModalProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showCamera, setShowCamera] = useState(true);

  const tongueGuidelines = [
    "Avoid eating 30 minutes before",
    "Natural lighting preferred",
    "Center tongue in frame"
  ];

  console.log("TongueScanModal render - State:", {
    open,
    capturedImage: !!capturedImage,
    showLoader,
    showCamera
  });

  const handleImageCaptured = (imageData: string) => {
    console.log("TongueScanModal: Image captured, starting processing");
    console.log("TongueScanModal: Setting states - capturedImage: true, showCamera: false, showLoader: true");
    
    setCapturedImage(imageData);
    setShowCamera(false);
    setShowLoader(true);
    
    console.log("TongueScanModal: States should now be - capturedImage: true, showCamera: false, showLoader: true");
  };

  const handleAnalysisComplete = (result: ScanResult) => {
    console.log("TongueScanModal: Analysis complete");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
    onAnalysisComplete(result);
    onOpenChange(false);
  };

  const handleRetry = () => {
    console.log("TongueScanModal: Retrying scan");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleClose = () => {
    console.log("TongueScanModal: Closing modal");
    setCapturedImage(null);
    setShowLoader(false);
    setShowCamera(true);
    onOpenChange(false);
  };

  console.log("TongueScanModal: Checking render conditions - showLoader:", showLoader);

  if (showLoader) {
    console.log("TongueScanModal: Rendering ScanProcessingLoader");
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <ScanProcessingLoader 
            scanType="tongue"
            onAnalysisComplete={handleAnalysisComplete}
            onRetry={handleRetry}
            imageData={capturedImage || undefined}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  console.log("TongueScanModal: Rendering SimpleCameraModal");
  return (
    <SimpleCameraModal 
      open={open && showCamera}
      onOpenChange={handleClose}
      onImageCaptured={handleImageCaptured}
      title="Tongue Analysis"
      guidelines={tongueGuidelines}
    />
  );
};

export default TongueScanModal;
