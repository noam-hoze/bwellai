import { useState, useEffect } from "react";
import { ArrowLeft, Plus, AlertTriangle, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  warning?: string;
}

interface EditMealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?: {
    id: number;
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    notes?: string;
  };
  onSave: (updatedMeal) => void;
}

const EditMealModal = ({
  open,
  onOpenChange,
  meal,
  onSave,
}: EditMealModalProps) => {
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [score, setScore] = useState(7);

  // useEffect(() => {
  //   if (meal) {
  //     setMealName(meal.name);
  //     setMealType(meal.type);
  //     setCalories(meal.calories.toString());
  //     setProtein(meal.protein.toString());
  //     setCarbs(meal.carbs.toString());
  //     setFat(meal.fat.toString());

  //     // Transform string ingredients into structured ingredients
  //     const structuredIngredients = meal.ingredients.map((ing, index) => ({
  //       id: `ing-${index}`,
  //       name: ing,
  //       quantity: index === 0 ? "1/2" : index === 1 ? "1/4" : "1",
  //       unit: index === 0 ? "cup" : index === 1 ? "cup" : "tbsp",
  //       warning: index === 2 ? "High in added sugar" : undefined,
  //     }));

  //     setIngredients(structuredIngredients);
  //   }
  // }, [meal, open]);

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
      ...meal,
      name: mealName,
      type: mealType,
      calories: parseInt(calories, 10) || 0,
      protein: parseInt(protein, 10) || 0,
      carbs: parseInt(carbs, 10) || 0,
      fat: parseInt(fat, 10) || 0,
      ingredients: ingredients.map((ing) => ing.name),
    };

    onSave(updatedMeal);
    toast.success("Meal updated successfully!");
    onOpenChange(false);
  };

  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
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
        </DialogHeader>

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
                <p className="text-gray-500 text-sm">Tap to edit food image</p>
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

            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
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

          {/* Meal Score */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Meal Score: <span className="font-semibold">{score}/10</span> ·
              <span className="text-green-600 ml-2">High in Fiber</span> ·
              <span className="text-amber-600 ml-2">Moderate Sugar</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealModal;
