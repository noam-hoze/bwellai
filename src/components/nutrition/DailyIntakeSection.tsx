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
            <span className="text-xl font-bold">{value}%</span>
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
  if (percentage < 50) return "from-yellow-400 to-green-400"; // Under 50% - yellow to green
  if (percentage >= 50 && percentage < 100)
    return "from-green-400 to-green-500"; // 50-100% - green gradient
  return "from-green-500 to-red-500"; // Over 100% - green to red
};

const DailyIntakeSection = ({
  totalDailyCalories,
  totalDailyProtein,
  totalDailyFats,
  totalDailyCarbs,
  totalDailyRequiredCalories,
  requiredMicronutrientsBalance,
}) => {
  // Calorie intake data (simulated)
  // const calorieIntake = 1800; // Current calories consumed
  const calorieGoal = 2200; // Daily calorie goal
  const caloriePercentage = Math.round(
    (totalDailyCalories / totalDailyRequiredCalories) * 100
  );
  const colorGradient = getCalorieProgressColor(caloriePercentage);

  // Calculate if over target
  const isOverTarget = totalDailyCalories > totalDailyRequiredCalories;
  const overAmount = isOverTarget
    ? totalDailyCalories - totalDailyRequiredCalories
    : 0;

  // Maximum displayed value (150% of goal)
  const maxDisplayValue = totalDailyRequiredCalories * 1.5;

  // Calculate the position of the target indicator (as percentage of the bar)
  const targetPosition = Math.min(
    (totalDailyRequiredCalories / maxDisplayValue) * 100,
    100
  );

  // Calculate width of the progress bar (capped at maxDisplayValue)
  const progressWidth = Math.min(
    (totalDailyCalories / maxDisplayValue) * 100,
    100
  );

  // Nutrient data (simulated) - added gram values
  const fatGrams = 100;
  const proteinGrams = 100;
  const carbsGrams = 1000;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Today's Intake</h2>
      <div className="flex justify-between items-center gap-4">
        <NutrientProgress
          label="Fat"
          value={Number(
            (
              (totalDailyFats / requiredMicronutrientsBalance?.fat) *
              100
            )?.toFixed(0)
          )}
          grams={requiredMicronutrientsBalance?.fat}
        />
        <NutrientProgress
          label="Protein"
          value={Number(
            (
              (totalDailyProtein / requiredMicronutrientsBalance?.protein) *
              100
            )?.toFixed(0)
          )}
          grams={requiredMicronutrientsBalance?.protein}
        />
        <NutrientProgress
          label="Carbs"
          value={Number(
            (
              (totalDailyCarbs / requiredMicronutrientsBalance?.carbs) *
              100
            )?.toFixed(0)
          )}
          grams={requiredMicronutrientsBalance?.carbs}
        />
      </div>

      {/* Enhanced calorie progress bar with calorie info next to title */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Calorie Consumption</h3>
          <span className="text-sm font-medium">
            {totalDailyCalories}/{totalDailyRequiredCalories?.toFixed(0)} kcal
          </span>
        </div>

        <div className="flex justify-between mb-2">
          {isOverTarget && (
            <span className="text-sm font-medium text-red-500">
              +{overAmount} kcal
            </span>
          )}
        </div>

        <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className={`h-full bg-gradient-to-r ${colorGradient} transition-all duration-500 ease-in-out rounded-l-full`}
            style={{ width: `${progressWidth}%` }}
          />

          {/* Target indicator line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 border-r-2 border-dashed border-black z-10"
            style={{ left: `${targetPosition}%` }}
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium">
              Target
            </div>
          </div>

          {/* Over amount indicator */}
          {isOverTarget && (
            <div
              className="absolute top-0 h-full flex items-center justify-center text-white font-bold"
              style={{
                left: `${targetPosition}%`,
                width: `${Math.min(
                  (overAmount / maxDisplayValue) * 100,
                  100 - targetPosition
                )}%`,
                backgroundColor: "rgba(239, 68, 68, 0.6)",
              }}
            >
              +{overAmount}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          {/* Target goal text positioned under the target line */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: `${targetPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-sm font-medium">
              {totalDailyRequiredCalories?.toFixed(0)}
            </span>
            <span>Goal</span>
          </div>
          <span>{Math.round(maxDisplayValue)} (+50%)</span>
        </div>
      </div>
    </section>
  );
};

export default DailyIntakeSection;
