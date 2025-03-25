import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useGetUserFoodReportUpload } from "@/service/hooks/nutrition/useGetFoodReportUpload";

interface ScanMealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMealDetected: (mealData) => void;
}

const ScanMealModal = ({
  open,
  onOpenChange,
  onMealDetected,
}: ScanMealModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    onOpenChange(false);
  };

  const handleUsePhoto = () => {
    // Mock meal detection result
    // const detectedMeal = {
    //   id: Math.random(),
    //   name: "Oatmeal with Berries",
    //   type: "Breakfast",
    //   calories: 320,
    //   protein: 12,
    //   carbs: 45,
    //   fat: 8,
    //   ingredients: ["Honey", "Oats", "Blueberries", "Strawberries"],
    // };

    if (!canvasElement) return;

    canvasElement.toBlob(async (blob) => {
      if (!blob) return;

      // Create a File object (if API requires a file upload)
      const imageFile = new File([blob], "meal-photo.png", {
        type: "image/png",
      });

      foodReportMutate({ PdfFile: imageFile, language: "English" });
      // onMealDetected(detectedMeal);
      // onOpenChange(false);
    }, "image/png");
  };

  useEffect(() => {
    if (foodReportData && foodReportSuccess) {
      console.log(foodReportData);
      onMealDetected(foodReportData);
      onOpenChange(false);
    }
  }, [foodReportData, foodReportSuccess]);

  // ✅ Automatically start the camera when the modal opens
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      // onOpenChange={(open) => {
      //   if (!open) {
      //     console.log("direct open");

      //     stopCamera();
      //     setCapturedImage(null);
      //   } else if (!isScanning && !capturedImage) {
      //     startCamera();
      //   }
      //   onOpenChange(open);
      // }}
      onOpenChange={onOpenChange}
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
              <Button variant="outline" onClick={retakePhoto}>
                Retake
              </Button>
              <Button onClick={handleUsePhoto}>Use Photo</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanMealModal;
