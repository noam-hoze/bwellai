
import { format, addDays, isEqual, subWeeks, addWeeks, startOfWeek, endOfWeek, subMonths, addMonths, getMonth, getYear, getDaysInMonth, getDate } from "date-fns";

// Generate week days from a start date
export const generateWeekDays = (currentWeekStart: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(currentWeekStart, i);
    days.push(day);
  }
  return days;
};

// Generate month calendar grid
export const generateMonthGrid = (currentMonthDate: Date) => {
  const year = getYear(currentMonthDate);
  const month = getMonth(currentMonthDate);
  const daysInMonth = getDaysInMonth(currentMonthDate);
  
  // Create an array with all days of the month
  const monthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push(new Date(year, month, day));
  }
  
  // Get the first day of the month to determine offset
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay(); // 0-6 (Sunday-Saturday)
  
  // Create calendar grid with empty slots for days before the 1st
  const calendarGrid = [];
  
  // Add empty slots for days before the 1st
  for (let i = 0; i < dayOfWeek; i++) {
    calendarGrid.push(null);
  }
  
  // Add all days of the month
  monthDays.forEach(day => {
    calendarGrid.push(day);
  });
  
  // Fill remaining slots in the last week if needed
  const remainingSlots = (7 - (calendarGrid.length % 7)) % 7;
  for (let i = 0; i < remainingSlots; i++) {
    calendarGrid.push(null);
  }
  
  // Organize days into weeks
  const weeks = [];
  for (let i = 0; i < calendarGrid.length; i += 7) {
    weeks.push(calendarGrid.slice(i, i + 7));
  }
  
  return weeks;
};

// Generate days for the picker
export const generateDayOptions = (duration: number, completedDays: number[], today: number) => {
  const days = [];
  
  for (let i = 1; i <= duration; i++) {
    let status = "future"; 
    if (i === today) status = "today";
    else if (completedDays.includes(i)) status = "completed";
    
    days.push({ day: i, status });
  }
  
  return days;
};

export const formatDateRange = (startDate: Date, endDate: Date) => {
  return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;
};

export const formatWeekRange = (weekNumber: number, startDate: Date, endDate: Date) => {
  return `Week ${weekNumber} • ${format(startDate, "MMM d")} - ${format(endDate, "MMM dd")}`;
};

export const formatMonthYear = (date: Date) => {
  return format(date, "MMMM yyyy");
};
