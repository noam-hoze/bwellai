
interface MealSummaryProps {
  name: string;
  score: number;
}

const MealSummary = ({ name, score }: MealSummaryProps) => {
  return (
    <div className="p-4">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-gray-800 text-xl">{name}</h2>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 border-2 border-yellow-300">
            <span className="text-yellow-800 font-bold">{score}/10</span>
          </div>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Moderate</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          This meal balances positives (complete protein, vegetables, good satiety) with negatives (processed chips, high sodium, saturated fat). The protein and vegetables provide nutrition, but refined carbs and unhealthy fats lower the score. Simple swaps could make this meal healthier while staying satisfying.
        </p>
      </div>
    </div>
  );
};

export default MealSummary;
