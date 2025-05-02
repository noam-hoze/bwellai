import React from "react";
import { ActivitySquare } from "lucide-react";
import ScanHistoryTrends from "@/components/face-scan/ScanHistoryTrends";
import { Card } from "@/components/ui/card";

interface BloodPressureMetricProps {
  systolicData: Array<{ date: Date; value: number }>;
  diastolicData: Array<{ date: Date; value: number }>;
  facescanResult?;
}

const BloodPressureMetric = ({
  facescanResult,
  systolicData,
  diastolicData,
}: BloodPressureMetricProps) => {
  return (
    <Card
      className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#F1F0FB]"
      variant="perspective"
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ActivitySquare className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Blood Pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-blue-500">
              {facescanResult?.systolic_blood_pressure_mmhg}/
              {facescanResult?.diastolic_blood_pressure_mmhg} mmHg
            </span>
            <span className="text-xs text-gray-400">90-129/60-84 mmHg</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Blood pressure readings consist of two key numbers that indicate
          cardiovascular health. The first systolic pressure (SBP), measures the
          peak pressure in the arteries during heartbeats, while the second,
          diastolic pressure (DBP), represents the resting pressure between
          beats.
        </p>

        <div className="space-y-4">
          <div className="border border-gray-100 rounded-lg p-2 bg-white">
            <ScanHistoryTrends
              data={systolicData}
              label="Systolic Blood Pressure"
              unit=" mmHg"
              color="#ef4444"
              threshold={129}
            />
          </div>
          {diastolicData && (
            <div className="border border-gray-100 rounded-lg p-2 bg-white">
              <ScanHistoryTrends
                data={diastolicData}
                label="Diastolic Blood Pressure"
                unit=" mmHg"
                color="#3b82f6"
                threshold={84}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BloodPressureMetric;
