
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ListChecks, AlertCircle } from "lucide-react";
import ActivityChart from "@/components/activity/ActivityChart";
import ActivitySummary from "@/components/activity/ActivitySummary";
import ActivityRecommendations from "@/components/activity/ActivityRecommendations";

interface WeeklyTabContentProps {
  selectedDate: Date;
}

const WeeklyTabContent = ({ selectedDate }: WeeklyTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="wellness-card border-l-4 border-l-blue-400 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListChecks className="h-5 w-5 text-blue-500" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivitySummary date={selectedDate} viewType="week" />
          </CardContent>
        </Card>
        
        <Card className="wellness-card border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Weekly Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityRecommendations date={selectedDate} viewType="week" />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 wellness-card border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-blue-500" />
              Weekly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart date={selectedDate} viewType="week" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyTabContent;
