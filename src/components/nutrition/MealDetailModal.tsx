
import { useState } from "react";
import { X, Edit, Check, Star, Tag, ChartLine, Save, Plus, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MealAnalysisModal from "./MealAnalysisModal";
import { toast } from "sonner";

interface MealDetailModalProps {
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
  };
}

const MealDetailModal = ({ open, onOpenChange, meal }: MealDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveAsRecurring, setSaveAsRecurring] = useState(false);
  const [mealType, setMealType] = useState(meal?.type || "Breakfast");
  const [notes, setNotes] = useState(meal?.notes || "");
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const handleSave = () => {
    // TODO: Implement saving logic
    console.log("Saving meal with recurring:", saveAsRecurring);
    console.log("Meal type:", mealType);
    console.log("Notes:", notes);
    
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleLogMeal = () => {
    // TODO: Implement meal logging logic
    toast.success(`${meal?.name} logged successfully!`);
    onOpenChange(false);
    // Show analysis modal automatically after logging the meal
    setAnalysisOpen(true);
  };

  const handleViewAnalysis = () => {
    setAnalysisOpen(true);
  };

  if (!meal) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Meal Details</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleViewAnalysis}
                >
                  <ChartLine className="h-4 w-4" />
                  <span>Analysis</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {isEditing ? (
              <Input defaultValue={meal.name} className="text-xl font-bold" />
            ) : (
              <h2 className="text-xl font-bold">{meal.name}</h2>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="text-lg font-semibold">{meal.calories} kcal</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="text-lg font-semibold">{meal.protein}g</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="text-lg font-semibold">{meal.carbs}g</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="text-lg font-semibold">{meal.fat}g</p>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Meal Type</Label>
              <Select 
                value={mealType} 
                onValueChange={setMealType}
                disabled={!isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                    <SelectItem value="Pre-Workout">Pre-Workout</SelectItem>
                    <SelectItem value="Post-Workout">Post-Workout</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Ingredients</Label>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {meal.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <Label htmlFor="notes" className="mb-2 block">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add notes about this meal..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!isEditing}
                className="resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="save-recurring" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Save as recurring meal
              </Label>
              <Switch 
                id="save-recurring" 
                checked={saveAsRecurring}
                onCheckedChange={setSaveAsRecurring} 
                disabled={!isEditing}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start mt-4">
            {isEditing ? (
              <Button type="button" onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="lg" 
                className="w-full"
                onClick={handleLogMeal}
              >
                <Utensils className="h-4 w-4" />
                Log Meal
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MealAnalysisModal
        open={analysisOpen}
        onOpenChange={setAnalysisOpen}
        meal={meal}
      />
    </>
  );
};

export default MealDetailModal;
