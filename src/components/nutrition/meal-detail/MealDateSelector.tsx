
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays } from "date-fns";

interface MealDateSelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const MealDateSelector = ({ selectedDate, onDateSelect }: MealDateSelectorProps) => {
  const dates = [
    { value: "today", label: `Today (${format(new Date(), 'MMM d')})` },
    { value: "yesterday", label: `Yesterday (${format(subDays(new Date(), 1), 'MMM d')})` },
    ...Array.from({ length: 3 }).map((_, i) => {
      const date = subDays(new Date(), i + 2);
      return {
        value: format(date, 'yyyy-MM-dd'),
        label: `${format(date, 'EEEE (MMM d)')}`,
      };
    }),
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Log this meal for:</h3>
      <Select defaultValue={selectedDate} onValueChange={onDateSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select date" />
        </SelectTrigger>
        <SelectContent>
          {dates.map((date) => (
            <SelectItem key={date.value} value={date.value}>
              {date.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Pick from calendar...</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MealDateSelector;
