
import React from "react";
import { Progress } from "@/components/ui/progress";

interface DifficultyAnalysisProps {
  difficulties: Array<{
    category: string;
    averageDifficulty: number;
    count: number;
  }>;
}

const DifficultyAnalysis = ({ difficulties }: DifficultyAnalysisProps) => {
  // Function to determine the color based on difficulty level
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "#22c55e"; // Green for easy
    if (difficulty <= 3.5) return "#eab308"; // Yellow for moderate
    return "#ef4444"; // Red for difficult
  };

  return (
    <div className="space-y-4">
      {difficulties.map((item, index) => {
        const difficultyPercentage = (item.averageDifficulty / 5) * 100;
        const color = getDifficultyColor(item.averageDifficulty);
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">
                {item.category} 
                <span className="text-gray-500 ml-2">({item.count} exercises)</span>
              </div>
              <div className="font-bold">{item.averageDifficulty.toFixed(1)}/5</div>
            </div>
            <Progress 
              value={difficultyPercentage} 
              className="h-2"
              indicatorColor={color}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DifficultyAnalysis;
