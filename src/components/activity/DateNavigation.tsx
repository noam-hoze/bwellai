
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DateNavigationProps {
  dateDisplay: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  isToday: boolean;
}

const DateNavigation = ({
  dateDisplay,
  onPrevious,
  onNext,
  onToday,
  isToday
}: DateNavigationProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onPrevious}
        className={`flex items-center ${isMobile ? 'px-2' : 'gap-1'}`}
      >
        <ChevronLeft className="h-4 w-4" />
        {!isMobile && "Previous"}
      </Button>
      
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-500" />
        <span className={`font-medium ${isMobile ? 'text-sm' : 'text-lg'}`}>{dateDisplay}</span>
        {!isToday && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToday}
            className="ml-2"
          >
            Today
          </Button>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onNext}
        disabled={isToday}
        className={`flex items-center ${isMobile ? 'px-2' : 'gap-1'}`}
      >
        {!isMobile && "Next"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateNavigation;
