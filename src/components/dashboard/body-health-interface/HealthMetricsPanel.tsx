
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AlertCircle } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SystemMetric {
  name: string;
  value: number | string;
  unit: string;
  normal: string;
  status: "good" | "caution" | "warning";
}

interface SystemData {
  metrics: SystemMetric[];
  recommendations: string[];
  trendData: { date: string; value: number }[];
}

type SystemDataMap = {
  [key: string]: SystemData;
};

// Mock data - in a real application, this would come from an API
const systemsData: SystemDataMap = {
  cardiovascular: {
    metrics: [
      { name: "Resting Heart Rate", value: 68, unit: "bpm", normal: "60-100", status: "good" },
      { name: "Blood Pressure", value: "118/78", unit: "mmHg", normal: "<120/80", status: "good" },
      { name: "Oxygen Saturation", value: 98, unit: "%", normal: "95-100", status: "good" },
    ],
    recommendations: [
      "Continue your regular cardiovascular exercise routine",
      "Maintain your balanced diet rich in omega-3 fatty acids",
      "Consider meditation to further improve heart rate variability"
    ],
    trendData: [
      { date: "Mon", value: 65 },
      { date: "Tue", value: 67 },
      { date: "Wed", value: 64 },
      { date: "Thu", value: 66 },
      { date: "Fri", value: 68 },
      { date: "Sat", value: 65 },
      { date: "Sun", value: 67 }
    ]
  },
  respiratory: {
    metrics: [
      { name: "Respiratory Rate", value: 14, unit: "breaths/min", normal: "12-16", status: "good" },
      { name: "Lung Capacity", value: 4.2, unit: "L", normal: "4.0-6.0", status: "good" },
      { name: "Oxygen Uptake", value: 92, unit: "%", normal: ">90", status: "good" },
    ],
    recommendations: [
      "Consider adding breathing exercises to your daily routine",
      "Maintain good air quality in your home environment",
      "Your allergies may be affecting respiratory function"
    ],
    trendData: [
      { date: "Mon", value: 14 },
      { date: "Tue", value: 15 },
      { date: "Wed", value: 13 },
      { date: "Thu", value: 14 },
      { date: "Fri", value: 14 },
      { date: "Sat", value: 15 },
      { date: "Sun", value: 14 }
    ]
  },
  muscular: {
    metrics: [
      { name: "Muscle Strength", value: 82, unit: "%", normal: ">75", status: "good" },
      { name: "Recovery Rate", value: 85, unit: "%", normal: ">80", status: "good" },
      { name: "Muscle Balance", value: 72, unit: "%", normal: ">85", status: "caution" },
    ],
    recommendations: [
      "Focus on exercises that improve your left/right balance",
      "Your protein intake is sufficient for muscle recovery",
      "Consider adding more stretching to your routine"
    ],
    trendData: [
      { date: "Mon", value: 80 },
      { date: "Tue", value: 81 },
      { date: "Wed", value: 82 },
      { date: "Thu", value: 81 },
      { date: "Fri", value: 82 },
      { date: "Sat", value: 80 },
      { date: "Sun", value: 82 }
    ]
  },
  nervous: {
    metrics: [
      { name: "Stress Level", value: 32, unit: "%", normal: "<30", status: "caution" },
      { name: "Reaction Time", value: 215, unit: "ms", normal: "<250", status: "good" },
      { name: "Sleep Quality", value: 88, unit: "%", normal: ">85", status: "good" },
    ],
    recommendations: [
      "Your stress levels are slightly elevated, consider mindfulness",
      "Your sleep routine is contributing to good cognitive function",
      "Continue limiting screen time before bed"
    ],
    trendData: [
      { date: "Mon", value: 35 },
      { date: "Tue", value: 33 },
      { date: "Wed", value: 34 },
      { date: "Thu", value: 32 },
      { date: "Fri", value: 32 },
      { date: "Sat", value: 28 },
      { date: "Sun", value: 32 }
    ]
  },
  hydration: {
    metrics: [
      { name: "Hydration Level", value: 85, unit: "%", normal: ">85", status: "good" },
      { name: "Daily Water Intake", value: 1.8, unit: "L", normal: "2.0-3.0", status: "caution" },
      { name: "Electrolyte Balance", value: 92, unit: "%", normal: ">90", status: "good" },
    ],
    recommendations: [
      "Try to increase your water intake by 500ml daily",
      "Your electrolyte balance is optimal",
      "Consider tracking water consumption with reminders"
    ],
    trendData: [
      { date: "Mon", value: 82 },
      { date: "Tue", value: 84 },
      { date: "Wed", value: 83 },
      { date: "Thu", value: 85 },
      { date: "Fri", value: 85 },
      { date: "Sat", value: 87 },
      { date: "Sun", value: 85 }
    ]
  }
};

interface HealthMetricsPanelProps {
  system: {
    id: string;
    name: string;
    color: string;
  };
}

const HealthMetricsPanel: React.FC<HealthMetricsPanelProps> = ({ system }) => {
  const systemData = systemsData[system.id];
  
  if (!systemData) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center py-8 text-gray-500">
            No data available for this system
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { metrics, recommendations, trendData } = systemData;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardContent className="p-4">
          <h4 className="text-lg font-medium mb-3 flex items-center">
            <span style={{ color: system.color }}>{system.name}</span>
            <span className="text-gray-500 ml-2 text-sm">Metrics</span>
          </h4>
          
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{metric.name}</span>
                  <span 
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      metric.status === "good" ? "bg-green-100 text-green-800" :
                      metric.status === "caution" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}
                  >
                    {metric.status === "good" ? "Good" : 
                     metric.status === "caution" ? "Caution" : "Warning"}
                  </span>
                </div>
                
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-gray-500 text-sm">{metric.unit}</span>
                </div>
                
                <div className="mt-1 text-xs text-gray-500">
                  Normal range: {metric.normal}
                </div>
              </div>
            ))}
          </div>
          
          {/* 7-Day Trend Visualization - Increased height from h-40 to h-56 */}
          <div className="mt-6 mb-6">
            <h5 className="text-sm font-medium mb-2">7-Day Trend: {metrics[0].name}</h5>
            <div className="h-56">
              <ChartContainer config={{ primary: { color: system.color } }}>
                <AreaChart 
                  data={trendData} 
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id={`${system.id}-gradient`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={system.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={system.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    domain={['dataMin - 5', 'dataMax + 5']} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    width={25}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={system.color} 
                    fillOpacity={1}
                    fill={`url(#${system.id}-gradient)`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      <Card>
        <CardContent className="p-4">
          <h4 className="text-lg font-medium mb-3">Recommendations</h4>
          
          <div className="space-y-3">
            {metrics.some(m => m.status === "caution" || m.status === "warning") && (
              <Alert variant="destructive" className="bg-yellow-50 border-yellow-100 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Attention needed</AlertTitle>
                <AlertDescription>
                  Some metrics for your {system.name.toLowerCase()} system need attention.
                </AlertDescription>
              </Alert>
            )}
            
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <div 
                  className="rounded-full p-1 mr-3 mt-0.5" 
                  style={{ backgroundColor: `${system.color}20` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: system.color }}></div>
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsPanel;
