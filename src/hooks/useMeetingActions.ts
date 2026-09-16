import { useState } from 'react';
import {
    CalendarEvent,
    createEvent,
    deleteEvent,
    updateEvent,
} from '../services/meeting-events';
import { getDateISO } from '../utils/date-helper';
import { CreateSlotMeetingFormData } from '../utils/validations';
import { useAlert } from './useAlert';

export const useMeetingActions = () => {
    const { showAlert } = useAlert();

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const saveMeeting = async (
        data: CreateSlotMeetingFormData,
        event?: CalendarEvent | null,
    ) => {
        try {
            setSubmitting(true);

            const isEditing = Boolean(event?.id);

            if (isEditing && event?.id) {
                await updateEvent(event.id, {
                    title: data.title.trim(),
                    description: data.description?.trim(),
                    hour: data.hour,
                });

                showAlert({
                    title: 'Success',
                    message: 'Meeting updated successfully!',
                });
            } else {
                await createEvent({
                    title: data.title.trim(),
                    description: data.description?.trim(),
                    date: getDateISO(data.date),
                    hour: data.hour,
                });

                showAlert({
                    title: 'Success',
                    message: 'Meeting created successfully!',
                });
            }

            return true;
        } catch (error: any) {
            showAlert({
                title: 'Error',
                message: error?.message || 'Failed to save meeting.',
            });

            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const removeMeeting = async (event?: CalendarEvent | null) => {
        if (!event?.id) return false;

        try {
            setDeleting(true);

            await deleteEvent(event.id);

            showAlert({
                title: 'Deleted',
                message: 'Meeting has been removed.',
            });

            return true;
        } catch (error: any) {
            showAlert({
                title: 'Error',
                message: error?.message || 'Failed to delete meeting.',
            });

            return false;
        } finally {
            setDeleting(false);
        }
    };

    return {
        submitting,
        deleting,
        saveMeeting,
        removeMeeting,
    };
};
