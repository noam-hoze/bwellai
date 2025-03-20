
import { Moon } from "lucide-react";

const SleepHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Moon className="h-8 w-8 text-purple-500" />
          Sleep Patterns
        </h1>
      </div>
    </div>
  );
};

export default SleepHeader;
