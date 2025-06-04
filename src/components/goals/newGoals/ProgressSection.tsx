
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingDown, 
  Download, 
  Info, 
  CheckCircle, 
  Activity, 
  BarChart, 
  Share2, 
  Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PainProgressChart from "./PainProgressChart";
import DifficultyAnalysis from "./DifficultyAnalysis";
import InsightCard from "./InsightCard";

interface ProgressSectionProps {
  completedExercises: number;
  totalExercises: number;
  currentDay: Date;
  currentDayOfGoal: number;
  totalDays: number;
  painReduction: number;
  streak: number;
  painHistory: Array<{day: number, level: number}>;
  initialPainLevel: number;
  currentPainLevel: number;
  targetPainLevel: number;
  exerciseDifficulties: Array<{
    category: string;
    averageDifficulty: number;
    count: number;
  }>;
  insights: Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
  }>;
  milestones: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
    icon: string;
  }>;
}

const ProgressSection = ({
  completedExercises,
  totalExercises,
  currentDay,
  currentDayOfGoal,
  totalDays,
  painReduction,
  streak,
  painHistory,
  initialPainLevel,
  currentPainLevel,
  targetPainLevel,
  exerciseDifficulties,
  insights,
  milestones
}: ProgressSectionProps) => {
  const completionPercentage = Math.round((completedExercises / totalExercises) * 100);
  const planProgress = Math.round((currentDayOfGoal / totalDays) * 100);
  const adherenceRate = Math.round((completedExercises / (currentDayOfGoal * (totalExercises / totalDays))) * 100);
  
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    alert("Downloading progress report...");
  };

  const handleShareReport = () => {
    // In a real app, this would open sharing options
    alert("Opening sharing options...");
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Section */}
      <Card className="bg-green-50">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-4">Overall Plan Progress</h3>
          
          {/* Main Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Plan Completion</span>
              <span className="font-bold text-2xl text-green-600">{planProgress}%</span>
            </div>
            <Progress value={planProgress} className="h-3 bg-green-100" indicatorColor="var(--wellness-bright-green)" />
          </div>
          
          {/* 4-Column Grid with Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <span className="text-3xl font-bold text-green-600">{currentDay.getDate()}</span>
                <p className="text-sm text-gray-600">Days Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <span className="text-3xl font-bold text-green-600">{streak} days</span>
                <p className="text-sm text-gray-600">Current Streak</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <span className="text-3xl font-bold text-green-600">{completedExercises}</span>
                <p className="text-sm text-gray-600">Exercises Done</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <span className="text-3xl font-bold text-green-600">{adherenceRate}%</span>
                <p className="text-sm text-gray-600">Adherence Rate</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Download Button */}
          <Button 
            className="w-full mt-6" 
            onClick={handleDownloadReport}
          >
            <Download className="h-4 w-4 mr-2" /> Download Full Progress Report
          </Button>
        </CardContent>
      </Card>

      {/* Pain Progress Chart Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pain Progress</h3>
            {painReduction > 0 && (
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                {painReduction}% decrease
              </div>
            )}
          </div>
          
          {/* Pain Progress Chart Component */}
          <PainProgressChart painHistory={painHistory} />
          
          {/* Chart Summary */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-sm text-gray-500">Initial Pain</div>
              <div className="font-bold text-lg">{initialPainLevel}/10</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Current Pain</div>
              <div className="font-bold text-lg text-green-600">{currentPainLevel}/10</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Target</div>
              <div className="font-bold text-lg text-blue-600">{targetPainLevel}/10</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Exercise Difficulty Analysis */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Exercise Difficulty Analysis</h3>
          
          {/* Difficulty Analysis Component */}
          <DifficultyAnalysis difficulties={exerciseDifficulties} />
          
          {/* Insight Box */}
          <div className="bg-blue-50 p-4 rounded-lg mt-4 flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Your difficulty ratings show you find mobility exercises most challenging. 
              Consider focusing on these exercises when you have more energy, and do 
              stretching exercises when fatigue is higher.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressSection;
