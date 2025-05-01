export const profileNameToBodyPartObject = {
  Vitamin: "Skin",
  Hormones: "Nervous System & Brain",
  "Inflammation Panel": "Nervous System & Brain",
  "Thyroid Profile": "Thyroid & Adrenal Glands",
  // "Hormones": "Thyroid & Adrenal Glands",
  "Bacterial Infections Panel": "Lungs",
  "Cardiac panel": "Heart & Cardiovascular System",
  "Lipid Profile": "Heart & Cardiovascular System",
  "Liver Profile": "Liver",
  "Kidney Profile": "Kidneys",
  "Electrolyte Profile": "Kidneys",
  // "Vitamin": "Digestive System",
  "Pancreatic panel": "Digestive System",
  Urinalysis: "Bladder & Urinary System",
  "STD Profile": "Reproductive Organs",
  "Fertility Panel": "Reproductive Organs",
};

export const profileNameToProfileArrayObject = {
  Vitamin: ["Vitamin"],
  Hormones: ["Hormones", "Inflammation Panel"],
  "Inflammation Panel": ["Hormones", "Inflammation Panel"],
  "Thyroid Profile": ["Thyroid Profile", "Hormones"],
  // "Hormones": "Thyroid & Adrenal Glands",
  "Bacterial Infections Panel": ["Bacterial Infections Panel"],
  "Cardiac panel": ["Cardiac panel", "Lipid Profile"],
  "Lipid Profile": ["Cardiac panel", "Lipid Profile"],
  "Liver Profile": ["Liver Profile"],
  "Kidney Profile": ["Kidney Profile", "Electrolyte Profile"],
  "Electrolyte Profile": ["Kidney Profile", "Electrolyte Profile"],
  // "Vitamin": "Digestive System",
  "Pancreatic panel": ["Vitamin", "Pancreatic panel"],
  Urinalysis: ["Urinalysis"],
  "STD Profile": ["STD Profile", "Fertility Panel"],
  "Fertility Panel": ["STD Profile", "Fertility Panel"],
};

export const bodyPartToProfileNamesObject = {
  Skin: ["Vitamin"],
  "Nervous System & Brain": ["Hormones", "Inflammation Panel"],
  "Thyroid & Adrenal Glands": ["Thyroid Profile", "Hormones"],
  Lungs: ["Bacterial Infections Panel"],
  "Heart & Cardiovascular System": ["Cardiac panel", "Lipid Profile"],
  Liver: ["Liver Profile"],
  Kidneys: ["Kidney Profile", "Electrolyte Profile"],
  "Digestive System": ["Vitamin", "Pancreatic panel"],
  "Bladder & Urinary System": ["Urinalysis"],
  "Reproductive Organs": ["STD Profile", "Fertility Panel"],
};

