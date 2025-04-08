import { Shield, FileText, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface ReportProcessingAnimationProps {
  isProcessing: boolean;
  onProcessingComplete: () => void;
}

const ReportProcessingAnimation = ({
  isProcessing,
  onProcessingComplete,
}: ReportProcessingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"encoding" | "anonymizing" | "complete">(
    "encoding"
  );

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setStage("encoding");
      return;
    }

    let timer: NodeJS.Timeout;

    if (progress < 40) {
      timer = setTimeout(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 1.5;
          return next < 40 ? next : 40;
        });
      }, 500);
    } else if (progress < 85) {
      if (stage === "encoding") setStage("anonymizing");
      timer = setTimeout(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 1;
          return next < 85 ? next : 85;
        });
      }, 1000);
    } else if (progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 0.7;
          return next < 100 ? next : 100;
        });
      }, 1000);
    } else {
      setStage("complete");
      setTimeout(() => {
        onProcessingComplete();
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isProcessing, progress, onProcessingComplete, stage]);

  if (!isProcessing && progress === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-xl border shadow-md max-w-md w-full mx-auto my-8 text-center">
      {stage === "complete" ? (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-medium text-lg mb-1">Report encoded</h3>
          <p className="text-gray-600 text-sm">No personal data stored.</p>
        </div>
      ) : (
        <>
          <div className="relative w-16 h-16 mb-2">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                stage === "encoding" ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                stage === "anonymizing" ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          <h3 className="font-medium mb-1">
            {stage === "encoding"
              ? "Encoding personal information..."
              : "Anonymizing report data..."}
          </h3>

          <Progress
            value={progress}
            className="w-full h-2"
            indicatorColor={stage === "encoding" ? "#3b82f6" : "#22c55e"}
          />

          <p className="text-xs text-gray-500 mt-1">
            Processing report securely
          </p>
        </>
      )}
    </div>
  );
};

export default ReportProcessingAnimation;
