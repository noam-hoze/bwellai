import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import MealAnalysisModal from "./MealAnalysisModal";
import EditMealModal from "./EditMeelModal";
import MealDetailHeader from "./meal-detail/MealDetailHeader";
import MealNutritionInfo from "./meal-detail/MealNutritionInfo";
import MealMetadata from "./meal-detail/MealMetadata";
import MealActionFooter from "./meal-detail/MealActionFooter";

interface MealDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?;
  refetchLoggedMeals;
}

const MealDetailModal = ({
  open,
  onOpenChange,
  meal,
  refetchLoggedMeals,
}: MealDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveAsRecurring, setSaveAsRecurring] = useState(false);
  const [mealType, setMealType] = useState(meal?.type || "Breakfast");
  const [notes, setNotes] = useState(meal?.notes || "");
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(meal);

  const handleSave = () => {
    // TODO: Implement saving logic
    console.log("Saving meal with recurring:", saveAsRecurring);
    console.log("Meal type:", mealType);
    console.log("Notes:", notes);

    setIsEditing(false);
    toast.success(`${meal?.name} saved successfully!`);
    onOpenChange(false);
  };

  const handleLogMeal = () => {
    // TODO: Implement meal logging logic
    toast.success(`${meal?.name} logged successfully!`);
    onOpenChange(false);
  };

  const handleViewAnalysis = () => {
    setAnalysisOpen(true);
  };

  const handleOpenEditModal = () => {
    console.log("Opening edit modal");
    setEditModalOpen(true);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      toast.info("Edit mode activated. Make your changes and save when done.");
    }
  };

  const handleSaveMeal = (updatedMeal) => {
    setCurrentMeal(updatedMeal);
    // In a real app, you would update the meal in the database
    console.log("Updated meal:", updatedMeal);
  };

  if (!meal) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <MealDetailHeader
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            handleViewAnalysis={handleViewAnalysis}
            handleOpenEditModal={handleOpenEditModal}
          />

          <div className="space-y-6">
            {isEditing ? (
              <Input
                defaultValue={currentMeal?.food_name || meal?.food_name}
                className="text-xl font-bold"
              />
            ) : (
              <h2 className="text-xl font-bold">
                {currentMeal?.food_name || meal?.food_name}
              </h2>
            )}

            <MealNutritionInfo
              isEditing={isEditing}
              currentMeal={currentMeal || meal}
              originalMeal={meal}
            />

            <MealMetadata
              isEditing={isEditing}
              mealType={mealType}
              notes={notes}
              saveAsRecurring={saveAsRecurring}
              ingredients={meal.ingredients}
              setMealType={setMealType}
              setNotes={setNotes}
              setSaveAsRecurring={setSaveAsRecurring}
              handleOpenEditModal={handleOpenEditModal}
              currentMeal={currentMeal}
            />
          </div>

          <MealActionFooter
            isEditing={isEditing}
            handleSave={handleSave}
            handleLogMeal={handleLogMeal}
          />
        </DialogContent>
      </Dialog>

      <MealAnalysisModal
        open={analysisOpen}
        onOpenChange={setAnalysisOpen}
        meal={currentMeal || meal}
        refetchLoggedMeals={refetchLoggedMeals}
      />

      <EditMealModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        meal={currentMeal || meal}
        onSave={handleSaveMeal}
      />
    </>
  );
};

export default MealDetailModal;
