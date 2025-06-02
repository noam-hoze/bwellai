
export type BodyArea = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export type PainPattern = 'intermittent' | 'constant' | 'activity-related' | 'time_related' | 'activity_related';

export type PainTrigger = 
  | 'sitting' 
  | 'standing' 
  | 'bending' 
  | 'lifting'
  | 'walking'
  | 'lying_down'
  | 'Sitting for long periods'
  | 'Standing for long periods'
  | 'Bending forward'
  | 'Lifting objects'
  | 'Walking'
  | 'Climbing stairs'
  | 'Morning stiffness'
  | 'End of day fatigue'
  | 'Sudden movements'
  | 'Cold weather';

export type FunctionalLimitation = 
  | 'walking_limited' 
  | 'sitting_limited' 
  | 'standing_limited' 
  | 'sleep_disrupted';

export type Exercise = {
  id: number;
  name: string;
  category: string;
  description: string;
  recommendedReps: number;
  customReps: number;
  imageUrl: string;
  videoUrl: string;
  selected: boolean;
  sets: number;
  isRecommended?: boolean;
  exerciseType?: 'rep-based' | 'time-based';
  duration?: number; // seconds for time-based exercises
  frequency?: 'Daily' | 'Every other day' | '3x per week' | '2x per week' | 'Weekly';
  
};

export type Therapy = {
  id: number;
  name: string;
  description: string;
  type: 'cold' | 'heat';
  duration: number; // minutes
  timesPerDay: number;
  whenToApply: string;
  selected: boolean;
}

export type PlanDuration = '2 weeks' | '4 weeks' | '8 weeks' | 'custom';

export type ReminderSetting = 'daily_exercises' | 'weekly_checkins' | 'therapy_reminders';

export type GoalData = {
  goalId: number;
  type: string;
  painLevel: number;
  painPattern: string;
  painTriggers: string[];
  selectedExercises: Exercise[];
  schedule: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  name: string;
  duration: number; // Duration in days
};

export interface Goal {
  id: number;
  title: string;
  type: string;
  startDate: Date;
  duration: number;
  progress: number;
  currentDay: number;
  initialPainLevel: number;
  currentPainLevel: number;
  status: 'active' | 'completed' | 'paused';
}
