// context/WellnessContext.tsx

import React, { createContext, useContext, useState } from "react";
import { WellnessData } from "@/modules/types/wellness";

const defaultWellnessData: WellnessData = {
  wellnessScore: null,
  hardAndFatalEvents: {
    coronaryDeathEventRisk: null,
    fatalStrokeEventRisk: null,
    totalCVMortalityRisk: null,
    hardCVEventRisk: null,
  },
  cvDiseases: {
    overallRisk: null,
    coronaryHeartDiseaseRisk: null,
    strokeRisk: null,
    heartFailureRisk: null,
    peripheralVascularDiseaseRisk: null,
  },
  vascularAge: null,
  scores: {
    ageScore: null,
    sbpScore: null,
    smokingScore: null,
    diabetesScore: null,
    bmiScore: null,
    cholesterolScore: null,
    cholesterolHdlScore: null,
    totalScore: null,
  },
  waistToHeightRatio: null,
  bodyFatPercentage: null,
  basalMetabolicRate: null,
  bodyRoundnessIndex: null,
  conicityIndex: null,
  aBodyShapeIndex: null,
  totalDailyEnergyExpenditure: null,
};

type WellnessContextType = {
  wellnessData: WellnessData;
  setWellnessData: React.Dispatch<React.SetStateAction<WellnessData>>;
};

const WellnessContext = createContext<WellnessContextType | undefined>(
  undefined
);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wellnessData, setWellnessData] =
    useState<WellnessData>(defaultWellnessData);

  return (
    <WellnessContext.Provider value={{ wellnessData, setWellnessData }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error("useWellness must be used within a WellnessProvider");
  }
  return context;
};
