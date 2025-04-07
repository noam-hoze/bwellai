import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Upload, Eye, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Reports = () => {
  const [reports, setReports] = useState(initialReports);
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);
  const [processingReport, setProcessingReport] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setProcessingReport(true);
  };

  const handleProcessingComplete = () => {
    setProcessingReport(false);
    // This would be implemented with actual file upload functionality
    console.log("Report processing completed");
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
    toast({
      title: "Report deleted",
      description: "The report has been deleted successfully.",
    });
  };

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
          <Button
            onClick={handleUpload}
            className="w-full py-6 text-base bg-gray-800 hover:bg-gray-700 text-white rounded-xl"
          >
            <Upload className="mr-2 h-5 w-5" /> Upload New Report
          </Button>
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

        {/* All Reports Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Reports</h2>

            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blood">Blood Test</SelectItem>
                  <SelectItem value="xray">X-Ray</SelectItem>
                  <SelectItem value="mental">Mental Health</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>

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
                    <DropdownMenuItem onClick={() => setSortOrder("concerns")}>
                      Most Concerns
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card className="wellness-card overflow-hidden">
            <ScrollArea className="h-[550px]">
              <div className="divide-y">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <ReportListItem
                      key={report.id}
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
