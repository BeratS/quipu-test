export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const HOURLY_SLOTS = Array.from({ length: 24 }, (_, hour) => {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 0 : hour % 12 || 12;

  return `${displayHour} ${period}`;
});

export const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export const prevDate = (date?: Date | null) => {
  const newDate = date ? new Date(date) : new Date();
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}

export const nextDate = (date?: Date | null) => {
  const newDate = date ? new Date(date) : new Date();
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}

export const getDateISO = (
  date?: Date | null,
): string => {
  if (!date || Number.isNaN(date.getTime())) {
    return 'No Date';
  }

  return date.toISOString().split('T')[0];
};

/*
* ---------------- Generate Custom Calendar ----------------
* Compute total days for grid (6 rows x 7 columns = 42 cells)
*/
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export const getCalendarDays = (
  year: number,
  month: number,
  selectedDate?: Date | null,
): CalendarDay[] => {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const startDate = new Date(
    year,
    month,
    1 - startingDayOfWeek
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index
    );

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isSelected: selectedDate
        ? isSameDay(date, selectedDate)
        : false,
    };
  });
};
