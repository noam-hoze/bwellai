import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useOtpValidation } from "@/service/hooks/authentication/useAuthentication";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const OTP = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const otpParam = searchParams.get("otp");
  const requestIdParam = searchParams.get("request_id");

  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const { loginWithOTP } = useAuth();

  console.log(otpParam, requestIdParam);

  const {
    data: otpValidationData,
    error: otpValidationError,
    mutate: otpValidationMutate,
    isSuccess: otpValidationSuccess,
    isPending: otpValidationPending,
  } = useOtpValidation();

  useEffect(() => {
    const handleVerifyOtp = async () => {
      if (!otpParam) {
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
          otp: otpParam,
          requestId: requestIdParam,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify OTP. Please try again.",
          variant: "destructive",
        });
      }
    };

    handleVerifyOtp();
  }, []);

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
        email: "",
        isAuthenticated: true,
        isfirstLogin: otpValidationData?.payload?.isfirstLogin,
      });

      navigate("/dashboard");
    }
  }, [otpValidationSuccess]);

  useEffect(() => {
    if (otpValidationError) {
      navigate("/onboarding/4");
    }
  }, [otpValidationError]);

  return (
    <div className="flex justify-center items-center">
      {isVerifyingOtp ? "Login In. Please Wait" : "Done"}
    </div>
  );
};

export default OTP;