export const healthMetrics = {
  Skin: [
    {
      metric: "Vitamin D levels",
      source: "Blood test (Vitamin D panel)",
      noDataMessage:
        "No vitamin D data available. [Upload lab results] for vitamin levels.",
      format: "45 ng/mL (Normal: 30-50)",
      icon: "💧",
    },
    {
      metric: "Skin hydration",
      source: "Wearable device",
      noDataMessage:
        "No skin hydration data available. [Connect wearable device] to monitor hydration.",
      format: "65% (Good)",
      icon: "💦",
    },
    {
      metric: "UV exposure",
      source: "Wearable device (e.g., Garmin)",
      noDataMessage:
        "No UV exposure data available. [Connect wearable device] to track UV exposure.",
      format: "Moderate (3.2 index)",
      icon: "☀️",
    },
    {
      metric: "Temperature regulation",
      source: "Wearable device",
      noDataMessage:
        "No temperature data available. [Connect wearable device] for temperature monitoring.",
      format: "Normal",
      icon: "🌡️",
    },
  ],
  "Thyroid & Adrenal": [
    {
      metric: "TSH",
      source: "Blood test (Thyroid panel)",
      noDataMessage:
        "No thyroid data available. [Schedule thyroid panel] to check TSH levels.",
      format: "2.1 mIU/L (Normal: 0.4-4.0)",
      icon: "🦋",
    },
    {
      metric: "T3, T4",
      source: "Blood test (Thyroid panel)",
      noDataMessage:
        "No thyroid hormone data available. [Schedule thyroid panel] to check T3, T4 levels.",
      format: "Within normal range",
      icon: "📊",
    },
    {
      metric: "Stress levels",
      source: "Wearable device (HRV monitoring)",
      noDataMessage:
        "No stress data available. [Connect wearable] to track stress levels.",
      format: "Low (monitored via HRV)",
      icon: "😌",
    },
    {
      metric: "Metabolic rate",
      source: "Wearable device",
      noDataMessage:
        "No metabolic data available. [Connect wearable device] to monitor calorie expenditure.",
      format: "1,620 calories/day",
      icon: "🔥",
    },
  ],
  Liver: [
    {
      metric: "ALT (SGPT)",
      source: "Blood test (Liver function panel)",
      noDataMessage:
        "No liver enzyme data available. [Upload lab results] for liver function tests.",
      format: "22 U/L (Normal: <35)",
      icon: "🧪",
    },
    {
      metric: "AST (SGOT)",
      source: "Blood test (Liver function panel)",
      noDataMessage:
        "No liver enzyme data available. [Upload lab results] for liver function tests.",
      format: "18 U/L (Normal: <35)",
      icon: "🧪",
    },
    {
      metric: "Bilirubin, Direct",
      source: "Blood test (Liver function panel)",
      noDataMessage:
        "No bilirubin data available. [Upload lab results] for liver function tests.",
      format: "0.8 mg/dL (Normal: 0.1-1.2)",
      icon: "🧫",
    },
    {
      metric: "Hydration status",
      source: "Wearable device",
      noDataMessage:
        "No hydration data available. [Connect wearable device] to track fluid balance.",
      format: "Optimal",
      icon: "💧",
    },
  ],
  Lungs: [
    {
      metric: "Oxygen saturation",
      source: "Pulse oximeter / Wearable device",
      noDataMessage:
        "No oxygen saturation data available. [Connect pulse oximeter] to monitor oxygen levels.",
      format: "98% (Excellent)",
      icon: "💧",
    },
    {
      metric: "Respiratory rate",
      source: "Wearable device",
      noDataMessage:
        "No respiratory rate data available. [Connect wearable device] to track breathing patterns.",
      format: "14 breaths/min (Normal)",
      icon: "📈",
    },
    {
      metric: "Breathing pattern",
      source: "Wearable device",
      noDataMessage:
        "No breathing pattern data available. [Connect wearable device] for respiratory tracking.",
      format: "Deep (Normal)",
      icon: "💨",
    },
    {
      metric: "Environmental exposure",
      source: "Air quality tracker / App integration",
      noDataMessage:
        "No air quality data available. [Track air quality] in your environment.",
      format: "Low risk",
      icon: "🌬️",
    },
  ],
  Reproductive: [
    {
      metric: "Hormone levels",
      source: "Blood test (Hormone panel)",
      noDataMessage:
        "No hormone data available. [Upload hormone panel] for detailed insights.",
      format: "Within normal range",
      icon: "🧪",
    },
    {
      metric: "Menstrual cycle",
      source: "Cycle tracker app integration",
      noDataMessage:
        "No cycle data available. [Connect cycle tracker] for fertility predictions.",
      format: "Regular, 28-day cycle",
      icon: "📅",
    },
    {
      metric: "Fertility window",
      source: "Cycle tracker app integration",
      noDataMessage:
        "No fertility data available. [Connect cycle tracker] for fertility predictions.",
      format: "5 days from now",
      icon: "🌱",
    },
    {
      metric: "Sexual health markers",
      source: "Blood test / App-reported data",
      noDataMessage:
        "No sexual health data available. [Schedule wellness exam] for screening.",
      format: "Normal",
      icon: "✅",
    },
  ],
  "Heart & Cardiovascular System": [
    {
      metric: "Resting heart rate",
      source: "Wearable device (e.g., Garmin)",
      noDataMessage:
        "No heart rate data available. [Connect heart monitor] for continuous tracking.",
      format: "68 bpm (Good)",
      icon: "❤️",
    },
    {
      metric: "Blood pressure",
      source: "Face scan / Blood pressure monitor",
      noDataMessage:
        "No blood pressure data available. [Connect blood pressure monitor] or [Schedule face scan].",
      format: "118/76 mmHg (Normal)",
      icon: "📊",
    },
    {
      metric: "Cholesterol",
      source: "Blood test (Lipid panel)",
      noDataMessage:
        "No cholesterol data available. [Upload lipid panel results] for cholesterol levels.",
      format: "LDL 110, HDL 55 (Healthy ratio)",
      icon: "🧪",
    },
    {
      metric: "HRV (Heart Rate Variability)",
      source: "Wearable device",
      noDataMessage:
        "No HRV data available. [Connect heart monitor] for recovery tracking.",
      format: "45ms (Good recovery state)",
      icon: "📈",
    },
  ],
  "Nervous System & Brain": [
    {
      metric: "Sleep quality",
      source: "Wearable device / Sleep tracker",
      noDataMessage:
        "No sleep data available. [Connect sleep tracker] to monitor sleep quality.",
      format: "7.5 hrs/night (Good)",
      icon: "😴",
    },
    {
      metric: "Cognitive performance",
      source: "Cognitive assessment in app",
      noDataMessage:
        "No cognitive data available. [Take cognitive assessment] for brain health.",
      format: "Above average",
      icon: "🧠",
    },
    {
      metric: "Stress level",
      source: "Wearable device (HRV-based)",
      noDataMessage:
        "No stress data available. [Connect wearable device] to monitor stress levels.",
      format: "Low (22/100)",
      icon: "😌",
    },
    {
      metric: "Reaction time",
      source: "In-app assessment",
      noDataMessage:
        "No reaction time data available. [Take reaction test] for neurological assessment.",
      format: "250ms (Normal)",
      icon: "⚡",
    },
  ],
  Kidneys: [
    {
      metric: "Creatinine",
      source: "Blood test (Metabolic/Kidney panel)",
      noDataMessage:
        "No kidney function data available. [Upload metabolic panel] for kidney markers.",
      format: "0.9 mg/dL (Normal)",
      icon: "🧪",
    },
    {
      metric: "BUN",
      source: "Blood test (Metabolic/Kidney panel)",
      noDataMessage:
        "No kidney function data available. [Upload metabolic panel] for kidney markers.",
      format: "15 mg/dL (Normal)",
      icon: "🧪",
    },
    {
      metric: "Electrolytes",
      source: "Blood test (Electrolyte panel)",
      noDataMessage:
        "No electrolyte data available. [Upload electrolyte panel] for mineral balance.",
      format: "Within normal ranges",
      icon: "⚡",
    },
    {
      metric: "Hydration",
      source: "Wearable device / Hydration tracker",
      noDataMessage:
        "No hydration data available. [Connect hydration tracker] to monitor fluid balance.",
      format: "98% optimal fluid balance",
      icon: "💧",
    },
  ],
};

