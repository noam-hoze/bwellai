import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface GoalsStepProps {
  selectedGoals: string[];
  toggleGoal: (goal: string) => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ selectedGoals, toggleGoal }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        What Are You Aiming For?
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Tap what matters most to you right now. You can select multiple goals!
      </p>

      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {/* Sleep button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("sleep")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("sleep")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/dac5b641-fb68-4e0c-ae99-f06c5e5c5c4b.png"
              alt="Sleep Better"
              className="w-ful rounded-lg mb-2"
            />
            {selectedGoals.includes("sleep") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Eat button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("eat")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("eat")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/e9d028e9-8ff9-43f6-9010-4cdd92778ea1.png"
              alt="Eat Healthier"
              className="w-full rounded-lg mb-2"
            />
            {selectedGoals.includes("eat") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Active button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("active")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("active")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/3db3c82e-0cf3-4888-bd9d-2b8e0c7de437.png"
              alt="Get Active"
              className="w-full rounded-lg mb-2"
            />
            {selectedGoals.includes("active") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Weight button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("weight")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("weight")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/5e81a977-add6-45c9-8f7f-9beabb727caf.png"
              alt="Weight Management"
              className="w-full rounded-lg mb-2"
            />
            {selectedGoals.includes("weight") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Stress button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("stress")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("stress")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/c82d12f2-25aa-4213-88cd-533cec2fff63.png"
              alt="Reduce Stress"
              className="w-full rounded-lg mb-2"
            />
            {selectedGoals.includes("stress") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Lab Reports button */}
        <div
          className={`border rounded-lg p-2 cursor-pointer transition-all ${
            selectedGoals.includes("lab-reports")
              ? "bg-green-50 border-green-500"
              : "border-gray-200 hover:bg-green-50 hover:border-green-200"
          }`}
          onClick={() => toggleGoal("lab-reports")}
        >
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/ca56eb6f-7946-48bd-9d19-f354a1b932c6.png"
              alt="Understand Lab Reports"
              className="w-full h-20 sm:h-32 rounded-lg mb-2"
            />
            {selectedGoals.includes("lab-reports") && (
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={true}
                  className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsStep;
