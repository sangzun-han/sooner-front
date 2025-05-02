const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarWeekdays() {
  return (
    <div className="grid grid-cols-7 mb-1">
      {dayNames.map((day, i) => (
        <div key={day} className={`text-center text-xs font-medium py-2 ${i === 0 ? "text-red-500" : ""}`}>
          {day}
        </div>
      ))}
    </div>
  );
}
