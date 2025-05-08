
import DualProgressBar from "@/components/nutrition/DualProgressBar";

interface DailyGoal {
  current: number;
  max: number;
}

interface DailyImpactCardProps {
  meal: {
    calories: number;
    protein: number;
  };
  dailyGoals: {
    calories: DailyGoal;
    protein: DailyGoal;
    sugar: DailyGoal;
  };
}

const DailyImpactCard = ({ meal, dailyGoals }: DailyImpactCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-xl font-semibold mb-3">Impact on Daily Goals</h2>
      
      <div className="space-y-4">
        <DualProgressBar
          currentValue={dailyGoals.calories.current}
          addedValue={meal.calories}
          maxValue={dailyGoals.calories.max}
          unit="kcal"
          label="Calories"
        />
        
        <DualProgressBar
          currentValue={dailyGoals.protein.current}
          addedValue={meal.protein}
          maxValue={dailyGoals.protein.max}
          unit="g"
          label="Protein"
        />
        
        <DualProgressBar
          currentValue={dailyGoals.sugar.current}
          addedValue={12}
          maxValue={dailyGoals.sugar.max}
          unit="g"
          label="Sugar"
        />
      </div>
    </div>
  );
};

export default DailyImpactCard;
