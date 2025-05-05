export const getDaysInMonth = (currentMonth: Date): (Date | null)[] => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startPadding = Array(firstDay.getDay()).fill(null);
  const daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => new Date(year, month, i + 1));
  return [...startPadding, ...daysInMonth];
};
