
import MacroDistributionRing from "@/components/nutrition/MacroDistributionRing";

interface MacronutrientsCardProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPercentage: number;
  fatPercentage: number;
  carbsPercentage: number;
}

const MacronutrientsCard = ({ 
  calories, 
  protein, 
  carbs, 
  fat,
  proteinPercentage,
  fatPercentage,
  carbsPercentage
}: MacronutrientsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-xl font-semibold mb-3">Macronutrients</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Calories</span>
            <span className="text-lg font-semibold">{calories} kcal</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Protein</span>
            <span className="text-lg font-semibold">{protein}g</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Carbs</span>
            <span className="text-lg font-semibold">{carbs}g</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Fats</span>
            <span className="text-lg font-semibold">{fat}g</span>
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
  );
};

export default MacronutrientsCard;
