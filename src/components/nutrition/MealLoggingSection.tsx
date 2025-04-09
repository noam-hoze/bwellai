import { useState } from "react";
import { Camera, Barcode, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ScanMealModal from "./ScanMealModal";
import ScanBarcodeModal from "./ScanBarcodeModal";
import MealDetailModal from "./MealDetailModal";
import MealAnalysisModal from "./MealAnalysisModal";
const MealLoggingSection = ({
  refetchLoggedMeals,
  totalDailyCalories,
  totalDailyProtein,
  totalDailyCarbs,
  totalDailyFats,
  totalDailyRequiredCalories,
  requiredMicronutrientsBalance,
}) => {
  const [manualEntry, setManualEntry] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const [scanMealOpen, setScanMealOpen] = useState(false);
  const [scanBarcodeOpen, setScanBarcodeOpen] = useState(false);
  const [mealDetailOpen, setMealDetailOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  const handleScanMeal = () => {
    setScanMealOpen(true);
  };

  const handleScanBarcode = () => {
    setScanBarcodeOpen(true);
  };

  const toggleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast.info("Voice input activated. Please speak clearly.");
      // TODO: Implement voice recognition
    } else {
      toast.info("Voice input deactivated.");
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualEntry.trim()) {
      toast.success(`Logged: ${manualEntry}`);
      setManualEntry("");
    }
  };

  const handleMealDetected = (mealData) => {
    setCurrentMeal({
      id: mealData?.es_id,
      type: determineMealTypeByTime(),
      ...mealData?.jsonNode,
    });

    // First show the analysis modal
    setAnalysisOpen(true);
  };

  const handleProductDetected = (productData) => {
    setCurrentMeal({
      id: Math.random(),
      type: determineMealTypeByTime(),
      ...productData,
    });
    setMealDetailOpen(true);
    toast.success("Product found! You can edit details before saving.");
  };

  // Helper function to determine meal type based on time of day
  const determineMealTypeByTime = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return "Breakfast";
    if (hour >= 10 && hour < 14) return "Lunch";
    if (hour >= 14 && hour < 18) return "Snack";
    if (hour >= 18 && hour < 22) return "Dinner";
    return "Snack";
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl p-6 cursor-pointer transition-colors flex flex-col items-center justify-center"
          onClick={handleScanMeal}
        >
          <Camera className="h-8 w-8" />
          <h3 className="text-xl font-semibold text-center">Scan Meal</h3>
          <p className="text-sm text-gray-300 text-center mt-2">
            Track what I'm eating now
          </p>
        </div>
        <div
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl p-6 cursor-pointer transition-colors flex flex-col items-center justify-center"
          onClick={handleScanBarcode}
        >
          <Barcode className="h-8 w-8" />
          <h3 className="text-xl font-semibold text-center">Scan Barcode</h3>
          <p className="text-sm text-gray-300 text-center mt-2">
            Check nutrition before buying/eating
          </p>
        </div>
      </div>

      {/* <form onSubmit={handleManualSubmit} className="relative">
        <Input
          type="text"
          placeholder="Type or use voice input..."
          value={manualEntry}
          onChange={(e) => setManualEntry(e.target.value)}
          className="pr-12 py-6 text-base"
        />
        <button
          type="button"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
            isVoiceActive ? "text-wellness-bright-green" : "text-gray-400"
          }`}
          onClick={toggleVoiceInput}
        >
          <Mic className="h-5 w-5" />
        </button>
      </form> */}

      {/* Modals */}
      <ScanMealModal
        open={scanMealOpen}
        onOpenChange={setScanMealOpen}
        onMealDetected={handleMealDetected}
        totalDailyCalories={totalDailyCalories}
        totalDailyProtein={totalDailyProtein}
        totalDailyCarbs={totalDailyCarbs}
        totalDailyFats={totalDailyFats}
        totalDailyRequiredCalories={totalDailyRequiredCalories}
        requiredMicronutrientsBalance={requiredMicronutrientsBalance}
      />

      <ScanBarcodeModal
        open={scanBarcodeOpen}
        onOpenChange={setScanBarcodeOpen}
        onProductDetected={handleProductDetected}
        totalDailyCalories={totalDailyCalories}
        totalDailyProtein={totalDailyProtein}
        totalDailyCarbs={totalDailyCarbs}
        totalDailyFats={totalDailyFats}
        totalDailyRequiredCalories={totalDailyRequiredCalories}
        requiredMicronutrientsBalance={requiredMicronutrientsBalance}
      />

      <MealDetailModal
        open={mealDetailOpen}
        onOpenChange={setMealDetailOpen}
        meal={currentMeal}
        refetchLoggedMeals={refetchLoggedMeals}
      />

      <MealAnalysisModal
        open={analysisOpen}
        onOpenChange={setAnalysisOpen}
        meal={currentMeal}
        refetchLoggedMeals={refetchLoggedMeals}
      />
    </div>
  );
};

export default MealLoggingSection;
