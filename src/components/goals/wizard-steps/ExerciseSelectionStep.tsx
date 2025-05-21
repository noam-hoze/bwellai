import React, { useState } from "react";
import { Exercise, GoalData } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Play, Plus, Minus, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExerciseSelectionStepProps {
  goalData: GoalData;
  updateGoalData: (data: GoalData) => void;
  userGoalDetails?;
  userGoalExerciseDetailsData?;
}

// Sample exercise data - in a real app, this might come from an API based on the selected pain type
const exercisesByCategory = {
  Stretching: [
    {
      id: 1,
      name: "Cat-Cow Stretch",
      category: "Stretching",
      description:
        "Gentle movement that loosens the back and warms up the spine",
      recommendedReps: 10,
      customReps: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
    {
      id: 2,
      name: "Child's Pose",
      category: "Stretching",
      description:
        "Relaxes the lower back and promotes flexibility in the hips",
      recommendedReps: 3,
      customReps: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
  ],
  Strengthening: [
    {
      id: 3,
      name: "Bird Dog",
      category: "Strengthening",
      description: "Builds core stability and strengthens back muscles",
      recommendedReps: 8,
      customReps: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
    {
      id: 4,
      name: "Glute Bridge",
      category: "Strengthening",
      description: "Activates glutes and stabilizes lower back",
      recommendedReps: 12,
      customReps: 32,
      imageUrl:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
  ],
  Mobility: [
    {
      id: 5,
      name: "Seated Lumbar Rotation",
      category: "Mobility",
      description: "Increases spinal rotation and relieves tension",
      recommendedReps: 6,
      customReps: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
    {
      id: 6,
      name: "Standing Hamstring Stretch",
      category: "Mobility",
      description:
        "Stretches tight hamstrings which can contribute to back pain",
      recommendedReps: 4,
      customReps: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: false,
    },
  ],
};

const ExerciseSelectionStep = ({
  goalData,
  updateGoalData,
  userGoalExerciseDetailsData,
}: ExerciseSelectionStepProps) => {
  const [activeTab, setActiveTab] = useState<string>("Stretching");
  const [videoPreviewExercise, setVideoPreviewExercise] =
    useState<Exercise | null>(null);

  const toggleExerciseSelection = (exercise: Exercise) => {
    const updatedExercises = goalData.selectedExercises.some(
      (e) => e.id === exercise.id
    )
      ? goalData.selectedExercises.filter((e) => e.id !== exercise.id)
      : [...goalData.selectedExercises, { ...exercise, selected: true }];

    updateGoalData({
      ...goalData,
      selectedExercises: updatedExercises,
    });
  };

  const updateExerciseReps = (exerciseId: number, reps: number) => {
    const updatedExercises = goalData.selectedExercises.map((exercise) =>
      exercise.id === exerciseId ? { ...exercise, customReps: reps } : exercise
    );

    updateGoalData({
      ...goalData,
      selectedExercises: updatedExercises,
    });
  };

  const isExerciseSelected = (id: number) => {
    return goalData.selectedExercises.some((e) => e.id === id);
  };

  const getCustomReps = (id: number) => {
    const exercise = goalData.selectedExercises.find((e) => e.id === id);

    if (!exercise?.customReps) {
      exercise.customReps = 3;
    }

    return exercise ? exercise?.customReps : 0;
  };

  const openVideoPreview = (exercise: Exercise) => {
    setVideoPreviewExercise(exercise);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select recommended exercises:</h3>
        <div className="bg-wellness-light-green text-wellness-bright-green text-sm font-medium px-3 py-1 rounded-full">
          Selected: {goalData.selectedExercises.length} exercises
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {Object.keys(exercisesByCategory).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(userGoalExerciseDetailsData).map(
          ([category, exercises]) => (
            <TabsContent key={category} value={category} className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <div
                      className="h-32 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(${
                          exercisesByCategory?.[exercise?.name]?.[index]
                            ?.imageUrl
                        })`,
                      }}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2 bg-black/60 text-white hover:bg-black/80"
                        onClick={() => openVideoPreview(exercise)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`exercise-${exercise.id}`}
                              checked={isExerciseSelected(exercise.id)}
                              onCheckedChange={() =>
                                toggleExerciseSelection(exercise)
                              }
                            />
                            <label
                              htmlFor={`exercise-${exercise.id}`}
                              className="font-medium cursor-pointer"
                            >
                              {exercise.label}
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {exercise.description}
                          </p>
                        </div>
                      </div>

                      {isExerciseSelected(exercise.id) && (
                        <div className="mt-3 flex items-center">
                          <label className="text-sm mr-2">Repetitions:</label>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 rounded-full"
                              onClick={() => {
                                const currentReps = getCustomReps(exercise.id);
                                if (currentReps > 1) {
                                  updateExerciseReps(
                                    exercise.id,
                                    currentReps - 1
                                  );
                                }
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              className="h-7 w-14 text-center mx-1 p-0"
                              value={
                                getCustomReps(exercise.id) ||
                                exercisesByCategory?.[exercise?.name]?.[index]
                                  ?.recommendedReps
                              }
                              onChange={(e) =>
                                updateExerciseReps(
                                  exercise.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 rounded-full"
                              onClick={() => {
                                const currentReps = getCustomReps(exercise.id);
                                updateExerciseReps(
                                  exercise.id,
                                  currentReps + 1
                                );
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )
        )}
      </Tabs>

      {videoPreviewExercise && (
        <Dialog
          open={!!videoPreviewExercise}
          onOpenChange={() => setVideoPreviewExercise(null)}
        >
          <DialogContent className="sm:max-w-lg">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto text-wellness-bright-green mb-2" />
                <p className="text-sm text-gray-600">
                  Video preview for {videoPreviewExercise.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  (In a real application, this would play the actual exercise
                  video)
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExerciseSelectionStep;
