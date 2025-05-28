
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import { getDate } from "date-fns";
import { cn } from "@/lib/utils";
import { generateMonthGrid, formatMonthYear } from "@/utils/dateUtils";

interface MonthViewProps {
  currentMonthDate: Date;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  hasCompletedExercises: (day: number) => boolean;
  isToday: (day: number) => boolean;
}

const MonthView = ({
  currentMonthDate,
  currentDay,
  setCurrentDay,
  goToPreviousMonth,
  goToNextMonth,
  hasCompletedExercises,
  isToday
}: MonthViewProps) => {
  const monthGrid = generateMonthGrid(currentMonthDate);
  const monthRangeDisplay = formatMonthYear(currentMonthDate);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{monthRangeDisplay}</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Month grid with weekday headers */}
      <div className="mb-2">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {monthGrid.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((day, dayIndex) => {
              if (!day) return <div key={dayIndex} className="p-2"></div>;
              
              const dayNumber = getDate(day);
              const isDayToday = isToday(dayNumber);
              const isSelected = dayNumber === currentDay;
              const hasCompleted = hasCompletedExercises(dayNumber);
              
              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg cursor-pointer text-center h-16",
                    isSelected ? 'border-2 border-green-500 bg-green-50' : 'hover:bg-gray-50',
                    isDayToday ? 'bg-green-100' : ''
                  )}
                  onClick={() => setCurrentDay(dayNumber)}
                >
                  <div className={cn(
                    "text-lg",
                    isSelected ? 'text-green-600' : '',
                    isDayToday ? 'font-bold' : ''
                  )}>
                    {dayNumber}
                  </div>
                  {isDayToday && <div className="text-xs">•</div>}
                  {hasCompleted && (
                    <div className="mt-1">
                      <div className="w-5 h-5">
                        <CircleCheck className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 text-sm mt-4 border-t pt-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 flex items-center justify-center">
            <CircleCheck className="h-4 w-4 text-green-600" />
          </div>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 border border-green-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </>
  );
};

export default MonthView;
