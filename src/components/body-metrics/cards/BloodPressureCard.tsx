
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Clock } from "lucide-react";
import { ResponsiveContainer, LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface BloodPressureCardProps {
  systolic: number;
  diastolic: number;
  lastReading: string;
}

const BloodPressureCard = ({ systolic, diastolic, lastReading }: BloodPressureCardProps) => {
  // Mock data for the blood pressure chart
  const chartData = [
    { time: '6am', systolic: 118, diastolic: 78 },
    { time: '9am', systolic: 120, diastolic: 80 },
    { time: '12pm', systolic: 125, diastolic: 82 },
    { time: '3pm', systolic: 123, diastolic: 81 },
    { time: '6pm', systolic: 120, diastolic: 80 },
    { time: '9pm', systolic: 116, diastolic: 76 },
  ];

  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <LineChart className="h-5 w-5 text-blue-500" />
          Blood Pressure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold">{systolic}/{diastolic}</span>
              <span className="text-sm ml-1">mmHg</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last reading: {lastReading}</span>
            </div>
          </div>
          
          <div className="h-36 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[60, 140]} 
                  tick={{ fontSize: 10 }} 
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #f0f0f0'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              </RLineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex text-xs justify-between mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
              <span>Systolic</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              <span>Diastolic</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodPressureCard;
