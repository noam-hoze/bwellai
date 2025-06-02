
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search } from "lucide-react";
import { Exercise } from "../../CreateGoalWizard";

interface SearchExercisesProps {
  allExercises: Exercise[];
  selectedExercises: Exercise[];
  onAddExercise: (exercise: Exercise) => void;
}

const SearchExercises: React.FC<SearchExercisesProps> = ({
  allExercises,
  selectedExercises,
  onAddExercise
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Clear search when component mounts or when navigating
  useEffect(() => {
    setSearchQuery("");
    setIsSearching(false);
  }, []);
  
  // Filter exercises based on search query
  const filteredExercises = searchQuery.trim() === "" 
    ? [] 
    : allExercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedExercises.some(selected => selected.id === exercise.id)
      );

  const handleAddExercise = (exercise: Exercise) => {
    onAddExercise(exercise);
    // Clear search after adding exercise
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <Card className="border border-gray-200 relative">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center">
          <Search className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="font-medium">Search Exercises</h3>
        </div>
        <div className="relative">
          <Input
            ref={inputRef}
            placeholder="Type exercise name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
            onFocus={() => setIsSearching(searchQuery.length > 0)}
            onBlur={() => {
              // Delay hiding to allow for clicks
              setTimeout(() => setIsSearching(false), 200);
            }}
            className="w-full"
          />
          
          {/* Dropdown positioned absolutely relative to the input */}
          {isSearching && filteredExercises.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-[9999] mt-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl">
              <Command>
                <CommandList className="max-h-40 overflow-y-auto">
                  <CommandGroup>
                    {filteredExercises.slice(0, 5).map(exercise => (
                      <CommandItem
                        key={exercise.id}
                        onSelect={() => handleAddExercise(exercise)}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                            {exercise.category === "Mobility" ? "🔄" : 
                            exercise.category === "Strengthening" ? "🏋️" : 
                            exercise.category === "Stretching" ? "🧘" : "⚖️"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{exercise.name}</p>
                            <p className="text-xs text-gray-500 truncate">{exercise.category}</p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Search by exercise name across all categories to quickly find and add exercises
        </p>
      </CardContent>
    </Card>
  );
};

export default SearchExercises;
