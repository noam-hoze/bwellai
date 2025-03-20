
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  change: number;
  color: "blue" | "green" | "yellow" | "purple";
  delay?: number;
}

const ScoreCard = ({ title, score, change, color, delay = 0 }: ScoreCardProps) => {
  const [showScore, setShowScore] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const colorMap = {
    blue: "bg-wellness-blue",
    green: "bg-wellness-green",
    yellow: "bg-wellness-yellow",
    purple: "bg-purple-100"
  };
  
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowScore(true);
    }, delay * 1000);
    
    const progressTimer = setTimeout(() => {
      setProgress(score);
    }, (delay + 0.3) * 1000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(progressTimer);
    };
  }, [delay, score]);

  return (
    <div className="wellness-card p-6 animate-scale-in" style={{ animationDelay: `${delay}s` }}>
      <div className="text-sm font-medium text-gray-500 mb-2">{title}</div>
      <div className="flex items-baseline mb-3">
        <div className="text-4xl font-bold">
          {showScore ? `${score}%` : "—%"}
        </div>
        {change !== 0 && (
          <div className={cn("ml-2 text-sm", change > 0 ? "text-green-600" : "text-red-600")}>
            {change > 0 ? `+${change}%` : `${change}%`}
          </div>
        )}
      </div>
      <div className="score-progress">
        <div 
          className={cn("score-progress-bar", colorMap[color])} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
