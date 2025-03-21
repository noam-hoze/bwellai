import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, HelpCircle } from "lucide-react";
import SleepPieChart from "./SleepPieChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SleepQualityCardProps {
  lightSleep: number;
  deepSleep: number;
  remSleep: number;
  awake: number;
}

const SleepQualityCard = ({
  lightSleep,
  deepSleep,
  remSleep,
  awake,
}: SleepQualityCardProps) => {
  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange h-full bg-white rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
          <Moon className="h-5 w-5 text-blue-500" />
          <span>Sleep Quality</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Ideal Sleep Targets</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>
                      <span className="font-medium text-[#FEDF89]">
                        Light Sleep Ideal:
                      </span>{" "}
                      50-60% → 252 min is optimal (100%)
                    </li>
                    <li>
                      <span className="font-medium text-[#53A15E]">
                        Deep Sleep Ideal:
                      </span>{" "}
                      15-25% → 84 min is at the lower range (~80%)
                    </li>
                    <li>
                      <span className="font-medium text-[#0EA5E9]">
                        REM Sleep Ideal:
                      </span>{" "}
                      20-25% → 84 min is within the range (~95%)
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
        <SleepPieChart
          lightSleep={lightSleep || 0}
          deepSleep={deepSleep || 0}
          remSleep={remSleep || 0}
          awake={awake || 0}
        />
      </CardContent>
    </Card>
  );
};

export default SleepQualityCard;
