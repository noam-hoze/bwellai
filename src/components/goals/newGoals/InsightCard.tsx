
import React from "react";
import { CheckCircle, Activity, BarChart } from "lucide-react";

interface InsightCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const InsightCard = ({ icon, title, description, color }: InsightCardProps) => {
  const getIconBgColor = (color: string) => {
    if (color === "green") return "bg-green-100";
    if (color === "blue") return "bg-blue-100";
    if (color === "purple") return "bg-purple-100";
    return "bg-gray-100";
  };

  const getIconColor = (color: string) => {
    if (color === "green") return "text-green-600";
    if (color === "blue") return "text-blue-600";
    if (color === "purple") return "text-purple-600";
    return "text-gray-600";
  };

  const renderIcon = () => {
    switch (icon) {
      case "check":
        return <CheckCircle className={`h-5 w-5 ${getIconColor(color)}`} />;
      case "activity":
        return <Activity className={`h-5 w-5 ${getIconColor(color)}`} />;
      case "bar-chart":
        return <BarChart className={`h-5 w-5 ${getIconColor(color)}`} />;
      default:
        return <CheckCircle className={`h-5 w-5 ${getIconColor(color)}`} />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 border rounded-lg bg-white">
      <div className={`p-2 rounded-full ${getIconBgColor(color)} flex-shrink-0`}>
        {renderIcon()}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default InsightCard;
