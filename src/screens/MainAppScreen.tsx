import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarBottomModal } from "../components/widgets/CalendarBottomModal";
import { useAppStyle } from "../hooks/useAppColors";
import { CalendarTimeSlot } from "../modules/main/CalendarTimeSlot";
import { nextDate, prevDate } from "../utils/date-helper";

function MainAppScreen() {

    const { styles: globalStyles, colors } = useAppStyle();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Navigate to previous and next day
    const handlePrevDate = () => {
        setSelectedDate((date) => prevDate(date));
    };

    const handleNextDate = () => {
        setSelectedDate((date) => nextDate(date));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selected Date:</Text>

            <View style={styles.pickerButtonContainer}>
                <TouchableOpacity
                    testID="previous-date-button"
                    style={styles.pickerButton}
                    onPress={handlePrevDate}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={[globalStyles.calendarText, { color: colors.primary }]}>‹</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    testID="date-picker-button"
                    style={[styles.pickerButton, styles.pickerButtonFull]}
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.pickerButtonText}>
                        {selectedDate ? selectedDate.toDateString() : 'Select a Date'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    testID="next-date-button"
                    style={styles.pickerButton}
                    onPress={handleNextDate}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={[globalStyles.calendarText, { color: colors.primary }]}>›</Text>
                </TouchableOpacity>
            </View>

            <CalendarBottomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedDate={selectedDate}
                onDateSelect={(date) => setSelectedDate(date)}
            />

            {selectedDate ? (
                <CalendarTimeSlot
                    selectedDate={selectedDate}
                />
            ) : (
                <Text>
                    Please select a date to view available time slots.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
        marginBottom: 8,
    },

    pickerButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },

    pickerButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 8,
    },

    pickerButtonFull: {
        flex: 1
    },

    pickerButtonText: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
});

export default MainAppScreen