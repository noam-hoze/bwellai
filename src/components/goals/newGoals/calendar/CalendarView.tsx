
import React from "react";
import { Button } from "@/components/ui/button";
import { subWeeks, addWeeks, startOfWeek, subMonths, addMonths } from "date-fns";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import CalendarStats from "./CalendarStats";

interface CalendarViewProps {
  calendarView: "week" | "month";
  setCalendarView: (view: "week" | "month") => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  completedExercises: Record<number, number[]>;
  totalDays: number;
  painReduction: number;
  programStartDate: Date;
  programEndDate: Date;
}

const CalendarView = ({
  calendarView,
  setCalendarView,
  currentDay,
  setCurrentDay,
  completedExercises,
  totalDays,
  painReduction,
  programStartDate,
  programEndDate
}: CalendarViewProps) => {
  const [currentWeekStart, setCurrentWeekStart] = React.useState<Date>(startOfWeek(new Date()));
  const [currentMonthDate, setCurrentMonthDate] = React.useState<Date>(new Date());

  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentMonthDate(subMonths(currentMonthDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonthDate(addMonths(currentMonthDate, 1));
  };

  // Helper for checking completed exercises
  const hasCompletedExercises = (day: number) => {
    return completedExercises[day] && completedExercises[day].length > 0;
  };

  // Helper to determine if a day is today
  const isToday = (day: number) => {
    return day === 8; // In this mock, day 8 is today
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Program Schedule</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`${calendarView === "week" ? "bg-gray-100" : ""}`}
            onClick={() => setCalendarView("week")}
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`${calendarView === "month" ? "bg-gray-100" : ""}`}
            onClick={() => setCalendarView("month")}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Calendar Views */}
      <div className="border rounded-lg p-4">
        {calendarView === "week" ? (
          <WeekView 
            currentWeekStart={currentWeekStart}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            goToPreviousWeek={goToPreviousWeek}
            goToNextWeek={goToNextWeek}
            programStartDate={programStartDate}
            programEndDate={programEndDate}
          />
        ) : (
          <MonthView
            currentMonthDate={currentMonthDate}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            hasCompletedExercises={hasCompletedExercises}
            isToday={isToday}
          />
        )}
        
        {/* Calendar stats - visible in both views */}
        <CalendarStats
          currentDayNumber={currentDay}
          totalDays={totalDays}
          exercisesCompleted={18} // Mock data
          adherencePercentage={82} // Mock data
          painReductionPercentage={painReduction}
        />
      </div>
    </div>
  );
};

export default CalendarView;
