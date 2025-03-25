
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartLine, Edit, Pencil } from "lucide-react";

interface MealDetailHeaderProps {
  isEditing: boolean;
  toggleEditMode: () => void;
  handleViewAnalysis: () => void;
  handleOpenEditModal: () => void;
}

const MealDetailHeader = ({ 
  isEditing, 
  toggleEditMode, 
  handleViewAnalysis, 
  handleOpenEditModal 
}: MealDetailHeaderProps) => {
  return (
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
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={toggleEditMode}
          >
            <Pencil className="h-4 w-4" />
            <span>{isEditing ? "Cancel Edit" : "Quick Edit"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleOpenEditModal}
          >
            <Edit className="h-4 w-4" />
            <span>Advanced Edit</span>
          </Button>
        </div>
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-500">
        {isEditing 
          ? "You're in edit mode. Make changes and save when ready." 
          : "View and log this meal to your daily intake."}
      </DialogDescription>
    </DialogHeader>
  );
};

export default MealDetailHeader;
