import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { CalendarTimeRow } from '../../components/widgets/CalendarTimeRow';
import { useBookedSlots } from '../../hooks/useBookedMeetingEvents';
import { HOURLY_SLOTS } from '../../utils/date-helper';
import CreateSlotMeetingModal from './CreateSlotMeetingModal';
import { useAppStyle } from '../../hooks/useAppColors';
import { CalendarEvent } from '../../services/meeting-events';

export interface IProps {
  selectedDate: Date;
}

export const CalendarTimeSlot = ({ selectedDate }: IProps) => {
  const { colors } = useAppStyle();

  const { bookedHours, getEventByHour, loading } = useBookedSlots(selectedDate);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [slotDetails, setSlotDetails] = useState<CalendarEvent | undefined | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSlotPress = useCallback((hour: string) => {
    setSelectedSlot(hour);
    const event = getEventByHour(hour);
    setSlotDetails(event)
    setModalVisible(true);
  }, [getEventByHour]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedSlot(null);
    setSlotDetails(null)
  }, []);

  const renderTimeRow = ({ item: slot }: { item: string }) => {
    const event = getEventByHour(slot);

    return (
      <CalendarTimeRow
        slot={slot}
        isBooked={!!event}
        title={event?.title ?? ''}
        onPressSlot={handleSlotPress}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>

      {/* List Timeline Slots */}
      <FlatList
        data={HOURLY_SLOTS}
        keyExtractor={(item) => item}
        renderItem={renderTimeRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.timelineContainer}
        refreshing={loading}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              testID="loading-indicator"
              color={colors.primary}
              style={styles.loader} />
          ) : undefined
        }
      />

      {/* Create New Meeting Modal */}
      <CreateSlotMeetingModal
        visible={modalVisible}
        initialDate={selectedDate}
        initialHour={selectedSlot ?? ''}
        eventIntials={slotDetails}
        bookedHours={bookedHours}
        onSuccess={handleCloseModal}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },

  loader: {
    marginVertical: 32,
  },

  timelineContainer: {
    paddingVertical: 8,
  },
});