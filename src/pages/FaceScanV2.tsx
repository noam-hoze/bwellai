import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Loader2,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Header from '@/components/layout/Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FaceScanProvider, useFaceScan } from '@/contexts/FaceScanContext';
import {
  useGetUserFaceDataLatest,
  useGetUserFaceDataSave,
} from '@/service/hooks/shenai/useShenaiFaceScore';
import { useToast } from '@/hooks/use-toast';
import HealthMetrics from '@/components/face-scan/HealthMetrics';
import { useAuth } from '@/contexts/AuthContext';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const ShenaiApp = lazy(() => import('@/components/Shenai/ShenaiApp'));

// Define all possible scan steps
type ScanStep =
  | 'intro'
  | 'preparation'
  | 'capture'
  | 'processing'
  | 'results'
  | 'details'
  | 'analysis'
  | 'personal-factors'
  | 'results-processing'
  | 'analysis-results';

// Form schema for personal factors form
const personalFactorsSchema = z.object({
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
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
  status: 'normal' | 'caution' | 'warning';
  reference: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

const RenderResults = ({ handleRetakeScan, step }) => {
  const { toast } = useToast();

  const { results } = useFaceScan();
  const [selectedOption, setSelectedOption] = useState('before_bedtime');
  const { isAuthenticated } = useAuth();
  const [isFaceScanSaved, setIsFaceScanSaved] = useState(false);

  const {
    data: userFaceDataLatest,
    isSuccess: userFaceDataLatestIsSuccess,
    refetch: userFaceDataLatestRefetch,
  } = useGetUserFaceDataLatest(isAuthenticated);

  const {
    data: savedData,
    mutate: saveDataSaveMutate,
    isSuccess: saveDataSaveIsSuccess,
    isPending: saveDataSaveIsPending,
  } = useGetUserFaceDataSave();

  useEffect(() => {
    if (saveDataSaveIsSuccess) {
      setIsFaceScanSaved(true);
      userFaceDataLatestRefetch();
      toast({
        title: '',
        description: 'You have successfully Saved.',
      });
    }
  }, [saveDataSaveIsSuccess]);

  const SaveResultHandle = () => {
    if (results) {
      saveDataSaveMutate({
        hr10s: Number(results.hr10s?.toFixed(0)) || 0,
        hr4s: Number(results.hr4s?.toFixed(0)) || 0,
        heart_rate_bpm: Number(results?.heart_rate_bpm.toFixed(0)) || 0,
        hrv_sdnn_ms: Number(results?.hrv_sdnn_ms?.toFixed(0)) || 0,
        hrv_lnrmssd_ms: Number(results?.hrv_lnrmssd_ms?.toFixed(1)) || 0,
        breathing_rate_bpm: Number(results?.breathing_rate_bpm?.toFixed(0)) || 0,
        age_years: Number(results?.age_years?.toFixed(0)) || 0,
        bmi_kg_per_m2: Number(results?.bmi_kg_per_m2?.toFixed(2)) || 0,
        stress_index: Number(results?.stress_index?.toFixed(1)) || 0,
        parasympathetic_activity: Number(results?.parasympathetic_activity?.toFixed(0)) || 0,
        systolic_blood_pressure_mmhg:
          Number(results?.systolic_blood_pressure_mmhg?.toFixed(0)) || 0,
        diastolic_blood_pressure_mmhg:
          Number(results?.diastolic_blood_pressure_mmhg?.toFixed(0)) || 0,
        cardiac_workload_mmhg_per_sec:
          Number(results?.cardiac_workload_mmhg_per_sec?.toFixed(0)) || 0,
        tag: selectedOption,
      });
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center space-y-6">
        {step !== 'intro' && step !== 'preparation' && (
          <h1 className="text-2xl font-bold mb-4">Face Scan Complete</h1>
        )}

        {/* Action buttons */}
        {step !== 'intro' && step !== 'preparation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-6">
            <Button
              onClick={SaveResultHandle}
              className="flex items-center justify-center w-full  gap-2 bg-green-500 hover:bg-green-600"
              disabled={isFaceScanSaved}
            >
              <Save className="h-5 w-5" />
              Keep & Add to Trends
            </Button>

            <Button
              onClick={handleRetakeScan}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full"
            >
              <RefreshCw className="h-5 w-5" />
              Re-take Scan
            </Button>
          </div>
        )}

        {/* Information banner */}
        {step !== 'intro' && step !== 'preparation' && (
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 w-full">
            <div className="flex items-start">
              <div className="mr-2 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                  <path d="M8 13h.01"></path>
                  <path d="M12 13h.01"></path>
                  <path d="M16 13h.01"></path>
                </svg>
              </div>
              <p className="text-blue-700 text-sm">
                These results will be added to your health trends if you select "Keep & Add to
                Trends"
              </p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-center">Health Check Results</h2>

        <div className={`${step !== 'intro' && step !== 'preparation' ? 'w-full' : 'max-w-md'}`}>
          <HealthMetrics facescanResult={results} userFaceDataLatest={userFaceDataLatest} />
        </div>
      </div>
    </div>
  );
};

const FaceScan = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<ScanStep>('intro');
  const [scanProgress, setScanProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [openSection, setOpenSection] = useState<string>('vitals');

  // Real-time vitals that update during scan
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [bloodPressure, setBloodPressure] = useState<string | null>(null);
  const [o2Sat, setO2Sat] = useState<number | null>(null);

  const [isShenaiInitialized, setIsShenaiInitialized] = useState(false);

  // Mock health data
  const [healthData, setHealthData] = useState({
    vitals: {
      pulse: {
        value: 65,
        unit: 'bpm',
        status: 'normal',
        reference: '60-100',
      } as HealthMetric,
      bloodPressure: {
        value: '121/77',
        unit: 'mmHg',
        status: 'caution',
        reference: '<120/80',
        trend: 'up',
        trendValue: '+3/+1',
      } as HealthMetric,
      heartRateVariability: {
        value: 59,
        unit: 'ms',
        status: 'normal',
        reference: '>40',
        trend: 'up',
        trendValue: '+7',
      } as HealthMetric,
      breathingRate: {
        value: 18,
        unit: 'bpm',
        status: 'normal',
        reference: '12-20',
      } as HealthMetric,
      stressIndex: {
        value: 1.5,
        unit: '',
        status: 'normal',
        reference: '<3.0',
        trend: 'down',
        trendValue: '-0.3',
      } as HealthMetric,
    },
    risks: {
      cardioRisk: {
        value: 4.2,
        unit: '%',
        status: 'caution',
        reference: '<3%',
      } as HealthMetric,
      vascularAge: {
        value: 49,
        unit: 'years',
        status: 'caution',
        reference: '≤ chronological age',
        trend: 'down',
        trendValue: '-1',
      } as HealthMetric,
      hardEventRisk: {
        value: 2.7,
        unit: '%',
        status: 'normal',
        reference: '<5%',
      } as HealthMetric,
      fatalEventRisk: {
        value: 0.9,
        unit: '%',
        status: 'normal',
        reference: '<1.5%',
      } as HealthMetric,
    },
    bodyComposition: {
      bodyFat: {
        value: 31.0,
        unit: '%',
        status: 'caution',
        reference: '21-33% (female)',
        trend: 'down',
        trendValue: '-0.8',
      } as HealthMetric,
      bri: {
        value: 4.6,
        unit: '',
        status: 'normal',
        reference: '3.5-6.0',
      } as HealthMetric,
      absi: {
        value: 0.081,
        unit: '',
        status: 'normal',
        reference: '0.07-0.09',
      } as HealthMetric,
      ci: {
        value: 1.23,
        unit: '',
        status: 'normal',
        reference: '1.0-1.35',
      } as HealthMetric,
    },
    metabolic: {
      bmr: {
        value: 1252.75,
        unit: 'kcal',
        status: 'normal',
        reference: '1200-1400 (female)',
      } as HealthMetric,
      tdee: {
        value: 1753.85,
        unit: 'kcal',
        status: 'normal',
        reference: '1600-2000 (moderate activity)',
      } as HealthMetric,
    },
  });

  // Form for personal factors
  const personalFactorsForm = useForm<z.infer<typeof personalFactorsSchema>>({
    resolver: zodResolver(personalFactorsSchema),
    defaultValues: {
      age: '46',
      gender: 'female',
      height: '167',
      weight: '60',
      diabetes: false,
      smoker: false,
      hypertensionTreatment: false,
      totalCholesterol: '138',
      hdlCholesterol: '43',
      systolicPressure: '',
      waistCircumference: '',
      physicalActivity: 'moderate',
      ethnicity: '',
    },
  });

  // Handle scan simulation
  useEffect(() => {
    let interval: number | null = null;
    if (step === 'capture') {
      // Simulate scan progress and update vitals in real-time
      interval = window.setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 2;

          // Update vitals based on scan progress
          if (newProgress > 20 && !heartRate) {
            setHeartRate(65);
          }
          if (newProgress > 40 && !bloodPressure) {
            setBloodPressure('121/77');
          }
          if (newProgress > 60 && !o2Sat) {
            setO2Sat(98);
          }
          if (newProgress >= 100) {
            clearInterval(interval as number);
            setStep('processing');
            // Reset scan progress for next time
            return 0;
          }
          return newProgress;
        });
      }, 100);
    } else if (step === 'processing') {
      // Simulate processing progress
      interval = window.setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep('results');
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    } else if (step === 'results-processing') {
      // Simulate analysis progress
      interval = window.setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval as number);
            setStep('analysis-results');
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
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = `https://localhost:5173?token=${token}`;
    } else {
      console.error('Authentication token not found.');
    }
  };

  const handlePrepareForScan = () => {
    // Reset vitals before starting a new scan
    setHeartRate(null);
    setBloodPressure(null);
    setO2Sat(null);
    setStep('capture');
  };

  const handleViewDetails = () => {
    setStep('details');
  };

  const handleViewAnalysis = () => {
    setStep('analysis');
  };

  const handleAddPersonalFactors = () => {
    setStep('personal-factors');
  };

  const handleSubmitPersonalFactors = (values: z.infer<typeof personalFactorsSchema>) => {
    console.log('Personal factors submitted:', values);
    // In a real application, you would save these values and use them
    setAnalysisProgress(0);
    setStep('results-processing');
  };

  const handleRetakeScan = () => {
    setScanProgress(0);
    setProcessingProgress(0);
    setHeartRate(null);
    setBloodPressure(null);
    setO2Sat(null);
    setStep('preparation');
  };

  const handleSaveData = () => {
    // Here you would save the data to your backend or local storage
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection('');
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
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Helper function to render appropriate status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-500';
      case 'caution':
        return 'text-amber-500';
      case 'warning':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Helper function to render trend indicators
  const renderTrend = (trend?: 'up' | 'down' | 'stable', trendValue?: string) => {
    if (!trend || !trendValue) return null;
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center text-xs text-amber-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trendValue}
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center text-xs text-green-500">
            <TrendingDown className="h-3 w-3 mr-1" />
            {trendValue}
          </div>
        );
      case 'stable':
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
  const renderMetricRow = (label: string, metric: HealthMetric, icon: React.ReactNode) => {
    return (
      <div className="flex items-center justify-between py-3 border-b last:border-b-0">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-medium ${getStatusColor(metric.status)}`}>
              {metric.value} <span className="text-xs">{metric.unit}</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">{metric.reference}</span>
            {renderTrend(metric.trend, metric.trendValue)}
          </div>
        </div>
      </div>
    );
  };

  // Render the intro screen with streamlined UI
  const renderIntroScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center w-full mb-2">
            <div className="mr-3">
              <Camera className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Face Scan <span className="text-sm font-normal text-gray-500">up to 1 min</span>
              </h2>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Quickly measure your heart rate, blood pressure, and stress levels through facial
            analysis. Ensure good lighting and remain still during the scan.
          </p>

          <Button
            onClick={handleStartScan}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 mt-2"
          >
            Start Scan
          </Button>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="scan-tips" className="border rounded-lg">
              <AccordionTrigger className="px-3 py-1.5 w-auto text-sm rounded-md bg-gray-50 border-none shadow-sm hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Scan Tips</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-blue-600 text-xs">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Good Lighting</h4>
                      <p className="text-gray-600">Ensure even lighting on your face</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-blue-600 text-xs">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Face Position</h4>
                      <p className="text-gray-600">Look directly at the camera</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-blue-600 text-xs">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stay Still</h4>
                      <p className="text-gray-600">Remain still during scanning</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-blue-600 text-xs">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Remove Obstructions</h4>
                      <p className="text-gray-600">Remove glasses, masks, or face coverings</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mt-2">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        Our AI technology analyzes subtle variations in your face to measure vital
                        signs and health metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  };

  // Render the preparation screen
  const RenderCaptureScan = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="sm:max-w-md h-[40em] p-0 overflow-hidden">
            <Suspense>
              <ShenaiApp setStep={setStep} setIsShenaiInitialized={setIsShenaiInitialized} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  };

  // Render the capture screen
  const renderCaptureScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold">Capturing Data...</h2>
        <Progress value={scanProgress} className="h-2 mt-2" />
        <p className="text-gray-600">{scanProgress}% completed</p>
      </div>
    );
  };

  // Render the processing screen
  const renderProcessingScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold">Processing Data...</h2>
        <Progress value={processingProgress} className="h-2 mt-2" />
        <p className="text-gray-600">{processingProgress}% completed</p>
      </div>
    );
  };

  // Render the results screen
  const renderResultsScreen = () => {
    return (
      <div className="container max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold">Results</h2>
        {/* Render health metrics here */}
        {renderMetricRow('Heart Rate', healthData.vitals.pulse, <Heart className="h-5 w-5" />)}
        {renderMetricRow(
          'Blood Pressure',
          healthData.vitals.bloodPressure,
          <ActivitySquare className="h-5 w-5" />,
        )}
        {/* Add more metrics as needed */}
        <Button
          onClick={handleSaveData}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 mt-4"
        >
          Save Results
        </Button>
      </div>
    );
  };

  // Main render function to determine which step to render
  const renderStep = () => {
    switch (step) {
      case 'intro':
        return renderIntroScreen();
      case 'preparation':
        return <RenderCaptureScan />;
      case 'capture':
        return renderCaptureScreen();
      case 'processing':
        return renderProcessingScreen();
      case 'results':
        return renderResultsScreen();
      default:
        return renderIntroScreen();
    }
  };

  // Return the main component structure
  return (
    <FaceScanProvider>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />

        <main className="container mx-auto px-4 py-6">
          <ChatbotWidget />
          {step === 'intro' && renderIntroScreen()}
          {step === 'preparation' && <RenderCaptureScan />}
          {/* {step === "capture" && renderCaptureScreen()} */}
          {/* {step === "processing" && renderProcessingScreen()} */}
          {/* {step === "results" && renderResultsScreen()} */}
          {/* {step === "results" && (
            <RenderResults handleRetakeScan={handleRetakeScan} />
          )} */}
          {<RenderResults handleRetakeScan={handleRetakeScan} step={step} />}
        </main>
      </div>
    </FaceScanProvider>
  );
};

export default FaceScan;
