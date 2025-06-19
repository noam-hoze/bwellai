
import React from 'react';
import { Download, Printer, Share2 } from 'lucide-react';

interface SharedReportHeaderProps {
  userData: {
    username: string;
    reportDate: Date;
  };
  planData: {
    adherenceRate: number;
    painReduction: number;
    daysCompleted: number;
    duration: number;
    currentStreak: number;
  };
  formatDate: (date: Date) => string;
}

const SharedReportHeader: React.FC<SharedReportHeaderProps> = ({
  userData,
  planData,
  formatDate
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Treatment Progress Report</h1>
          <p className="text-blue-100 text-sm md:text-base">User: {userData.username} • {formatDate(userData.reportDate)}</p>
        </div>
        
        {/* Action buttons - hidden in print */}
        <div className="flex flex-wrap gap-2 print:hidden">
          <button className="px-3 py-2 md:px-4 md:py-2 bg-white text-blue-700 rounded-lg flex items-center hover:bg-blue-50 text-sm">
            <Download size={16} className="mr-1 md:mr-2" />
            <span className="hidden sm:inline">Download</span> PDF
          </button>
          <button 
            onClick={() => window.print()}
            className="px-3 py-2 md:px-4 md:py-2 bg-white text-blue-700 rounded-lg flex items-center hover:bg-blue-50 text-sm"
          >
            <Printer size={16} className="mr-1 md:mr-2" />
            Print
          </button>
          <button className="px-3 py-2 md:px-4 md:py-2 bg-white text-blue-700 rounded-lg flex items-center hover:bg-blue-50 text-sm">
            <Share2 size={16} className="mr-1 md:mr-2" />
            Share
          </button>
        </div>
      </div>
      
      {/* Quick Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold">{planData.adherenceRate}%</div>
          <div className="text-xs md:text-sm text-blue-100">Adherence Rate</div>
        </div>
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold">{planData.painReduction}%</div>
          <div className="text-xs md:text-sm text-blue-100">Pain Reduction</div>
        </div>
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold">{planData.daysCompleted}/{planData.duration}</div>
          <div className="text-xs md:text-sm text-blue-100">Days Completed</div>
        </div>
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
          <div className="text-xl md:text-2xl font-bold"> coming soon </div>{/*{planData.currentStreak}</div> TODO: uncomment this when streak is implemented*/}
          <div className="text-xs md:text-sm text-blue-100">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

export default SharedReportHeader;
