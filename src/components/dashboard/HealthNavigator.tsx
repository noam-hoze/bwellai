import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Activity,
  Wind,
  Droplet,
  AlertTriangle,
  Brain,
  Thermometer,
  Info,
} from "lucide-react";
import { Lungs } from "@/components/icons/Lungs";
import ManBody from "./ManBody";
import WomanBody from "./WomanBody";
import {
  healthMetrics,
  healthMetricsArray,
  profileNameToBodyPartObject,
} from "@/modules/constant/report-data/body-profile-data";
import { useNavigate } from "react-router-dom";

const organColorMap: Record<string, string> = {
  Liver: "#f59e0b",
  Kidneys: "#3b82f6",
  "Nervous System & Brain": "#9b87f5",
  Lungs: "#4db6ac",
  Other: "#6b7280",
};

type Organ = "Lungs" | "Nervous System & Brain" | "Liver" | "Kidneys" | null;

interface OrganData {
  title: string;
  color: string;
  description: string;
  profileName?: string;
  stats: {
    icon: React.ReactNode;
    value: string;
    unit: string;
    label: string;
    status: "normal" | "caution" | "warning";
  }[];
}

const initOrgamData = {
  Skin: [],
  "Thyroid & Adrenal": [],
  Liver: [],
  Lungs: [],
  Reproductive: [],
  "Heart & Cardiovascular System": [],
  "Nervous System & Brain": [],
  Kidneys: [],
  "Bladder & Urinary System": [],
};

