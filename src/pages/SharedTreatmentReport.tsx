
import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SharedReportHeader from '@/components/shared-report/SharedReportHeader';
import TreatmentPlanDetails from '@/components/shared-report/TreatmentPlanDetails';
import ProgressOverview from '@/components/shared-report/ProgressOverview';
import ExercisePerformanceSummary from '@/components/shared-report/ExercisePerformanceSummary';
import DailyExerciseLog from '@/components/shared-report/DailyExerciseLog';
import PainTrendAnalysis from '@/components/shared-report/PainTrendAnalysis';
import { useGetPublicGoalDetails, useGetSavedUserGoal, useGetUserActivity, useUserGoalDetails } from '@/service/hooks/goal/useGetGoal';
import { isBefore, isSameDay, addDays, differenceInDays, parseISO, format, isEqual, compareAsc, startOfDay, isAfter } from "date-fns";
import { useGetUserProfile } from '@/service/hooks/profile/useGetUserProfile';
import { SelectedExercise } from '@/components/goals/newGoals/CreateGoalWizard';
import html2pdf from 'html2pdf.js';
import ShareModal from '@/components/shared-report/ShareModal';
import { calculateStreak } from '@/utils/utils';


const SharedTreatmentReport = () => {

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const goalId = searchParams.get("report");
  const reportDate = new Date(Number(searchParams.get("timestamp")));

  const publicUrl = useMemo(() => {
    const origin = window.location.origin;
    const fullUrl = `${origin}/shared-treatment-report?report=${goalId}&timestamp=${reportDate.getTime()}`;
    return fullUrl;
  }, [goalId, reportDate]);

  const handleShareClick = () => {
  setIsShareModalOpen(true);
};

  const [expandedSections, setExpandedSections] = useState({
    dailyLog: true,
    painAnalysis: true,
    exerciseDetails: true
  });

  const {
    data: goalData,
    isLoading,
    refetch: savedUserGoalRefetch,
  } = useGetPublicGoalDetails(goalId);

  console.log("goalData", goalData);


  const exercises = goalData?.exerciseSelection || [];
  const exercisesCompleted = exercises.filter(exercise => exercise.completed).length;
  const exercisesPrescribed = exercises.filter(exercise => isBefore(exercise.date, new Date()) || isSameDay(exercise.date, new Date())).length;


  const painReduction = useMemo(() => {
    if (!goalData) return 0;
    const { initialPainLevel, currentPainLevel } = goalData.painAssessment;
    return Math.round((initialPainLevel - currentPainLevel) / initialPainLevel * 100);
  }, [goalData]);

  /* const {
     data: userActivityData,
      refetch: userActivityDataRefetch,
   } = useGetUserActivity();

   const relevantUserActivity = userActivityData?.filter(
    (item) => item.userActivity?.user_goal_id === goalData?.userGoalId
    && item.userActivity?.type === "pain_level"
  );*/

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  console.log("exercises", exercises);

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
      const allCompleted = exercisesForDay.every((ex) => ex.completed);
      if (!allCompleted) {
        missedDays++;
      }
    }

    return missedDays;
  }

  // User data - simplified
  const userData = {
    username: "user name unavailable", // Placeholder, replace with actual user data
    reportDate: reportDate
  };


  const planData = {
    name: goalData?.goalType,
    startDate: new Date(goalData?.createdLocalTime),
    endDate: addDays(new Date(goalData?.createdLocalTime), Number(goalData?.schedule?.programDurationInDays) - 1),
    duration: goalData?.schedule?.programDurationInDays,

    // Progress metrics
    daysCompleted: differenceInDays(reportDate, new Date(goalData?.createdLocalTime)) + 1,
    totalExercisesCompleted: exercisesCompleted,
    totalExercisesPrescribed: exercisesPrescribed,
    adherenceRate: Math.round((exercisesCompleted / exercisesPrescribed) * 100),
    averageCompletionRate: Math.round((exercisesCompleted / exercisesPrescribed) * 100),
    currentStreak: calculateStreak(exercises,reportDate),
    missedDays: calculateMissedDays(exercises, reportDate),

    // Pain metrics
    initialPainLevel: goalData?.painAssessment?.initialPainLevel,
    currentPainLevel: goalData?.painAssessment?.currentPainLevel,
    painReduction: painReduction,
    targetPainLevel: goalData?.painAssessment?.initialPainLevel - 2,
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

  const handleDownloadClick = async () => {
    const element = document.getElementById("pdf-content");
    const actions = document.getElementById("pdf-actions");

    if (!element) return alert("Could not find report content.");

    // Hide buttons before generating PDF
    if (actions) actions.style.display = "none";

    try {
      await html2pdf().from(element).save("treatment-report.pdf");
    } finally {
      // Show buttons again after generation
      if (actions) actions.style.display = "";
    }
  };




  function formatActivityData(rawActivity: any[]) {
    // 1. Group pain entries by date
    const painByDate = new Map<string, number[]>();

    for (const entry of rawActivity) {
      const { userActivity } = entry;
      if (userActivity?.type === 'pain_level' && userActivity?.currentPainLevel != null) {
        const date = userActivity.date;
        if (!painByDate.has(date)) {
          painByDate.set(date, []);
        }
        painByDate.get(date)!.push(userActivity.currentPainLevel);
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
    const grouped = new Map<string, any[]>();

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
          name: ex.exerciseName,
          completed: ex.completed,
          painDuring: null, // or populate if available
          difficulty: ex.difficultyLevel ?? null,
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

  //console.log("relevantUserActivity", relevantUserActivity);

  return (
    <div id="pdf-content" className="max-w-4xl mx-auto bg-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        <SharedReportHeader
          userData={userData}
          planData={planData}
          formatDate={formatDate}
          onDownloadClick={handleDownloadClick}
          onShareClick={handleShareClick}
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
      {isShareModalOpen && (
        <ShareModal url={publicUrl} onClose={() => setIsShareModalOpen(false)} />
      )}  
    </div>
  );
};

export default SharedTreatmentReport;
