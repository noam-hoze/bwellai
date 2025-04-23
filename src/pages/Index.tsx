import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import AddDataDropdown from "@/components/dashboard/AddDataDropdown";
import HealthOverview from "@/components/dashboard/HealthOverview";
import FriendlyGreeting from "@/components/dashboard/FriendlyGreeting";
import BodyHealthInterface from "@/components/dashboard/BodyHealthInterface";
import HealthNavigator from "@/components/dashboard/HealthNavigator";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtocolTracker from "@/components/dashboard/ProtocolTracker";
import HealthVisualizations from "@/components/dashboard/HealthVisualizations";
import LabResultsSummary from "@/components/dashboard/LabResultsSummary";
import MessagesCenter from "@/components/dashboard/MessagesCenter";
import NextActions from "@/components/dashboard/NextActions";
import StartJourneyBanner from "@/components/first-time/StartJourneyBanner";
import JourneyDialog from "@/components/first-time/JourneyDialog";
import { useJourneyDialog } from "@/hooks/use-journey-dialog";
import axios from "axios";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import { useGetUserFaceScore } from "@/service/hooks/shenai/useShenaiFaceScore";

const Index = () => {
  const { toast } = useToast();
  useSearchParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { isOpen, closeJourney } = useJourneyDialog();
  const { isAuthenticated, loginWithOTP, loading } = useAuth();

  const {
    data: getProfileIsData,
    isSuccess: getProfileIsSuccess,
    refetch: getUserProfileRefetch,
  } = useGetUserProfile({ isAuthenticated });

  const { data: userFaceScoreHealthData } = useGetUserFaceScore(
    isAuthenticated,
    "HEALTH"
  );
  const { data: userFaceScoreActivityData } = useGetUserFaceScore(
    isAuthenticated,
    "ACTIVITY"
  );
  const { data: userFaceScoreSleepData } = useGetUserFaceScore(
    isAuthenticated,
    "SLEEP"
  );
  const { data: userFaceScoreNutritionData } = useGetUserFaceScore(
    isAuthenticated,
    "NUTRITION"
  );

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
        email: "",
        isAuthenticated: true,
        isfirstLogin: loggedInData?.payload?.isfirstLogin,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  useEffect(() => {
    if (!code) return;

    const handleSuccess = async (response) => {
      try {
        // const { credential } = response;
        // console.log(credential);
        // Send the credential to your backend for verification and authentication

        const backendResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/auth/google/callback`,
          {
            params: {
              Token: response,
            },
          }
        );

        if (backendResponse.data.payload) {
          handleGoogleSignIn(backendResponse.data.payload);
        }
      } catch (error) {
        if (error) {
          console.log(error);
          navigate("/onboarding/0");
        }
      } finally {
        // setLoading(false);
      }
    };

    if (code) {
      handleSuccess(code);
    }

    console.log({ code });
  }, [code]);

  if (!code && !localStorage.getItem("token")) {
    return <Navigate to="/onboarding/0" replace />;
  }

  // http://localhost:8080/dashboard
  // ?code=4%2F0Ab_5qlnKVd1_xhNov17EPi6TtPlHJxf3hyOOknftRKDNNq4ixUvxLTeHELbfUSyW2sEDuw
  // &scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
  // &authuser=0
  // &hd=wishfy.club
  // &prompt=none

  const handleLogMeal = () => {
    toast({
      title: "Coming Soon",
      description: "Meal logging will be available in the next update.",
    });
  };

  const handleUploadLabReport = () => {
    toast({
      title: "Coming Soon",
      description: "Lab report uploads will be available in the next update.",
    });
  };

  const handleConnectWearable = () => {
    toast({
      title: "Connecting Wearable",
      description: "Taking you to the Connections Hub...",
    });
  };

  const handleScanFace = () => {
    navigate("/face-scan");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <img
            src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
            alt="B-Well Logo"
            className="h-16 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isOpen ? "opacity-95" : ""}`}>
      <Header />

      <main className="container max-w-7xl mx-auto px-4 py-6">
        <FriendlyGreeting />
        <StartJourneyBanner />

        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <Button
            onClick={handleScanFace}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
          >
            <ScanFace className="mr-2 h-4 w-4" />
            Scan Face for Vitals
          </Button>

          <AddDataDropdown
            onLogMeal={handleLogMeal}
            onUploadLabReport={handleUploadLabReport}
            onConnectWearable={handleConnectWearable}
            onScanFace={handleScanFace}
          />
        </div>

        <HealthOverview />

        <HealthNavigator />

        <div className="grid gap-6 md:grid-cols-2 mt-6 space-y-6">
          <ProtocolTracker />
          <NextActions />
        </div>

        <div className="mt-6">
          <HealthVisualizations />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <LabResultsSummary />
          <MessagesCenter />
        </div>

        {/* <BodyHealthInterface /> */}
      </main>

      <JourneyDialog
        open={isOpen}
        onOpenChange={closeJourney}
        journeyList={
          getProfileIsData?.additionalDetails?.["What Are You Aiming For?"]
            ?.answersArray || []
        }
      />

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
