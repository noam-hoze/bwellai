
import React from "react";
import { Separator } from "@/components/ui/separator";

interface SleepPossibleReasonsProps {
  date: Date;
}

const SleepPossibleReasons: React.FC<SleepPossibleReasonsProps> = ({ date }) => {
  // Mock data for demonstration
  const reasons = [
    "You ate at 11:00 PM – late meals can disrupt sleep.",
    "You used your phone before bed – blue light can reduce melatonin.",
    "Your activity level was low today – light exercise can improve deep sleep."
  ];
  
  return (
    <div className="space-y-4">
      {reasons.map((reason, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Separator className="my-3" />}
          <p className="text-gray-700">{reason}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SleepPossibleReasons;
