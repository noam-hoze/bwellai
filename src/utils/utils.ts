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
  age = 20,
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
  never: 1.2,
  rarely: 1.3,
  weekly: 1.5,
  daily: 1.7,
  intensDeaily: 1.9,
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

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  if (frequency) {
    multiplier = calorieNumberMultiplier[frequency];
  }

  return bmr * multiplier;
};

const MicronutrientsBalanceMap = {
  ObeseBMI: {
    fat: 2.2, // 2.2
    protein: 50, // 50%
    carbs: 50, // 50%
  },
  aging: {
    fat: 2.2, // 2.2
    protein: 40, // 40%
    carbs: 25, // 25%
  },
  GeneralHealthyAdult: {
    fat: 1.8, // 1.8
    protein: 35, // 35%
    carbs: 35, // 35%
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
      fat: Math.round(MicronutrientsBalanceMap?.ObeseBMI?.fat * weight),
      protein: Math.round(
        (MicronutrientsBalanceMap?.ObeseBMI?.protein * calorie) / 100
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.ObeseBMI?.carbs * calorie) / 100
      ),
    };
  } else if (age >= 60) {
    return {
      fat: Math.round(MicronutrientsBalanceMap?.aging?.fat * weight),
      protein: Math.round(
        (MicronutrientsBalanceMap?.aging?.protein * calorie) / 100
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.aging?.carbs * calorie) / 100
      ),
    };
  } else {
    return {
      fat: Math.round(
        MicronutrientsBalanceMap?.GeneralHealthyAdult?.fat * weight
      ),
      protein: Math.round(
        (MicronutrientsBalanceMap?.GeneralHealthyAdult?.protein * calorie) / 100
      ),
      carbs: Math.round(
        (MicronutrientsBalanceMap?.GeneralHealthyAdult?.carbs * calorie) / 100
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
