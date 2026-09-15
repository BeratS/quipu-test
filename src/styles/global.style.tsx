import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
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

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 32,
      textAlign: 'center',
      color: colors.text,
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

    button: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
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
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
    },

    cardLabel: {
      fontSize: 13,
      color: '#777',
      marginBottom: 5,
    },

    cardValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
  });
