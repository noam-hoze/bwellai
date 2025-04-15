import { Activity as ActivityIcon } from "lucide-react";

const ActivityHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <ActivityIcon className="h-8 w-8 text-blue-500" />
        Activity Tracking
      </h1>
    </div>
  );
};

export default ActivityHeader;
