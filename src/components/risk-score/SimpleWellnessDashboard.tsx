
import React from 'react';
import ExpandableRiskCard from './cards/ExpandableRiskCard';
import DataSourcesGuide from './DataSourcesGuide';

const SimpleWellnessDashboard = () => {
  // Risk score data
  const riskScores = {
    ascvd: {
      score: 12,
      level: 'High',
      description: '10-year risk: High',
      color: 'bg-red-500'
    },
    diabetes: {
      score: 8,
      level: 'Moderate',
      description: 'Risk level: Moderate',
      color: 'bg-yellow-500'
    },
    whr: {
      score: 0.85,
      description: 'Waist-to-Hip Ratio',
      color: 'bg-purple-500'
    },
    bmr: {
      score: 1650,
      description: 'Basal Metabolic Rate (cal/day)',
      color: 'bg-red-500'
    },
    vo2max: {
      score: 38,
      description: 'Aerobic capacity (ml/kg/min)',
      color: 'bg-orange-500'
    },
    lifeExpectancy: {
      score: 82,
      description: 'Estimated years',
      color: 'bg-teal-500'
    }
  };

  // Input data for ASCVD risk calculation
  const ascvdInputs = [{
    name: 'age',
    label: 'Age',
    type: 'number',
    value: 52,
    source: 'profile'
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    value: 'Male',
    options: ['Male', 'Female'] as const,
    source: 'profile'
  }, {
    name: 'totalCholesterol',
    label: 'Total Cholesterol (mg/dL)',
    type: 'number',
    value: 210,
    source: 'lab'
  }, {
    name: 'hdlCholesterol',
    label: 'HDL Cholesterol (mg/dL)',
    type: 'number',
    value: 45,
    source: 'lab'
  }, {
    name: 'systolicBP',
    label: 'Systolic BP (mmHg)',
    type: 'number',
    value: 140,
    source: 'device'
  }, {
    name: 'smoker',
    label: 'Smoker',
    type: 'checkbox',
    value: true,
    source: 'profile'
  }];

  // Input data for Diabetes risk calculation
  const diabetesInputs = [{
    name: 'age',
    label: 'Age',
    type: 'number',
    value: 52,
    source: 'profile'
  }, {
    name: 'bmi',
    label: 'BMI',
    type: 'number',
    value: 27.5,
    source: 'profile'
  }, {
    name: 'fastingGlucose',
    label: 'Fasting Glucose (mg/dL)',
    type: 'number',
    value: 105,
    source: 'lab'
  }, {
    name: 'familyHistory',
    label: 'Family History of Diabetes',
    type: 'checkbox',
    value: true,
    source: 'profile'
  }, {
    name: 'physicalActivity',
    label: 'Physical Activity (min/week)',
    type: 'number',
    value: 120,
    source: 'device'
  }, {
    name: 'hba1c',
    label: 'HbA1c (%)',
    type: 'number',
    value: 5.7,
    source: 'lab'
  }];
  
  // Input data for WHR calculation
  const whrInputs = [{
    name: 'waist',
    label: 'Waist Circumference (inches)',
    type: 'number',
    value: 34,
    source: 'profile'
  }, {
    name: 'hip',
    label: 'Hip Circumference (inches)',
    type: 'number',
    value: 40,
    source: 'profile'
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    value: 'Male',
    options: ['Male', 'Female'] as const,
    source: 'profile'
  }];
  
  // Input data for BMR calculation
  const bmrInputs = [{
    name: 'age',
    label: 'Age',
    type: 'number',
    value: 52,
    source: 'profile'
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    value: 'Male',
    options: ['Male', 'Female'] as const,
    source: 'profile'
  }, {
    name: 'weight',
    label: 'Weight (kg)',
    type: 'number',
    value: 80,
    source: 'profile'
  }, {
    name: 'height',
    label: 'Height (cm)',
    type: 'number',
    value: 178,
    source: 'profile'
  }, {
    name: 'activityLevel',
    label: 'Activity Level',
    type: 'select',
    value: 'Moderate',
    options: ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'] as const,
    source: 'profile'
  }];
  
  // Input data for VO2 Max calculation
  const vo2maxInputs = [{
    name: 'age',
    label: 'Age',
    type: 'number',
    value: 52,
    source: 'profile'
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    value: 'Male',
    options: ['Male', 'Female'] as const,
    source: 'profile'
  }, {
    name: 'restingHR',
    label: 'Resting Heart Rate (bpm)',
    type: 'number',
    value: 68,
    source: 'device'
  }, {
    name: 'maxHR',
    label: 'Maximum Heart Rate (bpm)',
    type: 'number',
    value: 168,
    source: 'device'
  }, {
    name: 'weight',
    label: 'Weight (kg)',
    type: 'number',
    value: 80,
    source: 'profile'
  }];
  
  // Input data for Life Expectancy calculation
  const lifeExpectancyInputs = [{
    name: 'age',
    label: 'Age',
    type: 'number',
    value: 52,
    source: 'profile'
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    value: 'Male',
    options: ['Male', 'Female'] as const,
    source: 'profile'
  }, {
    name: 'smoker',
    label: 'Smoker',
    type: 'checkbox',
    value: true,
    source: 'profile'
  }, {
    name: 'bmi',
    label: 'BMI',
    type: 'number',
    value: 27.5,
    source: 'profile'
  }, {
    name: 'systolicBP',
    label: 'Systolic BP (mmHg)',
    type: 'number',
    value: 140,
    source: 'device'
  }, {
    name: 'exercise',
    label: 'Weekly Exercise (hours)',
    type: 'number',
    value: 3,
    source: 'device'
  }, {
    name: 'familyHistory',
    label: 'Family History of Longevity',
    type: 'checkbox',
    value: false,
    source: 'profile'
  }];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 border-l-4 border-l-wellness-deep-orange">
      <h1 className="text-lg font-semibold mb-4">Risk Score Calcs</h1>
      
      {/* ASCVD Risk Card with expandable form */}
      <ExpandableRiskCard
        id="ascvd"
        title="ASCVD Risk"
        riskScore={riskScores.ascvd}
        inputs={ascvdInputs}
      />
      
      {/* Other risk cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ExpandableRiskCard
          id="diabetes"
          title="Diabetes Risk"
          riskScore={riskScores.diabetes}
          inputs={diabetesInputs}
        />
        
        <ExpandableRiskCard
          id="whr"
          title="WHR"
          riskScore={riskScores.whr}
          inputs={whrInputs}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ExpandableRiskCard
          id="bmr"
          title="BMR"
          riskScore={riskScores.bmr}
          inputs={bmrInputs}
        />
        
        <ExpandableRiskCard
          id="vo2max"
          title="VO2 Max"
          riskScore={riskScores.vo2max}
          inputs={vo2maxInputs}
        />
        
        <ExpandableRiskCard
          id="lifeExpectancy"
          title="Life Expectancy"
          riskScore={riskScores.lifeExpectancy}
          inputs={lifeExpectancyInputs}
        />
      </div>
      
      {/* Data Sources Guide */}
      <DataSourcesGuide />
    </div>
  );
};

export default SimpleWellnessDashboard;

