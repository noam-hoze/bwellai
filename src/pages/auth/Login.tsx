import React, { useEffect, useState } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useGenerateOTP,
  useOtpValidation,
} from "@/service/hooks/authentication/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [useAuthRequestId, setUseAuthRequestId] = useState<string | null>(null);
  const { toast } = useToast();
  const { generateOTP, loginWithOTP, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

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

      navigate("/dashboard");
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
      // await loginWithOTP(email, otp);
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

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <Link to="/welcome" className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <img
              src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
              alt="B-Well Logo"
              className="h-16 mx-auto"
            />
            <h1 className="text-2xl font-bold">
              {otpSent ? "Enter verification code" : "Sign in to continue"}
            </h1>
            <p className="text-gray-600">
              {otpSent
                ? `We've sent a code to ${email}`
                : "Use your email to sign in or create an account"}
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
                {/* <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots?.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                /> */}
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <Button
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
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
