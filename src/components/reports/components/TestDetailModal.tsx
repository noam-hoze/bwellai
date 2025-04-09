
import React, { useState } from "react";
import { BloodTestResult, getStatusColor, getStatusLabel } from "../types/bloodTest.types";
import { Info, Brain, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import TestResultRangeBar from "./test-result/TestResultRangeBar";
import TestResultTrendHistory from "./test-result/TestResultTrendHistory";

interface TestDetailModalProps {
  result: BloodTestResult;
  isOpen: boolean;
  onClose: () => void;
}

const TestDetailModal = ({ result, isOpen, onClose }: TestDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-medium">{result.name} Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium text-gray-800">Where your result falls</h4>
            </div>
            
            <TestResultRangeBar result={result} />
            
            <TestResultTrendHistory result={result} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {result.whatIs && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium flex items-center text-blue-700 mb-2">
                  <Info className="h-4 w-4 mr-1" /> What is {result.name}?
                </h4>
                <p className="text-sm text-gray-700">{result.whatIs}</p>
              </div>
            )}
            
            {result.whatAffects && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium flex items-center text-purple-700 mb-2">
                  <Brain className="h-4 w-4 mr-1" /> What affects {result.name} levels?
                </h4>
                <p className="text-sm text-gray-700">{result.whatAffects}</p>
              </div>
            )}
          </div>
          
          {result.whatMeans && (
            <div className="bg-amber-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium flex items-center text-amber-700 mb-2">
                <AlertCircle className="h-4 w-4 mr-1" /> What does your result mean?
              </h4>
              <p className="text-sm text-gray-700">{result.whatMeans}</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDetailModal;
