import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

import CreateSlotMeetingModal from '../CreateSlotMeetingModal';

const mockShowAlert = jest.fn();
const mockSaveMeeting = jest.fn();
const mockRemoveMeeting = jest.fn();

jest.mock('../../../hooks/useAlert', () => ({
  useAlert: () => ({
    showAlert: mockShowAlert,
  }),
}));

jest.mock('../../../hooks/useMeetingActions', () => ({
  useMeetingActions: () => ({
    submitting: false,
    deleting: false,
    saveMeeting: mockSaveMeeting,
    removeMeeting: mockRemoveMeeting,
  }),
}));

jest.mock('../../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    colors: {
      white: '#FFFFFF',
      text: '#000000',
      textMuted: '#777777',
      primary: '#007AFF',
      border: '#CCCCCC',
      background: '#F5F5F5',
      disabledBackground: '#DDDDDD',
      placeholder: '#999999',
      error: '#FF0000',
    },
    styles: {
      modalOverlay: {},
      label: {},
      input: {},
      inputError: {},
      errorText: {},
      button: {},
      buttonGhost: {},
      buttonText: {},
      fullView: {},
    },
  }),
}));

jest.mock('../../../utils/firebase', () => ({
  auth: {
    currentUser: {
      uid: 'user-1',
    },
  },
}));

jest.mock('../../../utils/date-helper', () => ({
  HOURLY_SLOTS: ['09:00', '10:00', '11:00'],
}));

jest.mock('../../../utils/validations', () => {
  const { z } = require('zod');

  return {
    createSlotMeetingSchema: z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().optional(),
      date: z.date(),
      hour: z.string().min(1, 'Hour is required'),
    }),
  };
});

