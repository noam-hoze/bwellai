import React from "react";
import { format } from "date-fns";
import { BloodTestResult } from "../../types/bloodTest.types";

interface TestResultTrendHistoryProps {
  result: BloodTestResult;
  testName?: string;
}

const TestResultTrendHistory = ({
  result,
  testName,
  minValue,
  maxValue,
  rangeObj,
}: any) => {
  console.log({ result, minValue, maxValue });

  // if (!result?.testResult || result?.testResult.length < 2 || !result?.createdAt)
  //   return null;

  const data = result?.map((d) => {
    return Number(d?.testResult);
  });
  const dates = result?.map((d) => {
    return d?.createdAt;
  });

  // Create points for the trend line
  const dataPoints = result?.map((value, index) => {
    let statusColor = "#10b981"; // green/normal
    if (Number(value?.testResult) > Math.max(...data) * 1.4)
      statusColor = "#ef4444"; // red/high risk
    else if (Number(value?.testResult) > Math.max(...data))
      statusColor = "#f59e0b"; // amber/moderate risk
    else if (Number(value?.testResult) < Math.min(...data))
      statusColor = "#ef4444"; // red/low risk

    return {
      value: Number(value?.testResult),
      date: dates[index],
      statusColor,
      isCurrent: index === data.length - 1,
    };
  });

  // Get month abbreviations for display (selected ones)
  const monthLabels = dataPoints
    ?.map((point, index) => {
      if (index === 0 || index % 2 === 0 || index === dataPoints?.length - 1) {
        return index === dataPoints?.length - 1
          ? "Today"
          : format(point?.date, "MMM");
      }
      return "";
    })
    ?.filter(Boolean);

  return (
    <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-4 pt-4 pb-1">
        <h3 className="text-sm font-medium text-gray-700">{testName} Trend</h3>
        <span className="text-xs text-gray-500">Last 6 Months</span>
      </div>

      <div className="flex flex-col h-40 gap-1 px-4">
        {/* Y-axis top label */}
        <div className="text-xs text-gray-500 h-5">
          {Math.ceil(Number(maxValue))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Background color zones */}
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/3 bg-red-100 opacity-40"></div>
            <div className="h-1/3 bg-yellow-100 opacity-40"></div>
            <div className="h-1/3 bg-green-100 opacity-40"></div>
          </div>

          {/* Zone labels */}
          <div className="absolute right-0 h-full flex flex-col text-xs pr-1">
            <div className="h-1/3 flex items-center text-red-700">
              High Risk
            </div>
            <div className="h-1/3 flex items-center text-yellow-700">
              Moderate Risk
            </div>
            <div className="h-1/3 flex items-center text-green-700">Normal</div>
          </div>

          {/* Trend line with dots */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Draw the trend line */}
            <path
              d={`M ${dataPoints
                ?.map((point, i) => {
                  const x = (i / (dataPoints.length - 1)) * 80 + 10; // 10% left margin, 80% width
                  // Calculate y position based on value and max/min range
                  // Map the value to vertical position (higher value = lower position in SVG)
                  const valueRange = Number(maxValue) - Number(minValue);
                  const normalizedVal =
                    (point.value - Math.min(...data)) / valueRange;
                  // Invert because SVG coordinates grow downward
                  const y = 80 - normalizedVal * 60 + 10; // 10% top margin, 80% height
                  return `${x}% ${y}%`;
                })
                ?.join(" L ")}`}
              stroke="#f59e0b" // Orange line
              strokeWidth="2"
              fill="none"
            />

            {/* Draw the data points */}
            {dataPoints?.map((point, i) => {
              const x = (i / (dataPoints.length - 1)) * 80 + 10;
              const valueRange = Number(maxValue) - Number(minValue);

              const normalizedVal =
                (point.value - Math.min(...data)) / valueRange;
              const y = 80 - normalizedVal * 60 + 10;

              return (
                <circle
                  key={i}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r={point.isCurrent ? "6" : "4"}
                  fill={point.isCurrent ? "#1f2937" : point.statusColor}
                  stroke={point.isCurrent ? "white" : "none"}
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* Horizontal gridlines */}
          <div className="absolute left-0 right-0 top-1/3 border-t border-gray-200"></div>
          <div className="absolute left-0 right-0 top-2/3 border-t border-gray-200"></div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between px-6 text-xs text-gray-600 h-5">
          {monthLabels?.map((month, i) => (
            <div
              key={i}
              className={
                i === monthLabels?.length - 1 ? "font-medium text-gray-800" : ""
              }
            >
              {month}
            </div>
          ))}
        </div>

        {/* Y-axis bottom label */}
        <div className="text-xs text-gray-500 h-5">
          {Math.floor(Number(minValue))}
        </div>
      </div>

      {/* Insight box */}
      <div className="m-4 text-xs text-gray-700 bg-white p-2 rounded border">
        Your {testName?.toLowerCase()} levels have
        {result?.changePercentage && result?.changePercentage > 0
          ? ` increased by ${result?.changePercentage}%`
          : ` decreased by ${Math.abs(result?.changePercentage || 0)}%`}
        over the past 4 months
      </div>
    </div>
  );
};

export default TestResultTrendHistory;
