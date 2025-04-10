import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface RecommendedActionsProps {
  perspective: string;
}

const RecommendedActions = ({ perspective }: RecommendedActionsProps) => {
  return (
    <Card className="wellness-card mb-6">
      <CardHeader className="pb-1">
        <CardTitle className="text-xl">Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={perspective}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-4">
              {perspective === "MODERN_MEDICINE" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Schedule a follow-up with your physician
                      </p>
                      <p className="text-gray-600">
                        Discuss your test results and potential treatment
                        options
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Review your diet and lifestyle
                      </p>
                      <p className="text-gray-600">
                        Make adjustments based on your test results
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Schedule your next routine test
                      </p>
                      <p className="text-gray-600">
                        Regular monitoring is key to maintaining health
                      </p>
                    </div>
                  </li>
                </>
              )}

              {perspective === "NATUROPATHIC_MEDICINE" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Consult with a naturopathic doctor
                      </p>
                      <p className="text-gray-600">
                        For a comprehensive whole-body approach to your health
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Implement an anti-inflammatory diet
                      </p>
                      <p className="text-gray-600">
                        Focus on whole foods and eliminate common inflammatory
                        triggers
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Consider targeted supplements
                      </p>
                      <p className="text-gray-600">
                        After consulting with a professional about your specific
                        needs
                      </p>
                    </div>
                  </li>
                </>
              )}

              {perspective === "REGISTERED_DIETITIANS" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Track your food intake for one week
                      </p>
                      <p className="text-gray-600">
                        Use a food journal or app to understand your current
                        habits
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Consult with a registered dietitian
                      </p>
                      <p className="text-gray-600">
                        For personalized nutrition recommendations based on your
                        test results
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Gradually implement a heart-healthy eating pattern
                      </p>
                      <p className="text-gray-600">
                        Focus on Mediterranean or DASH diet principles
                      </p>
                    </div>
                  </li>
                </>
              )}

              {perspective === "TRADITIONAL_CHINESE_MEDICINE" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Visit a licensed TCM practitioner
                      </p>
                      <p className="text-gray-600">
                        For pulse diagnosis and personalized herbal
                        recommendations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Consider acupuncture treatment
                      </p>
                      <p className="text-gray-600">
                        To help balance energy systems and support organ
                        function
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Incorporate gentle Qigong practice
                      </p>
                      <p className="text-gray-600">
                        Daily movement to support qi and blood circulation
                      </p>
                    </div>
                  </li>
                </>
              )}

              {perspective === "MENTAL_HEALTH" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Start a daily stress reduction practice
                      </p>
                      <p className="text-gray-600">
                        Even 10 minutes of meditation or deep breathing can have
                        significant benefits
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Assess your sleep quality
                      </p>
                      <p className="text-gray-600">
                        Optimizing sleep can improve both mental health and
                        metabolic markers
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Consider talking to a mental health professional
                      </p>
                      <p className="text-gray-600">
                        For support with stress management and emotional
                        wellbeing
                      </p>
                    </div>
                  </li>
                </>
              )}

              {perspective === "FUNCTIONAL_MEDICINE" && (
                <>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Pursue further specialized testing
                      </p>
                      <p className="text-gray-600">
                        Consider advanced lipid testing, inflammatory markers,
                        and micronutrient analysis
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Work with a functional medicine practitioner
                      </p>
                      <p className="text-gray-600">
                        For a personalized systems-based approach to
                        optimization
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        Implement a 30-day reset protocol
                      </p>
                      <p className="text-gray-600">
                        Focus on anti-inflammatory foods, targeted
                        supplementation, and lifestyle modifications
                      </p>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
