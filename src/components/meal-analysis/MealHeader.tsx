
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MealHeaderProps {
  handleBack: () => void;
}

const MealHeader = ({ handleBack }: MealHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <button className="p-2 rounded-full hover:bg-gray-200" onClick={handleBack}>
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Meal Analysis</h1>
        <div className="w-10"></div>
      </div>
    </div>
  );
};

export default MealHeader;
