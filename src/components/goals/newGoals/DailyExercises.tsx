
import React, { useState } from "react";
import { Exercise, SelectedExercise } from "@/components/goals/newGoals/types/goalTypes";
import { differenceInDays, format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { CircleCheck, Video } from "lucide-react";
import { isSameDay } from "date-fns";
import { useUpdateExerciseDetails, useUserGoalExerciseDetails } from "@/service/hooks/goal/useGetGoal";


interface DailyExercisesProps {
  currentDay: Date;
  programStartDate: Date;
  exercises: SelectedExercise[];
  onMarkComplete: (exerciseId: number) => void;
  onViewExercise: (exercise: SelectedExercise) => void;
}

const DailyExercises = ({
  currentDay,
  exercises,
  onMarkComplete,
  onViewExercise,
  programStartDate,
}: DailyExercisesProps) => {
  const [showingGreatJob, setShowingGreatJob] = useState<number | null>(null);
  const dayCompletedExercises = [];

  const {
      data: userGoalExerciseDetailsData,
      isLoading: userGoalExerciseIsLoading,
    } = useUserGoalExerciseDetails();

  const exerciseTypes = Object.values(userGoalExerciseDetailsData ?? {}).flat();

  function handleMarkComplete(exercise) {

    if (exercise.is_completed) return;

    exercise.is_completed = true;

    // Show "Great Job" animation for longer duration
    setShowingGreatJob(exercise.exercise_id);
    setTimeout(() => {
      setShowingGreatJob(null);
    }, 5000); // 5 seconds duration



    // Call the parent handler
    onMarkComplete(exercise.exercise_id);
  }

  const getCategory = (exercise) => {
  return exerciseTypes.find((type) => type.id === exercise.exercise_type_id)?.label || '';
  }

  const getExerciseEmoji = (exercise) => {
  const category = getCategory(exercise);

  switch(category.toLowerCase()) {
    case 'stability':
      return '🧘';
    case 'mobility':
      return '🔄';
    case 'strength':
      return '🏋️';
    case 'therapy':
      return '❄️';
    default:
      return '🧍';
  }
};

  const dayOfProgram = differenceInDays(currentDay, startOfDay(programStartDate)) + 1; // Assuming program starts on Jan 1, 2023
  const todayExercises = exercises.filter((exercise) => isSameDay(exercise.date, currentDay));
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">
        Day {dayOfProgram} • {format(currentDay, "EEE, MMM d")}
      </h3>
      <div className="text-sm text-gray-600 mb-3">Upcoming</div>
      
      {/* Exercise list */}
      <ul className="space-y-2">
        {todayExercises.map((exercise) => {
          const isCompleted = exercise.is_completed;
          const exerciseEmoji = getExerciseEmoji(exercise);
          const isShowingGreatJob = showingGreatJob === exercise.exercise_id;
          
          return (
            <li 
              key={exercise.exercise_id} 
              className={cn(
                "flex items-center py-2 px-3 rounded-lg border transition-all duration-300",
                isCompleted ? "bg-green-50 border-green-100" : "bg-white border-gray-100"
              )}
            >
              <div className="flex items-center w-full">
                {/* Exercise Icon/Emoji */}
                <div className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-md mr-3 text-lg",
                  isCompleted ? "bg-green-100" : "bg-gray-100"
                )}>
                  {exerciseEmoji}
                </div>
                
                {/* Exercise Details */}
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className={cn(
                      "font-medium text-sm transition-colors duration-300",
                      isCompleted ? "text-green-700" : "text-gray-800"
                    )}>
                      {exercise.exercise_name}
                      {isCompleted && !isShowingGreatJob && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </h3>
                    {isShowingGreatJob && (
                      <div className="ml-2 animate-bounce">
                        <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
                          🎉 Great Job!
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    <span>
                    {exercise.entity_value} {exercise.entity === 'duration' ? 'seconds' : 'reps'} • </span>
                    <span>{exercise.sets > 1 ? ` ${exercise.sets} sets` : ''} • </span>
                    <span>{getCategory(exercise)}</span>
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <button 
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => onViewExercise(exercise)}
                  >
                    <Video className="h-3.5 w-3.5 text-gray-600" />
                    <span className="sr-only">View exercise</span>
                  </button>
                  
                  {!isCompleted ? (
                    <button 
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-wellness-bright-green hover:bg-wellness-bright-green/90 transition-colors"
                      onClick={() => handleMarkComplete(exercise)}
                    >
                      <CircleCheck className="h-4 w-4 text-white" />
                      <span className="sr-only">Mark as complete</span>
                    </button>
                  ) : (
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100">
                      <CircleCheck className="h-4 w-4 text-wellness-bright-green" />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyExercises;
