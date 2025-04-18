
import React, { useState } from 'react';
import RiskScoreCard from './RiskScoreCard';
import RiskCalculatorForm from './RiskCalculatorForm';

interface RiskScore {
  score: number;
  level?: string;
  description: string;
  color: string;
}

interface InputData {
  name: string;
  label: string;
  type: string;
  value: string | number | boolean;
  options?: readonly string[];
  source: string;
}

interface ExpandableRiskCardProps {
  id: string;
  title: string;
  riskScore: RiskScore;
  inputs: InputData[];
}

const ExpandableRiskCard = ({ id, title, riskScore, inputs }: ExpandableRiskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getDescriptionText = () => {
    switch (title) {
      case 'ASCVD Risk':
        return 'Calculates 10-year risk of heart disease or stroke';
      case 'Diabetes Risk':
        return 'Calculates risk of developing type 2 diabetes in the next 10 years';
      case 'WHR':
        return 'Calculates waist-to-hip ratio, an indicator of body fat distribution';
      case 'BMR':
        return 'Calculates basal metabolic rate, the calories you burn at rest';
      case 'VO2 Max':
        return 'Estimates maximum oxygen consumption during exercise';
      case 'Life Expectancy':
        return 'Estimates life expectancy based on health and lifestyle factors';
      default:
        return 'Risk calculator';
    }
  };
  
  return (
    <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-100 overflow-hidden mb-4">
      <RiskScoreCard
        title={title}
        description={riskScore.description}
        score={riskScore.score}
        color={riskScore.color}
        unit={title === 'Life Expectancy' ? ' yrs' : title === 'BMR' ? '' : title === 'WHR' ? '' : '%'}
        onClick={toggleExpanded}
      />
      
      {isExpanded && (
        <RiskCalculatorForm 
          title={title}
          description={getDescriptionText()}
          inputs={inputs} 
          onClose={toggleExpanded} 
        />
      )}
    </div>
  );
};

export default ExpandableRiskCard;

