
import { BloodTestResult, PerspectiveInsight, generateTrendDataDates } from "../types/bloodTest.types";

export const bloodTestResults: BloodTestResult[] = [{
  id: "glucose",
  name: "Glucose",
  value: 118,
  unit: "mg/dL",
  min: 70,
  max: 100,
  status: "warning",
  category: "Blood Sugar",
  description: "Measures blood sugar levels, important for energy and metabolism",
  whatIs: "Glucose is the primary sugar found in your blood and is your body's main source of energy. This test measures the amount of glucose in your blood at the time of the test.",
  whatAffects: "Diet (especially carbohydrate intake), physical activity, stress, medications, hormones (insulin, glucagon), time since your last meal, and certain medical conditions can all affect glucose levels.",
  whatMeans: "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
  previousValue: 105,
  changePercentage: 12,
  trendData: [98, 102, 105, 110, 112, 118],
  trendDates: generateTrendDataDates([98, 102, 105, 110, 112, 118])
}, {
  id: "a1c",
  name: "HbA1c",
  value: 5.9,
  unit: "%",
  min: 4.0,
  max: 5.7,
  status: "warning",
  category: "Blood Sugar",
  description: "Shows average blood sugar over the past 3 months",
  whatIs: "HbA1c (glycated hemoglobin) measures the average blood sugar level over the past 2-3 months. It shows what percentage of your hemoglobin proteins have glucose attached to them.",
  whatAffects: "Long-term dietary habits, physical activity patterns, medication adherence, and underlying health conditions can affect HbA1c levels. Unlike glucose tests, it's not significantly affected by recent meals.",
  whatMeans: "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
  previousValue: 5.5,
  changePercentage: 7,
  trendData: [5.2, 5.3, 5.4, 5.5, 5.7, 5.9],
  trendDates: generateTrendDataDates([5.2, 5.3, 5.4, 5.5, 5.7, 5.9])
}, {
  id: "cholesterol",
  name: "Total Cholesterol",
  value: 210,
  unit: "mg/dL",
  min: 125,
  max: 200,
  status: "warning",
  category: "Lipids",
  description: "Measures overall cholesterol levels in your blood",
  whatIs: "Total cholesterol is the sum of all cholesterol types in your blood, including LDL, HDL, and other lipid components. It's a waxy substance your body needs to build cells and make vitamins and hormones.",
  whatAffects: "Diet (saturated and trans fats), weight, physical activity, age, genetics, other health conditions like diabetes or thyroid disorders, and certain medications can all influence cholesterol levels.",
  whatMeans: "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
  previousValue: 195,
  changePercentage: 8,
  trendData: [180, 185, 190, 195, 205, 210],
  trendDates: generateTrendDataDates([180, 185, 190, 195, 205, 210])
}, {
  id: "ldl",
  name: "LDL Cholesterol",
  value: 131,
  unit: "mg/dL",
  min: 0,
  max: 100,
  status: "critical",
  category: "Lipids",
  description: "The 'bad' cholesterol that can build up in arteries",
  whatIs: "LDL (Low-Density Lipoprotein) cholesterol is often called 'bad' cholesterol because high levels can lead to plaque buildup in your arteries, increasing the risk of heart disease and stroke.",
  whatAffects: "Diet high in saturated and trans fats, obesity, lack of physical activity, smoking, age, genetics, and certain medical conditions can increase LDL levels.",
  whatMeans: "This may indicate increased risk for cardiovascular disease. Consider discussing dietary changes and exercise with your healthcare provider.",
  previousValue: 120,
  changePercentage: 9,
  trendData: [105, 110, 115, 120, 125, 131],
  trendDates: generateTrendDataDates([105, 110, 115, 120, 125, 131])
}, {
  id: "hdl",
  name: "HDL Cholesterol",
  value: 52,
  unit: "mg/dL",
  min: 40,
  max: 60,
  status: "normal",
  category: "Lipids",
  description: "The 'good' cholesterol that helps remove other cholesterol",
  whatIs: "HDL (High-Density Lipoprotein) cholesterol is often called 'good' cholesterol because it helps remove other forms of cholesterol from your bloodstream, potentially lowering your risk of heart disease.",
  whatAffects: "Regular physical activity, maintaining a healthy weight, not smoking, and consuming healthy fats can increase HDL levels. Genetic factors also play a significant role.",
  whatMeans: "Your HDL level is within the healthy range, which helps protect against heart disease by removing excess cholesterol from your bloodstream.",
  previousValue: 50,
  changePercentage: 4,
  trendData: [45, 47, 48, 50, 51, 52],
  trendDates: generateTrendDataDates([45, 47, 48, 50, 51, 52])
}, {
  id: "triglycerides",
  name: "Triglycerides",
  value: 142,
  unit: "mg/dL",
  min: 0,
  max: 150,
  status: "normal",
  category: "Lipids",
  description: "Fat in your blood that can increase heart disease risk",
  whatIs: "Triglycerides are a type of fat (lipid) found in your blood. When you eat, your body converts any calories it doesn't need to use right away into triglycerides, which are stored in your fat cells.",
  whatAffects: "Diet (especially simple carbohydrates and alcohol), obesity, physical inactivity, smoking, certain medications, and medical conditions like diabetes or kidney disease can all affect triglyceride levels.",
  whatMeans: "Your triglyceride level is within the normal range, which is good for your cardiovascular health.",
  previousValue: 145,
  changePercentage: -2,
  trendData: [155, 150, 148, 145, 143, 142],
  trendDates: generateTrendDataDates([155, 150, 148, 145, 143, 142])
}, {
  id: "sodium",
  name: "Sodium",
  value: 139,
  unit: "mmol/L",
  min: 135,
  max: 145,
  status: "normal",
  category: "Electrolytes",
  description: "Important for nerve and muscle function",
  whatIs: "Sodium is an electrolyte that helps regulate the amount of water in and around your cells and is needed for proper nerve and muscle function, including your heart.",
  whatAffects: "Dietary salt intake, sweating, vomiting, diarrhea, kidney function, certain medications (especially diuretics), and medical conditions that affect fluid balance can all influence sodium levels.",
  whatMeans: "Your sodium level is within the normal range, indicating good electrolyte balance.",
  previousValue: 138,
  changePercentage: 1,
  trendData: [137, 137, 138, 138, 139, 139],
  trendDates: generateTrendDataDates([137, 137, 138, 138, 139, 139])
}, {
  id: "potassium",
  name: "Potassium",
  value: 4.1,
  unit: "mmol/L",
  min: 3.5,
  max: 5.0,
  status: "normal",
  category: "Electrolytes",
  description: "Critical for heart and muscle function",
  whatIs: "Potassium is a crucial electrolyte that helps your nerves function and muscles contract. It helps regulate your heartbeat and is important for moving nutrients into cells and waste products out of cells.",
  whatAffects: "Diet (especially fruits and vegetables), kidney function, certain medications (diuretics, ACE inhibitors), vomiting, diarrhea, and hormonal factors can all affect potassium levels.",
  whatMeans: "Your potassium level is within the normal range, which is important for proper heart and muscle function.",
  previousValue: 4.0,
  changePercentage: 2,
  trendData: [3.9, 3.9, 4.0, 4.0, 4.1, 4.1],
  trendDates: generateTrendDataDates([3.9, 3.9, 4.0, 4.0, 4.1, 4.1])
}, {
  id: "creatinine",
  name: "Creatinine",
  value: 0.9,
  unit: "mg/dL",
  min: 0.6,
  max: 1.2,
  status: "normal",
  category: "Kidney Function",
  description: "Shows how well your kidneys are filtering waste",
  whatIs: "Creatinine is a waste product produced by your muscles from the breakdown of a compound called creatine. Your kidneys filter creatinine from your blood, so levels in the blood show how well your kidneys are working.",
  whatAffects: "Muscle mass (more muscle typically means higher creatinine levels), intense exercise, certain medications, diet (especially meat consumption), hydration status, and of course, kidney function all affect creatinine levels.",
  whatMeans: "Your creatinine level is within the normal range, suggesting your kidneys are functioning properly.",
  previousValue: 0.85,
  changePercentage: 6,
  trendData: [0.8, 0.82, 0.85, 0.85, 0.88, 0.9],
  trendDates: generateTrendDataDates([0.8, 0.82, 0.85, 0.85, 0.88, 0.9])
}, {
  id: "alt",
  name: "ALT",
  value: 33,
  unit: "U/L",
  min: 0,
  max: 40,
  status: "normal",
  category: "Liver Function",
  description: "Enzyme that indicates liver health",
  whatIs: "ALT (Alanine Aminotransferase) is an enzyme primarily found in liver cells. When liver cells are damaged, ALT is released into the bloodstream. This test measures the amount of ALT in your blood to assess liver health.",
  whatAffects: "Liver disease, excessive alcohol consumption, certain medications, obesity, viral infections (like hepatitis), and intense exercise can all cause elevated ALT levels.",
  whatMeans: "Your ALT level is within the normal range, suggesting your liver is functioning properly.",
  previousValue: 30,
  changePercentage: 10,
  trendData: [25, 27, 28, 30, 32, 33],
  trendDates: generateTrendDataDates([25, 27, 28, 30, 32, 33])
}];

