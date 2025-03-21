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
                  score={scoreData.sleepScore}
                  bedtime={scoreData.bedtime}
                  wakeup={scoreData.wakeup}
                  totalSleep={scoreData.totalSleep}
                  wakeupCount={scoreData.wakeupCount}
                />
              </CarouselItem>
              <CarouselItem>
                <SleepDistributionCard
                  lightSleep={scoreData.lightSleep}
                  deepSleep={scoreData.deepSleep}
                  remSleep={scoreData.remSleep}
                  awake={scoreData.awake}
                />
              </CarouselItem>
              <CarouselItem>
                <SleepQualityCard
                  lightSleep={scoreData.lightSleep}
                  deepSleep={scoreData.deepSleep}
                  remSleep={scoreData.remSleep}
                  awake={scoreData.awake}
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
            lightSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.light}
            deepSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.deep}
            remSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.rem}
            awake={wearableDailyData?.finalDailySpikeSleepDataV4?.awake}
          />
          <SleepQualityCard
            lightSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.light}
            deepSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.deep}
            remSleep={wearableDailyData?.finalDailySpikeSleepDataV4?.rem}
            awake={wearableDailyData?.finalDailySpikeSleepDataV4?.awake}
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
            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-start gap-2">
                <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-wellness-muted-black font-bold">
                    Actionable Tip
                  </p>
                  <p className="text-wellness-muted-black">
                    {wearableDailyRecommendationData &&
                      wearableDailyRecommendationData?.actionable_tip?.map(
                        (tip) => {
                          return (
                            <p className="text-wellness-muted-black">{tip}</p>
                          );
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-start gap-2">
                <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-wellness-muted-black font-bold">
                    Alternative Cause
                  </p>
                  <p className="text-wellness-muted-black">
                    {wearableDailyRecommendationData &&
                      wearableDailyRecommendationData?.alternative_cause?.map(
                        (tip) => {
                          return (
                            <p className="text-wellness-muted-black">{tip}</p>
                          );
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-start gap-2">
                <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-wellness-muted-black font-bold">
                    Observation
                  </p>
                  <p className="text-wellness-muted-black">
                    {wearableDailyRecommendationData &&
                      wearableDailyRecommendationData?.observation?.map(
                        (tip) => {
                          return (
                            <p className="text-wellness-muted-black">{tip}</p>
                          );
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-start gap-2">
                <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-wellness-muted-black font-bold">
                    Possible Cause
                  </p>
                  <p className="text-wellness-muted-black">
                    {wearableDailyRecommendationData &&
                      wearableDailyRecommendationData?.possible_cause?.map(
                        (tip) => {
                          return (
                            <p className="text-wellness-muted-black">{tip}</p>
                          );
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTabContent;
