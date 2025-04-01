import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, BrainCircuit, Lightbulb } from "lucide-react";
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

interface WeeklyTabContentProps {
  selectedDate: Date;
  wearableWeeklyRecommendationData;
  wearableWeeklyData;
  getProfileIsData;
}

const WeeklyTabContent = ({
  selectedDate,
  wearableWeeklyRecommendationData,
  wearableWeeklyData,
  getProfileIsData,
}: WeeklyTabContentProps) => {
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
                      <BarChart className="h-5 w-5 text-blue-500" />
                      Weekly Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SleepSummary
                      date={selectedDate}
                      viewType="week"
                      wearableWeeklyData={wearableWeeklyData}
                      score={wearableWeeklyData?.weeklySleepEfficiency}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <SleepDistributionCard
                  lightHR={wearableWeeklyData?.weeklyAverageLightSleep}
                  deepHR={wearableWeeklyData?.weeklyAverageDeepSleep}
                  remHR={wearableWeeklyData?.weeklyAverageRemSleep}
                  awakeHR={wearableWeeklyData?.weeklyAverageAwake}
                  lightSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageLightSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageDeepSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageRemSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "rem",
                  })}
                  awake={
                    (Number(
                      wearableWeeklyData?.weeklyAverageAwake?.replace(":", ".")
                    ) /
                      Number(
                        wearableWeeklyData?.weeklyAverageSleep?.replace(
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
                  lightHR={wearableWeeklyData?.weeklyAverageLightSleep}
                  deepHR={wearableWeeklyData?.weeklyAverageDeepSleep}
                  remHR={wearableWeeklyData?.weeklyAverageRemSleep}
                  awakeHR={wearableWeeklyData?.weeklyAverageAwake}
                  lightSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageLightSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageDeepSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep: Number(
                      wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                    ),
                    age: getProfileIsData?.age,
                    actualSleepHr: Number(
                      wearableWeeklyData?.weeklyAverageRemSleep?.replace(
                        ":",
                        "."
                      )
                    ),
                    sleepType: "rem",
                  })}
                  awake={
                    (Number(
                      wearableWeeklyData?.weeklyAverageAwake?.replace(":", ".")
                    ) /
                      Number(
                        wearableWeeklyData?.weeklyAverageSleep?.replace(
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
                <BarChart className="h-5 w-5 text-green-500" />
                Weakly Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SleepSummary
                date={selectedDate}
                viewType="week"
                wearableWeeklyData={wearableWeeklyData}
                score={wearableWeeklyData?.weeklySleepEfficiency}
              />
            </CardContent>
          </Card>

          <SleepDistributionCard
            lightHR={wearableWeeklyData?.weeklyAverageLightSleep}
            deepHR={wearableWeeklyData?.weeklyAverageDeepSleep}
            remHR={wearableWeeklyData?.weeklyAverageRemSleep}
            awakeHR={wearableWeeklyData?.weeklyAverageAwake}
            lightSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageLightSleep?.replace(":", ".")
              ),
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageDeepSleep?.replace(":", ".")
              ),
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageRemSleep?.replace(":", ".")
              ),
              sleepType: "rem",
            })}
            awake={
              (Number(
                wearableWeeklyData?.weeklyAverageAwake?.replace(":", ".")
              ) /
                Number(
                  wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                )) *
              100
            }
            className="border-l-green-400"
          />

          <SleepQualityCard
            lightHR={wearableWeeklyData?.weeklyAverageLightSleep}
            deepHR={wearableWeeklyData?.weeklyAverageDeepSleep}
            remHR={wearableWeeklyData?.weeklyAverageRemSleep}
            awakeHR={wearableWeeklyData?.weeklyAverageAwake}
            lightSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageLightSleep?.replace(":", ".")
              ),
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageDeepSleep?.replace(":", ".")
              ),
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep: Number(
                wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
              ),
              age: getProfileIsData?.age,
              actualSleepHr: Number(
                wearableWeeklyData?.weeklyAverageRemSleep?.replace(":", ".")
              ),
              sleepType: "rem",
            })}
            awake={
              (Number(
                wearableWeeklyData?.weeklyAverageAwake?.replace(":", ".")
              ) /
                Number(
                  wearableWeeklyData?.weeklyAverageSleep?.replace(":", ".")
                )) *
              100
            }
          />
        </div>
      )}

      <Card className="wellness-card border-l-4 border-l-blue-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Insights & Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {wearableWeeklyRecommendationData && (
            <SleepRecommendations
              date={selectedDate}
              viewType="week"
              wearableWeeklyRecommendationData={
                wearableWeeklyRecommendationData
              }
            />
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 wellness-card border-l-4 border-l-blue-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <LineChart className="h-5 w-5 text-blue-500" />
            Weekly Sleep Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepChart
            date={selectedDate}
            viewType="week"
            apiData={wearableWeeklyData?.finalSpikeWeeklySleepDataV4s}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyTabContent;
