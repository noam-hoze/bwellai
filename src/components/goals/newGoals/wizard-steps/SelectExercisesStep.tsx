import React, { useState } from "react";
import { GoalData, Exercise } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Video, Plus, Check, Search } from "lucide-react";
import { 
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

// Mock data for exercises
const mockExercises: Exercise[] = [
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

interface SelectExercisesStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const SelectExercisesStep: React.FC<SelectExercisesStepProps> = ({
  goalData,
  updateGoalData
}) => {
  const [activeTab, setActiveTab] = useState("mobility");
  const [searchQuery, setSearchQuery] = useState("ro"); // Pre-filled with "ro" to show search results by default
  const [isSearching, setIsSearching] = useState(true); // Set to true to show the dropdown initially
  
  // Extract all exercises for search functionality
  const allExercises = [
    ...mockExercises.filter(ex => ex.category === "Mobility"),
    ...mockExercises.filter(ex => 
      ex.category === "Strengthening"
    ),
    ...mockExercises.filter(ex => ex.category === "Stabilization")
  ];
  
  // Filter exercises based on search query
  const filteredExercises = searchQuery.trim() === "" 
    ? [] 
    : allExercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !goalData.selectedExercises.some(selected => selected.id === exercise.id)
      );
  
  const handleAddExercise = (exercise: Exercise) => {
    const updatedExercise = { ...exercise, selected: true };
    const updatedExercises = [...goalData.selectedExercises, updatedExercise];
    updateGoalData({ selectedExercises: updatedExercises });
    // Keep the search active to show the autocomplete list
    // setSearchQuery("");
    // setIsSearching(false);
  };

  const handleRemoveExercise = (exerciseId: number) => {
    const updatedExercises = goalData.selectedExercises.filter(
      exercise => exercise.id !== exerciseId
    );
    updateGoalData({ selectedExercises: updatedExercises });
  };

  const isExerciseSelected = (exerciseId: number) => {
    return goalData.selectedExercises.some(exercise => exercise.id === exerciseId);
  };

  // Filter exercises by category for tabs
  const mobilityExercises = mockExercises.filter(ex => ex.category === "Mobility");
  const strengthExercises = mockExercises.filter(ex => 
    ex.category === "Strengthening"
  );
  const stabilizationExercises = mockExercises.filter(ex => ex.category === "Stabilization");

  // Get recommended exercises
  const recommendedExercises = mockExercises.filter(ex => ex.isRecommended);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exercise Selection</h2>
        <Badge variant="secondary" className="bg-wellness-light-green text-wellness-bright-green">
          Selected: {goalData.selectedExercises.length} exercises
        </Badge>
      </div>
      
      {/* Quick search for exercises */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center">
            <Search className="h-4 w-4 mr-2 text-gray-500" />
            <h3 className="font-medium">Search Exercises</h3>
          </div>
          <div className="relative">
            <Input
              placeholder="Type exercise name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearching(true)}
              className="w-full"
              autoFocus // Auto focus to immediately show the dropdown
            />
            {isSearching && (
              <Command className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
                <CommandList>
                  {filteredExercises.length === 0 ? (
                    <CommandEmpty>No exercises found</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredExercises.map(exercise => (
                        <CommandItem
                          key={exercise.id}
                          onSelect={() => handleAddExercise(exercise)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-sm">
                              {exercise.category === "Mobility" ? "🔄" : 
                              exercise.category === "Strengthening" ? "🏋️" : 
                              exercise.category === "Stretching" ? "🧘" : "⚖️"}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{exercise.name}</p>
                              <p className="text-xs text-gray-500">{exercise.category}</p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Search by exercise name across all categories to quickly find and add exercises
          </p>
        </CardContent>
      </Card>
      
      {goalData.selectedExercises.length > 0 && (
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Selected Exercises</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {goalData.selectedExercises.map(exercise => (
                <div 
                  key={exercise.id} 
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-xl mr-3">
                      {exercise.category === "Mobility" ? "🔄" : 
                       exercise.category === "Strengthening" ? "🏋️" : 
                       exercise.category === "Stretching" ? "🧘" : "⚖️"}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                      <p className="text-xs text-gray-500">{exercise.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => console.log("Preview exercise", exercise.id)}
                    >
                      <Video className="h-4 w-4" />
                      <span className="sr-only">Preview</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {recommendedExercises.length > 0 && (
        <Card className="border border-blue-200">
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="font-medium">Recommended Exercises</h3>
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">Recommended</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recommendedExercises.map(exercise => (
                <div 
                  key={exercise.id} 
                  className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-xl mr-3">
                      {exercise.category === "Mobility" ? "🔄" : 
                       exercise.category === "Strengthening" ? "🏋️" : 
                       exercise.category === "Stretching" ? "🧘" : "⚖️"}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                      <p className="text-xs text-gray-500">
                        {exercise.description}
                        <span className="ml-2">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                            {exercise.category}
                          </Badge>
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isExerciseSelected(exercise.id) ? "secondary" : "default"}
                    className={isExerciseSelected(exercise.id) ? "bg-blue-100 text-blue-800" : "bg-blue-500"}
                    disabled={isExerciseSelected(exercise.id)}
                    onClick={() => handleAddExercise(exercise)}
                  >
                    {isExerciseSelected(exercise.id) ? (
                      <>
                        <Check className="mr-1 h-3 w-3" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="mr-1 h-3 w-3" /> Add
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Exercise Categories</h3>
        <Tabs defaultValue="mobility" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="mobility">Mobility</TabsTrigger>
            <TabsTrigger value="stabilization">Stabilize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mobility" className="mt-4">
            <div className="max-h-80 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mobilityExercises.map(exercise => (
                  <Card key={exercise.id} className="border border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-xl mr-3">
                            🔄
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{exercise.name}</h4>
                            <p className="text-xs text-gray-500">
                              {exercise.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isExerciseSelected(exercise.id) ? "secondary" : "default"}
                          disabled={isExerciseSelected(exercise.id)}
                          onClick={() => handleAddExercise(exercise)}
                        >
                          {isExerciseSelected(exercise.id) ? (
                            <>
                              <Check className="mr-1 h-3 w-3" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-3 w-3" /> Add
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stabilization" className="mt-4">
            <div className="max-h-80 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stabilizationExercises.map(exercise => (
                  <Card key={exercise.id} className="border border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center text-xl mr-3">
                            ⚖️
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{exercise.name}</h4>
                            <p className="text-xs text-gray-500">
                              {exercise.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isExerciseSelected(exercise.id) ? "secondary" : "default"}
                          disabled={isExerciseSelected(exercise.id)}
                          onClick={() => handleAddExercise(exercise)}
                        >
                          {isExerciseSelected(exercise.id) ? (
                            <>
                              <Check className="mr-1 h-3 w-3" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="mr-1 h-3 w-3" /> Add
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SelectExercisesStep;
