import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const SleepImprovementCard = ({ improve_sleep_recommendation }) => {
  return (
    <Card className="wellness-card border-l-4 border-l-green-400 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-wellness-muted-black">
          <Lightbulb className="h-5 w-5 text-green-500" />3 simple ways to
          improve your sleep
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <ul className="list-disc list-inside space-y-2 pl-1">
            {improve_sleep_recommendation?.map((recommendation: string) => {
              return <li>{recommendation}</li>;
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepImprovementCard;
