
import React from "react";
import { GoalData } from "../types/goalTypes";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const bodyAreas = [
  {
    id: "neck",
    name: "Neck",
    description: "Cervical spine & neck muscles",
    imageUrl: "/lovable-uploads/ac1d0245-4f81-443d-b188-3eb2e4d160c7.png"
  },
  {
    id: "upper_back",
    name: "Upper/Middle Back",
    description: "Thoracic spine & surrounding muscles",
    imageUrl: "/lovable-uploads/c82d12f2-25aa-4213-88cd-533cec2fff63.png"
  },
  {
    id: "lower_back",
    name: "Lower Back",
    description: "Lumbar spine & lower back muscles",
    imageUrl: "/lovable-uploads/292c7b2f-379a-4102-8f8d-2f779004809b.png"
  },
  {
    id: "pelvis",
    name: "Pelvis",
    description: "Pelvis & surrounding structures",
    imageUrl: "/lovable-uploads/ca56eb6f-7946-48bd-9d19-f354a1b932c6.png"
  },
  {
    id: "hip",
    name: "Hip",
    description: "Hip joint & surrounding muscles",
    imageUrl: "/lovable-uploads/a90c4565-2914-4d25-89e0-297908912403.png"
  },
  {
    id: "knee",
    name: "Knee",
    description: "Knee joint & surrounding structures",
    imageUrl: "/lovable-uploads/d7268c72-011c-45d3-8b5e-599565846313.png"
  },
  {
    id: "ankle_foot",
    name: "Ankle & Foot",
    description: "Ankle, foot & surrounding structures",
    imageUrl: "/lovable-uploads/3db3c82e-0cf3-4888-bd9d-2b8e0c7de437.png"
  },
  {
    id: "shoulder",
    name: "Shoulder",
    description: "Shoulder joint & surrounding muscles",
    imageUrl: "/lovable-uploads/dac5b641-fb68-4e0c-ae99-f06c5e5c5c4b.png"
  },
  {
    id: "elbow",
    name: "Elbow",
    description: "Elbow joint & surrounding structures",
    imageUrl: "/lovable-uploads/cb2ddbda-4493-49aa-9cd5-cb3e497afeed.png"
  },
  {
    id: "wrist",
    name: "Wrist",
    description: "Wrist joint & surrounding structures",
    imageUrl: "/lovable-uploads/f52552d6-278b-4be4-bf91-1a08747abf32.png"
  },
  {
    id: "hand",
    name: "Hand",
    description: "Hand & finger joints and structures",
    imageUrl: "/lovable-uploads/4941163a-eb32-4841-806a-51a837a322c1.png"
  }
];

interface SelectPainAreaStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const SelectPainAreaStep: React.FC<SelectPainAreaStepProps> = ({ 
  goalData, 
  updateGoalData 
}) => {
  const handleSelectArea = (areaId: string) => {
    updateGoalData({ bodyArea: areaId });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Your Pain Area</h2>
      <p className="text-gray-600">
        Choose the specific area where you're experiencing pain to create a targeted treatment plan.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {bodyAreas.map((area) => (
          <Card 
            key={area.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md border-2",
              goalData.bodyArea === area.id 
                ? "border-wellness-bright-green bg-green-50" 
                : "border-transparent hover:border-gray-300"
            )}
            onClick={() => handleSelectArea(area.id)}
          >
            <CardContent className="p-3 flex items-center">
              <div className="w-12 h-12 rounded-md mr-3 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={area.imageUrl} 
                  alt={area.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium text-sm">{area.name}</h3>
                <p className="text-xs text-gray-500">{area.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectPainAreaStep;
