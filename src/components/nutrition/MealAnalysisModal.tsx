import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Check,
  Info,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetLogFoodDataV4Fetcher } from "@/service/hooks/nutrition/useGetFoodReportUpload";
import { useEffect } from "react";

interface MealAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?;
  refetchLoggedMeals;
}

const MealAnalysisModal = ({
  open,
  onOpenChange,
  meal,
  refetchLoggedMeals,
}: MealAnalysisModalProps) => {
  const {
    data: logMealData,
    isSuccess: logMealIsSuccess,
    mutate: logMealMutate,
  } = useGetLogFoodDataV4Fetcher();

  useEffect(() => {
    if (logMealIsSuccess && logMealData) {
      refetchLoggedMeals();
    }
  }, [logMealData, logMealIsSuccess]);

  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full bg-gray-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => onOpenChange(false)}
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Meal Analysis
              </h1>
              <div className="w-10"></div> {/* Empty space for balance */}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {/* Meal overview */}
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 border-2 border-yellow-300">
                  <span className="text-yellow-800 font-bold">
                    {meal?.general_food_quality_rating}/10
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="font-semibold text-gray-800">
                    {meal?.food_name}
                  </h2>
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                    Moderate
                  </span>
                </div>
                <p className="text-sm text-gray-600">{meal?.general_summary}</p>
              </div>
            </div>

            {/* Macronutrients */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-3">Macronutrients</h2>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold">
                    {meal?.calories?.quantity}
                  </div>
                  <div className="text-xs text-gray-500">kcal</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {meal?.protein?.quantity}g
                  </div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {meal?.carbohydrates?.quantity}g
                  </div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {meal?.fat?.quantity}g
                  </div>
                  <div className="text-xs text-gray-500">Fats</div>
                </div>
              </div>
            </div>

            {/* Health Impact */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-3">Health Impact</h2>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Blood Sugar Impact</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Moderate
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Satiety Level</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Medium
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Nutritional Density</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Good
                </span>
              </div>
            </div>

            {/* Macro Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-3">
                Macro Distribution
              </h2>

              <div className="flex items-center mb-4">
                {/* This would be a chart in a real app */}
                <div className="w-20 h-20 rounded-full border-8 border-blue-200 relative mr-4">
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-yellow-300"
                    style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-300"
                    style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
                  ></div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-blue-200 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      Protein: {meal?.protein?.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-yellow-300 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      Fat: {meal?.fat?.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-300 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      Carbs: {meal?.carbohydrates?.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <Info size={16} className="inline mr-1 text-blue-500" />
                Recommended range for breakfast: 15-20% protein, 20-30% fat,
                50-65% carbs
              </div>
            </div>

            {/* Daily Goal Impact */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-3">
                Impact on Daily Goals
              </h2>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Calories</span>
                  <span className="text-sm text-gray-700">
                    {meal?.calories?.quantity}/2000
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(meal?.calories?.quantity / 2000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Protein</span>
                  <span className="text-sm text-gray-700">
                    {meal?.protein?.quantity}/80g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(meal?.protein?.quantity / 80) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Sugar</span>
                  <span className="text-sm text-gray-700">18/50g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "36%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-4 mb-4 border border-blue-100">
              <div className="flex">
                <div className="mr-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                    <Info size={18} className="text-blue-500" />
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-gray-800 mb-1">
                    Suggestions for Improvement
                  </h2>

                  {meal?.suggestion?.map((m) => {
                    return (
                      <div className="p-2 bg-white rounded-md mb-2 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{m}</p>
                          {/* <p className="text-sm text-gray-600">
                            Reduces sugar by 12g
                          </p> */}
                        </div>
                        <ArrowUpRight size={16} className="text-blue-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ingredients Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-3">
                Ingredients Analysis
              </h2>

              {meal.ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  {idx === 0 ? (
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                  ) : (
                    <Check size={16} className="mr-2 text-green-500" />
                  )}
                  <span
                    className={`text-gray-800 ${
                      idx === 0 ? "font-medium" : ""
                    }`}
                  >
                    {ingredient}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    {idx === 0
                      ? "High in added sugar"
                      : idx === 1
                      ? "Good source of fiber"
                      : idx === 2
                      ? "Rich in antioxidants"
                      : "High in vitamin C"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500"
                onClick={() => onOpenChange(false)}
              >
                Edit Meal
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  logMealMutate({ es_id: meal?.id, meal_type: meal?.type });
                  onOpenChange(false);
                }}
              >
                Log Meal
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealAnalysisModal;
