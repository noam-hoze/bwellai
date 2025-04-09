import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BloodTestResult, getStatusColor, getStatusLabel } from "../../types/bloodTest.types";
import TestResultRangeBar from "./TestResultRangeBar";
import TestResultTrendHistory from "./TestResultTrendHistory";

interface TestResultCardProps {
  result: BloodTestResult;
  perspective: string;
}

const TestResultCard = ({ result, perspective }: TestResultCardProps) => {
  return (
    <div className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: getStatusColor(result.status) }}></div>
      <div className="pt-4 px-6 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">{result.name}</h3>
            <p className="text-sm text-gray-500">{result.description}</p>
          </div>
          <div className="px-2 py-1 rounded-full text-xs font-medium" style={{
            backgroundColor: `${getStatusColor(result.status)}20`,
            color: getStatusColor(result.status)
          }}>
            {getStatusLabel(result.status)}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Your result: <strong>{result.value} {result.unit}</strong></span>
            <span className="text-gray-500">Normal range: {result.min} - {result.max} {result.unit}</span>
          </div>
          
          <TestResultRangeBar result={result} />
          
          <TestResultTrendHistory result={result} />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${perspective}-${result.id}`} 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -5 }} 
              transition={{ duration: 0.3 }} 
              className="mt-4"
            >
              <h4 className="text-sm font-medium mb-2">What this means:</h4>
              <p className="text-sm text-gray-600">
                {perspective === "conventional" && (result.status === "critical" 
                  ? <>Your {result.name.toLowerCase()} level is significantly {result.value > result.max ? "above" : "below"} the recommended range, which may affect your health.</>
                  : <>Your {result.name.toLowerCase()} level is slightly {result.value > result.max ? "above" : "below"} the recommended range. This may require attention.</>)}
                
                {perspective === "naturopathic" && (result.id === "glucose" || result.id === "a1c" 
                  ? <>From a naturopathic perspective, your elevated blood sugar suggests potential metabolic stress. This could be related to diet, stress, sleep quality, or environmental factors affecting your body's regulation systems.</> 
                  : result.id === "cholesterol" || result.id === "ldl" 
                  ? <>Naturopathically, cholesterol elevations often indicate inflammation, hormonal imbalances, or digestive issues rather than just dietary factors. Your body may be producing more cholesterol in response to cellular repair needs.</> 
                  : <>While conventional medicine focuses on reference ranges, naturopathic medicine looks at optimal functioning. Your results suggest room for optimization through natural approaches.</>)}
                
                {perspective === "dietitian" && (result.id === "glucose" || result.id === "a1c" 
                  ? <>From a nutritional standpoint, your glucose values suggest a need to evaluate your carbohydrate intake, meal timing, and glycemic load. Consider more fiber, protein, and healthy fats with each meal.</> 
                  : result.id === "cholesterol" || result.id === "ldl" 
                  ? <>Dietary factors significantly impact your lipid profile. Increasing soluble fiber (oats, beans, fruits) and plant sterols while reducing saturated fat can naturally improve these numbers.</> 
                  : <>A nutrition-focused approach to these levels would include strategic food choices and eating patterns rather than just elimination diets.</>)}
                
                {perspective === "tcm" && (result.id === "glucose" || result.id === "a1c" 
                  ? <>In Traditional Chinese Medicine, elevated blood sugar often reflects disharmony between the Spleen and Pancreas energies. This may create Dampness and Heat that disrupts normal Qi flow.</> 
                  : result.id === "cholesterol" || result.id === "ldl" 
                  ? <>TCM views cholesterol imbalances as potential signs of Liver Qi stagnation and Blood stasis. Harmonizing Liver Qi and moving stagnation are key priorities.</> 
                  : <>From a Chinese Medicine perspective, these values reflect patterns of disharmony that may be addressed through acupuncture, herbs, and lifestyle adjustments.</>)}
                
                {perspective === "mental-health" && (result.id === "glucose" || result.id === "a1c" 
                  ? <>Blood sugar fluctuations can significantly impact mood, energy, and cognitive function. Chronic stress can also raise blood sugar through cortisol pathways, creating a bidirectional relationship.</> 
                  : result.id === "cholesterol" || result.id === "ldl" 
                  ? <>There are established connections between lipid profiles and mental wellbeing. Both can be influenced by lifestyle factors like exercise, sleep quality, and stress management techniques.</> 
                  : <>From a mental health perspective, biological markers often correlate with psychological states. Addressing both physiological imbalances and emotional wellbeing creates more sustainable health.</>)}
                
                {perspective === "functional" && (result.id === "glucose" || result.id === "a1c" 
                  ? <>Functional medicine views glucose dysregulation as a spectrum rather than a binary normal/abnormal status. Your results suggest early metabolic adaptations that can be addressed through personalized lifestyle modifications.</> 
                  : result.id === "cholesterol" || result.id === "ldl" 
                  ? <>Beyond the numbers themselves, functional medicine assesses the quality of lipoproteins, particle size, and inflammatory context. Your pattern suggests potential for optimization through targeted interventions.</> 
                  : <>From a systems biology perspective, these markers represent downstream effects of underlying imbalances in multiple body systems that can be addressed at their root causes.</>)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TestResultCard;
