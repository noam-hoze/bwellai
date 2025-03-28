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
