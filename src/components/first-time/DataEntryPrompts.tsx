import { Camera, Clock, Upload, ScanFace } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DataEntryPrompts = () => {
  const navigate = useNavigate();

  const prompts = [
    {
      icon: <Camera className="w-6 h-6 text-green-500" />,
      title: "Track Your First Meal",
      description: "Scan food barcodes or log meals manually",
      action: () => navigate("/nutrition"),
      color: "bg-green-50",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Log Your Sleep",
      description: "Record your sleep schedule and quality",
      action: () => navigate("/sleep"),
      color: "bg-purple-50",
    },
    {
      icon: <Upload className="w-6 h-6 text-blue-500" />,
      title: "Upload Lab Report",
      description: "Share your health records securely",
      action: () => navigate("/reports"),
      color: "bg-blue-50",
    },
    {
      icon: <ScanFace className="w-6 h-6 text-rose-500" />,
      title: "Scan Your Face",
      description: "Get instant vitals and health insights",
      action: () => navigate("/face-scan"),
      color: "bg-rose-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {prompts.map((prompt, index) => (
        <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
          <div className={`absolute inset-0 opacity-50 ${prompt.color}`} />
          <CardContent className="relative p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-white p-3 shadow-sm">
                {prompt.icon}
              </div>
              <h3 className="font-semibold">{prompt.title}</h3>
              <p className="text-sm text-gray-500">{prompt.description}</p>
              <Button 
                variant="outline" 
                onClick={prompt.action}
                className="mt-4 w-full"
              >
                Start
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataEntryPrompts;
