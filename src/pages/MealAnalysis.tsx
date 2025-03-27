import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  AlertTriangle,
  Check,
  Info,
  UtensilsCrossed,
  Dumbbell,
  HeartPulse,
  Star,
  Edit,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import MacroDistributionRing from "@/components/nutrition/MacroDistributionRing";
import MealDateSelector from "@/components/nutrition/meal-detail/MealDateSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DualProgressBar from "@/components/nutrition/DualProgressBar";
import { useGetLogFoodDataV4Fetcher } from "@/service/hooks/nutrition/useGetFoodReportUpload";

interface MealData {
  id: number;
  name: string;
  type: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients?: string[];
  notes?: string;
  image?: string;
}

const MealAnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meal, setMeal] = useState<any>(null);
  const [score, setScore] = useState(7);
  const [selectedDate, setSelectedDate] = useState("today");
  const [mealType, setMealType] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const isMobile = useIsMobile();

  const dailyGoals = {
    calories: { current: 1000, max: 2200 },
    protein: { current: 35, max: 100 },
    sugar: { current: 18, max: 50 },
    carbs: { current: 18, max: 1000 },
  };

  const {
    data: logMealData,
    isSuccess: logMealIsSuccess,
    mutate: logMealMutate,
  } = useGetLogFoodDataV4Fetcher();

  useEffect(() => {
    if (logMealIsSuccess && logMealData) {
      toast.success(`${meal?.name} logged successfully!`);
      navigate("/nutrition");
    }
  }, [logMealIsSuccess, logMealData]);

  useEffect(() => {
    if (location.state?.meal) {
      const mealData = location.state.meal;

      if (!mealData.ingredients) {
        mealData.ingredients = [];
      }

      setMeal(mealData);
      setMealType(mealData.meal_type || "Breakfast");
    } else {
      navigate("/nutrition");
      toast.error("No meal data found");
    }
  }, [location, navigate]);

  const handleEditMeal = () => {
    navigate("/meal-edit", { state: { meal } });
  };

  const handleLogMeal = () => {
    const mealToLog = meal
      ? {
          ...meal,
          type: mealType,
        }
      : null;

    logMealMutate({ es_id: meal?.id, meal_type: mealType });

    console.log("Logging meal with type:", mealType);
  };

  const handleBack = () => {
    navigate("/nutrition");
  };

  const handleToggleFavorite = () => {
    logMealMutate({ es_id: meal?.id, meal_type: mealType, is_favourite: true });
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite ? "Added to favorites!" : "Removed from favorites"
    );
  };

  if (!meal) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">Loading meal data...</div>
        </div>
      </Layout>
    );
  }

  const ingredients = meal?.ingredients || [];

  const totalMacrosGrams =
    meal?.ai_response?.protein?.quantity + meal?.carbs + meal?.fat;
  const proteinPercentage = Math.round(
    (meal?.ai_response?.protein?.quantity / totalMacrosGrams) * 100
  );
  const fatPercentage = Math.round((meal?.fat / totalMacrosGrams) * 100);
  const carbsPercentage = Math.round((meal?.carbs / totalMacrosGrams) * 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={handleBack}
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Meal Analysis
              </h1>
              <div className="w-10"></div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-800 text-xl">
                  {meal?.ai_response?.food_name}
                </h2>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 border-2 border-yellow-300">
                  <span className="text-yellow-800 font-bold">
                    {meal?.ai_response?.general_food_quality_rating}/10
                  </span>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                This meal is balanced but has a slightly high sugar content due
                to honey.
              </p>
            </div>
          </div>

          <div className="flex-1 pb-4 p-4 pt-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Macronutrients</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Calories</span>
                    <span className="text-lg font-semibold">
                      {meal?.ai_response?.calories?.quantity} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Protein</span>
                    <span className="text-lg font-semibold">
                      {meal?.ai_response?.protein?.quantity}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Carbs</span>
                    <span className="text-lg font-semibold">
                      {meal?.carbs}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Fats</span>
                    <span className="text-lg font-semibold">{meal?.fat}g</span>
                  </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <MacroDistributionRing
                    protein={proteinPercentage}
                    fat={fatPercentage}
                    carbs={carbsPercentage}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Health Impact</h2>

              <div className="flex justify-between flex-col  mb-2">
                {meal?.ai_response?.health_impact?.map((p) => {
                  return <span className="text-gray-700">{p}</span>;
                })}

                {/* <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Moderate
                </span> */}
              </div>

              {/* <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Satiety Level</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Medium
                </span>
              </div> */}

              {/* <div className="flex justify-between items-center">
                <span className="text-gray-700">Nutritional Density</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Good
                </span>
              </div> */}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">
                Impact on Daily Goals
              </h2>

              <div className="space-y-4">
                <DualProgressBar
                  currentValue={meal?.totalDailyCalories}
                  addedValue={meal?.ai_response?.calories?.quantity}
                  maxValue={dailyGoals.calories.max}
                  unit="kcal"
                  label="Calories"
                />

                <DualProgressBar
                  currentValue={meal?.totalDailyProtein}
                  addedValue={meal?.ai_response?.protein?.quantity}
                  maxValue={dailyGoals.protein.max}
                  unit="g"
                  label="Protein"
                />

                <DualProgressBar
                  currentValue={meal.totalDailyCarbs}
                  addedValue={meal?.ai_response?.carbohydrates?.quantity}
                  maxValue={dailyGoals.carbs.max}
                  unit="g"
                  label="Carbs"
                />
              </div>
            </div>

            {ingredients.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h2 className="text-xl font-semibold mb-3">
                  Ingredients Analysis
                </h2>

                {ingredients.map((ingredient, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    {idx === 0 ? (
                      <AlertTriangle
                        size={16}
                        className="mr-2 text-yellow-500"
                      />
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
            )}

            <div className="wellness-card border-l-4 border-l-wellness-bright-green bg-white p-4 mb-4">
              <div className="flex items-center gap-2 text-lg text-wellness-muted-black mb-2">
                <Info className="h-5 w-5 text-wellness-bright-green" />
                <h2 className="text-xl font-semibold">
                  Suggestions for Improvement
                </h2>
              </div>

              <div className="space-y-4">
                {meal?.ai_response?.suggestion?.map((s) => {
                  return (
                    <div className="rounded-lg border bg-white p-4">
                      <div className="flex items-start gap-2">
                        <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-wellness-muted-black font-bold">
                            {s}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-start gap-2">
                    <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-wellness-muted-black font-bold">
                        Add chia seeds (1 tbsp)
                      </p>
                      <p className="text-wellness-muted-black">
                        Increases protein by 2g
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-start gap-2">
                    <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-wellness-muted-black font-bold">
                        Space out protein intake
                      </p>
                      <p className="text-wellness-muted-black">
                        For better muscle recovery and sustained energy levels
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="mb-4">
                <MealDateSelector
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Meal Type</h3>
                <RadioGroup
                  value={mealType}
                  onValueChange={setMealType}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Breakfast" id="breakfast" />
                    <Label htmlFor="breakfast">Breakfast</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lunch" id="lunch" />
                    <Label htmlFor="lunch">Lunch</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dinner" id="dinner" />
                    <Label htmlFor="dinner">Dinner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Snack" id="snack" />
                    <Label htmlFor="snack">Snack</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
            <div className="container mx-auto flex gap-2">
              <Button
                variant="outline"
                size={isMobile ? "icon" : "default"}
                className={`${isMobile ? "flex-none" : "flex-1"} ${
                  isFavorite ? "text-yellow-500" : ""
                }`}
                onClick={handleToggleFavorite}
              >
                <Star
                  className={`h-4 w-4 ${!isMobile && "mr-1"} ${
                    isFavorite ? "fill-current" : ""
                  }`}
                />
                {!isMobile && (isFavorite ? "Favorited" : "Favorites")}
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "icon" : "default"}
                className={`${
                  isMobile ? "flex-none" : "flex-1"
                } border-blue-500 text-blue-500`}
                onClick={handleEditMeal}
              >
                <Edit className="h-4 w-4" />
                {!isMobile && "Edit Meal"}
              </Button>
              <Button
                className={`${
                  isMobile ? "flex-1" : "flex-[2]"
                } bg-wellness-bright-green hover:bg-wellness-green-gradient text-white`}
                onClick={handleLogMeal}
              >
                <Utensils className="h-4 w-4 mr-1" />
                Log Meal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealAnalysisPage;
