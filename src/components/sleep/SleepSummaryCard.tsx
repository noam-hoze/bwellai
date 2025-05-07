import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed } from "lucide-react";

const SleepSummaryCard = ({ sleep_summary }) => {
  return (
    <Card className="wellness-card border-l-4 border-l-red-400 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-wellness-muted-black">
          <Bed className="h-5 w-5 text-red-500" />
          Sleep Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-wellness-muted-black">{sleep_summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepSummaryCard;
