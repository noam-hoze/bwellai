
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  bgColor?: string;
  className?: string;
}

const ActionCard = ({ 
  icon, 
  label, 
  onClick, 
  bgColor = "bg-white",
  className
}: ActionCardProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "action-card flex flex-col items-center justify-center py-3 px-4 gap-2",
        bgColor,
        className
      )}
    >
      <div className="text-gray-800">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default ActionCard;
