import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Plus, AlertTriangle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Watermark from "@/components/ui/watermark/Watermark";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  warning?: string;
}

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

const MealEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState(0);
  const [originalMeal, setOriginalMeal] = useState<MealData | null>(null);

  useEffect(() => {
    // Get meal data from location state
    if (location.state?.meal) {
      const meal = location.state.meal;
      setOriginalMeal(meal);
      setMealName(meal?.ai_response?.food_name);
      setMealType(meal.meal_type);
      setCalories(meal?.ai_response?.calories?.quantity?.toString());
      setProtein(meal?.ai_response?.protein?.quantity?.toString());
      setCarbs(meal?.ai_response?.carbohydrates?.quantity?.toString());
      setFat(meal?.ai_response?.fats?.quantity?.toString());
      setNotes(meal.notes || "");
      setScore(meal?.ai_response?.general_food_quality_rating);

      // Transform string ingredients into structured ingredients
      console.log("this is list", meal?.ai_response?.ingredients);

      const structuredIngredients = (meal?.ai_response?.ingredients || []).map(
        (ing: any, index: number) => ({
          name: ing?.name,
          quantity: ing?.quantity || 0,
          unit: ing?.quantity_unit,
          warning: undefined,
        })
      );
      console.log(structuredIngredients);

      setIngredients(structuredIngredients);
    } else {
      // Redirect to nutrition page if no meal data
      navigate("/nutrition");
      toast.error("No meal data found");
    }
  }, [location, navigate]);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      name: "",
      quantity: "",
      unit: "cup",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  };

  const handleSave = () => {
    if (!mealName.trim()) {
      toast.error("Please enter a meal name");
      return;
    }

    const updatedMeal = {
      ...originalMeal,
      name: mealName,
      type: mealType,
      calories: parseInt(calories, 10) || 0,
      protein: parseInt(protein, 10) || 0,
      carbs: parseInt(carbs, 10) || 0,
      fat: parseInt(fat, 10) || 0,
      ingredients: ingredients.map((ing) => ing.name),
      notes: notes,
    };

    console.log(updatedMeal);

    // Navigate back to the analysis page with the updated meal
    // navigate("/meal-analysis", { state: { meal: updatedMeal } });
    toast.success("Meal updated successfully!");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!originalMeal) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">Loading meal data...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Watermark text="Coming Soon">
        <div className="container mx-auto px-4 pb-24">
          <div className="p-4 flex flex-row items-center justify-between border-b sticky top-0 bg-white z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-10 w-10 rounded-full bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">Edit Meal</h2>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
              onClick={handleSave}
            >
              Done
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Meal Name */}
            <div className="space-y-2">
              <Label htmlFor="meal-name" className="text-gray-600">
                Meal Name
              </Label>
              <Input
                id="meal-name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="bg-gray-50 text-lg"
                placeholder="Enter meal name"
              />
            </div>

            {/* Meal Type */}
            <div className="space-y-2">
              <Label htmlFor="meal-type" className="text-gray-600">
                Meal Type
              </Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger
                  id="meal-type"
                  className="bg-gray-50 flex justify-between"
                >
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                    <SelectItem value="Pre-Workout">Pre-Workout</SelectItem>
                    <SelectItem value="Post-Workout">Post-Workout</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-24 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">Change Photo</h3>
                  <p className="text-gray-500 text-sm">
                    Tap to edit food image
                  </p>
                </div>
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Nutrition Facts</h3>

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <Label htmlFor="calories" className="text-gray-700 text-lg">
                  Calories
                </Label>
                <div className="flex items-center">
                  <Input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-28 text-right mr-2 bg-white border-gray-200"
                  />
                  <span className="text-gray-500">kcal</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <Label htmlFor="protein" className="text-gray-700 text-lg">
                  Protein
                </Label>
                <div className="flex items-center">
                  <Input
                    id="protein"
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="w-28 text-right mr-2 bg-white border-gray-200"
                  />
                  <span className="text-gray-500">g</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <Label htmlFor="carbs" className="text-gray-700 text-lg">
                  Carbs
                </Label>
                <div className="flex items-center">
                  <Input
                    id="carbs"
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    className="w-28 text-right mr-2 bg-white border-gray-200"
                  />
                  <span className="text-gray-500">g</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <Label htmlFor="fat" className="text-gray-700 text-lg">
                  Fat
                </Label>
                <div className="flex items-center">
                  <Input
                    id="fat"
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    className="w-28 text-right mr-2 bg-white border-gray-200"
                  />
                  <span className="text-gray-500">g</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Ingredients</h3>

              {ingredients?.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="bg-gray-50 p-3 rounded-lg flex items-center justify-between gap-2"
                >
                  <div className="w-1/3">
                    {ingredient.warning && (
                      <div className="flex items-center text-amber-500 mb-1">
                        <AlertTriangle size={16} className="mr-1" />
                        <span className="text-xs">!</span>
                      </div>
                    )}
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "name", e.target.value)
                      }
                      className="border-0 p-0 h-auto bg-transparent text-gray-800 text-base focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Qty"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        updateIngredient(
                          ingredient.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="w-28 bg-white border-gray-200 text-center"
                    />
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) =>
                        updateIngredient(ingredient.id, "unit", value)
                      }
                    >
                      <SelectTrigger className="w-24 bg-white border-gray-200">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="mg">mg</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="oz">oz</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="tsp">tsp</SelectItem>
                        <SelectItem value="cup">cup</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-100 hover:text-blue-600"
                onClick={addIngredient}
              >
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-gray-600">
                Notes
              </Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-gray-50"
                placeholder="Add notes about this meal"
              />
            </div>

            {/* Meal Score */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Meal Score: <span className="font-semibold">{score}/10</span> ·
                <span className="text-green-600 ml-2">High in Fiber</span> ·
                <span className="text-amber-600 ml-2">Moderate Sugar</span>
              </p>
            </div>
          </div>
        </div>
      </Watermark>
    </Layout>
  );
};

export default MealEditPage;