describe('CreateSlotMeetingModal', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockSaveMeeting.mockResolvedValue(true);
    mockRemoveMeeting.mockResolvedValue(true);
  });

  describe('Create mode', () => {
    it('renders the create meeting modal', async () => {
      const { getByText, getByPlaceholderText } = await render(
        <CreateSlotMeetingModal {...defaultProps} />,
      );

      expect(getByText('New Meeting')).toBeTruthy();

      expect(getByText('Meeting Title *')).toBeTruthy();

      expect(getByText('Select Time Slot *')).toBeTruthy();

      expect(getByText('Description (Optional)')).toBeTruthy();

      expect(
        getByPlaceholderText('e.g. Meeting with Client'),
      ).toBeTruthy();

      expect(
        getByPlaceholderText('Add agenda or video call links...'),
      ).toBeTruthy();

      expect(getByText('Create Meeting')).toBeTruthy();
    });

    it('creates a meeting successfully', async () => {
      const onClose = jest.fn();
      const onSuccess = jest.fn();

      const { getByPlaceholderText, getByText } = await render(
        <CreateSlotMeetingModal
          visible
          initialDate={new Date('2026-09-17')}
          initialHour="09:00"
          onClose={onClose}
          onSuccess={onSuccess}
        />,
      );

      await act(async () => {
        fireEvent.changeText(
          getByPlaceholderText('e.g. Meeting with Client'),
          'Client Meeting',
        );

        fireEvent.changeText(
          getByPlaceholderText('Add agenda or video call links...'),
          'Discuss project requirements',
        );

        fireEvent.press(getByText('Create Meeting'));
      });

      await waitFor(() => {
        expect(mockSaveMeeting).toHaveBeenCalledTimes(1);
      });

      expect(mockSaveMeeting).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Client Meeting',
          description: 'Discuss project requirements',
          hour: '09:00',
        }),
        undefined,
      );

      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when saving fails', async () => {
      const onClose = jest.fn();
      const onSuccess = jest.fn();

      mockSaveMeeting.mockResolvedValue(false);

      const { getByPlaceholderText, getByText } = await render(
        <CreateSlotMeetingModal
          visible
          initialDate={new Date('2026-09-17')}
          initialHour="09:00"
          onClose={onClose}
          onSuccess={onSuccess}
        />,
      );

      await act(async () => {
        fireEvent.changeText(
          getByPlaceholderText('e.g. Meeting with Client'),
          'Client Meeting',
        );

        fireEvent.press(getByText('Create Meeting'));
      });

      await waitFor(() => {
        expect(mockSaveMeeting).toHaveBeenCalledTimes(1);
      });

      expect(onSuccess).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });

    it('shows validation error when title is empty', async () => {
      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          initialHour="09:00"
          onClose={jest.fn()}
        />,
      );

      fireEvent.press(getByText('Create Meeting'));

      await waitFor(() => {
        expect(getByText('Title is required')).toBeTruthy();
      });

      expect(mockSaveMeeting).not.toHaveBeenCalled();
    });

    it('selects a time slot', async () => {
      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          initialDate={new Date('2026-09-17')}
          onClose={jest.fn()}
        />,
      );

      fireEvent.press(getByText('10:00'));

      expect(getByText('10:00')).toBeTruthy();
    });

    it('marks booked slots as unavailable', async () => {
      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          initialDate={new Date('2026-09-17')}
          bookedHours={['10:00']}
          onClose={jest.fn()}
        />,
      );

      expect(getByText('10:00 (Booked)')).toBeTruthy();
    });
  });

  describe('Edit mode', () => {
    const existingEvent = {
      id: 'event-1',
      userId: 'user-1',
      title: 'Existing Meeting',
      description: 'Existing description',
      date: '2026-09-17',
      hour: '10:00',
    };

    it('renders edit mode for the owner', async () => {
      const { getByText, getByDisplayValue } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={existingEvent as any}
          onClose={jest.fn()}
        />,
      );

      expect(getByText('Edit Meeting')).toBeTruthy();

      expect(getByText('Update Meeting')).toBeTruthy();

      expect(getByText('Delete')).toBeTruthy();

      expect(getByDisplayValue('Existing Meeting')).toBeTruthy();

      expect(
        getByDisplayValue('Existing description'),
      ).toBeTruthy();
    });

    it('updates an existing meeting', async () => {
      const onClose = jest.fn();
      const onSuccess = jest.fn();

      const { getByDisplayValue, getByText } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={existingEvent as any}
          onClose={onClose}
          onSuccess={onSuccess}
        />,
      );

      await act(async () => {
        fireEvent.changeText(
          getByDisplayValue('Existing Meeting'),
          'Updated Meeting',
        );

        fireEvent.press(getByText('Update Meeting'));
      });

      await waitFor(() => {
        expect(mockSaveMeeting).toHaveBeenCalledTimes(1);
      });

      expect(mockSaveMeeting).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Meeting',
          description: 'Existing description',
          hour: '10:00',
        }),
        existingEvent,
      );

      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('opens delete confirmation', async () => {
      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={existingEvent as any}
          onClose={jest.fn()}
        />,
      );

      fireEvent.press(getByText('Delete'));

      expect(mockShowAlert).toHaveBeenCalledTimes(1);

      expect(mockShowAlert).toHaveBeenCalledWith({
        title: 'Delete Meeting',
        message: 'Are you sure you want to delete this meeting slot?',
        actionFn: expect.any(Function),
      });
    });

    it('deletes the meeting after confirmation', async () => {
      const onClose = jest.fn();
      const onSuccess = jest.fn();

      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={existingEvent as any}
          onClose={onClose}
          onSuccess={onSuccess}
        />,
      );

      await act(async () => {
        fireEvent.press(getByText('Delete'));
      });

      expect(mockShowAlert).toHaveBeenCalledTimes(1);

      const alertConfig = mockShowAlert.mock.calls[0][0];

      await act(async () => {
        await alertConfig.actionFn();
      });

      expect(mockRemoveMeeting).toHaveBeenCalledTimes(1);

      expect(mockRemoveMeeting).toHaveBeenCalledWith(
        existingEvent,
      );

      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when deletion fails', async () => {
      const onClose = jest.fn();
      const onSuccess = jest.fn();

      mockRemoveMeeting.mockResolvedValue(false);

      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={existingEvent as any}
          onClose={onClose}
          onSuccess={onSuccess}
        />,
      );

      await act(async () => {
        fireEvent.press(getByText('Delete'));
      });

      const alertConfig = mockShowAlert.mock.calls[0][0];

      await act(async () => {
        await alertConfig.actionFn();
      });

      expect(mockRemoveMeeting).toHaveBeenCalledWith(
        existingEvent,
      );

      expect(onSuccess).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Permissions', () => {
    it('shows meeting details for another user event', async () => {
      const event = {
        id: 'event-2',
        userId: 'another-user',
        title: 'Other User Meeting',
        description: 'Some description',
        date: '2026-09-17',
        hour: '10:00',
      };

      const { getByText, queryByText } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={event as any}
          onClose={jest.fn()}
        />,
      );

      expect(getByText('Meeting Details')).toBeTruthy();

      expect(queryByText('Update Meeting')).toBeNull();

      expect(queryByText('Delete')).toBeNull();
    });

    it('does not call saveMeeting for another user event', async () => {
      const event = {
        id: 'event-2',
        userId: 'another-user',
        title: 'Other User Meeting',
        description: '',
        date: '2026-09-17',
        hour: '10:00',
      };

      const { getByDisplayValue } = await render(
        <CreateSlotMeetingModal
          visible
          eventIntials={event as any}
          onClose={jest.fn()}
        />,
      );

      expect(
        getByDisplayValue('Other User Meeting'),
      ).toBeTruthy();

      expect(mockSaveMeeting).not.toHaveBeenCalled();
    });
  });

  describe('Modal behavior', () => {
    it('calls onClose when the close button is pressed', async () => {
      const onClose = jest.fn();

      const { getByText } = await render(
        <CreateSlotMeetingModal
          visible
          onClose={onClose}
        />,
      );

      fireEvent.press(getByText('✕'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
