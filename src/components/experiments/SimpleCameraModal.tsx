
import React, { useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import CameraCapture from "./camera/CameraCapture";
import FileUpload from "./camera/FileUpload";
import CapturedImagePreview from "./camera/CapturedImagePreview";

interface SimpleCameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageCaptured: (imageData: string) => void;
  title: string;
  guidelines?: string[];
  specialInstructions?: string;
}

const SimpleCameraModal = ({ 
  open, 
  onOpenChange, 
  onImageCaptured, 
  title,
  guidelines = [],
  specialInstructions
}: SimpleCameraModalProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartCamera = () => {
    setShowCamera(true);
  };

  const handleCapture = useCallback((imageData: string) => {
    console.log("SimpleCameraModal: Image captured");
    setCapturedImage(imageData);
    setShowCamera(false);
  }, []);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmImage = () => {
    if (capturedImage) {
      console.log("SimpleCameraModal: Confirming captured image");
      onImageCaptured(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleClose = () => {
    setCapturedImage(null);
    setShowCamera(false);
    onOpenChange(false);
  };

  if (showCamera) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {title}
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <CameraCapture onCapture={handleCapture} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  if (capturedImage) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Preview
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <CapturedImagePreview
            imageData={capturedImage}
            onConfirm={handleConfirmImage}
            onRetake={handleRetake}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Take a clear photo following the guidelines below:
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Buttons - Now prominent above the fold */}
          <div className="flex gap-3">
            <Button 
              onClick={handleStartCamera}
              className="flex-1 bg-blue-600 hover:bg-blue-700 h-14"
            >
              <Camera className="h-5 w-5 mr-2" />
              Take Photo
            </Button>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 h-14"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Image
            </Button>
          </div>

          {/* Special Instructions */}
          {specialInstructions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">📝 Instructions:</h4>
              <p className="text-yellow-700 text-sm">{specialInstructions}</p>
            </div>
          )}

          {/* Guidelines */}
          {guidelines.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                📋 Guidelines:
              </h4>
              <ul className="space-y-2">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="text-blue-500 mr-2">•</span>
                    {guideline}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FileUpload
            ref={fileInputRef}
            onFileSelect={handleFileSelect}
            accept="image/*"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleCameraModal;
