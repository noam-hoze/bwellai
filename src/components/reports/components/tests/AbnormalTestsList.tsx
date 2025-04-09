
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { BloodTestResult } from "../../types/bloodTest.types";
import TestResultCard from "../test-result/TestResultCard";

interface AbnormalTestsListProps {
  abnormalResults: BloodTestResult[];
  perspective: string;
}

const AbnormalTestsList = ({ abnormalResults, perspective }: AbnormalTestsListProps) => {
  return (
    <div className="space-y-4">
      {abnormalResults.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center rounded-full p-2 bg-green-100 text-green-600 mb-3">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">All Tests Normal</h3>
              <p className="text-gray-500 mt-2">
                Great job! All your test results are within normal ranges.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        abnormalResults.map(result => (
          <Card key={result.id} className="overflow-hidden">
            <TestResultCard result={result} perspective={perspective} />
          </Card>
        ))
      )}
    </div>
  );
};

export default AbnormalTestsList;
