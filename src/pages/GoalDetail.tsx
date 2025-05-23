import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Exercise } from "@/components/goals/CreateGoalWizard";
import ExerciseList from "@/components/goals/ExerciseList";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  useSaveUserGoalActivity,
  useUserGoalActivity,
} from "@/service/hooks/goal/useGetGoal";
import { capitalizeText, getFormattedDateYMD } from "@/utils/utils";

// In a real app, this would come from an API or context
// const mockGoalData = {
//   id: 1,
//   type: "Back Pain",
//   painLevel: 6,
//   painPattern: "Morning stiffness and pain after sitting",
//   painTriggers: ["Prolonged sitting", "Heavy lifting"],
//   schedule: {
//     morning: true,
//     afternoon: false,
//     evening: true,
//   },
//   duration: 30,
//   startDate: new Date(),
//   selectedExercises: [
//     {
//       id: 1,
//       name: "Cat-Cow Stretch",
//       category: "Stretching",
//       description:
//         "Gentle movement that loosens the back and warms up the spine. Start on your hands and knees. Alternate between arching your back upward (cat) and letting it sag while lifting your head (cow).",
//       recommendedReps: 10,
//       customReps: 10,
//       imageUrl:
//         "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//       videoUrl: "#",
//       selected: true,
//     },
//     {
//       id: 2,
//       name: "Child's Pose",
//       category: "Stretching",
//       description:
//         "Relaxes the lower back and promotes flexibility in the hips. Kneel with toes together, sit back on your heels, and stretch arms forward while lowering your forehead to the floor.",
//       recommendedReps: 3,
//       customReps: 3,
//       imageUrl:
//         "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//       videoUrl: "#",
//       selected: true,
//     },
//     {
//       id: 3,
//       name: "Bird Dog (each side)",
//       category: "Strengthening",
//       description:
//         "Builds core stability and strengthens back muscles. Start on hands and knees, extend opposite arm and leg simultaneously while maintaining a stable core.",
//       recommendedReps: 8,
//       customReps: 8,
//       imageUrl:
//         "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//       videoUrl: "#",
//       selected: true,
//     },
//   ],
// };

const GoalDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [currentPainLevel, setCurrentPainLevel] = useState<number>(0);
  const [showPainUpdate, setShowPainUpdate] = useState<boolean>(false);
  const [goalData, setGoalData] = useState<any>(null);

  const { data: userGoalActivityData, refetch: userGoalActivityRefetch } =
    useUserGoalActivity({
      date: getFormattedDateYMD(),
      user_goal_id: goalData?.userGoalId,
      type: "exercise_status",
    });
  const {
    data: userGoalActivityPainData,
    refetch: userGoalActivityPainRefetch,
  } = useUserGoalActivity({
    date: getFormattedDateYMD(),
    user_goal_id: goalData?.userGoalId,
    type: "pain_level",
  });

  const {
    data,
    mutate: saveUserGoalActivityMutate,
    isSuccess: saveUserGoalActivityIsSuccess,
  } = useSaveUserGoalActivity();

  useEffect(() => {
    if (location.state?.goal) {
      const goalData = location.state.goal;
      setGoalData(goalData);
      setCurrentPainLevel(goalData?.pain_assessment?.current_pain_level || 0);
    }
  }, [location]);

  useEffect(() => {
    if (userGoalActivityData) {
      const c = userGoalActivityData?.map((g) => {
        return g?.userActivity?.exercise_id;
      });
      setCompletedExercises(c);
    }
  }, [userGoalActivityData]);

  useEffect(() => {
    if (userGoalActivityPainData) {
      setCurrentPainLevel(
        userGoalActivityPainData?.[0]?.userActivity?.current_pain_level
      );
    }
  }, [userGoalActivityPainData]);

  useEffect(() => {
    if (saveUserGoalActivityIsSuccess) {
      userGoalActivityRefetch();
      userGoalActivityPainRefetch();
    }
  }, [saveUserGoalActivityIsSuccess]);

  const handleMarkComplete = (exerciseId: number) => {
    saveUserGoalActivityMutate({
      goals_id: goalData?.goalsId,
      exercise_id: exerciseId,
      type: "exercise_status",
      user_goal_id: goalData?.userGoalId,
      user_action: {
        goal_completed: true,
      },
      date: getFormattedDateYMD(),
    });

    setCompletedExercises((prev) => {
      const newCompleted = [...prev, exerciseId];
      // In a real app, this would update the backend
      return newCompleted;
    });

    toast({
      title: "Exercise marked as complete",
      description: "Your progress has been updated",
    });
  };

  const handlePainLevelChange = (level: number) => {
    saveUserGoalActivityMutate({
      goals_id: goalData?.goalsId,
      user_goal_id: goalData?.userGoalId,
      type: "pain_level",
      current_pain_level: level,
      // user_action: {
      //   goal_completed: true,
      // },
      date: getFormattedDateYMD(),
    });

    setCurrentPainLevel(level);
    setShowPainUpdate(false);
    toast({
      title: "Pain level updated",
      description: `Your current pain level is now recorded as ${level}/10`,
    });
  };

  const completionPercentage =
    completedExercises?.length > 0
      ? Math.round(
          (completedExercises?.length / goalData?.exercise_selection?.length) *
            100
        )
      : 0;

  const startDate = new Date(goalData?.created_local_time);
  const now = new Date();
  const msInDay = 1000 * 60 * 60 * 24;

  const currentDay = Math.min(
    goalData?.schedule?.program_duration_in_days,
    Math.max(1, Math.floor((now.getTime() - startDate.getTime()) / msInDay) + 1)
  );

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 -ml-3 text-gray-600"
            onClick={() => navigate("/goals")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Goals
          </Button>

          <h1 className="text-2xl font-bold">
            {/* {goalData?.exercise_selection} Management Program */}
            Management Program
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1.5" />
            {/* <span>
              Day {completedExercises.length > 0 ? 1 : 0} of{" "}
              {goalData?.schedule?.program_duration_in_days}
            </span> */}
            <span>
              Day {currentDay} of {goalData?.schedule?.program_duration_in_days}
            </span>
          </div>
        </div>

        {/* Progress Overview Card */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-wellness-light-green to-blue-50 pb-3">
            <CardTitle className="text-lg text-wellness-bright-green">
              Progress Overview
            </CardTitle>
            <div className="flex justify-between text-sm mt-1">
              <span>Today's exercises: {completionPercentage}% complete</span>
              <span>
                {completedExercises?.length} of{" "}
                {goalData?.exercise_selection?.length} completed
              </span>
            </div>
            <Progress value={completionPercentage} className="h-1 mt-2" />
          </CardHeader>

          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Initial Pain Level</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <div
                      key={`initial-${level}`}
                      className={`h-6 w-5 rounded ${
                        level <= goalData?.pain_assessment?.current_pain_level
                          ? "bg-red-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">
                    {goalData?.pain_assessment?.current_pain_level}/10
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Current Pain Level</h3>
                {!showPainUpdate ? (
                  <>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <div
                          key={`current-${level}`}
                          className={`h-6 w-5 rounded ${
                            level <= currentPainLevel
                              ? "bg-red-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm">
                        {currentPainLevel}/10
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPainUpdate(true)}
                      className="mt-2"
                    >
                      Update Pain Level
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <Button
                          key={level}
                          variant={
                            level === currentPainLevel ? "default" : "outline"
                          }
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePainLevelChange(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Today's Exercises</h2>
          <ExerciseList
            exercises={goalData?.exercise_selection}
            onMarkComplete={handleMarkComplete}
            completedExercises={completedExercises}
          />
        </div>

        {/* Pain Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Pain Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Pattern</h3>
              <p className=" text-gray-600">
                {capitalizeText(goalData?.pain_assessment?.pain_pattern, "_")}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Triggers</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {goalData?.pain_assessment?.pain_triggers.map(
                  (trigger, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-xs"
                    >
                      {trigger}
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exercise Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* {Object.entries(mockGoalData.schedule).map(([time, isActive]) =>
                isActive ? (
                  <div
                    key={time}
                    className="flex items-center p-3 bg-wellness-light-green rounded-lg"
                  >
                    <Clock className="h-5 w-5 text-wellness-bright-green mr-2" />
                    <span className="capitalize">{time}</span>
                  </div>
                ) : null
              )} */}
              {goalData?.schedule?.preferred_time?.map((time) => (
                <div
                  key={time}
                  className="flex items-center p-3 bg-wellness-light-green rounded-lg"
                >
                  <Clock className="h-5 w-5 text-wellness-bright-green mr-2" />
                  <span className="capitalize">{time}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h3 className="text-sm font-medium text-blue-700">
                Consistency Tip
              </h3>
              <p className="text-sm mt-1">
                For best results, try to perform your exercises at the same
                times each day. This helps build a sustainable habit and
                improves your progress.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default GoalDetail;
