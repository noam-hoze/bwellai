import React from "react";
import {
  Heart,
  ActivitySquare,
  Thermometer,
  Scale,
  Brain,
  Zap,
} from "lucide-react";
import Lungs from "@/components/icons/Lungs";
import MetricCard from "./MetricCard";
import BloodPressureMetric from "./BloodPressureMetric";
import { filterFaceScanData } from "@/utils/shenaiHelper";

interface HealthMetricsProps {
  historyData: {
    heartRate: Array<{ date: Date; value: number }>;
    systolicBP: Array<{ date: Date; value: number }>;
    diastolicBP: Array<{ date: Date; value: number }>;
    hrv: Array<{ date: Date; value: number }>;
    breathingRate: Array<{ date: Date; value: number }>;
    stressIndex: Array<{ date: Date; value: number }>;
    cardiacWorkload: Array<{ date: Date; value: number }>;
    parasympatheticActivity: Array<{ date: Date; value: number }>;
  };
}

const HealthMetrics = ({ facescanResult, userFaceDataLatest }: any) => {
  const PulseHRFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "heart_rate_bpm",
  });

  const systolicBloodPressureFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "systolic_blood_pressure_mmhg",
  });
  const diastolicBloodPressureFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "diastolic_blood_pressure_mmhg",
  });
  const hrvSdnnmsFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "hrv_sdnn_ms",
  });
  const breathingRatebpmFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "breathing_rate_bpm",
  });
  const stress_indexFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "stress_index",
  });
  const cardiac_workload_mmhg_per_secFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "cardiac_workload_mmhg_per_sec",
  });
  const parasympathetic_activityFilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "parasympathetic_activity",
  });
  const bmi_kg_per_m2FilteredData = filterFaceScanData({
    userFaceDataLatest,
    key: "bmi_kg_per_m2",
  });

  return (
    <div className="w-full space-y-4">
      <MetricCard
        icon={<Heart className="h-5 w-5 text-red-500" />}
        title="Heart Rate"
        value={
          facescanResult?.heart_rate_bpm ||
          PulseHRFilteredData?.[PulseHRFilteredData?.length - 1]?.value
        }
        unit="bpm"
        normalRange="60-100 bpm"
        description="Measures the average number of heartbeats per minute, which reflects the current state of the autonomic nervous system and may be indicative of the cardiovascular fitness level."
        data={PulseHRFilteredData}
        color="#ef4444"
        threshold={100}
      />

      <BloodPressureMetric
        systolicValue={
          facescanResult?.systolic_blood_pressure_mmhg ||
          systolicBloodPressureFilteredData?.[
            systolicBloodPressureFilteredData?.length - 1
          ]?.value
        }
        diastolicValue={
          facescanResult?.diastolic_blood_pressure_mmhg ||
          diastolicBloodPressureFilteredData?.[
            diastolicBloodPressureFilteredData?.length - 1
          ]?.value
        }
        systolicData={systolicBloodPressureFilteredData}
        diastolicData={diastolicBloodPressureFilteredData}
      />

      <MetricCard
        icon={<ActivitySquare className="h-5 w-5 text-purple-500" />}
        title="Heart Rate Variability (HRV)"
        value={
          facescanResult?.hrv_sdnn_ms ||
          hrvSdnnmsFilteredData?.[hrvSdnnmsFilteredData?.length - 1]?.value
        }
        unit="ms"
        normalRange=""
        description="Measures the variation in time intervals between the heartbeats, which reflects the state of the autonomic nervous system."
        data={hrvSdnnmsFilteredData}
        color="#8b5cf6"
      />

      <MetricCard
        icon={<Lungs className="h-5 w-5 text-blue-400" />}
        title="Breathing Rate (BR)"
        value={
          facescanResult?.breathing_rate_bpm ||
          breathingRatebpmFilteredData?.[
            breathingRatebpmFilteredData?.length - 1
          ]?.value
        }
        unit="bpm"
        normalRange="12-20 bpm"
        description="Counts breaths per minute, reflecting respiratory status and (indirectly) stress level."
        data={breathingRatebpmFilteredData}
        color="#60a5fa"
        threshold={20}
      />

      <MetricCard
        icon={<Thermometer className="h-5 w-5 text-orange-500" />}
        title="Stress Index"
        value={
          facescanResult?.stress_index ||
          stress_indexFilteredData?.[stress_indexFilteredData?.length - 1]
            ?.value
        }
        unit=""
        normalRange="0-4"
        description="Indicates whether the heart is working in a stressed or relaxed manner."
        data={stress_indexFilteredData}
        color="#f97316"
        threshold={4}
      />

      <MetricCard
        icon={<ActivitySquare className="h-5 w-5 text-red-400" />}
        title="Cardiac Workload"
        value={
          facescanResult?.cardiac_workload_mmhg_per_sec ||
          cardiac_workload_mmhg_per_secFilteredData?.[
            cardiac_workload_mmhg_per_secFilteredData?.length - 1
          ]?.value
        }
        unit="mmHg/s"
        normalRange="90-216 mmHg/s"
        description="Indicates the work that the heart needs to do to pump blood."
        data={cardiac_workload_mmhg_per_secFilteredData}
        color="#f87171"
        threshold={216}
      />

      <MetricCard
        icon={<Brain className="h-5 w-5 text-green-500" />}
        title="Parasympathetic Activity"
        value={
          facescanResult?.parasympathetic_activity ||
          parasympathetic_activityFilteredData?.[
            parasympathetic_activityFilteredData?.length - 1
          ]?.value
        }
        unit="%"
        normalRange=""
        description="Assesses the activity of the parasympathetic nervous system, which is responsible for body relaxation and recovery from stress."
        data={parasympathetic_activityFilteredData}
        color="#22c55e"
      />

      <MetricCard
        icon={<Scale className="h-5 w-5 text-blue-500" />}
        title="Body Mass Index (BMI)"
        value={
          facescanResult?.bmi_kg_per_m2 ||
          bmi_kg_per_m2FilteredData?.[bmi_kg_per_m2FilteredData?.length - 1]
            ?.value
        }
        unit="kg/m²"
        normalRange="18.5-24.9 kg/m²"
        description="Body Mass Index, which indicates if your weight is appropriate for your height."
        data={bmi_kg_per_m2FilteredData}
        color="#3b82f6"
        threshold={24.9}
      />
    </div>
  );
};

export default HealthMetrics;
