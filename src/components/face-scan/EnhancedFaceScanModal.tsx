
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  X, 
  ScanFace,
  Heart, 
  ActivitySquare, 
  Zap, 
  Star, 
  RefreshCw, 
  Save, 
  HelpCircle,
  Sun,
  Volume2,
  VolumeX,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  FileText, 
  Calendar,
  Edit3,
  Check,
  Info,
  ArrowLeft
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type ScanStep = "welcome" | "tips" | "scanning" | "verify" | "additional-data" | "processing" | "results";

interface EnhancedFaceScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Prepare a face frame component
const FaceFrame = ({ isPositioned }: { isPositioned: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div 
      className={`w-64 h-64 border-2 rounded-full transition-colors duration-500 ${
        isPositioned ? "border-green-500" : "border-gray-400"
      }`}
    >
      {isPositioned && (
        <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  </div>
);

// Tooltip component for help icons
const HelpTooltip = ({ text }: { text: string }) => (
  <div className="group relative">
    <Info className="h-4 w-4 text-blue-500 cursor-help" />
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
);

const EnhancedFaceScanModal = ({ isOpen, onClose }: EnhancedFaceScanModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<ScanStep>("welcome");
  const [scanProgress, setScanProgress] = useState(0);
  const [isPositioned, setIsPositioned] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [showTipsInFuture, setShowTipsInFuture] = useState(true);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [detectedMetrics, setDetectedMetrics] = useState({
    heartRate: null as number | null,
    bloodPressure: null as { systolic: number, diastolic: number } | null,
    stressLevel: null as number | null,
    oxygenSaturation: null as number | null,
  });
  
  // Form for additional data with corrected default values
  const form = useForm({
    defaultValues: {
      age: 46,
      gender: "female",
      height: 167,
      weight: 60,
      hasDiabetes: false,
      isSmoker: false,
      hasHypertensionTreatment: false,
      totalCholesterol: 138,
      hdlCholesterol: 43,
      systolicPressure: 121,
      waistCircumference: 78,
      physicalActivity: "moderate",
      ethnicity: "caucasian",
    },
  });
  
  // Mock final scan results
  const scanResults = {
    overallScore: 62,
    heartRate: 65,
    bloodPressure: { systolic: 121, diastolic: 77 },
    heartRateVariability: 59,
    breathingRate: 18,
    stressLevel: "Low",
    stressIndex: 1.5,
    stressScore: 28,
    oxygenSaturation: 98,
    respirationRate: 16,
    bodyComposition: { 
      bodyFat: 31, 
      bri: 4.2, 
      absi: 0.08, 
      ci: 1.2,
      muscle: 38, 
      hydration: 61 
    },
    metabolicHealth: {
      bmr: 1252.75,
      tdee: 1878.13
    },
    cardiovascularRisk: {
      tenYearRisk: 5.2,
      vascularAge: 51,
      hardEvents: 3.8,
      fatalEvents: 1.1
    },
    trends: {
      heartRate: [70, 74, 71, 73, 65],
      bloodPressure: [
        { systolic: 120, diastolic: 80 },
        { systolic: 122, diastolic: 81 },
        { systolic: 119, diastolic: 79 },
        { systolic: 120, diastolic: 78 },
        { systolic: 121, diastolic: 77 },
      ]
    }
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("welcome");
      setScanProgress(0);
      setIsPositioned(false);
      setProcessingProgress(0);
      setDetectedMetrics({
        heartRate: null,
        bloodPressure: null,
        stressLevel: null,
        oxygenSaturation: null,
      });
    }
  }, [isOpen]);

  // Simulate face positioning and scanning
  useEffect(() => {
    let positioningTimeout: number;
    let scanningInterval: number;
    
    if (isOpen && step === "scanning") {
      // Simulate face positioning
      positioningTimeout = window.setTimeout(() => {
        setIsPositioned(true);
        
        // Start simulating the scanning progress
        scanningInterval = window.setInterval(() => {
          setScanProgress(prev => {
            // Sequentially "detect" metrics as scan progresses
            if (prev === 25 && !detectedMetrics.heartRate) {
              setDetectedMetrics(prev => ({ ...prev, heartRate: 65 }));
            } else if (prev === 50 && !detectedMetrics.bloodPressure) {
              setDetectedMetrics(prev => ({ ...prev, bloodPressure: { systolic: 121, diastolic: 77 } }));
            } else if (prev === 75 && !detectedMetrics.stressLevel) {
              setDetectedMetrics(prev => ({ ...prev, stressLevel: 28 }));
            } else if (prev === 90 && !detectedMetrics.oxygenSaturation) {
              setDetectedMetrics(prev => ({ ...prev, oxygenSaturation: 98 }));
            }
            
            if (prev >= 100) {
              clearInterval(scanningInterval);
              setStep("verify");
              return 100;
            }
            return prev + 1;
          });
        }, 100);
      }, 3000);
    }
    
    return () => {
      clearTimeout(positioningTimeout);
      clearInterval(scanningInterval);
    };
  }, [isOpen, step, detectedMetrics]);

  // Simulate processing
  useEffect(() => {
    let processingInterval: number;
    
    if (isOpen && step === "processing") {
      processingInterval = window.setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(processingInterval);
            setStep("results");
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
    
    return () => {
      clearInterval(processingInterval);
    };
  }, [isOpen, step]);

  const handleStartScan = () => {
    if (showTipsInFuture) {
      setStep("tips");
    } else {
      setStep("scanning");
    }
  };

  const handleSkipTips = () => {
    setShowTipsInFuture(false);
    setStep("scanning");
  };

  const handleProceedFromTips = () => {
    setStep("scanning");
  };

  const handleRetakeScan = () => {
    setScanProgress(0);
    setIsPositioned(false);
    setDetectedMetrics({
      heartRate: null,
      bloodPressure: null,
      stressLevel: null,
      oxygenSaturation: null,
    });
    setStep("scanning");
  };

  const handleConfirmResults = () => {
    setStep("additional-data");
  };

  const handleBackToVerify = () => {
    setStep("verify");
  };

  const handleProceedToProcessing = () => {
    setStep("processing");
    setProcessingProgress(0);
  };

  const handleSaveData = () => {
    toast({
      title: "Metrics Updated Successfully",
      description: "Your health metrics have been updated across the app.",
    });
    onClose();
  };

  const handleToggleVoiceGuidance = () => {
    setIsVoiceOn(prev => !prev);
    toast({
      title: isVoiceOn ? "Voice Guidance Off" : "Voice Guidance On",
      description: isVoiceOn ? "Voice guidance has been disabled" : "Voice guidance has been enabled",
    });
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Your metrics report has been generated and is ready to download.",
    });
  };

  const handleScheduleReminder = () => {
    toast({
      title: "Reminder Scheduled",
      description: "You'll be reminded to scan again in 7 days.",
    });
  };

  const renderStarRating = (rating: number, max: number = 5) => {
    return (
      <div className="flex">
        {[...Array(max)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getMeasurementStatus = (value: number, normalMin: number, normalMax: number) => {
    if (value < normalMin) return "text-blue-500";
    if (value > normalMax) return "text-red-500";
    return "text-green-500";
  };

  // Welcome step rendering function
  const renderWelcomeStep = () => (
    <div className="text-center space-y-6 py-8">
      <div className="mx-auto bg-blue-50 rounded-full p-5 w-20 h-20 flex items-center justify-center">
        <ScanFace className="h-10 w-10 text-blue-500" />
      </div>
      
      <h2 className="text-2xl font-semibold">Scan Your Face for Vitals</h2>
      
      <div className="space-y-4 max-w-md mx-auto">
        <p className="text-gray-600">
          This 60-second scan measures vital signs through facial analysis.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-sm">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Takes under 1 minute</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Data stays private</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Your face is never stored as an image. We only analyze patterns to extract health metrics.
        </p>
      </div>
      
      <Button 
        onClick={handleStartScan} 
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full max-w-xs"
      >
        Start Scan
      </Button>
    </div>
  );

  // Tips step rendering function
  const renderTipsStep = () => (
    <div className="space-y-6 py-6">
      <h2 className="text-xl font-semibold text-center">Preparation Tips</h2>
      
      <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
        {[
          { icon: Lightbulb, title: "Good Lighting", desc: "Face should be well-lit" },
          { icon: Camera, title: "Face the Camera", desc: "Keep your face centered" },
          { icon: ScanFace, title: "Remove Glasses", desc: "For better accuracy" }
        ].map((tip, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="bg-blue-50 rounded-full p-3 mb-3">
              <tip.icon className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="font-medium text-sm">{tip.title}</h3>
            <p className="text-xs text-gray-500">{tip.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 max-w-lg mx-auto">
        <h3 className="font-medium mb-2 text-sm">Quick Checklist:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            </div>
            <span>Find a quiet spot with minimal movement</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            </div>
            <span>Ensure good lighting on your face</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            </div>
            <span>Remove glasses if possible for better results</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mx-auto max-w-lg">
        <Button 
          onClick={handleProceedFromTips} 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={handleSkipTips} 
          className="flex-1"
        >
          Skip Tips Next Time
        </Button>
      </div>
    </div>
  );

  // Scanning step rendering function
  const renderScanningStep = () => (
    <div className="flex flex-col items-center space-y-6 py-6">
      <div className="relative w-full max-w-sm h-64 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
        {/* Dynamic face outline */}
        <FaceFrame isPositioned={isPositioned} />
        
        {!isPositioned && (
          <div className="animate-pulse text-white text-center max-w-[200px]">
            <p>Position your face within the outline</p>
          </div>
        )}
        
        {/* Voice guidance toggle */}
        <button 
          onClick={handleToggleVoiceGuidance}
          className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {isVoiceOn ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </button>
        
        {/* Circular progress */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          <circle 
            cx="200" 
            cy="150" 
            r="140" 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 140}
            className="opacity-30"
          />
          <circle 
            cx="200" 
            cy="150" 
            r="140" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 140}
            strokeDashoffset={(1 - scanProgress / 100) * 2 * Math.PI * 140}
            className="transition-all duration-300"
            transform="rotate(-90 200 150)"
          />
        </svg>
        
        {/* Subtle background gradient animation */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-green-900/30 animate-pulse"
          style={{ opacity: 0.3 }}
        ></div>
      </div>
      
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Scanning in progress...</span>
          <span className="text-sm font-bold">{scanProgress}%</span>
        </div>
        
        <Progress value={scanProgress} className="h-2" />
        
        {/* Real-time detected metrics */}
        <div className="grid grid-cols-2 gap-3">
          {detectedMetrics.heartRate && (
            <Card className="bg-gray-50 border border-gray-100 animate-fade-in">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium">Heart Rate</span>
                </div>
                <p className="text-lg font-bold">{detectedMetrics.heartRate} <span className="text-xs font-normal">bpm</span></p>
              </CardContent>
            </Card>
          )}
          
          {detectedMetrics.bloodPressure && (
            <Card className="bg-gray-50 border border-gray-100 animate-fade-in">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <ActivitySquare className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">Blood Pressure</span>
                </div>
                <p className="text-lg font-bold">
                  {detectedMetrics.bloodPressure.systolic}/{detectedMetrics.bloodPressure.diastolic}
                </p>
              </CardContent>
            </Card>
          )}
          
          {detectedMetrics.stressLevel && (
            <Card className="bg-gray-50 border border-gray-100 animate-fade-in">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium">Stress Level</span>
                </div>
                <p className="text-lg font-bold">{detectedMetrics.stressLevel}%</p>
              </CardContent>
            </Card>
          )}
          
          {detectedMetrics.oxygenSaturation && (
            <Card className="bg-gray-50 border border-gray-100 animate-fade-in">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <ActivitySquare className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-medium">O₂ Saturation</span>
                </div>
                <p className="text-lg font-bold">{detectedMetrics.oxygenSaturation}%</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Button 
          variant="destructive" 
          onClick={onClose} 
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel Scan
        </Button>
      </div>
    </div>
  );

  // Verify step rendering function
  const renderVerifyStep = () => (
    <div className="space-y-6 py-6">
      <h2 className="text-xl font-semibold text-center">Verify Your Results</h2>
      
      <p className="text-center text-gray-600 max-w-md mx-auto">
        Please review the captured metrics. If anything looks incorrect, you can retake the scan.
      </p>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="font-medium">Heart Rate</h4>
            </div>
            <p className="text-2xl font-bold">{detectedMetrics.heartRate} <span className="text-sm font-normal">bpm</span></p>
            <p className="text-xs text-gray-500 mt-1">Normal range: 60-100 bpm</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ActivitySquare className="h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Blood Pressure</h4>
            </div>
            <p className="text-2xl font-bold">
              {detectedMetrics.bloodPressure?.systolic}/{detectedMetrics.bloodPressure?.diastolic}
            </p>
            <p className="text-xs text-gray-500 mt-1">Normal range: &lt;120/80 mmHg</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <h4 className="font-medium">Stress Level</h4>
            </div>
            <p className="text-2xl font-bold">{detectedMetrics.stressLevel}%</p>
            <p className="text-xs text-gray-500 mt-1">Normal range: 0-30%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ActivitySquare className="h-5 w-4 text-green-500" />
              <h4 className="font-medium">O₂ Saturation</h4>
            </div>
            <p className="text-2xl font-bold">{detectedMetrics.oxygenSaturation}%</p>
            <p className="text-xs text-gray-500 mt-1">Normal range: 95-100%</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
        <Button 
          onClick={handleConfirmResults} 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          Confirm & Continue
        </Button>
        <Button 
          variant="outline" 
          onClick={handleRetakeScan} 
          className="flex-1"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retake Scan
        </Button>
      </div>
    </div>
  );

  // Additional data step rendering function with fixed footer
  const renderAdditionalDataStep = () => (
    <div className="flex flex-col h-full">
      <div className="space-y-6 py-4 overflow-y-auto flex-grow" style={{ maxHeight: "calc(70vh - 80px)" }}>
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Additional Health Details</h2>
          <p className="text-gray-600 mt-1">Let's add a few details for complete results</p>
        </div>
        
        <Form {...form}>
          <form className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="age">Age (years)</Label>
                    <HelpTooltip text="Your age helps us calculate age-specific risk factors" />
                  </div>
                  <Input
                    id="age"
                    type="number"
                    value={form.getValues("age")}
                    onChange={(e) => form.setValue("age", parseInt(e.target.value))}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Gender</Label>
                    <HelpTooltip text="We use biological gender to calculate certain health metrics" />
                  </div>
                  <RadioGroup 
                    defaultValue={form.getValues("gender")}
                    onValueChange={(value) => form.setValue("gender", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="height">Height (cm)</Label>
                    <HelpTooltip text="Used to calculate BMI and other body metrics" />
                  </div>
                  <Input
                    id="height"
                    type="number"
                    value={form.getValues("height")}
                    onChange={(e) => form.setValue("height", parseInt(e.target.value))}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <HelpTooltip text="Used to calculate BMI and metabolic rate" />
                  </div>
                  <Input
                    id="weight"
                    type="number"
                    value={form.getValues("weight")}
                    onChange={(e) => form.setValue("weight", parseInt(e.target.value))}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Health Markers
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between space-x-4 bg-white p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="diabetes" 
                        checked={form.getValues("hasDiabetes")}
                        onCheckedChange={(checked) => form.setValue("hasDiabetes", checked as boolean)}
                      />
                      <Label htmlFor="diabetes">Diabetes</Label>
                    </div>
                    <HelpTooltip text="History of diabetes affects cardiovascular risk calculations" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4 bg-white p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="smoker" 
                        checked={form.getValues("isSmoker")}
                        onCheckedChange={(checked) => form.setValue("isSmoker", checked as boolean)}
                      />
                      <Label htmlFor="smoker">Smoker</Label>
                    </div>
                    <HelpTooltip text="Smoking status significantly impacts health risk factors" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4 bg-white p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hypertension" 
                        checked={form.getValues("hasHypertensionTreatment")}
                        onCheckedChange={(checked) => form.setValue("hasHypertensionTreatment", checked as boolean)}
                      />
                      <Label htmlFor="hypertension">Hypertension Treatment</Label>
                    </div>
                    <HelpTooltip text="Treatment for high blood pressure affects risk calculations" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dl)</Label>
                      <HelpTooltip text="Cholesterol levels are key indicators of cardiovascular health" />
                    </div>
                    <Input
                      id="totalCholesterol"
                      type="number"
                      value={form.getValues("totalCholesterol")}
                      onChange={(e) => form.setValue("totalCholesterol", parseInt(e.target.value))}
                      className="bg-white"
                    />
                    <p className="text-xs text-gray-500">Normal range: &lt;200 mg/dl</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hdlCholesterol">HDL Cholesterol (mg/dl)</Label>
                      <HelpTooltip text="HDL is 'good' cholesterol that helps protect against heart disease" />
                    </div>
                    <Input
                      id="hdlCholesterol"
                      type="number"
                      value={form.getValues("hdlCholesterol")}
                      onChange={(e) => form.setValue("hdlCholesterol", parseInt(e.target.value))}
                      className="bg-white"
                    />
                    <p className="text-xs text-gray-500">Normal range: &gt;40 mg/dl for men, &gt;50 mg/dl for women</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="systolicPressure">Systolic Pressure (mmHg)</Label>
                      <HelpTooltip text="We've detected this from your scan, but you can adjust if needed" />
                    </div>
                    <Input
                      id="systolicPressure"
                      type="number"
                      value={form.getValues("systolicPressure")}
                      onChange={(e) => form.setValue("systolicPressure", parseInt(e.target.value))}
                      className="bg-white"
                    />
                    <p className="text-xs text-gray-500">Normal range: &lt;120 mmHg</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Additional Factors
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="waistCircumference">Waist Circumference (cm)</Label>
                    <HelpTooltip text="Waist size is an important indicator of metabolic health" />
                  </div>
                  <Input
                    id="waistCircumference"
                    type="number"
                    value={form.getValues("waistCircumference")}
                    onChange={(e) => form.setValue("waistCircumference", parseInt(e.target.value))}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Physical Activity Level</Label>
                    <HelpTooltip text="Your activity level affects metabolic calculations" />
                  </div>
                  <RadioGroup 
                    defaultValue={form.getValues("physicalActivity")}
                    onValueChange={(value) => form.setValue("physicalActivity", value)}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sedentary" id="sedentary" />
                      <Label htmlFor="sedentary">Sedentary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label>Ethnicity</Label>
                    <HelpTooltip text="Some health risk calculations vary by ethnic group" />
                  </div>
                  <RadioGroup 
                    defaultValue={form.getValues("ethnicity")}
                    onValueChange={(value) => form.setValue("ethnicity", value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="caucasian" id="caucasian" />
                      <Label htmlFor="caucasian">Caucasian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="african" id="african" />
                      <Label htmlFor="african">African</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="asian" id="asian" />
                      <Label htmlFor="asian">Asian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hispanic" id="hispanic" />
                      <Label htmlFor="hispanic">Hispanic</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      
      {/* Fixed footer with navigation buttons */}
      <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 mt-4">
        <div className="flex flex-col sm:flex-row gap-3 mx-auto max-w-lg">
          <Button 
            variant="outline" 
            onClick={handleBackToVerify} 
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleProceedToProcessing} 
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Continue to Results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Processing step rendering function
  const renderProcessingStep = () => (
    <div className="space-y-8 py-10 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={(1 - processingProgress / 100) * 2 * Math.PI * 46}
            className="transition-all duration-300"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
          {processingProgress}%
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-medium mb-2">Processing Your Health Data</h3>
        <p className="text-gray-600 max-w-md">
          We're combining your scan results with the additional information to generate comprehensive health insights.
        </p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="space-y-3">
          <div className="flex items-center">
            <Check className="text-green-500 mr-2 h-5 w-5" />
            <span>Analyzing facial blood flow patterns</span>
          </div>
          <div className="flex items-center">
            <Check className="text-green-500 mr-2 h-5 w-5" />
            <span>Calculating vital signs from micro-movements</span>
          </div>
          <div className="flex items-center">
            {processingProgress > 30 ? (
              <Check className="text-green-500 mr-2 h-5 w-5" />
            ) : (
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
            <span>Computing cardiovascular risk indices</span>
          </div>
          <div className="flex items-center">
            {processingProgress > 60 ? (
              <Check className="text-green-500 mr-2 h-5 w-5" />
            ) : (
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
            <span>Calculating metabolic health markers</span>
          </div>
          <div className="flex items-center">
            {processingProgress > 85 ? (
              <Check className="text-green-500 mr-2 h-5 w-5" />
            ) : (
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
            <span>Generating personalized recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Results step rendering function
  const renderResultsStep = () => (
    <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
      <div className="text-center mb-6">
        <div className="inline-block bg-gray-50 rounded-full p-4">
          <div className={`text-3xl font-bold ${getScoreColor(scanResults.overallScore)}`}>
            {scanResults.overallScore}
          </div>
          <div className="text-xs mt-1">Health Score</div>
        </div>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Your health score is a comprehensive rating based on facial scan and additional health factors.
        </p>
      </div>
      
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="risk">Health Risk</TabsTrigger>
          <TabsTrigger value="body">Body Composition</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Vital Measurements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm">Heart Rate</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.heartRate, 60, 100)}`}>
                      {scanResults.heartRate} bpm
                    </span>
                    <span className="text-xs text-gray-400 ml-2">60-100</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Blood Pressure</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.bloodPressure.systolic, 90, 120)}`}>
                      {scanResults.bloodPressure.systolic}/{scanResults.bloodPressure.diastolic}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;120/80</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">Heart Rate Variability</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.heartRateVariability, 40, 100)}`}>
                      {scanResults.heartRateVariability} ms
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&gt;40</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Breathing Rate</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.breathingRate, 12, 20)}`}>
                      {scanResults.breathingRate} bpm
                    </span>
                    <span className="text-xs text-gray-400 ml-2">12-20</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-cyan-500 mr-2" />
                    <span className="text-sm">O₂ Saturation</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.oxygenSaturation, 95, 100)}`}>
                      {scanResults.oxygenSaturation}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">95-100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stress Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Stress Level</span>
                  </div>
                  <span className="font-semibold">{scanResults.stressLevel}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Stress Index</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.stressIndex, 0, 3)}`}>
                      {scanResults.stressIndex}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;3</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Your stress levels are currently within normal range. Maintaining regular stress management practices can help keep these levels optimal.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-none sm:col-span-2">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 flex items-center text-blue-800">
                  <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Personalized Insights
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Your heart rate variability of 59ms is good and indicates balanced autonomic nervous system function.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Your blood pressure is slightly elevated. Consider increasing physical activity and reducing sodium intake.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Your breathing pattern shows signs of occasional shallow breathing, which may contribute to your stress levels.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cardiovascular Risk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm">10-Year Risk</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.cardiovascularRisk.tenYearRisk, 0, 7.5)}`}>
                      {scanResults.cardiovascularRisk.tenYearRisk}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;7.5%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm">Hard Events Risk</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.cardiovascularRisk.hardEvents, 0, 5)}`}>
                      {scanResults.cardiovascularRisk.hardEvents}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;5%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">Fatal Events Risk</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.cardiovascularRisk.fatalEvents, 0, 2)}`}>
                      {scanResults.cardiovascularRisk.fatalEvents}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;2%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Vascular Age</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${
                      form.getValues("age") > scanResults.cardiovascularRisk.vascularAge ? 
                      "text-green-500" : 
                      form.getValues("age") + 5 > scanResults.cardiovascularRisk.vascularAge ? 
                      "text-yellow-500" : "text-red-500"
                    }`}>
                      {scanResults.cardiovascularRisk.vascularAge} years
                    </span>
                    <span className="text-xs text-gray-400 ml-2">Your age: {form.getValues("age")}</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Your cardiovascular risk is within moderate range. Your vascular age is {scanResults.cardiovascularRisk.vascularAge - form.getValues("age")} years above your chronological age, suggesting some room for improvement.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Cholesterol</span>
                    <div className="flex items-center">
                      <span className={`font-semibold ${getMeasurementStatus(form.getValues("totalCholesterol"), 0, 200)}`}>
                        {form.getValues("totalCholesterol")} mg/dl
                      </span>
                      <span className="text-xs text-gray-400 ml-2">&lt;200</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">HDL Cholesterol</span>
                    <div className="flex items-center">
                      <span className={`font-semibold ${
                        form.getValues("gender") === "female" ? 
                        getMeasurementStatus(form.getValues("hdlCholesterol"), 50, 200) : 
                        getMeasurementStatus(form.getValues("hdlCholesterol"), 40, 200)
                      }`}>
                        {form.getValues("hdlCholesterol")} mg/dl
                      </span>
                      <span className="text-xs text-gray-400 ml-2">&gt;{form.getValues("gender") === "female" ? "50" : "40"}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Smoking Status</span>
                    <div className="flex items-center">
                      <span className={`font-semibold ${form.getValues("isSmoker") ? "text-red-500" : "text-green-500"}`}>
                        {form.getValues("isSmoker") ? "Smoker" : "Non-smoker"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blood Pressure</span>
                    <div className="flex items-center">
                      <span className={`font-semibold ${getMeasurementStatus(form.getValues("systolicPressure"), 90, 120)}`}>
                        {form.getValues("systolicPressure")}/{scanResults.bloodPressure.diastolic} mmHg
                      </span>
                      <span className="text-xs text-gray-400 ml-2">&lt;120/80</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Your HDL cholesterol is slightly below optimal levels. Consider increasing intake of omega-3 rich foods like fatty fish, nuts and olive oil.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-none sm:col-span-2">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 flex items-center text-blue-800">
                  <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Recommended Actions
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Schedule a follow-up with your healthcare provider to discuss your cholesterol levels.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Consider increasing your weekly aerobic exercise to 150+ minutes to improve vascular health.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Adopt the DASH diet approach to help manage blood pressure naturally.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="body" className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Body Composition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm">Body Fat</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${
                      form.getValues("gender") === "female" ? 
                      getMeasurementStatus(scanResults.bodyComposition.bodyFat, 18, 28) : 
                      getMeasurementStatus(scanResults.bodyComposition.bodyFat, 10, 20)
                    }`}>
                      {scanResults.bodyComposition.bodyFat}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {form.getValues("gender") === "female" ? "18-28%" : "10-20%"}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm">Muscle Mass</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">
                      {scanResults.bodyComposition.muscle}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ActivitySquare className="h-4 w-4 text-cyan-500 mr-2" />
                    <span className="text-sm">Hydration</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.bodyComposition.hydration, 55, 65)}`}>
                      {scanResults.bodyComposition.hydration}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">55-65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Body Indices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm flex items-center">
                      BMI
                      <HelpTooltip text="Body Mass Index - weight relative to height" />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(
                      (form.getValues("weight") / ((form.getValues("height")/100) ** 2)), 
                      18.5, 24.9
                    )}`}>
                      {(form.getValues("weight") / ((form.getValues("height")/100) ** 2)).toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">18.5-24.9</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm flex items-center">
                      BRI
                      <HelpTooltip text="Body Roundness Index - predicts percentage body fat" />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.bodyComposition.bri, 2, 5)}`}>
                      {scanResults.bodyComposition.bri}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">2-5</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm flex items-center">
                      ABSI
                      <HelpTooltip text="A Body Shape Index - relates waist circumference to BMI and height" />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.bodyComposition.absi, 0.07, 0.1)}`}>
                      {scanResults.bodyComposition.absi}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm flex items-center">
                      CI
                      <HelpTooltip text="Conicity Index - detects central obesity" />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-semibold ${getMeasurementStatus(scanResults.bodyComposition.ci, 1.0, 1.25)}`}>
                      {scanResults.bodyComposition.ci}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">&lt;1.25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Metabolic Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm flex items-center">
                      Basal Metabolic Rate
                      <HelpTooltip text="Calories burned at complete rest" />
                    </span>
                  </div>
                  <span className="font-semibold">
                    {scanResults.metabolicHealth.bmr.toFixed(2)} kcal
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm flex items-center">
                      Total Daily Energy Expenditure
                      <HelpTooltip text="Total calories burned per day including activity" />
                    </span>
                  </div>
                  <span className="font-semibold">
                    {scanResults.metabolicHealth.tdee.toFixed(2)} kcal
                  </span>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Your body composition metrics indicate a slightly elevated body fat percentage. Focus on building lean muscle through strength training 2-3 times per week to improve your metabolic health.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Heart Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 w-full">
                  <svg viewBox="0 0 500 150" className="w-full h-full">
                    {scanResults.trends.heartRate.map((value, index, array) => {
                      const x1 = index * (500 / (array.length - 1));
                      const y1 = 150 - value;
                      const x2 = (index + 1) * (500 / (array.length - 1));
                      const y2 = index < array.length - 1 ? 150 - array[index + 1] : y1;
                      
                      return index < array.length - 1 ? (
                        <line 
                          key={index}
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                        />
                      ) : null;
                    })}
                    
                    {scanResults.trends.heartRate.map((value, index) => (
                      <circle 
                        key={`point-${index}`}
                        cx={index * (500 / (scanResults.trends.heartRate.length - 1))} 
                        cy={150 - value} 
                        r="5" 
                        fill="#3b82f6" 
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5 Scans Ago</span>
                  <span>Latest Scan</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Blood Pressure Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 w-full">
                  <svg viewBox="0 0 500 150" className="w-full h-full">
                    {/* Systolic line */}
                    {scanResults.trends.bloodPressure.map((reading, index, array) => {
                      const x1 = index * (500 / (array.length - 1));
                      const y1 = 150 - reading.systolic * 0.75;
                      const x2 = (index + 1) * (500 / (array.length - 1));
                      const y2 = index < array.length - 1 ? 150 - array[index + 1].systolic * 0.75 : y1;
                      
                      return index < array.length - 1 ? (
                        <line 
                          key={`systolic-${index}`}
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke="#ec4899" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                        />
                      ) : null;
                    })}
                    
                    {/* Diastolic line */}
                    {scanResults.trends.bloodPressure.map((reading, index, array) => {
                      const x1 = index * (500 / (array.length - 1));
                      const y1 = 150 - reading.diastolic * 0.75;
                      const x2 = (index + 1) * (500 / (array.length - 1));
                      const y2 = index < array.length - 1 ? 150 - array[index + 1].diastolic * 0.75 : y1;
                      
                      return index < array.length - 1 ? (
                        <line 
                          key={`diastolic-${index}`}
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                        />
                      ) : null;
                    })}
                  </svg>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex text-xs space-x-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-pink-500 rounded-full mr-1"></div>
                      <span>Systolic</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
                      <span>Diastolic</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t border-gray-100 pt-4 space-y-4">
        <h3 className="font-semibold">Next Steps</h3>
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSaveData} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Save Results
          </Button>
          <Button variant="outline" onClick={handleGeneratePDF} className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
          <Button variant="outline" onClick={handleScheduleReminder} className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Reminder
          </Button>
          <Button variant="ghost" onClick={() => {}} className="flex-1">
            <Edit3 className="mr-2 h-4 w-4" />
            Add Notes
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center pt-2">
          Next recommended scan: 7 days from now
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return renderWelcomeStep();
      case "tips":
        return renderTipsStep();
      case "scanning":
        return renderScanningStep();
      case "verify":
        return renderVerifyStep();
      case "additional-data":
        return renderAdditionalDataStep();
      case "processing":
        return renderProcessingStep();
      case "results":
        return renderResultsStep();
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-2 h-full">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedFaceScanModal;
