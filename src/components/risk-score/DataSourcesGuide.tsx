
import React from 'react';
import { Info } from 'lucide-react';

const DataSourcesGuide = () => {
  const getSourceBadge = (source: string) => {
    const badges: Record<string, {
      bg: string;
      text: string;
      label: string;
    }> = {
      'profile': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Profile'
      },
      'lab': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Lab Report'
      },
      'device': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Device'
      },
      'user-input': {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'User Input'
      }
    };
    const style = badges[source] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: 'Unknown'
    };
    return <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
        {style.label}
      </span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <h3 className="font-medium text-gray-800 mb-3">Understanding Your Risk Scores</h3>
      <p className="text-sm text-gray-600 mb-4">
        Your risk scores are calculated using data from multiple sources. Click "View & Edit Inputs" on any card to see and modify the data used in each calculation.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {getSourceBadge('profile')}
        {getSourceBadge('lab')}
        {getSourceBadge('device')}
        {getSourceBadge('user-input')}
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-start">
          <Info size={18} className="text-gray-500 mr-2 mt-0.5" />
          <p className="text-sm text-gray-600">
            Some risk calculators may require information that isn't available from your profile, connected devices, or lab results. You can manually enter this information to get more accurate risk assessments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesGuide;
