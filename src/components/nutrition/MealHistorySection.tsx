import { useEffect, useState } from "react";
import {
  Filter,
  Utensils,
  ChevronDown,
  Calendar,
  Star,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useGetUserLoggedMealDataFetcherV4 } from "@/service/hooks/nutrition/useGetFoodReportUpload";
import MealAnalysisModal from "./MealAnalysisModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { convertUTCToLocalTime } from "@/utils/utils";

interface MealItemProps {
  id?: number;
  type: string;
  time: string;
  name: string;
  calories: number;
  protein: number;
  onMealClick?: (meal: any) => void;
  meal?;
  isFavorite?: boolean;
  setCurrentMeal?;
  deleteUserFoodData?;
  setAnalysisOpen?;
  key?;
}

const MealItem = ({
  id,
  type,
  time,
  name,
  calories,
  protein,
  meal,
  onMealClick,
  isFavorite,
  setCurrentMeal,
  setAnalysisOpen,
  deleteUserFoodData,
  key,
}: MealItemProps) => {
  return (
    <Card
      key={key}
      className={`mb-4 hover:shadow-md transition-shadow border-gray-100 cursor-pointer ${
        isFavorite ? "border-l-4 border-l-yellow-400" : ""
      }`}
      // onClick={() => {
      //   setCurrentMeal(meal?.ai_response);
      //   setAnalysisOpen(true);
      // }}
      onClick={() => onMealClick(meal)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-4 rounded-md ${
              isFavorite ? "bg-yellow-50" : "bg-gray-100"
            }`}
          >
            <Utensils
              className={`h-6 w-6 ${
                isFavorite ? "text-yellow-500" : "text-gray-500"
              }`}
            />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold">{type}</h3>
                  {isFavorite && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current ml-2" />
                  )}
                </div>
              </div>
              <h4 className="text-xl mb-1">{name}</h4>
              <p className="text-gray-600">
                {calories} kcal • {protein}g protein{" "}
                {meal?.amount && ` • ${meal?.amount} ${meal?.portion}`}
              </p>
            </div>

            <div className="flex flex-col gap-3 items-end">
              <p className="text-gray-500">{time}</p>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-500 hover:text-red-500 hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click event
                  deleteUserFoodData({ esId: meal?.id, type: "nutrition" });
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MealHistorySection = ({
  loggedMealData,
  date,
  setDate,
  refetchLoggedMeals,
  totalDailyCalories,
  totalDailyProtein,
  totalDailyCarbs,
  totalDailyFats,
  totalDailyRequiredCalories,
  requiredMicronutrientsBalance,
  deleteUserFoodData,
  favouriteFoodData,
}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  const [mealTypeFilter, setMealTypeFilter] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Mock meals data
  const allMeals = [
    {
      id: 1,
      type: "Breakfast",
      time: "8:30 AM",
      name: "Oatmeal with Berries",
      calories: 320,
      protein: 12,
      date: new Date(),
      isFavorite: true,
    },
    {
      id: 2,
      type: "Lunch",
      time: "12:45 PM",
      name: "Grilled Chicken Salad",
      calories: 450,
      protein: 35,
      date: new Date(),
      isFavorite: true,
    },
    {
      id: 3,
      type: "Snack",
      time: "3:30 PM",
      name: "Greek Yogurt with Honey",
      calories: 180,
      protein: 15,
      date: new Date(),
      isFavorite: true,
    },
    {
      id: 4,
      type: "Dinner",
      time: "7:00 PM",
      name: "Salmon with Roasted Vegetables",
      calories: 520,
      protein: 40,
      date: new Date(),
      isFavorite: false,
    },
    {
      id: 5,
      type: "Dessert",
      time: "8:30 PM",
      name: "Dark Chocolate",
      calories: 120,
      protein: 2,
      date: new Date(),
      isFavorite: false,
    },
    {
      id: 6,
      type: "Breakfast",
      time: "7:45 AM",
      name: "Avocado Toast",
      calories: 380,
      protein: 14,
      date: new Date(Date.now() - 86400000), // Yesterday
      isFavorite: false,
    },
    {
      id: 7,
      type: "Lunch",
      time: "1:15 PM",
      name: "Quinoa Bowl",
      calories: 420,
      protein: 18,
      date: new Date(Date.now() - 86400000), // Yesterday
      isFavorite: false,
    },
  ];

  // Get favorite meals
  // const favoriteMeals = allMeals.filter((meal) => meal.isFavorite);

  // Filter meals by date and type
  const filteredMeals = allMeals.filter((meal) => {
    const dateMatch = date
      ? meal.date.toDateString() === date.toDateString()
      : true;

    const typeMatch = mealTypeFilter ? meal.type === mealTypeFilter : true;

    return dateMatch && typeMatch;
  });

  // Get meals for current page
  const currentMeals = expanded
    ? filteredMeals.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredMeals.slice(0, 3); // Default shows only 3 meals

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setCurrentPage(1);
  };

  const handleMealTypeFilter = (type: string) => {
    setMealTypeFilter(type === mealTypeFilter ? null : type);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setDate(new Date());
    setMealTypeFilter(null);
    setCurrentPage(1);
  };

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

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Meal History</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                {date ? format(date, "PP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Meal Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleMealTypeFilter("Breakfast")}
              >
                Breakfast {mealTypeFilter === "Breakfast" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMealTypeFilter("Lunch")}>
                Lunch {mealTypeFilter === "Lunch" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMealTypeFilter("Dinner")}>
                Dinner {mealTypeFilter === "Dinner" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMealTypeFilter("Snack")}>
                Snack {mealTypeFilter === "Snack" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMealTypeFilter("Dessert")}>
                Dessert {mealTypeFilter === "Dessert" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearFilters}>
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        {loggedMealData?.map((meal) => {
          const localDate = convertUTCToLocalTime(meal?.created_at_utc);

          const date = new Date(localDate);
          const formattedTime = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(date);

          return (
            <MealItem
              key={meal?.ai_response?.id}
              id={meal?.ai_response?.id}
              type={meal?.meal_type}
              time={formattedTime}
              name={meal?.ai_response?.food_name}
              calories={meal?.ai_response?.calories?.quantity}
              protein={meal?.ai_response?.protein?.quantity}
              meal={meal}
              isFavorite={meal.is_favourite}
              onMealClick={handleMealClick}
              setCurrentMeal={setCurrentMeal}
              setAnalysisOpen={setAnalysisOpen}
              deleteUserFoodData={deleteUserFoodData}
            />
          );
        })}
        {/* {currentMeals.map((meal) => (
          <MealItem
            key={meal.id}
            type={meal.type}
            time={meal.time}
            name={meal.name}
            calories={meal.calories}
            protein={meal.protein}
          />
        ))} */}

        {loggedMealData?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No meals found for the selected filters.
          </div>
        )}
      </div>

      {loggedMealData?.length > 3 && !expanded && (
        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={() => setExpanded(true)}
        >
          View More <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )}

      {currentMeal && (
        <MealAnalysisModal
          open={analysisOpen}
          onOpenChange={setAnalysisOpen}
          meal={currentMeal}
          refetchLoggedMeals={refetchLoggedMeals}
        />
      )}

      {expanded && totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default MealHistorySection;
