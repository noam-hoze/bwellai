import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Link2,
  ArrowRight,
  Watch,
  Phone,
  Cloud,
  CheckCircle2,
  AlertCircle,
  UserRound,
  RefreshCw,
  Link2Off,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AppLogo from "@/components/connections/AppLogo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ConnectionStatusDashboard from "@/components/connections/ConnectionStatusDashboard";
import {
  useGetDeleteUserWearableDeviceFetcher,
  useGetUserInfoTerraData,
} from "@/service/hooks/wearable/terra/useGetUserInfo";

const ConnectionsOverviewTab = () => {
  // Mock data for connected devices
  const connectionsData = {
    devicesConnected: 3,
    appsConnected: 2,
    servicesConnected: 1,
    totalActive: 6,
    totalInactive: 1,
    totalAvailable: 15,
    recentSync: "Today, 3:12 PM",
  };

  // Mock data for connection statistics that will be used by ConnectionStatusDashboard
  const connectionStats = {
    active: connectionsData.totalActive,
    recommended: 4,
    inactive: connectionsData.totalInactive,
    totalAvailable: connectionsData.totalAvailable,
  };

  const {
    data: connectedDevicesData,
    isLoading,
    refetch: connectedDevicesRefetch,
  } = useGetUserInfoTerraData({
    isAuthenticated: localStorage.getItem("token") ? true : false,
  });

  const {
    isSuccess: deleteUserDeviceIsSuccess,
    isPending: deleteUserDeviceIsPending,
    error: deleteUserDeviceIsError,
    mutate: deleteUserWearableDeviceMutate,
  } = useGetDeleteUserWearableDeviceFetcher();

  // Mock data for devices
  const devices = [
    {
      id: "fitbit",
      name: "Fitbit Sense",
      type: "Fitness Watch",
      icon: "Watch",
      isActive: true,
      status: "Connected",
      lastSync: "Today, 2:30 PM",
      tracking: {
        sleep: true,
        activity: true,
        heartRate: true,
      },
      description:
        "Fitbit is part of Google. Together we can make health and well -being more accessible to more people. We present one of the most important applications in the world about health and fitness. Use the Fitbit application alone to monitor basic statistics and maintain motivation.",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/fitbit.png",
      connected: true,
    },
    {
      id: "apple-watch",
      name: "Apple Watch Series 8",
      type: "Smartwatch",
      icon: "Watch",
      isActive: true,
      status: "Connected",
      lastSync: "Today, 3:15 PM",
      tracking: {
        sleep: true,
        activity: true,
        heartRate: true,
      },
      description: "",
      image: "",
      connected: true,
    },
    {
      id: "oura",
      name: "Oura Ring Gen 3",
      type: "Sleep Tracker",
      icon: "Watch",
      isActive: true,
      status: "Connected",
      lastSync: "3 days ago",
      tracking: {
        sleep: true,
        activity: false,
        heartRate: true,
      },
      description:
        "Health tracking wrapped around your finger — track your sleep, activity, recovery in style.",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/oura.png",
      connected: true,
    },
    {
      id: "FREESTYLELIBRE",
      name: "FreeStyle Libre",
      type: "Glucose Monitor",
      icon: "Watch",
      isActive: true,
      status: "Connected",
      lastSync: "Today, 1:45 PM",
      tracking: {
        sleep: false,
        activity: false,
        heartRate: false,
      },
      description:
        "The FreeStyle LibreLink app is approved for use with FreeStyle Libre and FreeStyle Libre 2 system sensors.",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/freestylelibre.webp",
      connected: true,
    },
    {
      id: "google_fit",
      name: "Google",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Achieve your fitness goals through customised coaching and actionable tips based on your health and activity history. Google Fit also makes it easy to monitor your progress and track your activity right from your phone or smartwatch.",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/google.webp",
      connected: true,
    },
    {
      id: "polar",
      name: "Polar",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Polar Flow allows you to analyze sports activity and fitness and is used with GPS-enabled heart rate monitors, fitness devices and activity trackers from Polar.* Track your training and activity and instantly see your achievements. You can view all your training and activity data on your phone on the go and wireless sync it to the Polar Flow service",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/polar.png",
      connected: true,
    },
    {
      id: "garmin",
      name: "Garmin",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Garmin Connect is the tool for tracking, analyzing and sharing health and fitness activities from your Garmin device.",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/garmin.png",
      connected: true,
    },
    {
      id: "withings",
      name: "Withings",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Delivering reliable medical, health and wellness data with a better experience.",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/unnamed-_3_.png",
      connected: true,
    },
    {
      id: "FLO",
      name: "Flo",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Figure out what's normal for you with our period and cycle tracker. Spot patterns in your symptoms and know when your period is likely to start.",
      image: "https://api.tryterra.co/v2/static/assets/img/app_icons/flo.webp",
      connected: true,
    },
    {
      id: "EATTHISMUCH",
      name: "Eat this much",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Eat This Much is a meal planning app that helps users achieve their fitness goals by generating personalized meal plans based on their dietary preferences, budget, schedule, and daily caloric intake",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/eatthismuch.webp",
      connected: true,
    },
    {
      id: "strava",
      name: "Strava",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "Upload activities recorded with the Apple Workout App to Strava and automatically sync activities from Strava to the Health app.",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/strava.webp",
      connected: true,
    },
    {
      id: "whoop",
      name: "Whoop",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description: "Your Personal Digital Fitness and Health Coach",
      image:
        "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/whoop.png",
      connected: true,
    },
    {
      id: "HUAWEI",
      name: "Huawei",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "The companion app to Huawei wearables. Huawei Health is a free health and fitness app that allows you to keep track of your fitness regimen.",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/huawei.webp",
      connected: true,
    },
    {
      id: "dexcom",
      name: "Dex",
      type: "",
      icon: "",
      isActive: true,
      status: "Connected",
      lastSync: "",
      tracking: {},
      description:
        "DexCare helps the health system optimize resources, orchestrate capacity, and intelligently guide patients to best-fit care options.",
      image:
        "https://api.tryterra.co/v2/static/assets/img/app_icons/dexcom.webp",
      connected: true,
    },
  ];

  const [openDeviceIds, setOpenDeviceIds] = useState<string[]>([]);
  const [trackingSettings, setTrackingSettings] = useState<
    Record<
      string,
      {
        sleep: boolean;
        activity: boolean;
        heartRate: boolean;
      }
    >
  >(
    devices.reduce(
      (acc, device) => ({
        ...acc,
        [device.id]: device.tracking,
      }),
      {}
    )
  );
  const connectionProgress =
    (connectionsData.totalActive / connectionsData.totalAvailable) * 100;
  const toggleDeviceExpand = (deviceId: string) => {
    setOpenDeviceIds((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };
  const updateTracking = (
    deviceId: string,
    type: "sleep" | "activity" | "heartRate",
    value: boolean
  ) => {
    setTrackingSettings((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        [type]: value,
      },
    }));
  };

  const handleConfirm = ({ deviceId }) => {
    deleteUserWearableDeviceMutate({
      device: deviceId,
    });
  };

  useEffect(() => {
    if (deleteUserDeviceIsSuccess) {
      connectedDevicesRefetch();
    }
    if (deleteUserDeviceIsError) {
      connectedDevicesRefetch();
    }
  }, [deleteUserDeviceIsSuccess, deleteUserDeviceIsError]);

  return (
    <div className="space-y-6 py-4">
      <ConnectionStatusDashboard
        stats={connectionStats}
        connectedDevicesData={connectedDevicesData?.map((d) => d?.device)}
      />
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <h3 className="text-xl flex items-center gap-2 mb-4">
            <Link2 className="h-5 w-5 text-wellness-bright-green" />
            Connected Devices & Apps
          </h3>

          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div className="flex flex-col items-end"></div>
          </div>

          <div className="mt-6">
            <h4 className="text-base font-medium mb-3">
              Your Connected Devices
            </h4>
            <div className="space-y-3">
              {devices
                ?.filter((device) =>
                  connectedDevicesData
                    ?.map((d) => d?.device)
                    ?.includes(device?.id)
                )
                ?.map((device) => (
                  <Collapsible
                    key={device.id}
                    open={openDeviceIds.includes(device.id)}
                    onOpenChange={() => {}}
                    className="rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center p-4">
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
                            <h5 className="font-medium text-sm">
                              {device.name}
                            </h5>
                            <p className="text-xs text-gray-500">
                              {device.type}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={device.isActive ? "default" : "secondary"}
                          className={device.isActive ? "bg-green-500" : ""}
                        >
                          {device.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center bg-white text-sm">
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
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500"
                          onClick={() => toggleDeviceExpand(device.id)}
                        >
                          {openDeviceIds.includes(device.id)
                            ? "Hide"
                            : "Manage"}
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            disabled={!device.isActive}
                            onClick={() =>
                              handleConfirm({ deviceId: device.id })
                            }
                          >
                            <Link2Off className="mr-1 h-4 w-4" />
                            Disconnect device
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            disabled={!device.isActive}
                          >
                            <UserRound className="mr-1 h-4 w-4" />
                            Switch account
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                          >
                            <RefreshCw className="mr-1 h-4 w-4" />
                            Re-sync
                          </Button>
                        </div>

                        <div>
                          <h6 className="text-sm font-medium mb-2">
                            Default Tracking
                          </h6>
                          <ToggleGroup
                            type="multiple"
                            variant="outline"
                            className="justify-start flex-wrap gap-2"
                            value={[
                              ...(trackingSettings[device.id].sleep
                                ? ["sleep"]
                                : []),
                              ...(trackingSettings[device.id].activity
                                ? ["activity"]
                                : []),
                              ...(trackingSettings[device.id].heartRate
                                ? ["heartRate"]
                                : []),
                            ]}
                            onValueChange={(values) => {
                              if (!device.isActive) return;
                              updateTracking(
                                device.id,
                                "sleep",
                                values.includes("sleep")
                              );
                              updateTracking(
                                device.id,
                                "activity",
                                values.includes("activity")
                              );
                              updateTracking(
                                device.id,
                                "heartRate",
                                values.includes("heartRate")
                              );
                            }}
                          >
                            <ToggleGroupItem
                              value="sleep"
                              className="text-xs"
                              disabled={!device.isActive}
                            >
                              Sleep Tracking
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="activity"
                              className="text-xs"
                              disabled={!device.isActive}
                            >
                              Activity Tracking
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="heartRate"
                              className="text-xs"
                              disabled={!device.isActive}
                            >
                              Heart Rate Monitoring
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 mt-6">
            <p className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 16v-4M12 8h.01"
                />
              </svg>
              Users with connected devices are 3x more likely to achieve their
              health goals
            </p>
          </div>

          <div className="text-sm text-gray-600 flex justify-between items-center mt-4">
            <span>Last synced: {connectionsData.recentSync}</span>
            {connectionsData.totalInactive > 0 && (
              <span className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                {connectionsData.totalInactive} connection needs attention
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 px-6 py-4">
          <Button asChild className="w-full">
            <Link to="/connections">
              Connect New Device
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConnectionsOverviewTab;
