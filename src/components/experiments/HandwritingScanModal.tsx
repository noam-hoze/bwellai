
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScanProcessingLoader from "./ScanProcessingLoader";
import SimpleCameraModal from "./SimpleCameraModal";
import { ScanResult } from "@/types/scanResults";

interface HandwritingScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete: (result: ScanResult) => void;
}

const HandwritingScanModal = ({ open, onOpenChange, onAnalysisComplete }: HandwritingScanModalProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showCamera, setShowCamera] = useState(true);

  const handwritingGuidelines = [
    "Write naturally on white paper",
    "Use black or blue pen",
    "Include full sentences",
    "Ensure clear, well-lit photo"
  ];

  const handwritingInstructions = "Please write the following sentence in your natural handwriting: 'The quick brown fox jumps over the lazy dog. Today is a beautiful day and I feel great about my health journey.'";

  console.log("HandwritingScanModal render - State:", {
    open,
    capturedImage: !!capturedImage,
    showLoader,
    showCamera
  });

  const handleImageCaptured = (imageData: string) => {
    console.log("HandwritingScanModal: Image captured, starting processing");
    console.log("HandwritingScanModal: Setting states - capturedImage: true, showCamera: false, showLoader: true");
    
    setCapturedImage(imageData);
    setShowCamera(false);
    setShowLoader(true);
    
    console.log("HandwritingScanModal: States should now be - capturedImage: true, showCamera: false, showLoader: true");
  };

  const handleAnalysisComplete = (result: ScanResult) => {
    console.log("HandwritingScanModal: Analysis complete");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
    onAnalysisComplete(result);
    onOpenChange(false);
  };

  const handleRetry = () => {
    console.log("HandwritingScanModal: Retrying scan");
    setShowLoader(false);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleClose = () => {
    console.log("HandwritingScanModal: Closing modal");
    setCapturedImage(null);
    setShowLoader(false);
    setShowCamera(true);
    onOpenChange(false);
  };

  console.log("HandwritingScanModal: Checking render conditions - showLoader:", showLoader);

  if (showLoader) {
    console.log("HandwritingScanModal: Rendering ScanProcessingLoader");
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <ScanProcessingLoader 
            scanType="handwriting"
            onAnalysisComplete={handleAnalysisComplete}
            onRetry={handleRetry}
            imageData={capturedImage || undefined}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  console.log("HandwritingScanModal: Rendering SimpleCameraModal");
  return (
    <SimpleCameraModal 
      open={open && showCamera}
      onOpenChange={handleClose}
      onImageCaptured={handleImageCaptured}
      title="Handwriting Analysis"
      guidelines={handwritingGuidelines}
      specialInstructions={handwritingInstructions}
    />
  );
};

export default HandwritingScanModal;
