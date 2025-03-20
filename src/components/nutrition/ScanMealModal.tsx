
import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ScanMealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMealDetected: (mealData: any) => void;
}

const ScanMealModal = ({ open, onOpenChange, onMealDetected }: ScanMealModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const captureMeal = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        stopCamera();
        
        // Simulate AI processing
        setTimeout(() => {
          // Mock meal detection result
          const detectedMeal = {
            name: "Oatmeal with Berries",
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 8,
            ingredients: ["Oats", "Blueberries", "Strawberries", "Honey"]
          };
          
          onMealDetected(detectedMeal);
          onOpenChange(false);
        }, 1500);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        stopCamera();
        setCapturedImage(null);
      } else if (!isScanning && !capturedImage) {
        startCamera();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 bg-gray-900 text-white">
          <DialogTitle className="flex justify-between items-center">
            <span>Scan Your Meal</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-white" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-square bg-black">
          {!capturedImage ? (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </>
          ) : (
            <img 
              src={capturedImage} 
              alt="Captured meal" 
              className="w-full h-full object-cover" 
            />
          )}
        </div>

        <div className="p-4 flex justify-center">
          {!capturedImage ? (
            <Button 
              variant="default" 
              size="lg" 
              className="rounded-full w-16 h-16 p-0"
              onClick={captureMeal}
            >
              <Camera className="h-8 w-8" />
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" onClick={retakePhoto}>Retake</Button>
              <Button onClick={() => {
                // Process the captured image
                const detectedMeal = {
                  name: "Oatmeal with Berries",
                  calories: 320,
                  protein: 12,
                  carbs: 45,
                  fat: 8,
                  ingredients: ["Oats", "Blueberries", "Strawberries", "Honey"]
                };
                
                onMealDetected(detectedMeal);
                onOpenChange(false);
              }}>Use Photo</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanMealModal;
