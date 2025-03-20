
import Layout from "@/components/layout/Layout";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-6 px-4 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        
        <ProfileTabs />
      </div>
    </Layout>
  );
};

export default Profile;
