
import { Progress } from "@/components/ui/progress";

interface NutrientProgressProps {
  label: string;
  value: number;
}

const NutrientProgress = ({ label, value }: NutrientProgressProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold">{value}%</span>
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

const DailyIntakeSection = () => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Today's Intake</h2>
      <div className="flex justify-between items-center gap-4">
        <NutrientProgress label="Calories" value={65} />
        <NutrientProgress label="Protein" value={42} />
        <NutrientProgress label="Carbs" value={78} />
      </div>
    </section>
  );
};

export default DailyIntakeSection;
