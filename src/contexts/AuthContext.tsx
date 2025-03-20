
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if there's an existing login token in localStorage
    const token = localStorage.getItem("auth_token");
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("auth_token", "otp_token");
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
        loading
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
