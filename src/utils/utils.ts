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
