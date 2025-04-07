import React, { useState } from "react";
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

const ReportDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("report");
  const [perspective, setPerspective] = useState("conventional");

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
            <h1 className="text-3xl font-bold">{report.title}</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center">
                <p className="text-gray-500 mr-3">Date: {report.date}</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Order #: {report.orderNumber}
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
                {report.type === "blood-test" ? (
                  <BloodTestReport perspective={perspective} />
                ) : (
                  <div className="p-4 min-h-[400px]">
                    <p>{report.content}</p>
                    <div className="mt-10 p-10 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Report content would be displayed here.
                      </p>
                    </div>
                  </div>
                )}
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
                              {report.labName}
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
                            <td className="py-2 font-medium">{report.date}</td>
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
                              SAMPLE-{id === "1" ? "54321" : "12345"}
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
