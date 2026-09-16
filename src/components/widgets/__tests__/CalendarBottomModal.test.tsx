import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CalendarBottomModal } from '../CalendarBottomModal';

jest.mock('../../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    styles: {
      modalOverlay: {},
      modalBackdrop: {},
      modalSheetContainer: {},
      dragHandleContainer: {},
      dragHandle: {},
      modalHeaderTitle: {},
    },
  }),
}));

jest.mock('../CustomCalendar', () => {
  const { Text } = require('react-native');

  return {
    CustomCalendar: ({
      selectedDate,
      onDateSelect,
    }: {
      selectedDate: Date | null;
      onDateSelect: (date: Date) => void;
    }) => (
      <>
        <Text testID="selected-date">
          {selectedDate?.toISOString() ?? 'No Date'}
        </Text>

        <Text
          testID="calendar-select"
          onPress={() =>
            onDateSelect(new Date('2026-09-20T12:00:00.000Z'))
          }
        >
          Select Date
        </Text>
      </>
    ),
  };
});

describe('CalendarBottomModal', () => {
  const defaultProps = {
    isVisible: true,
    onClose: jest.fn(),
    selectedDate: null,
    onDateSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when visible', async () => {
    const { getAllByText } = await render(
      <CalendarBottomModal {...defaultProps} />,
    );

    expect(getAllByText('Select Date').length).toBeGreaterThan(0);
  });

  it('renders the selected date', async () => {
    const selectedDate = new Date('2026-09-16T12:00:00.000Z');

    const { findByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        selectedDate={selectedDate}
      />,
    );

    expect(await findByTestId('selected-date')).toHaveTextContent(
      selectedDate.toISOString(),
    );
  });

  it('renders "No Date" when selectedDate is null', async () => {
    const { findByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        selectedDate={null}
      />,
    );

    expect(await findByTestId('selected-date')).toHaveTextContent(
      'No Date',
    );
  });

  it('calls onClose when backdrop is pressed', async () => {
    const onClose = jest.fn();

    const { findByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        onClose={onClose}
      />,
    );

    const backdrop = await findByTestId(
      'calendar-modal-backdrop',
    );

    fireEvent.press(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onDateSelect and onClose when a date is selected', async () => {
    const onDateSelect = jest.fn();
    const onClose = jest.fn();

    const { findByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        onDateSelect={onDateSelect}
        onClose={onClose}
      />,
    );

    const calendarSelect = await findByTestId('calendar-select');

    fireEvent.press(calendarSelect);

    const selectedDate = new Date(
      '2026-09-20T12:00:00.000Z',
    );

    expect(onDateSelect).toHaveBeenCalledTimes(1);
    expect(onDateSelect).toHaveBeenCalledWith(selectedDate);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when requestClose is triggered', async () => {
    const onClose = jest.fn();

    const { findByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        onClose={onClose}
      />,
    );

    const modal = await findByTestId('calendar-modal');

    await act(async () => {
      fireEvent(modal, 'requestClose');
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the calendar has not been interacted with', async () => {
    const onClose = jest.fn();

    await render(
      <CalendarBottomModal
        {...defaultProps}
        onClose={onClose}
      />,
    );

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders correctly when modal is hidden', async () => {
    const { queryByTestId } = await render(
      <CalendarBottomModal
        {...defaultProps}
        isVisible={false}
      />,
    );

    expect(queryByTestId('calendar-modal')).toBeNull();
  });
});
