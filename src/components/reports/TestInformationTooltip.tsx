
import React, { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface TestInformationData {
  id: string;
  name: string;
  shortDescription: string;
  whatItMeasures: string;
  whyImportant: string;
  affectingFactors: string[];
  abnormalMeaning: {
    high: string;
    low: string;
  };
  relatedTests: string[];
}

interface TestInformationTooltipProps {
  testInfo: TestInformationData;
}

const TestInformationTooltip: React.FC<TestInformationTooltipProps> = ({ testInfo }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);

  return (
    <div className="inline-block">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="text-gray-400 hover:text-gray-600 focus:outline-none ml-1" aria-label={`Information about ${testInfo.name} test`}>
            <Info className="h-4 w-4" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 text-sm">
          <h4 className="font-medium mb-1">{testInfo.name}</h4>
          <p className="text-gray-600 mb-3">{testInfo.shortDescription}</p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setShowFullInfo(true)}>
                Learn More
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{testInfo.name} Information</SheetTitle>
                <SheetDescription>
                  Comprehensive information about this test
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">What This Test Measures</h3>
                  <p className="text-gray-600">{testInfo.whatItMeasures}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Why It's Important</h3>
                  <p className="text-gray-600">{testInfo.whyImportant}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Factors That Affect Results</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {testInfo.affectingFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">What Abnormal Values Might Mean</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 rounded-md">
                      <span className="font-medium text-red-600">High Values:</span> 
                      <p className="text-gray-600 mt-1">{testInfo.abnormalMeaning.high}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md">
                      <span className="font-medium text-blue-600">Low Values:</span>
                      <p className="text-gray-600 mt-1">{testInfo.abnormalMeaning.low}</p>
                    </div>
                  </div>
                </div>
                
                {testInfo.relatedTests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Related Tests</h3>
                    <p className="text-gray-600">
                      {testInfo.relatedTests.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default TestInformationTooltip;
