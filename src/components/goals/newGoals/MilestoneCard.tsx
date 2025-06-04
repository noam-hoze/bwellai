
import React from "react";
import { CheckCircle, Activity, Award } from "lucide-react";

interface MilestoneCardProps {
  title: string;
  description: string;
  status: string;
  icon: string;
}

const MilestoneCard = ({ title, description, status, icon }: MilestoneCardProps) => {
  const getCardStyle = () => {
    switch (status) {
      case "achieved":
        return "bg-green-50 border-green-100";
      case "in-progress":
        return "bg-white border";
      case "upcoming":
        return "bg-white border";
      default:
        return "bg-white border";
    }
  };

  const getBadgeStyle = () => {
    switch (status) {
      case "achieved":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "upcoming":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case "achieved":
        return "Achieved";
      case "in-progress":
        return "In Progress";
      case "upcoming":
        return "Upcoming";
      default:
        return "Pending";
    }
  };

  const renderIcon = () => {
    const iconClasses = status === "upcoming" ? "text-gray-400" : 
                        status === "achieved" ? "text-green-600" : "text-blue-600";
    
    switch (icon) {
      case "check":
        return <CheckCircle className={`h-5 w-5 ${iconClasses}`} />;
      case "activity":
        return <Activity className={`h-5 w-5 ${iconClasses}`} />;
      case "award":
        return <Award className={`h-5 w-5 ${iconClasses}`} />;
      default:
        return <CheckCircle className={`h-5 w-5 ${iconClasses}`} />;
    }
  };

  return (
    <div className={`p-4 rounded-lg flex items-start justify-between ${getCardStyle()}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${status === "achieved" ? "bg-green-100" : "bg-gray-100"} flex-shrink-0`}>
          {renderIcon()}
        </div>
        <div>
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full ${getBadgeStyle()}`}>
        {getBadgeText()}
      </span>
    </div>
  );
};

export default MilestoneCard;
