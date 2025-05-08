
import { AlertTriangle, Info, Bolt } from "lucide-react";

interface HealthImpactCardProps {}

const HealthImpactCard = ({}: HealthImpactCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-xl font-semibold mb-5">Health Impact</h2>
      
      <div className="space-y-5">
        {/* High sodium impact */}
        <div className="flex items-start gap-3">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">High sodium content may contribute to high blood pressure</h3>
            <p className="text-sm text-gray-600">Primarily from potato chips and pickles</p>
          </div>
        </div>
        
        {/* High saturated fat impact */}
        <div className="flex items-start gap-3">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">High saturated fat could raise cholesterol levels</h3>
            <p className="text-sm text-gray-600">From beef patty and cheese</p>
          </div>
        </div>
        
        {/* Simple carbohydrates impact */}
        <div className="flex items-start gap-3">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Info size={20} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">Simple carbohydrates may cause blood glucose spikes</h3>
            <p className="text-sm text-gray-600">From white bun and potato chips</p>
          </div>
        </div>
        
        {/* Activity context */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Bolt size={20} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">Activity Context</h3>
            <p className="text-sm text-gray-600">Provides sufficient energy for moderate activity and adequate protein for muscle recovery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthImpactCard;
