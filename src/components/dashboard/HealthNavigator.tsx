import { useState } from "react";
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

type Organ = "lungs" | "brain" | "liver" | "kidneys" | null;

interface OrganData {
  title: string;
  color: string;
  description: string;
  stats: {
    icon: React.ReactNode;
    value: string;
    unit: string;
    label: string;
    status: "normal" | "caution" | "warning";
  }[];
}

const HealthNavigator = () => {
  const [activeOrgan, setActiveOrgan] = useState<Organ>(null);

  const handleOrganClick = (organ: Organ) => {
    setActiveOrgan(activeOrgan === organ ? null : organ);
  };

  const organData: Record<NonNullable<Organ>, OrganData> = {
    lungs: {
      title: "Respiratory System",
      color: "#4db6ac",
      description: "Current Respiratory Health Status",
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
    brain: {
      title: "Brain & Nervous System",
      color: "#9b87f5",
      description: "Central Nervous System",
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
    liver: {
      title: "Liver",
      color: "#f59e0b",
      description: "Digestive & Metabolic Health",
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
    kidneys: {
      title: "Kidneys",
      color: "#3b82f6",
      description: "Urinary System",
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

  const getStatusBadge = (status: "normal" | "caution" | "warning") => {
    switch (status) {
      case "normal":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
            Normal
          </span>
        );
      case "caution":
        return (
          <span className="ml-auto text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
            Caution
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
          <div className="relative flex flex-col md:flex-row items-start">
            <div className="relative w-full md:w-1/2 flex justify-center">
              {/* <svg viewBox="0 0 200 400" className="w-64 h-auto mx-auto">
                <path 
                  d="M100,20 C130,20 150,50 150,90 C150,130 140,170 140,220 C140,270 120,320 100,380 C80,320 60,270 60,220 C60,170 50,130 50,90 C50,50 70,20 100,20 Z" 
                  fill="#e2e8f0" 
                  stroke="#cbd5e1" 
                  strokeWidth="2"
                />
                
                <ellipse cx="100" cy="30" rx="25" ry="30" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                
                <ellipse 
                  cx="100" 
                  cy="25" 
                  rx="20" 
                  ry="20" 
                  fill={activeOrgan === 'brain' ? "#d8b4fe" : "#e9d5ff"}
                  stroke="#9b87f5"
                  strokeWidth="1.5"
                  onClick={() => handleOrganClick('brain')}
                  style={{ cursor: 'pointer' }}
                  className="transition-colors duration-300 hover:fill-purple-300"
                />
                
                <path 
                  d="M85,100 C75,110 70,120 70,135 C70,150 75,165 85,175 C80,180 75,185 75,195 C75,205 80,210 90,210 C95,205 100,205 105,210 C115,210 120,205 120,195 C120,185 115,180 110,175 C120,165 125,150 125,135 C125,120 120,110 110,100 C110,90 105,85 100,85 C95,85 90,90 85,100 Z"
                  fill={activeOrgan === 'lungs' ? "#99f6e4" : "#ccfbf1"}
                  stroke="#4db6ac"
                  strokeWidth="1.5"
                  onClick={() => handleOrganClick('lungs')}
                  style={{ cursor: 'pointer' }}
                  className="transition-colors duration-300 hover:fill-teal-300"
                />

                <path 
                  d="M90,220 C110,210 125,220 125,235 C125,250 110,260 90,250 C80,245 80,225 90,220 Z"
                  fill={activeOrgan === 'liver' ? "#fed7aa" : "#fef3c7"}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  onClick={() => handleOrganClick('liver')}
                  style={{ cursor: 'pointer' }}
                  className="transition-colors duration-300 hover:fill-amber-300"
                />
                
                <path 
                  d="M80,260 C75,265 70,275 70,285 C70,295 75,305 85,310 C90,308 95,310 90,315 C85,320 85,325 90,330 C95,335 105,335 110,325 C115,320 115,315 110,310 C105,305 110,300 115,298 C125,293 130,285 130,275 C130,265 125,255 120,260 C115,262 110,265 105,265 C95,265 85,258 80,260 Z"
                  fill={activeOrgan === 'kidneys' ? "#bfdbfe" : "#dbeafe"}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  onClick={() => handleOrganClick('kidneys')}
                  style={{ cursor: 'pointer' }}
                  className="transition-colors duration-300 hover:fill-blue-300"
                />

                <ellipse cx="90" cy="25" rx="3" ry="2" fill="#94a3b8" />
                <ellipse cx="110" cy="25" rx="3" ry="2" fill="#94a3b8" />
                <path d="M90,40 C95,45 105,45 110,40" fill="none" stroke="#94a3b8" strokeWidth="1" />
              </svg> */}

              <div className="relative">
                <ManBody />
              </div>

              {/* {!activeOrgan && (
                <>
                  <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-70">
                    <div className="w-12 h-12 rounded-full border-2 border-purple-400 border-dashed"></div>
                    <div className="text-center text-xs mt-1 text-purple-700">
                      Brain
                    </div>
                  </div>
                  <div className="absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-70">
                    <div className="w-14 h-14 rounded-full border-2 border-teal-400 border-dashed"></div>
                    <div className="text-center text-xs mt-1 text-teal-700">
                      Lungs
                    </div>
                  </div>
                  <div className="absolute top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-70">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-dashed"></div>
                    <div className="text-center text-xs mt-1 text-amber-700">
                      Liver
                    </div>
                  </div>
                  <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-70">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-400 border-dashed"></div>
                    <div className="text-center text-xs mt-1 text-blue-700">
                      Kidneys
                    </div>
                  </div>
                </>
              )} */}
            </div>

            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
              {activeOrgan ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div
                    className="p-3 text-white font-medium flex justify-between items-center"
                    style={{ backgroundColor: organData[activeOrgan].color }}
                  >
                    <span className="text-xl">
                      {organData[activeOrgan].title}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </div>

                  <div className="divide-y divide-gray-100">
                    <div className="p-3">
                      <div className="font-medium text-gray-800 mb-2">
                        {organData[activeOrgan].description}
                      </div>
                      <div className="flex items-center justify-between text-sm py-1 px-2 bg-gray-50 rounded mb-1">
                        <span>View detailed health metrics</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center text-gray-800 mb-2">
                        <div className="flex flex-col items-center mr-2">
                          <span style={{ color: organData[activeOrgan].color }}>
                            ▲
                          </span>
                          <span style={{ color: organData[activeOrgan].color }}>
                            ▼
                          </span>
                        </div>
                        <span className="font-medium">Current Metrics</span>
                      </div>

                      <div className="space-y-3">
                        {organData[activeOrgan].stats.map((stat, index) => (
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
                                {getStatusBadge(stat.status)}
                              </div>
                              <div className="text-xs text-gray-700">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        ))}
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
