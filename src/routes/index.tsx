import React from 'react';

import AppBiometricsUI from '../components/AppBiometricsUI';
import { useAuth } from '../hooks/useAuth';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import SplashAnimation from './SplashScreen';

const Routes = () => {
  const { signed, loading, isBiometricsAvailable, isBiometricAuthEnabled, signOut, unlockWithBiometrics } = useAuth();

  if (loading) {
    // show some loading indicator
    return <SplashAnimation />
  }

  // When user need to sign in through firebase
  if (!signed) {
    return <AuthRoutes />;
  }

  // Check Here biometrics after user is signed in
  if (isBiometricsAvailable && isBiometricAuthEnabled) {
    return <AppBiometricsUI {...{signOut, unlockWithBiometrics}} />
  }

  // User is signed in with both firebase and biometrics
  return <AppRoutes />;
};

export default Routes;
