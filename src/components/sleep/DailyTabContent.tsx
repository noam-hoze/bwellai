import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, UtensilsCrossed, Dumbbell, HeartPulse } from "lucide-react";
import SleepPossibleReasons from "@/components/sleep/SleepPossibleReasons";
import SleepRecommendations from "@/components/sleep/SleepRecommendations";
import { Separator } from "@/components/ui/separator";
import SleepScoreCard from "@/components/sleep/SleepScoreCard";
import SleepDistributionCard from "@/components/sleep/SleepDistributionCard";
import SleepQualityCard from "@/components/sleep/SleepQualityCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { convertUnderscoresToCapitalizeHeading } from "@/utils/utils";

interface DailyTabContentProps {
  selectedDate: Date;
  wearableDailyRecommendationData;
  wearableDailyData;
}

const DailyTabContent = ({
  selectedDate,
  wearableDailyRecommendationData,
  wearableDailyData,
}: DailyTabContentProps) => {
  // Mock data for score cards
  const scoreData = {
    sleepScore: 82,
    bedtime: "11:30 PM",
    wakeup: "7:03 AM",
    totalSleep: "7h 33m",
    wakeupCount: 3,
    totalSleepHours: 7.55, // 7 hours and 33 minutes in decimal
    optimalSleep: 8, // optimal sleep in hours
    lightSleep: 60,
    deepSleep: 16,
    remSleep: 18,
    awake: 6,
  };

  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Sleep Score Cards Section */}
      {isMobile ? (
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <SleepScoreCard
                  score={wearableDailyData?.average}
                  bedtime={
                    wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start?.split(
                      "T"
                    )?.[1]
                  }
                  wakeup={scoreData.wakeup}
                  totalSleep={`${(
                    (wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.total_sleep || 0) / 3600
                  )?.toFixed(1)} H`}
                  wakeupCount={wearableDailyData?.wakeUpTimes}
                />
              </CarouselItem>
              <CarouselItem>
                <SleepDistributionCard
                  lightSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.light /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  deepSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.deep /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  remSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.rem /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  awake={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                />
              </CarouselItem>
              <CarouselItem>
                <SleepQualityCard
                  lightSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.light /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  deepSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.deep /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  remSleep={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.rem /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                  awake={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
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
          <SleepScoreCard
            score={wearableDailyData?.average}
            bedtime={
              wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start?.split(
                "T"
              )?.[1]
            }
            wakeup={scoreData.wakeup}
            totalSleep={`${(
              (wearableDailyData?.finalDailySpikeSleepDataV4?.total_sleep ||
                0) / 3600
            )?.toFixed(1)} H`}
            wakeupCount={wearableDailyData?.wakeUpTimes}
            // wakeupCount={scoreData.wakeupCount}
          />
          <SleepDistributionCard
            lightSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.light /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            deepSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.deep /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            remSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.rem /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            awake={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
          />
          <SleepQualityCard
            lightSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.light /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            deepSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.deep /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            remSleep={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.rem /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
            awake={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
          />
        </div>
      )}

      {/* Combined Insights & Suggestions Card */}
      <Card className="wellness-card border-l-4 border-l-wellness-deep-orange">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-wellness-muted-black">
            <Lightbulb className="h-5 w-5 text-wellness-bright-green" />
            Insights & Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wearableDailyRecommendationData?.[0] && (
              <div className="rounded-lg border bg-white p-4">
                <div className="flex items-start gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-2 flex-shrink-0" />
                  <div>
                    {/* <p className="text-wellness-muted-black font-bold">
                      Actionable Tip
                    </p> */}
                    <p className="text-wellness-muted-black">
                      {Object.entries(
                        wearableDailyRecommendationData?.[0]
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
                    </p>
                  </div>
                </div>
              </div>
            )}

            {wearableDailyRecommendationData?.[1] && (
              <div className="rounded-lg border bg-white p-4">
                <div className="flex items-start gap-2">
                  <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-2 flex-shrink-0" />
                  <div>
                    {/* <p className="text-wellness-muted-black font-bold">
                      Alternative Cause
                    </p> */}
                    <p className="text-wellness-muted-black">
                      {Object.entries(
                        wearableDailyRecommendationData?.[1]
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
                    </p>
                  </div>
                </div>
              </div>
            )}

            {wearableDailyRecommendationData?.[2] && (
              <div className="rounded-lg border bg-white p-4">
                <div className="flex items-start gap-2">
                  <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-2 flex-shrink-0" />
                  <div>
                    {/* <p className="text-wellness-muted-black font-bold">
                      Observation
                    </p> */}
                    <p className="text-wellness-muted-black">
                      {Object.entries(
                        wearableDailyRecommendationData?.[2]
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
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTabContent;
