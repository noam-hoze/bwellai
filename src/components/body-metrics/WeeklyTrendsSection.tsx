
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Activity, Heart, Zap } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import WeeklyInsightsBox from "./WeeklyInsightsBox";

const WeeklyTrendsSection = () => {
  // Mock data for weekly trends
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const weeklyData = days.map((day, index) => ({
    day,
    // Generate somewhat realistic data with some variations
    heartRate: Math.floor(65 + Math.sin(index) * 10 + Math.random() * 5),
    systolic: Math.floor(115 + Math.sin(index) * 7 + Math.random() * 5),
    diastolic: Math.floor(75 + Math.sin(index) * 5 + Math.random() * 3),
    steps: Math.floor(7000 + Math.sin(index * 0.5) * 2000 + Math.random() * 1000),
    stress: Math.floor(50 + Math.sin(index * 0.7) * 15 + Math.random() * 10),
  }));

  const config = {
    heartRate: {
      label: "Heart Rate",
      theme: {
        light: "#ef4444",
        dark: "#b91c1c",
      },
    },
    systolic: {
      label: "Systolic BP",
      theme: {
        light: "#3b82f6",
        dark: "#1d4ed8",
      },
    },
    diastolic: {
      label: "Diastolic BP",
      theme: {
        light: "#0ea5e9",
        dark: "#0369a1",
      },
    },
    steps: {
      label: "Steps",
      theme: {
        light: "#22c55e",
        dark: "#15803d",
      },
    },
    stress: {
      label: "Stress",
      theme: {
        light: "#f59e0b",
        dark: "#d97706",
      },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb] lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LineChart className="h-5 w-5 text-blue-500" />
              Weekly Health Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%">
                  <RLineChart data={weeklyData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      domain={[40, 140]}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'bpm / mmHg', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 12000]}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'steps', angle: -90, position: 'insideRight', offset: 15, fontSize: 12 }}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend align="center" verticalAlign="top" height={36} />
                    
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="var(--color-heartRate)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="systolic" 
                      stroke="var(--color-systolic)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="diastolic" 
                      stroke="var(--color-diastolic)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="steps" 
                      stroke="var(--color-steps)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      dot={{ r: 3 }}
                    />
                  </RLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-amber-500" />
              Stress Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%">
                  <RLineChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Stress Level', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="var(--color-stress)"
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      dot={{ r: 4 }}
                    />
                  </RLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4 text-sm">
              <div className="flex justify-between mb-2">
                <span>Weekly Average:</span>
                <span className="font-medium">
                  {Math.round(weeklyData.reduce((acc, day) => acc + day.stress, 0) / weeklyData.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-amber-600">Moderate</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <WeeklyInsightsBox 
        heartRateTrend={3}
        bloodPressureTrend={-2}
        stepsTrend={8}
        stressTrend={-5}
      />
    </div>
  );
};

export default WeeklyTrendsSection;
