export const getDateFromMonthYearNumber = (month: number, year: number) => {
  return new Date(year, month, 1);
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getDaysInMonth = (date: Date) => {
  return getLastDayOfMonth(date).getDate();
};

export const getWeekdayOffset = (date: Date) => {
  return date.getUTCDay();
};

export const getMonthName = (date: Date) => {
  return date.toLocaleString("de-DE", { month: "long" });
};

export const isSameDateByDayMonthYear = (date: Date, day: number, month: number, year: number) => {
  return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
};

export const isSameDate = (date1: Date, date2: Date) => {
  return isSameDateByDayMonthYear(date1, date2.getDate(), date2.getMonth(), date2.getFullYear());
};
