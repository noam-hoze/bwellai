
import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SharedReportHeader from '@/components/shared-report/SharedReportHeader';
import TreatmentPlanDetails from '@/components/shared-report/TreatmentPlanDetails';
import ProgressOverview from '@/components/shared-report/ProgressOverview';
import ExercisePerformanceSummary from '@/components/shared-report/ExercisePerformanceSummary';
import DailyExerciseLog from '@/components/shared-report/DailyExerciseLog';
import PainTrendAnalysis from '@/components/shared-report/PainTrendAnalysis';
import { useGetSavedUserGoal, useGetUserActivity, useUserGoalDetails } from '@/service/hooks/goal/useGetGoal';
import {isBefore, isSameDay,addDays, differenceInDays, parseISO, format , isEqual, compareAsc, startOfDay, isAfter} from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserProfile } from '@/service/hooks/profile/useGetUserProfile';
import { SelectedExercise } from '@/components/goals/newGoals/CreateGoalWizard';

const SharedTreatmentReport = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const goalId = searchParams.get("report");
  const reportDate = new Date(Number(searchParams.get("timestamp")));

    const { isAuthenticated, loading } = useAuth();
  
    const {
      data: userProfile,
      isSuccess: getProfileIsSuccess,
      refetch: getUserProfileRefetch,
    } = useGetUserProfile({ isAuthenticated });

  const [expandedSections, setExpandedSections] = useState({
    dailyLog: true,
    painAnalysis: true,
    exerciseDetails: true
  });

  const { data: goalTypes, isLoading: userGoalDetailsIsLoading } =
      useUserGoalDetails();

  const {
      data,
      isLoading,
      refetch: savedUserGoalRefetch,
    } = useGetSavedUserGoal();

  const goalData = data?.find(goal => goal.id === goalId);
  const currentGoalType = goalTypes?.find(goal => goal.id === goalData?.goalsId);
  const exercises = goalData?.exercise_selection || [];
  const exercisesCompleted = exercises.filter(exercise => exercise.is_completed).length;
  const exercisesPrescribed = exercises.filter(exercise => isBefore(exercise.date, new Date()) || isSameDay(exercise.date, new Date())).length;
  

  const painReduction = useMemo(() => {
        if(!goalData) return 0;
        const { initial_pain_level, current_pain_level } = goalData.pain_assessment;
        return Math.round((initial_pain_level - current_pain_level) / initial_pain_level * 100);
      }, [goalData]);

   const {
     data: userActivityData,
      refetch: userActivityDataRefetch,
   } = useGetUserActivity();

   const relevantUserActivity = userActivityData?.filter(
    (item) => item.userActivity?.user_goal_id === goalData?.userGoalId
    && item.userActivity?.type === "pain_level"
  );

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  console.log("exercises", exercises);

  function calculateStreak(exercises): number {
    const today = new Date(reportDate);
    today.setUTCHours(0, 0, 0, 0);

    const dailyCompletionStatus = new Map<string, boolean>();
    let hasRelevantData = false; 

    for (const exercise of exercises) {
        const exerciseDate = new Date(exercise.date);
        exerciseDate.setUTCHours(0, 0, 0, 0);

        if (exerciseDate.getTime() > today.getTime()) {
            continue;
        }
        hasRelevantData = true;
        const dateKey = exerciseDate.toISOString().split('T')[0];
        dailyCompletionStatus.set(dateKey, dailyCompletionStatus.get(dateKey) || exercise.is_completed);
    }

    if (!hasRelevantData) {
        return 0;
    }

    let streak = 0;
    let currentDate = new Date(today);

    const sortedKeys = Array.from(dailyCompletionStatus.keys()).sort();
    const earliestRelevantDate = sortedKeys.length > 0 ? new Date(sortedKeys[0]) : null;
    if (earliestRelevantDate) {
        earliestRelevantDate.setUTCHours(0, 0, 0, 0); 
    }

    while (true) {
        const currentDateKey = currentDate.toISOString().split('T')[0];
        const completionStatus = dailyCompletionStatus.get(currentDateKey);

        if (completionStatus === true) {
            streak++;
        } else if (completionStatus === false) {
            break;
        } else { 
            if (earliestRelevantDate && currentDate.getTime() < earliestRelevantDate.getTime()) {
                break;
            }
        }

        // Move to the previous day
        currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    }

    return streak;
}

function calculateMissedDays(exercises: any[], reportDate: Date): number {
  const exercisesByDate = new Map<string, any[]>();

  for (const ex of exercises) {
    const exerciseDate = parseISO(ex.date);
    // Ignore dates after the reportDate
    if (isBefore(exerciseDate, reportDate) || isEqual(exerciseDate, reportDate)) {
      const dateKey = format(exerciseDate, "yyyy-MM-dd");
      if (!exercisesByDate.has(dateKey)) {
        exercisesByDate.set(dateKey, []);
      }
      exercisesByDate.get(dateKey)!.push(ex);
    }
  }

  let missedDays = 0;

  for (const [date, exercisesForDay] of exercisesByDate.entries()) {
    const allCompleted = exercisesForDay.every((ex) => ex.is_completed);
    if (!allCompleted) {
      missedDays++;
    }
  }

  return missedDays;
}
  
  // User data - simplified
  const userData = {
    username: userProfile?.email,
    reportDate: reportDate
  };

  
  const planData = {
    name: currentGoalType?.name,
    startDate: new Date(goalData?.created_local_time),
    endDate: addDays(new Date(goalData?.created_local_time), Number(goalData?.schedule?.program_duration_in_days) - 1),
    duration: goalData?.schedule?.program_duration_in_days,
    
    // Progress metrics
    daysCompleted: differenceInDays(reportDate, new Date(goalData?.created_local_time)) + 1,
    totalExercisesCompleted: exercisesCompleted,
    totalExercisesPrescribed: exercisesPrescribed,
    adherenceRate: Math.round((exercisesCompleted / exercisesPrescribed) * 100),
    averageCompletionRate: Math.round((exercisesCompleted / exercisesPrescribed) * 100),
    currentStreak: calculateStreak(exercises),
    missedDays: calculateMissedDays(exercises, reportDate),

    // Pain metrics
    initialPainLevel: goalData?.pain_assessment?.initial_pain_level,
    currentPainLevel: goalData?.pain_assessment?.current_pain_level,
    painReduction: painReduction,
    targetPainLevel: goalData?.pain_assessment?.initial_pain_level - 2,
  };

  type ExerciseLogEntry = {
  day: number;
  date: Date;
  overallPainStart: number | null;
  overallPainEnd: number | null;
  exercises: {
    name: string;
    completed: boolean;
    painDuring: number | null;
    difficulty: number | null;
  }[];
};

