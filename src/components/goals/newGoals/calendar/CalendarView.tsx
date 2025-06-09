
import React from "react";
import { Button } from "@/components/ui/button";
import { subWeeks, addWeeks, startOfWeek, subMonths, addMonths, isSameMonth, isBefore, isAfter } from "date-fns";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import CalendarStats from "./CalendarStats";
import { SelectedExercise } from "../types/goalTypes";

interface CalendarViewProps {
  calendarView: "week" | "month";
  setCalendarView: (view: "week" | "month") => void;
  currentDayOfGoal: number;
  currentDay: Date;
  setCurrentDay: (day: Date) => void;
  completedExercises: Record<number, number[]>;
  totalDays: number;
  painReduction: number;
  programStartDate: Date;
  programEndDate: Date;
  exercises: SelectedExercise[]; // Optional exercises prop, can be used for future enhancements
}

const CalendarView = ({
  calendarView,
  setCalendarView,
   currentDay,
  currentDayOfGoal,
  setCurrentDay,
  completedExercises,
  totalDays,
  painReduction,
  programStartDate,
  programEndDate,
  exercises, 
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
    if (
      isSameMonth(currentMonthDate, programStartDate) ||
      isBefore(currentMonthDate, programStartDate)
    ) {
      return; // Prevent going before program start date
    };
    setCurrentMonthDate(subMonths(currentMonthDate, 1));
  }

  const goToNextMonth = () => {
    if (
      isSameMonth(currentMonthDate, programEndDate) ||
      isAfter(currentMonthDate, programEndDate)
    ) {
      return; // Prevent going after program end date
    };
    setCurrentMonthDate(addMonths(currentMonthDate, 1));
  };

  // Helper for checking completed exercises
  const hasCompletedExercises = (day: number) => {
    return completedExercises[day] && completedExercises[day].length > 0;
  };

  const exercisesCompleted = exercises.filter(exercise => exercise.is_completed).length;

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
            exercises={exercises}
          />
        ) : (
          <MonthView
            currentMonthDate={currentMonthDate}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            programStartDate={programStartDate}
            programEndDate={programEndDate}
            hasCompletedExercises={hasCompletedExercises}
          />
        )}

        {/* Calendar stats - visible in both views */}
        <CalendarStats
          currentDayNumber={currentDayOfGoal}
          totalDays={totalDays}
          exercisesCompleted={exercisesCompleted} 
          totalExercises={exercises.length} 
          adherencePercentage={Math.round((exercisesCompleted / exercises.length) * 100)} 
          painReductionPercentage={painReduction}
        />
      </div>
    </div>
  );
};

export default CalendarView;
