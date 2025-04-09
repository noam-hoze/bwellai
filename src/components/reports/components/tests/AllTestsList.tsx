import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  BloodTestResult,
  getStatusColor,
  getStatusLabel,
} from "../../types/bloodTest.types";
import TestResultRangeBar from "../test-result/TestResultRangeBar";
import TestResultTrendHistory from "../test-result/TestResultTrendHistory";
import { Info, Brain, AlertCircle } from "lucide-react";
import ReportSpectrum from "@/components/ui/ReportSpectrum/ReportSpectrum";

interface AllTestsListProps {
  resultsCategories: Record<string, BloodTestResult[]>;
}

const AllTestsList = ({ resultsCategories, biomarkerResponses }: any) => {
  const [expandedTests, setExpandedTests] = useState<string[]>([]);

  const toggleTestExpansion = (testId: string) => {
    setExpandedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  return (
    <div className="space-y-4">
      <Accordion
        key={resultsCategories?.profile?.name}
        type="single"
        collapsible
        className="bg-white rounded-lg border shadow-sm"
      >
        <AccordionItem
          value={resultsCategories?.profile?.name}
          className="border-b-0"
        >
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center">
              <span className="font-medium text-base">
                {resultsCategories?.profile?.name}
              </span>
              <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {resultsCategories?.biomarker?.length} tests
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultsCategories?.biomarker?.map(
                  (result) =>
                    result?.signalText !== "normal" && (
                      <>
                        <TableRow
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleTestExpansion(result?.testName)}
                          key={result?.testName}
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">
                                {result?.testName}
                              </span>
                              {expandedTests?.includes(result?.testName) ? (
                                <ChevronUp className="ml-1 h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {result?.testResultValue}{" "}
                              {result?.testMeasuringUnit}
                            </span>
                          </TableCell>
                          <TableCell>
                            {result?.minParameterValue} -{" "}
                            {result?.maxParameterValue}{" "}
                            {result?.testMeasuringUnit}
                          </TableCell>
                          <TableCell>
                            <div
                              className="px-2 py-1 rounded-full text-xs font-medium inline-block"
                              style={{
                                backgroundColor: `${getStatusColor(
                                  result?.signalText
                                )}20`,
                                color: getStatusColor(result?.signalText),
                              }}
                            >
                              {getStatusLabel(result?.signalText)}
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedTests.includes(result?.testName) && (
                          <TableRow>
                            <TableCell colSpan={4} className="bg-gray-50 p-4">
                              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-base font-medium text-gray-800">
                                    Where your result falls
                                  </h4>
                                </div>
                                {/* <TestResultRangeBar result={result} /> */}
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "1.5em",
                                    marginBottom: "2em",
                                  }}
                                >
                                  <ReportSpectrum
                                    spectrum={
                                      biomarkerResponses?.[result?.testName]
                                        ?.spectrumRange
                                    }
                                    rangeObj={result?.rangeObj}
                                    max={result?.maxParameterValue}
                                    min={result?.minParameterValue}
                                    testResultValue={result?.testResultValue}
                                  />
                                </div>
                                <TestResultTrendHistory result={result} />
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                {result.whatIs && (
                                  <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium flex items-center text-blue-700 mb-2">
                                      <Info className="h-4 w-4 mr-1" /> What is{" "}
                                      {result.name}?
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {result.whatIs}
                                    </p>
                                  </div>
                                )}

                                {result.whatAffects && (
                                  <div className="bg-purple-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium flex items-center text-purple-700 mb-2">
                                      <Brain className="h-4 w-4 mr-1" /> What
                                      affects {result.name} levels?
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {result.whatAffects}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {result.whatMeans && (
                                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                                  <h4 className="text-sm font-medium flex items-center text-amber-700 mb-2">
                                    <AlertCircle className="h-4 w-4 mr-1" />{" "}
                                    What does your result mean?
                                  </h4>
                                  <p className="text-sm text-gray-700">
                                    {result.whatMeans}
                                  </p>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                )}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AllTestsList;
