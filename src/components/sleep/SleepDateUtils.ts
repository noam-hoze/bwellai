import { format, subDays } from "date-fns";

export const getDateDisplay = (
  selectedDate: Date,
  viewType: "day" | "week" | "month"
): string => {
  if (viewType === "day") {
    return format(selectedDate, "EEEE, MMMM d, yyyy");
  } else if (viewType === "week") {
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() - 6);
    return `${format(endDate, "MMM d")} - ${format(
      selectedDate,
      "MMM d, yyyy"
    )}`;
  } else {
    return format(selectedDate, "MMMM yyyy");
  }
};

export const goToPreviousDate = (
  selectedDate: Date,
  viewType: "day" | "week" | "month"
): Date => {
  if (viewType === "day") {
    return subDays(selectedDate, 1);
  } else if (viewType === "week") {
    return subDays(selectedDate, 7);
  } else {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  }
};

export const goToNextDate = (
  selectedDate: Date,
  viewType: "day" | "week" | "month"
): Date => {
  if (viewType === "day") {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow > new Date() ? new Date() : tomorrow;
  } else if (viewType === "week") {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek > new Date() ? new Date() : nextWeek;
  } else {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth > new Date() ? new Date() : nextMonth;
  }
};

export const isToday = (selectedDate: Date): boolean => {
  return (
    format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );
};
