import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BrowserMultiFormatReader } from "@zxing/library";
import MealScanLoader from "./MealScanLoader";
import {
  useGetUserFoodReportBarCodeDataByReportIdV4,
  useGetUserFoodReportByBarCode,
} from "@/service/hooks/nutrition/useGetFoodReportUpload";

interface ScanBarcodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductDetected?: (productData: any) => void;
}

const ScanBarcodeModal = ({
  open,
  onOpenChange,
  onProductDetected,
}: ScanBarcodeModalProps) => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);

  const {
    data: foodReportBarCodeData,
    isSuccess: foodReportBarCodeSuccess,
    isError: foodReportBarCodeIsError,
    error: foodReportBarCodeError,
    isPending: foodReportBarCodePending,
    mutate: foodReportBarCodeMutate,
  } = useGetUserFoodReportByBarCode();

  const {
    data: foodReportBarCodeAIData,
    isSuccess: foodReportBarCodeAIDataSuccess,
    isError: foodReportBarCodeAIDataIsError,
    error: foodReportBarCodeAIDataError,
    isLoading: foodReportBarCodeAIDataPending,
  } = useGetUserFoodReportBarCodeDataByReportIdV4({
    isAuthenticated: true,
    reportId: foodReportBarCodeData?.reportId,
    language: "English",
  });

  const startCamera = async () => {
    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      const videoElement = videoRef.current;

      if (videoElement) {
        videoElement.srcObject = stream;
        codeReaderRef.current.decodeFromVideoDevice(
          null,
          videoElement,
          (result) => {
            if (result) {
              setTimeout(() => {
                setBarcodeResult(result.getText());
                // handleClose(); // Stop scanning after success
              }, 1000);
            }
          }
        );
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const handleClose = () => {
    stopCamera();
    onOpenChange(false);
    setBarcodeResult(null);
  };

  useEffect(() => {
    if (barcodeResult) {
      onOpenChange(false);
      foodReportBarCodeMutate({
        bar_code: barcodeResult,
      });
    }
  }, [barcodeResult]);

  // Simulate barcode detection
  const simulateBarcodeDetection = () => {
    console.log(foodReportBarCodeAIData);

    const productData = {
      is_saved: foodReportBarCodeAIData?.is_saved || false,
      id: foodReportBarCodeAIData?.es_id,
      name: foodReportBarCodeAIData?.jsonNode?.food_name,
      brand: "",
      category: foodReportBarCodeAIData?.jsonNode?.categoryOfFood,
      image: "",
      score: foodReportBarCodeAIData?.jsonNode?.general_food_quality_rating,
      rating: foodReportBarCodeAIData?.jsonNode?.categorySpecificRating,
      // concerns: [
      //   {
      //     name: "",
      //     amount: "",
      //     explanation: "",
      //     severity: "",
      //     details: "",
      //   },
      concerns: foodReportBarCodeAIData?.jsonNode?.warning,
      benefits: [
        {
          name: "",
          amount: "",
          explanation: "",
          details: "",
        },
      ],
      ingredients: foodReportBarCodeAIData?.jsonNode?.ingredients?.map(
        (list) => {
          return list?.name;
        }
      ),
      allergens: [],
      alternatives: [],
      healthImpact: foodReportBarCodeAIData?.jsonNode?.health_impact,
    };

    navigate("/food-scan-analysis", { state: { productData } });
  };

  useEffect(() => {
    if (foodReportBarCodeAIDataSuccess && foodReportBarCodeAIData) {
      handleClose();

      simulateBarcodeDetection();
    }
  }, [foodReportBarCodeAIDataSuccess && foodReportBarCodeAIData]);

  // ✅ Automatically start the camera when the modal opens
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  return (
    <>
      <Dialog open={foodReportBarCodePending || foodReportBarCodeAIDataPending}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader>
            <MealScanLoader
              onAnalysisComplete={simulateBarcodeDetection}
              // imageData={capturedImage}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        // onOpenChange={(open) => {
        //   if (!open) {
        //     stopCamera();
        //     setBarcodeResult(null);
        //   } else if (!isScanning && !barcodeResult) {
        //     startCamera();
        //     // Start the simulation when opening
        //     simulateBarcodeDetection();
        //   }
        //   onOpenChange(open);
        // }}
        onOpenChange={handleClose}
      >
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 bg-gray-900 text-white">
            <DialogTitle className="flex justify-between items-center">
              <span>Scan Barcode</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
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
                {barcodeResult
                  ? `Detected: ${barcodeResult}`
                  : "Position barcode within the box"}
              </p>
            </div>
          </div>

          <div className="p-4">
            <p className="text-center text-sm text-gray-500">
              {barcodeResult
                ? "Looking up product information..."
                : "Hold your device steady to scan the barcode"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanBarcodeModal;
