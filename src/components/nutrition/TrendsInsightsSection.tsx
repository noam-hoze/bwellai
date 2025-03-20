
import { AlertTriangle, Droplet, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TrendsInsightsSection = () => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Trends & Insights</h2>
      
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
        <span className="text-xl text-gray-500">Nutrition Trends Graph</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-gray-700">
          <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>Low protein intake on workout days</span>
            <Separator className="my-3" />
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-gray-700">
          <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>Hydration below target</span>
            <Separator className="my-3" />
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-gray-700">
          <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>Consider adding more fiber to your diet</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendsInsightsSection;
