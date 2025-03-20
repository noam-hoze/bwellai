
import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

type OnboardingLayoutProps = {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showSkip?: boolean;
  showClose?: boolean;
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep = 0,
  totalSteps = 3,
  showSkip = true,
  showClose = false,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="relative flex-1 flex flex-col">
        {/* Close/Skip button */}
        {showClose ? (
          <Link
            to="/"
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 z-10"
          >
            <X className="h-6 w-6" />
          </Link>
        ) : showSkip ? (
          <Link
            to="/auth/login"
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 z-10"
          >
            Skip
          </Link>
        ) : null}

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-between">
          {children}
        </div>

        {/* Progress dots */}
        {currentStep > 0 && (
          <div className="flex justify-center gap-2 pb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep - 1
                    ? "bg-wellness-bright-green"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingLayout;
