import { useEffect, useState } from "react";
import { Heart, Activity, Moon, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserFaceScore } from "@/service/hooks/shenai/useShenaiFaceScore";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HealthScoreProps {
  title: string;
  score: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
  route: string;
}

const HealthScore = ({
  title,
  score,
  change,
  icon,
  color,
  route,
  delay = 0,
}: HealthScoreProps) => {
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScore(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={() => {
        navigate(route);
      }}
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

const HealthOverview = ({ wearableWeeklyData }) => {
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
            score={userFaceScoreHealthData?.averageScore?.toFixed(0) || "N/A"}
            change={
              userFaceScoreHealthData?.scoreDifferencePercentage?.toFixed(0) ||
              0
            }
            icon={<Heart className="h-5 w-5 text-rose-600" />}
            color="bg-rose-100"
            delay={0.1}
            route="/dashboard"
          />
          <HealthScore
            title="Activity"
            score={
              (userFaceScoreActivityData?.averageScore / 100)?.toFixed(0) ||
              "N/A"
            }
            change={
              userFaceScoreActivityData?.scoreDifferencePercentage?.toFixed(
                0
              ) || 0
            }
            icon={<Activity className="h-5 w-5 text-green-600" />}
            color="bg-green-100"
            delay={0.2}
            route="/activity"
          />
          <HealthScore
            title="Sleep"
            score={
              wearableWeeklyData?.weeklyAverageSleepScore?.toFixed(0) || "N/A"
            }
            change={
              userFaceScoreSleepData?.scoreDifferencePercentage?.toFixed(0) || 0
            }
            icon={<Moon className="h-5 w-5 text-purple-600" />}
            color="bg-purple-100"
            delay={0.3}
            route="/sleep"
          />
          <HealthScore
            title="Nutrition"
            score={
              userFaceScoreNutritionData?.averageScore?.toFixed(0) || "N/A"
            }
            change={
              userFaceScoreNutritionData?.scoreDifferencePercentage?.toFixed(
                0
              ) || 0
            }
            icon={<Leaf className="h-5 w-5 text-amber-600" />}
            color="bg-amber-100"
            delay={0.4}
            route="/nutrition"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthOverview;