const organData: any = {
  Lungs: {
    title: "Respiratory System",
    color: "#4db6ac",
    description: "Current Respiratory Health Status",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "98.2",
        unit: "%",
        label: "Oxygen saturation (SpO2)",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "14",
        unit: "breaths/min",
        label: "Resting respiratory rate",
        status: "normal",
      },
      {
        icon: <Wind className="w-5 h-5 text-blue-600" />,
        value: "Deep",
        unit: "",
        label: "Breathing pattern",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        value: "Moderate",
        unit: "",
        label: "Pollution exposure risk",
        status: "caution",
      },
      {
        icon: <Activity className="w-5 h-5 text-green-600" />,
        value: "22",
        unit: "breaths/min",
        label: "Active respiratory rate",
        status: "normal",
      },
      {
        icon: <Thermometer className="w-5 h-5 text-green-600" />,
        value: "Low",
        unit: "",
        label: "Infection risk level",
        status: "normal",
      },
    ],
  },
  Skin: {
    title: "Skin",
    color: "#4db6ac",
    description: "Current Respiratory Health Status",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "98.2",
        unit: "%",
        label: "Oxygen saturation (SpO2)",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "14",
        unit: "breaths/min",
        label: "Resting respiratory rate",
        status: "normal",
      },
      {
        icon: <Wind className="w-5 h-5 text-blue-600" />,
        value: "Deep",
        unit: "",
        label: "Breathing pattern",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        value: "Moderate",
        unit: "",
        label: "Pollution exposure risk",
        status: "caution",
      },
      {
        icon: <Activity className="w-5 h-5 text-green-600" />,
        value: "22",
        unit: "breaths/min",
        label: "Active respiratory rate",
        status: "normal",
      },
      {
        icon: <Thermometer className="w-5 h-5 text-green-600" />,
        value: "Low",
        unit: "",
        label: "Infection risk level",
        status: "normal",
      },
    ],
  },
  "Thyroid & Adrenal": {
    title: "Thyroid & Adrenal",
    color: "#4db6ac",
    description: "Current Respiratory Health Status",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "98.2",
        unit: "%",
        label: "Oxygen saturation (SpO2)",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "14",
        unit: "breaths/min",
        label: "Resting respiratory rate",
        status: "normal",
      },
      {
        icon: <Wind className="w-5 h-5 text-blue-600" />,
        value: "Deep",
        unit: "",
        label: "Breathing pattern",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        value: "Moderate",
        unit: "",
        label: "Pollution exposure risk",
        status: "caution",
      },
      {
        icon: <Activity className="w-5 h-5 text-green-600" />,
        value: "22",
        unit: "breaths/min",
        label: "Active respiratory rate",
        status: "normal",
      },
      {
        icon: <Thermometer className="w-5 h-5 text-green-600" />,
        value: "Low",
        unit: "",
        label: "Infection risk level",
        status: "normal",
      },
    ],
  },
  "Nervous System & Brain": {
    title: "Brain & Nervous System",
    color: "#9b87f5",
    description: "Central Nervous System",
    profileName: "",
    stats: [
      {
        icon: <Activity className="w-5 h-5 text-purple-600" />,
        value: "Normal",
        unit: "",
        label: "Neurological activity",
        status: "normal",
      },
      {
        icon: <Brain className="w-5 h-5 text-purple-600" />,
        value: "68",
        unit: "ms",
        label: "Reaction time",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-purple-600" />,
        value: "7.5",
        unit: "hrs/night",
        label: "Sleep quality",
        status: "normal",
      },
    ],
  },
  "Heart & Cardiovascular System": {
    title: "Heart & Cardiovascular System",
    color: "#9b87f5",
    description: "Central Nervous System",
    profileName: "",
    stats: [
      {
        icon: <Activity className="w-5 h-5 text-purple-600" />,
        value: "Normal",
        unit: "",
        label: "Neurological activity",
        status: "normal",
      },
      {
        icon: <Brain className="w-5 h-5 text-purple-600" />,
        value: "68",
        unit: "ms",
        label: "Reaction time",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-purple-600" />,
        value: "7.5",
        unit: "hrs/night",
        label: "Sleep quality",
        status: "normal",
      },
    ],
  },
  Liver: {
    title: "Liver",
    color: "#f59e0b",
    description: "Digestive & Metabolic Health",
    profileName: "",
    stats: [
      {
        icon: <Activity className="w-5 h-5 text-amber-600" />,
        value: "7-55",
        unit: "U/L",
        label: "Normal ALT Range",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-amber-600" />,
        value: "8-48",
        unit: "U/L",
        label: "Normal AST Range",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-amber-600" />,
        value: "0.1-1.2",
        unit: "mg/dL",
        label: "Normal Bilirubin Range",
        status: "normal",
      },
      {
        icon: <Info className="w-5 h-5 text-amber-600" />,
        value: "Key Functions",
        unit: "",
        label: "Protein synthesis, toxin removal, bile production",
        status: "normal",
      },
      {
        icon: <Info className="w-5 h-5 text-amber-600" />,
        value: "Metabolic Role",
        unit: "",
        label: "Glucose regulation, nutrient processing",
        status: "normal",
      },
      {
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        value: "Screening",
        unit: "",
        label: "Annual liver function tests recommended",
        status: "normal",
      },
    ],
  },
  Kidneys: {
    title: "Kidneys",
    color: "#3b82f6",
    description: "Urinary System",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "Normal",
        unit: "",
        label: "Filtration rate",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "Good",
        unit: "",
        label: "Electrolyte balance",
        status: "normal",
      },
    ],
  },
  "Bladder & Urinary System": {
    title: "Bladder & Urinary System",
    color: "#3b82f6",
    description: "Urinary System",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "Normal",
        unit: "",
        label: "Filtration rate",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "Good",
        unit: "",
        label: "Electrolyte balance",
        status: "normal",
      },
    ],
  },
  Reproductive: {
    title: "Reproductive",
    color: "#3b82f6",
    description: "Urinary System",
    profileName: "",
    stats: [
      {
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        value: "Normal",
        unit: "",
        label: "Filtration rate",
        status: "normal",
      },
      {
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        value: "Good",
        unit: "",
        label: "Electrolyte balance",
        status: "normal",
      },
    ],
  },
};

