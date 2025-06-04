
import React from "react";
import { Star } from "lucide-react";

interface DifficultyRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

const DifficultyRating = ({ rating, size = "md" }: DifficultyRatingProps) => {
  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const starSize = starSizes[size];

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            rating >= star 
              ? "text-yellow-500 fill-yellow-500" 
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default DifficultyRating;
