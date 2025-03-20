
import { useEffect, useState } from "react";
import { Heart, Activity, Moon, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface HealthScoreProps {
  title: string;
  score: number;
  change: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const HealthScore = ({ title, score, change, icon, color, delay = 0 }: HealthScoreProps) => {
  const [showScore, setShowScore] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScore(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
      <div className={cn("rounded-full p-2 mb-2", color)}>
        {icon}
      </div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-xl font-bold mt-1">
        {showScore ? `${score}%` : "—%"}
      </div>
      {change !== 0 && (
        <div className={cn("text-xs flex items-center mt-1", 
          change > 0 ? "text-green-600" : "text-red-600")}>
          {change > 0 ? "+" : ""}{change}%
        </div>
      )}
    </div>
  );
};

const HealthOverview = () => {
  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Health Overview</h3>
        <div className="grid grid-cols-4 gap-4">
          <HealthScore 
            title="Overall" 
            score={85} 
            change={5} 
            icon={<Heart className="h-5 w-5 text-rose-600" />}
            color="bg-rose-100"
            delay={0.1}
          />
          <HealthScore 
            title="Activity" 
            score={78} 
            change={-2} 
            icon={<Activity className="h-5 w-5 text-green-600" />}
            color="bg-green-100"
            delay={0.2}
          />
          <HealthScore 
            title="Sleep" 
            score={92} 
            change={8} 
            icon={<Moon className="h-5 w-5 text-purple-600" />}
            color="bg-purple-100"
            delay={0.3}
          />
          <HealthScore 
            title="Nutrition" 
            score={88} 
            change={3} 
            icon={<Leaf className="h-5 w-5 text-amber-600" />}
            color="bg-amber-100"
            delay={0.4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthOverview;
