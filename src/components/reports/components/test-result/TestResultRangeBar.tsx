
import React from "react";
import { BloodTestResult } from "../../types/bloodTest.types";

interface TestResultRangeBarProps {
  result: BloodTestResult;
}

const TestResultRangeBar = ({ result }: TestResultRangeBarProps) => {
  // Calculate range values for visualization
  const lowZoneEnd = result.min;
  const normalZoneEnd = result.max;
  const warningZoneEnd = normalZoneEnd * 1.4;

  // Set display boundaries to ensure we have some padding on both sides
  const displayMin = Math.max(0, lowZoneEnd - (lowZoneEnd * 0.3));
  const displayMax = warningZoneEnd * 1.4;

  // Calculate position percentages for different zones and the current value
  const valuePosition = ((result.value - displayMin) / (displayMax - displayMin)) * 100;
  const lowPosition = ((lowZoneEnd - displayMin) / (displayMax - displayMin)) * 100;
  const normalPosition = ((normalZoneEnd - displayMin) / (displayMax - displayMin)) * 100;
  const warningPosition = ((warningZoneEnd - displayMin) / (displayMax - displayMin)) * 100;
  
  return (
    <div className="mt-4 mb-6">
      <div className="relative h-16 w-full">
        {/* Improved gradient color bar */}
        <div className="absolute top-5 h-3 w-full rounded-full overflow-hidden flex">
          {/* Left red zone (too low) */}
          <div className="h-full" style={{
            width: `${lowPosition}%`,
            background: "linear-gradient(90deg, #ea384c 0%, #f97316 100%)"
          }}></div>
          
          {/* Center green zone (normal) */}
          <div className="h-full" style={{
            width: `${normalPosition - lowPosition}%`,
            background: "linear-gradient(90deg, #f97316 0%, #22c55e 50%, #f97316 100%)"
          }}></div>
          
          {/* Right red zone (too high) */}
          <div className="h-full" style={{
            width: `${100 - normalPosition}%`,
            background: "linear-gradient(90deg, #f97316 0%, #ea384c 100%)"
          }}></div>
        </div>
        
        {/* Range markers */}
        <div className="absolute top-1 w-full flex text-xs text-gray-500">
          <div className="absolute" style={{
            left: `${lowPosition}%`,
            transform: 'translateX(-50%)'
          }}>
            <div className="h-4 w-0.5 bg-gray-400 mx-auto"></div>
            <div className="mt-1">{lowZoneEnd}</div>
          </div>
          <div className="absolute" style={{
            left: `${normalPosition}%`,
            transform: 'translateX(-50%)'
          }}>
            <div className="h-4 w-0.5 bg-gray-400 mx-auto"></div>
            <div className="mt-1">{normalZoneEnd}</div>
          </div>
        </div>
        
        {/* Value marker with improved styling */}
        <div className="absolute top-3" style={{
          left: `${valuePosition}%`,
          transform: 'translateX(-50%)'
        }}>
          <div className="flex flex-col items-center">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800"></div>
            <div className="rounded-full h-6 w-6 bg-white border-2 border-gray-800 flex items-center justify-center -mt-1 z-10"></div>
            <div className="mt-5 px-2 py-1 rounded-md bg-gray-800 text-white font-medium text-sm shadow-md">
              {result.value} {result.unit}
            </div>
          </div>
        </div>
        
        {/* Range scale */}
        <div className="absolute top-9 w-full flex justify-between text-xs text-gray-500">
          <div>{displayMin.toFixed(1)}</div>
          <div>{displayMax.toFixed(1)}</div>
        </div>
      </div>
      
      {/* Range labels */}
      <div className="flex justify-between text-xs mt-2">
        <div className="text-red-500 font-medium">Too Low</div>
        <div className="text-green-500 font-medium">Normal Range</div>
        <div className="text-red-500 font-medium">Too High</div>
      </div>

      {/* Status message */}
      <div className="text-sm px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 my-4">
        {result.status === "normal" ? (
          <p className="text-green-700">Your result is within the normal range.</p>
        ) : result.status === "warning" ? (
          <p className="text-yellow-700">
            Your result is slightly {result.value > result.max ? "above" : "below"} the normal range.
          </p>
        ) : (
          <p className="text-red-700">
            Your result is significantly {result.value > result.max ? "above" : "below"} the normal range.
          </p>
        )}
      </div>
    </div>
  );
};

export default TestResultRangeBar;
