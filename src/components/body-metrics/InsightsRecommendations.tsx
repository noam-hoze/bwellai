
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Droplets, Activity, Moon } from "lucide-react";

const InsightsRecommendations = () => {
  // Mock data for insights and recommendations
  const insights = [
    {
      id: 1,
      icon: <Heart className="h-5 w-5 text-red-500" />,
      title: "Heart Health",
      insight: "Your heart rate variability has improved by 12% this week.",
      recommendation: "Continue with your current cardiovascular exercise routine of 30 minutes, 3-4 times per week."
    },
    {
      id: 2,
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      title: "Hydration",
      insight: "Your blood pressure has been stable. Good hydration may be contributing to this.",
      recommendation: "Maintain your current water intake of approximately 2-3 liters per day."
    },
    {
      id: 3,
      icon: <Activity className="h-5 w-5 text-green-500" />,
      title: "Activity",
      insight: "You've reached your step goal 5 out of 7 days this week.",
      recommendation: "Try to incorporate a short 10-minute walk after lunch to consistently hit your daily goal."
    },
    {
      id: 4,
      icon: <Moon className="h-5 w-5 text-purple-500" />,
      title: "Sleep",
      insight: "Your sleep quality has dropped compared to last week. Sleep duration is down by 45 minutes on average.",
      recommendation: "Consider implementing a consistent bedtime routine and avoiding screens 1 hour before bed."
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-6 w-6 text-indigo-500" />
        <h2 className="text-xl font-bold">AI Insights & Recommendations</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item) => (
          <Card key={item.id} className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                {item.icon}
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Insight</h4>
                  <p>{item.insight}</p>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Recommendation</h4>
                  <p>{item.recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

import { Heart } from "lucide-react";
export default InsightsRecommendations;
