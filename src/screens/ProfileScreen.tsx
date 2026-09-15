import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAlert } from '../hooks/useAlert';
import { useAppStyle } from '../hooks/useAppColors';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen(): React.JSX.Element {
  const { user, signed, signOut } = useAuth();
  const { showAlert } = useAlert();
  const { styles: globalStyles, colors } = useAppStyle();


  const handleSignOut = async () => {
    showAlert({
      title: 'signOutButton',
      message: 'Are you sure you want to sign out?',
      actionFn: async () => {
        try {
          await signOut();
        } catch (error: any) {
          showAlert({
            title: 'signOutButton Failed',
            message: error?.message || 'An error occurred during sign out.',
            actionFn: () => {},
          });
        }
      },
    });
  };

  return (
    <LinearGradient
      colors={colors.gradient}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={globalStyles.keyboardView}
    >
      <View style={[globalStyles.containerNoColor, styles.container]}>
        <Text style={[globalStyles.title, styles.title]}>My Profile</Text>

        <View style={globalStyles.avatar}>
          <Text style={globalStyles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardLabel}>Email</Text>
          <Text style={globalStyles.cardValue}>
            {user?.email || 'No email available'}
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardLabel}>Full Name</Text>
          <Text style={globalStyles.cardValue}>
            {user?.displayName || 'Please set your full name'}
          </Text>
        </View>

        <View style={styles.actionContainer}>

        <TouchableOpacity
          style={[globalStyles.button, styles.signOutButton, !signed && globalStyles.buttonDisabled]}
          onPress={handleSignOut}
          disabled={!signed}
          activeOpacity={0.7}
        >
          {!signed ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={globalStyles.buttonText}>Sign Out</Text>
          )}
        </TouchableOpacity>
      </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },

  title: {
    marginBottom: 10,
  },

  actionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },

  signOutButton: {
    marginTop: 25,
    backgroundColor: '#dc3545',
  }
});