const HealthNavigator = ({ getProfileIsData, userPreviousData }) => {
  const navigate = useNavigate();

  const [activeOrgan, setActiveOrgan] = useState<Organ>(null);
  const [formatedData, setFormatedData] = useState(initOrgamData);
  const [formatedData2, setFormatedData2] = useState({});

  console.log(activeOrgan);

  const handleOrganClick = (organ: Organ) => {
    setActiveOrgan(organ);
  };

  const getStatusBadge = (
    status: "normal" | "caution" | "warning" | "abnormal" | "high"
  ) => {
    switch (status) {
      case "normal":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
            Normal
          </span>
        );
      case "abnormal":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
            Caution
          </span>
        );
      case "high":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
            High
          </span>
        );
      case "warning":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
            Warning
          </span>
        );
    }
  };

  useEffect(() => {
    if (userPreviousData) {
      const organData = initOrgamData;

      userPreviousData?.data?.resultData?.forEach((item) => {
        const profile = item.profile;
        const biomarkers = item.biomarker;
        const pn = profileNameToBodyPartObject?.[profile?.name];

        if (!organData[pn]) {
          organData[pn] = {
            title: pn,
            color: organColorMap[pn] || "#6b7280",
            description: `${pn} Health Status`,
            stats: [],
            profileName: item?.profile?.svgIcon?.split(".")?.[0],
          };
        }

        biomarkers.forEach((bio: any) => {
          setFormatedData2((p) => {
            return {
              ...p,
              [bio?.testName]: {
                unit: bio?.testMeasuringUnit ?? "",
                value: bio?.testResultValue,
                signalText: bio?.signalText || "unknown",
                icon: <Info className="w-5 h-5 text-amber-500" />,
                label: bio?.testName ?? "Unknown Test",
              },
            };
          });
          organData?.[pn]?.stats?.push({
            icon: <Info className="w-5 h-5 text-amber-500" />,
            value: bio?.testResultValue ?? "N/A",
            unit: bio?.testMeasuringUnit ?? "",
            label: bio?.testName ?? "Unknown Test",
            signalText: bio?.signalText || "unknown",
          });
        });
      });

      setFormatedData(organData);
    }
  }, [userPreviousData]);

  return (
    <Card className="wellness-card border-l-4 border-l-blue-400 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-blue-500" />
          Health Navigator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-center overflow-hidden"></div>

          <div className="relative flex flex-col md:flex-row items-start">
            <div className="w-full flex items-center justify-center overflow-hidden">
              {getProfileIsData?.gender === "male" && (
                <ManBody handleOrganClick={handleOrganClick} />
              )}

              {(getProfileIsData?.gender === "female" ||
                !getProfileIsData?.gender) && (
                <WomanBody handleOrganClick={handleOrganClick} />
              )}
            </div>

            <div className="w-[25em] md:w-[35em] mt-6 md:mt-0 md:pl-6">
              {formatedData?.[activeOrgan] ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div
                    className="p-3 text-white font-medium flex justify-between items-center"
                    style={{
                      backgroundColor: organData?.[activeOrgan]?.color,
                    }}
                  >
                    <span className="text-xl">
                      {organData?.[activeOrgan]?.title}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </div>

                  <div className="divide-y divide-gray-100">
                    {/* <div className="p-3">
                      <div className="font-medium text-gray-800 mb-2">
                        {formatedData?.[activeOrgan]?.description}
                      </div>
                      <div
                        className="flex items-center justify-between text-sm p-1 bg-gray-200 rounded mb-1 cursor-pointer"
                        onClick={() => {
                          if (userPreviousData?.reportId) {
                            navigate(
                              `/report/${userPreviousData?.reportId}#${formatedData?.[activeOrgan]?.profileName}`
                            );
                          }
                        }}
                      >
                        <span>View detailed health metrics</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </div> */}

                    <div className="p-3">
                      {/* <div className="flex items-center text-gray-800 mb-2">
                        <div className="flex flex-col items-center mr-2">
                          <span
                            style={{
                              color: formatedData?.[activeOrgan]?.color,
                            }}
                          >
                            ▲
                          </span>
                          <span
                            style={{
                              color: formatedData?.[activeOrgan]?.color,
                            }}
                          >
                            ▼
                          </span>
                        </div>
                        <span className="font-medium">Current Metrics</span>
                      </div> */}

                      <div className="space-y-3">
                        {formatedData2 &&
                          healthMetrics?.[activeOrgan]?.map((stat, index) => {
                            // const isShowData = healthMetricsArray?.[
                            //   activeOrgan
                            // ]?.metric?.includes(stat.label);

                            return formatedData2?.[
                              stat?.metric?.toUpperCase()
                            ] ? (
                              <div key={index} className="flex items-start">
                                <div className="mr-2 mt-1">{stat?.icon}</div>
                                <div>
                                  <div className="flex items-baseline">
                                    <span className="text-lg font-bold text-gray-900">
                                      {formatedData2?.[
                                        stat?.metric?.toUpperCase()
                                      ]?.value || stat?.noDataMessage}
                                    </span>
                                    {formatedData2?.[
                                      stat?.metric?.toUpperCase()
                                    ]?.unit && (
                                      <span className="ml-1 text-sm text-gray-600">
                                        {
                                          formatedData2?.[
                                            stat?.metric?.toUpperCase()
                                          ].unit
                                        }
                                      </span>
                                    )}
                                    {getStatusBadge(
                                      formatedData2?.[
                                        stat?.metric?.toUpperCase()
                                      ]?.signalText
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-700">
                                    {formatedData2?.[
                                      stat?.metric?.toUpperCase()
                                    ]?.label?.toLowerCase()}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div key={index} className="flex items-start">
                                <div className="mr-2 mt-1">{stat?.icon}</div>
                                <div>
                                  <div className="flex items-baseline">
                                    <span className="text-lg font-bold text-gray-900">
                                      {stat?.noDataMessage}
                                    </span>
                                    {formatedData2?.[
                                      stat?.metric?.toUpperCase()
                                    ]?.unit && (
                                      <span className="ml-1 text-sm text-gray-600">
                                        {
                                          formatedData2?.[
                                            stat?.metric?.toUpperCase()
                                          ].unit
                                        }
                                      </span>
                                    )}
                                    {getStatusBadge(
                                      formatedData2?.[
                                        stat?.metric?.toUpperCase()
                                      ]?.signalText
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-700">
                                    {stat?.metric}
                                  </div>
                                  <div
                                    className="text-xs text-blue-700 cursor-pointer"
                                    onClick={() => navigate(`${stat.link}`)}
                                  >
                                    {stat.linkText}
                                  </div>
                                </div>
                                <div>
                                  <span className="ml-auto text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-nowrap">
                                    No Data
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : organData?.[activeOrgan] ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div
                    className="p-3 text-white font-medium flex justify-between items-center"
                    style={{
                      backgroundColor: organData?.[activeOrgan]?.color,
                    }}
                  >
                    <span className="text-xl">
                      {organData?.[activeOrgan]?.title}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </div>

                  <div className="divide-y divide-gray-100">
                    <div className="p-3">
                      <div className="font-medium text-gray-800 mb-2">
                        <p>
                          {organData?.[activeOrgan]?.description}

                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full inline-flex items-center mt-1">
                            Sample Data
                          </span>
                        </p>
                      </div>
                      <div
                        className="flex items-center justify-between text-sm p-1 bg-gray-200 rounded mb-1 cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/report/${userPreviousData?.reportId}#${organData?.[activeOrgan]?.profileName}`
                          );
                        }}
                      >
                        <span>View detailed health metrics</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center text-gray-800 mb-2">
                        <div className="flex flex-col items-center mr-2">
                          <span
                            style={{
                              color: organData?.[activeOrgan]?.color,
                            }}
                          >
                            ▲
                          </span>
                          <span
                            style={{
                              color: organData?.[activeOrgan]?.color,
                            }}
                          >
                            ▼
                          </span>
                        </div>
                        <span className="font-medium">Current Metrics</span>
                      </div>

                      <div className="space-y-3">
                        {organData?.[activeOrgan]?.stats?.map((stat, index) => {
                          const isShowData = healthMetricsArray?.[
                            activeOrgan
                          ]?.metric?.includes(stat.label);

                          return isShowData ? (
                            <div key={index} className="flex items-start">
                              <div className="mr-2 mt-1">{stat.icon}</div>
                              <div>
                                <div className="flex items-baseline">
                                  <span className="text-lg font-bold text-gray-900">
                                    {stat.value}
                                  </span>
                                  {stat.unit && (
                                    <span className="ml-1 text-sm text-gray-600">
                                      {stat.unit}
                                    </span>
                                  )}
                                  {getStatusBadge(stat.signalText || "normal")}
                                </div>
                                <div className="text-xs text-gray-700">
                                  {stat.label}
                                </div>
                                <div className="text-xs text-gray-700">
                                  {stat.linkText}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 text-center">
                  <h3 className="text-lg font-medium mb-2 text-gray-800">
                    Interactive Health Navigator
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click on different parts of the body model to view detailed
                    health metrics and insights.
                  </p>
                  <ul className="text-left text-sm space-y-2 mx-auto max-w-xs">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                      <span>Brain - Central nervous system health</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                      <span>Lungs - Respiratory health metrics</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                      <span>Liver - Digestive system function</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                      <span>Kidneys - Urinary system health</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthNavigator;
