import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Info,
  AlertCircle,
  Brain,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import testInformationData from "@/data/testInformationData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import TestInformationTooltip from "./TestInformationTooltip";
import ReportSpectrum from "../ui/ReportSpectrum/ReportSpectrum";
import TestResultTrendHistory from "./components/test-result/TestResultTrendHistory";
import AllTestsList from "./components/tests/AllTestsList";

interface BloodTestResult {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "normal" | "warning" | "high";
  category: string;
  description: string;
  whatIs?: string;
  whatAffects?: string;
  whatMeans?: string;
  previousValue?: number;
  changePercentage?: number;
  trendData?: number[];
}

interface PerspectiveInsight {
  id: string;
  title: string;
  color: string;
  content: string;
}

const bloodTestResults: BloodTestResult[] = [
  {
    id: "glucose",
    name: "Glucose",
    value: 118,
    unit: "mg/dL",
    min: 70,
    max: 100,
    status: "warning",
    category: "Blood Sugar",
    description:
      "Measures blood sugar levels, important for energy and metabolism",
    whatIs:
      "Glucose is the primary sugar found in your blood and is your body's main source of energy. This test measures the amount of glucose in your blood at the time of the test.",
    whatAffects:
      "Diet (especially carbohydrate intake), physical activity, stress, medications, hormones (insulin, glucagon), time since your last meal, and certain medical conditions can all affect glucose levels.",
    whatMeans:
      "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
    previousValue: 105,
    changePercentage: 12,
    trendData: [98, 102, 105, 110, 112, 118],
  },
  {
    id: "a1c",
    name: "HbA1c",
    value: 5.9,
    unit: "%",
    min: 4.0,
    max: 5.7,
    status: "warning",
    category: "Blood Sugar",
    description: "Shows average blood sugar over the past 3 months",
    whatIs:
      "HbA1c (glycated hemoglobin) measures the average blood sugar level over the past 2-3 months. It shows what percentage of your hemoglobin proteins have glucose attached to them.",
    whatAffects:
      "Long-term dietary habits, physical activity patterns, medication adherence, and underlying health conditions can affect HbA1c levels. Unlike glucose tests, it's not significantly affected by recent meals.",
    whatMeans:
      "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
    previousValue: 5.5,
    changePercentage: 7,
    trendData: [5.2, 5.3, 5.4, 5.5, 5.7, 5.9],
  },
  {
    id: "cholesterol",
    name: "Total Cholesterol",
    value: 210,
    unit: "mg/dL",
    min: 125,
    max: 200,
    status: "warning",
    category: "Lipids",
    description: "Measures overall cholesterol levels in your blood",
    whatIs:
      "Total cholesterol is the sum of all cholesterol types in your blood, including LDL, HDL, and other lipid components. It's a waxy substance your body needs to build cells and make vitamins and hormones.",
    whatAffects:
      "Diet (saturated and trans fats), weight, physical activity, age, genetics, other health conditions like diabetes or thyroid disorders, and certain medications can all influence cholesterol levels.",
    whatMeans:
      "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
    previousValue: 195,
    changePercentage: 8,
    trendData: [180, 185, 190, 195, 205, 210],
  },
  {
    id: "ldl",
    name: "LDL Cholesterol",
    value: 131,
    unit: "mg/dL",
    min: 0,
    max: 100,
    status: "high",
    category: "Lipids",
    description: "The 'bad' cholesterol that can build up in arteries",
    whatIs:
      "LDL (Low-Density Lipoprotein) cholesterol is often called 'bad' cholesterol because high levels can lead to plaque buildup in your arteries, increasing the risk of heart disease and stroke.",
    whatAffects:
      "Diet high in saturated and trans fats, obesity, lack of physical activity, smoking, age, genetics, and certain medical conditions can increase LDL levels.",
    whatMeans:
      "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
    previousValue: 120,
    changePercentage: 9,
    trendData: [105, 110, 115, 120, 125, 131],
  },
  {
    id: "hdl",
    name: "HDL Cholesterol",
    value: 52,
    unit: "mg/dL",
    min: 40,
    max: 60,
    status: "normal",
    category: "Lipids",
    description: "The 'good' cholesterol that helps remove other cholesterol",
    whatIs:
      "HDL (High-Density Lipoprotein) cholesterol is often called 'good' cholesterol because it helps remove other forms of cholesterol from your bloodstream, potentially lowering your risk of heart disease.",
    whatAffects:
      "Regular physical activity, maintaining a healthy weight, not smoking, and consuming healthy fats can increase HDL levels. Genetic factors also play a significant role.",
    whatMeans:
      "Your HDL level is within the healthy range, which helps protect against heart disease by removing excess cholesterol from your bloodstream.",
    previousValue: 50,
    changePercentage: 4,
    trendData: [45, 47, 48, 50, 51, 52],
  },
  {
    id: "triglycerides",
    name: "Triglycerides",
    value: 142,
    unit: "mg/dL",
    min: 0,
    max: 150,
    status: "normal",
    category: "Lipids",
    description: "Fat in your blood that can increase heart disease risk",
    whatIs:
      "Triglycerides are a type of fat (lipid) found in your blood. When you eat, your body converts any calories it doesn't need to use right away into triglycerides, which are stored in your fat cells.",
    whatAffects:
      "Diet (especially simple carbohydrates and alcohol), obesity, physical inactivity, smoking, certain medications, and medical conditions like diabetes or kidney disease can all affect triglyceride levels.",
    whatMeans:
      "Your triglyceride level is within the normal range, which is good for your cardiovascular health.",
    previousValue: 145,
    changePercentage: -2,
    trendData: [155, 150, 148, 145, 143, 142],
  },
  {
    id: "sodium",
    name: "Sodium",
    value: 139,
    unit: "mmol/L",
    min: 135,
    max: 145,
    status: "normal",
    category: "Electrolytes",
    description: "Important for nerve and muscle function",
    whatIs:
      "Sodium is an electrolyte that helps regulate the amount of water in and around your cells and is needed for proper nerve and muscle function, including your heart.",
    whatAffects:
      "Dietary salt intake, sweating, vomiting, diarrhea, kidney function, certain medications (especially diuretics), and medical conditions that affect fluid balance can all influence sodium levels.",
    whatMeans:
      "Your sodium level is within the normal range, indicating good electrolyte balance.",
    previousValue: 138,
    changePercentage: 1,
    trendData: [137, 137, 138, 138, 139, 139],
  },
  {
    id: "potassium",
    name: "Potassium",
    value: 4.1,
    unit: "mmol/L",
    min: 3.5,
    max: 5.0,
    status: "normal",
    category: "Electrolytes",
    description: "Critical for heart and muscle function",
    whatIs:
      "Potassium is a crucial electrolyte that helps your nerves function and muscles contract. It helps regulate your heartbeat and is important for moving nutrients into cells and waste products out of cells.",
    whatAffects:
      "Diet (especially fruits and vegetables), kidney function, certain medications (diuretics, ACE inhibitors), vomiting, diarrhea, and hormonal factors can all affect potassium levels.",
    whatMeans:
      "Your potassium level is within the normal range, which is important for proper heart and muscle function.",
    previousValue: 4.0,
    changePercentage: 2,
    trendData: [3.9, 3.9, 4.0, 4.0, 4.1, 4.1],
  },
  {
    id: "creatinine",
    name: "Creatinine",
    value: 0.9,
    unit: "mg/dL",
    min: 0.6,
    max: 1.2,
    status: "normal",
    category: "Kidney Function",
    description: "Shows how well your kidneys are filtering waste",
    whatIs:
      "Creatinine is a waste product produced by your muscles from the breakdown of a compound called creatine. Your kidneys filter creatinine from your blood, so levels in the blood show how well your kidneys are working.",
    whatAffects:
      "Muscle mass (more muscle typically means higher creatinine levels), intense exercise, certain medications, diet (especially meat consumption), hydration status, and of course, kidney function all affect creatinine levels.",
    whatMeans:
      "Your creatinine level is within the normal range, suggesting your kidneys are functioning properly.",
    previousValue: 0.85,
    changePercentage: 6,
    trendData: [0.8, 0.82, 0.85, 0.85, 0.88, 0.9],
  },
  {
    id: "alt",
    name: "ALT",
    value: 33,
    unit: "U/L",
    min: 0,
    max: 40,
    status: "normal",
    category: "Liver Function",
    description: "Enzyme that indicates liver health",
    whatIs:
      "ALT (Alanine Aminotransferase) is an enzyme primarily found in liver cells. When liver cells are damaged, ALT is released into the bloodstream. This test measures the amount of ALT in your blood to assess liver health.",
    whatAffects:
      "Liver disease, excessive alcohol consumption, certain medications, obesity, viral infections (like hepatitis), and intense exercise can all cause elevated ALT levels.",
    whatMeans:
      "Your ALT level is within the normal range, suggesting your liver is functioning properly.",
    previousValue: 30,
    changePercentage: 10,
    trendData: [25, 27, 28, 30, 32, 33],
  },
];

