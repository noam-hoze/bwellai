// types/wellness.ts

export interface HardAndFatalEvents {
  coronaryDeathEventRisk: number | null;
  fatalStrokeEventRisk: number | null;
  totalCVMortalityRisk: number | null;
  hardCVEventRisk: number | null;
}

export interface CvDiseases {
  overallRisk: number | null;
  coronaryHeartDiseaseRisk: number | null;
  strokeRisk: number | null;
  heartFailureRisk: number | null;
  peripheralVascularDiseaseRisk: number | null;
}

export interface Scores {
  ageScore: number | null;
  sbpScore: number | null;
  smokingScore: number | null;
  diabetesScore: number | null;
  bmiScore: number | null;
  cholesterolScore: number | null;
  cholesterolHdlScore: number | null;
  totalScore: number | null;
}

export interface WellnessData {
  wellnessScore: number | null;
  hardAndFatalEvents: HardAndFatalEvents;
  cvDiseases: CvDiseases;
  vascularAge: number | null;
  scores: Scores;
  waistToHeightRatio: number | null;
  bodyFatPercentage: number | null;
  basalMetabolicRate: number | null;
  bodyRoundnessIndex: number | null;
  conicityIndex: number | null;
  aBodyShapeIndex: number | null;
  totalDailyEnergyExpenditure: number | null;
}
