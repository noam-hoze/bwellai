
import { ArrowLeft, ArrowRight, Star, AlertTriangle, Check, Brain, BarChart, Dumbbell } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface MealAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?: {
    id: number;
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    notes?: string;
    image?: string;
  };
}

const MealAnalysisModal = ({ open, onOpenChange, meal }: MealAnalysisModalProps) => {
  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between p-4 bg-white sticky top-0 z-10 border-b">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">Meal Analysis</h2>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Meal Image */}
          <div className="bg-slate-200 h-56 flex items-center justify-center">
            {meal.image ? (
              <img 
                src={meal.image} 
                alt={meal.name} 
                className="max-h-full object-cover"
              />
            ) : (
              <p className="text-xl text-white font-medium">Breakfast Meal Photo</p>
            )}
          </div>

          {/* Rating & Summary */}
          <div className="px-4 py-3 bg-white">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Star className="w-6 h-6 fill-gray-800 text-gray-800 mr-2" />
                <span className="text-2xl font-bold">7/10</span>
              </div>
              <Badge variant="outline" className="text-base px-3 py-1 bg-gray-100">
                Moderate
              </Badge>
            </div>
            <p className="text-gray-700">
              This meal is balanced but has a slightly high sugar content due to syrup.
            </p>
          </div>

          <Separator />

          {/* Macronutrients */}
          <div className="px-4 py-3 bg-white">
            <h3 className="text-xl font-bold mb-4">Macronutrients</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg px-2 py-3 text-center">
                <p className="text-xl font-bold">350</p>
                <p className="text-gray-500 text-sm">kcal</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-2 py-3 text-center">
                <p className="text-xl font-bold">15g</p>
                <p className="text-gray-500 text-sm">Protein</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-2 py-3 text-center">
                <p className="text-xl font-bold">45g</p>
                <p className="text-gray-500 text-sm">Carbs</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-2 py-3 text-center">
                <p className="text-xl font-bold">10g</p>
                <p className="text-gray-500 text-sm">Fats</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Health Impact */}
          <div className="px-4 py-3 bg-white">
            <h3 className="text-xl font-bold mb-4">Health Impact</h3>
            
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium">Blood Sugar Impact</p>
              <Badge variant="outline" className="bg-gray-100">Moderate</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="font-medium">Satiety Level</p>
              <Badge variant="outline" className="bg-gray-100">Medium</Badge>
            </div>
          </div>

          <Separator />

          {/* Ingredients Analysis */}
          <div className="px-4 py-3 bg-white">
            <h3 className="text-xl font-bold mb-4">Ingredients Analysis</h3>
            
            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-red-100 p-1 rounded-full mr-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <h4 className="font-bold">Bad Ingredients</h4>
              </div>
              <p className="text-gray-700">Syrup (High in added sugar)</p>
            </div>
            
            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-gray-200 p-1 rounded-full mr-2">
                  <span className="flex h-5 w-5 text-gray-500 items-center justify-center font-bold">−</span>
                </div>
                <h4 className="font-bold">Neutral Ingredients</h4>
              </div>
              <p className="text-gray-700">Butter (Moderate consumption)</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="font-bold">Good Ingredients</h4>
              </div>
              <p className="text-gray-700">Whole Wheat Pancakes, Greek Yogurt</p>
            </div>
          </div>

          <Separator />

          {/* Smart Insights */}
          <div className="px-4 py-3 bg-white">
            <h3 className="text-xl font-bold mb-4">Smart Insights</h3>
            
            <div className="mb-3 bg-gray-50 p-3 rounded-lg">
              <div className="flex">
                <div className="mr-3">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-gray-700">Your sugar intake is consistently high during breakfast.</p>
              </div>
            </div>
            
            <div className="mb-3 bg-gray-50 p-3 rounded-lg">
              <div className="flex">
                <div className="mr-3">
                  <BarChart className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-gray-700">This meal appears 3 times this week.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex">
                <div className="mr-3">
                  <Dumbbell className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-gray-700">Add more protein for morning exercises.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealAnalysisModal;