const perspectiveInsights: Record<string, PerspectiveInsight[]> = {
  conventional: [
    {
      id: "electrolyte",
      title: "Electrolyte Profile",
      color: "#3b82f6",
      content:
        "Your blood test results show slightly low sodium and slightly high potassium levels. This could indicate a mild electrolyte imbalance. You might want to consider increasing your sodium intake through diet and hydration, perhaps consulting with a nutritionist for tailored guidance.",
    },
    {
      id: "cholesterol",
      title: "Cholesterol Management",
      color: "#e05d44",
      content:
        "Your LDL cholesterol is above the recommended range. Consider dietary changes like reducing saturated fats and increasing soluble fiber, along with regular physical activity. Discuss with your healthcare provider about potential treatment options if lifestyle changes aren't sufficient.",
    },
    {
      id: "kidney",
      title: "Kidney Function",
      color: "#22c55e",
      content:
        "Your kidney function tests (creatinine) are within normal ranges, indicating healthy kidney function. Continue to stay well-hydrated and maintain a balanced diet to support continued kidney health.",
    },
  ],
  naturopathic: [
    {
      id: "inflammation",
      title: "Inflammatory Markers",
      color: "#f97316",
      content:
        "Your lipid panel suggests mild systemic inflammation. Consider adding anti-inflammatory foods like turmeric, ginger, and omega-3 rich foods. Reducing processed foods and environmental toxins may also help reduce inflammatory burden on your system.",
    },
    {
      id: "hormonal",
      title: "Blood Sugar Regulation",
      color: "#8b5cf6",
      content:
        "Your glucose and HbA1c suggest your body might be experiencing insulin resistance. Consider a whole-foods based diet with complex carbohydrates and chromium-rich foods like broccoli and grapes. Intermittent fasting may also help improve insulin sensitivity.",
    },
    {
      id: "detox",
      title: "Detoxification Support",
      color: "#22c55e",
      content:
        "Your liver enzymes are within range but at the higher end of normal. Supporting your body's natural detoxification with cruciferous vegetables, adequate hydration, and herbs like milk thistle and dandelion may help optimize liver function.",
    },
  ],
  dietitian: [
    {
      id: "macronutrients",
      title: "Macronutrient Balance",
      color: "#0ea5e9",
      content:
        "Your cholesterol profile suggests a need for dietary adjustment. Consider increasing your soluble fiber intake through foods like oats, beans, and flaxseed. Replacing saturated fats with monounsaturated fats from olive oil, avocados, and nuts may also improve your lipid profile.",
    },
    {
      id: "micronutrients",
      title: "Micronutrient Status",
      color: "#f97316",
      content:
        "Based on your electrolyte panel, you may benefit from increasing potassium-rich foods like bananas, sweet potatoes, and spinach. Consider tracking your sodium intake, aiming for no more than 2,300mg daily from natural food sources rather than processed foods.",
    },
    {
      id: "mealplanning",
      title: "Meal Planning Strategy",
      color: "#22c55e",
      content:
        "To support healthy glucose levels, focus on balanced meals with protein, healthy fats, and complex carbohydrates. Consider the plate method: ½ plate non-starchy vegetables, ¼ plate lean protein, and ¼ plate complex carbohydrates with a small amount of healthy fat.",
    },
  ],
  tcm: [
    {
      id: "qi-energy",
      title: "Qi Energy Balance",
      color: "#6366f1",
      content:
        "Your test results indicate a pattern of Liver Qi stagnation with some Blood deficiency, common in modern stress-filled lifestyles. Consider gentle movement practices like Tai Chi or Qigong to promote smooth Qi flow, along with warming foods and herbs that support Blood nourishment.",
    },
    {
      id: "yin-yang",
      title: "Yin-Yang Harmony",
      color: "#0ea5e9",
      content:
        "There are signs of a mild Yin deficiency with some Heat signs, particularly affecting your Heart and Kidney systems. Cooling foods like cucumber, watermelon, and chrysanthemum tea may help balance this pattern, along with adequate rest and stress reduction techniques.",
    },
    {
      id: "five-elements",
      title: "Five Element Insights",
      color: "#f97316",
      content:
        "From a Five Element perspective, your Wood element (Liver) may be overacting on Earth (Spleen), affecting your digestive function and Blood production. Focusing on regular meals with warm, cooked foods may strengthen your Spleen energy and improve overall energy balance.",
    },
  ],
  "mental-health": [
    {
      id: "stress-impact",
      title: "Stress Physiology",
      color: "#ec4899",
      content:
        "Your slightly elevated glucose levels may reflect ongoing stress activation. Chronic stress triggers cortisol release, which raises blood sugar. Consider incorporating regular stress-reduction practices like mindfulness meditation, deep breathing exercises, or progressive muscle relaxation.",
    },
    {
      id: "mood-connection",
      title: "Mood-Body Connection",
      color: "#8b5cf6",
      content:
        "The cholesterol imbalance shown in your results can both affect and be affected by mood states. Research shows bidirectional relationships between lipid profiles and mood disorders. Behavioral activation strategies like regular exercise and social connection can positively impact both mental health and lipid levels.",
    },
    {
      id: "cognitive-factors",
      title: "Cognitive Wellness",
      color: "#0ea5e9",
      content:
        "Your current metabolic picture suggests patterns that could impact cognitive function over time. Optimizing your diet with omega-3 fatty acids, antioxidant-rich foods, and maintaining stable blood sugar can support brain health and cognitive resilience.",
    },
  ],
  functional: [
    {
      id: "metabolic-efficiency",
      title: "Metabolic Efficiency",
      color: "#9333ea",
      content:
        "Your glucose regulation shows early signs of metabolic inefficiency. Consider metabolic support through resistance training, optimizing sleep quality, and time-restricted eating patterns. Supporting mitochondrial function with CoQ10-rich foods may also be beneficial.",
    },
    {
      id: "cardiometabolic",
      title: "Cardiometabolic Assessment",
      color: "#0ea5e9",
      content:
        "Looking at your test results as a whole suggests some cardiometabolic risk. Beyond standard lipid markers, consider more advanced testing like apolipoprotein B, LDL particle number, and inflammatory markers for a more complete risk assessment and personalized intervention planning.",
    },
    {
      id: "systems-biology",
      title: "Systems Biology Approach",
      color: "#f97316",
      content:
        "Your results suggest possible imbalances in several interconnected systems. Optimizing your gut microbiome through fermented foods and fiber diversity may influence both cholesterol metabolism and glucose regulation through the gut-liver axis and overall immune function.",
    },
  ],
};

