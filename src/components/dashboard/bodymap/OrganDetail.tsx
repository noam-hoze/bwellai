
import React from "react";
import { Info } from "lucide-react";
import { Organ } from "./OrganInterface";

interface OrganDetailProps {
  selectedOrgan: Organ | null;
}

const OrganDetail: React.FC<OrganDetailProps> = ({ selectedOrgan }) => {
  if (!selectedOrgan) {
    return (
      <div className="bg-wellness-gray rounded-xl p-4">
        <h4 className="font-semibold mb-3">Health Alerts</h4>
        
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-red-100">
            <div className="flex items-start">
              <div className="mr-2 text-wellness-alert">⚠️</div>
              <div>
                <div className="font-medium">Heart Rate Elevated</div>
                <p className="text-sm text-gray-600">Average heart rate has been higher than usual</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-yellow-100">
            <div className="flex items-start">
              <div className="mr-2 text-amber-500">ℹ️</div>
              <div>
                <div className="font-medium">Vitamin D Levels</div>
                <p className="text-sm text-gray-600">Consider increasing sun exposure or supplementation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wellness-gray rounded-xl p-4 transition-all duration-300 animate-scale-in">
      <h4 className="font-semibold mb-2">{selectedOrgan.name} Health</h4>
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${selectedOrgan.health}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{selectedOrgan.health}%</span>
      </div>
      <p className="text-sm text-gray-600">{selectedOrgan.details}</p>
      <div className="mt-3 flex items-center text-primary text-sm cursor-pointer hover:underline">
        <Info className="h-4 w-4 mr-1" />
        <span>View detailed report</span>
      </div>
    </div>
  );
};

export default OrganDetail;
