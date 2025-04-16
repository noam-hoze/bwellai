import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isfirstLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: ({
    email,
    isAuthenticated,
  }: {
    email: string;
    isAuthenticated: boolean;
  }) => any;
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
  const [isfirstLogin, setIsfirstLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
      // await new Promise((resolve) => setTimeout(resolve, 1000));
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

      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithOTP = ({
    email,
    isAuthenticated,
    isfirstLogin,
  }: {
    email: string;
    isAuthenticated: boolean;
    isfirstLogin: boolean;
  }) => {
    setIsAuthenticated(isAuthenticated);
    setIsfirstLogin(isfirstLogin);
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
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        loginWithOTP,
        generateOTP,
        loginWithGoogle,
        logout,
        isAuthenticated,
        isfirstLogin,
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
