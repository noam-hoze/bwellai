
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle2, Watch, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingFlow = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <UserCircle2 className="w-6 h-6 text-purple-500" />,
      title: "Quick Profile Setup",
      description: "Tell us about yourself to personalize your experience",
      action: () => navigate("/onboarding/profile"),
    },
    {
      icon: <Watch className="w-6 h-6 text-blue-500" />,
      title: "Connect Devices",
      description: "Sync your wearables for better health tracking",
      action: () => navigate("/connections"),
    },
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      title: "Set Health Goals",
      description: "Define your wellness journey objectives",
      action: () => navigate("/onboarding/goals"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Let's Get You Started</CardTitle>
        <CardDescription>Complete these steps to personalize your experience</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gray-100 p-3">{step.icon}</div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
                <Button 
                  onClick={step.action}
                  className="mt-4 w-full"
                >
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default OnboardingFlow;
