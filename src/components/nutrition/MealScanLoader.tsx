import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookingPot } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PortionSelector, { PortionInfo } from "./PortionSelector";

interface MealScanLoaderProps {
  onAnalysisComplete: (mealData: any) => void;
  imageData?: string;
}

const MealScanLoader = ({
  onAnalysisComplete,
  imageData,
}: MealScanLoaderProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [detectedFood, setDetectedFood] = useState<any | null>(null);

  useEffect(() => {
    if (isAnalyzing) {
      // Progress bar animation
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 1, 100);

          // When progress reaches 100%, show the portion selector
          // if (newProgress === 100) {
          //   clearInterval(timer);

          //   // Mock meal detection result
          //   setTimeout(() => {
          //     const detectedMeal = {
          //       id: Math.random(),
          //       name: "Oatmeal with Berries",
          //       type: "Breakfast",
          //       calories: 320,
          //       protein: 12,
          //       carbs: 45,
          //       fat: 8,
          //       ingredients: ["Honey", "Oats", "Blueberries", "Strawberries"],
          //       image: imageData,
          //     };

          //     setDetectedFood(detectedMeal);
          //     setIsAnalyzing(false);
          //   }, 500);
          // }

          return newProgress;
        });
      }, 150);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isAnalyzing, imageData]);

  const handlePortionConfirm = (portionInfo: PortionInfo) => {
    if (detectedFood) {
      // Adjust the detected food with the portion information
      const adjustedMeal = {
        ...detectedFood,
        calories: portionInfo.calories,
        protein: portionInfo.protein,
        // Proportionally adjust other nutrients based on the ratio
        carbs: Math.round(detectedFood.carbs * (portionInfo.calories / 320)),
        fat: Math.round(detectedFood.fat * (portionInfo.calories / 320)),
        portion: {
          amount: portionInfo.amount,
          unit: portionInfo.unit,
        },
      };

      onAnalysisComplete(adjustedMeal);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-white z-50 p-4 h-96">
      {isAnalyzing ? (
        <>
          <div className="flex flex-col items-center mb-8">
            {/* Centered cooking pot */}
            <div className="text-wellness-bright-green animate-bounce">
              <CookingPot size={80} className="mb-4" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-wellness-bright-green mb-2">
              Chopping up those nutrition facts...
            </h2>
            <p className="text-gray-600">Our AI is analyzing your meal</p>
          </div>

          <div className="w-full max-w-md">
            <Progress
              value={progress}
              className="h-2"
              indicatorColor="#22c55e"
            />
            <p className="text-right text-gray-500 mt-1 text-sm">{progress}%</p>
          </div>
        </>
      ) : (
        <PortionSelector
          foodName={detectedFood?.name || ""}
          onPortionConfirm={handlePortionConfirm}
        />
      )}
    </div>
  );
};

export default MealScanLoader;
