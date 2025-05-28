
import React, {useCallback} from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { differenceInDays, isEqual, lastDayOfWeek } from "date-fns";
import { generateWeekDays, formatWeekRange } from "@/utils/dateUtils";

interface WeekViewProps {
  currentWeekStart: Date;
  currentDay: number;
  setCurrentDay: (day: number) => void;
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
  const currentWeek = Math.round((differenceInDays(currentWeekStart, programStartDate) / 7) + 1);
  const maxWeeks = Math.round(differenceInDays(programEndDate, programStartDate) / 7 + 1);

  const weekRangeDisplay = formatWeekRange(currentWeek, weekDays[0], weekDays[6]);

  const handleClickGoToPreviousWeek = useCallback(() => {
    if(currentWeek <= 1){
      return;
    }
    goToPreviousWeek();
  }, [currentWeek, goToPreviousWeek]);

  const handleClickGoToNextsWeek = useCallback(() => {
    if(currentWeek >= maxWeeks){
      return;
    }
    goToNextWeek();
  }, [currentWeek, goToNextWeek]);

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
          const dayNumber = day.getDate();
          const isToday = isEqual(day, new Date(2025, 4, 17)); // May 17, 2025 (example today)
          const isActive = dayNumber === currentDay; // Current selected day
          
          return (
            <div 
              key={index} 
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${
                isActive ? 'border-2 border-green-500' : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentDay(dayNumber)}
            >
              <div className="text-xs text-gray-500 mb-1">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-medium ${isActive ? 'text-green-600' : ''}`}>
                {dayNumber}
              </div>
              {isActive && <div className="text-xs text-green-500">Now</div>}
              <div className="mt-2">
                {dayNumber % 2 === 0 && (
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
