import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface SleepDistributionCardProps {
  lightSleep: number;
  deepSleep: number;
  remSleep: number;
  awake: number;
  className?: string;
  lightHR?;
  deepHR?;
  remHR?;
  awakeHR?;
}

const SleepDistributionCard = ({
  lightSleep,
  deepSleep,
  remSleep,
  awake,
  className,
  lightHR,
  deepHR,
  remHR,
  awakeHR,
}: SleepDistributionCardProps) => {
  // Calculate total sleep time
  const totalSleep = lightSleep + deepSleep + remSleep + awake;

  // Get corresponding HR value based on stage name
  const hrValues = {
    "Light Sleep": lightHR,
    "Deep Sleep": deepHR,
    "REM Sleep": remHR,
    Awake: awakeHR,
  };

  // Prepare data for the pie chart
  const data = [
    {
      name: "Light Sleep",
      value: lightSleep || 0,
      color: "#FEDF89",
      ideal: 55,
    }, // 50-60%
    { name: "Deep Sleep", value: deepSleep || 0, color: "#53A15E", ideal: 20 }, // 15-25%
    { name: "REM Sleep", value: remSleep || 0, color: "#0EA5E9", ideal: 20 }, // 20-25%
    { name: "Awake", value: awake || 0, color: "#F97316", ideal: 5 }, // <10%
  ];

  // Find the dominant sleep stage (excluding awake time)
  const sleepStages = data.filter((item) => item.name !== "Awake");
  const dominantStage = [...sleepStages].sort((a, b) => b.value - a.value)[0];

  return (
    <Card
      className={`wellness-card border-l-4 border-l-wellness-deep-orange h-full ${className}`}
    >
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg text-wellness-muted-black">
          <PieChart className="h-5 w-5 text-wellness-bright-green" />
          <span>Sleep Stages</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Sleep Stages Breakdown</h4>
                  <p className="text-xs">
                    The chart shows your actual sleep stages compared to ideal
                    amounts:
                  </p>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>
                      <span className="font-medium text-[#FEDF89]">
                        Light Sleep:
                      </span>{" "}
                      50-60% of total sleep time
                    </li>
                    <li>
                      <span className="font-medium text-[#53A15E]">
                        Deep Sleep:
                      </span>{" "}
                      15-25% of total sleep time
                    </li>
                    <li>
                      <span className="font-medium text-[#0EA5E9]">
                        REM Sleep:
                      </span>{" "}
                      20-25% of total sleep time
                    </li>
                    <li>
                      <span className="font-medium text-[#F97316]">
                        Awake Time:
                      </span>{" "}
                      Less than 10% is ideal
                    </li>
                  </ul>
                  <p className="text-xs mt-2">
                    A balanced sleep cycle includes sufficient amounts of each
                    sleep stage for optimal rest and recovery.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-full">
        <div className="h-72 w-full">
          <div className="relative h-full w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value) => {
                    return (
                      <>
                        <span className="text-xs">{value}</span>
                        <p className="text-xs">{hrValues[value]} H</p>
                      </>
                    );
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>

            {/* Center text showing dominant sleep stage - repositioned upwards */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold">
                {(dominantStage?.value || 0)?.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">{dominantStage.name}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepDistributionCard;
