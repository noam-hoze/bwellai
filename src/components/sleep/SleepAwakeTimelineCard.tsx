
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts";

interface SleepAwakeTimelineCardProps {
  className?: string;
  selectedDate: Date;
}

const SleepAwakeTimelineCard = ({ className, selectedDate }: SleepAwakeTimelineCardProps) => {
  // Mock data - this would normally come from your data source
  // Using numerical values for sleep states: 3 = awake, 2 = light sleep, 1 = deep sleep
  const sleepStageData = [
    { time: "11:30 PM", stage: 3, label: "Awake" },    // Bedtime - Awake
    { time: "11:45 PM", stage: 2.5, label: "Light" },  // Falling asleep
    { time: "12:00 AM", stage: 2, label: "Light" },    // Light sleep
    { time: "12:30 AM", stage: 1.5, label: "Deep" },   // Transitioning to deep sleep
    { time: "01:00 AM", stage: 1, label: "Deep" },     // Deep sleep
    { time: "01:30 AM", stage: 1.2, label: "Deep" },   // Deep sleep
    { time: "02:00 AM", stage: 1.8, label: "Light" },  // Light sleep 
    { time: "02:30 AM", stage: 2.5, label: "Light" },  // Light sleep
    { time: "03:00 AM", stage: 3, label: "Awake" },    // Brief awakening
    { time: "03:15 AM", stage: 2.2, label: "Light" },  // Back to light sleep
    { time: "03:45 AM", stage: 1.3, label: "Deep" },   // Deep sleep again
    { time: "04:15 AM", stage: 1, label: "Deep" },     // Deepest sleep
    { time: "04:45 AM", stage: 1.5, label: "Deep" },   // Starting to come up
    { time: "05:15 AM", stage: 2, label: "Light" },    // Light sleep
    { time: "05:45 AM", stage: 2.5, label: "Light" },  // Light sleep
    { time: "06:15 AM", stage: 1.8, label: "Light" },  // Light sleep
    { time: "06:45 AM", stage: 2.5, label: "Light" },  // Light sleep
    { time: "07:03 AM", stage: 3, label: "Awake", wakeUp: true }  // Wake up time
  ];

  // Custom tooltip to show sleep stage information
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border text-xs">
          <p className="font-medium">{label}</p>
          <p className="capitalize">
            {data.label} Sleep
          </p>
          {data.wakeUp && <p className="text-green-500 font-medium">Wake-up time</p>}
        </div>
      );
    }
    return null;
  };

  // Define custom Y-axis tick labels
  const renderYAxisTick = ({ x, y, payload }: any) => {
    let label = "";
    if (payload.value === 1) label = "Deep Sleep";
    else if (payload.value === 2) label = "Light Sleep";
    else if (payload.value === 3) label = "Awake";
    
    return (
      <text x={x} y={y} dy={3} textAnchor="end" fill="#666" fontSize={10}>
        {label}
      </text>
    );
  };

  return (
    <Card className={`wellness-card border-l-4 border-l-wellness-deep-orange h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-wellness-muted-black">
          <Activity className="h-5 w-5 text-wellness-bright-green" />
          Sleep Stage Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Legend */}
        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
            <span className="text-xs">Sleep Stage</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
            <span className="text-xs">Wake-up Time (7:03 AM)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#E57373]"></div>
            <span className="text-xs">Bedtime (11:30 PM)</span>
          </div>
        </div>
        
        <div className="w-full h-[400px] mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sleepStageData}
              margin={{
                top: 20,
                right: 20,
                left: 40,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                interval={1}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[1, 3]}
                ticks={[1, 2, 3]}
                tick={renderYAxisTick}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Create a gradient fill for the area under the line */}
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.1} />
                  <stop offset="50%" stopColor="#0EA5E9" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#1A1F2C" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              
              {/* Sleep stage area */}
              <Area 
                type="monotone" 
                dataKey="stage" 
                stroke="#0EA5E9" 
                strokeWidth={3}
                fill="url(#sleepGradient)"
                activeDot={{ r: 6, fill: "#0EA5E9" }}
              />
              
              {/* Bedtime indicator */}
              <ReferenceLine 
                x={sleepStageData[0].time} 
                stroke="#E57373" 
                strokeWidth={2} 
                label={{ 
                  value: "Bedtime", 
                  position: "top", 
                  fill: "#E57373",
                  fontSize: 10
                }} 
              />
              
              {/* Wake-up time indicator */}
              {sleepStageData.findIndex(item => item.wakeUp) !== -1 && (
                <ReferenceLine 
                  x={sleepStageData[sleepStageData.findIndex(item => item.wakeUp)].time} 
                  stroke="#53A15E" 
                  strokeWidth={2} 
                  label={{ 
                    value: "Wake", 
                    position: "top", 
                    fill: "#53A15E",
                    fontSize: 10
                  }} 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepAwakeTimelineCard;
