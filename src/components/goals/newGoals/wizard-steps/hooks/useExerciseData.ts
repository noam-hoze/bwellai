
import { Exercise } from "../../CreateGoalWizard";

// Mock data for exercises
export const mockExercises: Exercise[] = [
  // Mobility exercises
  {
    id: 1,
    name: "Neck Rotation",
    category: "Mobility",
    description: "Gentle rotation of the neck to improve range of motion",
    recommendedReps: 10,
    customReps: 10,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: true,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  {
    id: 2,
    name: "Shoulder Circles",
    category: "Mobility",
    description: "Circular motion of the shoulders to reduce tension",
    recommendedReps: 10,
    customReps: 10,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: true,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  {
    id: 3,
    name: "Thoracic Spine Rotation",
    category: "Mobility",
    description: "Rotation of the upper spine to improve mobility",
    recommendedReps: 8,
    customReps: 8,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  // Strengthening exercises
  {
    id: 4,
    name: "Wall Angels",
    category: "Strengthening",
    description: "Movement against wall to strengthen upper back",
    recommendedReps: 10,
    customReps: 10,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: true,
    exerciseType: "rep-based",
    frequency: "3x per week"
  },
  {
    id: 5,
    name: "Bird Dog",
    category: "Strengthening",
    description: "Core stabilization exercise on hands and knees",
    recommendedReps: 10,
    customReps: 10,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: true,
    exerciseType: "rep-based",
    frequency: "3x per week"
  },
  {
    id: 6,
    name: "Plank",
    category: "Strengthening",
    description: "Core strengthening in prone position",
    recommendedReps: 0,
    customReps: 0,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "time-based",
    duration: 30,
    frequency: "Daily"
  },
  // Stabilization exercises
  {
    id: 7,
    name: "Deadbug",
    category: "Stabilization",
    description: "Core stabilization exercise on back",
    recommendedReps: 10,
    customReps: 10,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  {
    id: 8,
    name: "Glute Bridge",
    category: "Stabilization",
    description: "Hip and low back stabilization",
    recommendedReps: 15,
    customReps: 15,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: true,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  // Additional exercises as requested
  {
    id: 9,
    name: "Rope Stretching",
    category: "Mobility",
    description: "Dynamic stretching using a rope for improved flexibility",
    recommendedReps: 12,
    customReps: 12,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  {
    id: 10,
    name: "Feet Elevated Hip Thrust",
    category: "Strengthening",
    description: "Advanced hip thrust variation for glute strength",
    recommendedReps: 12,
    customReps: 12,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "3x per week"
  },
  {
    id: 11,
    name: "Birdog Deadbug",
    category: "Stabilization",
    description: "Combination exercise targeting core stability",
    recommendedReps: 10,
    customReps: 10,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "3x per week"
  },
  {
    id: 12,
    name: "Supine Windshield Wiper",
    category: "Mobility",
    description: "Rotational exercise for the lower back and hips",
    recommendedReps: 10,
    customReps: 10,
    sets: 2,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "Daily"
  },
  {
    id: 13,
    name: "Standing Press",
    category: "Strengthening",
    description: "Overhead pressing motion for shoulder strength",
    recommendedReps: 12,
    customReps: 12,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "2x per week"
  },
  {
    id: 14,
    name: "Pallof Press",
    category: "Stabilization",
    description: "Anti-rotation exercise for core stability",
    recommendedReps: 10,
    customReps: 10,
    sets: 3,
    imageUrl: "/placeholder.svg",
    videoUrl: "#",
    selected: false,
    isRecommended: false,
    exerciseType: "rep-based",
    frequency: "3x per week"
  },
];

export const useExerciseData = () => {
  // Extract all exercises for search functionality
  const allExercises = [
    ...mockExercises.filter(ex => ex.category === "Mobility"),
    ...mockExercises.filter(ex => ex.category === "Strengthening"),
    ...mockExercises.filter(ex => ex.category === "Stabilization")
  ];
  
  // Filter exercises by category for tabs
  const mobilityExercises = mockExercises.filter(ex => ex.category === "Mobility");
  const strengthExercises = mockExercises.filter(ex => ex.category === "Strengthening");
  const stabilizationExercises = mockExercises.filter(ex => ex.category === "Stabilization");

  // Get recommended exercises
  const recommendedExercises = mockExercises.filter(ex => ex.isRecommended);

  return {
    allExercises,
    mobilityExercises,
    strengthExercises,
    stabilizationExercises,
    recommendedExercises
  };
};
