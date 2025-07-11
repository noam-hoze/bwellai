import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Upload, Eye, FileText, Shield, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { throttle } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReportListItem from "@/components/reports/ReportListItem";
import PrivacyBanner from "@/components/reports/PrivacyBanner";
import PrivacyIndicator from "@/components/reports/PrivacyIndicator";
import ReportProcessingAnimation from "@/components/reports/ReportProcessingAnimation";
import { useGetUserLastReportIDsData } from "@/service/hooks/ocr/useGetReportById";
import {
  useGetUserBiomarkerReportData,
  useGetUserPanelAnalysisReportData,
  useUserReportFileUpload,
} from "@/service/hooks/ocr/useFileUpload";
import CreditLimitModal from "@/components/reports/CreditLimitModal";
import ReportTypeSelectionModal from "@/components/reports/ReportTypeSelectionModal";
import { useGetUserSubscriptionQuota } from "@/service/hooks/subscription/useUserSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { useGetDeleteUserFoodDataFetcher } from "@/service/hooks/nutrition/useGetFoodReportUpload";

// Sample report data
const initialReports = [
  {
    id: 1,
    title: "Blood Test Report",
    dateUploaded: "Jan 15, 2025",
    testDate: "Jan 10, 2025",
    fileType: "PDF",
    fileSize: "2.4 MB",
    url: "/report/1",
    concernCount: 3,
  },
  {
    id: 2,
    title: "X-Ray Report",
    dateUploaded: "Jan 10, 2025",
    testDate: "Jan 5, 2025",
    fileType: "JPEG",
    fileSize: "1.8 MB",
    url: "/report/2",
    concernCount: 0,
  },
  {
    id: 3,
    title: "Mental Health Assessment",
    dateUploaded: "Jan 5, 2025",
    testDate: "Dec 30, 2024",
    fileType: "DOC",
    fileSize: "856 KB",
    url: "/report/3",
    concernCount: 1,
  },
  {
    id: 4,
    title: "Annual Physical",
    dateUploaded: "Dec 20, 2024",
    testDate: "Dec 15, 2024",
    fileType: "PDF",
    fileSize: "3.1 MB",
    url: "/report/4",
    concernCount: 2,
  },
  {
    id: 5,
    title: "Vaccination Record",
    dateUploaded: "Dec 15, 2024",
    testDate: "Dec 10, 2024",
    fileType: "PDF",
    fileSize: "1.2 MB",
    url: "/report/5",
    concernCount: 0,
  },
];

const supportedFileTypes = ["pdf", "jpeg", "jpg", "png", "doc", "docx"];

