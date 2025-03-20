
import React from "react";

interface ActivitySummaryProps {
  date: Date;
  viewType: "day" | "week" | "month";
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ date, viewType }) => {
  // Mock data for activity metrics
  const summaryData = {
    steps: {
      current: 8432,
      target: 10000,
      unit: "steps"
    },
    activeMinutes: {
      current: 45,
      target: 60,
      unit: "minutes"
    },
    caloriesBurned: {
      current: 2100,
      target: 2500,
      unit: "kcal"
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(summaryData).map(([key, data]) => (
        <div key={key} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <span className="text-sm text-gray-500">
              Target: {data.target} {data.unit}
            </span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {data.current}
                <span className="text-sm font-normal ml-1">{data.unit}</span>
              </span>
              <span className={`text-sm ${data.current >= data.target ? 'text-green-500' : 'text-orange-500'}`}>
                {Math.round((data.current / data.target) * 100)}% of daily goal
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 rounded-full ${
                  data.current >= data.target ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{
                  width: `${Math.min((data.current / data.target) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitySummary;
