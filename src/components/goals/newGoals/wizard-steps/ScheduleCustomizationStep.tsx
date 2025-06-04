
import React from "react";
import { GoalData } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Calendar } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ScheduleCustomizationStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const ScheduleCustomizationStep = ({ goalData, updateGoalData }: ScheduleCustomizationStepProps) => {
  const handleScheduleChange = (timeOfDay: 'morning' | 'afternoon' | 'evening', value: boolean) => {
    updateGoalData({
      schedule: {
        ...(goalData.schedule || { morning: false, afternoon: false, evening: false }),
        [timeOfDay]: value
      }
    });
  };
  
  const handleDurationChange = (duration: number) => {
    updateGoalData({
      duration
    });
  };

  const timeSlots = [
    { 
      id: 'morning', 
      label: 'Morning', 
      description: 'Early stretches to start your day', 
      time: '6:00 AM - 10:00 AM',
      icon: <Clock className="h-5 w-5 text-orange-400" />
    },
    { 
      id: 'afternoon', 
      label: 'Afternoon', 
      description: 'Mid-day movement to stay limber', 
      time: '12:00 PM - 4:00 PM',
      icon: <Clock className="h-5 w-5 text-blue-400" /> 
    },
    { 
      id: 'evening', 
      label: 'Evening', 
      description: 'Wind down and relieve end-of-day tension', 
      time: '6:00 PM - 10:00 PM',
      icon: <Clock className="h-5 w-5 text-indigo-400" />
    }
  ];

  const durations = [
    { value: 14, label: '2 Weeks', description: 'Short-term pain relief' },
    { value: 30, label: '30 Days', description: 'Recommended for most users' },
    { value: 60, label: '60 Days', description: 'For chronic pain management' },
    { value: 90, label: '90 Days', description: 'Extended rehabilitation program' }
  ];

  // Initialize schedule if it's undefined
  const schedule = goalData.schedule || { morning: false, afternoon: false, evening: false };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">When do you want to do these exercises?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select preferred time(s) for your pain management exercises. You can choose multiple options.
        </p>
      </div>

      <div className="grid gap-4">
        {timeSlots.map((slot) => (
          <Card key={slot.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {slot.icon}
                  <div>
                    <h4 className="font-medium">{slot.label}</h4>
                    <p className="text-sm text-gray-600">{slot.description}</p>
                    <span className="text-xs text-gray-500">{slot.time}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`schedule-${slot.id}`}
                    checked={schedule[slot.id as keyof typeof schedule]}
                    onCheckedChange={(checked) => 
                      handleScheduleChange(slot.id as 'morning' | 'afternoon' | 'evening', checked)
                    }
                  />
                  <Label htmlFor={`schedule-${slot.id}`} className="text-sm">
                    {schedule[slot.id as keyof typeof schedule] ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">For how long will you follow this program?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose a duration that aligns with your recovery goals. You can always extend later.
        </p>
        
        <RadioGroup 
          value={(goalData.duration || 28).toString()}
          onValueChange={(value) => handleDurationChange(parseInt(value))}
          className="grid grid-cols-2 gap-4"
        >
          {durations.map((duration) => (
            <div key={duration.value} className="flex items-start space-x-2">
              <RadioGroupItem 
                value={duration.value.toString()} 
                id={`duration-${duration.value}`} 
                className="mt-1"
              />
              <Label 
                htmlFor={`duration-${duration.value}`}
                className="text-sm font-medium cursor-pointer"
              >
                <span className="block text-base">{duration.label}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{duration.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="bg-wellness-light-green p-4 rounded-lg mt-6">
        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-wellness-bright-green mt-0.5" />
          <div>
            <h4 className="font-medium text-wellness-bright-green">Consistency Matters</h4>
            <p className="text-sm text-gray-700 mt-1">
              Research shows that doing your exercises at the same time each day helps build a consistent habit. Try to pick times that you can stick with regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCustomizationStep;
