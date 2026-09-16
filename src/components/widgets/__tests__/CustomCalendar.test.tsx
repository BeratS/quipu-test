import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomCalendar } from '../CustomCalendar';

jest.mock('../../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    styles: {
      calendar: {},
      header: {},
      calendarNavButton: {},
      calendarText: {},
      calendarMonthText: {},
      calendarWeekRow: {},
      calendarWeekDayText: {},
      calendarDaysGrid: {},
      calendarDayCellContainer: {},
      calendarDayCell: {},
      calendarDayText: {},
      calendarSelectedText: {},
    },
    colors: {
      primary: '#0000ff',
    },
  }),
}));

describe('CustomCalendar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 8, 16)); // September 16, 2026
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the current month and year', async () => {
    const { findByText } = await render(
      <CustomCalendar />,
    );

    expect(await findByText('September 2026')).toBeTruthy();
  });

  it('renders all weekday headers', async () => {
    const { findByText } = await render(
      <CustomCalendar />,
    );

    expect(await findByText('Sun')).toBeTruthy();
    expect(await findByText('Mon')).toBeTruthy();
    expect(await findByText('Tue')).toBeTruthy();
    expect(await findByText('Wed')).toBeTruthy();
    expect(await findByText('Thu')).toBeTruthy();
    expect(await findByText('Fri')).toBeTruthy();
    expect(await findByText('Sat')).toBeTruthy();
  });

  it('renders the days of the current month', async () => {
    const { getAllByText } = await render(
      <CustomCalendar />,
    );

    expect(getAllByText('1').length).toBeGreaterThan(0);
    expect(getAllByText('16').length).toBeGreaterThan(0);
    expect(getAllByText('30').length).toBeGreaterThan(0);
  });

  it('navigates to the previous month', async () => {
    const { findByText } = await render(
      <CustomCalendar />,
    );

    const previousButton = await findByText('‹');

    await fireEvent.press(previousButton);

    expect(await findByText('August 2026')).toBeTruthy();
  });

  it('navigates to the next month', async () => {
    const { findByText } = await render(
      <CustomCalendar />,
    );

    const nextButton = await findByText('›');

    await fireEvent.press(nextButton);

    expect(await findByText('October 2026')).toBeTruthy();
  });

  it('handles navigation from January to previous year', async () => {
    jest.setSystemTime(new Date(2026, 0, 15));

    const { findByText } = await render(
      <CustomCalendar />,
    );

    expect(await findByText('January 2026')).toBeTruthy();

    await fireEvent.press(await findByText('‹'));

    expect(await findByText('December 2025')).toBeTruthy();
  });

  it('handles navigation from December to next year', async () => {
    jest.setSystemTime(new Date(2026, 11, 15));

    const { findByText } = await render(
      <CustomCalendar />,
    );

    expect(await findByText('December 2026')).toBeTruthy();

    await fireEvent.press(await findByText('›'));

    expect(await findByText('January 2027')).toBeTruthy();
  });

  it('calls onDateSelect when a current month date is selected', async () => {
    const onDateSelect = jest.fn();

    const { getAllByText } = await render(
      <CustomCalendar
        onDateSelect={onDateSelect}
      />,
    );

    const dateButton = getAllByText('20')[0];
    await fireEvent.press(dateButton);

    expect(onDateSelect).toHaveBeenCalledTimes(1);
    expect(onDateSelect).toHaveBeenCalledWith(
      new Date(2026, 8, 20),
    );
  });

  it('does not throw when onDateSelect is not provided', async () => {
    const { getAllByText } = await render(
      <CustomCalendar />,
    );

    expect(getAllByText('16').length).toBeGreaterThan(0);

    await fireEvent.press(getAllByText('16')[0]);
  });

  it('renders the selected date', async () => {
    const selectedDate = new Date(2026, 8, 20);

    const { getAllByText } = await render(
      <CustomCalendar
        selectedDate={selectedDate}
      />,
    );

    expect(getAllByText('20').length).toBeGreaterThan(0);
  });

  it('renders correctly with a null selected date', async () => {
    const { getAllByText } = await render(
      <CustomCalendar
        selectedDate={null}
      />,
    );

    expect(getAllByText('16').length).toBeGreaterThan(0);
  });
});