const Reports = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false); // cooldown flag

  const [hasTriggered, setHasTriggered] = useState(false);

  const [reports, setReports] = useState(initialReports);
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedReports, setSortedReports] = useState([]);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);
  const [processingReport, setProcessingReport] = useState(false);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectFile, setSelectedFile] = useState<any>(null);

  const [biomarkerResponses, setBiomarkerResponses] = useState({});
  const [panelAnalysisResponses, setPanelAnalysisResponses] = useState({});
  const [creditLimitModalOpen, setCreditLimitModalOpen] = useState(false);
  const [reportTypeModalOpen, setReportTypeModalOpen] = useState(false);

  const [unsupportedFileModalOpen, setUnsupportedFileModalOpen] =
    useState(false);
  const [unsupportedFileType, setUnsupportedFileType] = useState("");

  const [chunkApiStatus, setChunkApiStatus] = useState(false);
  const [chunkPanelAnalysisApiStatus, setChunkPanelAnalysisApiStatus] =
    useState(false);

  const [fileUploadStatus, setFileUploadStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
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

  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: userReportFileUploadData,
    error: userReportFileUploadError,
    isPending: userReportFileUploadPending,
    isSuccess: userReportFileUploadSuccess,
    isError: userReportFileUploadIsError,
    mutate: userReportFileUploadMutate,
  } = useUserReportFileUpload();

  const {
    data: userLastReportIDsData,
    isSuccess: userLastReportIDsSuccess,
    refetch: userPreviousIsRefetch,
    isFetching: userPreviousIsFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserLastReportIDsData({ isAuthenticated: true });

  const { mutateAsync: userBiomarkerReportMutate } =
    useGetUserBiomarkerReportData();

  const { mutateAsync: userPanelAnalysisReportMutate } =
    useGetUserPanelAnalysisReportData();

  const { isAuthenticated } = useAuth();

  const {
    data: getUserSubscriptionQuotaData,
    isSuccess: getUserSubscriptionQuotaIsSuccess,
  } = useGetUserSubscriptionQuota(
    isAuthenticated,
    true,
    "diagnostics_report_upload"
  );

  const {
    mutate: deleteUserFoodDataMutate,
    isSuccess: deleteUserFoodDataIsSuccess,
    isError: deleteUserFoodDataIsError,
  } = useGetDeleteUserFoodDataFetcher();

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
          userReportFileUploadData?.labReportResponse?.data?.resultData?.flatMap(
            (data) => {
              return [...data.biomarker];
            }
          ),
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
                reportId: userReportFileUploadData?.reportId,
                testName: biomarker?.testName,
                userId: userReportFileUploadData?.labReportResponse?.userid,
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
        userPreviousIsRefetch();
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

    if (
      userReportFileUploadData?.labReportResponse?.data?.resultData?.length >
        0 &&
      chunkApiStatus
    ) {
      processBiomarkers();
    }
  }, [
    userReportFileUploadData?.labReportResponse?.data?.resultData,
    chunkApiStatus,
  ]);

  useEffect(() => {
    if (
      userReportFileUploadSuccess &&
      biomarkerDataStatus?.isSuccess &&
      panelAnalysisDataStatus?.isSuccess
    ) {
      setFileUploadStatus({
        isLoading: true,
        isSuccess: true,
        isError: false,
      });

      const timeoutId = setTimeout(() => {
        setBiomarkerDataStatus({
          isSuccess: false,
          isError: false,
          isLoading: false,
        });
        setPanelAnalysisDataStatus({
          isSuccess: false,
          isError: false,
          isLoading: false,
        });
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [
    userReportFileUploadSuccess,
    biomarkerDataStatus?.isSuccess,
    panelAnalysisDataStatus?.isSuccess,
  ]);

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
          userReportFileUploadData?.labReportResponse?.data?.resultData?.flatMap(
            (data) => {
              return {
                panel: data?.profile?.name,
                test: [...data.biomarker],
              };
            }
          ),
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
                reportId: userReportFileUploadData?.reportId,
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
      userReportFileUploadData?.labReportResponse?.data?.resultData?.length >
        0 &&
      chunkPanelAnalysisApiStatus
    ) {
      processBiomarkers();
    }
  }, [
    userReportFileUploadData?.labReportResponse?.data?.resultData,
    chunkPanelAnalysisApiStatus,
  ]);

  const handleScroll = useCallback(
    throttle(() => {
      const el = viewportRef.current;
      if (!el || isFetchingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = el;

      // Within 150px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 150) {
        isFetchingRef.current = true; // block further triggers

        if (fetchNextPage) fetchNextPage();

        // Cooldown to prevent flooding (1.5s delay)
        setTimeout(() => {
          isFetchingRef.current = false;
        }, 1500);
      }
    }, 200), // throttle scroll check to once every 200ms
    [fetchNextPage]
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

      if (!supportedFileTypes.includes(fileExtension)) {
        setUnsupportedFileType(fileExtension);
        setUnsupportedFileModalOpen(true);
        return;
      }

      setSelectedFile(file);
      if (
        getUserSubscriptionQuotaData?.usageCount >=
        getUserSubscriptionQuotaData?.usageLimit
      ) {
        setCreditLimitModalOpen(true);
      } else {
        handleContinueAnyway();
      }
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileClick = (e) => {
    e.target.value = "";
    setSelectedFile(null);
  };

  const handleContinueAnyway = () => {
    setCreditLimitModalOpen(false);
    setReportTypeModalOpen(true);
  };

  const handleCreditLimitModalClose = () => {
    setCreditLimitModalOpen(false);
  };

  const handleReportTypeSelected = (reportType: string) => {
    setReportTypeModalOpen(false);
    // setProcessingReport(true);
    userReportFileUploadMutate({ PdfFile: selectFile, language: "English" });

    // In a real app, this would initiate the upload flow for the selected report type
    toast({
      title: "Upload initiated",
      description: `Starting upload for ${reportType} report...`,
    });
  };

  const handleProcessingComplete = () => {
    // setProcessingReport(false);
    setFileUploadStatus({
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  };

  const handleDeleteReport = (id: string) => {
    deleteUserFoodDataMutate({ esId: id, type: "lab_report" });
  };

  useEffect(() => {
    if (deleteUserFoodDataIsSuccess) {
      toast({
        title: "Report deleted",
        description: "The report has been deleted successfully.",
      });
      userPreviousIsRefetch();
    }
    if (deleteUserFoodDataIsError) {
      toast({
        title: "Unable to delete Report",
        description: "Something went wrong!",
      });
      userPreviousIsRefetch();
    }
  }, [deleteUserFoodDataIsSuccess, deleteUserFoodDataIsError]);

  useEffect(() => {
    if (userReportFileUploadPending) {
      setProcessingReport(true);
    }
  }, [userReportFileUploadPending]);

  useEffect(() => {
    if (userReportFileUploadData && userReportFileUploadSuccess) {
      if (
        userReportFileUploadData?.labReportResponse?.data?.resultData?.length >
        0
      ) {
        setChunkApiStatus(true);
        setChunkPanelAnalysisApiStatus(true);
      } else {
        setProcessingReport(false);
        userPreviousIsRefetch();
      }

      if (userReportFileUploadData?.code === 403) {
        setCreditLimitModalOpen(true);
        setProcessingReport(false);
      }
    }
  }, [userReportFileUploadData, userReportFileUploadSuccess]);

  useEffect(() => {
    const sorted = userLastReportIDsData?.pages
      ?.flatMap((reportIds) => {
        return reportIds?.data?.payload?.content;
      })
      ?.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "newest"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });

    setSortedReports(sorted);
  }, [sortOrder, userLastReportIDsData]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">Your Health Reports</h1>
            <PrivacyIndicator />
          </div>
          <p className="text-gray-500">View and upload your medical reports</p>
        </div>

        {showPrivacyBanner && <PrivacyBanner />}

        <div className="mt-6 mb-10">
          <div className="relative">
            <Button
              onClick={handleUpload}
              className="w-full py-6 text-base bg-gray-800 hover:bg-gray-700 text-white rounded-xl"
            >
              <Upload className="mr-2 h-5 w-5" /> Upload New Report
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="*/*"
              onChange={handleFileChange}
              onClick={handleFileClick}
            />
          </div>
          <p className="text-center text-gray-500 mt-3">
            <Shield className="inline h-3.5 w-3.5 mr-1.5 text-green-600" />
            Accepted formats: PDF, JPEG, PNG, DOC. All data is encrypted.
          </p>
        </div>

        {processingReport && (
          <ReportProcessingAnimation
            isProcessing={processingReport}
            onProcessingComplete={handleProcessingComplete}
          />
        )}

        {/* Credit Limit Modal */}
        <CreditLimitModal
          isOpen={creditLimitModalOpen}
          onClose={handleCreditLimitModalClose}
          onContinue={handleContinueAnyway}
        />

        {/* Report Type Selection Modal */}
        <ReportTypeSelectionModal
          isOpen={reportTypeModalOpen}
          onClose={() => setReportTypeModalOpen(false)}
          onTypeSelect={handleReportTypeSelected}
        />

        {/* Unsupported File Type Alert Dialog */}
        <AlertDialog
          open={unsupportedFileModalOpen}
          onOpenChange={setUnsupportedFileModalOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <FileX className="text-red-500 mr-2 h-5 w-5" />
                Unsupported File Format
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="mt-2">
                  {unsupportedFileType &&
                    `The file format ".${unsupportedFileType}" is not supported.`}
                </p>
                <p className="mt-4 font-medium">
                  Please upload one of these supported formats:
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {supportedFileTypes.map((type) => (
                    <div
                      key={type}
                      className="bg-gray-100 rounded px-3 py-1 text-center text-sm"
                    >
                      .{type}
                    </div>
                  ))}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setUnsupportedFileModalOpen(false)}
              >
                Try Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* All Reports Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Reports</h2>

            <div className="flex gap-2">
              {/* <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blood">Blood Test</SelectItem>
                  <SelectItem value="xray">X-Ray</SelectItem>
                  <SelectItem value="mental">Mental Health</SelectItem>
                </SelectContent>
              </Select> */}

              {/* <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Filter className="h-4 w-4" /> Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                      Oldest First
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => setSortOrder("concerns")}>
                      Most Concerns
                    </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card className="wellness-card overflow-hidden">
            <ScrollArea className="h-[550px]" ref={viewportRef}>
              <div className="divide-y">
                {sortedReports?.length > 0 ? (
                  sortedReports?.map((report, index: number) => (
                    <ReportListItem
                      key={index}
                      report={report}
                      onDelete={handleDeleteReport}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium">No reports found</p>
                    <p className="mt-1">Upload a new report to get started</p>
                  </div>
                )}
                {userPreviousIsFetching && (
                  <div className="p-8 text-center text-gray-500 border border-gray-500 rounded-md">
                    <p>Loading Reports</p>
                  </div>
                )}
                {/* {initialReports.map((report) => (
                  <ReportListItem
                    key={report.id}
                    report={report}
                    onDelete={handleDeleteReport}
                  />
                ))} */}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Reports;
