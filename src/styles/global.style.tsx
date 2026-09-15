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
  });
