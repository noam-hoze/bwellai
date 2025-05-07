import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bloodTestResults } from "@/components/reports/data/bloodTestData";
import {
  getStatusColor,
  getStatusLabel,
} from "@/components/reports/types/bloodTest.types";
import {
  FileText,
  Download,
  Microscope,
  Shield,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TestResultRangeBar from "@/components/reports/components/test-result/TestResultRangeBar";
import { useGetUserReportData } from "@/service/hooks/ocr/useGetReportById";
import { getFormattedDateYMD, getReportSignalTextCalc } from "@/utils/utils";
import ReportSpectrum from "@/components/ui/ReportSpectrum/ReportSpectrum";
import { useGetUserBiomarkerReportData } from "@/service/hooks/ocr/useFileUpload";

const SharedReport = () => {
  const { reportId } = useParams<{ reportId: string }>();

  const [biomarkerDataStatus, setBiomarkerDataStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const [biomarkerResponses, setBiomarkerResponses] = useState({});
  const [chunkApiStatus, setChunkApiStatus] = useState(false);
  const [processingReport, setProcessingReport] = useState(false);

  const { data: reportFileShareData, isSuccess: reportFileShareSuccess } =
    useGetUserReportData(reportId, "MODERN_MEDICINE", "English");

  const { mutateAsync: userBiomarkerReportMutate } =
    useGetUserBiomarkerReportData();

  // Sample patient data - in a real app, this would come from your backend
  const patientData = {
    name: "Sarah Johnson",
    dateOfBirth: "07/15/1985",
    gender: "Female",
    patientId: "P-54982",
    testDate: "February 20, 2025",
    orderNumber: "ZTNmZmM1",
    collectionDate: "February 18, 2025",
  };

  // In a real app, you'd fetch the specific report data based on reportId
  // For now, we'll use the sample data we have

  // Group results by category
  const resultsByCategory = bloodTestResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, typeof bloodTestResults>);

  const abnormalResults = reportFileShareData?.data?.resultData?.filter(
    (result) => result?.profile?.status !== "Normal"
  );

  const abnormalResultsList = [];

  abnormalResults?.forEach((result) => {
    result?.biomarker?.forEach((b) => {
      if (b?.signalText !== "normal") {
        abnormalResultsList?.push(b);
      }
    });
  });

  useEffect(() => {
    const processBiomarkers = async () => {
      if (biomarkerDataStatus?.isLoading) return; // Prevent duplicate calls

      setBiomarkerDataStatus({
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const chunkArray = (array: any[], size: number) =>
          Array.from({ length: Math.ceil(array?.length / size) }, (_, index) =>
            array.slice(index * size, index * size + size)
          );

        const responseMap: Record<string, any> = {};
        const processedTests = new Set<string>(); // Track processed test names

        for (const batch of chunkArray(
          reportFileShareData?.data?.resultData?.flatMap((data) => {
            return [...data.biomarker];
          }),
          5
        )) {
          const filteredBatch = batch.filter(
            (biomarker) => !processedTests?.has(biomarker.testName)
          );

          const responses = await Promise.all(
            filteredBatch?.map((biomarker) =>
              userBiomarkerReportMutate({
                // prompt: biomarker,
                prompt: {
                  testName: biomarker?.testName,
                  testResultValue: biomarker?.testResultValue,
                  testMeasuringUnit: biomarker?.testMeasuringUnit,
                  minParameterValue: biomarker?.minParameterValue,
                  maxParameterValue: biomarker?.maxParameterValue,
                  // text: biomarker?.text,
                },
                language: "English",
                reportId: reportFileShareData?.reportId,
                testName: biomarker?.testName,
                userId: reportFileShareData?.userid,
                perspective: "MODERN_MEDICINE",
              })
            )
          );

          responses.forEach((res) => {
            const testName = res?.data?.testName;
            if (testName) {
              responseMap[testName] = res?.data;
              processedTests.add(testName); // Mark this test name as processed
            }
          });
        }

        setBiomarkerResponses(responseMap); // Store mapped responses in state
        setProcessingReport(false);
        setChunkApiStatus(false);
        setBiomarkerDataStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      } catch (error) {
        setBiomarkerDataStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
    };

    if (reportFileShareData?.data?.resultData?.length > 0 && chunkApiStatus) {
      processBiomarkers();
    }
  }, [reportFileShareData?.data?.resultData, chunkApiStatus]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-gray-700 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">
                Laboratory Test Report
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Check className="h-3.5 w-3.5 mr-1" /> Verified
              </Badge>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            For clinical review and medical record
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Patient Information */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-y-4">
              <div>
                <h2 className="font-bold text-lg mb-2">Patient Information</h2>
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Patient Name:</td>
                      <td className="py-1 font-medium">
                        {reportFileShareData?.data?.minimalData?.name || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">
                        Date of Birth:
                      </td>
                      <td className="py-1 font-medium">
                        {reportFileShareData?.data?.minimalData?.dateOfBirth ||
                          "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Gender:</td>
                      <td className="py-1 font-medium">
                        {reportFileShareData?.data?.minimalData?.gender ||
                          "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Patient ID:</td>
                      <td className="py-1 font-medium">
                        {reportFileShareData?.reportId || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="font-bold text-lg mb-2">Test Information</h2>
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Test Date:</td>
                      <td className="py-1 font-medium">
                        {new Date(
                          reportFileShareData?.uploadTime
                        )?.toLocaleString("en-GB", { timeZone: "UTC" }) ||
                          "N/A"}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="py-1 pr-4 text-gray-600">
                        Collection Date:
                      </td>
                      <td className="py-1 font-medium">
                        {patientData.collectionDate}
                      </td>
                    </tr> */}
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Order Number:</td>
                      <td className="py-1 font-medium">
                        {reportFileShareData?.reportId || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Report Type:</td>
                      <td className="py-1 font-medium">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Clinical Summary</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4 text-sm">
                This comprehensive blood panel reveals{" "}
                {abnormalResultsList?.length} abnormal result
                {abnormalResultsList?.length !== 1 ? "s" : ""}
                requiring attention. The patient shows{" "}
                {abnormalResultsList?.some((r) => r.status === "critical")
                  ? " critical "
                  : " moderate "}
                abnormalities in certain parameters, particularly:
              </p>

              <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
                {abnormalResultsList?.slice(0, 3).map((result) => (
                  <li key={result.id}>
                    <span className="font-medium">{result?.testName}:</span>{" "}
                    {result.testResultValue} {result.testResultUnit}
                    <span
                      style={{ color: getStatusColor(result.signalText) }}
                      className="ml-1.5 font-medium"
                    >
                      ({result.signalText})
                    </span>
                  </li>
                ))}
                {abnormalResultsList?.length > 3 && (
                  <li>
                    And {abnormalResultsList?.length - 3} other abnormal
                    result(s)
                  </li>
                )}
              </ul>

              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-800">
                <div className="flex items-center gap-1.5 font-medium mb-1">
                  <Info className="h-4 w-4" />
                  Clinical Recommendation
                </div>
                <p>
                  Based on these results, clinical correlation and follow-up is
                  advised, particularly regarding the abnormal parameters.
                  Consider repeat testing in 4-6 weeks to monitor trends.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complete Test Results */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Complete Test Results</h2>

          {reportFileShareData?.data?.resultData?.map((reportInfo) => {
            return (
              <div key={reportInfo?.profile?.name} className="mb-8">
                <h3 className="text-lg font-bold mb-3">
                  {reportInfo?.profile?.name}
                </h3>
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Test Name</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportInfo?.biomarker?.map((result) => {
                        const signalText = getReportSignalTextCalc({
                          testResultValue: result?.testResultValue,
                          minParameterValue: result?.minParameterValue,
                          maxParameterValue: result?.maxParameterValue,
                        });

                        return (
                          <TableRow key={result.testName}>
                            <TableCell className="font-medium">
                              {result.testName}
                            </TableCell>
                            <TableCell>
                              {result.testResultValue}{" "}
                              {result.testMeasuringUnit}
                            </TableCell>
                            <TableCell>
                              {result.minParameterValue} -{" "}
                              {result.maxParameterValue}{" "}
                              {result.testMeasuringUnit}
                            </TableCell>
                            <TableCell>
                              <span
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${getStatusColor(
                                    result.signalText
                                  )}20`,
                                  color: getStatusColor(
                                    result.signalText || signalText
                                  ),
                                }}
                              >
                                {getStatusLabel(
                                  result.signalText || signalText
                                )}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Selected Parameter Details */}

        {abnormalResultsList?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Abnormal Parameters in Detail
            </h2>

            {abnormalResultsList?.map((result) => {
              const signalText = getReportSignalTextCalc({
                testResultValue: result?.testResultValue,
                minParameterValue: result?.minParameterValue,
                maxParameterValue: result?.maxParameterValue,
              });

              return (
                signalText !== "normal" && (
                  <Card key={result?.testName} className="mb-4 overflow-hidden">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-bold mb-2">
                        {result?.testName}
                      </h3>
                      {/* <p className="text-sm mb-3 text-gray-700">
                    {result.description}
                  </p> */}

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1.5">Result</h4>
                          <div className="text-2xl font-bold">
                            {result?.testResultValue}{" "}
                            <span className="text-sm font-normal text-gray-500">
                              {result?.testMeasuringUnit}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Reference range: {result?.minParameterValue} -{" "}
                            {result?.maxParameterValue}{" "}
                            {result?.testMeasuringUnit}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1.5">Status</h4>
                          <div
                            className="text-lg font-bold"
                            style={{
                              color: getStatusColor(
                                result?.signalText || signalText
                              ),
                            }}
                          >
                            {getStatusLabel(result?.signalText || signalText)}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {result.value > result.max ? "Above" : "Below"}{" "}
                            reference range
                          </div>
                        </div>
                      </div>

                      {/* <TestResultRangeBar result={result} /> */}

                      {(!!Number(result?.maxParameterValue) ||
                        !!Number(result?.minParameterValue)) && (
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
                      )}
                    </CardContent>
                  </Card>
                )
              );
            })}
          </div>
        )}

        {/* Technical Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Technical Information</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-5">
                <div>
                  <h3 className="flex items-center text-md font-medium mb-2">
                    <Microscope className="h-4 w-4 mr-1.5" />
                    Testing Methodology
                  </h3>
                  <p className="text-sm text-gray-700">
                    This comprehensive blood panel was conducted using
                    state-of-the-art laboratory equipment and standardized
                    methodologies:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Chemistry panel: Spectrophotometric analysis</li>
                    <li>
                      CBC: Automated hematology analyzer with 6-part
                      differential
                    </li>
                    <li>Lipid profile: Enzymatic colorimetric method</li>
                    <li>Glucose: Hexokinase method</li>
                    <li>
                      HbA1c: High-performance liquid chromatography (HPLC)
                    </li>
                    <li>Liver enzymes: Spectrophotometric analysis</li>
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center text-md font-medium mb-2">
                    <Shield className="h-4 w-4 mr-1.5" />
                    Laboratory Certification
                  </h3>
                  <p className="text-sm text-gray-700">
                    Testing performed at Advanced Healthcare Laboratory,
                    certified under CLIA #12D0889412. All procedures follow
                    strict quality control protocols and are regularly validated
                    through external proficiency testing programs.
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium">Report Generated:</span>{" "}
                    February 22, 2025 at 14:32 EST
                  </p>
                  <p>
                    <span className="font-medium">
                      Supervising Pathologist:
                    </span>{" "}
                    Elizabeth Chen, MD, PhD
                  </p>
                  <p className="mt-2">
                    This report is electronically verified and is valid without
                    signature. Results should be interpreted in clinical context
                    by a qualified healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 px-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600 text-center">
        <p>
          © 2025 B-Well Health. This report is confidential and protected under
          HIPAA regulations.
        </p>
        <p className="mt-1">
          Report ID: {reportId || "ZTNmZmM1-425"} • Secure verification
          available at bwell-health.com/verify
        </p>
      </footer>
    </div>
  );
};

export default SharedReport;
