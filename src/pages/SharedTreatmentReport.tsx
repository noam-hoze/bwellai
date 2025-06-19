
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedReportHeader from '@/components/shared-report/SharedReportHeader';
import TreatmentPlanDetails from '@/components/shared-report/TreatmentPlanDetails';
import ProgressOverview from '@/components/shared-report/ProgressOverview';
import ExercisePerformanceSummary from '@/components/shared-report/ExercisePerformanceSummary';
import DailyExerciseLog from '@/components/shared-report/DailyExerciseLog';
import PainTrendAnalysis from '@/components/shared-report/PainTrendAnalysis';
import { useGetSavedUserGoal, useUserGoalDetails } from '@/service/hooks/goal/useGetGoal';
import {isBefore, isSameDay } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserProfile } from '@/service/hooks/profile/useGetUserProfile';

const SharedTreatmentReport = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const goalId = reportId.split("-")[1];
  const reportDate = new Date(Number(reportId.split("-")[2]));

    const { isAuthenticated, loading } = useAuth();
  
    const {
      data: getProfileIsData,
      isSuccess: getProfileIsSuccess,
      refetch: getUserProfileRefetch,
    } = useGetUserProfile({ isAuthenticated });

    console.log("getProfileIsData", getProfileIsData);

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


  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // User data - simplified
  const userData = {
    username: 'JohnDoe123',
    reportDate: reportDate
  };
  
  const planData = {
    name: 'Back Pain Relief',
    startDate: new Date('2025-05-10'),
    endDate: new Date('2025-06-07'),
    duration: 28,
    
    // Progress metrics
    daysCompleted: 8,
    totalExercisesCompleted: 26,
    totalExercisesPrescribed: 32,
    adherenceRate: Math.round((exercisesCompleted / exercisesPrescribed) * 100),
    averageCompletionRate: 85,
    currentStreak: 5,
    missedDays: 1,
    
    // Pain metrics
    initialPainLevel: 7,
    currentPainLevel: 5,
    painReduction: painReduction,
    targetPainLevel: 3,
    
    // Goals
    primaryGoals: [
      'Reduce pain from 7/10 to 3/10 or less',
      'Return to regular walking without pain (30+ minutes)',
      'Resume normal work activities without discomfort',
      'Prevent future flare-ups through maintenance exercises'
    ]
  };
  
  // Detailed daily exercise log with pain ratings
  const exerciseLog = [
    {
      day: 1,
      date: new Date('2025-05-10'),
      overallPainStart: 7,
      overallPainEnd: 7,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 4, difficulty: 3 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 5, difficulty: 4 },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Heat Therapy', completed: true, painDuring: 2, difficulty: 1 }
      ]
    },
    {
      day: 2,
      date: new Date('2025-05-11'),
      overallPainStart: 7,
      overallPainEnd: 7,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 4, difficulty: 3 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 4, difficulty: 3 },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Cold Compress', completed: true, painDuring: 1, difficulty: 1 }
      ]
    },
    {
      day: 3,
      date: new Date('2025-05-12'),
      overallPainStart: 6,
      overallPainEnd: 6,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 4, difficulty: 3 },
        { name: 'Standing Hamstring Stretch', completed: false, painDuring: null, difficulty: null },
        { name: 'Heat Therapy', completed: true, painDuring: 2, difficulty: 1 }
      ]
    },
    {
      day: 4,
      date: new Date('2025-05-13'),
      overallPainStart: 7,
      overallPainEnd: 6,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 4, difficulty: 3 },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Cold Compress', completed: true, painDuring: 1, difficulty: 1 }
      ]
    },
    {
      day: 5,
      date: new Date('2025-05-14'),
      overallPainStart: 6,
      overallPainEnd: 6,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Seated Lumbar Rotation', completed: false, painDuring: null, difficulty: null },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 2, difficulty: 2 },
        { name: 'Heat Therapy', completed: true, painDuring: 2, difficulty: 1 }
      ]
    },
    {
      day: 6,
      date: new Date('2025-05-15'),
      overallPainStart: 5,
      overallPainEnd: 5,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 2, difficulty: 2 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 2, difficulty: 1 },
        { name: 'Cold Compress', completed: true, painDuring: 1, difficulty: 1 }
      ]
    },
    {
      day: 7,
      date: new Date('2025-05-16'),
      overallPainStart: 5,
      overallPainEnd: 5,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 2, difficulty: 1 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 3, difficulty: 2 },
        { name: 'Standing Hamstring Stretch', completed: true, painDuring: 2, difficulty: 1 },
        { name: 'Heat Therapy', completed: true, painDuring: 1, difficulty: 1 }
      ]
    },
    {
      day: 8,
      date: new Date('2025-05-17'),
      overallPainStart: 5,
      overallPainEnd: 5,
      exercises: [
        { name: 'Cat-Cow Stretch', completed: true, painDuring: 2, difficulty: 1 },
        { name: 'Seated Lumbar Rotation', completed: true, painDuring: 2, difficulty: 2 },
        { name: 'Standing Hamstring Stretch', completed: false, painDuring: null, difficulty: null },
        { name: 'Cold Compress', completed: true, painDuring: 1, difficulty: 1 }
      ]
    }
  ];
  
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
        if (exercise.painDuring !== null) {
          exerciseMetrics[exercise.name].painRatings.push(exercise.painDuring);
        }
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
  
  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      <SharedReportHeader 
        userData={userData}
        planData={planData}
        formatDate={formatDate}
      />
      {/*}
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
      
      <PainTrendAnalysis 
        exerciseLog={exerciseLog}
        planData={planData}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      */}
      {/* Footer */}
      <div className="p-4 md:p-6 text-center text-sm text-gray-500">
        <p>Treatment Progress Report • {formatDate(userData.reportDate)}</p>
        <p className="mt-2">This report is a summary of your treatment progress and exercise completion.</p>
      </div>
    </div>
  );
};

export default SharedTreatmentReport;
