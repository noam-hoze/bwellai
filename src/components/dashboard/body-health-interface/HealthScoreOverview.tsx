
import { Heart, Activity, Moon, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthScoreProps {
  category: string;
  score: number;
  change: number;
}

interface HealthScoreOverviewProps {
  scores: HealthScoreProps[];
}

const HealthScoreOverview: React.FC<HealthScoreOverviewProps> = ({ scores }) => {
  // Helper function to get icon by category
  const getIconByCategoryName = (category: string) => {
    switch (category.toLowerCase()) {
      case "overall": return <Heart className="h-5 w-5 text-rose-600" />;
      case "activity": return <Activity className="h-5 w-5 text-green-600" />;
      case "sleep": return <Moon className="h-5 w-5 text-purple-600" />;
      case "nutrition": return <Droplets className="h-5 w-5 text-amber-600" />;
      default: return <Heart className="h-5 w-5 text-rose-600" />;
    }
  };
  
  // Helper function to get background color by category
  const getBgColorByCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "overall": return "bg-rose-100";
      case "activity": return "bg-green-100";
      case "sleep": return "bg-purple-100";
      case "nutrition": return "bg-amber-100";
      default: return "bg-gray-100";
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Health Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        {scores.map((score, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center animate-scale-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={cn("rounded-full p-2 mb-2", getBgColorByCategory(score.category))}>
              {getIconByCategoryName(score.category)}
            </div>
            <div className="text-sm font-medium text-gray-500">{score.category}</div>
            <div className="text-xl font-bold mt-1">
              {score.score}%
            </div>
            {score.change !== 0 && (
              <div className={cn("text-xs flex items-center mt-1", 
                score.change > 0 ? "text-green-600" : "text-red-600")}>
                {score.change > 0 ? "+" : ""}{score.change}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthScoreOverview;
