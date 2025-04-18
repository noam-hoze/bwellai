import React from "react";
import { Heart, Brain, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import SimpleWellnessDashboard from "@/components/risk-score/SimpleWellnessDashboard";
import RiskScoreModels from "@/components/risk-score/RiskScoreModels";
import { Badge } from "@/components/ui/badge";

const RiskScore = () => {
  // Get risk score data from the models component
  const {
    riskScores,
    contributingFactors: factorsData,
    actionPlans,
  } = RiskScoreModels();

  // Add icons to the factors data
  const contributingFactors = [
    {
      ...factorsData[0],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      ...factorsData[1],
      icon: <Brain className="w-5 h-5" />,
    },
    {
      ...factorsData[2],
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="relative mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Health Risk Score</h1>
              <Badge
                variant="coming-soon"
                className="inline-flex w-fit text-base px-3 py-1"
              >
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between items-center mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800">
            Health Risk Score
          </h1>
        </div> */}

        {/* SimpleWellnessDashboard Component */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <SimpleWellnessDashboard />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RiskScore;
