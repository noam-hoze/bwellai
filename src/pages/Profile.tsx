import Layout from "@/components/layout/Layout";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserProfile } from "@/service/hooks/profile/useGetUserProfile";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const {
    data: getProfileIsData,
    isSuccess: getProfileIsSuccess,
    refetch: getUserProfileRefetch,
  } = useGetUserProfile();

  const { isAuthenticated, loading } = useAuth();
  if (!loading && !isAuthenticated) {
    return <Navigate to="/onboarding/0" replace />;
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-6 px-4 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <ProfileTabs getProfileIsData={getProfileIsData} />
      </div>
    </Layout>
  );
};

export default Profile;
