import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  X,
  Loader,
  Heart,
  ActivitySquare,
  Star,
  RefreshCw,
  Save,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Info,
  CheckCircle2,
  BarChart2,
  Volume2,
  Plus,
  HelpCircle,
  Zap,
  Clock,
  Droplets,
  Flame,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaceScanProvider, useFaceScan } from "@/contexts/FaceScanContext";
import { useShenaiSdk } from "../components/Shenai/useShenaiSDK";
import { useWellness, WellnessProvider } from "@/contexts/WellnessContext";

const ShenaiApp = lazy(() => import("@/components/Shenai/ShenaiApp"));

// Define all possible scan steps
type ScanStep =
  | "intro"
  | "preparation"
  | "capture"
  | "processing"
  | "results"
  | "details"
  | "analysis"
  | "personal-factors"
  | "results-processing"
  | "analysis-results";

// Form schema for personal factors form
const personalFactorsSchema = z.object({
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  diabetes: z.boolean().default(false),
  smoker: z.boolean().default(false),
  hypertensionTreatment: z.boolean().default(false),
  totalCholesterol: z.string().optional(),
  hdlCholesterol: z.string().optional(),
  systolicPressure: z.string().optional(),
  waistCircumference: z.string().optional(),
  physicalActivity: z.string().optional(),
  ethnicity: z.string().optional(),
});

