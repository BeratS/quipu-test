import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useAlert } from '../../hooks/useAlert';
import { useAppStyle } from '../../hooks/useAppColors';
import { useMeetingActions } from '../../hooks/useMeetingActions';
import { CalendarEvent } from '../../services/meeting-events';
import { HOURLY_SLOTS } from '../../utils/date-helper';
import { auth } from '../../utils/firebase';
import { CreateSlotMeetingFormData, createSlotMeetingSchema } from '../../utils/validations';

interface IProps {
  visible: boolean;
  initialDate?: Date;
  initialHour?: string;
  eventIntials?: CalendarEvent | null;
  bookedHours?: string[];
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateSlotMeetingModal({
  visible,
  initialDate,
  initialHour,
  eventIntials,
  bookedHours = [],
  onClose,
  onSuccess,
}: IProps): React.JSX.Element {
  const { styles: globalStyles, colors } = useAppStyle();
  const { showAlert } = useAlert();

  const {
    submitting,
    deleting,
    saveMeeting,
    removeMeeting,
  } = useMeetingActions();

  const currentUserId = auth.currentUser?.uid;
  const isEditing = Boolean(eventIntials?.id);
  const isOwner = !isEditing || eventIntials?.userId === currentUserId;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateSlotMeetingFormData>({
    resolver: zodResolver(createSlotMeetingSchema),
    defaultValues: {
      title: eventIntials?.title ?? '',
      description: eventIntials?.description ?? '',
      date: initialDate ?? (eventIntials?.date ? new Date(eventIntials.date) : new Date()),
      hour: initialHour ?? eventIntials?.hour ?? '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        title: eventIntials?.title ?? '',
        description: eventIntials?.description ?? '',
        date: initialDate ?? (eventIntials?.date ? new Date(eventIntials.date) : new Date()),
        hour: initialHour ?? eventIntials?.hour ?? '',
      });
    }
  }, [visible, eventIntials, initialDate, initialHour, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateSlotMeetingFormData) => {
    if (!isOwner) {
      showAlert({
        title: 'Permission Denied',
        message: 'You cannot edit an event created by another user.',
      });
      return;
    }

    const success = await saveMeeting(data, eventIntials);

    if (success) {
      reset();
      onSuccess?.();
      onClose();
    }
  };
  const handleDelete = () => {
    if (!eventIntials?.id || !isOwner) return;

    showAlert({
      title: 'Delete Meeting',
      message: 'Are you sure you want to delete this meeting slot?',
      actionFn: async () => {
        const success = await removeMeeting(eventIntials);

        if (success) {
          reset();
          onSuccess?.();
          onClose();
        }
      },
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={globalStyles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={[styles.modalCard, { backgroundColor: colors.white }]}>

              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.pageTitle, { color: colors.text }]}>
                  {!isEditing ? 'New Meeting' : isOwner ? 'Edit Meeting' : 'Meeting Details'}
                </Text>
                <TouchableOpacity
                  onPress={handleClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={[styles.closeButtonText, { color: colors.textMuted }]}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Title Field */}
              <Text style={globalStyles.label}>Meeting Title *</Text>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      globalStyles.input,
                      errors.title && globalStyles.inputError,
                      !isOwner && styles.disabledInput,
                    ]}
                    placeholder="e.g. Meeting with Client"
                    placeholderTextColor={colors.placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={isOwner}
                  />
                )}
              />
              {errors.title && (
                <Text style={globalStyles.errorText}>{errors.title.message}</Text>
              )}

              {/* Time Slot Picker */}
              <Text style={[globalStyles.label, styles.timeSlotLabel]}>Select Time Slot *</Text>
              <Controller
                control={control}
                name="hour"
                render={({ field: { value } }) => (
                  <View style={styles.slotContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {HOURLY_SLOTS.map((slot) => {
                        const isBooked = bookedHours.includes(slot) && slot !== eventIntials?.hour;
                        const isSelected = value === slot;

                        return (
                          <TouchableOpacity
                            key={slot}
                            disabled={!isOwner || isBooked}
                            onPress={() => setValue('hour', slot, { shouldValidate: true })}
                            style={[
                              styles.slotChip,
                              {
                                borderColor: colors.border,
                                backgroundColor: isSelected
                                  ? colors.primary
                                  : isBooked
                                    ? colors.disabledBackground
                                    : colors.background,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.slotChipText,
                                {
                                  color: isSelected
                                    ? colors.white
                                    : isBooked
                                      ? colors.textMuted
                                      : colors.text,
                                },
                              ]}
                            >
                              {slot} {isBooked ? '(Booked)' : ''}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              />
              {errors.hour && (
                <Text style={globalStyles.errorText}>{errors.hour.message}</Text>
              )}

              {/* Description Field */}
              <Text style={globalStyles.label}>Description (Optional)</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      globalStyles.input,
                      styles.textArea,
                      !isOwner && styles.disabledInput,
                    ]}
                    placeholder="Add agenda or video call links..."
                    placeholderTextColor={colors.placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                    editable={isOwner}
                  />
                )}
              />

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                {isEditing && isOwner && (
                  <TouchableOpacity
                    style={[globalStyles.buttonGhost, styles.deleteButton]}
                    onPress={handleDelete}
                    disabled={submitting || deleting}
                  >
                    {deleting ? (
                      <ActivityIndicator color={colors.error} />
                    ) : (
                      <Text style={[styles.deleteButtonText, { color: colors.error }]}>Delete</Text>
                    )}
                  </TouchableOpacity>
                )}

                {isOwner ? (
                  <TouchableOpacity
                    style={[
                      globalStyles.button,
                      styles.submitButton,
                      isEditing && globalStyles.fullView,
                    ]}
                    onPress={() => handleSubmit(onSubmit)()}
                    disabled={submitting || deleting}
                  >
                    {submitting ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      <Text style={globalStyles.buttonText}>
                        {isEditing ? 'Update Meeting' : 'Create Meeting'}
                      </Text>
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  slotContainer: {
    marginBottom: 12,
  },
  slotChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  slotChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.6,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  submitButton: {
    flex: 1,
  },
  timeSlotLabel: {
    marginTop: 8
  },
  deleteButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    fontWeight: '700',
    fontSize: 15,
  },
});