const colorMap = {
  1: "#3b82f6",
  2: "#e05d44",
  3: "#22c55e",
  4: "#f97316",
  5: "#8b5cf6",
  6: "#6366f1",
  7: "#0ea5e9",
};

const calculateHealthScore = (results: BloodTestResult[]): number => {
  let score = 100;
  results.forEach((result) => {
    if (result.status === "warning") score -= 5;
    if (result.status === "high") score -= 10;
  });
  return Math.max(0, score);
};

const getAbnormalResults = (results: any): any[] => {
  // const abnormalResults = [];
  // results?.data?.resultData?.forEach((data) => {
  //   data?.biomarker?.forEach((r) => {
  //     if (r?.signalText !== "normal") {
  //       abnormalResults?.push(r);
  //     }
  //   });
  // });
  return results?.data?.resultData?.map((data) => {
    return {
      profile: data?.profile,
      biomarker: data?.biomarker?.filter((r) => r?.signalText !== "normal"),
    };
  });
};

interface BloodTestReportProps {
  perspective: string;
  panelAnalysisResponses?: any;
  userPreviousData?: any;
  biomarkerResponses?: any;
}

const BloodTestReport = ({
  perspective = "MODERN_MEDICINE",
  panelAnalysisResponses,
  userPreviousData,
  biomarkerResponses,
}: BloodTestReportProps) => {
  const [activeTab, setActiveTab] = useState("key-findings");
  const [expandedTests, setExpandedTests] = useState<string[]>([]);
  const [expandedTestDetails, setExpandedTestDetails] = useState<string[]>([]);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [comparePerspectives, setComparePerspectives] = useState<string[]>([]);
  const healthScore = calculateHealthScore(bloodTestResults);
  const abnormalResults = getAbnormalResults(userPreviousData);

  const resultsCategories = bloodTestResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, BloodTestResult[]>);

  const toggleTestExpansion = (testId: string) => {
    setExpandedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const toggleTestDetails = (testId: string) => {
    setExpandedTestDetails((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const currentInsights =
    perspectiveInsights[perspective] || perspectiveInsights.conventional;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "high":
        return "#ea384c";
      case "low":
        return "#F97316";
      case "normal":
        return "#22c55e";
      default:
        return "#8E9196";
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "high":
        return "High Risk";
      case "low":
        return "Moderate Risk";
      case "normal":
        return "Normal";
      default:
        return "Unknown";
    }
  };

  const calculatePositionPercentage = (
    value: number,
    min: number,
    max: number
  ) => {
    const range = max - min;
    const adjustedValue = value - min;
    const percentage = (adjustedValue / range) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  // Enhanced range bar renderer function
  const renderEnhancedRangeBar = (result: BloodTestResult) => {
    // Define range boundaries for different health zones
    const lowZoneEnd = result.min; // e.g., 70 for glucose
    const normalZoneEnd = result.max; // e.g., 100 for glucose
    const warningZoneEnd = normalZoneEnd * 1.4; // e.g., 140 for glucose

    // Define display range (50-200 for glucose)
    const displayMin = Math.max(0, lowZoneEnd - 20); // e.g., 50 for glucose
    const displayMax = warningZoneEnd * 1.4; // e.g., ~200 for glucose

    // Calculate position percentage for the current value and range markers
    const valuePosition =
      ((result.value - displayMin) / (displayMax - displayMin)) * 100;
    const lowPosition =
      ((lowZoneEnd - displayMin) / (displayMax - displayMin)) * 100;
    const normalPosition =
      ((normalZoneEnd - displayMin) / (displayMax - displayMin)) * 100;
    const warningPosition =
      ((warningZoneEnd - displayMin) / (displayMax - displayMin)) * 100;

    return (
      <div className="mt-4 mb-6">
        <div className="relative h-16 w-full">
          {/* Gradient background for the range bar */}
          <div className="absolute top-5 h-3 w-full rounded-full overflow-hidden flex">
            {/* Low zone (blue-purple) */}
            <div
              className="h-full"
              style={{
                width: `${lowPosition}%`,
                background: "linear-gradient(90deg, #D3E4FD 0%, #8B5CF6 100%)",
              }}
            ></div>

            {/* Normal zone (green) */}
            <div
              className="h-full"
              style={{
                width: `${normalPosition - lowPosition}%`,
                backgroundColor: "#22c55e",
              }}
            ></div>

            {/* Warning zone (yellow-orange) */}
            <div
              className="h-full"
              style={{
                width: `${warningPosition - normalPosition}%`,
                background: "linear-gradient(90deg, #FEF7CD 0%, #F97316 100%)",
              }}
            ></div>

            {/* Critical zone (orange-red) */}
            <div
              className="h-full"
              style={{
                width: `${100 - warningPosition}%`,
                background: "linear-gradient(90deg, #F97316 0%, #EA384C 100%)",
              }}
            ></div>
          </div>

          {/* Range markers with labels */}
          <div className="absolute top-1 w-full flex text-xs text-gray-500">
            {/* Low marker */}
            <div
              className="absolute"
              style={{ left: `${lowPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-4 w-0.5 bg-gray-400 mx-auto"></div>
              <div className="mt-1">{lowZoneEnd}</div>
            </div>

            {/* Normal marker */}
            <div
              className="absolute"
              style={{
                left: `${normalPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="h-4 w-0.5 bg-gray-400 mx-auto"></div>
              <div className="mt-1">{normalZoneEnd}</div>
            </div>

            {/* Warning marker */}
            <div
              className="absolute"
              style={{
                left: `${warningPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="h-4 w-0.5 bg-gray-400 mx-auto"></div>
              <div className="mt-1">{warningZoneEnd}</div>
            </div>
          </div>

          {/* Current value indicator */}
          <div
            className="absolute top-3"
            style={{
              left: `${valuePosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
              <div className="rounded-full h-6 w-6 bg-white border-2 border-black flex items-center justify-center -mt-1"></div>
              <div className="mt-5 px-2 py-1 rounded-md bg-black text-white font-medium text-sm">
                {result.value} {result.unit}
              </div>
            </div>
          </div>

          {/* Min-max scale labels */}
          <div className="absolute top-9 w-full flex justify-between text-xs text-gray-500">
            <div>{displayMin}</div>
            <div>{displayMax}</div>
          </div>
        </div>

        {/* Range zone labels */}
        <div className="flex justify-between text-xs mt-2">
          <div className="text-purple-500 font-medium">Low</div>
          <div className="text-green-500 font-medium">Normal</div>
          <div className="text-orange-500 font-medium">Moderate Risk</div>
          <div className="text-red-500 font-medium">High Risk</div>
        </div>
      </div>
    );
  };

  // Mini sparkline renderer
  const renderSparkline = (data: number[], color: string) => {
    if (!data || data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="h-12 w-20">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Card className="wellness-card mb-6 bg-[#f8fafc]">
        <CardHeader className="pb-1">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Personal Health Insights</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setShowCompareDialog(true)}
            >
              <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
              Compare Perspectives
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            Based on your test results, we've generated personalized insights to
            help you understand your health status.
          </p>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={perspective}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {Object.entries(panelAnalysisResponses)?.map(
                  ([key, panelData]: [string, any], index: number) => {
                    return (
                      <Card
                        key={key}
                        className="border border-gray-100 overflow-hidden"
                      >
                        <div
                          className="border-l-4 p-6"
                          style={{ borderLeftColor: colorMap[index % 7] }}
                        >
                          <h3
                            className="text-xl font-medium mb-2"
                            style={{ color: colorMap[index % 7] }}
                          >
                            {panelData?.panel}
                          </h3>
                          <p className="text-gray-700">
                            {panelData?.panelSummary}
                          </p>
                        </div>
                      </Card>
                    );
                  }
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      <Card className="wellness-card mb-6">
        <CardHeader className="pb-1">
          <CardTitle className="text-xl">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={perspective}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-4">
                {perspective === "MODERN_MEDICINE" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Schedule a follow-up with your physician
                        </p>
                        <p className="text-gray-600">
                          Discuss your test results and potential treatment
                          options
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Review your diet and lifestyle
                        </p>
                        <p className="text-gray-600">
                          Make adjustments based on your test results
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Schedule your next routine test
                        </p>
                        <p className="text-gray-600">
                          Regular monitoring is key to maintaining health
                        </p>
                      </div>
                    </li>
                  </>
                )}

                {perspective === "naturopathic" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Consult with a naturopathic doctor
                        </p>
                        <p className="text-gray-600">
                          For a comprehensive whole-body approach to your health
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Implement an anti-inflammatory diet
                        </p>
                        <p className="text-gray-600">
                          Focus on whole foods and eliminate common inflammatory
                          triggers
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Consider targeted supplements
                        </p>
                        <p className="text-gray-600">
                          After consulting with a professional about your
                          specific needs
                        </p>
                      </div>
                    </li>
                  </>
                )}

                {perspective === "dietitian" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Track your food intake for one week
                        </p>
                        <p className="text-gray-600">
                          Use a food journal or app to understand your current
                          habits
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Consult with a registered dietitian
                        </p>
                        <p className="text-gray-600">
                          For personalized nutrition recommendations based on
                          your test results
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Gradually implement a heart-healthy eating pattern
                        </p>
                        <p className="text-gray-600">
                          Focus on Mediterranean or DASH diet principles
                        </p>
                      </div>
                    </li>
                  </>
                )}

                {perspective === "tcm" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Visit a licensed TCM practitioner
                        </p>
                        <p className="text-gray-600">
                          For pulse diagnosis and personalized herbal
                          recommendations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Consider acupuncture treatment
                        </p>
                        <p className="text-gray-600">
                          To help balance energy systems and support organ
                          function
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Incorporate gentle Qigong practice
                        </p>
                        <p className="text-gray-600">
                          Daily movement to support qi and blood circulation
                        </p>
                      </div>
                    </li>
                  </>
                )}

                {perspective === "mental-health" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Start a daily stress reduction practice
                        </p>
                        <p className="text-gray-600">
                          Even 10 minutes of meditation or deep breathing can
                          have significant benefits
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Assess your sleep quality
                        </p>
                        <p className="text-gray-600">
                          Optimizing sleep can improve both mental health and
                          metabolic markers
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Consider talking to a mental health professional
                        </p>
                        <p className="text-gray-600">
                          For support with stress management and emotional
                          wellbeing
                        </p>
                      </div>
                    </li>
                  </>
                )}

                {perspective === "functional" && (
                  <>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Pursue further specialized testing
                        </p>
                        <p className="text-gray-600">
                          Consider advanced lipid testing, inflammatory markers,
                          and micronutrient analysis
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Work with a functional medicine practitioner
                        </p>
                        <p className="text-gray-600">
                          For a personalized systems-based approach to
                          optimization
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="text-green-600 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          Implement a 30-day reset protocol
                        </p>
                        <p className="text-gray-600">
                          Focus on anti-inflammatory foods, targeted
                          supplementation, and lifestyle modifications
                        </p>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <Tabs defaultValue="key-findings" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="key-findings">Abnormal Results</TabsTrigger>
          <TabsTrigger value="all-tests">All Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="key-findings" className="mt-4">
          <div className="space-y-4">
            {abnormalResults?.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center rounded-full p-2 bg-green-100 text-green-600 mb-3">
                      <Info className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">All Tests Normal</h3>
                    <p className="text-gray-500 mt-2">
                      Great job! All your test results are within normal ranges.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              abnormalResults?.map((biomarkerData, index) => {
                return (
                  biomarkerData?.biomarker?.length > 0 && (
                    <AllTestsList
                      resultsCategories={biomarkerData}
                      biomarkerResponses={biomarkerResponses}
                    />
                  )
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="all-tests" className="mt-4">
          <div className="space-y-4">
            {userPreviousData?.data?.resultData?.map((biomarkerData) => (
              <Accordion
                key={biomarkerData?.profile?.name}
                type="single"
                collapsible
                className="bg-white rounded-lg border shadow-sm"
              >
                <AccordionItem
                  value={biomarkerData?.profile?.name}
                  className="border-b-0"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {biomarkerData?.profile?.name}
                      </span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {biomarkerData?.biomarker?.length} tests
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Range</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {biomarkerData?.biomarker?.map((result, index) => (
                          <>
                            <TableRow
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() =>
                                toggleTestExpansion(result?.testName)
                              }
                            >
                              <TableCell>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {result?.testName}
                                  </span>
                                  {expandedTests.includes(result?.testName) ? (
                                    <ChevronUp className="ml-1 h-4 w-4 text-gray-400" />
                                  ) : (
                                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">
                                  {result?.testResultValue}{" "}
                                  {result?.testMeasuringUnit}
                                </span>
                              </TableCell>
                              <TableCell>
                                {result?.minParameterValue} -{" "}
                                {result?.maxParameterValue}{" "}
                                {result?.testMeasuringUnit}
                              </TableCell>
                              <TableCell>
                                <div
                                  className="px-2 py-1 rounded-full text-xs font-medium inline-block"
                                  style={{
                                    backgroundColor: `${getStatusColor(
                                      result?.signalText
                                    )}20`,
                                    color: getStatusColor(result?.signalText),
                                  }}
                                >
                                  {getStatusLabel(result?.signalText)}
                                </div>
                              </TableCell>
                            </TableRow>

                            {expandedTests.includes(result?.testName) && (
                              <TableRow className="bg-gray-50">
                                <TableCell colSpan={4} className="p-0">
                                  <div className="p-4">
                                    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
                                      <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-base font-medium text-gray-800">
                                          Where your result falls
                                        </h4>

                                        <div className="flex items-center gap-4">
                                          {renderSparkline(
                                            result?.trendData,
                                            getStatusColor(result?.status)
                                          )}
                                          <div className="flex flex-col">
                                            <div className="text-sm text-gray-500">
                                              Previous
                                            </div>
                                            <div className="flex items-center">
                                              <span className="font-medium mr-2">
                                                {result?.previousValue}{" "}
                                                {result?.unit}
                                              </span>
                                              {result?.changePercentage > 0 ? (
                                                <span className="text-red-500 flex items-center text-sm">
                                                  <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                                                  {result?.changePercentage}%
                                                </span>
                                              ) : (
                                                <span className="text-green-500 flex items-center text-sm">
                                                  <TrendingDown className="h-3.5 w-3.5 mr-0.5" />
                                                  {Math.abs(
                                                    result?.changePercentage ||
                                                      0
                                                  )}
                                                  %
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Enhanced range bar */}
                                      {/* {renderEnhancedRangeBar(result)} */}
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          marginTop: "1.5em",
                                          marginBottom: "2em",
                                        }}
                                      >
                                        <ReportSpectrum
                                          spectrum={
                                            biomarkerResponses?.[
                                              result?.testName
                                            ]?.spectrumRange
                                          }
                                          rangeObj={result?.rangeObj}
                                          max={result?.maxParameterValue}
                                          min={result?.minParameterValue}
                                          testResultValue={
                                            result?.testResultValue
                                          }
                                        />
                                      </div>

                                      <TestResultTrendHistory result={result} />

                                      <div className="text-sm px-4 py-3 rounded-lg bg-gray-50 border border-gray-100">
                                        {result?.signalText === "normal" ? (
                                          <p className="text-green-700">
                                            Your result is within the normal
                                            range.
                                          </p>
                                        ) : result?.signalText === "high" ? (
                                          <p className="text-yellow-700">
                                            Your result is slightly{" "}
                                            {Number(result?.testResultValue) >
                                            Number(result?.maxParameterValue)
                                              ? "above"
                                              : "below"}{" "}
                                            the normal range.
                                          </p>
                                        ) : (
                                          <p className="text-red-700">
                                            Your result is significantly{" "}
                                            {Number(result?.testResultValue) >
                                            Number(result?.maxParameterValue)
                                              ? "above"
                                              : "below"}{" "}
                                            the normal range.
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="grid md:grid-cols-1 gap-4 mb-4">
                                      <div className="bg-blue-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium flex items-center text-blue-700 mb-2">
                                          <Info className="h-4 w-4 mr-1" /> What
                                          is {result?.testName}?
                                        </h4>
                                        <p className="text-sm text-gray-700">
                                          {
                                            biomarkerResponses?.[
                                              result?.testName
                                            ]?.englishLanguageAnalysisData
                                              ?.testInformation
                                          }
                                        </p>
                                      </div>

                                      {/* {result.whatAffects && (
                                        <div className="bg-purple-50 rounded-lg p-4">
                                          <h4 className="text-sm font-medium flex items-center text-purple-700 mb-2">
                                            <Brain className="h-4 w-4 mr-1" />{" "}
                                            What affects {result.name} levels?
                                          </h4>
                                          <p className="text-sm text-gray-700">
                                            {result.whatAffects}
                                          </p>
                                        </div>
                                      )} */}
                                    </div>

                                    <div className="bg-amber-50 rounded-lg p-4 mb-4">
                                      <h4 className="text-sm font-medium flex items-center text-amber-700 mb-2">
                                        <AlertCircle className="h-4 w-4 mr-1" />{" "}
                                        What does your result mean?
                                      </h4>
                                      <p className="text-sm text-gray-700">
                                        {/* {result.whatMeans} */}
                                        {
                                          biomarkerResponses?.[result?.testName]
                                            ?.englishLanguageAnalysisData
                                            ?.insightsRemarks
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BloodTestReport;
