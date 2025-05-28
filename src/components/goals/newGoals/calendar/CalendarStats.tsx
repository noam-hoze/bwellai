
import React from "react";

interface CalendarStatsProps {
  currentDayNumber: number;
  totalDays: number;
  exercisesCompleted: number;
  adherencePercentage: number;
  painReductionPercentage: number;
}

const CalendarStats = ({
  currentDayNumber,
  totalDays,
  exercisesCompleted,
  adherencePercentage,
  painReductionPercentage
}: CalendarStatsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6 border-t pt-4">
      <div>
        <div className="text-sm text-gray-500">Days</div>
        <div className="font-semibold text-green-600">{currentDayNumber}/{totalDays}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Exercises</div>
        <div className="font-semibold text-green-600">{exercisesCompleted}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Adherence</div>
        <div className="font-semibold text-green-600">{adherencePercentage}%</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Pain ↓</div>
        <div className="font-semibold text-green-600">{painReductionPercentage}%</div>
      </div>
    </div>
  );
};

export default CalendarStats;
