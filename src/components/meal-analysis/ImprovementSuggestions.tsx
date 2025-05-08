
import { Info, UtensilsCrossed, Dumbbell, HeartPulse } from "lucide-react";

const ImprovementSuggestions = () => {
  return (
    <div className="wellness-card border-l-4 border-l-wellness-bright-green bg-white p-4 mb-4">
      <div className="flex items-center gap-2 text-lg text-wellness-muted-black mb-2">
        <Info className="h-5 w-5 text-wellness-bright-green" />
        <h2 className="text-xl font-semibold">Suggestions for Improvement</h2>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-start gap-2">
            <UtensilsCrossed className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
            <div>
              <p className="text-wellness-muted-black font-bold">Replace honey with stevia</p>
              <p className="text-wellness-muted-black">Reduces sugar by 12g</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-start gap-2">
            <Dumbbell className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
            <div>
              <p className="text-wellness-muted-black font-bold">Add chia seeds (1 tbsp)</p>
              <p className="text-wellness-muted-black">Increases protein by 2g</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-start gap-2">
            <HeartPulse className="h-5 w-5 text-wellness-bright-green mt-1 flex-shrink-0" />
            <div>
              <p className="text-wellness-muted-black font-bold">Space out protein intake</p>
              <p className="text-wellness-muted-black">For better muscle recovery and sustained energy levels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
