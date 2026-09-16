import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalendarTimeRow } from '../CalendarTimeRow';

jest.mock('../../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    colors: {
      textMuted: '#999999',
      surface: '#eeeeee',
      primary: '#0000ff',
      primaryDark: '#000099',
      bookedBlock: '#eeeeff',
      bookedDarkBlock: '#ccccff',
      white: '#ffffff',
    },
  }),
}));

describe('CalendarTimeRow', () => {
  const defaultProps = {
    slot: '09:00',
    title: 'Team Meeting',
    isBooked: true,
    onPressSlot: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the time slot', async () => {
    const { findByText } = await render(
      <CalendarTimeRow {...defaultProps} />,
    );

    expect(await findByText('09:00')).toBeTruthy();
  });

  it('renders the event title when the slot is booked', async () => {
    const { findByText } = await render(
      <CalendarTimeRow {...defaultProps} />,
    );

    expect(await findByText('Team Meeting')).toBeTruthy();
  });

  it('renders "Booked Event" when booked and title is empty', async () => {
    const { findByText } = await render(
      <CalendarTimeRow
        {...defaultProps}
        title=""
        isBooked
      />,
    );

    expect(await findByText('Booked Event')).toBeTruthy();
  });

  it('renders schedule text when the slot is available', async () => {
    const { findByText } = await render(
      <CalendarTimeRow
        {...defaultProps}
        isBooked={false}
      />,
    );

    expect(await findByText('+ Tap to schedule')).toBeTruthy();
  });

  it('calls onPressSlot with the slot when pressed', async () => {
    const onPressSlot = jest.fn();

    const { findByText } = await render(
      <CalendarTimeRow
        {...defaultProps}
        onPressSlot={onPressSlot}
      />,
    );

    const event = await findByText('Team Meeting');

    fireEvent.press(event);

    expect(onPressSlot).toHaveBeenCalledTimes(1);
    expect(onPressSlot).toHaveBeenCalledWith('09:00');
  });

  it('calls onPressSlot when an available slot is pressed', async () => {
    const onPressSlot = jest.fn();

    const { findByText } = await render(
      <CalendarTimeRow
        {...defaultProps}
        isBooked={false}
        onPressSlot={onPressSlot}
      />,
    );

    const scheduleText = await findByText('+ Tap to schedule');

    fireEvent.press(scheduleText);

    expect(onPressSlot).toHaveBeenCalledTimes(1);
    expect(onPressSlot).toHaveBeenCalledWith('09:00');
  });

  it('renders a different slot correctly', async () => {
    const { findByText } = await render(
      <CalendarTimeRow
        {...defaultProps}
        slot="14:30"
        title="Meeting Appointment"
      />,
    );

    expect(await findByText('14:30')).toBeTruthy();
    expect(await findByText('Meeting Appointment')).toBeTruthy();
  });
});
