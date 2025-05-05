import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  AlertTriangle,
  Check,
  Info,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Bookmark,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useGetLogFoodDataV4Fetcher } from "@/service/hooks/nutrition/useGetFoodReportUpload";
import DualProgressBar from "@/components/nutrition/DualProgressBar";

interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
  score: number;
  rating: "Bad" | "Moderate" | "Good";
  // concerns: {
  //   name: string;
  //   amount: string;
  //   explanation: string;
  //   severity: "high" | "medium" | "low";
  //   details: string;
  // }[];
  concerns: string[];
  benefits: {
    name: string;
    amount: string;
    explanation: string;
    details: string;
  }[];
  ingredients: string[];
  allergens: string[];
  alternatives: {
    id: string;
    name: string;
    brand: string;
    score: number;
    improvement: string;
    image?: string;
  }[];
  healthImpact: string[];
  calories?;
  carbohydrates?;
  fats?;
  protein?;
  totalDailyCalories?;
  totalDailyProtein?;
  totalDailyCarbs?;
}

const FoodScanAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [expandedConcerns, setExpandedConcerns] = useState<
    Record<number, boolean>
  >({});
  const [expandedBenefits, setExpandedBenefits] = useState<
    Record<number, boolean>
  >({});
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [totalDailyRequiredCalories, setTotalDailyRequiredCalories] =
    useState(0);

  const {
    data: logMealData,
    isSuccess: logMealIsSuccess,
    mutate: logMealMutate,
  } = useGetLogFoodDataV4Fetcher();

  useEffect(() => {
    if (location.state?.productData) {
      setProduct(location.state.productData);
      setIsSaved(location.state.productData?.is_saved);
      setIsFavorite(location.state.productData?.is_favourite);
      setTotalDailyRequiredCalories(
        location.state.productData?.totalDailyRequiredCalories
      );
    }
  }, [location]);

  const handleBack = () => {
    navigate("/nutrition");
  };

  const toggleConcernDetails = (index: number) => {
    setExpandedConcerns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleBenefitDetails = (index: number) => {
    setExpandedBenefits((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleIngredients = () => {
    setExpandedIngredients(!expandedIngredients);
  };

  const handleCompare = (alternativeId: string) => {
    toast.info("Comparison feature coming soon!");
  };

  const dailyGoals = {
    calories: { current: 1000, max: 2000 },
    protein: { current: 35, max: 80 },
    sugar: { current: 18, max: 50 },
  };

  const addToMealLog = () => {
    if (product) {
      // navigate("/meal-analysis", {
      //   state: {
      //     meal: {
      //       id: Date.now(),
      //       name: product.name,
      //       type: "Snack",
      //       calories: 120,
      //       protein: 3,
      //       carbs: 22,
      //       fat: 2,
      //       ingredients: product.ingredients,
      //     },
      //   },
      // });
      logMealMutate({
        es_id: product?.id,
        meal_type: "Breakfast",
        type: "logged",
        date: new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date()),
      });
      toast.success("Meal Logged succesfully!", {
        position: "top-center",
      });
    }
  };

  const handleToggleFavorite = () => {
    logMealMutate({
      es_id: product?.id,
      meal_type: "Breakfast",
      type: "favourite",
    });
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite ? "Added to favorites!" : "Removed from favorites",
      {
        position: "top-center",
      }
    );
  };

  const handleSaveItem = () => {
    logMealMutate({
      es_id: product?.id,
      meal_type: "Breakfast",
      type: "saved",
    });
    setIsSaved(!isSaved);
    toast.success(
      !isSaved
        ? "Item saved to your collection!"
        : "Item removed from your collection",
      {
        position: "top-center",
      }
    );
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">Loading product data...</div>
        </div>
      </Layout>
    );
  }

  const getRatingColorClass = (rating: "Bad" | "Moderate" | "Good") => {
    switch (rating) {
      case "Bad":
        return "bg-red-100 text-red-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Good":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score < 40) return "text-red-500 bg-red-50 border-red-200";
    if (score < 70) return "text-yellow-500 bg-yellow-50 border-yellow-200";
    return "text-green-500 bg-green-50 border-green-200";
  };

  const getConcernSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-yellow-300";
      default:
        return "bg-gray-300";
    }
  };

  // Adding null check for product.allergens
  const hasAllergens =
    product && product.allergens && product.allergens.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-20">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={handleBack}
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Food Analysis
            </h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-gray-800 text-xl">
                {product.name}
              </h2>
              <div
                className={`text-center font-bold p-2 rounded-md border w-16 ${getScoreColorClass(
                  product.score
                )}`}
              >
                {product.score}/100
              </div>
              <span
                className={`px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded ${getRatingColorClass(
                  product.rating
                )}`}
              >
                {product.rating}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {/* {product.brand} • {product.category} */}
              {product?.general_summary}
            </p>
          </div>
        </div>

        {hasAllergens && (
          <div className="px-4 mb-4">
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-700">Allergen Warning</AlertTitle>
              <AlertDescription className="text-red-600">
                Contains allergens you avoid: {product.allergens.join(", ")}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="px-4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Concerns
            </h2>
            <div className="space-y-3">
              {product.concerns &&
                product.concerns.map((concern, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    {/* <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleConcernDetails(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-1.5 ${getConcernSeverityColor(
                            concern.severity
                          )}`}
                        ></div>
                        <div>
                          <div className="font-medium">{concern.name}</div>
                          <div className="text-sm text-gray-500">
                            {concern.amount}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm">{concern.explanation}</span>
                        {expandedConcerns[index] ? (
                          <ChevronUp className="h-4 w-4 text-gray-400 mt-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400 mt-1" />
                        )}
                      </div>
                    </div> */}

                    {/* {expandedConcerns[index] && (
                      <div className="mt-2 pl-6 text-sm text-gray-600 border-t pt-2">
                        {concern.details}
                      </div>
                    )} */}
                    {
                      <div className="pl-6 text-sm text-gray-600">
                        {concern}
                      </div>
                    }
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Benefits
            </h2>
            <div className="space-y-3">
              {product.benefits &&
                product.benefits.map((benefit, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleBenefitDetails(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full mt-1.5 bg-green-500"></div>
                        <div>
                          <div className="font-medium">{benefit.name}</div>
                          <div className="text-sm text-gray-500">
                            {benefit.amount}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm">{benefit.explanation}</span>
                        {expandedBenefits[index] ? (
                          <ChevronUp className="h-4 w-4 text-gray-400 mt-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400 mt-1" />
                        )}
                      </div>
                    </div>

                    {expandedBenefits[index] && (
                      <div className="mt-2 pl-6 text-sm text-gray-600 border-t pt-2">
                        {benefit.details}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-3">Health Impact</h2>

            <div className="space-y-4">
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
          </div> */}

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-3">
              Impact on Daily Goals
            </h2>

            <div className="space-y-4">
              <DualProgressBar
                currentValue={product.totalDailyCalories}
                addedValue={product?.calories?.quantity}
                maxValue={totalDailyRequiredCalories}
                unit="kcal"
                label="Calories"
              />

              <DualProgressBar
                currentValue={product.totalDailyProtein}
                addedValue={product?.protein?.quantity}
                maxValue={product?.requiredMicronutrientsBalance?.protein}
                unit="g"
                label="Protein"
              />

              <DualProgressBar
                currentValue={product.totalDailyCarbs}
                addedValue={product?.carbohydrates?.quantity}
                maxValue={product.requiredMicronutrientsBalance?.carbs}
                unit="g"
                label="carbs"
              />
              <DualProgressBar
                currentValue={product.totalDailyFats}
                addedValue={product?.fats?.quantity}
                maxValue={product.requiredMicronutrientsBalance?.fat}
                unit="g"
                label="Fat"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-3">Ingredients Analysis</h2>

            {product.ingredients &&
              product.ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  {/* {ingredient.toLowerCase().includes("sugar") ? (
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                  ) : (
                  )} */}
                  <Check size={16} className="mr-2 text-green-500" />
                  <span
                    className={`text-gray-800 ${
                      ingredient.toLowerCase().includes("sugar")
                        ? "font-medium"
                        : ""
                    }`}
                  >
                    {ingredient}
                  </span>
                  {/* <span className="ml-auto text-sm text-gray-500">
                    {ingredient.toLowerCase().includes("sugar")
                      ? "High in added sugar"
                      : ingredient.toLowerCase().includes("grain")
                      ? "Good source of fiber"
                      : ingredient.toLowerCase().includes("honey")
                      ? "Natural sweetener"
                      : ingredient.toLowerCase().includes("oat")
                      ? "Rich in beta-glucans"
                      : ingredient === "Tripotassium Phosphate"
                      ? "Food additive"
                      : "Nutritious ingredient"}
                  </span> */}
                </div>
              ))}
          </div>

          <div className="wellness-card border-l-4 border-l-wellness-bright-green bg-white p-4 mb-4">
            <div className="flex items-center gap-2 text-lg text-wellness-muted-black mb-2">
              <Info className="h-5 w-5 text-wellness-bright-green" />
              <h2 className="text-xl font-semibold">Better Alternatives</h2>
            </div>

            <div className="space-y-4">
              {product.alternatives &&
                product.alternatives.map((alternative, index) => (
                  <div
                    key={alternative.id}
                    className="rounded-lg border bg-white p-4"
                  >
                    <div className="flex items-start gap-2">
                      <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-wellness-muted-black font-bold">
                            {alternative.name}
                          </p>
                          <div
                            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${getScoreColorClass(
                              alternative.score
                            )}`}
                          >
                            {alternative.score}
                          </div>
                        </div>
                        <p className="text-wellness-muted-black">
                          {alternative.brand}
                        </p>
                        <p className="text-wellness-muted-black text-sm mt-1">
                          {alternative.improvement}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
          <div className="container mx-auto flex gap-3">
            <Button
              variant={isSaved ? "secondary" : "outline"}
              className="flex-1"
              onClick={handleSaveItem}
            >
              <Bookmark
                className={`h-4 w-4 mr-2 ${
                  isSaved ? "fill-wellness-bright-green" : ""
                }`}
              />
              {isSaved ? "Saved" : "Save Item"}
            </Button>
            <Button
              className="flex-1 bg-wellness-bright-green hover:bg-wellness-green-gradient text-white"
              onClick={addToMealLog}
            >
              Add to Meal Log
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FoodScanAnalysis;
