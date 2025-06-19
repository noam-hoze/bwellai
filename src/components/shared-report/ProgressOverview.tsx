
import React from 'react';
import { Activity, CheckCircle, TrendingDown, Award } from 'lucide-react';

interface ProgressOverviewProps {
  planData: {
    totalExercisesCompleted: number;
    totalExercisesPrescribed: number;
    averageCompletionRate: number;
    initialPainLevel: number;
    currentPainLevel: number;
    targetPainLevel: number;
    currentStreak: number;
    missedDays: number;
  };
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ planData }) => {
  return (
    <div className="p-4 md:p-6 border-b">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Activity size={20} className="mr-2 text-gray-600" />
        Progress Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Exercise Completion</span>
            <CheckCircle size={18} className="text-green-600" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-green-700">
            {planData.totalExercisesCompleted}/{planData.totalExercisesPrescribed}
          </div>
          <div className="text-sm text-gray-600">
            {planData.averageCompletionRate}% average completion
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pain Progress</span>
            <TrendingDown size={18} className="text-blue-600" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-700">
            {planData.initialPainLevel} → {planData.currentPainLevel}
          </div>
          <div className="text-sm text-gray-600">
            Target: {planData.targetPainLevel}/10
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Consistency</span>
            <Award size={18} className="text-purple-600" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-purple-700">
            {planData.currentStreak} days
          </div>
          <div className="text-sm text-gray-600">
            {planData.missedDays} missed day{planData.missedDays !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
