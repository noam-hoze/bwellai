
import React from 'react';
import { TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';

interface PainTrendAnalysisProps {
  activity: any,
  planData: {
    initialPainLevel: number;
    currentPainLevel: number;
    targetPainLevel: number;
  };
  expandedSections: { painAnalysis: boolean };
  toggleSection: (section: string) => void;
}

const PainTrendAnalysis: React.FC<PainTrendAnalysisProps> = ({
  activity,
  planData,
  expandedSections,
  toggleSection
}) => {

  console.log("PainTrendAnalysis component rendered with activity:", activity);

  return (
    <div className="p-4 md:p-6 border-b">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer touch-manipulation"
        onClick={() => toggleSection('painAnalysis')}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <TrendingDown size={20} className="mr-2 text-gray-600" />
          Pain Trend Analysis
        </h2>
        {expandedSections.painAnalysis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expandedSections.painAnalysis && (
        <div>
          {/* Pain chart visualization (simplified) */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-end justify-between h-24 md:h-32">
              {activity.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center max-w-12">
                  <div 
                    className={`w-6 md:w-8 rounded-t ${
                      day.overallPainEnd <= 3 ? 'bg-green-400' :
                      day.overallPainEnd <= 6 ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                    style={{ height: `${(day.overallPainEnd / 10) * 100}%` }}
                  />
                  <div className="text-xs mt-1">D{day.day}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Initial Pain Level</div>
              <div className="text-xl md:text-2xl font-bold text-red-600">{planData.initialPainLevel}/10</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Current Pain Level</div>
              <div className="text-xl md:text-2xl font-bold text-yellow-600">{planData.currentPainLevel}/10</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Target Pain Level</div>
              <div className="text-xl md:text-2xl font-bold text-green-600">{planData.targetPainLevel}/10</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainTrendAnalysis;
