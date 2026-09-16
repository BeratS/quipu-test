import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalendarTimeSlot } from '../CalendarTimeSlot';

const mockGetEventByHour = jest.fn();

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

jest.mock('../../../hooks/useBookedMeetingEvents', () => ({
  useBookedSlots: jest.fn(),
}));

jest.mock('../../../components/widgets/CalendarTimeRow', () => {
  const { Text } = require('react-native');

  return {
    CalendarTimeRow: ({
      slot,
      title,
      isBooked,
      onPressSlot,
    }: {
      slot: string;
      title: string;
      isBooked: boolean;
      onPressSlot: (slot: string) => void;
    }) => (
      <Text
        testID={`time-row-${slot}`}
        onPress={() => onPressSlot(slot)}
      >
        {slot} - {isBooked ? title : 'Available'}
      </Text>
    ),
  };
});

jest.mock('../CreateSlotMeetingModal', () => {
  const { Text } = require('react-native');

  return {
    __esModule: true,
    default: ({
      visible,
      initialHour,
      onSuccess,
    }: {
      visible: boolean;
      initialHour: string;
      onSuccess: () => void;
    }) => (
      <Text
        testID="create-slot-modal"
        onPress={visible ? onSuccess : undefined}
      >
        {visible ? `Modal Open - ${initialHour}` : 'Modal Closed'}
      </Text>
    ),
  };
});

jest.mock('../../../utils/date-helper', () => ({
  HOURLY_SLOTS: ['09:00', '10:00', '11:00'],
}));

describe('CalendarTimeSlot', () => {
  const selectedDate = new Date('2026-09-16T12:00:00.000Z');

  beforeEach(() => {
    const { useBookedSlots } = require('../../../hooks/useBookedMeetingEvents');
    const dateHelper = require('../../../utils/date-helper');

    jest.clearAllMocks();
    dateHelper.HOURLY_SLOTS = ['09:00', '10:00', '11:00'];
    mockGetEventByHour.mockReturnValue(undefined);
    useBookedSlots.mockReturnValue({
      bookedHours: [],
      getEventByHour: mockGetEventByHour,
      loading: false,
    });
  });

  it('renders the time slots', async () => {
    const { findByText } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    expect(await findByText('09:00 - Available')).toBeTruthy();
    expect(await findByText('10:00 - Available')).toBeTruthy();
    expect(await findByText('11:00 - Available')).toBeTruthy();
  });

  it('renders a booked slot with the event title', async () => {
    mockGetEventByHour.mockImplementation((hour: string) => {
      if (hour === '10:00') {
        return {
          id: 'event-1',
          title: 'Team Meeting',
        };
      }

      return undefined;
    });

    const { findByText } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    expect(
      await findByText('10:00 - Team Meeting'),
    ).toBeTruthy();

    expect(
      await findByText('09:00 - Available'),
    ).toBeTruthy();
  });

  it('opens the modal when an available slot is pressed', async () => {
    const { findByTestId, findByText } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    fireEvent.press(
      await findByTestId('time-row-09:00'),
    );

    expect(
      await findByText('Modal Open - 09:00'),
    ).toBeTruthy();
  });

  it('opens the modal with the booked event details', async () => {
    const event = {
      id: 'event-1',
      title: 'Team Meeting',
    };

    mockGetEventByHour.mockImplementation((hour: string) => {
      if (hour === '10:00') {
        return event;
      }

      return undefined;
    });

    const { findByTestId, findByText } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    await fireEvent.press(
      await findByTestId('time-row-10:00'),
    );

    expect(
      await findByText('Modal Open - 10:00'),
    ).toBeTruthy();
  });

  it('closes the modal on success', async () => {
    const { findByTestId, findByText } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    await fireEvent.press(
      await findByTestId('time-row-09:00'),
    );

    expect(
      await findByText('Modal Open - 09:00'),
    ).toBeTruthy();

    await fireEvent.press(
      await findByTestId('create-slot-modal'),
    );

    expect(
      await findByText('Modal Closed'),
    ).toBeTruthy();
  });

  it('renders the loading indicator when loading', async () => {
    const { useBookedSlots } = require('../../../hooks/useBookedMeetingEvents');
    const dateHelper = require('../../../utils/date-helper');

    useBookedSlots.mockReturnValue({
      bookedHours: [],
      getEventByHour: mockGetEventByHour,
      loading: true,
    });

    dateHelper.HOURLY_SLOTS = [];

    const { getByTestId } = await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('calls getEventByHour for each time slot', async () => {
    await render(
      <CalendarTimeSlot selectedDate={selectedDate} />,
    );

    expect(mockGetEventByHour).toHaveBeenCalledWith('09:00');
    expect(mockGetEventByHour).toHaveBeenCalledWith('10:00');
    expect(mockGetEventByHour).toHaveBeenCalledWith('11:00');
  });
});
