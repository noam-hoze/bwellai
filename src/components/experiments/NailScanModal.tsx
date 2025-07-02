
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScanProcessingLoader from "./ScanProcessingLoader";
import SimpleCameraModal from "./SimpleCameraModal";
import { ScanResult } from "@/types/scanResults";

interface NailScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete: (result: ScanResult) => void;
}

const NailScanModal = ({ open, onOpenChange, onAnalysisComplete }: NailScanModalProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showCamera, setShowCamera] = useState(true);

  const nailGuidelines = [
    "Clean nails without polish",
    "Good lighting on fingertips",
    "Hold hand steady and flat",
    "Include nail bed in frame"
  ];

  console.log("NailScanModal render - State:", {
    open,
    capturedImage: !!capturedImage,
    showLoader,
    showCamera
  });

  const handleImageCaptured = (imageData: string) => {
    console.log("NailScanModal: Image captured, starting processing");
    console.log("NailScanModal: Setting states - capturedImage: true, showCamera: false, showLoader: true");
    
    setCapturedImage(imageData);
    setShowCamera(false);
    setShowLoader(true);
    
    console.log("NailScanModal: States should now be - capturedImage: true, showCamera: false, showLoader: true");
  };

  const handleAnalysisComplete = (result: ScanResult) => {
    console.log("NailScanModal: Analysis complete");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
    onAnalysisComplete(result);
    onOpenChange(false);
  };

  const handleRetry = () => {
    console.log("NailScanModal: Retrying scan");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleClose = () => {
    console.log("NailScanModal: Closing modal");
    setCapturedImage(null);
    setShowLoader(false);
    setShowCamera(true);
    onOpenChange(false);
  };

  console.log("NailScanModal: Checking render conditions - showLoader:", showLoader);

  if (showLoader) {
    console.log("NailScanModal: Rendering ScanProcessingLoader");
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <ScanProcessingLoader 
            scanType="nail"
            onAnalysisComplete={handleAnalysisComplete}
            onRetry={handleRetry}
            imageData={capturedImage || undefined}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  console.log("NailScanModal: Rendering SimpleCameraModal");
  return (
    <SimpleCameraModal 
      open={open && showCamera}
      onOpenChange={handleClose}
      onImageCaptured={handleImageCaptured}
      title="Fingernail Analysis"
      guidelines={nailGuidelines}
    />
  );
};

export default NailScanModal;