function formatActivityData(rawActivity: any[]) {
  // 1. Group pain entries by date
  const painByDate = new Map<string, number[]>();

  for (const entry of rawActivity) {
    const { userActivity } = entry;
    if (userActivity?.type === 'pain_level' && userActivity?.current_pain_level != null) {
      const date = userActivity.date;
      if (!painByDate.has(date)) {
        painByDate.set(date, []);
      }
      painByDate.get(date)!.push(userActivity.current_pain_level);
    }
  }

  // 2. Sort by date and calculate average pain per day
  const sortedDates = Array.from(painByDate.keys()).sort((a, b) =>
    compareAsc(parseISO(a), parseISO(b))
  );

  return sortedDates.map((date, index) => {
    const painLevels = painByDate.get(date)!;
    const averagePain =
      painLevels.reduce((sum, level) => sum + level, 0) / painLevels.length;

    return {
      day: index + 1,
      overallPainEnd: Math.round(averagePain),
    };
  });
}



function transformExercisesToLog(exercises): ExerciseLogEntry[] {
  // 1. Group exercises by day (yyyy-MM-dd)
  const grouped = new Map<string, SelectedExercise[]>();

  for (const ex of exercises) {
    const dateKey = format(parseISO(ex.date), 'yyyy-MM-dd');
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(ex);
  }

  // 2. Sort dates ascending
  const sortedDates = Array.from(grouped.keys()).sort((a, b) =>
    compareAsc(parseISO(a), parseISO(b))
  );

  // 3. Transform into final structure
  const exerciseLog: ExerciseLogEntry[] = sortedDates.map((dateKey, index) => {
    const exercises = grouped.get(dateKey)!;

    return {
      day: index + 1,
      date: new Date(dateKey),
      overallPainStart: null, // or populate if available
      overallPainEnd: null,   // or populate if available
      exercises: exercises.map((ex) => ({
        name: ex.exercise_name,
        completed: ex.is_completed,
        painDuring: null, // or populate if available
        difficulty: ex.difficulty_level ?? null,
      })),
    };
  });

  return exerciseLog;
}

const exerciseLog = transformExercisesToLog(exercises);

  
  // Calculate exercise-specific metrics
  const exerciseMetrics: Record<string, any> = {};
  exerciseLog.forEach(day => {
    day.exercises.forEach(exercise => {
      if (!exerciseMetrics[exercise.name]) {
        exerciseMetrics[exercise.name] = {
          totalPrescribed: 0,
          totalCompleted: 0,
          painRatings: [],
          difficultyRatings: []
        };
      }
      exerciseMetrics[exercise.name].totalPrescribed++;
      if (exercise.completed) {
        exerciseMetrics[exercise.name].totalCompleted++;
        if (exercise.difficulty !== null) {
          exerciseMetrics[exercise.name].difficultyRatings.push(exercise.difficulty);
        }
      }
    });
  });
  
  // Calculate averages for each exercise
  Object.keys(exerciseMetrics).forEach(exerciseName => {
    const metrics = exerciseMetrics[exerciseName];
    metrics.completionRate = Math.round((metrics.totalCompleted / metrics.totalPrescribed) * 100);
    metrics.avgPain = metrics.painRatings.length > 0 
      ? (metrics.painRatings.reduce((a, b) => a + b, 0) / metrics.painRatings.length).toFixed(1)
      : 'N/A';
    metrics.avgDifficulty = metrics.difficultyRatings.length > 0
      ? (metrics.difficultyRatings.reduce((a, b) => a + b, 0) / metrics.difficultyRatings.length).toFixed(1)
      : 'N/A';
  });
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };
  
  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  console.log("relevantUserActivity", relevantUserActivity);
  
  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      <SharedReportHeader 
        userData={userData}
        planData={planData}
        formatDate={formatDate}
      />
      
      <TreatmentPlanDetails 
        planData={planData}
        formatDate={formatDate}
      />
      
      <ProgressOverview planData={planData} />
      
      <ExercisePerformanceSummary 
        exerciseMetrics={exerciseMetrics}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      
      <DailyExerciseLog 
        exerciseLog={exerciseLog}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        formatShortDate={formatShortDate}
      />
      {/*
      <PainTrendAnalysis 
        activity={formatActivityData(relevantUserActivity ?? [])}
        planData={planData}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />*/}
      
      {/* Footer */}
      <div className="p-4 md:p-6 text-center text-sm text-gray-500">
        <p>Treatment Progress Report • {formatDate(userData.reportDate)}</p>
        <p className="mt-2">This report is a summary of your treatment progress and exercise completion.</p>
      </div>
    </div>
  );
};

export default SharedTreatmentReport;
