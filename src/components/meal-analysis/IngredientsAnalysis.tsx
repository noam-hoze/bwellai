import {
  Check,
  Minus,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface Ingredient {
  name: string;
  reason_for_category: string;
}

interface IngredientsAnalysisProps {
  beneficialIngredients: Ingredient[];
  neutralIngredients: Ingredient[];
  moderateIngredients: Ingredient[];
}

const IngredientsAnalysis = ({
  beneficialIngredients,
  neutralIngredients,
  moderateIngredients,
}: IngredientsAnalysisProps) => {
  const [beneficialOpen, setBeneficialOpen] = useState(false);
  const [neutralOpen, setNeutralOpen] = useState(false);
  const [moderateOpen, setModerateOpen] = useState(false);

  return (
    <div className="wellness-card p-4 mb-4">
      <h2 className="text-xl font-semibold mb-5">Ingredients Analysis</h2>

      <div className="space-y-4">
        <Collapsible
          open={beneficialOpen}
          onOpenChange={setBeneficialOpen}
          className="border rounded-lg bg-wellness-lightgreen"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-wellness-light-green flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-wellness-bright-green" />
                </div>
                <h3 className="font-medium text-gray-800 text-lg">
                  Beneficial Components
                </h3>
              </div>
              <div>
                {beneficialOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 bg-white">
            <div className="space-y-4">
              {beneficialIngredients.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  <div className="font-medium text-gray-700 md:col-span-1">
                    {item.name}:
                  </div>
                  <div className="text-gray-600 md:col-span-2">
                    {item.reason_for_category}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={neutralOpen}
          onOpenChange={setNeutralOpen}
          className="border rounded-lg bg-gray-50"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Minus className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="font-medium text-gray-800 text-lg">
                  Neutral Components
                </h3>
              </div>
              <div>
                {neutralOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 bg-white">
            <div className="space-y-4">
              {neutralIngredients.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  <div className="font-medium text-gray-700 md:col-span-1">
                    {item.name}:
                  </div>
                  <div className="text-gray-600 md:col-span-2">
                    {item.reason_for_category}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={moderateOpen}
          onOpenChange={setModerateOpen}
          className="border rounded-lg bg-red-50"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-medium text-gray-800 text-lg">
                  Components to Moderate
                </h3>
              </div>
              <div>
                {moderateOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 bg-white">
            <div className="space-y-4">
              {moderateIngredients.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  <div className="font-medium text-gray-700 md:col-span-1">
                    {item.name}:
                  </div>
                  <div className="text-gray-600 md:col-span-2">
                    {item.reason_for_category}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default IngredientsAnalysis;
