import React from "react";
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PerspectiveLoadingOverlayProps {
  previousPerspective: string;
  targetPerspective: string;
  onCancel: () => void;
  progress?: number;
  isVisible: boolean;
}

const perspectiveColors: Record<string, string> = {
  MODERN_MEDICINE: "#0EA5E9",
  NATUROPATHIC_MEDICINE: "#22C55E",
  REGISTERED_DIETITIANS: "#F97316",
  TRADITIONAL_CHINESE_MEDICINE: "#6366F1",
  MENTAL_HEALTH: "#EC4899",
  FUNCTIONAL_MEDICINE: "#9333EA",
};

const perspectiveNames: Record<string, string> = {
  MODERN_MEDICINE: "Modern Medicine",
  NATUROPATHIC_MEDICINE: "Naturopathic",
  REGISTERED_DIETITIANS: "Dietitian",
  TRADITIONAL_CHINESE_MEDICINE: "Traditional Chinese Medicine",
  MENTAL_HEALTH: "Mental Health",
  FUNCTIONAL_MEDICINE: "Functional Medicine",
};

const PerspectiveLoadingOverlay = ({
  previousPerspective,
  targetPerspective,
  onCancel,
  progress = 0,
  isVisible,
}: PerspectiveLoadingOverlayProps) => {
  if (!isVisible) return null;

  const targetColor = perspectiveColors[targetPerspective] || "#0EA5E9";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
      >
        <div className="text-center mb-5">
          <h3 className="text-xl font-semibold mb-2">Switching Perspective</h3>
          <p className="text-gray-600">
            From{" "}
            <span className="font-medium">
              {perspectiveNames[previousPerspective]}
            </span>{" "}
            to{" "}
            <span className="font-medium" style={{ color: targetColor }}>
              {perspectiveNames[targetPerspective]}
            </span>
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <svg
              className="absolute animate-spin h-20 w-20"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke={targetColor}
                strokeWidth="2"
                fill="none"
              />
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke={targetColor}
                strokeWidth="2"
                strokeDasharray="60"
                strokeDashoffset="20"
                fill="none"
              />
            </svg>
            <Loader className="h-10 w-10 text-gray-400" />
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1">
            <span>Generating personalized insights...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            indicatorColor={targetColor}
            className="h-2"
          />
        </div>

        <div className="text-center text-sm text-gray-500 mb-5">
          <div className="flex items-center justify-center gap-1">
            <span className="animate-pulse">•</span>
            <span className="animate-pulse delay-100">•</span>
            <span className="animate-pulse delay-200">•</span>
            {/* <span>Estimated time: ~15 seconds</span> */}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PerspectiveLoadingOverlay;
