
import React from 'react';
import { Calculator } from 'lucide-react';

interface InputData {
  name: string;
  label: string;
  type: string;
  value: string | number | boolean;
  options?: readonly string[];
  source: string;
}

interface RiskCalculatorFormProps {
  title: string;
  description: string;
  formula?: string;
  inputs: InputData[];
  onClose: () => void;
}

const RiskCalculatorForm = ({ title, description, formula = '', inputs, onClose }: RiskCalculatorFormProps) => {
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

  const formulaDescription = {
    'ASCVD Risk': 'Based on the 2018 ACC/AHA Guidelines',
    'Diabetes Risk': 'Based on ADA Risk Score',
    'WHR': 'Waist circumference divided by hip circumference',
    'BMR': 'Based on Mifflin-St Jeor equation',
    'VO2 Max': 'Based on non-exercise estimation',
    'Life Expectancy': 'Based on demographic and lifestyle factors'
  }[title] || formula;
  
  return (
    <div className="p-4 bg-white border-t border-blue-100">
      <h4 className="font-medium text-gray-700 mb-3">{title} Calculator</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-3">
        {inputs.map((input, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">{input.label}</label>
              {getSourceBadge(input.source)}
            </div>
            {input.type === 'select' ? (
              <select className="w-full p-2 border rounded bg-white" defaultValue={input.value as string}>
                {input.options && input.options.map((option, optIdx) => (
                  <option key={optIdx} value={option}>{option}</option>
                ))}
              </select>
            ) : input.type === 'checkbox' ? (
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  defaultChecked={Boolean(input.value)} 
                />
                <span className="text-sm text-gray-700">
                  {Boolean(input.value) ? 'Yes' : 'No'}
                </span>
              </div>
            ) : (
              <input 
                type={input.type} 
                className="w-full p-2 border rounded" 
                defaultValue={String(input.value)} 
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Formula:</span> {formulaDescription}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onClose} 
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm"
          >
            Cancel
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center">
            <Calculator size={14} className="mr-1" />
            Recalculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculatorForm;