export const healthMetricsArray = {
  Skin: {
    metric: [
      "Vitamin D levels",
      "Skin hydration",
      "UV exposure",
      "Temperature regulation",
    ],
  },
  "Thyroid & Adrenal": {
    metric: ["TSH", "T3, T4", "Stress levels", "Metabolic rate"],
  },
  Liver: {
    metric: [
      "ALT",
      "ALP",
      "Normal ALT Range",
      "Normal AST Range",
      "AST",
      "Normal Bilirubin Range",
      "Bilirubin Range",
      "Hydration status",
    ],
  },
  Lungs: {
    metric: [
      "Oxygen saturation (SpO2)",
      "Resting respiratory rate",
      "Breathing pattern",
      "Environmental exposure",
    ],
  },
  Reproductive: {
    metric: [
      "Hormone levels",
      "Menstrual cycle",
      "Fertility window",
      "Sexual health markers",
    ],
  },
  "Heart & Cardiovascular": {
    metric: [
      "Resting heart rate",
      "Blood pressure",
      "Cholesterol (LDL, HDL)",
      "HRV (Heart Rate Variability)",
    ],
  },
  "Nervous System & Brain": {
    metric: [
      "Sleep quality",
      "Cognitive performance",
      "Stress level",
      "Reaction time",
    ],
  },
  Kidneys: {
    metric: [
      "Creatinine",
      "BUN",
      "Electrolyte balance",
      "Hydration",
      "Filtration rate",
    ],
  },
};
