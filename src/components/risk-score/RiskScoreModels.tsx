
import React from 'react';

// This component will store the data models and calculations for risk scores
const RiskScoreModels = () => {
  // Sample data - in a real app, this would likely come from an API or context
  const riskScores = {
    ascvd: 12,
    diabetes: 8,
    whr: 0.85,
    bmr: 1650,
    vo2max: 38,
    lifeExpectancy: 82,
    overallRisk: 65
  };
  
  const trendData = [
    { month: 'Jan', risk: 78 },
    { month: 'Feb', risk: 75 },
    { month: 'Mar', risk: 72 },
    { month: 'Apr', risk: 70 },
    { month: 'May', risk: 68 },
    { month: 'Jun', risk: 65 }
  ];
  
  const pieData = [
    { name: 'Cardiovascular', value: 35, color: '#ef4444' },
    { name: 'Metabolic', value: 25, color: '#f59e0b' },
    { name: 'Lifestyle', value: 20, color: '#3b82f6' },
    { name: 'Genetic', value: 15, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];
  
  const contributingFactors = [
    { 
      name: 'Cardiovascular Health', 
      metrics: [
        { name: 'Blood Pressure', value: '135/85 mmHg', target: '120/80 mmHg', impact: 'high' },
        { name: 'Resting Heart Rate', value: '78 bpm', target: '60-70 bpm', impact: 'medium' }
      ],
      source: 'Body Metrics',
      icon: null // We'll set this in the parent component
    },
    { 
      name: 'Metabolic Health', 
      metrics: [
        { name: 'Fasting Glucose', value: '105 mg/dL', target: '< 100 mg/dL', impact: 'high' },
        { name: 'BMI', value: '27.5', target: '18.5-24.9', impact: 'high' }
      ],
      source: 'Body Metrics',
      icon: null
    },
    { 
      name: 'Lifestyle Factors', 
      metrics: [
        { name: 'Physical Activity', value: '25 min/day', target: '30+ min/day', impact: 'medium' },
        { name: 'Sleep Quality', value: '68%', target: '85%+', impact: 'medium' },
        { name: 'Nutrition Score', value: '72/100', target: '80+/100', impact: 'high' }
      ],
      source: 'Activity & Nutrition',
      icon: null
    }
  ];
  
  const actionPlans = [
    {
      title: 'Improve Cardiovascular Health',
      actions: [
        { action: 'Add 10 minutes of daily cardio exercise', destination: '/activity', impact: 'high' },
        { action: 'Reduce sodium intake to under 2,300mg daily', destination: '/nutrition', impact: 'medium' }
      ]
    },
    {
      title: 'Enhance Metabolic Health',
      actions: [
        { action: 'Increase protein intake to 0.8g per kg of body weight', destination: '/nutrition', impact: 'medium' },
        { action: 'Reduce processed carbohydrates by 25%', destination: '/nutrition', impact: 'high' }
      ]
    },
    {
      title: 'Optimize Sleep Patterns',
      actions: [
        { action: 'Implement a consistent sleep schedule', destination: '/sleep', impact: 'medium' },
        { action: 'Reduce screen time 1 hour before bed', destination: '/sleep', impact: 'medium' }
      ]
    }
  ];
  
  const config = {
    value: {
      label: "Health Score",
      theme: {
        light: "#4F46E5",
        dark: "#4F46E5",
      },
    },
    risk: {
      label: "Risk Score",
      theme: {
        light: "#EF4444",
        dark: "#EF4444",
      },
    },
  };

  return {
    riskScores,
    trendData,
    pieData,
    contributingFactors,
    actionPlans,
    config
  };
};

export default RiskScoreModels;
