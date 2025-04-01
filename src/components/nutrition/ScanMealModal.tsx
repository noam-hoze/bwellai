import { useState, useRef, useEffect } from "react";
import { Camera, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useGetUserFoodReportUpload } from "@/service/hooks/nutrition/useGetFoodReportUpload";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import MealScanLoader from "./MealScanLoader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScanMealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMealDetected: (mealData) => void;
  totalDailyCalories?;
  totalDailyProtein?;
  totalDailyCarbs?;
}

const ScanMealModal = ({
  open,
  onOpenChange,
  onMealDetected,
  totalDailyCalories,
  totalDailyProtein,
  totalDailyCarbs,
}: ScanMealModalProps) => {
  const navigate = useNavigate();
  const [portionAmount, setPortionAmount] = useState<number>(1);
  const [portionUnit, setPortionUnit] = useState<string>("portion");
  const [showConfirmPortion, setShowConfirmPortion] = useState<boolean>(false);

  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectFile, setSelectedFile] = useState<any>(null);

  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null
  );

  const {
    data: foodReportData,
    isSuccess: foodReportSuccess,
    isError: foodReportIsError,
    // error: foodReportError,
    isPending: foodReportPending,
    mutate: foodReportMutate,
  } = useGetUserFoodReportUpload();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
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
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const captureMeal = () => {
    setSelectedFile(null);
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);

        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageData);
        setCanvasElement(canvasRef.current);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setShowConfirmPortion(false);
    if (uploadMode) {
      setUploadMode(false);
    }
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setUploadMode(false);
    onOpenChange(false);
    setShowConfirmPortion(false);
  };

  const handleUsePhoto = () => {
    setShowConfirmPortion(true);
  };

  const handleConfirmMeal = () => {
    if (selectFile) {
      foodReportMutate({
        PdfFile: selectFile,
        language: "English",
        portionAmount,
        portionUnit,
      });
    }

    if (!canvasElement) return;

    canvasElement.toBlob(async (blob) => {
      if (!blob) return;

      // Create a File object (if API requires a file upload)
      const imageFile = new File([blob], "meal-photo.png", {
        type: "image/png",
      });

      foodReportMutate({
        PdfFile: imageFile,
        language: "English",
        portionAmount,
        portionUnit,
      });
      // onMealDetected(detectedMeal);
      // onOpenChange(false);
    }, "image/png");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    setUploadMode(true);
    if (isScanning) {
      stopCamera();
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (foodReportPending) {
      // onMealDetected(foodReportData);
      // onOpenChange(false);
      handleClose();
    }
  }, [foodReportPending]);

  // ✅ Automatically start the camera when the modal opens
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  const handleAnalysisComplete = (mealData: any) => {
    navigate("/meal-analysis", {
      state: {
        meal: {
          ai_response: foodReportData?.jsonNode,
          id: foodReportData?.es_id,
          is_favourite: false,
          meal_type: "Breakfast",
          totalDailyCalories,
          totalDailyProtein,
          totalDailyCarbs,
          carbs: foodReportData?.jsonNode?.carbohydrates?.quantity,
          fat: foodReportData?.jsonNode?.fats?.quantity,
          ingredients: foodReportData?.jsonNode?.ingredients?.map(
            (ingredient) => ingredient?.name
          ),
        },
      },
    });

    // Close the modal after navigation
    // onOpenChange(false);
  };

  const handlePortionUnitChange = (value: string) => {
    setPortionUnit(value);
    if (value === "cup") {
      setPortionAmount(1);
    } else if (value === "bowl") {
      setPortionAmount(1);
    } else {
      setPortionAmount(1);
    }
  };

  useEffect(() => {
    if (foodReportSuccess && foodReportData) {
      handleAnalysisComplete({});
    }
  }, [foodReportSuccess, foodReportData]);

  const renderPortionSelector = () => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div className="bg-white p-4 border-t">
          <div className="flex flex-col gap-3">
            <div className="w-full">
              <p className="text-sm mb-1">Amount:</p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={portionAmount}
                  onChange={(e) => setPortionAmount(Number(e.target.value))}
                  className="w-20"
                  min={0.25}
                  max={10}
                  step={0.25}
                />
                <Select
                  value={portionUnit}
                  onValueChange={handlePortionUnitChange}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portion">Portion</SelectItem>
                    <SelectItem value="cup">Cup</SelectItem>
                    <SelectItem value="bowl">Bowl</SelectItem>
                    <SelectItem value="plate">Plate</SelectItem>
                    <SelectItem value="serving">Serving</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Quick Select:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    portionAmount === 0.5 ? "bg-wellness-light-green" : ""
                  }
                  onClick={() => setPortionAmount(0.5)}
                >
                  1/2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    portionAmount === 1 ? "bg-wellness-light-green" : ""
                  }
                  onClick={() => setPortionAmount(1)}
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    portionAmount === 2 ? "bg-wellness-light-green" : ""
                  }
                  onClick={() => setPortionAmount(2)}
                >
                  2
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t mt-auto">
          <Button className="w-full" onClick={handleConfirmMeal}>
            Confirm
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Dialog open={foodReportPending}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader>
            <MealScanLoader
              onAnalysisComplete={handleAnalysisComplete}
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
        //     setCapturedImage(null);
        //   } else if (!isScanning && !capturedImage) {
        //     startCamera();
        //   }
        //   onOpenChange(open);
        // }}
        onOpenChange={handleClose}
      >
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="p-4 bg-gray-900 text-white">
            <DialogTitle className="flex justify-between items-center">
              <span>Scan Your Meal</span>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={handleClose}
                >
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
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </>
            ) : (
              <img
                src={capturedImage}
                alt="Captured meal"
                className="w-full h-full object-cover"
              />
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {showConfirmPortion ? (
            renderPortionSelector()
          ) : (
            <div className="p-4 flex flex-col items-center gap-2">
              {!capturedImage ? (
                <>
                  <div className="flex gap-4 w-full justify-center mb-2">
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full w-16 h-16 p-0"
                      onClick={captureMeal}
                    >
                      <Camera className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full w-16 h-16 p-0 border-2"
                      onClick={openFileDialog}
                    >
                      <Upload className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="text-center text-gray-500 text-sm">
                    <p>Take a photo or upload an image of your meal</p>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={retakePhoto}>
                    Retake
                  </Button>
                  <Button onClick={handleUsePhoto}>Use Photo</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanMealModal;