// Health metric interface for strongly typed data
interface HealthMetric {
  value: string | number;
  unit: string;
  status: "normal" | "caution" | "warning";
  reference: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

const FaceScan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ScanStep>("intro");
  const [scanProgress, setScanProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [openSection, setOpenSection] = useState<string>("vitals");

  // Real-time vitals that update during scan
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [bloodPressure, setBloodPressure] = useState<string | null>(null);
  const [o2Sat, setO2Sat] = useState<number | null>(null);

  // Mock health data
  const [healthData, setHealthData] = useState({
    vitals: {
      pulse: {
        value: 65,
        unit: "bpm",
        status: "normal",
        reference: "60-100",
      } as HealthMetric,
      bloodPressure: {
        value: "121/77",
        unit: "mmHg",
        status: "caution",
        reference: "<120/80",
        trend: "up",
        trendValue: "+3/+1",
      } as HealthMetric,
      heartRateVariability: {
        value: 59,
        unit: "ms",
        status: "normal",
        reference: ">40",
        trend: "up",
        trendValue: "+7",
      } as HealthMetric,
      breathingRate: {
        value: 18,
        unit: "bpm",
        status: "normal",
        reference: "12-20",
      } as HealthMetric,
      stressIndex: {
        value: 1.5,
        unit: "",
        status: "normal",
        reference: "<3.0",
        trend: "down",
        trendValue: "-0.3",
      } as HealthMetric,
    },
    risks: {
      cardioRisk: {
        value: 4.2,
        unit: "%",
        status: "caution",
        reference: "<3%",
      } as HealthMetric,
      vascularAge: {
        value: 49,
        unit: "years",
        status: "caution",
        reference: "≤ chronological age",
        trend: "down",
        trendValue: "-1",
      } as HealthMetric,
      hardEventRisk: {
        value: 2.7,
        unit: "%",
        status: "normal",
        reference: "<5%",
      } as HealthMetric,
      fatalEventRisk: {
        value: 0.9,
        unit: "%",
        status: "normal",
        reference: "<1.5%",
      } as HealthMetric,
    },
    bodyComposition: {
      bodyFat: {
        value: 31.0,
        unit: "%",
        status: "caution",
        reference: "21-33% (female)",
        trend: "down",
        trendValue: "-0.8",
      } as HealthMetric,
      bri: {
        value: 4.6,
        unit: "",
        status: "normal",
        reference: "3.5-6.0",
      } as HealthMetric,
      absi: {
        value: 0.081,
        unit: "",
        status: "normal",
        reference: "0.07-0.09",
      } as HealthMetric,
      ci: {
        value: 1.23,
        unit: "",
        status: "normal",
        reference: "1.0-1.35",
      } as HealthMetric,
    },
    metabolic: {
      bmr: {
        value: 1252.75,
        unit: "kcal",
        status: "normal",
        reference: "1200-1400 (female)",
      } as HealthMetric,
      tdee: {
        value: 1753.85,
        unit: "kcal",
        status: "normal",
        reference: "1600-2000 (moderate activity)",
      } as HealthMetric,
    },
  });

  // Form for personal factors
  const personalFactorsForm = useForm<z.infer<typeof personalFactorsSchema>>({
    resolver: zodResolver(personalFactorsSchema),
    defaultValues: {
      age: "46",
      gender: "female",
      height: "167",
      weight: "60",
      diabetes: false,
      smoker: false,
      hypertensionTreatment: false,
      totalCholesterol: "138",
      hdlCholesterol: "43",
      systolicPressure: "",
      waistCircumference: "",
      physicalActivity: "moderate",
      ethnicity: "",
    },
  });

  // Handle scan simulation
  useEffect(() => {
    let interval: number | null = null;

    if (step === "capture") {
      // Simulate scan progress and update vitals in real-time
      // interval = window.setInterval(() => {
      //   setScanProgress((prev) => {
      //     const newProgress = prev + 2;
      //     // Update vitals based on scan progress
      //     if (newProgress > 20 && !heartRate) {
      //       setHeartRate(65);
      //     }
      //     if (newProgress > 40 && !bloodPressure) {
      //       setBloodPressure("121/77");
      //     }
      //     if (newProgress > 60 && !o2Sat) {
      //       setO2Sat(98);
      //     }
      //     if (newProgress >= 100) {
      //       clearInterval(interval as number);
      //       setStep("processing");
      //       // Reset scan progress for next time
      //       return 0;
      //     }
      //     return newProgress;
      //   });
      // }, 100);
    } else if (step === "processing") {
      // Simulate processing progress
      interval = window.setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep("results");
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    } else if (step === "results-processing") {
      // Simulate analysis progress
      interval = window.setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep("analysis-results");
            return 100;
          }
          return prev + 15; // Faster progress for better UX
        });
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, heartRate, bloodPressure, o2Sat]);

  const handleStartScan = () => {
    setStep("preparation");
  };

  const handlePrepareForScan = () => {
    // Reset vitals before starting a new scan
    setHeartRate(null);
    setBloodPressure(null);
    setO2Sat(null);
    setStep("capture");
  };

  const handleViewDetails = () => {
    setStep("details");
  };

  const handleViewAnalysis = () => {
    setStep("analysis");
  };

  const handleAddPersonalFactors = () => {
    setStep("personal-factors");
  };

  const handleRetakeScan = () => {
    setScanProgress(0);
    setProcessingProgress(0);
    setHeartRate(null);
    setBloodPressure(null);
    setO2Sat(null);
    setStep("preparation");
  };

  const handleSaveData = () => {
    // Here you would save the data to your backend or local storage
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection("");
    } else {
      setOpenSection(section);
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // Helper function to render appropriate status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "caution":
        return "text-amber-500";
      case "warning":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Helper function to render trend indicators
  const renderTrend = (
    trend?: "up" | "down" | "stable",
    trendValue?: string
  ) => {
    if (!trend || !trendValue) return null;

    switch (trend) {
      case "up":
        return (
          <div className="flex items-center text-xs text-amber-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trendValue}
          </div>
        );
      case "down":
        return (
          <div className="flex items-center text-xs text-green-500">
            <TrendingDown className="h-3 w-3 mr-1" />
            {trendValue}
          </div>
        );
      case "stable":
        return (
          <div className="flex items-center text-xs text-gray-500">
            <Activity className="h-3 w-3 mr-1" />
            {trendValue}
          </div>
        );
      default:
        return null;
    }
  };

  // Helper function to render metric rows in a standardized way
  const renderMetricRow = (
    label: string,
    metric: any,
    icon: React.ReactNode
  ) => {
    return (
      <div className="flex items-center justify-between py-3 border-b last:border-b-0">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-medium ${getStatusColor(
                metric?.status
              )}`}
            >
              {metric?.value} <span className="text-xs">{metric?.unit}</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">
              {metric?.reference}
            </span>
            {/* {renderTrend(metric?.trend, metric?.trendValue)} */}
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = (section: string) => {
    switch (section) {
      case "vitals":
        return (
          <div className="w-full space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Vital Measurements</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Heart Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-green-500">
                      65 bpm
                    </span>
                    <span className="text-xs text-gray-400">60-100</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="h-5 w-5 text-blue-500" />
                    <span>Blood Pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-red-500">
                      121/77
                    </span>
                    <span className="text-xs text-gray-400">&lt;120/80</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-500" />
                    <span>Heart Rate Variability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-green-500">
                      59 ms
                    </span>
                    <span className="text-xs text-gray-400">&gt;40</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="h-5 w-5 text-green-500" />
                    <span>Breathing Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-green-500">
                      18 bpm
                    </span>
                    <span className="text-xs text-gray-400">12-20</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="h-5 w-5 text-blue-400" />
                    <span>O₂ Saturation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-green-500">
                      98%
                    </span>
                    <span className="text-xs text-gray-400">95-100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "body-composition":
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Body Composition</h3>
            <p className="text-center text-gray-500">
              Body composition analysis requires additional data points.
            </p>
          </div>
        );
      case "trends":
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Health Trends</h3>
            <p className="text-center text-gray-500">
              Tracking trends requires multiple scans over time.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderIntroScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
            <Camera className="h-16 w-16 text-blue-500" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Face Scan Check-In</h2>
            <p className="text-gray-600 mb-6">
              Quickly scan your face to get instant feedback on your vital signs
              and health metrics
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg w-full">
            <h3 className="font-medium mb-2 flex items-center">
              <Info className="h-5 w-5 text-blue-500 mr-2" />
              How it works
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                <span>
                  Our AI technology analyzes subtle variations in your face
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                <span>
                  Measures heart rate, blood pressure, stress level, and more
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                <span>Takes just 30 seconds to complete</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleStartScan}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
          >
            Start Scan
          </Button>
        </div>
      </div>
    );
  };

  const renderPreparationScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="w-full bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Preparation Tips</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Good Lighting</h4>
                  <p className="text-sm text-gray-600">
                    Ensure you're in a well-lit area with even lighting on your
                    face
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Face Position</h4>
                  <p className="text-sm text-gray-600">
                    Position your face within the frame and look directly at the
                    camera
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Stay Still</h4>
                  <p className="text-sm text-gray-600">
                    Remain still during the scan for more accurate results
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Remove Obstructions</h4>
                  <p className="text-sm text-gray-600">
                    Remove glasses, face masks, or anything covering your face
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePrepareForScan}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
          >
            I'm Ready
          </Button>

          <Button variant="outline" onClick={handleCancel} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const RenderCaptureScan = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          {/* <div className="relative w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-full border-2 border-green-500 opacity-50"></div>

              <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-green-500"></div>

              <div className="absolute w-[75%] h-[75%] rounded-full border-4 border-gray-400"></div>

              <div
                className="absolute w-4 h-4 bg-blue-500 rounded-full"
                style={{
                  top: "12.5%",
                  right: `${
                    50 - 42.5 * Math.cos((scanProgress / 100) * 2 * Math.PI)
                  }%`,
                  transform: "translateX(50%)",
                }}
              ></div>
            </div>

            <div className="absolute top-4 right-4 bg-black bg-opacity-60 p-2 rounded-full">
              <Volume2 className="h-5 w-5 text-white" />
            </div>

            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
              Keep your face centered in the circle
            </div>
          </div> */}

          {/* Real-time vitals display */}
          {/* <div className="w-full grid grid-cols-2 gap-3">
            <div
              className={`bg-white p-3 rounded-lg shadow-sm ${
                heartRate ? "animate-fade-in" : "opacity-50"
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">PULSE</div>
              <div className="flex items-end">
                <span className="text-4xl font-bold">{heartRate || "--"}</span>
                <span className="text-sm ml-1 mb-1">bpm</span>
              </div>
            </div>

            <div
              className={`bg-white p-3 rounded-lg shadow-sm ${
                bloodPressure ? "animate-fade-in" : "opacity-50"
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">BLOOD PRESSURE</div>
              <div className="flex items-end">
                <span className="text-4xl font-bold">
                  {bloodPressure || "--/--"}
                </span>
                <span className="text-sm ml-1 mb-1">mmHg</span>
              </div>
            </div>
          </div> */}

          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Scanning in progress...</span>
              <span>{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </div>

          <div className="sm:max-w-md h-[40em] p-0 overflow-hidden">
            {/* <iframe
              src="https://app-dev.bwellai.com/facescan"
              allow="camera; microphone; clipboard-read; clipboard-write; cross-origin-isolated"
              sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-downloads"
              style={{ width: "100%", height: "100%" }}
            ></iframe>  */}

            <Suspense>
              <ShenaiApp setStep={setStep} />
            </Suspense>
          </div>

          {/* <Button
            variant="accent"
            onClick={handleCancel}
            className="w-full mt-4"
          >
            <X className="mr-2 h-4 w-4" />
            Start Scan
          </Button> */}
        </div>
      </div>
    );
  };

  const renderProcessing = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6 py-8">
          <Loader className="h-16 w-16 text-blue-500 animate-spin" />
          <h3 className="text-xl font-semibold">Analyzing your vitals...</h3>

          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Processing scan data</span>
              <span>{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>

          <p className="text-sm text-gray-500 text-center max-w-xs">
            Our AI is analyzing your facial features to extract vital signs.
            This might take a few moments.
          </p>
        </div>
      </div>
    );
  };

  const RenderResults = () => {
    const { results } = useFaceScan();

    useEffect(() => {
      if (results) {
        console.log(results);
      }
    }, [results]);

    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Health Check Results
          </h2>

          <div className="w-full space-y-4">
            {/* Pulse (HR) */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium">Pulse (HR)</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.heart_rate_bpm} bpm
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Heart rate measures how many times your heart beats per minute.
                A normal resting heart rate indicates good cardiovascular
                health.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: 60-100 bpm
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Blood Pressure</h3>
                </div>
                <span className="text-xl font-semibold text-red-500">
                  {results?.systolic_blood_pressure_mmhg}/
                  {results?.diastolic_blood_pressure_mmhg} mmHg
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Blood pressure measures the force of blood against your artery
                walls. The top number (systolic) and bottom number (diastolic)
                are important indicators of heart health.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: &lt;120/80 mmHg
              </div>
            </div>

            {/* Heart Rate Variability (HRV) */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Heart Rate Variability</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.hrv_sdnn_ms} ms
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                HRV measures the variation in time between each heartbeat.
                Higher variability generally indicates better cardiovascular
                health and stress resilience.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: &gt;40 ms
              </div>
            </div>

            {/* Breathing Rate */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Breathing Rate</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.breathing_rate_bpm || 0} bpm
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Breathing rate is the number of breaths you take per minute. It
                can indicate respiratory health and stress levels.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: 12-20 breaths per minute
              </div>
            </div>

            {/* Stress Index */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium">Stress Index</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.stress_index}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Stress index quantifies your body's level of stress based on
                heart rhythm patterns and other physiological markers.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: &lt;50 (lower is better)
              </div>
            </div>

            {/* Cardiac Workload */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <h3 className="font-medium">Cardiac Workload</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.cardiac_workload_mmhg_per_sec}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Cardiac workload measures how hard your heart is working. It's
                calculated from heart rate and blood pressure and indicates
                cardiovascular efficiency.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: 7-10
              </div>
            </div>

            {/* Parasympathetic Activity */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Parasympathetic Activity</h3>
                </div>
                <span className="text-xl font-semibold text-green-500">
                  {results?.parasympathetic_activity}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Parasympathetic activity represents your body's "rest and
                digest" state. Higher values indicate better recovery capability
                and stress resilience.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: 35-65%
              </div>
            </div>

            {/* Body Mass Index */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-teal-500" />
                  <h3 className="font-medium">Body Mass Index (BMI)</h3>
                </div>
                <span className="text-xl font-semibold text-yellow-500">
                  {results?.bmi_kg_per_m2}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                BMI is a calculation that uses height and weight to estimate
                body fat and assess weight categories. It's an indicator of
                general health risk.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Normal range: 18.5-24.9
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleAddPersonalFactors}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Personal Factors for Better Analysis
            </Button>
            <Button
              variant="outline"
              onClick={handleRetakeScan}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Scan
            </Button>
            <Button
              onClick={handleSaveData}
              variant="secondary"
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Results
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderHealthDetails = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full space-y-3">
            <Collapsible
              open={openSection === "vitals"}
              onOpenChange={() => toggleSection("vitals")}
              className="w-full border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Vitals</span>
                </div>
                {openSection === "vitals" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3">
                {renderSectionContent("vitals")}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openSection === "body-composition"}
              onOpenChange={() => toggleSection("body-composition")}
              className="w-full border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Body Composition</span>
                </div>
                {openSection === "body-composition" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3">
                {renderSectionContent("body-composition")}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openSection === "trends"}
              onOpenChange={() => toggleSection("trends")}
              className="w-full border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <ActivitySquare className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Trends</span>
                </div>
                {openSection === "trends" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3">
                {renderSectionContent("trends")}
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleViewAnalysis}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              View Analysis
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveData}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Results
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalysis = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
            <h3 className="text-lg font-medium mb-4">Health Analysis</h3>

            <div className="space-y-5">
              <div>
                <h4 className="text-blue-600 font-medium mb-2">Heart Health</h4>
                <p className="text-sm text-gray-700">
                  Your heart rate and blood pressure readings suggest mild
                  cardiovascular strain. We recommend increasing cardiovascular
                  exercise gradually and monitoring your sodium intake.
                </p>
              </div>

              <div>
                <h4 className="text-green-600 font-medium mb-2">
                  Stress Levels
                </h4>
                <p className="text-sm text-gray-700">
                  Your HRV and other indicators suggest low stress levels, which
                  is excellent. Continue with your current stress management
                  activities for optimal health.
                </p>
              </div>

              <div>
                <h4 className="text-amber-600 font-medium mb-2">
                  Sleep Quality
                </h4>
                <p className="text-sm text-gray-700">
                  Facial biomarkers indicate potential disrupted sleep patterns.
                  Consider adjusting your sleep environment and establishing a
                  consistent bedtime routine.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
            <h3 className="text-lg font-medium mb-4">Recommended Actions</h3>

            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Daily Breathing Exercise</h4>
                  <p className="text-sm text-gray-600">
                    5 minutes of deep breathing to improve HRV
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Monitor Blood Pressure</h4>
                  <p className="text-sm text-gray-600">
                    Track twice weekly and log in the app
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Schedule Follow-up Scan</h4>
                  <p className="text-sm text-gray-600">
                    Rescan in 7 days to track improvements
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button onClick={handleSaveData} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save & Complete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ethnicityMap = {
    white: 0,
    "african-american": 1,
    other: 2,
  };

  const RenderPersonalFactorsForm = () => {
    const shenaiSDK = useShenaiSdk();
    const { setWellnessData } = useWellness();

    const handleSubmitPersonalFactors = (
      values: z.infer<typeof personalFactorsSchema>
    ) => {
      const computedHealthRisksData = shenaiSDK.computeHealthRisks({
        age: Number(values.age),
        cholesterol: Number(values.totalCholesterol),
        cholesterolHdl: Number(values.hdlCholesterol),
        sbp: Number(values.systolicPressure),

        isSmoker: values.smoker,
        hypertensionTreatment: values.hypertensionTreatment,
        hasDiabetes: values.diabetes,

        bodyHeight: Number(values.height),
        bodyWeight: Number(values.weight),
        waistCircumference: Number(values.waistCircumference),

        gender:
          values.gender === "male"
            ? shenaiSDK.Gender.MALE
            : values.gender === "female"
            ? shenaiSDK.Gender.FEMALE
            : shenaiSDK.Gender.OTHER,
        country: "US",
        race: ethnicityMap[values?.ethnicity],

        physicalActivity: Number(values.physicalActivity),
      });

      console.log("Personal factors submitted:", values);
      console.log("this is calculate value", computedHealthRisksData);

      setWellnessData(computedHealthRisksData);

      // In a real application, you would save these values and use them
      setAnalysisProgress(0);
      setStep("results-processing");
    };
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">
              Additional Data Collection
            </h2>
            <p className="text-gray-600 mt-1">
              Great! Now let's add a few details for complete results.
            </p>
          </div>

          <Form {...personalFactorsForm}>
            <form
              onSubmit={personalFactorsForm.handleSubmit(
                handleSubmitPersonalFactors
              )}
              className="w-full space-y-6"
            >
              {/* Personal Information Section */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={personalFactorsForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Age</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                Your age is a key factor in health risk
                                assessment.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <div className="flex">
                            <Input
                              {...field}
                              type="number"
                              min="1"
                              max="120"
                              className="flex-1"
                            />
                            <span className="flex items-center ml-2 text-gray-500">
                              years
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalFactorsForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Gender</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                Health risk factors can vary by gender.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={personalFactorsForm.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input
                                {...field}
                                type="number"
                                min="100"
                                max="250"
                                className="flex-1"
                              />
                              <span className="flex items-center ml-2 text-gray-500">
                                cm
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalFactorsForm.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input
                                {...field}
                                type="number"
                                min="20"
                                max="300"
                                className="flex-1"
                              />
                              <span className="flex items-center ml-2 text-gray-500">
                                kg
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Health Markers Section */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
                <h3 className="text-lg font-medium mb-4">Health Markers</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FormField
                        control={personalFactorsForm.control}
                        name="diabetes"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Diabetes</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FormField
                        control={personalFactorsForm.control}
                        name="smoker"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Smoker</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FormField
                        control={personalFactorsForm.control}
                        name="hypertensionTreatment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Hypertension Treatment</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={personalFactorsForm.control}
                      name="totalCholesterol"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Total Cholesterol</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-52">
                                  Normal range: under 200 mg/dl
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <div className="flex">
                              <Input
                                {...field}
                                placeholder="e.g. 138"
                                className="flex-1"
                              />
                              <span className="flex items-center ml-2 text-gray-500">
                                mg/dl
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalFactorsForm.control}
                      name="hdlCholesterol"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>HDL Cholesterol</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-52">
                                  Healthy levels: above 40 mg/dl for men, above
                                  50 mg/dl for women
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <div className="flex">
                              <Input
                                {...field}
                                placeholder="e.g. 43"
                                className="flex-1"
                              />
                              <span className="flex items-center ml-2 text-gray-500">
                                mg/dl
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={personalFactorsForm.control}
                    name="systolicPressure"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Systolic Pressure (optional)</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                Only if you want to verify the scan reading
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <div className="flex">
                            <Input
                              {...field}
                              placeholder="e.g. 120"
                              className="flex-1"
                            />
                            <span className="flex items-center ml-2 text-gray-500">
                              mmHg
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Factors Section */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
                <h3 className="text-lg font-medium mb-4">Additional Factors</h3>

                <div className="space-y-4">
                  <FormField
                    control={personalFactorsForm.control}
                    name="waistCircumference"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Waist Circumference</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                An important indicator of visceral fat and
                                health risk
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <div className="flex">
                            <Input
                              {...field}
                              placeholder="e.g. 75"
                              className="flex-1"
                            />
                            <span className="flex items-center ml-2 text-gray-500">
                              cm
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalFactorsForm.control}
                    name="physicalActivity"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Physical Activity Level</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                Regular physical activity reduces health risks
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select activity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedentary">
                              Sedentary (little or no exercise)
                            </SelectItem>
                            <SelectItem value="moderate">
                              Moderate (exercise 1-3 times/week)
                            </SelectItem>
                            <SelectItem value="active">
                              Active (exercise 4+ times/week)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalFactorsForm.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Ethnicity</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-52">
                                Important for certain health calculations
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ethnicity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="african-american">
                              African American
                            </SelectItem>
                            <SelectItem value="asian">Asian</SelectItem>
                            <SelectItem value="caucasian">Caucasian</SelectItem>
                            <SelectItem value="hispanic">
                              Hispanic/Latino
                            </SelectItem>
                            <SelectItem value="middleeastern">
                              Middle Eastern
                            </SelectItem>
                            <SelectItem value="pacificislander">
                              Pacific Islander
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  Submit and Continue to Analysis
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("results")}
                  className="w-full"
                >
                  Back to Results
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  };

  const renderResultsProcessing = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6 py-8">
          <Loader className="h-16 w-16 text-blue-500 animate-spin" />
          <h3 className="text-xl font-semibold">
            Generating health insights...
          </h3>

          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Analyzing your personal factors</span>
              <span>{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>

          <p className="text-sm text-gray-500 text-center max-w-xs">
            We're combining your facial scan data with your personal information
            to create a comprehensive health profile.
          </p>
        </div>
      </div>
    );
  };

  const RenderAnalysisResults = () => {
    const { wellnessData } = useWellness();
    const { results } = useFaceScan();

    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center mb-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-32 w-32 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-blue-100">
              <span className="text-5xl font-bold text-blue-600">
                {wellnessData?.wellnessScore}
              </span>
            </div>
            <h3 className="text-xl font-semibold">Health Score</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
              Your health score is based on your vital measurements, personal
              factors, and established health guidelines.
            </p>
          </div>

          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="vitals"
                className="border rounded-lg mb-3 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Vital Measurements</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-2">
                    {renderMetricRow(
                      "Pulse",
                      { value: results?.heart_rate_bpm || 0 },
                      <Heart className="h-4 w-4 text-red-500" />
                    )}
                    {renderMetricRow(
                      "Blood Pressure",
                      { value: results?.systolic_blood_pressure_mmhg || 0 },
                      <Activity className="h-4 w-4 text-blue-500" />
                    )}
                    {renderMetricRow(
                      "Heart Rate Variability",
                      { value: results?.hrv_sdnn_ms || 0 },
                      <Heart className="h-4 w-4 text-purple-500" />
                    )}
                    {renderMetricRow(
                      "Breathing Rate",
                      { value: results?.breathingRate || 0 },
                      <Activity className="h-4 w-4 text-green-500" />
                    )}
                    {renderMetricRow(
                      "Stress Index",
                      { value: results?.stressIndex || 0 },
                      <ActivitySquare className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="risks"
                className="border rounded-lg mb-3 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">Health Risk Indices</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-2">
                    {renderMetricRow(
                      "Cardiovascular Disease Risk",
                      { value: wellnessData?.cvDiseases?.overallRisk || 0 },
                      <Heart className="h-4 w-4 text-red-500" />
                    )}
                    {renderMetricRow(
                      "Vascular Age",
                      { value: wellnessData?.vascularAge || 0 },
                      <Activity className="h-4 w-4 text-purple-500" />
                    )}
                    {renderMetricRow(
                      "Hard Events Risk (10yr)",
                      healthData.risks.hardEventRisk,
                      <Activity className="h-4 w-4 text-amber-500" />
                    )}
                    {renderMetricRow(
                      "Fatal Events Risk (10yr)",
                      {
                        value:
                          wellnessData?.hardAndFatalEvents
                            ?.fatalStrokeEventRisk || 0,
                      },
                      <Activity className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="body"
                className="border rounded-lg mb-3 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <ActivitySquare className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Body Composition</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-2">
                    {renderMetricRow(
                      "Body Fat Percentage",
                      { value: wellnessData?.bodyFatPercentage || 0 },
                      <Droplets className="h-4 w-4 text-blue-500" />
                    )}
                    {renderMetricRow(
                      "Body Roundness Index (BRI)",
                      { value: wellnessData?.bodyRoundnessIndex || 0 },
                      <ActivitySquare className="h-4 w-4 text-purple-500" />
                    )}
                    {renderMetricRow(
                      "A Body Shape Index (ABSI)",
                      { value: wellnessData?.aBodyShapeIndex || 0 },
                      <ActivitySquare className="h-4 w-4 text-teal-500" />
                    )}
                    {renderMetricRow(
                      "Conicity Index (CI)",
                      { value: wellnessData?.conicityIndex || 0 },
                      <ActivitySquare className="h-4 w-4 text-indigo-500" />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="metabolic"
                className="border rounded-lg mb-3 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Metabolic Health</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-2">
                    {renderMetricRow(
                      "Basal Metabolic Rate",
                      { value: wellnessData?.basalMetabolicRate || 0 },
                      <Flame className="h-4 w-4 text-orange-500" />
                    )}
                    {renderMetricRow(
                      "Total Daily Energy Expenditure",
                      healthData.metabolic.tdee,
                      <Zap className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              Key Insights & Recommendations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  Your heart rate variability is excellent, indicating good
                  cardiac health and stress resilience.
                </p>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  Your systolic blood pressure is slightly elevated. Consider
                  reducing sodium intake and increasing cardio exercise.
                </p>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  Schedule your next facial scan in 2 weeks to track
                  improvements in your cardiovascular metrics.
                </p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleSaveData}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Save & Complete
            </Button>
            <Button
              variant="outline"
              onClick={handleRetakeScan}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Scan
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FaceScanProvider>
      <WellnessProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="py-6">
            <div className="container mx-auto px-4 mb-6">
              <Button variant="ghost" onClick={handleCancel} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <h1 className="text-2xl font-bold mb-2">Face Scan</h1>
              <p className="text-gray-500">
                Scan your face to measure vitals and health metrics
              </p>
            </div>

            {step === "intro" && renderIntroScreen()}
            {step === "preparation" && renderPreparationScreen()}
            {step === "capture" && <RenderCaptureScan />}
            {step === "processing" && renderProcessing()}
            {step === "results" && <RenderResults />}
            {step === "details" && renderHealthDetails()}
            {step === "analysis" && renderAnalysis()}
            {step === "personal-factors" && <RenderPersonalFactorsForm />}
            {step === "results-processing" && renderResultsProcessing()}
            {step === "analysis-results" && <RenderAnalysisResults />}
          </main>

          <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
            © 2024 Wellness App. All rights reserved.
          </footer>
        </div>
      </WellnessProvider>
    </FaceScanProvider>
  );
};

export default FaceScan;
