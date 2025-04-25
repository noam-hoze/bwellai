import { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import MealLoggingSection from "@/components/nutrition/MealLoggingSection";
import DailyIntakeSection from "@/components/nutrition/DailyIntakeSection";
import MealHistorySection from "@/components/nutrition/MealHistorySection";
import TrendsInsightsSection from "@/components/nutrition/TrendsInsightsSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useGetDeleteUserFoodDataFetcher,
  useGetUserFavouriteFoodV4,
  useGetUserFoodReportUpload,
  useGetUserLoggedMealDataFetcherV4,
} from "@/service/hooks/nutrition/useGetFoodReportUpload";
import SavedItemsSection from "@/components/nutrition/SavedItemsSection";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import {
  calorieNumberDisplayed,
  requiredMicronutrientsBalanceDisplayed,
} from "@/utils/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Star, Utensils } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const FavoriteMealCard = ({
  id,
  name,
  type,
  meal,
  onMealClick,
}: Omit<any, "time" | "calories" | "protein"> & {
  name: string;
  type: string;
}) => {
  // const meal = { id, type, name, calories: 0, protein: 0 };

  return (
    <Card
      className="w-36 flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow border-gray-100 bg-wellness-light-green"
      onClick={() => onMealClick(meal)}
    >
      <CardContent className="p-3 flex flex-col items-center text-center">
        <div className="bg-wellness-bright-green rounded-full p-2 mb-2">
          <Utensils className="h-5 w-5 text-white" />
        </div>
        <h4 className="text-sm font-medium line-clamp-1">{name}</h4>
        <span className="text-xs text-gray-500">{type}</span>
        <Star className="h-4 w-4 text-yellow-500 fill-current mt-1" />
      </CardContent>
    </Card>
  );
};

