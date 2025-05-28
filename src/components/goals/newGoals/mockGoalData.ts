
import { Exercise } from "@/components/goals/CreateGoalWizard";

// Mock goal data
export const mockGoalData = {
  id: 1,
  type: "Back Pain Relief",
  painLevel: 6,
  painPattern: "Morning stiffness and pain after sitting",
  painTriggers: ["Prolonged sitting", "Heavy lifting"],
  schedule: {
    morning: true,
    afternoon: false,
    evening: true,
  },
  duration: 28,
  startDate: new Date(2025, 4, 10), // May 10, 2025
  endDate: new Date(2025, 5, 7),    // June 7, 2025
  goal: "Reduce pain to level 2/10 and restore normal movement",
  notes: "Focus on morning routine to improve mobility throughout the day.",
  selectedExercises: [
    {
      id: 1,
      name: "Cat-Cow Stretch",
      category: "Stretching",
      description: "Gentle movement that loosens the back and warms up the spine.",
      recommendedReps: 5,
      customReps: 5,
      sets: 2,
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: true,
    } as Exercise, // Type casting to ensure it matches the Exercise type
    {
      id: 2,
      name: "Seated Lumbar Rotation",
      category: "Mobility",
      description: "Rotate your upper body while keeping hips stable to increase spinal mobility.",
      recommendedReps: 8,
      customReps: 8,
      sets: 2,
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: true,
    } as Exercise, // Type casting to ensure it matches the Exercise type
    {
      id: 3,
      name: "Standing Hamstring Stretch",
      category: "Flexibility",
      description: "Stretches the hamstring muscles to improve lower back mobility.",
      recommendedReps: 3,
      customReps: 3,
      sets: 1,
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: true,
    } as Exercise, // Type casting to ensure it matches the Exercise type
    {
      id: 4,
      name: "Cold Compress",
      category: "Therapy",
      description: "Apply cold pack to reduce inflammation and pain.",
      recommendedReps: 1,
      customReps: 1,
      sets: 1,
      duration: 15,
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      videoUrl: "#",
      selected: true,
    } as Exercise // Type casting to ensure it matches the Exercise type
  ]
};

// Mock exercise completion data
export const initialCompletedExercises = {
  8: [1, 2] // Day 8 has exercises 1 and 2 completed
};

// Mock difficulty ratings
export const initialDifficultyRatings = {
  1: 3,  // Exercise 1 rated 3/5
  2: 2   // Exercise 2 rated 2/5
};

// Mock pain history data
export const mockPainHistory = [
  { day: 1, level: mockGoalData.painLevel },
  { day: 2, level: 6 },
  { day: 3, level: 5 },
  { day: 4, level: 5 },
  { day: 5, level: 4 },
  { day: 6, level: 4 },
  { day: 7, level: 3 },
  { day: 8, level: 5 },
];

// Mock milestone data
export const mockMilestones = [
  { 
    id: 1, 
    title: "First Week Completed", 
    description: "Complete 7 consecutive days of exercises",
    status: "achieved", 
    icon: "check" 
  },
  { 
    id: 2, 
    title: "50% Pain Reduction", 
    description: "Reduce pain level by half from the starting point",
    status: "in-progress", 
    icon: "activity" 
  },
  { 
    id: 3, 
    title: "All Exercises Completed", 
    description: "Complete all prescribed exercises for the full duration",
    status: "upcoming", 
    icon: "award" 
  }
];

// Mock exercise difficulty data
export const mockExerciseDifficulties = [
  { category: "Stretching", averageDifficulty: 2.3, count: 5 },
  { category: "Mobility", averageDifficulty: 3.1, count: 3 },
  { category: "Flexibility", averageDifficulty: 2.8, count: 2 },
  { category: "Therapy", averageDifficulty: 1.5, count: 1 }
];

// Mock insights data
export const mockInsights = [
  {
    icon: "check",
    title: "Good Progress",
    description: "You've consistently completed your exercises for the past 5 days.",
    color: "green"
  },
  {
    icon: "activity",
    title: "Pain Reduction",
    description: "Your pain has decreased most after completing the Cat-Cow stretch.",
    color: "blue"
  },
  {
    icon: "bar-chart",
    title: "Exercise Patterns",
    description: "You find mobility exercises more challenging than stretching ones.",
    color: "purple"
  }
];

// Helper function for getting exercise emoji
export const getExerciseEmoji = (category: string): string => {
  switch(category.toLowerCase()) {
    case 'stretching':
      return '🧘';
    case 'mobility':
      return '🔄';
    case 'strengthening':
      return '🏋️';
    case 'therapy':
      return '❄️';
    default:
      return '🧍';
  }
};
