import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NextActions = () => {
  const actions = [
    {
      title: "Schedule Health Check",
      description: "Book your quarterly health assessment",
      priority: "high",
    },
    {
      title: "Update Exercise Log",
      description: "Log your weekly activity progress",
      priority: "medium",
    },
    {
      title: "Review Meal Plan",
      description: "Check and adjust your nutrition goals",
      priority: "medium",
    },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex gap-2 text-xl font-semibold">
          Next Actions{" "}
          <div className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full flex items-center">
            coming soon
          </div>
        </CardTitle>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <div className="space-y-1">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextActions;
