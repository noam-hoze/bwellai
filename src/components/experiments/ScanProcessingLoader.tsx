import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import { ScanResult } from "@/types/scanResults";
import { useEyeAnalysis } from "@/service/hooks/experiments/useGetAnalysis";
import { dataURLtoFile } from "@/utils/utils";

interface ScanProcessingLoaderProps {
  scanType: "eye" | "nail" | "tongue" | "handwriting";
  onAnalysisComplete: (result: ScanResult) => void;
  onRetry: () => void;
  imageData?: string;
  onClose?: () => void;
}

const ScanProcessingLoader = ({
  scanType,
  onAnalysisComplete,
  onRetry,
  imageData,
  onClose,
}: ScanProcessingLoaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false); // prevents double-send

  const {
    mutate: analyzeEye,
    data,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useEyeAnalysis();

  useEffect(() => {
    if (!imageData || hasTriggered) return;
    setHasTriggered(true);

    const file = dataURLtoFile(imageData, "eye-scan.jpg");

    analyzeEye({file});
  }, [imageData]);

  useEffect(() => {
    if (isError && mutationError) {
      setError("Eye analysis failed. Please try again.");
    }

    if (isSuccess && data) {
      const raw = data;
      const result: ScanResult = {
        id: Date.now().toString(),
        type: scanType,
        title: "Eye Scan Result",
        description: "Detailed insights from your eye scan.",
        category: "watchful", // Placeholder or infer based on response
        westernInsights: raw.westernInsights ?? [],
        traditionalInsights: raw.traditionalInsights ?? [],
        recommendations: raw.recommendations ?? [],
        actions: [],
        timestamp: new Date(),
      };

      onAnalysisComplete(result);
    }
  }, [isSuccess, isError, isError, mutationError]);

  return (
    <div className="relative p-6 text-center">
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {isPending ? (
        <div>
          <RotateCcw className="mx-auto h-12 w-12 animate-spin text-gray-700" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Analyzing your {scanType}...
          </h3>
          <p className="text-gray-600">Please wait while we process your scan.</p>
        </div>
      ) : error ? (
        <div>
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Analysis Failed</h3>
          <p className="text-red-700">{error}</p>
          <Button onClick={onRetry} className="mt-4">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ScanProcessingLoader;
