
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";

const ReportDetail = () => {
  const { id } = useParams();

  // This would be replaced with actual data fetching logic
  const report = {
    id: Number(id),
    title: "Sample Report",
    date: "January 15, 2025",
    content: "This is a placeholder for the actual report content."
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Link to="/reports">
              <Button variant="ghost" className="p-0 mr-3">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Report #{id}</h1>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">{report.title}</h2>
              <p className="text-gray-500">{report.date}</p>
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
          
          <Card className="wellness-card p-6">
            <div className="p-4 min-h-[400px]">
              <p>{report.content}</p>
              <div className="mt-10 p-10 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Report content would be displayed here.</p>
              </div>
            </div>
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