export const perspectiveInsights: Record<string, PerspectiveInsight[]> = {
  conventional: [{
    id: "electrolyte",
    title: "Electrolyte Profile",
    color: "#3b82f6",
    content: "Your blood test results show slightly low sodium and slightly high potassium levels. This could indicate a mild electrolyte imbalance. You might want to consider increasing your sodium intake through diet and hydration, perhaps consulting with a nutritionist for tailored guidance."
  }, {
    id: "cholesterol",
    title: "Cholesterol Management",
    color: "#e05d44",
    content: "Your LDL cholesterol is above the recommended range. Consider dietary changes like reducing saturated fats and increasing soluble fiber, along with regular physical activity. Discuss with your healthcare provider about potential treatment options if lifestyle changes aren't sufficient."
  }, {
    id: "kidney",
    title: "Kidney Function",
    color: "#22c55e",
    content: "Your kidney function tests (creatinine) are within normal ranges, indicating healthy kidney function. Continue to stay well-hydrated and maintain a balanced diet to support continued kidney health."
  }],
  naturopathic: [{
    id: "inflammation",
    title: "Inflammatory Markers",
    color: "#f97316",
    content: "Your lipid panel suggests mild systemic inflammation. Consider adding anti-inflammatory foods like turmeric, ginger, and omega-3 rich foods. Reducing processed foods and environmental toxins may also help reduce inflammatory burden on your system."
  }, {
    id: "hormonal",
    title: "Blood Sugar Regulation",
    color: "#8b5cf6",
    content: "Your glucose and HbA1c suggest your body might be experiencing insulin resistance. Consider a whole-foods based diet with complex carbohydrates and chromium-rich foods like broccoli and grapes. Intermittent fasting may also help improve insulin sensitivity."
  }, {
    id: "detox",
    title: "Detoxification Support",
    color: "#22c55e",
    content: "Your liver enzymes are within range but at the higher end of normal. Supporting your body's natural detoxification with cruciferous vegetables, adequate hydration, and herbs like milk thistle and dandelion may help optimize liver function."
  }],
  dietitian: [{
    id: "macronutrients",
    title: "Macronutrient Balance",
    color: "#0ea5e9",
    content: "Your cholesterol profile suggests a need for dietary adjustment. Consider increasing your soluble fiber intake through foods like oats, beans, and flaxseed. Replacing saturated fats with monounsaturated fats from olive oil, avocados, and nuts may also improve your lipid profile."
  }, {
    id: "micronutrients",
    title: "Micronutrient Status",
    color: "#f97316",
    content: "Based on your electrolyte panel, you may benefit from increasing potassium-rich foods like bananas, sweet potatoes, and spinach. Consider tracking your sodium intake, aiming for no more than 2,300mg daily from natural food sources rather than processed foods."
  }, {
    id: "mealplanning",
    title: "Meal Planning Strategy",
    color: "#22c55e",
    content: "To support healthy glucose levels, focus on balanced meals with protein, healthy fats, and complex carbohydrates. Consider the plate method: ½ plate non-starchy vegetables, ¼ plate lean protein, and ¼ plate complex carbohydrates with a small amount of healthy fat."
  }],
  tcm: [{
    id: "qi-energy",
    title: "Qi Energy Balance",
    color: "#6366f1",
    content: "Your test results indicate a pattern of Liver Qi stagnation with some Blood deficiency, common in modern stress-filled lifestyles. Consider gentle movement practices like Tai Chi or Qigong to promote smooth Qi flow, along with warming foods and herbs that support Blood nourishment."
  }, {
    id: "yin-yang",
    title: "Yin-Yang Harmony",
    color: "#0ea5e9",
    content: "There are signs of a mild Yin deficiency with some Heat signs, particularly affecting your Heart and Kidney systems. Cooling foods like cucumber, watermelon, and chrysanthemum tea may help balance this pattern, along with adequate rest and stress reduction techniques."
  }, {
    id: "five-elements",
    title: "Five Element Insights",
    color: "#f97316",
    content: "From a Five Element perspective, your Wood element (Liver) may be overacting on Earth (Spleen), affecting your digestive function and Blood production. Focusing on regular meals with warm, cooked foods may strengthen your Spleen energy and improve overall energy balance."
  }],
  "mental-health": [{
    id: "stress-impact",
    title: "Stress Physiology",
    color: "#ec4899",
    content: "Your slightly elevated glucose levels may reflect ongoing stress activation. Chronic stress triggers cortisol release, which raises blood sugar. Consider incorporating regular stress-reduction practices like mindfulness meditation, deep breathing exercises, or progressive muscle relaxation."
  }, {
    id: "mood-connection",
    title: "Mood-Body Connection",
    color: "#8b5cf6",
    content: "The cholesterol imbalance shown in your results can both affect and be affected by mood states. Research shows bidirectional relationships between lipid profiles and mood disorders. Behavioral activation strategies like regular exercise and social connection can positively impact both mental health and lipid levels."
  }, {
    id: "cognitive-factors",
    title: "Cognitive Wellness",
    color: "#0ea5e9",
    content: "Your current metabolic picture suggests patterns that could impact cognitive function over time. Optimizing your diet with omega-3 fatty acids, antioxidant-rich foods, and maintaining stable blood sugar can support brain health and cognitive resilience."
  }],
  functional: [{
    id: "metabolic-efficiency",
    title: "Metabolic Efficiency",
    color: "#9333ea",
    content: "Your glucose regulation shows early signs of metabolic inefficiency. Consider metabolic support through resistance training, optimizing sleep quality, and time-restricted eating patterns. Supporting mitochondrial function with CoQ10-rich foods may also be beneficial."
  }, {
    id: "cardiometabolic",
    title: "Cardiometabolic Assessment",
    color: "#0ea5e9",
    content: "Looking at your test results as a whole suggests some cardiometabolic risk. Beyond standard lipid markers, consider more advanced testing like apolipoprotein B, LDL particle number, and inflammatory markers for a more complete risk assessment and personalized intervention planning."
  }, {
    id: "systems-biology",
    title: "Systems Biology Approach",
    color: "#f97316",
    content: "Your results suggest possible imbalances in several interconnected systems. Optimizing your gut microbiome through fermented foods and fiber diversity may influence both cholesterol metabolism and glucose regulation through the gut-liver axis and overall immune function."
  }]
};
