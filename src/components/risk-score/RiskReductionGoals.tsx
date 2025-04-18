
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const RiskReductionGoals = () => {
  return (
    <Card className="bg-white shadow-sm mb-8">
      <CardHeader>
        <CardTitle>Risk Reduction Goals</CardTitle>
        <CardDescription>Track your progress toward your health targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium">Blood Pressure</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Current:</span>
                <span className="font-bold">135/85</span>
                <span className="text-sm text-gray-600">Target:</span>
                <span className="font-medium text-green-600">120/80</span>
              </div>
            </div>
            <Progress 
              className="h-2"
              value={60}
              indicatorColor="#ef4444"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Goal: Reduce by 15/5 mmHg</span>
              <span>60% to target</span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="font-medium">BMI</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Current:</span>
                <span className="font-bold">27.5</span>
                <span className="text-sm text-gray-600">Target:</span>
                <span className="font-medium text-green-600">24.9</span>
              </div>
            </div>
            <Progress 
              className="h-2"
              value={35}
              indicatorColor="#f59e0b"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Goal: Reduce by 2.6 points</span>
              <span>35% to target</span>
            </div>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Physical Activity</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Current:</span>
                <span className="font-bold">25 min/day</span>
                <span className="text-sm text-gray-600">Target:</span>
                <span className="font-medium text-green-600">30+ min/day</span>
              </div>
            </div>
            <Progress 
              className="h-2"
              value={85}
              indicatorColor="#22c55e"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Goal: Increase by 5+ min/day</span>
              <span>85% to target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReductionGoals;
