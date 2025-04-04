import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SavedItem {
  id: string;
  name: string;
  brand: string;
  score: number;
  image?: string;
  category: string;
  dateAdded: string;
}

const SavedItemsSection = ({
  loggedMealData,
  totalDailyCalories,
  totalDailyProtein,
  totalDailyCarbs,
  totalDailyFats,
  totalDailyRequiredCalories,
  requiredMicronutrientsBalance,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, we would fetch this from a database
    // For now, we'll use mock data
    const mockSavedItems = loggedMealData?.filter((meal) => meal.is_saved);

    setItems(mockSavedItems);
  }, [loggedMealData]);

  // const filteredItems = items.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleItemClick = (item) => {
    navigate("/food-scan-analysis", {
      state: {
        productData: {
          id: item?.id,
          name: item?.ai_response?.food_name,
          brand: "",
          category: item?.ai_response?.categoryOfFood,
          image: "",
          score: item?.ai_response?.general_food_quality_rating,
          calories: item?.ai_response?.calories,
          carbohydrates: item?.ai_response?.carbohydrates,
          fats: item?.ai_response?.fats,
          protein: item?.ai_response?.protein,
          rating: item?.ai_response?.categorySpecificRating,
          concerns: item?.ai_response?.warning,
          benefits: [
            {
              name: "",
              amount: "",
              explanation: "",
              details: "",
            },
          ],
          ingredients: item?.ai_response?.ingredients?.map((list) => {
            return list?.name;
          }),
          allergens: [],
          alternatives: [],
          healthImpact: item?.ai_response?.health_impact,
          is_saved: item?.is_saved,
          totalDailyCalories,
          totalDailyProtein,
          totalDailyCarbs,
          totalDailyFats: totalDailyFats,
          totalDailyRequiredCalories: totalDailyRequiredCalories,
          requiredMicronutrientsBalance: requiredMicronutrientsBalance,
        },
      },
    });
  };

  const getScoreColorClass = (score: number) => {
    if (score < 40) return "text-red-500 bg-red-50 border-red-200";
    if (score < 70) return "text-yellow-500 bg-yellow-50 border-yellow-200";
    return "text-green-500 bg-green-50 border-green-200";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Saved Food Items</h2>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No saved items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-l-4 hover:shadow-md transition-shadow cursor-pointer"
              style={{
                borderLeftColor:
                  item?.ai_response?.general_food_quality_rating < 40
                    ? "#ef4444"
                    : item?.ai_response?.general_food_quality_rating < 70
                    ? "#eab308"
                    : "#22c55e",
              }}
              onClick={() => handleItemClick(item)}
            >
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="p-3 flex-1">
                    <span className="text-xs text-gray-500">
                      {item.category}
                    </span>
                    <h3 className="font-medium">
                      {item?.ai_response?.food_name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>

                  <div className="flex items-center mr-4">
                    <div
                      className={`text-center font-bold p-1 rounded-md border w-12 text-sm ${getScoreColorClass(
                        item?.ai_response?.general_food_quality_rating
                      )}`}
                    >
                      {item?.ai_response?.general_food_quality_rating}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItemsSection;
