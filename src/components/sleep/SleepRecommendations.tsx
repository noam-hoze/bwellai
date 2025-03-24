import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  HeartPulse,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { convertUnderscoresToCapitalizeHeading } from "@/utils/utils";

interface SleepRecommendationsProps {
  date: Date;
  viewType: "day" | "week" | "month";
  wearableWeeklyRecommendationData;
}

const SleepRecommendations: React.FC<SleepRecommendationsProps> = ({
  date,
  viewType,
  wearableWeeklyRecommendationData,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  // Mock data for recommendations
  const getRecommendations = () => {
    if (viewType === "day") {
      return [
        {
          icon: (
            <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Late Meal Logged at 11:00 PM",
          description:
            "Eating late can disrupt sleep. Try finishing meals earlier for better rest.",
        },
        {
          icon: (
            <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Low Activity Today",
          description:
            "Less movement = lighter sleep. Even a 10-min walk tomorrow can help.",
        },
        {
          icon: (
            <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "High Stress Today",
          description:
            "Try deep breathing or a short wind-down routine before bed.",
        },
      ];
    } else if (viewType === "week") {
      return [
        {
          icon: (
            <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Inconsistent Bedtimes",
          description:
            "Your weekly sleep data shows inconsistent bedtimes, ranging over 28 minutes. Try to maintain a more regular sleep schedule.",
        },
        {
          icon: (
            <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Low Deep Sleep Percentage",
          description:
            "Your deep sleep percentage is slightly below the recommended range. Consider exercise earlier in the day to potentially improve deep sleep quality.",
        },
        {
          icon: (
            <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Good REM Sleep",
          description:
            "Your REM sleep is within healthy ranges, which is good for cognitive function and emotional regulation.",
        },
      ];
    } else {
      return [
        {
          icon: (
            <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Sleep Debt Pattern",
          description:
            "This month shows a pattern of shorter sleep duration on weekdays and catching up on weekends. This creates a 'sleep debt' pattern that isn't ideal for long-term health.",
        },
        {
          icon: (
            <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Consistency Needs Improvement",
          description:
            "Your sleep consistency score of 76% indicates room for improvement in maintaining regular sleep-wake schedules.",
        },
        {
          icon: (
            <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
          ),
          title: "Weekend Wake-up Adjustment",
          description:
            "Consider setting a consistent wake-up time, even on weekends, to regulate your circadian rhythm.",
        },
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* {wearableWeeklyRecommendationData &&
          Object.entries(wearableWeeklyRecommendationData)
            ?.slice(0, expanded ? recommendations.length : 2) // Show all if expanded, otherwise only 2
            ?.map((rec: any, index) => (
              <div key={index} className="rounded-lg border bg-white p-4">
                <div className="flex items-start gap-2">
                  {rec?.icon}
                  <div>
                    <p className="text-wellness-muted-black font-bold">
                      {rec?.title}
                    </p>
                    {rec?.descriptions?.map((desc, i) => (
                      <p key={i} className="text-wellness-muted-black">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))} */}
        <div className="space-y-3">
          {recommendations
            .slice(0, expanded ? recommendations.length : 1)
            .map((rec, index) => (
              <div key={index} className="rounded-lg border bg-white p-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1">{rec.icon}</div>
                  <div>
                    {/* <p className="text-wellness-muted-black font-bold">
                      {rec.title}
                    </p> */}
                    {/* <p className="text-wellness-muted-black">
                      {rec.description}
                    </p> */}
                    {wearableWeeklyRecommendationData?.[index] &&
                      Object.entries(
                        wearableWeeklyRecommendationData?.[index]
                      )?.map(([key, descriptions], index) => {
                        return (
                          <div key={index}>
                            <p className="text-wellness-muted-black font-bold mt-2">
                              {convertUnderscoresToCapitalizeHeading(key)}
                            </p>
                            {Array.isArray(descriptions) &&
                              descriptions?.map((desc, i) => (
                                <p
                                  key={i}
                                  className="text-wellness-muted-black"
                                >
                                  {desc}
                                </p>
                              ))}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {recommendations.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center gap-1 mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : `Show All (${recommendations.length})`}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </Button>
      )}

      {viewType === "day" && (
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full mt-4"
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          Want to Improve
        </Button>
      )}
    </div>
  );
};

export default SleepRecommendations;
