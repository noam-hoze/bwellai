
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { PerspectiveInsight } from "../../types/bloodTest.types";

interface PersonalHealthInsightsProps {
  insights: PerspectiveInsight[];
  perspective: string;
}

const PersonalHealthInsights = ({ insights, perspective }: PersonalHealthInsightsProps) => {
  return (
    <Card className="wellness-card mb-6 bg-[#f8fafc]">
      <CardHeader className="pb-1">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Personal Health Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-6">
          Based on your test results, we've generated personalized insights to help you understand your health status.
        </p>
        
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={perspective} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              transition={{ duration: 0.3 }} 
              className="space-y-4"
            >
              {insights.map(insight => (
                <Card key={insight.id} className="border border-gray-100 overflow-hidden">
                  <div className="border-l-4 p-6" style={{ borderLeftColor: insight.color }}>
                    <h3 className="text-xl font-medium mb-2" style={{ color: insight.color }}>
                      {insight.title}
                    </h3>
                    <p className="text-gray-700">
                      {insight.content}
                    </p>
                  </div>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalHealthInsights;
