import { useState, useEffect } from "react";
import { ChevronDown, Check, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface PortionSelectorProps {
  foodName: string;
  onPortionConfirm: (portionInfo: PortionInfo) => void;
}

export interface PortionInfo {
  amount: number;
  unit: string;
  calories: number;
  protein: number;
}

const PortionSelector = ({
  foodName,
  onPortionConfirm,
}: PortionSelectorProps) => {
  const [amount, setAmount] = useState<number>(240);
  const [unit, setUnit] = useState<string>("g");
  const [portionType, setPortionType] = useState<string>("medium");
  const [dropdownLabel, setDropdownLabel] = useState<string>("1 bowl (240g)");

  // Calculate estimated nutrition based on portion size
  const calculateNutrition = (
    amount: number
  ): { calories: number; protein: number } => {
    // Simple linear calculation based on 240g = 320 calories, 12g protein
    const ratio = amount / 240;
    return {
      calories: Math.round(320 * ratio),
      protein: Math.round(12 * ratio),
    };
  };

  const { calories, protein } = calculateNutrition(amount);

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
    updatePortionType(value[0]);
  };

  const handlePortionTypeChange = (value: string) => {
    setPortionType(value);

    switch (value) {
      case "small":
        setAmount(120);
        break;
      case "medium":
        setAmount(240);
        break;
      case "large":
        setAmount(360);
        break;
      // Keep custom as is
    }
  };

  const updatePortionType = (newAmount: number) => {
    if (newAmount <= 130) {
      setPortionType("small");
    } else if (newAmount <= 300) {
      setPortionType("medium");
    } else {
      setPortionType("large");
    }
  };

  useEffect(() => {
    if (unit === "g") {
      setDropdownLabel(`1 bowl (${amount}g)`);
    } else {
      setDropdownLabel(`1 bowl (${amount}${unit})`);
    }
  }, [amount, unit]);

  const handleContinue = () => {
    onPortionConfirm({
      amount,
      unit,
      calories,
      protein,
    });
  };

  const handleSkip = () => {
    // Use default values when skipping
    onPortionConfirm({
      amount: 240,
      unit: "g",
      calories: 320,
      protein: 12,
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md">
      <div className="bg-wellness-light-green rounded-lg p-3 mb-4">
        <h3 className="text-lg font-medium text-wellness-bright-green">
          We found: {foodName}
        </h3>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">How much did you eat?</h2>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-2"
              >
                {dropdownLabel}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem
                onClick={() => {
                  setAmount(120);
                  setPortionType("small");
                }}
              >
                Small bowl (120g)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAmount(240);
                  setPortionType("medium");
                }}
              >
                Medium bowl (240g)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAmount(360);
                  setPortionType("large");
                }}
              >
                Large bowl (360g)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAmount(50);
                  setUnit("cup");
                  setPortionType("custom");
                }}
              >
                1/2 cup (50g)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAmount(100);
                  setUnit("cup");
                  setPortionType("custom");
                }}
              >
                1 cup (100g)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
            <span>Less</span>
            <span className="font-medium text-gray-700">{amount}g</span>
            <span>More</span>
          </div>
          <Slider
            defaultValue={[240]}
            max={500}
            min={50}
            step={10}
            value={[amount]}
            onValueChange={handleSliderChange}
            className="my-2"
          />
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Common portions:</p>
          <RadioGroup
            value={portionType}
            onValueChange={handlePortionTypeChange}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <label htmlFor="small" className="text-sm cursor-pointer">
                Small (120g)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <label htmlFor="medium" className="text-sm cursor-pointer">
                Medium (240g)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <label htmlFor="large" className="text-sm cursor-pointer">
                Large (360g)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <label htmlFor="custom" className="text-sm cursor-pointer">
                Custom
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium mb-1">Preview:</p>
          <div className="flex justify-between">
            <span className="text-lg font-bold">{calories} kcal</span>
            <span className="text-lg">{protein}g protein</span>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip
            <SkipForward className="h-4 w-4 ml-1" />
          </Button>

          <Button onClick={handleContinue} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortionSelector;
