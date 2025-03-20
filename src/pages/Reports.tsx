
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Eye, FileText, Heart, Droplets, Moon, Apple, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import ReportListItem from "@/components/reports/ReportListItem";

// Sample report data
const sampleReports = [
  {
    id: 1,
    title: "Blood Test Report",
    date: "Jan 15, 2025",
    fileType: "PDF",
    fileSize: "2.4 MB",
    url: "/report/1"
  },
  {
    id: 2,
    title: "X-Ray Report",
    date: "Jan 10, 2025",
    fileType: "JPEG",
    fileSize: "1.8 MB",
    url: "/report/2"
  },
  {
    id: 3,
    title: "Mental Health Assessment",
    date: "Jan 5, 2025",
    fileType: "DOC",
    fileSize: "856 KB",
    url: "/report/3"
  },
  {
    id: 4,
    title: "Annual Physical",
    date: "Dec 20, 2024",
    fileType: "PDF",
    fileSize: "3.1 MB",
    url: "/report/4"
  },
  {
    id: 5,
    title: "Vaccination Record",
    date: "Dec 15, 2024",
    fileType: "PDF",
    fileSize: "1.2 MB",
    url: "/report/5"
  }
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const handleUpload = () => {
    // This would be implemented with actual file upload functionality
    console.log("Upload button clicked");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Your Health Reports</h1>
          <p className="text-gray-500">View and upload your medical reports</p>
        </div>
        
        <div className="mt-6 mb-10">
          <Button 
            onClick={handleUpload} 
            className="w-full py-6 text-base bg-gray-800 hover:bg-gray-700 text-white rounded-xl"
          >
            <Upload className="mr-2 h-5 w-5" /> Upload New Report
          </Button>
          <p className="text-center text-gray-500 mt-3">
            Accepted formats: PDF, JPEG, PNG, DOC
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Reports</h2>
          <Button variant="ghost" className="flex items-center gap-1 text-gray-600">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        
        <Card className="wellness-card overflow-hidden">
          <ScrollArea className="h-[550px]">
            <div className="divide-y">
              {sampleReports.map(report => (
                <ReportListItem key={report.id} report={report} />
              ))}
            </div>
          </ScrollArea>
        </Card>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Reports;
