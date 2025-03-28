import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Lightbulb } from "lucide-react";
import SleepChart from "@/components/sleep/SleepChart";
import SleepSummary from "@/components/sleep/SleepSummary";
import SleepRecommendations from "@/components/sleep/SleepRecommendations";
import SleepDistributionCard from "@/components/sleep/SleepDistributionCard";
import SleepQualityCard from "@/components/sleep/SleepQualityCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useIsMobile } from "@/hooks/use-mobile";
import { calculatedSleepPercentage } from "@/utils/utils";

interface MonthlyTabContentProps {
  selectedDate: Date;
  wearableMonthlyData;
  wearableMonthlyRecommendationData;
  getProfileIsData;
}

const MonthlyTabContent = ({
  selectedDate,
  wearableMonthlyData,
  wearableMonthlyRecommendationData,
  getProfileIsData,
}: MonthlyTabContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Sleep Score Cards Section */}
      {isMobile ? (
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <Card className="wellness-card border-l-4 border-l-green-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      Monthly Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SleepSummary
                      date={selectedDate}
                      viewType="month"
                      wearableWeeklyData={wearableMonthlyData}
                      score={wearableMonthlyData?.monthlySleepEfficiency}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <SleepDistributionCard
                  lightSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageLightSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageDeepSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageRemSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "rem",
                  })}
                  awake={
                    (Number(
                      wearableMonthlyData?.monthlyAverageWakeUp?.replace(
                        ":",
                        "."
                      )
                    ) /
                      Number(
                        wearableMonthlyData?.monthlyAverageSleep?.replace(
                          ":",
                          "."
                        )
                      )) *
                    100
                  }
                  className="border-l-green-400"
                />
              </CarouselItem>
              <CarouselItem>
                <SleepQualityCard
                  lightSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageLightSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageDeepSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableMonthlyData?.monthlyAverageSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableMonthlyData?.monthlyAverageRemSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "rem",
                  })}
                  awake={
                    (Number(
                      wearableMonthlyData?.monthlyAverageWakeUp?.replace(
                        ":",
                        "."
                      )
                    ) /
                      Number(
                        wearableMonthlyData?.monthlyAverageSleep?.replace(
                          ":",
                          "."
                        )
                      )) *
                    100
                  }
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="wellness-card border-l-4 border-l-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Monthly Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SleepSummary
                date={selectedDate}
                viewType="month"
                wearableWeeklyData={wearableMonthlyData}
                score={wearableMonthlyData?.monthlySleepEfficiency}
              />
            </CardContent>
          </Card>

          <SleepDistributionCard
            lightSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageLightSleep?.replace(":", ".")
              ),
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageDeepSleep?.replace(":", ".")
              ),
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageRemSleep?.replace(":", ".")
              ),
              sleepType: "rem",
            })}
            awake={
              (Number(
                wearableMonthlyData?.monthlyAverageWakeUp?.replace(":", ".")
              ) /
                Number(
                  wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
                )) *
              100
            }
            className="border-l-green-400"
          />

          <SleepQualityCard
            lightSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageLightSleep?.replace(":", ".")
              ),
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageDeepSleep?.replace(":", ".")
              ),
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableMonthlyData?.monthlyAverageRemSleep?.replace(":", ".")
              ),
              sleepType: "rem",
            })}
            awake={
              (Number(
                wearableMonthlyData?.monthlyAverageWakeUp?.replace(":", ".")
              ) /
                Number(
                  wearableMonthlyData?.monthlyAverageSleep?.replace(":", ".")
                )) *
              100
            }
          />
        </div>
      )}

      <Card className="wellness-card border-l-4 border-l-green-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-green-500" />
            Insights & Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepRecommendations
            date={selectedDate}
            viewType="month"
            wearableWeeklyRecommendationData={wearableMonthlyRecommendationData}
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 wellness-card border-l-4 border-l-green-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Monthly Sleep Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepChart
            date={selectedDate}
            viewType="month"
            apiData={wearableMonthlyData?.weeklySleepDataV4List}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyTabContent;
