import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, BrainCircuit, Lightbulb } from "lucide-react";
import SleepChart from "@/components/sleep/SleepChart";
import SleepSummary from "@/components/sleep/SleepSummary";
import SleepRecommendations from "@/components/sleep/SleepRecommendations";

interface WeeklyTabContentProps {
  selectedDate: Date;
  wearableWeeklyRecommendationData;
  wearableWeeklyData;
}

const WeeklyTabContent = ({
  selectedDate,
  wearableWeeklyRecommendationData,
  wearableWeeklyData,
}: WeeklyTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="wellness-card border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart className="h-5 w-5 text-blue-500" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SleepSummary
              date={selectedDate}
              viewType="week"
              wearableWeeklyData={wearableWeeklyData}
            />
          </CardContent>
        </Card>

        <Card className="wellness-card border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              Insights & Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SleepRecommendations
              date={selectedDate}
              viewType="week"
              wearableWeeklyRecommendationData={
                wearableWeeklyRecommendationData
              }
            />
          </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-3 wellness-card border-l-4 border-l-blue-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <LineChart className="h-5 w-5 text-blue-500" />
            Weekly Sleep Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepChart date={selectedDate} viewType="week" />
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyTabContent;
