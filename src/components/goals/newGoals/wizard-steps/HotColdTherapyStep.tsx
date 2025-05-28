import React from "react";
import { GoalData, Therapy } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MinusCircle, Plus, PlusCircle, X } from "lucide-react";

// Mock data for therapy options
const therapyOptions: Therapy[] = [
  {
    id: 1,
    name: "Cold Compress",
    description: "Applies cold to reduce inflammation and pain",
    type: "cold",
    duration: 15,
    timesPerDay: 3,
    whenToApply: "After activity",
    selected: false
  },
  {
    id: 2,
    name: "Heat Therapy",
    description: "Applies heat to improve circulation and relax muscles",
    type: "heat",
    duration: 20,
    timesPerDay: 2,
    whenToApply: "Before stretching",
    selected: false
  }
];

interface HotColdTherapyStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const HotColdTherapyStep: React.FC<HotColdTherapyStepProps> = ({
  goalData,
  updateGoalData
}) => {
  const handleAddTherapy = (therapy: Therapy) => {
    const updatedTherapy = { ...therapy, selected: true };
    const updatedTherapies = [...goalData.selectedTherapies, updatedTherapy];
    updateGoalData({ selectedTherapies: updatedTherapies });
  };

  const handleRemoveTherapy = (therapyId: number) => {
    const updatedTherapies = goalData.selectedTherapies.filter(
      therapy => therapy.id !== therapyId
    );
    updateGoalData({ selectedTherapies: updatedTherapies });
  };

  const updateTherapy = (therapyId: number, updates: Partial<Therapy>) => {
    const updatedTherapies = goalData.selectedTherapies.map(therapy => {
      if (therapy.id === therapyId) {
        return { ...therapy, ...updates };
      }
      return therapy;
    });
    
    updateGoalData({ selectedTherapies: updatedTherapies });
  };

  const incrementValue = (therapy: Therapy, field: 'duration' | 'timesPerDay') => {
    if (field === 'duration') {
      updateTherapy(therapy.id, { duration: therapy.duration + 5 });
    } else {
      updateTherapy(therapy.id, { timesPerDay: therapy.timesPerDay + 1 });
    }
  };

  const decrementValue = (therapy: Therapy, field: 'duration' | 'timesPerDay') => {
    if (field === 'duration') {
      updateTherapy(therapy.id, { duration: Math.max(5, therapy.duration - 5) });
    } else {
      updateTherapy(therapy.id, { timesPerDay: Math.max(1, therapy.timesPerDay - 1) });
    }
  };

  const handleInputChange = (
    therapy: Therapy, 
    field: 'duration' | 'timesPerDay', 
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    
    if (field === 'duration') {
      updateTherapy(therapy.id, { duration: Math.max(5, numValue) });
    } else {
      updateTherapy(therapy.id, { timesPerDay: Math.max(1, numValue) });
    }
  };

  const isTherapySelected = (therapyId: number) => {
    return goalData.selectedTherapies.some(therapy => therapy.id === therapyId);
  };

  const availableTherapies = therapyOptions.filter(
    therapy => !isTherapySelected(therapy.id)
  );

  const coldCompressOptions = [
    "After activity",
    "When pain increases",
    "After exercise routine",
    "Before bed"
  ];

  const heatTherapyOptions = [
    "Before stretching",
    "Morning",
    "Before exercise routine",
    "When stiffness increases"
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hot & Cold Therapy</h2>
        <Badge variant="secondary" className="bg-wellness-light-green text-wellness-bright-green">
          Selected: {goalData.selectedTherapies.length} therapies
        </Badge>
      </div>
      
      {goalData.selectedTherapies.length > 0 && (
        <div className="space-y-6">
          {goalData.selectedTherapies.map(therapy => (
            <Card key={therapy.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className={`h-12 w-12 rounded-md flex items-center justify-center text-2xl mr-3 ${
                        therapy.type === "cold" ? "bg-blue-100" : "bg-red-100"
                      }`}
                    >
                      {therapy.type === "cold" ? "❄️" : "🔥"}
                    </div>
                    <div>
                      <h4 className="font-medium">{therapy.name}</h4>
                      <p className="text-sm text-gray-500">{therapy.description}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveTherapy(therapy.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div>
                    <div className="flex items-center h-10 border border-input rounded-md overflow-hidden">
                      <button 
                        className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-r flex items-center justify-center"
                        onClick={() => decrementValue(therapy, "duration")}
                      >
                        <span className="text-lg">-</span>
                      </button>
                      <input
                        type="text"
                        className="h-full w-full text-center border-none focus:outline-none focus:ring-0"
                        value={therapy.duration}
                        onChange={(e) => handleInputChange(therapy, "duration", e.target.value)}
                      />
                      <button 
                        className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-l flex items-center justify-center"
                        onClick={() => incrementValue(therapy, "duration")}
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">minutes</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center h-10 border border-input rounded-md overflow-hidden">
                      <button 
                        className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-r flex items-center justify-center"
                        onClick={() => decrementValue(therapy, "timesPerDay")}
                      >
                        <span className="text-lg">-</span>
                      </button>
                      <input
                        type="text"
                        className="h-full w-full text-center border-none focus:outline-none focus:ring-0"
                        value={therapy.timesPerDay}
                        onChange={(e) => handleInputChange(therapy, "timesPerDay", e.target.value)}
                      />
                      <button 
                        className="h-full px-2 bg-gray-50 hover:bg-gray-100 border-l flex items-center justify-center"
                        onClick={() => incrementValue(therapy, "timesPerDay")}
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">times per day</p>
                  </div>
                  
                  <div>
                    <Select 
                      value={therapy.whenToApply} 
                      onValueChange={(value) => updateTherapy(therapy.id, { whenToApply: value })}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="When to apply" />
                      </SelectTrigger>
                      <SelectContent>
                        {therapy.type === "cold" ? (
                          coldCompressOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))
                        ) : (
                          heatTherapyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">when to apply</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {availableTherapies.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Available Therapies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableTherapies.map(therapy => (
              <Card key={therapy.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className={`h-12 w-12 rounded-md flex items-center justify-center text-2xl mr-3 ${
                          therapy.type === "cold" ? "bg-blue-100" : "bg-red-100"
                        }`}
                      >
                        {therapy.type === "cold" ? "❄️" : "🔥"}
                      </div>
                      <div>
                        <h4 className="font-medium">{therapy.name}</h4>
                        <p className="text-sm text-gray-500">{therapy.description}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAddTherapy(therapy)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {availableTherapies.length === 0 && goalData.selectedTherapies.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No therapy options available. This step is optional.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HotColdTherapyStep;
