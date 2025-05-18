const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarWeekDays() {
  return (
    <div className="mb-1 grid grid-cols-7">
      {WEEKDAYS.map((d, i) => (
        <div key={d} className={`py-2 text-center text-xs font-medium ${i === 0 ? "text-red-500" : ""}`}>
          {d}
        </div>
      ))}
    </div>
  );
}
