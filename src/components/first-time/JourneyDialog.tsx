import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Smartphone,
  Upload,
  Utensils,
  HeartPulse,
  ArrowRight,
  ArrowLeft,
  X,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  actionText: string;
}

const JourneyDialog = ({
  open,
  onOpenChange,
  journeyList,
  getProfileIsData,
  getUserOverallStatusIsData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journeyList?: string[];
  getUserOverallStatusIsData: any;
  getProfileIsData: any;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps: StepProps[] = [
    {
      title: "Complete Your Health Profile",
      description: "Help us personalize your health journey",
      icon: <UserRound className="h-12 w-12 text-indigo-500" />,
      path: "/profile?tab=health-profile",
      actionText: "Update Profile",
    },
    {
      title: "Connect Your Wearable Device",
      description:
        "Track your daily activities and health metrics in real-time",
      icon: <Smartphone className="h-12 w-12 text-blue-500" />,
      path: "/connections",
      actionText: "Connect Device",
    },
    {
      title: "Upload Your Lab Reports",
      description: "Get AI-powered insights from your medical records",
      icon: <Upload className="h-12 w-12 text-purple-500" />,
      path: "/reports",
      actionText: "Upload Reports",
    },
    {
      title: "Scan Your Meals",
      description: "Track your nutrition and get personalized recommendations",
      icon: <Utensils className="h-12 w-12 text-green-500" />,
      path: "/nutrition",
      actionText: "Start Scanning",
    },
    {
      title: "Scan For Vitals",
      description: "Get instant health readings using your device's camera",
      icon: <HeartPulse className="h-12 w-12 text-rose-500" />,
      path: "/face-scan",
      actionText: "Start Scan",
    },
  ];

  // Mapping API keys to step titles
  const keywordToTitleMap: Record<string, string> = {
    sleep: "Connect Your Wearable Device",
    active: "Connect Your Wearable Device",
    weight: "Connect Your Wearable Device",
    eat: "Scan Your Meals",
    stress: "Scan For Vitals",
    "lab-reports": "Upload Your Lab Reports",
  };

  // Usage
  if (getUserOverallStatusIsData?.faceScan) {
    steps.splice(4, 1);
  }
  if (getUserOverallStatusIsData?.nutrition) {
    steps.splice(3, 1);
  }
  if (getUserOverallStatusIsData?.reportUpload) {
    steps.splice(2, 1);
  }
  if (getUserOverallStatusIsData?.wearable) {
    steps.splice(1, 1);
  }
  if (getProfileIsData?.onBoarding) {
    steps.splice(0, 1);
  }

  // Step sorting logic
  // Keep track of already added step titles
  const getSortedSteps = (apiOrder: string[]): StepProps[] => {
    if (apiOrder?.length === 0) return steps; // fallback to default

    const addedTitles = new Set<string>();
    const orderedSteps: StepProps[] = [];

    for (const keyword of apiOrder) {
      const title = keywordToTitleMap?.[keyword];
      if (title && !addedTitles?.has(title)) {
        const matchedStep = steps?.find((s) => s?.title === title);
        if (matchedStep) {
          orderedSteps?.push(matchedStep);
          addedTitles?.add(title);
        }
      }
    }

    // Add remaining steps not already included
    const remainingSteps = steps?.filter(
      (step) => !addedTitles?.has(step?.title)
    );
    return [...orderedSteps, ...remainingSteps];
  };

  const sortedSteps = getSortedSteps(journeyList || []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAction = () => {
    onOpenChange(false);
    navigate(steps[currentStep].path);
  };

  const handleBackToHome = () => {
    onOpenChange(false);
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-10">
        <div className="w-full bg-gray-200 h-1 mb-8 rounded-full">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / sortedSteps?.length) * 100}%`,
            }}
          />
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            {sortedSteps?.[currentStep]?.icon}
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-2">
            {sortedSteps?.[currentStep]?.title}
          </h2>
          <p className="text-gray-600">
            {sortedSteps?.[currentStep]?.description}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          {currentStep === 0 ? (
            <>
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-24 invisible"
              >
                Back
              </Button>
              <Button
                onClick={handleAction}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
              >
                {sortedSteps?.[currentStep]?.actionText}
              </Button>

              {steps?.length !== 1 ? (
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="w-32 flex justify-center"
                >
                  <span className="mx-auto flex items-center">
                    Next Option
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleBackToHome}
                  className="w-32 flex justify-center"
                >
                  <span className="mx-auto">Home</span>
                </Button>
              )}
            </>
          ) : currentStep === steps.length - 1 ? (
            <>
              <Button variant="outline" onClick={handleBack} className="w-24">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleAction}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
              >
                {sortedSteps?.[currentStep]?.actionText}
              </Button>
              <Button
                variant="outline"
                onClick={handleBackToHome}
                className="w-32 flex justify-center"
              >
                <span className="mx-auto">Home</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack} className="w-24">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleAction}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
              >
                {sortedSteps?.[currentStep]?.actionText}
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="w-32 flex justify-center"
              >
                <span className="mx-auto flex items-center">
                  Next Option
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JourneyDialog;
