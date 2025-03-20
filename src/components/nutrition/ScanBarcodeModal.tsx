
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ScanBarcodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductDetected: (productData: any) => void;
}

const ScanBarcodeModal = ({ open, onOpenChange, onProductDetected }: ScanBarcodeModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);

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

  const handleClose = () => {
    stopCamera();
    setBarcodeResult(null);
    onOpenChange(false);
  };

  // Simulate barcode detection
  const simulateBarcodeDetection = () => {
    setTimeout(() => {
      // Mock barcode detection
      const barcode = "8901030656934";
      setBarcodeResult(barcode);
      
      // Mock product data
      const productData = {
        name: "Greek Yogurt",
        brand: "Chobani",
        calories: 120,
        protein: 15,
        carbs: 7,
        fat: 3,
        ingredients: ["Milk", "Live Active Cultures", "Fruit"]
      };
      
      // Simulate API lookup
      setTimeout(() => {
        onProductDetected(productData);
        onOpenChange(false);
      }, 1000);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        stopCamera();
        setBarcodeResult(null);
      } else if (!isScanning && !barcodeResult) {
        startCamera();
        // Start the simulation when opening
        simulateBarcodeDetection();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 bg-gray-900 text-white">
          <DialogTitle className="flex justify-between items-center">
            <span>Scan Barcode</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-white" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-square bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          
          {/* Barcode detection overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="border-2 border-wellness-bright-green w-3/4 h-1/4 rounded-lg"></div>
            <p className="text-white mt-4 bg-black/50 p-2 rounded">
              {barcodeResult ? 
                `Detected: ${barcodeResult}` : 
                "Position barcode within the box"}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-center text-sm text-gray-500">
            {barcodeResult ? 
              "Looking up product information..." : 
              "Hold your device steady to scan the barcode"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanBarcodeModal;
