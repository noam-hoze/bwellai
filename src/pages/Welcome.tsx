import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { useAuth } from "@/contexts/AuthContext";

const Welcome = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <OnboardingLayout showSkip={false} showClose={false}>
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="space-y-2">
            <img
              src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
              alt="B-Well Logo"
              className="h-24 mx-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Your Personalized Health Assistant
            </h1>
            <p className="text-gray-600">
              Track, monitor, and understand your health data in one secure
              place.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <Button className="w-full py-6 text-lg" size="lg" asChild>
              <Link to="/onboarding/0">Get Started</Link>
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 text-lg"
              size="lg"
              asChild
            >
              <Link to="/onboarding/4">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Welcome;
