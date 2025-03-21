import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Lightbulb } from "lucide-react";
import SleepChart from "@/components/sleep/SleepChart";
import SleepSummary from "@/components/sleep/SleepSummary";
import SleepRecommendations from "@/components/sleep/SleepRecommendations";

interface MonthlyTabContentProps {
  selectedDate: Date;
  wearableMonthlyData;
}

const MonthlyTabContent = ({
  selectedDate,
  wearableMonthlyData,
}: MonthlyTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="wellness-card border-l-4 border-l-green-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Monthly Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SleepSummary
              date={selectedDate}
              viewType="month"
              wearableWeeklyData={wearableMonthlyData}
            />
          </CardContent>
        </Card>

        <Card className="wellness-card border-l-4 border-l-green-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-green-500" />
              Insights & Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SleepRecommendations
              date={selectedDate}
              viewType="month"
              wearableWeeklyRecommendationData={[]}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-3 wellness-card border-l-4 border-l-green-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Monthly Sleep Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepChart
            date={selectedDate}
            viewType="month"
            apiData={
              wearableMonthlyData?.weeklySleepDataV4List?.[0]
                ?.finalSpikeWeeklySleepDataV4s
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyTabContent;
