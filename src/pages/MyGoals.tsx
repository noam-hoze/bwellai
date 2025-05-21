import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Calendar, Clock } from "lucide-react";
import CreateGoalWizard from "@/components/goals/CreateGoalWizard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { format, addDays } from "date-fns";
import { useGetSavedUserGoal } from "@/service/hooks/goal/useGetGoal";

const MyGoals = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetSavedUserGoal();

  // In a real app, this would come from an API
  const mockGoals = [
    {
      id: 1,
      title: "Back Pain Management",
      type: "Back Pain",
      startDate: new Date(),
      duration: 30,
      progress: 15,
      currentDay: 5,
      initialPainLevel: 6,
      currentPainLevel: 5,
    },
  ];

  const formatDateToString = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Goals</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Goal
          </Button>
        </div>

        {data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map((goal) => {
              const endDate = addDays(
                new Date(goal.created_local_time),
                Number(goal?.schedule?.program_duration_in_days)
              );

              const startDate = new Date(goal.created_local_time);
              const now = new Date();
              const msInDay = 1000 * 60 * 60 * 24;

              // Calculate how many full days have passed since the start date
              const currentDay = Math.min(
                goal?.schedule?.program_duration_in_days,
                Math.max(
                  1,
                  Math.floor((now.getTime() - startDate.getTime()) / msInDay) +
                    1
                )
              );

              const progress = Math.min(
                100,
                Math.round(
                  (currentDay / goal?.schedule?.program_duration_in_days) * 100
                )
              );

              return (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-wellness-light-green to-blue-50">
                    <CardTitle className="text-xl font-semibold text-wellness-bright-green">
                      {goal?.exercise_selection?.exercise_name}
                    </CardTitle>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Progress: {progress}%</span>
                      <span>
                        Day {currentDay} of{" "}
                        {goal?.schedule?.program_duration_in_days}
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5 mt-2" />
                  </CardHeader>

                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-wellness-bright-green" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-xs text-gray-500">
                              {formatDateToString(goal.created_local_time)} -{" "}
                              {formatDateToString(endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-wellness-bright-green" />
                          <div>
                            <p className="text-sm font-medium">Pain Level</p>
                            <p className="text-xs text-gray-500">
                              Initial:{" "}
                              {goal?.pain_assessment?.current_pain_level}/10 →
                              Current: {goal.currentPainLevel}/10
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        className="w-full flex justify-between"
                        onClick={() => navigate(`/goal-detail/${goal.id}`)}
                      >
                        <span>View Goal Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No goals yet</h2>
              <p className="text-gray-600 mb-4">
                Create your first pain management goal to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <CreateGoalWizard onClose={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MyGoals;
