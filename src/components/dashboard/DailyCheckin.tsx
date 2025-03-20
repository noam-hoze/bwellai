
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Moon, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailyCheckin = () => {
  const [sleepRating, setSleepRating] = useState<number | null>(null);
  const { toast } = useToast();

  const handleRateSleep = (rating: number) => {
    setSleepRating(rating);
    toast({
      title: "Sleep recorded",
      description: `Your sleep quality has been saved. Thank you for checking in!`,
    });
  };

  return (
    <Card className="wellness-card border-l-4 border-l-purple-400 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="h-5 w-5 text-purple-500" />
          Daily Check-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label className="text-base font-medium">How was your sleep last night?</Label>
          
          <div className="flex justify-between items-center pt-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRateSleep(rating)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                  sleepRating === rating
                    ? "bg-purple-100 scale-110 shadow-sm"
                    : "hover:bg-gray-100"
                }`}
              >
                {rating <= 2 ? (
                  <ThumbsDown className={`h-6 w-6 ${sleepRating === rating ? "text-red-500" : "text-gray-400"}`} />
                ) : rating >= 4 ? (
                  <ThumbsUp className={`h-6 w-6 ${sleepRating === rating ? "text-green-500" : "text-gray-400"}`} />
                ) : (
                  <div className={`h-6 w-6 rounded-full border-2 ${sleepRating === rating ? "border-yellow-500" : "border-gray-300"}`} />
                )}
                <span className={`text-sm mt-1 ${sleepRating === rating ? "font-medium" : "text-gray-500"}`}>
                  {rating}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCheckin;
