import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";

interface MealMetadataProps {
  isEditing: boolean;
  mealType: string;
  notes: string;
  saveAsRecurring: boolean;
  ingredients;
  setMealType: (value: string) => void;
  setNotes: (value: string) => void;
  setSaveAsRecurring: (value: boolean) => void;
  handleOpenEditModal: () => void;
  currentMeal?;
}

const MealMetadata = ({
  isEditing,
  mealType,
  notes,
  saveAsRecurring,
  ingredients,
  setMealType,
  setNotes,
  setSaveAsRecurring,
  handleOpenEditModal,
  currentMeal,
}: MealMetadataProps) => {
  return (
    <>
      <div>
        <Label className="mb-2 block">Meal Type</Label>
        <Select
          value={currentMeal?.type || mealType}
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
          {ingredients?.map((ingredient, idx) => (
            <li key={idx}>{ingredient?.name}</li>
          ))}
        </ul>
        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full flex items-center justify-center"
            onClick={handleOpenEditModal}
          >
            <Plus className="h-4 w-4 mr-1" />
            Edit Ingredients
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="notes" className="mb-2 block">
          Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Add notes about this meal..."
          value={currentMeal?.notes || notes}
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
    </>
  );
};

export default MealMetadata;
