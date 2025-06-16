import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const mockData = [
  { date: "Mon", heart: 72, bp: 120 },
  { date: "Tue", heart: 68, bp: 118 },
  { date: "Wed", heart: 70, bp: 122 },
  { date: "Thu", heart: 71, bp: 119 },
  { date: "Fri", heart: 69, bp: 121 },
];

const VitalsChart = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex gap-2 text-lg font-semibold">
          Vitals Trends{" "}
          <div className="px-2 h-6 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-300 flex items-center justify-center">
  coming soon
</div>

        </CardTitle>
        <Heart className="h-5 w-5 text-red-500" />
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <LineChart data={mockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="heart"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444" }}
            />
            <Line
              type="monotone"
              dataKey="bp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VitalsChart;
