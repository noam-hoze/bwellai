import {
  useGenerateOTP,
  useOtpValidation,
} from "@/service/hooks/authentication/useAuthentication";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (email: string, otp: string) => Promise<void>;
  generateOTP: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [useAuthRequestId, setUseAuthRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    if (generateOTPSuccess && generateOTPData) {
      setUseAuthRequestId(generateOTPData?.requestId);
    }
  }, [generateOTPSuccess, generateOTPData]);

  useEffect(() => {
    // Check if there's an existing login token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate authentication
      setLoading(true);
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("auth_token", "demo_token");
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const generateOTP = async (email: string) => {
    try {
      setLoading(true);
      // Simulate OTP generation
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      generateOTPMutate({ email: email });
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithOTP = async (email: string, otp: string) => {
    try {
      setLoading(true);
      // In a real app, this would verify OTP
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      otpValidationMutate({
        otp: otp,
        requestId: useAuthRequestId,
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

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      // In a real app, this would handle Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("auth_token", "google_token");
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        loginWithOTP,
        generateOTP,
        loginWithGoogle,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
