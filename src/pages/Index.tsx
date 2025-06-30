import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import AddDataDropdown from '@/components/dashboard/AddDataDropdown';
import HealthOverview from '@/components/dashboard/HealthOverview';
import FriendlyGreeting from '@/components/dashboard/FriendlyGreeting';
import BodyHealthInterface from '@/components/dashboard/BodyHealthInterface';
import HealthNavigator from '@/components/dashboard/HealthNavigator';
import { Button } from '@/components/ui/button';
import { ScanFace } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtocolTracker from '@/components/dashboard/ProtocolTracker';
import HealthVisualizations from '@/components/dashboard/HealthVisualizations';
import LabResultsSummary from '@/components/dashboard/LabResultsSummary';
import MessagesCenter from '@/components/dashboard/MessagesCenter';
import NextActions from '@/components/dashboard/NextActions';
import StartJourneyBanner from '@/components/first-time/StartJourneyBanner';
import JourneyDialog from '@/components/first-time/JourneyDialog';
import { useJourneyDialog } from '@/hooks/use-journey-dialog';
import axios from 'axios';
import {
  useGetUserOverallStatus,
  useGetUserProfile,
} from '@/service/hooks/profile/useGetUserProfile';
import { useGetUserFaceScore } from '@/service/hooks/shenai/useShenaiFaceScore';
import {
  useGetUserInfoTerraData,
  useGetWearableWeeklyDataV4,
} from '@/service/hooks/wearable/terra/useGetUserInfo';
import { useGetUserPreviousReportData } from '@/service/hooks/ocr/useGetReportById';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
};

const Index = () => {
  const { toast } = useToast();
  useSearchParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const { isOpen, closeJourney } = useJourneyDialog();
  const [callbackLoading, setCallbackLoading] = useState(false);
  const { isAuthenticated, loginWithOTP, loading } = useAuth();

  const {
    data: getProfileIsData,
    isSuccess: getProfileIsSuccess,
    refetch: getUserProfileRefetch,
  } = useGetUserProfile({ isAuthenticated });

  const { data: getUserOverallStatusIsData, refetch: getUserUserOverallStatusRefetch } =
    useGetUserOverallStatus({ isAuthenticated });

  const { data: connectedDevicesData, refetch: connectedDevicesRefetch } = useGetUserInfoTerraData({
    isAuthenticated,
  });

  const {
    data: wearableWeeklyData,
    isSuccess: wearableWeeklyIsSuccess,
    isLoading: wearableWeeklyIsLoading,
  } = useGetWearableWeeklyDataV4({
    resource: connectedDevicesData?.[0]?.device,
    isEnable: connectedDevicesData?.length > 0 ? connectedDevicesData?.[0]?.device : '',
    startDate: formatDate(new Date()),
  });

  const { data: userPreviousData } = useGetUserPreviousReportData(
    'MODERN_MEDICINE',
    '',
    isAuthenticated,
    'English',
  );

  const handleGoogleSignIn = (loggedInData) => {
    if (loggedInData) {
      toast({
        title: 'Welcome!',
        description: 'You have successfully logged in.',
      });

      localStorage.setItem('token', loggedInData?.token?.accessToken?.token);
      localStorage.setItem('refresh_token', loggedInData?.token?.refreshToken?.token);
      localStorage.setItem('is_Profile_updated', loggedInData?.isProfileUpdated);

      loginWithOTP({
        email: '',
        isAuthenticated: true,
        isfirstLogin: loggedInData?.payload?.isfirstLogin,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
  };

  useEffect(() => {
    if (!code) return;

    const handleSuccess = async (response) => {
      try {
        // const { credential } = response;
        // Send the credential to your backend for verification and authentication
        setCallbackLoading(true);

        const backendResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/auth/google/callback`,
          {
            params: {
              Token: response,
            },
          },
        );

        if (backendResponse.data.payload) {
          handleGoogleSignIn(backendResponse.data.payload);
        }
        setCallbackLoading(false);
      } catch (error) {
        setCallbackLoading(false);
        if (error) {
          console.log(error);
          navigate('/onboarding/4');
        }
      } finally {
        // setLoading(false);
      }
    };

    if (code) {
      handleSuccess(code);
    }
  }, [code]);

  if (!code && !isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  // http://localhost:8080/dashboard
  // ?code=4%2F0Ab_5qlnKVd1_xhNov17EPi6TtPlHJxf3hyOOknftRKDNNq4ixUvxLTeHELbfUSyW2sEDuw
  // &scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
  // &authuser=0
  // &hd=wishfy.club
  // &prompt=none

  const handleLogMeal = () => {
    toast({
      title: 'Coming Soon',
      description: 'Meal logging will be available in the next update.',
    });
  };

  const handleUploadLabReport = () => {
    toast({
      title: 'Coming Soon',
      description: 'Lab report uploads will be available in the next update.',
    });
  };

  const handleConnectWearable = () => {
    toast({
      title: 'Connecting Wearable',
      description: 'Taking you to the Connections Hub...',
    });
  };

  const handleScanFace = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate to the standalone scanner app with the auth token
      window.location.href = `https://localhost:5173?token=${token}`;
    } else {
      // Handle the case where the user is not authenticated
      console.error('Authentication token not found.');
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to perform a face scan.',
        variant: 'destructive',
      });
    }
  };

  const overallDataStatus =
    getUserOverallStatusIsData &&
    Object.values(getUserOverallStatusIsData)?.some((value) => value === false);

  if (loading || callbackLoading) {
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
    <div className={`min-h-screen bg-gray-50 ${isOpen ? 'opacity-95' : ''}`}>
      <Header />
      <ChatbotWidget />

      <main className="container max-w-7xl mx-auto px-4 py-6">
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

        <FriendlyGreeting />
        {(overallDataStatus || !getProfileIsData?.onBoarding) && (
          <StartJourneyBanner
            getUserOverallStatusIsData={getUserOverallStatusIsData}
            getProfileIsData={getProfileIsData}
          />
        )}

        {getUserOverallStatusIsData?.nutrition && getUserOverallStatusIsData?.wearable && (
          <HealthOverview wearableWeeklyData={wearableWeeklyData} />
        )}

        <HealthNavigator getProfileIsData={getProfileIsData} userPreviousData={userPreviousData} />

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
        getUserOverallStatusIsData={getUserOverallStatusIsData}
        getProfileIsData={getProfileIsData}
        journeyList={
          getProfileIsData?.additionalDetails?.['What Are You Aiming For?']?.answersArray || []
        }
      />

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        © 2024 Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
