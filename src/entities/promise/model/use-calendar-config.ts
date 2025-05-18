import { useContext } from "react";
import { CalendarContext } from "./calendar-context";

export const useCalendarConfig = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendarConfig Provider");
  return context;
};
