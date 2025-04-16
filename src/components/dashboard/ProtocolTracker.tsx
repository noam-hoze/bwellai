
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

const ProtocolTracker = () => {
  const protocols = [
    { name: "Daily Exercise", progress: 75, color: "#22c55e" },
    { name: "Meal Tracking", progress: 60, color: "#3b82f6" },
    { name: "Sleep Schedule", progress: 85, color: "#8b5cf6" },
    { name: "Water Intake", progress: 45, color: "#0ea5e9" },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Protocol Tracker</CardTitle>
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {protocols.map((protocol) => (
            <div key={protocol.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{protocol.name}</span>
                <span>{protocol.progress}%</span>
              </div>
              <Progress value={protocol.progress} indicatorColor={protocol.color} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProtocolTracker;
