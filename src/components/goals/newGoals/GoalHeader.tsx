
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateRange } from "@/utils/dateUtils";
import { useDeleteUserGoal } from "@/service/hooks/goal/useGetGoal";

interface GoalHeaderProps {
  goalType: string;
  startDate: Date;
  endDate: Date;
  completionPercentage: number;
  streak: number; // Days in streak
  onEditGoal?: () => void; // Add this prop for edit functionality
  duration: number;
  goalId: string; 
}

const GoalHeader = ({ 
  goalType, 
  startDate, 
  endDate, 
  completionPercentage, 
  streak,
  duration,
  onEditGoal,
  goalId
}: GoalHeaderProps) => {
  const navigate = useNavigate();
  const dateRangeDisplay = formatDateRange(startDate, endDate);

  const { deleteUserGoal } = useDeleteUserGoal();

  const deleteGoalHandler = useCallback(() => {
    console.log("Deleting goal with ID:", goalId);
    deleteUserGoal(goalId);
    console.log("Goal deleted successfully");
    navigate('/goals'); // Redirect to goals page after deletion
  }, [deleteUserGoal, goalId]);

  const handleShareReport = () => {
    // Generate a unique report ID - in a real app this would come from the backend
    const reportId = `report-${Date.now()}`;
    const shareUrl = `/shared-treatment-report/${reportId}`;
    
    // Navigate to the shared report page
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="mr-2" 
            onClick={() => navigate('/goals')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{goalType}</h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={onEditGoal}
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={deleteGoalHandler}
          >
            <Trash2 className="h-4 w-4 text-gray-600" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={handleShareReport}
          >
            <Share className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
      <div className="flex items-center ml-10 space-x-4 text-sm">
        <div className="text-gray-600">{duration}-Day Program • {dateRangeDisplay}</div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mr-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-700">{completionPercentage}%</span>
        </div>
        {/*<div className="flex items-center text-amber-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
          </svg>
          <span>{streak} days</span>
        </div>*/}
      </div>
    </div>
  );
};

export default GoalHeader;
