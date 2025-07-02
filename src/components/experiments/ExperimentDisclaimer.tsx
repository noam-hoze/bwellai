
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const ExperimentDisclaimer = () => {
  return (
    <Card className="mb-8 border-l-4 border-l-red-500 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-600 mb-2">Important Disclaimer</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              BWellAI provides wellness screening insights for educational and awareness purposes only. 
              This is not a medical diagnostic tool and should not replace professional medical advice, 
              diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperimentDisclaimer;
