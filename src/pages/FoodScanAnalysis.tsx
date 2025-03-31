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
}

const FoodScanAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [expandedConcerns, setExpandedConcerns] = useState<
    Record<number, boolean>
  >({});
  const [expandedBenefits, setExpandedBenefits] = useState<
    Record<number, boolean>
  >({});
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
      logMealMutate({ es_id: product?.id, meal_type: "Breakfast" });
    }
  };

  const handleToggleFavorite = () => {
    logMealMutate({
      es_id: product?.id,
      meal_type: "Breakfast",
      is_favourite: true,
    });
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite ? "Added to favorites!" : "Removed from favorites"
    );
  };

  const handleSaveItem = () => {
    logMealMutate({
      es_id: product?.id,
      meal_type: "Breakfast",
      is_favourite: isFavorite || false,
      is_saved: true,
    });
    setIsSaved(!isSaved);
    toast.success(
      !isSaved
        ? "Item saved to your collection!"
        : "Item removed from your collection"
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

        {/* Header Section */}
        <div className="py-4 px-4">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {product.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-500">{product.brand}</p>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`text-center font-bold p-2 rounded-md border w-16 ${getScoreColorClass(
                      product.score
                    )}`}
                  >
                    {product.score}/100
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded mt-1 ${getRatingColorClass(
                      product.rating
                    )}`}
                  >
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Alert Banner (if applicable) */}
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

        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Concerns Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Concerns
            </h2>
            <div className="space-y-3">
              {product.concerns &&
                product.concerns.map((concern, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleConcernDetails(index)}
                    >
                      <div className="flex items-start gap-3">
                        {/* <div
                          className={`w-3 h-3 rounded-full mt-1.5 ${getConcernSeverityColor(
                            concern.severity
                          )}`}
                        ></div> */}
                        <div>
                          {/* <div className="font-medium">{concern.name}</div> */}
                          <div className="text-sm text-gray-500">{concern}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {/* <span className="text-sm">{concern.explanation}</span> */}
                        {expandedConcerns[index] ? (
                          <ChevronUp className="h-4 w-4 text-gray-400 mt-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400 mt-1" />
                        )}
                      </div>
                    </div>

                    {/* {expandedConcerns[index] && (
                      <div className="mt-2 pl-6 text-sm text-gray-600 border-t pt-2">
                        {concern.details}
                      </div>
                    )} */}
                  </div>
                ))}
            </div>
          </div>

          {/* Benefits Section */}
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

          {/* Health Impact Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Your Health Impact
            </h2>
            <div className="space-y-3">
              {product?.healthImpact?.map(() => {
                return (
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">
                        Based on your blood glucose levels, this product's high
                        sugar content (12g per serving) may cause spikes.
                        Consider alternatives with less added sugar.
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* <div className="p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Your recent digestive symptoms may be aggravated by the
                    wheat content in this product. Monitor how you feel after
                    consumption.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Ingredients Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleIngredients}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Ingredients
              </h2>
              {expandedIngredients ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedIngredients && product.ingredients && (
              <div className="mt-3 space-y-1">
                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start gap-2 py-1">
                    <div className="w-2 h-2 rounded-full mt-1.5 bg-gray-300"></div>
                    <div className="text-sm">
                      <span
                        className={
                          ingredient.toLowerCase().includes("sugar")
                            ? "font-medium text-red-600"
                            : ""
                        }
                      >
                        {ingredient}
                      </span>
                      {ingredient === "Tripotassium Phosphate" && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          A mineral salt used as a food additive and acidity
                          regulator
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Better Alternatives Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Better Alternatives
            </h2>

            <Carousel className="w-full">
              <CarouselContent>
                {product.alternatives &&
                  product.alternatives.map((alternative) => (
                    <CarouselItem
                      key={alternative.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex gap-3 h-full">
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                              {alternative.image ? (
                                <img
                                  src={alternative.image}
                                  alt={alternative.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-400">
                                    No image
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="text-sm font-medium line-clamp-1">
                                {alternative.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {alternative.brand}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <div
                                  className={`text-xs font-semibold px-1.5 py-0.5 rounded ${getScoreColorClass(
                                    alternative.score
                                  )}`}
                                >
                                  {alternative.score}
                                </div>
                                <div className="text-xs text-green-600">
                                  {alternative.improvement}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 text-xs h-7 w-full"
                                onClick={() => handleCompare(alternative.id)}
                              >
                                Compare
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 shadow-md" />
              <CarouselNext className="right-1 shadow-md" />
            </Carousel>
          </div>
        </div>

        {/* Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
          <div className="container mx-auto flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`flex-none ${isFavorite ? "text-yellow-500" : ""}`}
              onClick={handleToggleFavorite}
            >
              <Star
                className={`h-4 w-4  ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              variant={isSaved ? "secondary" : "outline"}
              size="icon"
              className="flex-none"
              onClick={handleSaveItem}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isSaved ? "fill-wellness-bright-green" : ""
                }`}
              />
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
