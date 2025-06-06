
import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { addDays, set, differenceInDays, isSameDay, startOfDay } from "date-fns";

// Import mock data
import { 
  mockGoalData, 
  initialCompletedExercises, 
  initialDifficultyRatings,
  mockPainHistory, 
  mockMilestones,
  mockExerciseDifficulties, 
  mockInsights 
} from "@/components/goals/newGoals/mockGoalData";

// Import components
import GoalHeader from "@/components/goals/newGoals/GoalHeader";
import CalendarView from "@/components/goals/newGoals/calendar/CalendarView";
import DailyExercises from "@/components/goals/newGoals/DailyExercises";
import PainAssessment from "@/components/goals/newGoals/PainAssessment";
import ProgressSection from "@/components/goals/newGoals/ProgressSection";
import ExerciseDetailsModal from "@/components/goals/newGoals/ExerciseDetailsModal";
import DifficultyRatingDialog from "@/components/goals/newGoals/DifficultyRatingDialog";
import { useLocation } from "react-router-dom";
import { Exercise } from "@/components/goals/newGoals/types/goalTypes";

const NewGoalDetail = () => {
  const [goalData, setGoalData] = useState<any>(null);
  // Lovable start
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<"calendar" | "progress">("calendar");
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [exercises, setExercises] = useState<Exercise[]>(goalData?.exercise_selection || []);
  const [exercisesExpanded, setExercisesExpanded] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState(initialCompletedExercises);
  const [difficultyRatings, setDifficultyRatings] = useState(initialDifficultyRatings);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState<boolean>(false);
  const [exerciseToRate, setExerciseToRate] = useState<Exercise | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  // Calculate completion percentage for the current day
  const dayCompletedExercises = [];
  const completionPercentage = exercises.length > 0
    ? Math.round((dayCompletedExercises.length / exercises.length) * 100)
    : 0;

  const handleMarkComplete = (exerciseId: number) => {
    // Update local state for immediate feedback
    const newCompletedExercises = {
      ...completedExercises,
      // [currentDay]: [...(completedExercises[currentDay] || []), exerciseId]
    };
    
    setCompletedExercises(newCompletedExercises);
    
    // Show the difficulty rating dialog
    const exerciseToRate = exercises.find(ex => ex.id === exerciseId);
    if (exerciseToRate) {
      setExerciseToRate(exerciseToRate);
      setIsRatingDialogOpen(true);
    }
    
    // No toast notification - removed
  };

  const handleRateExercise = (rating: number) => {
    if (exerciseToRate) {
      setDifficultyRatings({
        ...difficultyRatings,
        [exerciseToRate.id]: rating
      });
    }
    setIsRatingDialogOpen(false);
    setExerciseToRate(null);
  };

  const handleViewExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdatePain = (level: number) => {
    setCurrentPainLevel(level);
  };

  const handleEditGoal = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  // Lovable end

  const location = useLocation();
  const [currentDayOfGoal, setCurrentDayOfGoal] = useState<number>(1); // Default to day 1
  const [goalDuration, setGoalDuration] = useState<number>(1); // Default to 1 day
  const [programStartDate, setProgramStartDate] = useState<Date | null>(null);
  const [programEndDate, setProgramEndDate] = useState<Date | null>(null);
  const [currentPainLevel, setCurrentPainLevel] = useState<number>(0);

  const painReduction = useMemo(() => {
      if(!goalData) return 0;
      const { initial_pain_level } = goalData.pain_assessment;
      return ((initial_pain_level - currentPainLevel) / initial_pain_level) * 100;
    }, [goalData, currentPainLevel]);

  useEffect(() => {
      if (location.state?.goal) {
        const goalData = location.state.goal;
        setGoalData(goalData);
        setCurrentPainLevel(goalData?.pain_assessment?.current_pain_level || 0);
        setGoalDuration(Number(goalData?.schedule?.program_duration_in_days));
        const goalCreationDateInLocalTime = new Date(goalData?.created_local_time);
        const newGoalDuration = Number(goalData?.schedule?.program_duration_in_days);
        setGoalDuration(newGoalDuration);
        setProgramStartDate(goalCreationDateInLocalTime);
        setProgramEndDate(addDays(goalCreationDateInLocalTime, newGoalDuration)); 
        setCurrentDayOfGoal(differenceInDays(new Date(), startOfDay(goalCreationDateInLocalTime)) + 1);
      }
    }, [location]);

    console.log("goalData", goalData);

    if(!goalData) {
      return <div className="text-center text-gray-500">Loading goal data...</div>;
    }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <GoalHeader 
          goalType={goalData.name}
          startDate={goalData.created_local_time}
          endDate={programEndDate}
          completionPercentage={completionPercentage}//change
          streak={5} // Mock data for streak, change
          onEditGoal={handleEditGoal}//change? look into this
          duration={goalData.schedule?.program_duration_in_days}
          goalId={goalData.id} // Assuming goalData has an id field
        />

        {/* Navigation Tabs */}
        <Tabs 
          defaultValue="calendar" 
          onValueChange={(value) => setCurrentView(value as "calendar" | "progress")}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 h-10 mb-2">
            <TabsTrigger value="calendar" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:rounded-none data-[state=active]:shadow-none">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:rounded-none data-[state=active]:shadow-none">
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab Content */}
          <TabsContent value="calendar">
            <div className="space-y-6">
              {/* Program Schedule */}
              <CalendarView
                calendarView={calendarView}
                setCalendarView={setCalendarView}
                currentDayOfGoal={currentDayOfGoal}
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                completedExercises={completedExercises}
                totalDays={goalDuration}
                painReduction={painReduction}
                programStartDate={programStartDate}
                programEndDate={programEndDate}
                exercises={goalData.exercise_selection || []}
              />

              {/* Daily Exercises */}
              <DailyExercises
                currentDay={currentDay}
                exercises={goalData.exercise_selection}
                completedExercises={completedExercises}
                onMarkComplete={handleMarkComplete}
                onViewExercise={handleViewExercise}
                programStartDate={programStartDate}
              />

              {/* Pain assessment */}
              <div className="mt-6">
                <PainAssessment 
                  currentPainLevel={currentPainLevel}
                  dayNumber={currentDay.getDate()}
                  isToday={isSameDay(currentDay, new Date())}// In a real app, check against actual today
                  goalData ={goalData}
                  onUpdatePain={handleUpdatePain}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Progress Tab Content */}
          <TabsContent value="progress">
            <ProgressSection 
              completedExercises={18} // Mock data - in a real app calculate from all days
              totalExercises={22}     // Mock data
              currentDay={currentDay}
              currentDayOfGoal={currentDayOfGoal}
              totalDays={mockGoalData.duration}
              painReduction={painReduction}
              streak={5} // Mock streak data
              painHistory={mockPainHistory}
              initialPainLevel={mockGoalData.painLevel}
              currentPainLevel={currentPainLevel}
              targetPainLevel={2} // From goal description
              exerciseDifficulties={mockExerciseDifficulties}
              insights={mockInsights}
              milestones={mockMilestones}
            />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <ExerciseDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          exercise={selectedExercise}
          onMarkComplete={handleMarkComplete}
          isCompleted={selectedExercise ? (completedExercises[currentDay] || []).includes(selectedExercise.id) : false}
        />
        
        <DifficultyRatingDialog 
          isOpen={isRatingDialogOpen}
          onClose={() => setIsRatingDialogOpen(false)}
          onRate={handleRateExercise}
          exerciseName={exerciseToRate?.name || ""}
        />

        {/* Edit Goal Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] p-0">
            {/* <CreateGoalWizard 
              onClose={handleCloseEditDialog} 
              editGoal={{
                id: 1, // Using mock data
                title: mockGoalData.type,
                type: mockGoalData.type,
                startDate: mockGoalData.startDate,
                duration: mockGoalData.duration,
                progress: completionPercentage,
                currentDay: currentDay,
                initialPainLevel: mockGoalData.painLevel,
                currentPainLevel: currentPainLevel,
                status: 'active'
              }}
            {/* /> */}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default NewGoalDetail;
