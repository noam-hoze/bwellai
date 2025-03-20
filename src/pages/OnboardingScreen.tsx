
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { ArrowRight } from "lucide-react";

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Unlock Personalized Health Insights",
    description: "Get easy-to-read reports on your lab results, activity, and nutrition—securely and anonymously. Understand your health at a glance.",
    imageSrc: "/lovable-uploads/5fb3e264-807c-416b-a475-c4e809e3e675.png",
  },
  {
    id: "2",
    title: "Track What You Consume",
    description: "Scan food & personal care products for immediate health insights. Learn what's in your products and how they affect your wellbeing.",
    imageSrc: "/public/placeholder.svg",
  },
  {
    id: "3",
    title: "Sync Your Wearables",
    description: "Connect your smartwatch and fitness trackers to get real-time health data. Monitor your activity, sleep, and more in one place.",
    imageSrc: "/public/placeholder.svg",
  },
];

const OnboardingScreen = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  
  const currentStepNumber = parseInt(step || "1");
  const currentSlide = slides.find(slide => slide.id === step) || slides[0];
  
  const handleNext = () => {
    if (currentStepNumber < slides.length) {
      navigate(`/onboarding/${currentStepNumber + 1}`);
    } else {
      navigate("/auth/signup");
    }
  };
  
  return (
    <OnboardingLayout currentStep={currentStepNumber} totalSteps={slides.length}>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <img
            src={currentSlide.imageSrc}
            alt={currentSlide.title}
            className="w-full max-w-md h-auto mb-12 animate-fade-in"
          />
          
          <div className="text-center max-w-md mx-auto space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900">{currentSlide.title}</h1>
            <p className="text-gray-600 text-lg">{currentSlide.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <Button 
            onClick={handleNext} 
            className="w-full sm:w-auto mx-auto flex items-center justify-center py-6 rounded-full"
            size="lg"
          >
            {currentStepNumber === slides.length ? "Get Started" : "Next"}
            {currentStepNumber !== slides.length && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingScreen;
