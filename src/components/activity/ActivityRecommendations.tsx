
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ActivityRecommendationsProps {
  date: Date;
  viewType: "day" | "week" | "month";
}

const ActivityRecommendations: React.FC<ActivityRecommendationsProps> = ({ date, viewType }) => {
  const [expanded, setExpanded] = React.useState(false);

  const getRecommendations = () => {
    if (viewType === "day") {
      return [
        "Based on your activity patterns, try to include more moderate-intensity activities in your routine.",
        "Consider taking short walking breaks every 2 hours to improve circulation.",
        "Your step count is below your daily goal. Try to incorporate a short evening walk."
      ];
    } else if (viewType === "week") {
      return [
        "Your weekly activity shows good variation in intensity levels.",
        "Consider adding one more strength training session to balance your cardio activities.",
        "Try to maintain consistent activity levels throughout the week."
      ];
    } else {
      return [
        "This month shows improved consistency in your daily activity patterns.",
        "Consider increasing your weekly high-intensity workouts gradually.",
        "Your recovery periods are well-distributed throughout the month."
      ];
    }
  };
  
  const recommendations = getRecommendations();
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {recommendations.slice(0, expanded ? recommendations.length : 1).map((rec, index) => (
          <div 
            key={index}
            className="p-3 bg-gray-50 rounded-md border-l-4 border-blue-400"
          >
            <p className="text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
      
      {recommendations.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center gap-1 mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : `Show All (${recommendations.length})`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </Button>
      )}
    </div>
  );
};

export default ActivityRecommendations;
