
import { useState, useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "info";
  title: string;
  message: string;
}

const HealthAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "warning",
      title: "Heart Rate Elevated",
      message: "Average heart rate has been higher than usual"
    },
    {
      id: "a2",
      type: "info",
      title: "Vitamin D Levels",
      message: "Consider increasing sun exposure or supplementation"
    }
  ]);
  
  return (
    <div className="space-y-4 staggered-fade-in">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className={`p-4 rounded-xl backdrop-blur-sm border ${
            alert.type === "warning" 
              ? "bg-red-50/80 border-red-100" 
              : "bg-blue-50/80 border-blue-100"
          }`}
        >
          <div className="flex items-start">
            <div className="shrink-0 mr-3">
              {alert.type === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <Info className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div>
              <div className="font-medium">{alert.title}</div>
              <p className="text-sm text-gray-600">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthAlerts;
