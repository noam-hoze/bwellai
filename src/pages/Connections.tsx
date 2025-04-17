import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Watch,
  Cloud,
  Database,
  Shield,
  Link2,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HeartPulse,
  Moon,
  Activity as ActivityIcon,
  Utensils,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ConnectionCategorySection from "@/components/connections/ConnectionCategorySection";
import ConnectionStatusDashboard from "@/components/connections/ConnectionStatusDashboard";
import RecommendedConnectionCard from "@/components/connections/RecommendedConnectionCard";
import EmptyStatePrompt from "@/components/connections/EmptyStatePrompt";
import AppLogo from "@/components/connections/AppLogo";
import {
  useGetDeleteUserWearableDeviceFetcher,
  useGetUpdateConnectedDeviceFetcher,
  useGetUserInfoTerraData,
} from "@/service/hooks/wearable/terra/useGetUserInfo";
import { getValueFromToken } from "@/utils/auth";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const user_id = getValueFromToken("userId");

const Connections = () => {
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("user_id");
  const resourceParam = searchParams.get("provider");
  const referenceIDParam = searchParams.get("customer_user_id");

  const [activeTab, setActiveTab] = useState("categories");

  const {
    data: connectedDevicesData,
    isLoading,
    refetch: connectedDevicesRefetch,
  } = useGetUserInfoTerraData({
    isAuthenticated: localStorage.getItem("token") ? true : false,
  });

  const {
    isSuccess: updateConnectedDeviceIsSuccess,
    isError: updateConnectedDeviceIsError,
    mutate: updateConnectedDeviceMutate,
  } = useGetUpdateConnectedDeviceFetcher();

  const {
    isSuccess: deleteUserDeviceIsSuccess,
    isPending: deleteUserDeviceIsPending,
    mutate: deleteUserWearableDeviceMutate,
  } = useGetDeleteUserWearableDeviceFetcher();

  const connectionStats = {
    active: 3,
    recommended: 4,
    inactive: 1,
    totalAvailable: 15,
  };

  const userGoals = ["Improve sleep", "Track fitness", "Monitor heart health"];
  const recommendedConnections = [
    {
      id: "fitbit",
      name: "Fitbit",
      category: "Activity & Sleep",
      icon: "/connections/fitbit.png",
      priority: "high",
      benefits: [
        "Track steps & workouts",
        "Monitor sleep quality",
        "Heart rate tracking",
      ],
      description:
        "Connect your Fitbit to automatically sync activity, sleep, and heart rate data.",
    },
    {
      id: "oura",
      name: "Oura Ring",
      category: "Sleep",
      icon: "/connections/oura.png",
      priority: "high",
      benefits: [
        "Advanced sleep tracking",
        "Recovery monitoring",
        "Body temperature",
      ],
      description:
        "The Oura Ring provides detailed sleep analysis and recovery metrics.",
    },
    {
      id: "myfitnesspal",
      name: "MyFitnessPal",
      category: "Nutrition",
      icon: "",
      priority: "medium",
      benefits: [
        "Track daily calories",
        "Monitor macronutrients",
        "Food database",
      ],
      description:
        "Connect to track your daily nutrition intake and caloric balance.",
    },
    {
      id: "google_fit",
      name: "Google Fit",
      category: "Activity",
      icon: "/connections/google.webp",
      priority: "medium",
      benefits: ["Activity tracking", "Heart points", "Works with many apps"],
      description:
        "Google Fit aggregates data from multiple fitness apps and devices.",
    },
  ];

  const categories = [
    {
      id: "sleep",
      title: "Sleep Tracking",
      icon: Moon,
      description:
        "Connect to track sleep duration, quality, stages, and consistency",
      integrations: [
        {
          id: "oura",
          name: "Oura Ring",
          connected: false,
        },
        {
          id: "fitbit",
          name: "Fitbit",
          connected: false,
        },
        {
          id: "garmin",
          name: "Garmin",
          connected: false,
        },
        {
          id: "polar",
          name: "Polar",
          connected: false,
        },
      ],
    },
    {
      id: "activity",
      title: "Activity Tracking",
      icon: ActivityIcon,
      description:
        "Connect to track steps, workouts, calories burned, and active minutes",
      integrations: [
        {
          id: "strava",
          name: "Strava",
          connected: false,
        },
        {
          id: "garmin",
          name: "Garmin",
          connected: false,
        },
        {
          id: "polar",
          name: "Polar",
          connected: false,
        },
        {
          id: "google_fit",
          name: "Google Fit",
          connected: false,
        },
        {
          id: "fitbit",
          name: "Fitbit",
          connected: false,
        },
      ],
    },
    {
      id: "vitals",
      title: "Vitals & Health",
      icon: HeartPulse,
      description:
        "Connect to track heart rate, blood pressure, glucose levels, and weight",
      integrations: [
        {
          id: "whoop",
          name: "Whoop",
          connected: false,
        },
        {
          id: "withings",
          name: "Withings",
          connected: false,
        },
        {
          id: "FREESTYLELIBRE",
          name: "FreeStyle Libre",
          connected: false,
        },
        {
          id: "applehealth",
          name: "Apple Health",
          connected: false,
        },
      ],
    },
    {
      id: "nutrition",
      title: "Nutrition",
      icon: Utensils,
      description:
        "Connect to track calorie intake, macronutrients, and hydration",
      integrations: [
        {
          id: "myfitnesspal",
          name: "MyFitnessPal",
          connected: false,
        },
        {
          id: "eatthismuch",
          name: "Eat This Much",
          connected: false,
        },
      ],
    },
    {
      id: "womenshealth",
      title: "Women's Health",
      icon: Zap,
      description: "Connect to track menstrual cycles and reproductive health",
      integrations: [
        {
          id: "flo",
          name: "Flo",
          connected: false,
        },
      ],
    },
  ];

  const devices = [
    {
      id: "fitbit-device",
      name: "Fitbit Sense",
      type: "Fitness Watch",
      icon: Watch,
      isActive: true,
      status: "Connected",
      lastSync: "Today, 2:30 PM",
    },
    {
      id: "apple-watch",
      name: "Apple Watch Series 8",
      type: "Smartwatch",
      icon: Watch,
      isActive: true,
      status: "Connected",
      lastSync: "Today, 3:15 PM",
    },
    {
      id: "oura-ring",
      name: "Oura Ring Gen 3",
      type: "Sleep Tracker",
      icon: Watch,
      isActive: false,
      status: "Disconnected",
      lastSync: "3 days ago",
    },
  ];

  const apps = [
    {
      id: "strava",
      name: "Strava",
      type: "Fitness Tracking",
      isActive: true,
      status: "Connected",
      lastSync: "Today, 1:45 PM",
    },
    {
      id: "myfitnesspal-app",
      name: "MyFitnessPal",
      type: "Nutrition",
      isActive: false,
      status: "Disconnected",
      lastSync: "1 week ago",
    },
  ];

  const services = [
    {
      id: "apple-health",
      name: "Apple Health",
      provider: "Apple Inc.",
      isActive: true,
      status: "Connected",
      lastSync: "Today, 4:00 PM",
    },
    {
      id: "google-fit",
      name: "Google Fit",
      provider: "Google LLC",
      isActive: false,
      status: "Disconnected",
      lastSync: "Never",
    },
  ];

  const handleConnectNew = ({ deviceId }) => {
    console.log("Starting the connection process...", deviceId);

    window.open(
      `https://api.spikeapi.com/init-user-integration/?provider=${deviceId}&user_id=${user_id}&client_id=${
        import.meta.env.VITE_SPIKE_CLIENT_ID
      }`,
      "_self"
    );
  };

  useEffect(() => {
    if (userIdParam && resourceParam && referenceIDParam) {
      updateConnectedDeviceMutate({
        userId: userIdParam,
        resource: resourceParam,
        referenceId: referenceIDParam,
      });
    }
  }, []);

  useEffect(() => {
    if (updateConnectedDeviceIsSuccess) {
      connectedDevicesRefetch();
    }
    if (updateConnectedDeviceIsError) {
      connectedDevicesRefetch();
    }
  }, [updateConnectedDeviceIsSuccess, updateConnectedDeviceIsError]);

  const hasConnections = connectionStats.active > 0;

  const { isAuthenticated, loading } = useAuth();
  if (!loading && !isAuthenticated) {
    return <Navigate to="/onboarding/0" replace />;
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Connections Hub</h1>
            <p className="text-gray-500 mt-1">
              Users with connected devices are 3x more likely to achieve their
              health goals
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="categories"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsContent value="categories" className="mt-0 space-y-6">
            {!hasConnections ? (
              <EmptyStatePrompt onConnect={handleConnectNew} />
            ) : (
              <>
                <ConnectionStatusDashboard
                  stats={connectionStats}
                  connectedDevicesData={connectedDevicesData}
                />

                <div className="mt-8">
                  <Card className="bg-blue-50 border-blue-100 mb-4"></Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedConnections
                      .filter((conn) => conn.priority === "high")
                      .map((connection) => (
                        <RecommendedConnectionCard
                          key={connection.id}
                          connection={connection}
                          connectedDevicesData={connectedDevicesData}
                          onConnect={handleConnectNew}
                        />
                      ))}
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">
                  Integration Categories
                </h2>

                {categories?.map((category) => (
                  <ConnectionCategorySection
                    key={category?.id}
                    category={category}
                    connectedDevicesData={connectedDevicesData}
                    onConnect={handleConnectNew}
                  />
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent value="manage" className="mt-0 space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Manage Your Connections
            </h2>
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Connection Overview</CardTitle>
                <CardDescription>
                  Manage all your connected devices, apps, and services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-center mb-2">
                      <Watch className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="font-medium">Devices</h3>
                    <p className="text-2xl font-bold my-1">3</p>
                    <p className="text-xs text-gray-500">Active connections</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-center mb-2">
                      <Cloud className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="font-medium">Apps</h3>
                    <p className="text-2xl font-bold my-1">2</p>
                    <p className="text-xs text-gray-500">Active connections</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-center mb-2">
                      <Database className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-medium">Services</h3>
                    <p className="text-2xl font-bold my-1">1</p>
                    <p className="text-xs text-gray-500">Active connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="devices" className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-12 bg-gray-200 p-1.5 rounded-lg mb-6">
                <TabsTrigger
                  value="devices"
                  className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Devices
                </TabsTrigger>
                <TabsTrigger
                  value="apps"
                  className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Apps
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="text-base h-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Services
                </TabsTrigger>
              </TabsList>

              <TabsContent value="devices" className="mt-0 space-y-4">
                {devices.map((device) => (
                  <Card key={device.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className="p-2 bg-white rounded-full mr-3 flex items-center justify-center"
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          >
                            <AppLogo
                              app={device.id.split("-")[0]}
                              size={24}
                              fallbackIcon={device.icon}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {device.name}
                            </CardTitle>
                            <CardDescription>{device.type}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={device.isActive ? "default" : "secondary"}
                          className={device.isActive ? "bg-green-500" : ""}
                        >
                          {device.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {device.isActive ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          )}
                          <span className="text-gray-600">
                            Last sync: {device.lastSync}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500"
                        >
                          Manage
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  className="w-full py-6"
                  onClick={() => handleConnectNew({ deviceId: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Connect a new device
                </Button>
              </TabsContent>

              <TabsContent value="apps" className="mt-0 space-y-4">
                {apps.map((app) => (
                  <Card key={app.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className="p-2 bg-white rounded-full mr-3 flex items-center justify-center"
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          >
                            <AppLogo app={app.id.split("-")[0]} size={24} />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {app.name}
                            </CardTitle>
                            <CardDescription>{app.type}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={app.isActive ? "default" : "secondary"}
                          className={app.isActive ? "bg-green-500" : ""}
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {app.isActive ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          )}
                          <span className="text-gray-600">
                            Last sync: {app.lastSync}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500"
                        >
                          Manage
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  className="w-full py-6"
                  onClick={() => handleConnectNew({ deviceId: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Connect a new app
                </Button>
              </TabsContent>

              <TabsContent value="services" className="mt-0 space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className="p-2 bg-white rounded-full mr-3 flex items-center justify-center"
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          >
                            <AppLogo app={service.id} size={24} />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {service.name}
                            </CardTitle>
                            <CardDescription>
                              Provider: {service.provider}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={service.isActive ? "default" : "secondary"}
                          className={service.isActive ? "bg-green-500" : ""}
                        >
                          {service.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {service.isActive ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                          )}
                          <span className="text-gray-600">
                            Last sync: {service.lastSync}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500"
                        >
                          Manage
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  className="w-full py-6"
                  onClick={() => handleConnectNew({ deviceId: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Connect a new service
                </Button>
              </TabsContent>
            </Tabs>

            <Card className="mt-8 border-blue-100">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <CardTitle className="text-lg">
                    Data Privacy & Security
                  </CardTitle>
                </div>
                <CardDescription>
                  We prioritize the security of your connected data
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600">
                  Your connections are secure and private. We only share your
                  data with third parties with your explicit permission, and you
                  can revoke access at any time.
                </p>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-4">
                <div className="w-full flex justify-end">
                  <Button variant="outline" size="sm">
                    View Privacy Policy
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Connections;
