
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyInsightsBoxProps {
  heartRateTrend: number;
  bloodPressureTrend: number;
  stepsTrend: number;
  stressTrend: number;
}

const WeeklyInsightsBox = ({ 
  heartRateTrend, 
  bloodPressureTrend, 
  stepsTrend, 
  stressTrend 
}: WeeklyInsightsBoxProps) => {
  const insights = [
    {
      id: 1,
      metric: "Heart Rate",
      trend: heartRateTrend,
      message: `Your average resting heart rate ${heartRateTrend > 0 ? 'increased' : 'decreased'} by ${Math.abs(heartRateTrend)} bpm this week.`,
      color: heartRateTrend > 0 ? "text-red-500" : "text-green-500",
      analysis: heartRateTrend > 0 
        ? "This could indicate increased stress or reduced recovery." 
        : "This suggests improved cardiovascular fitness or better recovery."
    },
    {
      id: 2,
      metric: "Blood Pressure",
      trend: bloodPressureTrend,
      message: `Your average blood pressure ${bloodPressureTrend > 0 ? 'increased' : 'decreased'} by ${Math.abs(bloodPressureTrend)} mmHg this week.`,
      color: bloodPressureTrend > 0 ? "text-red-500" : "text-green-500",
      analysis: bloodPressureTrend > 0 
        ? "Monitor your salt intake and stress levels." 
        : "Your blood pressure is improving, keep up the healthy habits."
    },
    {
      id: 3,
      metric: "Activity",
      trend: stepsTrend,
      message: `Your daily steps ${stepsTrend > 0 ? 'increased' : 'decreased'} by ${Math.abs(stepsTrend)}% this week.`,
      color: stepsTrend > 0 ? "text-green-500" : "text-red-500",
      analysis: stepsTrend > 0 
        ? "Great job increasing your activity level!" 
        : "Try to incorporate more walking into your daily routine."
    },
    {
      id: 4,
      metric: "Stress",
      trend: stressTrend,
      message: `Your stress level ${stressTrend > 0 ? 'increased' : 'decreased'} by ${Math.abs(stressTrend)}% this week.`,
      color: stressTrend > 0 ? "text-red-500" : "text-green-500",
      analysis: stressTrend > 0 
        ? "Consider stress reduction techniques like meditation." 
        : "Your stress management techniques appear to be working well."
    }
  ];

  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Weekly Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{insight.metric}</h4>
                <div className={cn("flex items-center", insight.color)}>
                  {insight.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{insight.trend > 0 ? `+${insight.trend}` : insight.trend}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{insight.message}</p>
              <p className="text-sm">{insight.analysis}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyInsightsBox;
