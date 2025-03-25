import { Progress } from "@/components/ui/progress";

interface NutrientProgressProps {
  label: string;
  value: number;
  grams: number;
}

const NutrientProgress = ({ label, value, grams }: NutrientProgressProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-gray-200 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{value}%</span>
            <span className="text-sm">{grams}g</span>
          </div>
        </div>
        <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#22c55e"
            strokeWidth="8"
            strokeDasharray={`${Math.min(value, 100) * 2.83} 283`}
          />
        </svg>
      </div>
      <span className="text-lg font-medium">{label}</span>
    </div>
  );
};

// Function to determine color based on percentage of calorie goal
const getCalorieProgressColor = (percentage: number): string => {
  if (percentage < 50) return "from-red-500 to-yellow-500"; // Under 50% - red to yellow
  if (percentage >= 50 && percentage < 100)
    return "from-yellow-500 to-green-500"; // 50-100% - yellow to green
  if (percentage === 100) return "bg-green-500"; // At 100% - solid green
  if (percentage > 100 && percentage <= 125)
    return "from-green-500 to-yellow-500"; // 100-125% - green to yellow
  if (percentage > 125 && percentage <= 150)
    return "from-yellow-500 to-orange-500"; // 125-150% - yellow to orange
  return "from-orange-500 to-red-500"; // Over 150% - orange to red
};

const DailyIntakeSection = () => {
  // Calorie intake data (simulated)
  const calorieIntake = 1800; // Current calories consumed
  const calorieGoal = 2200; // Daily calorie goal
  const caloriePercentage = Math.round((calorieIntake / calorieGoal) * 100);
  const colorGradient = getCalorieProgressColor(caloriePercentage);

  // Nutrient data (simulated) - added gram values
  const fatGrams = 56;
  const proteinGrams = 84;
  const carbsGrams = 195;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Today's Intake</h2>
      <div className="flex justify-between items-center gap-4">
        <NutrientProgress label="Fat" value={65} grams={fatGrams} />
        <NutrientProgress label="Protein" value={42} grams={proteinGrams} />
        <NutrientProgress label="Carbs" value={78} grams={carbsGrams} />
      </div>

      {/* Calorie progress bar */}
      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Calories</span>
          <span className="text-sm font-medium">
            {calorieIntake} / {calorieGoal} kcal
          </span>
        </div>
        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              caloriePercentage === 100 ? "" : "bg-gradient-to-r"
            } ${colorGradient} transition-all duration-500 ease-in-out`}
            style={{ width: `${Math.min(caloriePercentage, 150)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">{calorieGoal}</span>
            <span>Goal</span>
          </div>
          <span>+50%</span>
        </div>
      </div>
    </section>
  );
};

export default DailyIntakeSection;
