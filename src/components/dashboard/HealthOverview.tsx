import { useEffect, useState } from "react";
import { Heart, Activity, Moon, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserFaceScore } from "@/service/hooks/shenai/useShenaiFaceScore";
import { useAuth } from "@/contexts/AuthContext";

interface HealthScoreProps {
  title: string;
  score: number;
  change: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const HealthScore = ({
  title,
  score,
  change,
  icon,
  color,
  delay = 0,
}: HealthScoreProps) => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScore(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="flex flex-col items-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn("rounded-full p-2 mb-2", color)}>{icon}</div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-xl font-bold mt-1">
        {showScore ? `${score}%` : "—%"}
      </div>
      {
        <div
          className={cn(
            "text-xs flex items-center mt-1",
            change >= 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </div>
      }
    </div>
  );
};

const HealthOverview = () => {
  const { isAuthenticated } = useAuth();

  const { data: userFaceScoreHealthData } = useGetUserFaceScore(
    isAuthenticated,
    "HEALTH"
  );
  const { data: userFaceScoreActivityData } = useGetUserFaceScore(
    isAuthenticated,
    "ACTIVITY"
  );
  const { data: userFaceScoreSleepData } = useGetUserFaceScore(
    isAuthenticated,
    "SLEEP"
  );
  const { data: userFaceScoreNutritionData } = useGetUserFaceScore(
    isAuthenticated,
    "NUTRITION"
  );

  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Health Overview</h3>
        <div className="grid grid-cols-4 gap-4">
          <HealthScore
            title="Overall"
            score={userFaceScoreHealthData?.averageScore || 0}
            change={userFaceScoreHealthData?.scoreDifferencePercentage || 0}
            icon={<Heart className="h-5 w-5 text-rose-600" />}
            color="bg-rose-100"
            delay={0.1}
          />
          <HealthScore
            title="Activity"
            score={userFaceScoreActivityData?.averageScore || 0}
            change={userFaceScoreActivityData?.scoreDifferencePercentage || 0}
            icon={<Activity className="h-5 w-5 text-green-600" />}
            color="bg-green-100"
            delay={0.2}
          />
          <HealthScore
            title="Sleep"
            score={(userFaceScoreSleepData?.averageScore || 0) / 3600}
            change={userFaceScoreSleepData?.scoreDifferencePercentage || 0}
            icon={<Moon className="h-5 w-5 text-purple-600" />}
            color="bg-purple-100"
            delay={0.3}
          />
          <HealthScore
            title="Nutrition"
            score={userFaceScoreNutritionData?.averageScore || 0}
            change={userFaceScoreNutritionData?.scoreDifferencePercentage || 0}
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
