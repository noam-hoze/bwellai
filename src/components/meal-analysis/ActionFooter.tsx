
import { Button } from "@/components/ui/button";
import { Star, Edit, Utensils } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ActionFooterProps {
  isFavorite: boolean;
  handleToggleFavorite: () => void;
  handleEditMeal: () => void;
  handleLogMeal: () => void;
}

const ActionFooter = ({ 
  isFavorite, 
  handleToggleFavorite, 
  handleEditMeal, 
  handleLogMeal 
}: ActionFooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto flex gap-2">
        <Button 
          variant="outline" 
          size={isMobile ? "icon" : "default"}
          className={`${isMobile ? "flex-none" : "flex-1"} ${isFavorite ? 'text-yellow-500' : ''}`}
          onClick={handleToggleFavorite}
        >
          <Star className={`h-4 w-4 ${!isMobile && "mr-1"} ${isFavorite ? 'fill-current' : ''}`} />
          {!isMobile && (isFavorite ? 'Favorited' : 'Favorites')}
        </Button>
        <Button 
          variant="outline" 
          size={isMobile ? "icon" : "default"}
          className={`${isMobile ? "flex-none" : "flex-1"} border-blue-500 text-blue-500`}
          onClick={handleEditMeal}
        >
          <Edit className="h-4 w-4" />
          {!isMobile && "Edit Meal"}
        </Button>
        <Button 
          className={`${isMobile ? "flex-1" : "flex-[2]"} bg-wellness-bright-green hover:bg-wellness-green-gradient text-white`}
          onClick={handleLogMeal}
        >
          <Utensils className="h-4 w-4 mr-1" />
          Log Again
        </Button>
      </div>
    </div>
  );
};

export default ActionFooter;
