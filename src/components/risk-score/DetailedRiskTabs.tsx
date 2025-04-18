
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Brain, Activity, ArrowRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface DetailedRiskTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  riskScores: {
    ascvd: number;
    diabetes: number;
  };
  contributingFactors: Array<{
    name: string;
    metrics: Array<{
      name: string;
      value: string;
      target: string;
      impact: string;
    }>;
    source: string;
    icon: React.ReactNode;
  }>;
  actionPlans: Array<{
    title: string;
    actions: Array<{
      action: string;
      destination: string;
      impact: string;
    }>;
  }>;
}

const DetailedRiskTabs = ({ 
  activeTab, 
  setActiveTab, 
  riskScores, 
  contributingFactors, 
  actionPlans 
}: DetailedRiskTabsProps) => {
  
  const getRiskLevel = (score: number, type: string) => {
    if (type === 'ascvd') {
      if (score < 5) return { level: 'Low', color: '#22c55e' };
      if (score < 10) return { level: 'Moderate', color: '#f59e0b' };
      return { level: 'High', color: '#ef4444' };
    } else if (type === 'diabetes') {
      if (score < 5) return { level: 'Low', color: '#22c55e' };
      if (score < 15) return { level: 'Moderate', color: '#f59e0b' };
      return { level: 'High', color: '#ef4444' };
    }
    return { level: 'Moderate', color: '#f59e0b' };
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  return (
    <Card className="bg-white shadow-sm mb-8">
      <CardHeader>
        <CardTitle>Detailed Risk Information</CardTitle>
        <CardDescription>Explore factors affecting your risk score and how to improve</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
            <TabsTrigger value="actions">Action Plan</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-800">ASCVD Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold text-blue-800 mr-2">{riskScores.ascvd}%</span>
                    <span className="text-sm text-blue-600">10-year risk</span>
                  </div>
                  <Progress 
                    className="h-3 mb-4"
                    value={Math.min(riskScores.ascvd * 5, 100)}
                    indicatorColor={getRiskLevel(riskScores.ascvd, 'ascvd').color}
                  />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Blood Pressure:</span>
                      <span className="font-medium">135/85 mmHg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Total Cholesterol:</span>
                      <span className="font-medium">185 mg/dL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">HDL Cholesterol:</span>
                      <span className="font-medium">45 mg/dL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Smoking Status:</span>
                      <span className="font-medium">Non-smoker</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-blue-600 mt-4">
                    <div className="font-medium">Risk Level: {getRiskLevel(riskScores.ascvd, 'ascvd').level}</div>
                    <div className="mt-1">ASCVD risk represents your chance of having a heart attack or stroke within the next 10 years.</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-800">Diabetes Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold text-green-800 mr-2">{riskScores.diabetes}%</span>
                    <span className="text-sm text-green-600">5-year risk</span>
                  </div>
                  <Progress 
                    className="h-3 mb-4"
                    value={Math.min(riskScores.diabetes * 5, 100)}
                    indicatorColor={getRiskLevel(riskScores.diabetes, 'diabetes').color}
                  />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Fasting Glucose:</span>
                      <span className="font-medium">105 mg/dL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">BMI:</span>
                      <span className="font-medium">27.5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Family History:</span>
                      <span className="font-medium">Positive</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Physical Activity:</span>
                      <span className="font-medium">25 min/day</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-green-600 mt-4">
                    <div className="font-medium">Risk Level: {getRiskLevel(riskScores.diabetes, 'diabetes').level}</div>
                    <div className="mt-1">Your risk of developing type 2 diabetes within the next 5 years based on your current health status.</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Contributing Factors Tab */}
          <TabsContent value="factors" className="space-y-4">
            <div className="space-y-4">
              {contributingFactors.map((factor, index) => (
                <Card key={index} className="border bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {factor.icon}
                      {factor.name}
                      <span className="text-sm font-normal text-gray-400 ml-auto">
                        Source: {factor.source}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {factor.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="border-b border-gray-100 pb-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{metric.name}</span>
                            <div className="flex items-center">
                              <span 
                                className="text-sm font-bold"
                                style={{ color: getImpactColor(metric.impact) }}
                              >
                                {metric.value}
                              </span>
                              <div 
                                className="ml-2 px-2 py-0.5 text-xs rounded-full"
                                style={{ 
                                  backgroundColor: getImpactColor(metric.impact),
                                  color: 'white',
                                  opacity: 0.8
                                }}
                              >
                                {metric.impact} impact
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Target: {metric.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Action Plan Tab */}
          <TabsContent value="actions" className="space-y-4">
            {actionPlans.map((plan, index) => (
              <Card key={index} className="border bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plan.actions.map((action, aIndex) => (
                      <div key={aIndex} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getImpactColor(action.impact) }}
                          ></div>
                          <span className="text-sm">{action.action}</span>
                        </div>
                        <a 
                          href={action.destination} 
                          className="flex items-center text-blue-600 hover:text-blue-500 transition-colors"
                        >
                          <span className="text-xs font-medium">Go to section</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailedRiskTabs;
