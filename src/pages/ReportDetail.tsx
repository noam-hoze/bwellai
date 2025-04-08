import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Share2,
  FileText,
  Microscope,
  Info,
} from "lucide-react";
import BloodTestReport from "@/components/reports/BloodTestReport";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PerspectiveSelector from "@/components/reports/PerspectiveSelector";
import AIDisclaimer from "@/components/reports/AIDisclaimer";
import { useGetUserPreviousReportData } from "@/service/hooks/ocr/useGetReportById";
import { formatDateToShortMonth } from "@/utils/utils";
import {
  useGetUserBiomarkerReportData,
  useGetUserPanelAnalysisReportData,
} from "@/service/hooks/ocr/useFileUpload";

const ReportDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("report");
  const [perspective, setPerspective] = useState("MODERN_MEDICINE");

  const [processingReport, setProcessingReport] = useState(false);
  const [biomarkerResponses, setBiomarkerResponses] = useState({});
  const [panelAnalysisResponses, setPanelAnalysisResponses] = useState({});

  const [biomarkerDataStatus, setBiomarkerDataStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const [panelAnalysisDataStatus, setPanelAnalysisDataStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const [chunkApiStatus, setChunkApiStatus] = useState(false);
  const [chunkPanelAnalysisApiStatus, setChunkPanelAnalysisApiStatus] =
    useState(false);

  // This would be replaced with actual data fetching logic
  const report = {
    id: Number(id),
    title: id === "1" ? "Blood Test Report" : "Sample Report",
    type: id === "1" ? "blood-test" : "generic",
    date: "January 15, 2025",
    content: "This is a placeholder for the actual report content.",
    doctor: "Dr. Sarah Wilson",
    labName: "Advanced Healthcare Laboratory",
    orderNumber: "ORD-" + (id === "1" ? "98765" : "12345"),
    collectionDate: "January 10, 2025",
  };

  const {
    data: userPreviousData,
    isError: userPreviousIsError,
    isSuccess: userPreviousIsSuccess,
    isLoading: userPreviousIsLoading,
    // status: userPreviousIsStatus,
  } = useGetUserPreviousReportData(perspective, id, true, "English");

  const { mutateAsync: userBiomarkerReportMutate } =
    useGetUserBiomarkerReportData();

  const { mutateAsync: userPanelAnalysisReportMutate } =
    useGetUserPanelAnalysisReportData();

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
          userPreviousData?.data?.resultData?.flatMap((data) => {
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
                reportId: userPreviousData?.reportId,
                testName: biomarker?.testName,
                userId: userPreviousData?.userid,
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

    console.log(userPreviousData?.data?.resultData?.length > 0, chunkApiStatus);

    if (userPreviousData?.data?.resultData?.length > 0 && chunkApiStatus) {
      processBiomarkers();
    }
  }, [userPreviousData?.data?.resultData, chunkApiStatus]);

  useEffect(() => {
    const processBiomarkers = async () => {
      if (panelAnalysisDataStatus?.isLoading) return; // Prevent duplicate calls
      setPanelAnalysisDataStatus({
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
          userPreviousData?.data?.resultData?.flatMap((data) => {
            return {
              panel: data?.profile?.name,
              test: [...data.biomarker],
            };
          }),
          3
        )) {
          const responses = await Promise.all(
            batch?.map((d) =>
              userPanelAnalysisReportMutate({
                panel: d?.panel,
                test: d?.test?.map((p) => {
                  return {
                    testName: p?.testName,
                    testResultValue: p?.testResultValue,
                    testMeasuringUnit: p?.testMeasuringUnit,
                    minParameterValue: p?.minParameterValue,
                    maxParameterValue: p?.maxParameterValue,
                    result_status: p?.result_status,
                    text: p?.text,
                  };
                }),
                reportId: userPreviousData?.reportId,
                language: "English",
                perspective: "MODERN_MEDICINE",
              })
            )
          );

          responses.forEach((res) => {
            const panel = res?.data?.panel;
            if (panel) {
              responseMap[panel] = res?.data;
              processedTests.add(panel); // Mark this test name as processed
            }
          });
        }

        setPanelAnalysisResponses(responseMap); // Store mapped responses in state
        setChunkPanelAnalysisApiStatus(false);
        setPanelAnalysisDataStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      } catch (error) {
        setPanelAnalysisDataStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
    };

    if (
      userPreviousData?.data?.resultData?.length > 0 &&
      chunkPanelAnalysisApiStatus
    ) {
      processBiomarkers();
    }
  }, [userPreviousData?.data?.resultData, chunkPanelAnalysisApiStatus]);

  useEffect(() => {
    if (userPreviousData && userPreviousIsSuccess) {
      if (userPreviousData?.data?.resultData?.length > 0) {
        setChunkApiStatus(true);
        setChunkPanelAnalysisApiStatus(true);
      }
    }
  }, [userPreviousData, userPreviousIsSuccess]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AIDisclaimer />

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Link to="/reports">
              <Button variant="ghost" className="p-0 mr-3">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">
              {userPreviousData?.reportName}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center">
                <p className="text-gray-500 mr-3">
                  Date:{" "}
                  {formatDateToShortMonth(
                    userPreviousData?.uploadTime || new Date()
                  )}
                </p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Order #: {userPreviousData?.reportId}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>

          {/* Perspective Selector */}
          <PerspectiveSelector
            activePerspective={perspective}
            onChange={setPerspective}
          />

          <Card className="wellness-card p-6 mb-6">
            <Tabs
              defaultValue="report"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger
                  value="report"
                  className="flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Report
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex items-center justify-center"
                >
                  <Microscope className="h-4 w-4 mr-2" />
                  Test Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="report">
                {/* {report.type === "blood-test" ? (
                  <BloodTestReport
                    perspective={perspective}
                    panelAnalysisResponses={panelAnalysisResponses}
                  />
                ) : (
                  <div className="p-4 min-h-[400px]">
                    <p>{report.content}</p>
                    <div className="mt-10 p-10 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Report content would be displayed here.
                      </p>
                    </div>
                  </div>
                )} */}
                <BloodTestReport
                  perspective={perspective}
                  userPreviousData={userPreviousData}
                  biomarkerResponses={biomarkerResponses}
                  panelAnalysisResponses={panelAnalysisResponses}
                />
              </TabsContent>

              <TabsContent value="details">
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-md font-medium mb-2">
                        Test Information
                      </h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-2 text-gray-600">Lab Name:</td>
                            <td className="py-2 font-medium">
                              {userPreviousData?.reportName}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">
                              Ordering Physician:
                            </td>
                            <td className="py-2 font-medium">
                              {report.doctor}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">
                              Collection Date:
                            </td>
                            <td className="py-2 font-medium">
                              {report.collectionDate}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">Report Date:</td>
                            <td className="py-2 font-medium">
                              {formatDateToShortMonth(
                                userPreviousData?.uploadTime || new Date()
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-md font-medium mb-2">
                        Sample Information
                      </h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-2 text-gray-600">Sample Type:</td>
                            <td className="py-2 font-medium">Blood</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">Sample ID:</td>
                            <td className="py-2 font-medium">
                              {userPreviousData?.reportId}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">
                              Collection Method:
                            </td>
                            <td className="py-2 font-medium">Venous Draw</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">
                              Fasting Status:
                            </td>
                            <td className="py-2 font-medium">
                              Fasting (8+ hours)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-medium mb-2">
                      Test Methodology
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This comprehensive blood panel was conducted using
                      state-of-the-art laboratory equipment and standardized
                      methodologies:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Chemistry panel: Spectrophotometric analysis</li>
                      <li>Lipid profile: Enzymatic colorimetric method</li>
                      <li>Glucose: Hexokinase method</li>
                      <li>
                        HbA1c: High-performance liquid chromatography (HPLC)
                      </li>
                      <li>Liver enzymes: Spectrophotometric analysis</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default ReportDetail;
