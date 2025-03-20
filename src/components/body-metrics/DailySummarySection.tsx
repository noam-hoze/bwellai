
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Moon, Zap, LineChart } from "lucide-react";
import HeartRateCard from "./cards/HeartRateCard";
import BloodPressureCard from "./cards/BloodPressureCard";
import ActivityMovementCard from "./cards/ActivityMovementCard";
import SleepCard from "./cards/SleepCard";
import StressLevelCard from "./cards/StressLevelCard";

const DailySummarySection = () => {
  // These values would normally come from your data backend
  const mockData = {
    heartRate: {
      current: 72,
      average: 68,
      trend: 4,
    },
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      lastReading: "2 hours ago",
    },
    activity: {
      steps: 7842,
      caloriesBurned: 1845,
      activeMinutes: 42,
    },
    sleep: {
      duration: "7h 32m",
      quality: "Good",
      score: 85,
    },
    stress: {
      current: "Moderate",
      score: 65,
      trend: -5,
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      <HeartRateCard 
        current={mockData.heartRate.current}
        average={mockData.heartRate.average}
        trend={mockData.heartRate.trend}
      />
      
      <BloodPressureCard 
        systolic={mockData.bloodPressure.systolic}
        diastolic={mockData.bloodPressure.diastolic}
        lastReading={mockData.bloodPressure.lastReading}
      />
      
      <ActivityMovementCard 
        steps={mockData.activity.steps}
        caloriesBurned={mockData.activity.caloriesBurned}
        activeMinutes={mockData.activity.activeMinutes}
      />
      
      <SleepCard 
        duration={mockData.sleep.duration}
        quality={mockData.sleep.quality}
        score={mockData.sleep.score}
      />
      
      <StressLevelCard 
        current={mockData.stress.current}
        score={mockData.stress.score}
        trend={mockData.stress.trend}
      />
    </div>
  );
};

export default DailySummarySection;
