
import React from 'react';
import { Activity, ChevronUp, ChevronDown, Star } from 'lucide-react';

interface ExerciseMetrics {
  [exerciseName: string]: {
    totalPrescribed: number;
    totalCompleted: number;
    completionRate: number;
    avgPain: string;
    avgDifficulty: string;
  };
}

interface ExercisePerformanceSummaryProps {
  exerciseMetrics: ExerciseMetrics;
  expandedSections: { exerciseDetails: boolean };
  toggleSection: (section: string) => void;
}

const ExercisePerformanceSummary: React.FC<ExercisePerformanceSummaryProps> = ({
  exerciseMetrics,
  expandedSections,
  toggleSection
}) => {
  return (
    <div className="p-4 md:p-6 border-b">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer touch-manipulation"
        onClick={() => toggleSection('exerciseDetails')}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <Activity size={20} className="mr-2 text-gray-600" />
          Exercise Performance Summary
        </h2>
        {expandedSections.exerciseDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expandedSections.exerciseDetails && (
        <div className="space-y-4">
          {/* Mobile-friendly cards for exercises */}
          <div className="block md:hidden space-y-3">
            {Object.entries(exerciseMetrics).map(([exerciseName, metrics]) => (
              <div key={exerciseName} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3">{exerciseName}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Completion Rate</span>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        metrics.completionRate >= 80 ? 'bg-green-100 text-green-800' :
                        metrics.completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {metrics.completionRate}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Pain</span>
                    <div className="mt-1">
                      <span className={`font-medium ${
                        metrics.avgPain === 'N/A' ? 'text-gray-400' :
                        parseFloat(metrics.avgPain) <= 3 ? 'text-green-600' :
                        parseFloat(metrics.avgPain) <= 6 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {metrics.avgPain}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulty</span>
                    <div className="mt-1">
                      {metrics.avgDifficulty !== 'N/A' && (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={12}
                              fill={star <= parseFloat(metrics.avgDifficulty) ? "#EAB308" : "none"}
                              className={star <= parseFloat(metrics.avgDifficulty) ? "text-yellow-500" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      )}
                      {metrics.avgDifficulty === 'N/A' && (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Completed</span>
                    <div className="mt-1 font-medium">
                      {metrics.totalCompleted}/{metrics.totalPrescribed}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-700">Exercise Name</th>
                  <th className="text-center p-3 font-medium text-gray-700">Completion Rate</th>
                  <th className="text-center p-3 font-medium text-gray-700">Avg Pain (1-10)</th>
                  <th className="text-center p-3 font-medium text-gray-700">Avg Difficulty (1-5)</th>
                  <th className="text-center p-3 font-medium text-gray-700">Times Completed</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(exerciseMetrics).map(([exerciseName, metrics]) => (
                  <tr key={exerciseName} className="border-b">
                    <td className="p-3">{exerciseName}</td>
                    <td className="text-center p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                        metrics.completionRate >= 80 ? 'bg-green-100 text-green-800' :
                        metrics.completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {metrics.completionRate}%
                      </span>
                    </td>
                    <td className="text-center p-3">
                      <span className={`font-medium ${
                        metrics.avgPain === 'N/A' ? 'text-gray-400' :
                        parseFloat(metrics.avgPain) <= 3 ? 'text-green-600' :
                        parseFloat(metrics.avgPain) <= 6 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {metrics.avgPain}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      {metrics.avgDifficulty !== 'N/A' && (
                        <div className="flex justify-center">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={14}
                              fill={star <= parseFloat(metrics.avgDifficulty) ? "#EAB308" : "none"}
                              className={star <= parseFloat(metrics.avgDifficulty) ? "text-yellow-500" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      )}
                      {metrics.avgDifficulty === 'N/A' && (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="text-center p-3">
                      {metrics.totalCompleted}/{metrics.totalPrescribed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePerformanceSummary;
