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
import { ChevronDown, ChevronUp, Info, Brain, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BloodTestResult,
  getStatusColor,
  getStatusLabel,
} from "../../types/bloodTest.types";
import TestResultRangeBar from "../test-result/TestResultRangeBar";
import TestResultTrendHistory from "../test-result/TestResultTrendHistory";
import { perspectiveInsights } from "../../data/bloodTestData";
import ReportSpectrum from "@/components/ui/ReportSpectrum/ReportSpectrum";
import TestResultTrendHistoryGraphRechart from "../test-result/TestResultTrendHistoryGraphRechart";

interface AbnormalTestsListProps {
  abnormalResults: any[];
  biomarkerResponses: any[];
  perspective: string;
  panelAnalysisResponses?: any;
  latestResultByDateData?: any;
}

const AbnormalTestsList = ({
  abnormalResults,
  perspective,
  biomarkerResponses,
  panelAnalysisResponses,
  latestResultByDateData,
}: AbnormalTestsListProps) => {
  const [expandedTests, setExpandedTests] = useState<string[]>([]);

  const toggleTestExpansion = (testId: string) => {
    setExpandedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  // Group abnormal results by category
  const abnormalResultsByCategory = abnormalResults?.reduce((acc, result) => {
    if (!acc[result?.category]) {
      acc[result?.category] = [];
    }
    acc[result?.category]?.push(result);
    return acc;
  }, {} as Record<string, BloodTestResult[]>);

  const currentInsights =
    perspectiveInsights[perspective as any] || perspectiveInsights.conventional;

  const categoryToInsightMap: Record<string, string> = {
    Electrolytes: "Electrolyte Profile",
    "Kidney Function": "Kidney Function",
    Lipids: "Cholesterol Management",
    "Blood Sugar": "Blood Sugar Regulation",
    "Liver Function": "Detoxification Support",
  };

  const customCategoryInsights: Record<
    string,
    { title: string; content: string; color: string }
  > = {
    "Blood Sugar": {
      title: "Blood Sugar Summary",
      content:
        "Your blood sugar metrics provide insight into how your body processes glucose, which is essential for energy production. Maintaining balanced blood sugar levels is important for overall metabolic health and may help prevent conditions like diabetes and metabolic syndrome.",
      color: "#22c55e",
    },
    "Liver Function": {
      title: "Liver Health Assessment",
      content:
        "Your liver function tests evaluate how well your liver is performing its vital roles in detoxification, protein synthesis, and producing biochemicals necessary for digestion. Optimal liver function is essential for overall health and wellbeing.",
      color: "#8B5CF6",
    },
  };

  const getCategoryInsight = (category: string) => {
    if (customCategoryInsights[category]) {
      return customCategoryInsights[category];
    }

    const insightTitle = categoryToInsightMap[category];
    if (!insightTitle) return null;

    return currentInsights.find(
      (insight) =>
        insight.title.includes(insightTitle) ||
        insightTitle.includes(insight.title)
    );
  };

  if (abnormalResults?.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {abnormalResults?.map(
        (biomarkerData) =>
          biomarkerData?.biomarker?.length > 0 && (
            <Accordion
              key={biomarkerData?.profile?.name}
              type="single"
              collapsible
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionItem
                value={biomarkerData?.profile?.name}
                className="border-b-0"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    <span className="font-medium text-base">
                      {biomarkerData?.profile?.name}
                    </span>
                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {biomarkerData?.biomarker?.length} abnormal
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="mb-6">
                    <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                      <h3
                        className="text-lg font-medium mb-2"
                        style={{ color: "#22c55e" }}
                      >
                        {
                          panelAnalysisResponses?.[biomarkerData?.profile?.name]
                            ?.panel
                        }
                      </h3>
                      <p className="text-gray-700">
                        {
                          panelAnalysisResponses?.[biomarkerData?.profile?.name]
                            ?.panelSummary
                        }
                      </p>
                    </div>
                  </div>

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
                      {biomarkerData?.biomarker?.map((result) => (
                        <>
                          <TableRow
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              toggleTestExpansion(result?.testName)
                            }
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
                          {expandedTests?.includes(result?.testName) && (
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

                                  {/* <TestResultTrendHistory
                                    result={
                                      latestResultByDateData?.[result?.testName]
                                    }
                                    testName={result?.testName}
                                    maxValue={result?.maxParameterValue}
                                    minValue={result?.minParameterValue}
                                    rangeObj={result?.rangeObj}
                                  /> */}

                                  <TestResultTrendHistoryGraphRechart
                                    testName={result?.testName}
                                    result={
                                      latestResultByDateData?.[result?.testName]
                                    }
                                    maxValue={result?.maxParameterValue}
                                    minValue={result?.minParameterValue}
                                  />
                                </div>

                                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                                  <h4 className="text-sm font-medium flex items-center text-amber-700 mb-2">
                                    <AlertCircle className="h-4 w-4 mr-1" />{" "}
                                    What does your result mean?
                                  </h4>
                                  <p className="text-sm text-gray-700">
                                    {
                                      biomarkerResponses?.[result?.testName]
                                        ?.englishLanguageAnalysisData
                                        ?.insightsRemarks
                                    }
                                  </p>
                                </div>

                                <div className="grid md:grid-cols-1 gap-4 mb-4">
                                  <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium flex items-center text-blue-700 mb-2">
                                      <Info className="h-4 w-4 mr-1" /> What is{" "}
                                      {result?.testName}?
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {
                                        biomarkerResponses?.[result?.testName]
                                          ?.englishLanguageAnalysisData
                                          ?.testInformation
                                      }
                                    </p>
                                  </div>

                                  {/* {result.whatAffects && (
                                <div className="bg-purple-50 rounded-lg p-4">
                                  <h4 className="text-sm font-medium flex items-center text-purple-700 mb-2">
                                    <Brain className="h-4 w-4 mr-1" /> What
                                    affects {result.name} levels?
                                  </h4>
                                  <p className="text-sm text-gray-700">
                                    {result.whatAffects}
                                  </p>
                                </div>
                              )} */}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
      )}
    </div>
  );
};

export default AbnormalTestsList;
