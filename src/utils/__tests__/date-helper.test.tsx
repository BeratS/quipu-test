import { getCalendarDays, getDateISO, HOURLY_SLOTS, isSameDay, nextDate, prevDate } from '../date-helper';

describe('Date Helper', () => {

  it('renders profile information', async () => {
    const result = [
      '0 AM',
      '1 AM',
      '2 AM',
      '3 AM',
      '4 AM',
      '5 AM',
      '6 AM',
      '7 AM',
      '8 AM',
      '9 AM',
      '10 AM',
      '11 AM',
      '12 PM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
      '5 PM',
      '6 PM',
      '7 PM',
      '8 PM',
      '9 PM',
      '10 PM',
      '11 PM',
    ]
    expect(HOURLY_SLOTS).toEqual(result);
  });

  describe('isSameDay', () => {
    it('returns true when two dates are on the same day', () => {
      const d1 = new Date(2026, 8, 16, 10, 30);
      const d2 = new Date(2026, 8, 16, 23, 59);

      expect(isSameDay(d1, d2)).toBe(true);
    });

    it('returns false when dates are on different days', () => {
      const d1 = new Date(2026, 8, 16);
      const d2 = new Date(2026, 8, 17);

      expect(isSameDay(d1, d2)).toBe(false);
    });

    it('returns false when dates have different months', () => {
      const d1 = new Date(2026, 8, 16);
      const d2 = new Date(2026, 9, 16);

      expect(isSameDay(d1, d2)).toBe(false);
    });

    it('returns false when dates have different years', () => {
      const d1 = new Date(2026, 8, 16);
      const d2 = new Date(2027, 8, 16);

      expect(isSameDay(d1, d2)).toBe(false);
    });
  });

  describe('prevDate', () => {
    it('returns the previous day', () => {
      const date = new Date(2026, 8, 16);

      expect(prevDate(date)).toEqual(new Date(2026, 8, 15));
    });

    it('handles month boundaries', () => {
      const date = new Date(2026, 8, 1);

      expect(prevDate(date)).toEqual(new Date(2026, 7, 31));
    });

    it('handles year boundaries', () => {
      const date = new Date(2026, 0, 1);

      expect(prevDate(date)).toEqual(new Date(2025, 11, 31));
    });

    it('does not mutate the original date', () => {
      const date = new Date(2026, 8, 16);
      const originalTime = date.getTime();

      prevDate(date);

      expect(date.getTime()).toBe(originalTime);
    });

    it('uses the current date when no argument is provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2026, 8, 16));

      expect(prevDate()).toEqual(new Date(2026, 8, 15));

      jest.useRealTimers();
    });

    it('uses the current date when null is provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2026, 8, 16));

      expect(prevDate(null)).toEqual(new Date(2026, 8, 15));

      jest.useRealTimers();
    });
  });

  describe('nextDate', () => {
    it('returns the next day', () => {
      const date = new Date(2026, 8, 16);

      expect(nextDate(date)).toEqual(new Date(2026, 8, 17));
    });

    it('handles month boundaries', () => {
      const date = new Date(2026, 8, 30);

      expect(nextDate(date)).toEqual(new Date(2026, 9, 1));
    });

    it('handles year boundaries', () => {
      const date = new Date(2026, 11, 31);

      expect(nextDate(date)).toEqual(new Date(2027, 0, 1));
    });

    it('does not mutate the original date', () => {
      const date = new Date(2026, 8, 16);
      const originalTime = date.getTime();

      nextDate(date);

      expect(date.getTime()).toBe(originalTime);
    });

    it('uses the current date when no argument is provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2026, 8, 16));

      expect(nextDate()).toEqual(new Date(2026, 8, 17));

      jest.useRealTimers();
    });

    it('uses the current date when null is provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2026, 8, 16));

      expect(nextDate(null)).toEqual(new Date(2026, 8, 17));

      jest.useRealTimers();
    });
  });



  describe('getCalendarDays', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2026, 8, 16)); // September 16, 2026
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns exactly 42 calendar days', () => {
      const days = getCalendarDays(2026, 8);

      expect(days).toHaveLength(42);
    });

    it('returns the correct first date based on the first day of the month', () => {
      // September 1, 2026 is Tuesday (getDay() === 2)
      // Therefore the calendar starts on August 30, 2026.
      const days = getCalendarDays(2026, 8);

      expect(days[0].date).toEqual(new Date(2026, 7, 30));
    });

    it('marks days belonging to the current month correctly', () => {
      const days = getCalendarDays(2026, 8);

      const currentMonthDays = days.filter(day => day.isCurrentMonth);

      expect(currentMonthDays).toHaveLength(30);
      expect(currentMonthDays[0].date).toEqual(new Date(2026, 8, 1));
      expect(currentMonthDays[29].date).toEqual(new Date(2026, 8, 30));
    });

    it('marks today correctly', () => {
      const days = getCalendarDays(2026, 8);

      const today = days.find(day => day.isToday);

      expect(today).toBeDefined();
      expect(today?.date).toEqual(new Date(2026, 8, 16));
      expect(today?.isCurrentMonth).toBe(true);
    });

    it('marks no day as today when generating a different month', () => {
      const days = getCalendarDays(2026, 7); // August 2026

      expect(days.some(day => day.isToday)).toBe(false);
    });

    it('marks the selected date correctly', () => {
      const selectedDate = new Date(2026, 8, 20);

      const days = getCalendarDays(2026, 8, selectedDate);

      const selectedDays = days.filter(day => day.isSelected);

      expect(selectedDays).toHaveLength(1);
      expect(selectedDays[0].date).toEqual(selectedDate);
    });

    it('matches selected date regardless of time', () => {
      const selectedDate = new Date(2026, 8, 20, 23, 59, 59);

      const days = getCalendarDays(2026, 8, selectedDate);

      const selectedDays = days.filter(day => day.isSelected);

      expect(selectedDays).toHaveLength(1);
      expect(selectedDays[0].date.getDate()).toBe(20);
    });

    it('does not mark any day as selected when selectedDate is undefined', () => {
      const days = getCalendarDays(2026, 8);

      expect(days.some(day => day.isSelected)).toBe(false);
    });

    it('does not mark any day as selected when selectedDate is null', () => {
      const days = getCalendarDays(2026, 8, null);

      expect(days.some(day => day.isSelected)).toBe(false);
    });

    it('includes days from the previous month', () => {
      const days = getCalendarDays(2026, 8);

      expect(days[0].isCurrentMonth).toBe(false);
      expect(days[0].date.getMonth()).toBe(7); // August
    });

    it('includes days from the next month', () => {
      const days = getCalendarDays(2026, 8);

      const nextMonthDays = days.filter(
        day => day.date.getMonth() === 9
      );

      expect(nextMonthDays.length).toBeGreaterThan(0);
      expect(nextMonthDays[0].isCurrentMonth).toBe(false);
    });

    it('generates consecutive dates', () => {
      const days = getCalendarDays(2026, 8);

      for (let i = 1; i < days.length; i++) {
        const previous = days[i - 1].date;
        const current = days[i].date;

        const diffInDays =
          (current.getTime() - previous.getTime()) /
          (1000 * 60 * 60 * 24);

        expect(diffInDays).toBe(1);
      }
    });

    it('handles January correctly', () => {
      const days = getCalendarDays(2026, 0);

      expect(days).toHaveLength(42);

      expect(days.some(day =>
        day.date.getFullYear() === 2025 &&
        day.date.getMonth() === 11
      )).toBe(true);

      expect(days.some(day =>
        day.date.getFullYear() === 2026 &&
        day.date.getMonth() === 0
      )).toBe(true);
    });

    it('handles December correctly', () => {
      const days = getCalendarDays(2026, 11);

      expect(days).toHaveLength(42);

      expect(days.some(day =>
        day.date.getFullYear() === 2027 &&
        day.date.getMonth() === 0
      )).toBe(true);

      expect(days.some(day =>
        day.date.getFullYear() === 2026 &&
        day.date.getMonth() === 11
      )).toBe(true);
    });
  });

  describe('getDateISO', () => {
    it('returns the ISO date for a valid Date', () => {
      const date = new Date('2026-09-16T12:30:00.000Z');

      expect(getDateISO(date)).toBe('2026-09-16');
    });

    it('returns "No Date" when date is null', () => {
      expect(getDateISO(null)).toBe('No Date');
    });

    it('returns "No Date" when date is invalid', () => {
      const invalidDate = new Date('invalid');

      expect(getDateISO(invalidDate)).toBe('No Date');
    });

    it('ignores the time and returns only the date portion', () => {
      const date = new Date('2026-09-16T23:59:59.999Z');

      expect(getDateISO(date)).toBe('2026-09-16');
    });
  });
});
