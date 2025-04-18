import React from 'react';
import { Edit2, FileText } from 'lucide-react';

interface RiskScoreCardProps {
  title: string;
  description: string;
  score: number | string;
  color: string;
  unit?: string;
  maxValue?: number;
  minValue?: number;
  onClick?: () => void;
}

const RiskScoreCard = ({
  title,
  description,
  score,
  color,
  unit = '',
  maxValue = 100,
  minValue = 0,
  onClick
}: RiskScoreCardProps) => {
  // Calculate percentage for progress bar
  const calculateWidth = () => {
    if (typeof score === 'string') return '50%';
    
    let percentage;
    if (title === 'Life Expectancy') {
      percentage = Math.min(((score - 70) / 30) * 100, 100);
    } else if (title === 'BMR') {
      percentage = Math.min((score / 2500) * 100, 100);
    } else if (title === 'VO2 Max') {
      percentage = Math.min((score / 60) * 100, 100);
    } else if (title === 'WHR') {
      percentage = Math.min((score / 1.2) * 100, 100);
    } else {
      percentage = Math.min(score * 5, 100);
    }
    return `${percentage}%`;
  };

  // Get background color based on card title
  const getBgColor = () => {
    switch (title) {
      case 'ASCVD Risk':
        return 'bg-blue-50 border-blue-100';
      case 'Diabetes Risk':
        return 'bg-green-50 border-green-100';
      case 'WHR':
        return 'bg-purple-50 border-purple-100';
      case 'BMR':
        return 'bg-red-50 border-red-100';
      case 'VO2 Max':
        return 'bg-orange-50 border-orange-100';
      case 'Life Expectancy':
        return 'bg-teal-50 border-teal-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  // Get text color based on card title
  const getTextColor = () => {
    switch (title) {
      case 'ASCVD Risk':
        return 'text-blue-800';
      case 'Diabetes Risk':
        return 'text-green-800';
      case 'WHR':
        return 'text-purple-800';
      case 'BMR':
        return 'text-red-800';
      case 'VO2 Max':
        return 'text-orange-800';
      case 'Life Expectancy':
        return 'text-teal-800';
      default:
        return 'text-gray-800';
    }
  };

  // Get button color based on card title
  const getButtonColor = () => {
    switch (title) {
      case 'ASCVD Risk':
        return 'text-blue-600';
      case 'Diabetes Risk':
        return 'text-green-600';
      case 'WHR':
        return 'text-purple-600';
      case 'BMR':
        return 'text-red-600';
      case 'VO2 Max':
        return 'text-orange-600';
      case 'Life Expectancy':
        return 'text-teal-600';
      default:
        return 'text-gray-600';
    }
  };

  // Get explanation text based on the risk calculator type
  const getExplanationText = () => {
    switch (title) {
      case 'ASCVD Risk':
        return 'Estimates your 10-year risk of heart attack or stroke based on the American College of Cardiology guidelines.';
      case 'Diabetes Risk':
        return 'Predicts your likelihood of developing type 2 diabetes in the next 10 years based on clinical risk factors.';
      case 'WHR':
        return 'Waist-to-Hip Ratio measures body fat distribution and is a predictor of heart health and metabolic conditions.';
      case 'BMR':
        return 'Basal Metabolic Rate estimates the calories your body needs at complete rest to maintain vital functions.';
      case 'VO2 Max':
        return 'Measures your body\'s maximum oxygen use during exercise, a key indicator of cardiovascular fitness.';
      case 'Life Expectancy':
        return 'Provides an estimate of life expectancy based on current health metrics and lifestyle factors.';
      default:
        return 'Health risk calculator based on personal metrics and clinical guidelines.';
    }
  };

  return (
    <div className={`rounded-lg shadow-sm border ${getBgColor()} overflow-hidden p-4`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium text-sm ${getTextColor()}`}>{title}</h3>
          <p className={`text-sm mt-1 ${getTextColor().replace('800', '700')}`}>{description}</p>
        </div>
        <div className={`text-3xl font-bold ${getTextColor()}`}>
          {score}{unit}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="h-2 w-full bg-[#a7c8ad] rounded-full">
          <div className={`h-2 rounded-full ${color}`} style={{ width: calculateWidth() }}></div>
        </div>
      </div>
      
      <p className={`mt-3 text-xs ${getTextColor().replace('800', '600')}`}>
        {getExplanationText()}
      </p>
      
      <div className="mt-3 flex justify-between">
        <button 
          className={`flex items-center text-xs font-medium ${getButtonColor()} opacity-70 hover:opacity-100`}
        >
          <FileText size={14} className="mr-1" />
          Action Plan
        </button>
        
        <button 
          onClick={onClick}
          className={`flex items-center text-xs font-medium ${getButtonColor()}`}
        >
          <Edit2 size={14} className="mr-1" />
          Edit Inputs
        </button>
      </div>
    </div>
  );
};

export default RiskScoreCard;
