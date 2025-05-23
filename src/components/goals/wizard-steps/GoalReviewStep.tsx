import React from "react";
import { GoalData } from "../CreateGoalWizard";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Calendar } from "lucide-react";
import { format, addDays } from "date-fns";
import { capitalizeText } from "@/utils/utils";

interface GoalReviewStepProps {
  goalData: GoalData;
  updateGoalData: (data: GoalData) => void;
}

const GoalReviewStep = ({ goalData }: GoalReviewStepProps) => {
  const getScheduleText = () => {
    const times = [];
    if (goalData.schedule.morning) times.push("Morning");
    if (goalData.schedule.afternoon) times.push("Afternoon");
    if (goalData.schedule.evening) times.push("Evening");
    return times.join(", ");
  };

  const startDate = new Date();
  const endDate = addDays(startDate, goalData.duration);

  // Helper function to format a date to a readable string
  const formatDateToString = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          {capitalizeText(goalData.type, "_")} Management Goal
        </h3>
        <p className="text-sm text-gray-600">
          Please review your goal details below before creating it.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">Pain Assessment</h4>
            <div className="text-sm mt-1 space-y-1">
              <p>Current pain level: {goalData.painLevel}/10</p>
              <p>Pain pattern: {goalData.painPattern || "Not specified"}</p>
            </div>
          </div>
          <div className="bg-wellness-light-green text-wellness-bright-green px-3 py-1 rounded-full text-xs font-medium">
            Baseline: {goalData.painLevel}/10
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Pain Triggers</h4>
        <div className="flex flex-wrap gap-2">
          {goalData.painTriggers.length > 0 ? (
            goalData.painTriggers.map((trigger) => (
              <div
                key={trigger}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {trigger}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No specific triggers selected
            </p>
          )}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">
            Selected Exercises ({goalData.selectedExercises.length})
          </h4>
        </div>
        <div className="space-y-3">
          {goalData.selectedExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded"
            >
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-xs text-gray-500">
                  {exercise.category} • {exercise.customReps} repetitions
                </p>
              </div>
              <Check className="h-4 w-4 text-wellness-bright-green" />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-wellness-bright-green" />
          <div>
            <p className="text-sm font-medium">Exercise Time</p>
            <p className="text-sm text-gray-600">{getScheduleText()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-wellness-bright-green" />
          <div>
            <p className="text-sm font-medium">Goal Duration</p>
            <p className="text-sm text-gray-600">
              {formatDateToString(startDate)} - {formatDateToString(endDate)}
              <span className="block text-xs text-gray-500">
                ({goalData.duration} days)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-wellness-light-green p-4 rounded-lg">
        <h4 className="font-medium text-wellness-bright-green">Goal Summary</h4>
        <p className="mt-1 text-sm">
          This {capitalizeText(goalData.type, "_")} management goal will help
          you reduce pain through guided exercises. You'll track your progress
          daily for {goalData.duration} days and should start seeing results
          within
          {goalData.duration <= 14
            ? " 1-2 weeks"
            : goalData.duration <= 30
            ? " 2-4 weeks"
            : " 4-8 weeks"}
          .
        </p>
      </div>
    </div>
  );
};

export default GoalReviewStep;
