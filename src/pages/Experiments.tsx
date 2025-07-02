import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ScanResultModal from "@/components/experiments/ScanResultModal";
import ExperimentDisclaimer from "@/components/experiments/ExperimentDisclaimer";
import ScanTypeCard from "@/components/experiments/ScanTypeCard";
import ComingSoonSection from "@/components/experiments/ComingSoonSection";
import ExperimentsHeader from "@/components/experiments/ExperimentsHeader";
import EyeScanModal from "@/components/experiments/EyeScanModal";
import NailScanModal from "@/components/experiments/NailScanModal";
import TongueScanModal from "@/components/experiments/TongueScanModal";
import HandwritingScanModal from "@/components/experiments/HandwritingScanModal";
import { ScanResult } from "@/types/scanResults";

const Experiments = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showEyeModal, setShowEyeModal] = useState(false);
  const [showNailModal, setShowNailModal] = useState(false);
  const [showTongueModal, setShowTongueModal] = useState(false);
  const [showHandwritingModal, setShowHandwritingModal] = useState(false);

  const scanTypes = [
    {
      id: "eye",
      title: "Eye Analysis",
      image: "/lovable-uploads/95bbc289-3335-4810-80c0-1436a0b2f640.png",
      description: "Discover insights about your systemic health, stress levels, and potential conditions.",
      guidelines: [
        "Ensure bright, even lighting", 
        "Look directly at the camera",
        "Remove glasses or contact lenses",
        "Keep eye wide open and steady"
      ],
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: "nail",
      title: "Fingernail Analysis",
      image: "/lovable-uploads/9eaa070d-9e05-4709-aa66-79005f7bbde8.png",
      description: "Your nails reveal secrets about nutrition, circulation, and systemic health that you never knew existed.",
      guidelines: [
        "Clean nails without polish",
        "Good lighting on fingertips",
        "Hold hand steady and flat",
        "Include nail bed in frame"
      ],
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "tongue",
      title: "Tongue Analysis",
      image: "/lovable-uploads/83ff8d5a-a45a-4d6f-b784-52a751b368cd.png",
      description: "Ancient TCM wisdom meets modern AI to map your internal organ health and metabolic state.",
      guidelines: [
        "Avoid eating 30 minutes before",
        "Natural lighting preferred",
        "Center tongue in frame"
      ],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: "handwriting",
      title: "Handwriting Analysis",
      image: "/lovable-uploads/9ce81e63-521a-4509-a3bb-e0987c619db3.png",
      description: "Uncover your neurological health, emotional state, and personality traits through the art of writing.",
      guidelines: [
        "Write naturally on white paper",
        "Use black or blue pen",
        "Include full sentences",
        "Ensure clear, well-lit photo"
      ],
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  const comingSoon = [
    { icon: "🫴", title: "Skin Analysis", description: "Cancer risk & dermatology", bgColor: "bg-green-50" },
    { icon: "💁‍♀️", title: "Hair Analysis", description: "Density & health indicators", bgColor: "bg-purple-50" },
    { icon: "🧍", title: "Posture Scan", description: "Musculoskeletal alignment", bgColor: "bg-yellow-50" },
    { icon: "🚶", title: "Gait Analysis", description: "Neurological assessment", bgColor: "bg-blue-50" }
  ];

  const handleScanStart = (scanId: string) => {
    console.log("Starting scan with ID:", scanId);
    switch (scanId) {
      case "eye":
        setShowEyeModal(true);
        break;
      case "nail":
        setShowNailModal(true);
        break;
      case "tongue":
        setShowTongueModal(true);
        break;
      case "handwriting":
        setShowHandwritingModal(true);
        break;
    }
  };

  const handleAnalysisComplete = (result: ScanResult) => {
    console.log("Analysis complete with result:", result);
    setScanResult(result);
    setShowResults(true);
  };

  const handleResultsModalClose = (open: boolean) => {
    setShowResults(open);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <ExperimentsHeader />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <ExperimentDisclaimer />

          {/* Main Scan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {scanTypes.map((scan) => (
              <ScanTypeCard
                key={scan.id}
                scan={scan}
                onScanStart={handleScanStart}
              />
            ))}
          </div>

          <ComingSoonSection items={comingSoon} />
        </div>

        {/* Individual Scan Modals */}
        <EyeScanModal 
          open={showEyeModal}
          onOpenChange={setShowEyeModal}
          onAnalysisComplete={handleAnalysisComplete}
        />

        <NailScanModal 
          open={showNailModal}
          onOpenChange={setShowNailModal}
          onAnalysisComplete={handleAnalysisComplete}
        />

        <TongueScanModal 
          open={showTongueModal}
          onOpenChange={setShowTongueModal}
          onAnalysisComplete={handleAnalysisComplete}
        />

        <HandwritingScanModal 
          open={showHandwritingModal}
          onOpenChange={setShowHandwritingModal}
          onAnalysisComplete={handleAnalysisComplete}
        />

        {/* Results Modal */}
        <ScanResultModal 
          open={showResults}
          onOpenChange={handleResultsModalClose}
          result={scanResult}
        />
      </div>
    </Layout>
  );
};

export default Experiments;
