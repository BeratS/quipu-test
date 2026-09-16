import React from 'react';
import { render } from '@testing-library/react-native';
import Routes from '../index';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../AppRoutes', () => {
  const { Text } = require('react-native');
  return function MockAppRoutes() {
    return <Text>App Routes</Text>;
  };
});

jest.mock('../AuthRoutes', () => {
  const { Text } = require('react-native');
  return function MockAuthRoutes() {
    return <Text>Auth Routes</Text>;
  };
});

jest.mock('../SplashScreen', () => {
  const { Text } = require('react-native');
  return function MockSplashScreen() {
    return <Text>Splash Screen</Text>;
  };
});

jest.mock('../../components/AppBiometricsUI', () => {
  const { Text } = require('react-native');
  return function MockAppBiometricsUI() {
    return <Text>Biometrics UI</Text>;
  };
});

import { useAuth } from '../../hooks/useAuth';

describe('Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the splash screen while authentication is loading', async () => {
    (useAuth as jest.Mock).mockReturnValue({ loading: true });

    const { getByText } = await render(<Routes />);

    expect(getByText('Splash Screen')).toBeTruthy();
  });

  it('shows auth routes when the user is signed out', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      loading: false,
      signed: false,
    });

    const { getByText } = await render(<Routes />);

    expect(getByText('Auth Routes')).toBeTruthy();
  });

  it('shows biometric authentication when it is enabled', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      loading: false,
      signed: true,
      isBiometricsAvailable: true,
      isBiometricAuthEnabled: true,
      signOut: jest.fn(),
      unlockWithBiometrics: jest.fn(),
    });

    const { getByText } = await render(<Routes />);

    expect(getByText('Biometrics UI')).toBeTruthy();
  });

  it('shows app routes for a signed-in user without biometric authentication', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      loading: false,
      signed: true,
      isBiometricsAvailable: false,
      isBiometricAuthEnabled: false,
    });

    const { getByText } = await render(<Routes />);

    expect(getByText('App Routes')).toBeTruthy();
  });
});
