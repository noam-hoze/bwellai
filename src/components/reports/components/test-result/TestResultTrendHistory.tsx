import React from "react";
import { format } from "date-fns";
import { BloodTestResult } from "../../types/bloodTest.types";

interface TestResultTrendHistoryProps {
  result: BloodTestResult;
}

const TestResultTrendHistory = ({ result }: TestResultTrendHistoryProps) => {
  // if (!result?.trendData || result?.trendData.length < 2 || !result?.trendDates) return null;

  const data = result?.trendData || [];
  const dates = result?.trendDates || [];

  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);
  const yMin = Math.max(0, Math.floor((dataMin * 0.8) / 10) * 10);
  const yMax = Math.ceil((dataMax * 1.2) / 10) * 10;

  const lowThreshold = result?.min;
  const normalThreshold = result?.max;
  const moderateThreshold = normalThreshold * 1.4;

  const chartHeight = 170; // Based on the SVG mockup
  const chartPadding = { top: 20, right: 30, bottom: 30, left: 40 };
  const chartWidth = 800; // Based on the SVG width
  const yRange = yMax - yMin;

  // Create points for the polyline
  const dataPoints = data.map((value, index) => {
    const xPos =
      (index / (data.length - 1)) * chartWidth + chartPadding?.left + 40; // Add 40 for axis
    const yPos = chartPadding?.top + ((yMax - value) / yRange) * chartHeight;

    let pointColor = "#00B588"; // Default to normal (green)
    if (value > moderateThreshold) pointColor = "#EB0C00"; // High risk (red)
    else if (value > normalThreshold)
      pointColor = "#FFCC00"; // Moderate risk (orange)
    else if (value < lowThreshold) pointColor = "#EB0C00"; // Low risk (red)

    return {
      value,
      xPos,
      yPos,
      pointColor,
      date: dates[index],
    };
  });

  // Create polyline points string
  const polylinePoints = dataPoints
    .map((point) => `${point?.xPos},${point?.yPos}`)
    .join(" ");

  return (
    <div className="bg-white rounded-xl border border-wellness-light-green p-4 overflow-hidden">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-wellness-bright-green font-heading">
          {result?.name} Trend (Last 6 Months)
        </h4>
      </div>

      <div className="relative h-[280px] w-full">
        <svg
          className="w-full"
          style={{
            height: `${
              chartHeight + chartPadding?.top + chartPadding?.bottom
            }px`,
          }}
          viewBox={`0 0 ${
            chartWidth + chartPadding?.left + chartPadding?.right
          } ${chartHeight + chartPadding?.top + chartPadding?.bottom}`}
          preserveAspectRatio="none"
        >
          {/* Define Gradients */}
          <defs>
            <linearGradient
              id="backgroundGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#EB0C00" stopOpacity="0.3" />{" "}
              {/* High */}
              <stop offset="20%" stopColor="#FFCC00" stopOpacity="0.3" />{" "}
              {/* Moderate high */}
              <stop offset="30%" stopColor="#00B588" stopOpacity="0.3" />{" "}
              {/* Normal start */}
              <stop offset="50%" stopColor="#40E0D0" stopOpacity="0.3" />{" "}
              {/* Normal center */}
              <stop offset="70%" stopColor="#00B588" stopOpacity="0.3" />{" "}
              {/* Normal end */}
              <stop offset="80%" stopColor="#FFCC00" stopOpacity="0.3" />{" "}
              {/* Moderate low */}
              <stop offset="100%" stopColor="#EB0C00" stopOpacity="0.3" />{" "}
              {/* Low */}
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {/* Dynamic gradient based on data points */}
              {dataPoints?.map((point, index) => (
                <stop
                  key={index}
                  offset={`${(index / (dataPoints?.length - 1)) * 100}%`}
                  stopColor={point?.pointColor}
                />
              ))}
            </linearGradient>
          </defs>

          {/* Background Gradient */}
          <rect
            x={chartPadding?.left}
            y={chartPadding?.top}
            width={chartWidth}
            height={chartHeight}
            fill="url(#backgroundGradient)"
          />

          {/* Normal Range Zone Highlight */}
          <rect
            x={chartPadding?.left}
            y={
              chartPadding?.top +
              ((yMax - normalThreshold) / yRange) * chartHeight
            }
            width={chartWidth}
            height={((normalThreshold - lowThreshold) / yRange) * chartHeight}
            fill="#00B588"
            fillOpacity="0.15"
          />

          {/* Y-axis grid lines */}
          {[yMax, moderateThreshold, normalThreshold, lowThreshold, yMin].map(
            (value, index) => {
              const yPos =
                chartPadding?.top + ((yMax - value) / yRange) * chartHeight;
              return (
                <React.Fragment key={index}>
                  <line
                    x1={chartPadding?.left}
                    y1={yPos}
                    x2={chartPadding?.left + chartWidth}
                    y2={yPos}
                    stroke="#e0e0e0"
                    strokeWidth="1"
                    strokeDasharray={
                      value === normalThreshold || value === lowThreshold
                        ? "4,4"
                        : ""
                    }
                  />
                  <text
                    x={chartPadding?.left - 10}
                    y={yPos + 4}
                    fontSize="10"
                    fontFamily="SF Pro Display, sans-serif"
                    textAnchor="end"
                    fill="#666666"
                  >
                    {value}
                  </text>
                  {(value === normalThreshold || value === lowThreshold) && (
                    <text
                      x={chartPadding?.left + chartWidth + 10}
                      y={yPos + 4}
                      fontSize="8"
                      fontFamily="SF Pro Display, sans-serif"
                      textAnchor="start"
                      fill="#264E36"
                    >
                      {value}
                    </text>
                  )}
                </React.Fragment>
              );
            }
          )}

          {/* X-axis labels */}
          {dataPoints?.map((point, index) => {
            // Only show selected month labels to avoid crowding
            if (
              index === 0 ||
              index === Math.floor(dataPoints?.length / 4) ||
              index === Math.floor(dataPoints?.length / 2) ||
              index === Math.floor((3 * dataPoints?.length) / 4) ||
              index === dataPoints?.length - 1
            ) {
              return (
                <text
                  key={index}
                  x={point?.xPos}
                  y={chartPadding?.top + chartHeight + 15}
                  fontSize="10"
                  fontFamily="SF Pro Display, sans-serif"
                  textAnchor="middle"
                  fill="#666666"
                >
                  {index === dataPoints?.length - 1
                    ? "Today"
                    : format(point?.date, "MMM")}
                </text>
              );
            }
            return null;
          })}

          {/* Line connecting points */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />

          {/* Data points */}
          {dataPoints?.map((point, index) => (
            <circle
              key={index}
              cx={point?.xPos}
              cy={point?.yPos}
              r={index === dataPoints?.length - 1 ? 6 : 4}
              fill={point?.pointColor}
              stroke={index === dataPoints?.length - 1 ? "#333333" : "#ffffff"}
              strokeWidth={index === dataPoints?.length - 1 ? 2 : 1}
            />
          ))}

          {/* Current value label */}
          {dataPoints?.length > 0 && (
            <g>
              <rect
                x={dataPoints[dataPoints?.length - 1].xPos - 35}
                y={dataPoints[dataPoints?.length - 1].yPos - 30}
                width="70"
                height="25"
                rx="4"
                fill="#264E36"
              />
              <text
                x={dataPoints[dataPoints?.length - 1].xPos}
                y={dataPoints[dataPoints?.length - 1].yPos - 14}
                fontSize="12"
                fontFamily="SF Pro Display, sans-serif"
                textAnchor="middle"
                fill="#ffffff"
              >
                {dataPoints[dataPoints?.length - 1].value} {result?.unit}
              </text>
              <polygon
                points={`
                  ${dataPoints[dataPoints?.length - 1].xPos},${
                  dataPoints[dataPoints?.length - 1].yPos - 5
                }
                  ${dataPoints[dataPoints?.length - 1].xPos - 5},${
                  dataPoints[dataPoints?.length - 1].yPos - 10
                }
                  ${dataPoints[dataPoints?.length - 1].xPos + 5},${
                  dataPoints[dataPoints?.length - 1].yPos - 10
                }
                `}
                fill="#264E36"
              />
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-6 right-8 space-y-2">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-[#EB0C00] opacity-70 mr-2"></div>
            <span className="text-xs text-wellness-text font-medium">
              High Risk
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-[#FFCC00] opacity-70 mr-2"></div>
            <span className="text-xs text-wellness-text font-medium">
              Moderate Risk
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-[#00B588] opacity-70 mr-2"></div>
            <span className="text-xs text-wellness-text font-medium">
              Normal
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-wellness-gray px-4 py-3 rounded-md">
        <p className="text-sm text-wellness-text">
          Your {result?.name?.toLowerCase()} levels have
          {result?.changePercentage && result?.changePercentage > 0
            ? ` increased by ${result?.changePercentage}%`
            : ` decreased by ${Math.abs(result?.changePercentage || 0)}%`}
          over the past 4 months
        </p>
      </div>
    </div>
  );
};

export default TestResultTrendHistory;
