import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Moon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const mockData = [
  { date: "Mon", quality: 85 },
  { date: "Tue", quality: 75 },
  { date: "Wed", quality: 90 },
  { date: "Thu", quality: 80 },
  { date: "Fri", quality: 85 },
];

const SleepQualityChart = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex gap-2 text-lg font-semibold">
          Sleep Quality{" "}
          <div className="px-2 h-6 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-300 flex items-center justify-center">
  coming soon
</div>

        </CardTitle>
        <Moon className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <AreaChart data={mockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="quality"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SleepQualityChart;
