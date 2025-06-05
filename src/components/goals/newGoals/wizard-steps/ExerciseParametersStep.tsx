
import React from "react";
import { GoalData, Exercise } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";


interface ExerciseParametersStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const ExerciseParametersStep: React.FC<ExerciseParametersStepProps> = ({
  goalData,
  updateGoalData
}) => {
  const isMobile = useIsMobile();
  
  const updateExercise = (exerciseId: number, updates: Partial<Exercise>) => {
    const updatedExercises = goalData.selectedExercises.map(exercise => {
      if (exercise.id === exerciseId) {
        return { ...exercise, ...updates };
      }
      return exercise;
    });
    
    updateGoalData({ selectedExercises: updatedExercises });
  };

  const getDefaultsForExercise = (exercise: Exercise): Partial<Exercise> => {
  if (exercise.exerciseType === "rep-based") {
    return { customReps: 10, duration: undefined, sets: 2 , frequency: "Daily" };
  } else {
    return { customReps: 0, duration: 30, sets: 2 , frequency: "Daily" };
  }
};


  const toggleExerciseType = (exercise: Exercise) => {
    const newType = exercise.exerciseType === "rep-based" ? "time-based" : "rep-based";
    
    // Set appropriate default values based on the type
    if (newType === "rep-based") {
      updateExercise(exercise.id, { 
        exerciseType: newType,
        customReps: 10,
        duration: undefined,
        sets: 2
      });
    } else {
      updateExercise(exercise.id, { 
        exerciseType: newType,
        customReps: 0,
        duration: 30,
        sets: 2
      });
    }
  };

  const incrementValue = (exercise: Exercise, field: 'customReps' | 'sets' | 'duration') => {
    if (field === 'duration' && exercise.duration !== undefined) {
      updateExercise(exercise.id, { duration: exercise.duration + 5 });
    } else if (field === 'customReps') {
      updateExercise(exercise.id, { customReps: exercise.customReps + 1 });
    } else if (field === 'sets') {
      updateExercise(exercise.id, { sets: exercise.sets + 1 });
    }
  };

  const decrementValue = (exercise: Exercise, field: 'customReps' | 'sets' | 'duration') => {
    if (field === 'duration' && exercise.duration !== undefined) {
      updateExercise(exercise.id, { duration: Math.max(5, exercise.duration - 5) });
    } else if (field === 'customReps') {
      updateExercise(exercise.id, { customReps: Math.max(1, exercise.customReps - 1) });
    } else if (field === 'sets') {
      updateExercise(exercise.id, { sets: Math.max(1, exercise.sets - 1) });
    }
  };

  const handleInputChange = (
    exercise: Exercise, 
    field: 'customReps' | 'sets' | 'duration', 
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    
    if (field === 'duration' && exercise.duration !== undefined) {
      updateExercise(exercise.id, { duration: Math.max(0, numValue) });
    } else if (field === 'customReps') {
      updateExercise(exercise.id, { customReps: Math.max(0, numValue) });
    } else if (field === 'sets') {
      updateExercise(exercise.id, { sets: Math.max(1, numValue) });
    }
  };

  const setFrequency = (exerciseId: number, frequency: Exercise['frequency']) => {
    updateExercise(exerciseId, { frequency });
  };

  useEffect(() => {
  const updated = goalData.selectedExercises.map((exercise) => {
    const needsInit =
      exercise.customReps === undefined ||
      exercise.sets === undefined ||
      (exercise.exerciseType === "time-based" && exercise.duration === undefined) ||
      exercise.frequency === undefined;;

    return needsInit
      ? { ...exercise, ...getDefaultsForExercise(exercise) }
      : exercise;
  });

  updateGoalData({ selectedExercises: updated });
}, []);

  console.log("goalData.selectedExercises: ", goalData.selectedExercises);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exercise Parameters</h2>
        <Badge variant="secondary" className="bg-wellness-light-green text-wellness-bright-green">
          {goalData.selectedExercises.length} exercises to configure
        </Badge>
      </div>
      
      {goalData.selectedExercises.length > 0 ? (
        <div className="space-y-6">
          {goalData.selectedExercises.map(exercise => (
            <Card key={exercise.id} className="border border-gray-200">
              <CardContent className="p-4">
                {/* Exercise Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-2xl mr-3">
                      {exercise.category === "Mobility" ? "🔄" : 
                       exercise.category === "Strengthening" ? "🏋️" : 
                       exercise.category === "Stretching" ? "🧘" : "⚖️"}
                    </div>
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-gray-500">{exercise.description}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                          {exercise.category}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          {exercise.exerciseType === "rep-based" ? "Rep-based" : "Time-based"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  {/* Exercise Type Toggle */}
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium mr-2">
                      {exercise.exerciseType === "rep-based" ? "Repetitions" : "Duration"}
                    </span>
                    <button
                      onClick={() => toggleExerciseType(exercise)}
                      className="text-wellness-bright-green text-sm hover:underline"
                    >
                      Switch
                    </button>
                  </div>
                  
                  {/* Controls Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Repetitions/Duration Control */}
                    <div>
                      <div className="flex items-center h-10 border border-input rounded-md overflow-hidden">
                        <button 
                          className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-r flex items-center justify-center"
                          onClick={() => decrementValue(exercise, exercise.exerciseType === "rep-based" ? "customReps" : "duration")}
                        >
                          <span className="text-lg">-</span>
                        </button>
                        <input
                          type="text"
                          className="h-full w-full text-center border-none focus:outline-none focus:ring-0"
                          value={exercise.exerciseType === "rep-based" ? exercise.customReps : exercise.duration}
                          onChange={(e) => handleInputChange(
                            exercise, 
                            exercise.exerciseType === "rep-based" ? "customReps" : "duration",
                            e.target.value
                          )}
                        />
                        <button 
                          className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-l flex items-center justify-center"
                          onClick={() => incrementValue(exercise, exercise.exerciseType === "rep-based" ? "customReps" : "duration")}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {exercise.exerciseType === "rep-based" ? "reps" : "seconds"}
                      </p>
                    </div>
                    
                    {/* Sets Control */}
                    <div>
                      <div className="flex items-center h-10 border border-input rounded-md overflow-hidden">
                        <button 
                          className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-r flex items-center justify-center"
                          onClick={() => decrementValue(exercise, "sets")}
                        >
                          <span className="text-lg">-</span>
                        </button>
                        <input
                          type="text"
                          className="h-full w-full text-center border-none focus:outline-none focus:ring-0"
                          value={exercise.sets}
                          onChange={(e) => handleInputChange(exercise, "sets", e.target.value)}
                        />
                        <button 
                          className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-l flex items-center justify-center"
                          onClick={() => incrementValue(exercise, "sets")}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">sets</p>
                    </div>
                    
                    {/* Frequency Dropdown */}
                    <div>
                      <Select 
                        value={exercise.frequency} 
                        onValueChange={(value) => setFrequency(exercise.id, value as Exercise['frequency'])}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Every other day">Every other day</SelectItem>
                          <SelectItem value="3x per week">3 times per week</SelectItem>
                          <SelectItem value="2x per week">2 times per week</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">frequency</p>
                    </div>
                  </div>
                  
                  {/* Summary */}
                  <div className="mt-4 pt-2 text-sm text-gray-600">
                    {/*<p>
                      Summary: {exercise.exerciseType === "rep-based"
                        ? `${exercise.customReps} reps`
                        : `${exercise.duration} seconds`
                      } × {exercise.sets} sets, {exercise.frequency.toLowerCase()}
                    </p>*/}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No exercises selected. Please go back to the previous step to select exercises.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExerciseParametersStep;
