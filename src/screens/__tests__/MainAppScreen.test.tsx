import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import MainAppScreen from '../MainAppScreen';

jest.mock('../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    styles: {
      calendarText: {},
    },
    colors: {
      primary: '#0000ff',
    },
  }),
}));

jest.mock('../../components/widgets/CalendarBottomModal', () => {
  const { Text } = require('react-native');

  return {
    CalendarBottomModal: ({
      isVisible,
      onDateSelect,
    }: {
      isVisible: boolean;
      onClose: () => void;
      onDateSelect: (date: Date) => void;
    }) => (
      <Text
        testID="calendar-modal"
        onPress={() => onDateSelect(new Date(2026, 8, 20))}
      >
        {isVisible ? 'Calendar Modal Visible' : 'Calendar Modal Hidden'}
      </Text>
    ),
  };
});

jest.mock('../../modules/main/CalendarTimeSlot', () => {
  const { Text } = require('react-native');

  return {
    CalendarTimeSlot: ({
      selectedDate,
    }: {
      selectedDate: Date;
    }) => (
      <Text testID="calendar-time-slot">
        Time slots for {selectedDate.toDateString()}
      </Text>
    ),
  };
});

describe('MainAppScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 8, 16));
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the selected date', async () => {
    const { findByText } = await render(<MainAppScreen />);

    expect(
      await findByText('Selected Date:'),
    ).toBeTruthy();

    expect(
      await findByText(
        new Date(2026, 8, 16).toDateString(),
      ),
    ).toBeTruthy();
  });

  it('renders the calendar time slots for the selected date', async () => {
    const { findByTestId } = await render(
      <MainAppScreen />,
    );

    expect(
      await findByTestId('calendar-time-slot'),
    ).toBeTruthy();
  });

  it('navigates to the previous date', async () => {
    const { findByText } = await render(
      <MainAppScreen />,
    );

    const previousButton = await findByText('‹');

    await fireEvent.press(previousButton);

    expect(
      await findByText(
        new Date(2026, 8, 15).toDateString(),
      ),
    ).toBeTruthy();
  });

  it('navigates to the next date', async () => {
    const { findByText } = await render(
      <MainAppScreen />,
    );

    const nextButton = await findByText('›');

    await fireEvent.press(nextButton);

    expect(
      await findByText(
        new Date(2026, 8, 17).toDateString(),
      ),
    ).toBeTruthy();
  });

  it('opens the calendar modal when the date button is pressed', async () => {
    const { findByText } = await render(
      <MainAppScreen />,
    );

    expect(
      await findByText('Calendar Modal Hidden'),
    ).toBeTruthy();

    const dateButton = await findByText(
      new Date(2026, 8, 16).toDateString(),
    );

    await fireEvent.press(dateButton);

    expect(
      await findByText('Calendar Modal Visible'),
    ).toBeTruthy();
  });

  it('updates the selected date when a date is selected from the calendar', async () => {
    const { findByText, findByTestId } = await render(
      <MainAppScreen />,
    );

    // Open the modal
    const dateButton = await findByText(
      new Date(2026, 8, 16).toDateString(),
    );

    await fireEvent.press(dateButton);

    // Select September 20
    await fireEvent.press(
      await findByTestId('calendar-modal'),
    );

    expect(
      await findByText(
        new Date(2026, 8, 20).toDateString(),
      ),
    ).toBeTruthy();
  });

  it('renders the time slots with the newly selected date', async () => {
    const { findByText, findByTestId } = await render(
      <MainAppScreen />,
    );

    const dateButton = await findByText(
      new Date(2026, 8, 16).toDateString(),
    );

    await fireEvent.press(dateButton);

    await fireEvent.press(
      await findByTestId('calendar-modal'),
    );

    expect(
      await findByText(
        `Time slots for ${new Date(2026, 8, 20).toDateString()}`,
      ),
    ).toBeTruthy();
  });
});
