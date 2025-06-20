
import React from 'react';
import { FileText } from 'lucide-react';

interface TreatmentPlanDetailsProps {
  planData: {
    name: string;
    startDate: Date;
    endDate: Date;
    duration: number;
  };
  formatDate: (date: Date) => string;
}

const TreatmentPlanDetails: React.FC<TreatmentPlanDetailsProps> = ({
  planData,
  formatDate
}) => {
  return (
    <div className="p-4 md:p-6 border-b">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FileText size={20} className="mr-2 text-gray-600" />
        Treatment Plan Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600">Plan Name</div>
          <div className="font-medium">{planData.name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Duration</div>
          <div className="font-medium text-sm md:text-base">{planData.duration} days ({formatDate(planData.startDate)} - {formatDate(planData.endDate)})</div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanDetails;
