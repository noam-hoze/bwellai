import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const data = [
  {
    createdAt: "2025-04-10T15:16:26",
    testResult: "3.0",
  },
  {
    createdAt: "2025-04-10T15:15:29",
    testResult: "3.0",
  },
  {
    createdAt: "2025-04-10T15:06:00",
    testResult: "3.0",
  },
  {
    createdAt: "2025-04-10T14:54:26",
    testResult: "3.0",
  },
];

export default function TestResultTrendHistoryGraphRechart({
  testName,
  result,
  maxValue,
  minValue,
}) {
  const formattedData = useMemo(() => {
    return result
      ?.map((item) => ({
        ...item,
        testResult: parseFloat(item.testResult),
        createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
          // hour: "2-digit",
          // minute: "2-digit",
          month: "short",
        }),
      }))
      .reverse(); // Optional: to sort oldest to newest
  }, []);

  return (
    <div className="w-full h-72  bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center px-4 pt-4 pb-1">
        <h3 className="text-sm font-medium text-gray-700">{testName} Trend</h3>
        <span className="text-xs text-gray-500">Last 6 Months</span>
      </div>
      <div className="flex flex-col h-64 gap-1 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FEE2E2" stopOpacity={1} />{" "}
                {/* red-100 */}
                <stop offset="30%" stopColor="#FEF3C7" stopOpacity={1} />{" "}
                {/* yellow-100 */}
                <stop offset="50%" stopColor="#D1FAE5" stopOpacity={1} />{" "}
                {/* green-100 */}
                <stop offset="70%" stopColor="#FEF3C7" stopOpacity={1} />{" "}
                {/* yellow-100 */}
                <stop offset="100%" stopColor="#FEE2E2" stopOpacity={1} />{" "}
                {/* red-100 */}
              </linearGradient>
            </defs>

            {/* Background Grid with Gradient Fill */}
            <CartesianGrid
              strokeDasharray="3 3"
              fill="url(#chartGradient)"
              vertical={false}
            />

            <XAxis dataKey="createdAt" padding={{ left: 10, right: 10 }} />
            <YAxis
              domain={[Number(minValue), Number(maxValue)]} // 👈 set dynamic domain
              padding={{ top: 10, bottom: 10 }}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={true}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="testResult"
              stroke="#2563eb"
              strokeWidth={1}
              dot={(props) => {
                const { cx, cy, payload } = props;
                const value = Number(payload.testResult);

                let fill = "#10B981"; // green
                if (value >= Number(maxValue) || value <= Number(minValue))
                  fill = "#DC2626"; // red
                // else if (value >= 4) fill = "#FACC15"; // yellow

                // console.log(value, maxValue, minValue, fill);

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={fill}
                    stroke="#2563eb"
                    strokeWidth={0}
                  />
                );
              }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
