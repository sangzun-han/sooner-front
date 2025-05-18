import { createContext } from "react";

export type CalendarMode = "available" | "unavailable";

export interface CalendarConfig {
  mode: CalendarMode;
  value: number[];
  onChange: (next: number[]) => void;
  range: { start: number; end: number };
  disabled?: number[];
}

export const CalendarContext = createContext<CalendarConfig | null>(null);
