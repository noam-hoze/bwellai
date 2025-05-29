
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { differenceInDays, isEqual, lastDayOfWeek, isSameDay, isAfter, startOfDay, isBefore, endOfDay } from "date-fns";
import { generateWeekDays, formatWeekRange } from "@/utils/dateUtils";

interface WeekViewProps {
  currentWeekStart: Date;
  currentDay: Date;
  setCurrentDay: (day: Date) => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  programStartDate: Date;
  programEndDate: Date;
}

const WeekView = ({
  currentWeekStart,
  currentDay,
  setCurrentDay,
  goToPreviousWeek,
  goToNextWeek,
  programStartDate,
  programEndDate
}: WeekViewProps) => {
  const weekDays = generateWeekDays(currentWeekStart);
  const currentWeek = Math.ceil((differenceInDays(currentWeekStart, programStartDate) / 7) + 1);

  const weekRangeDisplay = formatWeekRange(currentWeek, weekDays[0], weekDays[6]);

  const handleClickGoToPreviousWeek = useCallback(() => {
    // Prevent going to previous week if it goes before program start date
    if (isBefore(startOfDay(weekDays[0]), programStartDate)) {
      return;
    }
    goToPreviousWeek();
  }, [programStartDate, weekDays, goToPreviousWeek]);

  const handleClickGoToNextsWeek = useCallback(() => {
    // Prevent going to next week if it goes after program end date
    if (isAfter(endOfDay(weekDays[6]), programEndDate)) {
      return;
    }
    goToNextWeek();
  }, [programEndDate, weekDays, goToNextWeek]);

  const isInProgramRange = useCallback((day: Date) => {
    return (isSameDay(day, programStartDate) || isAfter(day, programStartDate)) && (isBefore(day, programEndDate) || isSameDay(day, programEndDate));
  }, [programStartDate, programEndDate]);

  const selectDayHandler = useCallback((day: Date) => {
    const inProgramRange = isInProgramRange(day);
    if (!inProgramRange) {
      return; // Do not change if the same day is clicked
    }
    setCurrentDay(day);
  }, [isInProgramRange]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{weekRangeDisplay}</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickGoToPreviousWeek}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClickGoToNextsWeek}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Week day calendar */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const isActive = isSameDay(day, currentDay) // Current selected day
          const isToday = isSameDay(day, new Date()); // Check if the day is today
          const inProgramRange = isInProgramRange(day); // Check if the day is within the program range
          return (
            <div
              key={index}
              className={`flex flex-col items-center p-2 rounded-lg ${inProgramRange ? "cursor-pointer" : "opacity-50 cursor-not-allowed bg-gray-100"} ${isActive ? 'border-2 border-green-500' : 'hover:bg-gray-50'
                }`}
              onClick={() => selectDayHandler(day)}
            >
              <div className="text-xs text-gray-500 mb-1">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-medium ${isActive ? 'text-green-600' : ''}`}>
                {day.getDate()}
              </div>
              {(isToday && isActive) && <div className="text-xs text-green-500">Now</div>}
              <div className="mt-2">
                {day.getDate() % 2 === 0 && (
                  <div className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full">
                    <span className="text-amber-700 text-xs">🧘</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeekView;
