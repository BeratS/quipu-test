import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppStyle } from '../../hooks/useAppColors';

export interface IProps {
    slot: string;
    title: string;
    isBooked: boolean;
    onPressSlot: (slot: string) => void;
}

export const CalendarTimeRow = memo(({
    slot,
    title,
    isBooked,
    onPressSlot,
}: IProps) => {

    const { colors } = useAppStyle();

    return (
        <View style={styles.timeRow}>
            {/* Time Label Column */}
            <View style={styles.timeLabelContainer}>
                <Text style={[styles.timeLabelText, { color: colors.textMuted }]}>{slot}</Text>
            </View>

            {/* Grid Content Column */}
            <View style={styles.gridContentContainer}>
                <View style={[styles.gridLine, { backgroundColor: colors.surface }]} />

                <TouchableOpacity
                    activeOpacity={isBooked ? 1 : 0.7}
                    style={[
                        styles.slotBlock,
                        {
                            backgroundColor: isBooked ? colors.primary : colors.bookedBlock,
                            borderColor: isBooked ? colors.primaryDark : colors.bookedDarkBlock,
                        }
                    ]}
                    onPress={() => onPressSlot(slot)}
                >
                    <Text
                        style={[
                            styles.eventTitle,
                            { color: isBooked ? colors.white : colors.primary }
                        ]}
                    >
                        {isBooked ? title || 'Booked Event' : '+ Tap to schedule'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    timeRow: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'flex-start',
    },

    timeLabelContainer: {
        width: 65,
        paddingRight: 10,
        alignItems: 'flex-end',
        marginTop: -7,
    },

    timeLabelText: {
        fontSize: 12,
        fontWeight: '500',
    },

    gridContentContainer: {
        flex: 1,
        height: '100%',
        paddingRight: 16,
        position: 'relative',
    },

    gridLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
    },

    slotBlock: {
        marginTop: 4,
        height: 54,
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },

    availableBlock: {
        borderWidth: 1,
        borderStyle: 'dashed',
    },

    bookedBlock: {
        borderLeftWidth: 4,
    },

    eventTitle: {
        fontSize: 13,
        fontWeight: '600',
    },
});