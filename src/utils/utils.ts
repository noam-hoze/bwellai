export const convertUnderscoresToCapitalizeHeading = (key: string) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export const convertUTCToLocalTime = (utcTime) => {
  if (!utcTime) return null; // Return null instead of an empty string

  // Create a Date object from UTC time
  const date = new Date(utcTime + "Z"); // Ensure UTC interpretation

  // Convert to local time
  return new Date(
    date.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );
};

export function formatDateToShortMonth(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

const ageGroupToSleepMap = {
  "18-25": {
    light: 52.5,
    deep: 22.5,
    rem: 22.5,
  },
  "26-40": {
    light: 55,
    deep: 17.5,
    rem: 22.5,
  },
  "41-60": {
    light: 57.5,
    deep: 15,
    rem: 21,
  },
  "61-80": {
    light: 62.5,
    deep: 12.5,
    rem: 20,
  },
};

export const calculatedSleepPercentage = ({
  totalSleep,
  age,
  actualSleepHr,
  sleepType,
}: {
  totalSleep: number;
  age: number;
  actualSleepHr: number;
  sleepType: "light" | "rem" | "deep";
}) => {
  let ageGroup = "";

  if (age >= 18 && age <= 25) {
    ageGroup = "18-25";
  } else if (age >= 26 && age <= 40) {
    ageGroup = "26-40";
  } else if (age >= 41 && age <= 60) {
    ageGroup = "41-60";
  } else if (age >= 61 && age <= 80) {
    ageGroup = "61-80";
  }

  const calculatedSleepRequired =
    (totalSleep * ageGroupToSleepMap?.[ageGroup]?.[sleepType]) / 100;

  return (actualSleepHr / calculatedSleepRequired) * 100;
};

const calorieNumberMultiplier = {
  sedentary_adult: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9,
};

const calculateBMR = ({ weight, height, age, gender }) => {
  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return bmr;
};

export const calorieNumberDisplayed = ({
  gender,
  weight,
  height,
  age,
  frequency,
}: {
  gender: "male" | "female";
  weight: number;
  height: number;
  age: number;
  frequency?: string;
}) => {
  let bmr = 0;
  let multiplier = 1.5;

  bmr = calculateBMR({ weight, height, age, gender });

  if (frequency && calorieNumberMultiplier[frequency]) {
    multiplier = calorieNumberMultiplier[frequency];
  }

  return bmr * multiplier;
};

export const handleConvertCholesterolValue = (
  prevUnit: string,
  newUnit: string,
  value: number
): number => {
  // if prev value is mg/dl
  if (prevUnit === "mg/dl" && newUnit === "mmol/l") {
    return value / 18;
  }
  if (prevUnit === "mg/dl" && newUnit === "percentile") {
    return value;
  }
  // if prev value is mmol/l
  if (prevUnit === "mmol/l" && newUnit === "mg/dl") {
    return value * 18;
  }
  if (prevUnit === "mmol/l" && newUnit === "percentile") {
    return value;
  }
  // if prev value is percentile
  if (prevUnit === "percentile" && newUnit === "mg/dl") {
    return value;
  }
  if (prevUnit === "percentile" && newUnit === "mmol/l") {
    return value;
  }
  return 0;
};

const MicronutrientsBalanceMap = {
  ObeseBMI: {
    fat: 45, // 45
    protein: 2.2, // 2.2
    carbs: 25, // 50%
  },
  aging: {
    fat: 40, // 40
    protein: 1.9, // 1.9
    carbs: 40, // 40%
  },
  GeneralHealthyAdult: {
    fat: 40, // 40%
    protein: 1.4, // 1.4
    carbs: 45, // 45%
  },
};

export const requiredMicronutrientsBalanceDisplayed = ({
  weight,
  calorie,
  BMI,
  age,
}: {
  weight: number;
  calorie: number;
  BMI: number;
  age: number;
}) => {
  if (BMI >= 30) {
    return {
      protein: Math.round(MicronutrientsBalanceMap?.ObeseBMI?.protein * weight),
      fat: Math.round(
        (MicronutrientsBalanceMap?.ObeseBMI?.fat * calorie) / 100 / 9
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.ObeseBMI?.carbs * calorie) / 100 / 4
      ),
    };
  } else if (age >= 60) {
    return {
      protein: Math.round(MicronutrientsBalanceMap?.aging?.protein * weight),
      fat: Math.round(
        (MicronutrientsBalanceMap?.aging?.fat * calorie) / 100 / 9
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.aging?.carbs * calorie) / 100 / 4
      ),
    };
  } else {
    return {
      protein: Math.round(
        MicronutrientsBalanceMap?.GeneralHealthyAdult?.protein * weight
      ),
      fat: Math.round(
        (MicronutrientsBalanceMap?.GeneralHealthyAdult?.fat * calorie) / 100 / 9
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.GeneralHealthyAdult?.carbs * calorie) /
          100 /
          4
      ),
    };
  }
};

