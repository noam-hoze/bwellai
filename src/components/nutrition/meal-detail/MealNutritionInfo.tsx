import { Input } from "@/components/ui/input";

interface MealNutritionInfoProps {
  isEditing: boolean;
  currentMeal;
  originalMeal;
}

const MealNutritionInfo = ({
  isEditing,
  currentMeal,
  originalMeal,
}: MealNutritionInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-500">Calories</p>
        {isEditing ? (
          <Input
            type="number"
            defaultValue={
              currentMeal?.calories?.quantity || originalMeal.calories?.quantity
            }
            className="text-lg font-semibold p-1 h-8"
          />
        ) : (
          <p className="text-lg font-semibold">
            {currentMeal?.calories?.quantity || originalMeal.calories?.quantity}{" "}
            kcal
          </p>
        )}
      </div>
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-500">Protein</p>
        {isEditing ? (
          <Input
            type="number"
            defaultValue={
              currentMeal?.protein?.quantity || originalMeal.protein?.quantity
            }
            className="text-lg font-semibold p-1 h-8"
          />
        ) : (
          <p className="text-lg font-semibold">
            {currentMeal?.protein?.quantity || originalMeal.protein?.quantity}g
          </p>
        )}
      </div>
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-500">Carbs</p>
        {isEditing ? (
          <Input
            type="number"
            defaultValue={
              currentMeal?.carbs?.quantity || originalMeal.carbs?.quantity
            }
            className="text-lg font-semibold p-1 h-8"
          />
        ) : (
          <p className="text-lg font-semibold">
            {currentMeal?.carbs?.quantity || originalMeal.carbs?.quantity}g
          </p>
        )}
      </div>
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-500">Fat</p>
        {isEditing ? (
          <Input
            type="number"
            defaultValue={
              currentMeal?.fat?.quantity || originalMeal.fat?.quantity
            }
            className="text-lg font-semibold p-1 h-8"
          />
        ) : (
          <p className="text-lg font-semibold">
            {currentMeal?.fat?.quantity || originalMeal.fat?.quantity}g
          </p>
        )}
      </div>
    </div>
  );
};

export default MealNutritionInfo;