const Nutrition = () => {
  const { isAuthenticated, loading } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"daily" | "trends">("daily");
  const [activeView, setActiveView] = useState<"meals" | "savedItems">("meals");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const navigate = useNavigate();

  const {
    data: getProfileIsData,
    isSuccess: getProfileIsSuccess,
    refetch: getUserProfileRefetch,
  } = useGetUserProfile({ isAuthenticated });

  const {
    data: favouriteFoodData,
    isSuccess,
    refetch: favouriteFoodRefetch,
  } = useGetUserFavouriteFoodV4({
    isAuthenticated,
  });

  const { mutate: deleteUserFoodData, isSuccess: deleteUserFoodDataIsSuccess } =
    useGetDeleteUserFoodDataFetcher();

  const { data: loggedMealData, refetch: refetchLoggedMeals } =
    useGetUserLoggedMealDataFetcherV4(
      new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(date || new Date())),
      true
    );

  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [totalDailyProtein, setTotalDailyProtein] = useState(0);
  const [totalDailyFats, setTotalDailyFats] = useState(0);
  const [totalDailyCarbs, setTotalDailyCarbs] = useState(0);

  const handleMealClick = (meal: any) => {
    const completeMeal = {
      ...meal,
      totalDailyCalories,
      totalDailyProtein,
      totalDailyCarbs,
      carbs: meal?.ai_response?.carbohydrates?.quantity,
      fat: meal?.ai_response?.fats?.quantity,
      ingredients: meal?.ingredients?.map((ingredient) => ingredient?.name),
      notes: "Quick breakfast option",
      totalDailyRequiredCalories,
      requiredMicronutrientsBalance,
      totalDailyFats,
    };

    navigate("/meal-analysis", { state: { meal: completeMeal } });
  };

  const [totalDailyRequiredCalories, setTotalDailyRequiredCalories] =
    useState(0);
  const [requiredMicronutrientsBalance, setRequiredMicronutrientsBalance] =
    useState({ fat: 0, protein: 0, carbs: 0 });

  useEffect(() => {
    const requiredCalories = calorieNumberDisplayed({
      age: getProfileIsData?.age,
      gender: getProfileIsData?.gender,
      height: getProfileIsData?.height,
      weight: getProfileIsData?.weight,
      frequency:
        getProfileIsData?.additionalDetails?.[
          "How often do you exercise in a week?"
        ]?.answersArray?.[0],
    });

    const micronutrition = requiredMicronutrientsBalanceDisplayed({
      age: getProfileIsData?.age,
      BMI: Number(
        getProfileIsData?.additionalDetails?.[
          "What is your Body Mass Index (BMI)?"
        ]?.answersArray?.[0]
      ),
      calorie: requiredCalories,
      weight: getProfileIsData?.weight,
    });

    setTotalDailyRequiredCalories(requiredCalories);
    setRequiredMicronutrientsBalance(micronutrition);
  }, [getProfileIsData]);

  useEffect(() => {
    if (loggedMealData) {
      let tc = 0;
      let pc = 0;
      let fc = 0;
      let cc = 0;

      loggedMealData?.forEach((d) => {
        tc += d.ai_response?.calories?.quantity;
      });
      loggedMealData?.forEach((d) => {
        pc += d.ai_response?.protein?.quantity;
      });
      loggedMealData?.forEach((d) => {
        fc += d.ai_response?.fats?.quantity;
      });
      loggedMealData?.forEach((d) => {
        cc += d.ai_response?.carbohydrates?.quantity;
      });
      setTotalDailyCalories(tc);
      setTotalDailyProtein(pc);
      setTotalDailyFats(fc);
      setTotalDailyCarbs(cc);
    }
  }, [loggedMealData]);

  useEffect(() => {
    if (deleteUserFoodDataIsSuccess) {
      refetchLoggedMeals();
      toast({
        title: "Success",
        description: "Food data deleted successfully.",
        variant: "default",
      });
    }
  }, [deleteUserFoodDataIsSuccess]);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-gray-50">
        <NutritionHeader />
        <div className="mb-6">
          <MealLoggingSection
            refetchLoggedMeals={refetchLoggedMeals}
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyCarbs={totalDailyCarbs}
            totalDailyFats={totalDailyFats}
            totalDailyRequiredCalories={totalDailyRequiredCalories}
            requiredMicronutrientsBalance={requiredMicronutrientsBalance}
          />
          <DailyIntakeSection
            totalDailyCalories={totalDailyCalories}
            totalDailyProtein={totalDailyProtein}
            totalDailyCarbs={totalDailyCarbs}
            totalDailyFats={totalDailyFats}
            totalDailyRequiredCalories={totalDailyRequiredCalories}
            requiredMicronutrientsBalance={requiredMicronutrientsBalance}
          />

          {/* Favorites Section */}
          {favouriteFoodData?.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                <h3 className="text-lg font-semibold">Favorite Meals</h3>
              </div>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {favouriteFoodData?.map((meal) => (
                    <CarouselItem
                      key={`fav-${meal.id}`}
                      className="pl-2 md:pl-4 basis-auto"
                    >
                      <FavoriteMealCard
                        id={meal.id}
                        meal={meal}
                        name={meal?.ai_response?.food_name}
                        type={meal?.meal_type}
                        onMealClick={handleMealClick}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}

          <Tabs
            defaultValue="meals"
            value={activeView}
            onValueChange={(value) =>
              setActiveView(value as "meals" | "savedItems")
            }
            className="w-full mt-8"
          >
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="meals">Meals</TabsTrigger>
              <TabsTrigger value="savedItems">Saved Items</TabsTrigger>
            </TabsList>

            <TabsContent value="meals" className="space-y-8">
              <MealHistorySection
                date={date}
                setDate={setDate}
                loggedMealData={loggedMealData}
                refetchLoggedMeals={refetchLoggedMeals}
                totalDailyCalories={totalDailyCalories}
                totalDailyProtein={totalDailyProtein}
                totalDailyCarbs={totalDailyCarbs}
                totalDailyFats={totalDailyFats}
                totalDailyRequiredCalories={totalDailyRequiredCalories}
                requiredMicronutrientsBalance={requiredMicronutrientsBalance}
                deleteUserFoodData={deleteUserFoodData}
                favouriteFoodData={favouriteFoodData}
              />
              {activeTab === "trends" && <TrendsInsightsSection />}
            </TabsContent>

            <TabsContent value="savedItems">
              <SavedItemsSection
                loggedMealData={loggedMealData}
                totalDailyCalories={totalDailyCalories}
                totalDailyProtein={totalDailyProtein}
                totalDailyCarbs={totalDailyCarbs}
                totalDailyFats={totalDailyFats}
                totalDailyRequiredCalories={totalDailyRequiredCalories}
                requiredMicronutrientsBalance={requiredMicronutrientsBalance}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Nutrition;
