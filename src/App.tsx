import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Sleep from "./pages/Sleep";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Activity from "./pages/Activity";
import ReportDetail from "./pages/ReportDetail";
import Profile from "./pages/Profile";
import Nutrition from "./pages/Nutrition";
import Welcome from "./pages/Welcome";
import OnboardingScreen from "./pages/OnboardingScreen";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import BodyMetrics from "./pages/BodyMetrics";
import { AuthProvider } from "./contexts/AuthContext";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import MealAnalysisPage from "./pages/MealAnalysis";
import MealEditPage from "./pages/MealEdit";
import FoodScanAnalysis from "./pages/FoodScanAnalysis";
import FaceScan from "./pages/FaceScan";
import Connections from "./pages/Connections";
import Wallet from "./pages/Wallet";
import DashboardFirstTime from "./pages/DashboardFirstTime";
import OTP from "./pages/auth/Otp";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProfileProvider } from "./contexts/BodyProfileContext";
import RiskScore from "./pages/RiskScore";
import SharedReport from "./pages/SharedReport";
import { useEffect } from "react";
import { initializeGTag } from "./utils/gtagmanager";
import FaceScanV2 from "./pages/FaceScanV2";
import MyGoals from "./pages/MyGoals";
import GoalDetail from "./pages/GoalDetail";
import NewGoalDetail from "./pages/NewGoalDetail";
import SharedTreatmentReport from "./pages/SharedTreatmentReport";


const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeGTag();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
        <AuthProvider>
          <UserInfoProvider>
            <ProfileProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Auth & Onboarding Routes */}
                    <Route path="/welcome" element={<Welcome />} />
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />

                    <Route
                      path="/onboarding/:step"
                      element={<OnboardingScreen />}
                    />
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/otp" element={<OTP />} />

                    {/* App Routes */}
                    <Route path="/dashboard" element={<Index />} />
                    {/* <Route path="/dashboard-first" element={<DashboardFirstTime />} /> */}
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/report/:id" element={<ReportDetail />} />
                    <Route path="/body-metrics" element={<BodyMetrics />} />
                    <Route path="/sleep" element={<Sleep />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route
                      path="/meal-analysis"
                      element={<MealAnalysisPage />}
                    />
                    <Route path="/meal-edit" element={<MealEditPage />} />
                    <Route
                      path="/food-scan-analysis"
                      element={<FoodScanAnalysis />}
                    />
                    <Route path="/risk-score" element={<RiskScore />} />
                    <Route path="/connections" element={<Connections />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/face-scan" element={<FaceScan />} /> */}
                    <Route path="/face-scan" element={<FaceScanV2 />} />
                    <Route
                      path="/subscription-plans"
                      element={<SubscriptionPlans />}
                    />
                    <Route path="/goals" element={<MyGoals />} />
                    {/* <Route path="/goal-detail/:id" element={<GoalDetail />} /> */}
                    <Route path="/goal-detail/:id" element={<NewGoalDetail />} />
                    {/* Public Shared Report Route - No Auth Required */}
                    <Route
                      path="/shared-report/:reportId"
                      element={<SharedReport />}
                    />
                    <Route path="/shared-treatment-report" element={<SharedTreatmentReport />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </ProfileProvider>
          </UserInfoProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
