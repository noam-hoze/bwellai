
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Save, Utensils } from "lucide-react";

interface MealActionFooterProps {
  isEditing: boolean;
  handleSave: () => void;
  handleLogMeal: () => void;
}

const MealActionFooter = ({ isEditing, handleSave, handleLogMeal }: MealActionFooterProps) => {
  return (
    <DialogFooter className="sm:justify-start mt-4">
      {isEditing ? (
        <Button type="button" onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-1" />
          Save Changes
        </Button>
      ) : (
        <Button 
          variant="default" 
          size="lg" 
          className="w-full"
          onClick={handleLogMeal}
        >
          <Utensils className="h-4 w-4 mr-1" />
          Log Meal
        </Button>
      )}
    </DialogFooter>
  );
};

export default MealActionFooter;
