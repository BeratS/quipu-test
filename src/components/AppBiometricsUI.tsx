import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContextType } from "../contexts/AuthContext";
import { useAppStyle } from "../hooks/useAppColors";

interface IProps extends Pick<AuthContextType, 'signOut' | 'unlockWithBiometrics'> {}

export default function AppBiometricsUI({
  signOut,
  unlockWithBiometrics
}: IProps) {

    const { styles: globalStyles } = useAppStyle();
    
    const handleBiometricAuth = async () => {
        try {
            await unlockWithBiometrics();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: any) {
            Alert.alert(
                'Unable using Biometric',
                'An error occurred during biometric authentication. Please try again.'
            );
        }
    }

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error: any) {
            Alert.alert(
                'Server Error!',
                error.message || 'An error occurred during sign out. Please try again.'
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>
                🫆
            </Text>
            <Text style={[globalStyles.title, styles.title]}>
                Biometrics unlock
            </Text>
            <Text style={globalStyles.subtitle}>
                Unlock with Face ID / Fingerprint
            </Text>

            <TouchableOpacity
                style={[globalStyles.button, styles.primaryButton]}
                onPress={handleBiometricAuth}>
                <Text style={globalStyles.buttonText}>
                    Unlock it
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.buttonGhost]}
                onPress={handleLogout}>
                <Text style={styles.buttonGhostText}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  icon: {
    fontSize: 48,
    marginBottom: 16,
  },

  title: {
    marginBottom: 16,
  },

  primaryButton: {
    paddingHorizontal: 32,
    marginBottom: 18,
  },

  buttonGhostText: {
    color: '#e63946',
    fontSize: 14,
    fontWeight: '600',
  },
});