export function convertSecondsToHHMM(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export const handleCopyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const getNextGoalValue = ({
  current,
  skipValue,
}: {
  current: number;
  skipValue: number;
}) => {
  return (Math.floor(current / skipValue) + 1) * skipValue;
};

export const getPreviousDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo); // Subtract the given days

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day

  return `${year}-${month}-${day}`;
};

export const getFormattedDateYMD = (date = new Date()) => {
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0"); // Ensure 2-digit month
  const day = String(date?.getDate())?.padStart(2, "0"); // Ensure 2-digit day

  return `${year}-${month}-${day}`;
};

export const convertHeightValueUnits = (
  prevUnit: string,
  newUnit: string,
  value: number
): number => {
  const newValue = 0;
  if (prevUnit === "cm" && newUnit === "ft") {
    const totalFeet = value * 0.0328084; // Convert cm to feet
    const feet = Math.floor(totalFeet) || 0; // Get the integer part as feet
    const inches = Math.round((totalFeet - feet) * 12) || 0; // Convert fractional feet to inches

    return Number(`${feet}.${inches}`);
  }
  if (prevUnit === "cm" && newUnit === "inch") {
    return Number((value / 2.54)?.toFixed(2));
  }
  if (prevUnit === "ft" && newUnit === "cm") {
    const feetValue = String(value)?.split?.(".")?.[0] || 0;
    const inchValue = String(value)?.split?.(".")?.[1] || 0;

    const feetToCm = Number(feetValue) * 30.48;
    const inchesToCm = Number(inchValue) * 2.54;
    const totalCMValue = feetToCm + inchesToCm;

    return Number(totalCMValue?.toFixed(2));
  }
  if (prevUnit === "ft" && newUnit === "inch") {
    return Number((value * 12)?.toFixed(2));
  }
  if (prevUnit === "inch" && newUnit === "ft") {
    return Number((value / 12)?.toFixed(2));
  }
  if (prevUnit === "inch" && newUnit === "cm") {
    return Number((value * 2.54)?.toFixed(2));
  }
  return newValue;
};

export const convertWeightValueUnits = (
  prevUnit: string,
  newUnit: string,
  value: number
): number => {
  let newValue = 0;
  // kg to lb
  if (prevUnit === "kg" && newUnit === "lb") {
    newValue = Number((Number(value) * 2.20462)?.toFixed(2));
  }
  // kg to st lb
  if (prevUnit === "kg" && newUnit === "st lb") {
    newValue = Number((Number(value) * 0.157473)?.toFixed(2));
  }
  // lg to kg
  if (prevUnit === "lb" && newUnit === "kg") {
    newValue = Number((Number(value) / 2.20462)?.toFixed(2));
  }
  // lb to st lb
  if (prevUnit === "lb" && newUnit === "st lb") {
    newValue = Number((Number(value) * 0.0714286)?.toFixed(2));
  }
  // st lb to lb
  if (prevUnit === "st lb" && newUnit === "lb") {
    newValue = Number((Number(value) / 0.0714286)?.toFixed(2));
  }
  // st lb to kg
  if (prevUnit === "st lb" && newUnit === "kg") {
    newValue = Number((Number(value) * 6.35)?.toFixed(2));
  }

  return newValue;
};

export const getReportSignalTextCalc = ({
  testResultValue,
  minParameterValue,
  maxParameterValue,
}: {
  testResultValue: number | string;
  minParameterValue: number | string;
  maxParameterValue: number | string;
}): "low" | "normal" | "high" => {
  const nt = Number(testResultValue);
  const nMin = Number(minParameterValue);
  const nMax = Number(maxParameterValue);

  if (nt >= nMin && nt <= nMax) {
    return "normal";
  } else if (nt > nMax) {
    return "high";
  } else {
    return "low";
  }
};

function min(x, y) {
  return x < y ? x : y;
}

export function calcAngle({ h, m }: { h: number; m: number }): number {
  // validate the input
  if (h < 0 || m < 0 || h > 12 || m > 60) document.write("Wrong input");

  if (h == 12) h = 0;
  if (m == 60) {
    m = 0;
    h += 1;
    if (h > 12) h = h - 12;
  }

  // Calculate the angles moved
  // by hour and minute hands
  // with reference to 12:00
  const hour_angle = 0.5 * (h * 60 + m);
  const minute_angle = 6 * m;

  // Find the difference between two angles
  let angle = Math.abs(hour_angle - minute_angle);

  // Return the smaller angle of two possible angles
  angle = min(360 - angle, angle);

  console.log({ h, m, angle });

  return angle;
}
