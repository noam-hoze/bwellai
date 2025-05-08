
import MealDateSelector from "@/components/nutrition/meal-detail/MealDateSelector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MealTypeSelectorProps {
  selectedDate: string;
  mealType: string;
  setSelectedDate: (date: string) => void;
  setMealType: (type: string) => void;
}

const MealTypeSelector = ({ selectedDate, mealType, setSelectedDate, setMealType }: MealTypeSelectorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="mb-4">
        <MealDateSelector
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Meal Type</h3>
        <RadioGroup 
          value={mealType} 
          onValueChange={setMealType}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Breakfast" id="breakfast" />
            <Label htmlFor="breakfast">Breakfast</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Lunch" id="lunch" />
            <Label htmlFor="lunch">Lunch</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Dinner" id="dinner" />
            <Label htmlFor="dinner">Dinner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Snack" id="snack" />
            <Label htmlFor="snack">Snack</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default MealTypeSelector;
