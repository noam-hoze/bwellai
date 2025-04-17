import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGenerateOTP,
  useOtpValidation,
} from "@/service/hooks/authentication/useAuthentication";
import { useAuth } from "@/contexts/AuthContext";
import GoogleLoginButton from "@/components/auth/GoogleAuthButton";
import { UserInfoProvider, useUserInfo } from "@/contexts/UserInfoContext";
import { useGetCreateProfile } from "@/service/hooks/profile/useGetCreateProfile";

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [useAuthRequestId, setUseAuthRequestId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const { userInfo, updateUserInfo } = useUserInfo();

  const { loginWithOTP } = useAuth();

  const {
    data: generateOTPData,
    // isError: generateOTPIsError,
    mutate: generateOTPMutate,
    isPending: generateOTPPending,
    isSuccess: generateOTPSuccess,
  } = useGenerateOTP();

  const {
    data: otpValidationData,
    error: otpValidationError,
    mutate: otpValidationMutate,
    isSuccess: otpValidationSuccess,
    isPending: otpValidationPending,
  } = useOtpValidation();

  const {
    mutate: createProfileMutate,
    isSuccess: createProfileIsSuccess,
    error: createProfileError,
  } = useGetCreateProfile();

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToSignup = () => {
    navigate("/auth/signup");
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => {
      const selectedValue = prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal];

      updateUserInfo("goal", selectedValue);
      return selectedValue;
    });
  };

  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingOtp(true);

    try {
      // await generateOTP(email);
      generateOTPMutate({ email: email });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingOtp(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "OTP required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      otpValidationMutate({
        otp: otp,
        requestId: useAuthRequestId,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  useEffect(() => {
    if (otpValidationSuccess) {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });

      localStorage.setItem(
        "token",
        otpValidationData?.payload?.token?.accessToken?.token
      );
      localStorage.setItem(
        "refresh_token",
        otpValidationData?.payload?.token?.refreshToken?.token
      );
      localStorage.setItem(
        "is_Profile_updated",
        otpValidationData?.payload?.isProfileUpdated
      );

      loginWithOTP({
        email: email,
        isAuthenticated: true,
        isfirstLogin: otpValidationData?.payload?.isfirstLogin,
      });

      createProfileMutate({
        additionalDetails: {
          "What Are You Aiming For?": {
            answersArray: [userInfo?.goal],
            include_in_interpretation: true,
          },
        },
        age: userInfo?.age,
        gender: userInfo?.gender,
        height: userInfo?.height,
        weight: userInfo?.weight,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [otpValidationSuccess]);

  useEffect(() => {
    if (generateOTPSuccess && generateOTPData) {
      setOtpSent(true);
      setResendDisabled(true);
      setResendTimer(30);

      setUseAuthRequestId(generateOTPData?.requestId);

      // Start resend timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: "OTP Sent",
        description: "Check your email for the verification code",
      });
    }
  }, [generateOTPSuccess]);

  const handleGoogleSignIn = (loggedInData) => {
    if (loggedInData) {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });

      localStorage.setItem("token", loggedInData?.token?.accessToken?.token);
      localStorage.setItem(
        "refresh_token",
        loggedInData?.token?.refreshToken?.token
      );
      localStorage.setItem(
        "is_Profile_updated",
        loggedInData?.isProfileUpdated
      );

      loginWithOTP({
        email: email,
        isAuthenticated: true,
        isfirstLogin: loggedInData?.payload?.isfirstLogin,
      });

      navigate("/dashboard");
    }
  };

  const handleGoogleSignInFailure = () => {
    // navigate("/dashboard");
    console.log();
  };

  const steps = [
    {
      title: "Welcome to BwellAI",
      description: "Your path to better health",
    },
    {
      title: "Your Health Goals",
      description: "Let's focus on what matters to you",
    },
    {
      title: "Tell Us About Yourself",
      description: "Just the basics to get you started",
    },
    {
      title: "Your Privacy Matters",
      description: "We keep your data safe",
    },
    {
      title: "Create your Account",
      description: "Quick sign up to get started",
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Complete Health Companion
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Track your health journey and get personalized insights to live
              better.
            </p>

            <div className="w-full space-y-6 mb-6">
              <img
                src="/lovable-uploads/5f4b65d2-15ca-47c6-a1c3-876102135de4.png"
                alt="Health features illustration"
                className="w-full rounded-xl shadow-sm"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What Are You Aiming For?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Tap what matters most to you right now. You can select multiple
              goals!
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("sleep")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("sleep")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/dac5b641-fb68-4e0c-ae99-f06c5e5c5c4b.png"
                    alt="Sleep Better"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("sleep") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("eat")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("eat")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/e9d028e9-8ff9-43f6-9010-4cdd92778ea1.png"
                    alt="Eat Healthier"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("eat") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("active")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("active")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/3db3c82e-0cf3-4888-bd9d-2b8e0c7de437.png"
                    alt="Get Active"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("active") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("weight")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("weight")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/5e81a977-add6-45c9-8f7f-9beabb727caf.png"
                    alt="Weight Management"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("weight") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("stress")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("stress")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/c82d12f2-25aa-4213-88cd-533cec2fff63.png"
                    alt="Reduce Stress"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("stress") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedGoals.includes("custom")
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-green-50 hover:border-green-200"
                }`}
                onClick={() => toggleGoal("custom")}
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/lovable-uploads/4941163a-eb32-4841-806a-51a837a322c1.png"
                    alt="Custom Goal"
                    className="w-full rounded-lg mb-2"
                  />
                  {selectedGoals.includes("custom") && (
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 data-[state=checked]:bg-green-600 border-green-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tell Us About Yourself
            </h2>
            <p className="text-gray-600 text-center mb-6">
              This helps us provide accurate health insights tailored just for
              you.
            </p>

            <div className="w-full space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your age"
                    value={userInfo?.age}
                    onChange={(e) => {
                      updateUserInfo("age", Number(e.target.value));
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  For age-appropriate recommendations
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={userInfo?.gender}
                  onChange={(e) => {
                    updateUserInfo("gender", e.target.value);
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  For more relevant health information
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your height (cm or ft/in)"
                    value={userInfo?.height}
                    onChange={(e) => {
                      updateUserInfo("height", Number(e.target.value));
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  For accurate physical metrics
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your weight (kg or lbs)"
                    value={userInfo?.weight}
                    onChange={(e) => {
                      updateUserInfo("weight", Number(e.target.value));
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  For nutrition and activity recommendations
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Data Stays Secure
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Your privacy is our priority. We use end-to-end encryption and
              don't share your data with third parties.
            </p>

            <div className="w-full mb-6 space-y-4">
              <div className="grid grid-cols-1 gap-0">
                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <img
                    src="/lovable-uploads/0690f910-2ca1-41d4-bd77-a4f0d70ebad7.png"
                    alt="End-to-End Encryption"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <img
                    src="/lovable-uploads/db252eb4-83be-4c44-81b4-3021a1b06524.png"
                    alt="Fully Anonymized Data"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <img
                    src="/lovable-uploads/254620df-878a-4889-97ef-db25b383c74f.png"
                    alt="You Control Your Data"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="privacy-consent"
                name="privacy-consent"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="privacy-consent"
                className="ml-2 block text-sm text-gray-600"
              >
                I understand and agree to BwellAI's{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="min-h-[400px] flex flex-col">
            <div className="text-center space-y-2 mb-8">
              <img
                src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
                alt="B-Well Logo"
                className="h-16 mx-auto"
              />
              <h1 className="text-2xl font-bold">Sign in to continue</h1>
              <p className="text-gray-600">
                Use your email to sign in or create an account
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleGenerateOtp} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6"
                  disabled={isGeneratingOtp}
                >
                  {isGeneratingOtp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending code...
                    </>
                  ) : (
                    <>
                      Continue with Email
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center mb-4">
                  <Input
                    type="text"
                    placeholder="Enter verification code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6"
                  disabled={isVerifyingOtp}
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleGenerateOtp}
                    disabled={resendDisabled}
                    className="text-sm"
                  >
                    {resendDisabled
                      ? `Resend code in ${resendTimer}s`
                      : "Didn't receive code? Resend"}
                  </Button>
                </div>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <GoogleLoginButton
              clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
              onLoginFailure={handleGoogleSignInFailure}
              onLoginSuccess={handleGoogleSignIn}
            />

            {/* <Button
              type="button"
              variant="outline"
              className="w-full py-6"
              onClick={handleGoogleSignIn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2"
              >
                <path
                  fill="#EA4335"
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              Sign in with Google
            </Button> */}

            <div className="text-center mt-6"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
            alt="B-Well Logo"
            className="h-8"
          />
          {isMobile && currentStep < steps.length - 1 && (
            <button
              className="bg-green-800 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-green-700 ml-2"
              onClick={() => setCurrentStep(steps.length - 1)}
            >
              Sign In
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {!isMobile && currentStep < steps.length - 1 && (
            <button
              className="text-gray-500 hover:text-green-700 text-sm font-medium"
              onClick={nextStep}
            >
              Skip this part
            </button>
          )}
          {!isMobile && currentStep < steps.length - 1 && (
            <button
              className="bg-green-800 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-green-700"
              onClick={() => setCurrentStep(steps.length - 1)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-green-800 h-1 transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        ></div>
      </div>

      <div className="p-6">
        {currentStep < steps.length - 1 && (
          <div className="text-sm text-gray-500 mb-1">
            Step {currentStep + 1} of {steps.length - 1}
          </div>
        )}

        {renderStepContent()}

        {currentStep < steps.length - 1 ? (
          <div className="flex mt-8">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                className="flex-1 mr-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                onClick={prevStep}
              >
                Back
              </button>
            )}

            <button
              className="flex-1 py-3 px-4 bg-green-800 rounded-lg text-white font-medium hover:bg-green-700"
              onClick={nextStep}
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OnboardingScreen;
