
import { Activity as ActivityIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

interface ActivityHeaderProps {
  viewType: "day" | "week" | "month";
  onViewTypeChange: (value: "day" | "week" | "month") => void;
}

const ActivityHeader = ({ viewType, onViewTypeChange }: ActivityHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <ActivityIcon className="h-8 w-8 text-blue-500" />
        Activity Tracking
      </h1>
      
      <Tabs 
        value={viewType} 
        onValueChange={(value) => onViewTypeChange(value as "day" | "week" | "month")}
        className="w-full md:w-auto"
      >
        <TabsList className="grid grid-cols-3 w-full md:w-[300px]">
          <TabsTrigger 
            value="day" 
            className="flex items-center gap-1 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            Day
          </TabsTrigger>
          <TabsTrigger 
            value="week" 
            className="flex items-center gap-1 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            Week
          </TabsTrigger>
          <TabsTrigger 
            value="month" 
            className="flex items-center gap-1 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ActivityHeader;
