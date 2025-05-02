import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DualProgressBarProps {
  currentValue: number;
  addedValue: number;
  maxValue: number;
  unit: string;
  label: string;
  className?: string;
}

const DualProgressBar = ({
  currentValue,
  addedValue,
  maxValue,
  unit,
  label,
  className,
}: DualProgressBarProps) => {
  // Calculate percentages for the progress bars
  const currentPercentage = Math.min((currentValue / maxValue) * 100, 100);
  const combinedPercentage = Math.min(
    ((currentValue + addedValue) / maxValue) * 100,
    100
  );

  // Format the display values
  const formattedCurrent = currentValue.toFixed(0);
  const formattedAfterLog = (currentValue + addedValue).toFixed(0);
  const formattedMax = maxValue > 0 ? maxValue.toFixed(0) : 0;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm text-gray-700">
          {formattedAfterLog}/{formattedMax} {unit}
        </span>
      </div>

      <div className="relative w-full">
        {/* Base progress bar - shows total goal */}
        {/* <Progress className="h-2 bg-gray-200" value={100} /> */}

        <div className="relative w-full h-2 bg-gray-200 rounded-md overflow-hidden">
          {/* Blue: Current Value */}
          <div
            className="absolute left-0 top-0 h-full bg-[#3B82F6]"
            style={{ width: `${currentPercentage}%` }}
          />

          {/* Green: Added Value (Starts where blue ends) */}
          <div
            className="absolute top-0 h-full bg-green-400"
            style={{
              width: `${addedValue ? (addedValue / maxValue) * 100 : 0}%`,
              left: `${currentPercentage}%`, // Moves the green bar to start after the blue
            }}
          />
        </div>

        {/* Current progress bar */}
        {/* <Progress
          className="h-2 absolute top-0 left-0"
          value={currentPercentage}
          indicatorColor="#3B82F6" // Blue color
        /> */}

        {/* Addition from this meal - shown as different color */}
        {/* <Progress
          className="h-2 absolute top-0 left-0"
          value={combinedPercentage}
          indicatorColor="rgba(59, 130, 246, 0.5)" // Semi-transparent blue
        /> */}
      </div>

      <div className="text-xs text-gray-500 pt-1">
        Current: {formattedCurrent} → After Log: {formattedAfterLog} {unit}
      </div>
    </div>
  );
};

export default DualProgressBar;
