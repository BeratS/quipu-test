import React, { useMemo, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { useAppStyle } from '../../hooks/useAppColors';
import { getCalendarDays, MONTHS, WEEKDAYS } from '../../utils/date-helper';


export interface ICalendarProps {
    selectedDate?: Date | null;
    onDateSelect?: (date: Date) => void;
    style?: ViewStyle;
}

export const CustomCalendar = ({
    selectedDate = null,
    onDateSelect,
    style,
}: ICalendarProps) => {
    const { styles: globalStyles, colors } = useAppStyle();

    const [activeDate, setActiveDate] = useState<Date>(new Date());

    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();

    // Generate Custom Calendar
    const calendarDays = useMemo(
        () => getCalendarDays(year, month, selectedDate),
        [year, month, selectedDate]
    );

    const changeMonth = (offset: number) => {
        setActiveDate(new Date(year, month + offset, 1));
    };

    return (
        <View style={[globalStyles.calendar, style]}>
            {/* Month Navigation Header */}
            <View style={globalStyles.header}>
                <TouchableOpacity
                    onPress={() => changeMonth(-1)}
                    style={globalStyles.calendarNavButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={[globalStyles.calendarText, { color: colors.primary }]}>‹</Text>
                </TouchableOpacity>

                <Text style={globalStyles.calendarMonthText}>
                    {MONTHS[month]} {year}
                </Text>

                <TouchableOpacity
                    onPress={() => changeMonth(1)}
                    style={globalStyles.calendarNavButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={[globalStyles.calendarText, { color: colors.primary }]}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Weekday Row Header */}
            <View style={globalStyles.calendarWeekRow}>
                {WEEKDAYS.map((day) => (
                    <Text key={day} style={globalStyles.calendarWeekDayText}>
                        {day}
                    </Text>
                ))}
            </View>

            {/* Grid of Days */}
            <View style={globalStyles.calendarDaysGrid}>
                {calendarDays.map((dayItem) => {
                    const { date, isCurrentMonth, isToday, isSelected } = dayItem;

                    return (
                        <TouchableOpacity
                            key={date.toISOString()}
                            style={globalStyles.calendarDayCellContainer}
                            disabled={!isCurrentMonth}
                            onPress={() => onDateSelect && onDateSelect(date)}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    globalStyles.calendarDayCell,
                                    isSelected && { backgroundColor: colors.primary },
                                ]}
                            >
                                <Text
                                    style={[
                                        globalStyles.calendarDayText,
                                        !isCurrentMonth && globalStyles.calendarText,
                                        isToday && !isSelected && { color: colors.primary },
                                        isSelected && globalStyles.calendarSelectedText,
                                    ]}
                                >
                                    {date.getDate()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
