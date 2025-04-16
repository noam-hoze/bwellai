
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, TrendingDown } from "lucide-react";

const LabResultsSummary = () => {
  const results = [
    { 
      name: "Vitamin D", 
      value: "32 ng/mL", 
      change: "up", 
      status: "normal",
      date: "2025-04-10" 
    },
    { 
      name: "Cholesterol", 
      value: "195 mg/dL", 
      change: "down", 
      status: "normal",
      date: "2025-04-10"
    },
    { 
      name: "Blood Glucose", 
      value: "89 mg/dL", 
      change: "neutral", 
      status: "normal",
      date: "2025-04-10"
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Recent Lab Results</CardTitle>
        <FileText className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div 
              key={result.name}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
            >
              <div>
                <p className="font-medium">{result.name}</p>
                <p className="text-sm text-gray-500">{result.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono">{result.value}</span>
                {result.change === "up" && (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                )}
                {result.change === "down" && (
                  <TrendingDown className="h-4 w-4 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LabResultsSummary;
