import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    fullView: {
      flex: 1,
    },

    keyboardView: {
      flex: 1,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
    },

    containerNoColor: {
      flex: 1,
      padding: 24,
    },

    containerGrow: {
      flexGrow: 1,
      justifyContent: 'center',
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 32,
      textAlign: 'center',
      color: colors.text,
    },

    subtitle: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 24,
    },

    inputGroup: {
      marginBottom: 16,
    },

    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 6,
    },

    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 8,
      fontSize: 16,
      color: colors.text,
    },

    inputError: {
      borderColor: colors.error,
    },

    errorText: {
      color: colors.error,
      fontSize: 12,
      marginTop: 4,
    },

    // Button styles ---------------------------------

    button: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
    },

    buttonOutline: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
    },

    buttonGhost: {
      color: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },

    buttonDisabled: {
      opacity: 0.7,
    },

    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },

    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 30,
    },

    avatarText: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.textSecondary,
    },

    // Card styles

    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
    },

    cardLabel: {
      fontSize: 13,
      color: colors.cardLabel,
      marginBottom: 5,
    },

    cardValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cardValue,
    },

    /* ------------ CALENDAR ------------ */

    calendar: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      elevation: 3,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },

    calendarMonthText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.calendarMonthText,
    },

    calendarNavButton: {
      paddingHorizontal: 12,
      paddingVertical: 4,
    },

    calendarNavText: {
      fontSize: 26,
      fontWeight: '600',
    },

    calendarWeekRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },

    calendarWeekDayText: {
      width: '14.28%',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },

    calendarDaysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    calendarDayCellContainer: {
      width: '14.28%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
    },

    calendarDayCell: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },

    calendarDayText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textSecondary,
    },

    calendarText: {
      color: colors.textMuted,
    },

    calendarSelectedText: {
      color: colors.white,
      fontWeight: '700',
    },

    /* ------------ MODAL ------------ */
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modalBackdrop: {
      ...StyleSheet.absoluteFill,
    },

    modalSheetContainer: {
      backgroundColor: colors.white,
    },

    dragHandleContainer: {
      paddingVertical: 12,
      alignItems: 'center',
    },

    dragHandle: {
      width: 40,
      height: 5,
      backgroundColor: colors.surface,
      borderRadius: 3,
      marginBottom: 10,
    },

    modalHeaderTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.calendarMonthText,
    },
  });
