import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as userSignOut,
  User,
  UserCredential
} from '@react-native-firebase/auth';
import React, { createContext, ReactNode, useEffect, useEffectEvent, useState } from 'react';
import { auth } from '../utils/firebase';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rnBiometrics = new ReactNativeBiometrics();

const BIOMETRIC_ENABLED_KEY = '@biometric_enabled';

export interface AuthContextType {
  user: User | null;
  signed: boolean;
  loading: boolean;
  // biometric state
  isBiometricsAvailable: boolean;
  isBiometricAuthEnabled: boolean;
  // auth methods
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  // biometric methods
  enableBiometrics: () => Promise<boolean>;
  disableBiometrics: () => Promise<void>;
  unlockWithBiometrics: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);
  const [isBiometricAuthEnabled, setIsBiometricAuthEnabled] = useState(false);

  const initializeBiometrics = useEffectEvent(async () => {
    try {
      // Check whether device has biometric hardware
      const {
        available,
        biometryType,
      } = await rnBiometrics.isSensorAvailable();

      const biometricAvailable =
        available &&
        (
          biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.Biometrics
        );

      console.debug('Biometric status:', biometricAvailable, biometryType);

      setIsBiometricsAvailable(biometricAvailable);

      // Check whether user previously enabled biometric unlock
      const enabled = await AsyncStorage.getItem(
        BIOMETRIC_ENABLED_KEY
      );

      setIsBiometricAuthEnabled(enabled === 'true');
    } catch (error) {
      console.error(
        'Failed to initialize biometrics:',
        error
      );

      setIsBiometricsAvailable(false);
      setIsBiometricAuthEnabled(false);
    }
  });


  useEffect(() => {
    // Check biometric availability on device mount
    initializeBiometrics()

    // Set listenrr for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async (): Promise<void> => {
    try {
      await userSignOut(auth);

      // Disable biometric login when user explicitly signs out.
      await AsyncStorage.removeItem(
        BIOMETRIC_ENABLED_KEY
      );

      setIsBiometricAuthEnabled(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  /**
  * Enable biometric unlock
  * */
  const enableBiometrics = async (): Promise<boolean> => {
    if (!user || !isBiometricsAvailable) return false;

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm biometric authentication',
      });

      if (!success) return false;

      await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');

      setIsBiometricAuthEnabled(true);

      return true;
    } catch (error) {
      console.error('Enable biometrics error:', error);

      return false;
    }
  };

  /**
   * Disable biometric unlock
   */
  const disableBiometrics = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(BIOMETRIC_ENABLED_KEY);

      setIsBiometricAuthEnabled(false);
    } catch (error) {
      console.error('Disable biometrics error:', error);
    }
  };

  /**
   * Unlock using Face ID / Touch ID / fingerprint
   */
  const unlockWithBiometrics = async (): Promise<boolean> => {
    console.debug('Biometric authentication init:');
    if (!isBiometricsAvailable || !isBiometricAuthEnabled) return false;

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to unlock your account',
      });

      console.debug('Biometric authentication result:', success);

      return success;
    } catch (error) {
      console.debug('Biometric authentication error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      signed: !!user,
      loading,
      isBiometricsAvailable,
      isBiometricAuthEnabled: isBiometricAuthEnabled,
      signUp,
      signIn,
      signOut,
      enableBiometrics,
      disableBiometrics,
      unlockWithBiometrics,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
