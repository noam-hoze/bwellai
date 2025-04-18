
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Activity, Utensils, ArrowRight } from 'lucide-react';

const IntegratedHealthMetrics = () => {
  return (
    <Card className="bg-white shadow-sm mb-8">
      <CardHeader>
        <CardTitle>Integrated Health Metrics</CardTitle>
        <CardDescription>Your risk score is calculated using data from all sections of your health profile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-medium">Body Metrics</h3>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Blood Pressure</span>
                <span className="font-medium">135/85</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Resting HR</span>
                <span className="font-medium">78 bpm</span>
              </div>
              <div className="flex justify-between">
                <span>Body Mass Index</span>
                <span className="font-medium">27.5</span>
              </div>
            </div>
            <a href="/body-metrics" className="text-xs text-blue-600 flex items-center mt-3">
              View more metrics <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className="font-medium">Activity</h3>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Daily Steps</span>
                <span className="font-medium">7,543</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Active Minutes</span>
                <span className="font-medium">25 min</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Workouts</span>
                <span className="font-medium">3</span>
              </div>
            </div>
            <a href="/activity" className="text-xs text-blue-600 flex items-center mt-3">
              View activity data <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium">Nutrition</h3>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Daily Calories</span>
                <span className="font-medium">2,150</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Protein Intake</span>
                <span className="font-medium">65g</span>
              </div>
              <div className="flex justify-between">
                <span>Nutrition Score</span>
                <span className="font-medium">72/100</span>
              </div>
            </div>
            <a href="/nutrition" className="text-xs text-blue-600 flex items-center mt-3">
              View nutrition data <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                <path d="M6 19v-3a4 4 0 0 1 4-4h1" />
                <path d="M4 9a4.13 4.13 0 0 1 4-4c2.38 0 4.5.89 6.07 2.33" />
                <path d="M12 21a9 9 0 0 0 9-9" />
                <circle cx="9" cy="16" r="1" />
                <path d="M17.32 19a9 9 0 0 0 1.68-1.3" />
                <path d="M3 16C3 8 9 3 15 3c4.8 0 8.5 2.8 9 8" />
              </svg>
              <h3 className="font-medium">Sleep</h3>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Avg. Duration</span>
                <span className="font-medium">6h 45m</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Sleep Quality</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span>Deep Sleep</span>
                <span className="font-medium">1h 12m</span>
              </div>
            </div>
            <a href="/sleep" className="text-xs text-blue-600 flex items-center mt-3">
              View sleep data <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegratedHealthMetrics;
