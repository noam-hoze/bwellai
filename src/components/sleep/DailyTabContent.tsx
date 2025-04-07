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
import {
  calculatedSleepPercentage,
  convertSecondsToHHMM,
  convertUnderscoresToCapitalizeHeading,
} from "@/utils/utils";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import SleepCycleAnimated from "./SleepCycleAnimated";
import SleepCycleClock from "./SleepCycleClock";
import { SleepStage } from "./SleepCycleRing";

function formatTo12Hour(timeString: string): string {
  const date = new Date(timeString);

  const hours = date?.getHours();
  const minutes = date?.getMinutes();

  const formattedHours = ((hours + 11) % 12) + 1; // Convert to 1-12
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedMinutes = minutes?.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

interface DailyTabContentProps {
  selectedDate: Date;
  wearableDailyRecommendationData;
  wearableDailyData;
  getProfileIsData;
}

interface APISleepEntry {
  date_time: string;
  level: string;
  seconds: number;
}

interface ComponentSleepEntry {
  stage: SleepStage;
  duration: number;
  isWakeEvent?: boolean;
}

// Sample sleep data
const sleepData = [
  { stage: "AWAKE" as SleepStage, duration: 15, isWakeEvent: false }, // Initial falling asleep
  { stage: "LIGHT" as SleepStage, duration: 90 },
  { stage: "DEEP" as SleepStage, duration: 45 },
  { stage: "REM" as SleepStage, duration: 30 },
  { stage: "LIGHT" as SleepStage, duration: 60 },
  { stage: "AWAKE" as SleepStage, duration: 5, isWakeEvent: true }, // Brief awakening
  { stage: "LIGHT" as SleepStage, duration: 75 },
  { stage: "DEEP" as SleepStage, duration: 35 },
  { stage: "AWAKE" as SleepStage, duration: 3, isWakeEvent: true }, // Another brief awakening
  { stage: "REM" as SleepStage, duration: 45 },
  { stage: "LIGHT" as SleepStage, duration: 60 },
  { stage: "AWAKE" as SleepStage, duration: 4, isWakeEvent: true }, // Brief awakening
  { stage: "REM" as SleepStage, duration: 30 },
  { stage: "AWAKE" as SleepStage, duration: 7, isWakeEvent: true }, // Brief awakening
  { stage: "LIGHT" as SleepStage, duration: 40 },
  { stage: "AWAKE" as SleepStage, duration: 10, isWakeEvent: false }, // Final wake up
];

function convertAndGroupSleepData(
  apiData: APISleepEntry[]
): ComponentSleepEntry[] {
  const result: ComponentSleepEntry[] = [];

  let currentStage = apiData?.[0]?.level?.toUpperCase() as SleepStage;
  let totalSeconds = apiData?.[0]?.seconds;
  const isWake = currentStage === "AWAKE";

  for (let i = 1; i < apiData?.length; i++) {
    const entry = apiData?.[i];
    const stage = entry?.level?.toUpperCase() as SleepStage;

    if (stage === currentStage) {
      totalSeconds += entry?.seconds;
    } else {
      result?.push({
        stage: currentStage,
        duration: Math.round(totalSeconds / 60),
        ...(currentStage === "AWAKE"
          ? { isWakeEvent: isWake && result?.length > 0 }
          : {}),
      });

      // Reset for new stage
      currentStage = stage;
      totalSeconds = entry?.seconds;
    }
  }

  // Push the final group
  result?.push({
    stage: currentStage,
    duration: Math.round(totalSeconds / 60),
    ...(currentStage === "AWAKE" ? { isWakeEvent: result?.length > 0 } : {}),
  });

  return result;
}

const DailyTabContent = ({
  selectedDate,
  wearableDailyRecommendationData,
  wearableDailyData,
  getProfileIsData,
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

  const formattedSleepData = convertAndGroupSleepData(
    wearableDailyData?.finalDailySpikeSleepDataV4?.levels
  );

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
                  score={
                    wearableDailyData?.finalDailySpikeSleepDataV4?.efficiency
                  }
                  bedtime={
                    wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start?.split(
                      "T"
                    )?.[1]
                  }
                  wakeup={
                    wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_end?.split(
                      "T"
                    )?.[1]
                  }
                  totalSleep={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.total_sleep || 0
                  )}
                  wakeupCount={wearableDailyData?.wakeUpTimes}
                />
              </CarouselItem>
              <CarouselItem>
                <SleepDistributionCard
                  lightHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.light || 0
                  )}
                  deepHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.deep || 0
                  )}
                  remHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.rem || 0
                  )}
                  awakeHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.awake || 0
                  )}
                  lightSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.light,
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.deep,
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.rem,
                    sleepType: "rem",
                  })}
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
                  lightHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.light || 0
                  )}
                  deepHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.deep || 0
                  )}
                  remHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.rem || 0
                  )}
                  awakeHR={convertSecondsToHHMM(
                    wearableDailyData?.finalDailySpikeSleepDataV4?.awake || 0
                  )}
                  lightSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.light,
                    sleepType: "light",
                  })}
                  deepSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.deep,
                    sleepType: "deep",
                  })}
                  remSleep={calculatedSleepPercentage({
                    totalSleep:
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration,
                    age: getProfileIsData?.age,
                    actualSleepHr:
                      wearableDailyData?.finalDailySpikeSleepDataV4?.rem,
                    sleepType: "rem",
                  })}
                  awake={
                    (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                      wearableDailyData?.finalDailySpikeSleepDataV4
                        ?.bedtime_duration) *
                    100
                  }
                />
              </CarouselItem>

              <CarouselItem>
                <SleepCycleAnimated
                  sleepData={formattedSleepData || []}
                  title="Sleep Cycle Animation"
                  startTime={formatTo12Hour(
                    wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.bedtime_start || new Date()
                  )}
                  endTime={formatTo12Hour(
                    wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.bedtime_end || new Date()
                  )}
                />
              </CarouselItem>
              <CarouselItem>
                <SleepCycleClock
                  sleepData={formattedSleepData || []}
                  startTime={formatTo12Hour(
                    wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.bedtime_start || new Date()
                  )}
                  endTime={formatTo12Hour(
                    wearableDailyData?.finalDailySpikeSleepDataV4
                      ?.bedtime_end || new Date()
                  )}
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
            score={wearableDailyData?.finalDailySpikeSleepDataV4?.efficiency}
            bedtime={
              wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start?.split(
                "T"
              )?.[1]
            }
            wakeup={
              wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_end?.split(
                "T"
              )?.[1]
            }
            totalSleep={
              convertSecondsToHHMM(
                wearableDailyData?.finalDailySpikeSleepDataV4?.total_sleep || 0
              ) + " H"
            }
            wakeupCount={wearableDailyData?.wakeUpTimes}
          />
          <SleepDistributionCard
            lightHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.light || 0
            )}
            deepHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.deep || 0
            )}
            remHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.rem || 0
            )}
            awakeHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.awake || 0
            )}
            lightSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr:
                wearableDailyData?.finalDailySpikeSleepDataV4?.light,
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr:
                wearableDailyData?.finalDailySpikeSleepDataV4?.deep,
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr: wearableDailyData?.finalDailySpikeSleepDataV4?.rem,
              sleepType: "rem",
            })}
            awake={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
          />
          <SleepQualityCard
            lightHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.light || 0
            )}
            deepHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.deep || 0
            )}
            remHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.rem || 0
            )}
            awakeHR={convertSecondsToHHMM(
              wearableDailyData?.finalDailySpikeSleepDataV4?.awake || 0
            )}
            lightSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr:
                wearableDailyData?.finalDailySpikeSleepDataV4?.light,
              sleepType: "light",
            })}
            deepSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr:
                wearableDailyData?.finalDailySpikeSleepDataV4?.deep,
              sleepType: "deep",
            })}
            remSleep={calculatedSleepPercentage({
              totalSleep:
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_duration,
              age: getProfileIsData?.age,
              actualSleepHr: wearableDailyData?.finalDailySpikeSleepDataV4?.rem,
              sleepType: "rem",
            })}
            awake={
              (wearableDailyData?.finalDailySpikeSleepDataV4?.awake /
                wearableDailyData?.finalDailySpikeSleepDataV4
                  ?.bedtime_duration) *
              100
            }
          />
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SleepCycleAnimated
              sleepData={formattedSleepData || []}
              title="Sleep Cycle Animation"
              startTime={formatTo12Hour(
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start ||
                  new Date()
              )}
              endTime={formatTo12Hour(
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_end ||
                  new Date()
              )}
            />
          </div>
          <div className="lg:col-span-1">
            <SleepCycleClock
              sleepData={formattedSleepData || []}
              startTime={formatTo12Hour(
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_start ||
                  new Date()
              )}
              endTime={formatTo12Hour(
                wearableDailyData?.finalDailySpikeSleepDataV4?.bedtime_end ||
                  new Date()
              )}
            />
          </div>
        </div>
      </div>

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
