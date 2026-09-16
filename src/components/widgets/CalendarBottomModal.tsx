import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppStyle } from '../../hooks/useAppColors';
import { CustomCalendar } from './CustomCalendar';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export interface CalendarBottomModalProps {
    isVisible: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
}

export const CalendarBottomModal = ({
    isVisible,
    onClose,
    selectedDate,
    onDateSelect,
}: CalendarBottomModalProps) => {

    const { styles: globalStyles } = useAppStyle();

    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    // Slide up/down animations
    useEffect(() => {
        if (isVisible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, translateY]);

    // Handle drag-down to dismiss
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 120) {
                    onClose();
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const handleSelectDate = (date: Date) => {
        onDateSelect(date);
        onClose();
    };

    return (
        <Modal
            testID="calendar-modal"
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={globalStyles.modalOverlay}>
                {/* Backdrop tap to close */}
                <TouchableOpacity
                    testID="calendar-modal-backdrop"
                    style={globalStyles.modalBackdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                {/* Animated Bottom Sheet Card */}
                <Animated.View
                    style={[
                        styles.modalSheetContainer,
                        globalStyles.modalSheetContainer,
                        { transform: [{ translateY }] },
                    ]}
                >
                    {/* Drag Handle Bar */}
                    <View style={globalStyles.dragHandleContainer} {...panResponder.panHandlers}>
                        <View style={globalStyles.dragHandle} />
                        <Text style={globalStyles.modalHeaderTitle}>Select Date</Text>
                    </View>

                    {/* Calendar Component */}
                    <CustomCalendar
                        selectedDate={selectedDate}
                        onDateSelect={handleSelectDate}
                        style={styles.calendarStyle}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    calendarStyle: {
        elevation: 0,
        shadowOpacity: 0,
    },
    modalSheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 32,
        paddingHorizontal: 8,
        maxHeight: SCREEN_HEIGHT * 0.8,
    },
});