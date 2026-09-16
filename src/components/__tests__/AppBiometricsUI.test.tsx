import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AppBiometricsUI from '../AppBiometricsUI';

jest.mock('../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    styles: {
      title: {},
      subtitle: {},
      button: {},
      buttonGhost: {},
      buttonText: {},
    },
  }),
}));

describe('AppBiometricsUI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the biometric unlock controls', async () => {
    const { getByText } = await render(
      <AppBiometricsUI
        signOut={jest.fn()}
        unlockWithBiometrics={jest.fn()}
      />,
    );

    expect(getByText('Biometrics unlock')).toBeTruthy();
    expect(getByText('Unlock with Face ID / Fingerprint')).toBeTruthy();
    expect(getByText('Unlock it')).toBeTruthy();
    expect(getByText('Log Out')).toBeTruthy();
  });

  it('unlocks with biometrics when the unlock button is pressed', async () => {
    const unlockWithBiometrics = jest.fn().mockResolvedValue(undefined);
    const { getByText } = await render(
      <AppBiometricsUI
        signOut={jest.fn()}
        unlockWithBiometrics={unlockWithBiometrics}
      />,
    );

    await fireEvent.press(getByText('Unlock it'));

    expect(unlockWithBiometrics).toHaveBeenCalledTimes(1);
  });

  it('signs out when the logout button is pressed', async () => {
    const signOut = jest.fn().mockResolvedValue(undefined);
    const { getByText } = await render(
      <AppBiometricsUI
        signOut={signOut}
        unlockWithBiometrics={jest.fn()}
      />,
    );

    await fireEvent.press(getByText('Log Out'));

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it('shows an alert when biometric unlock fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = await render(
      <AppBiometricsUI
        signOut={jest.fn()}
        unlockWithBiometrics={jest.fn().mockRejectedValue(new Error('Unavailable'))}
      />,
    );

    await fireEvent.press(getByText('Unlock it'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Unable using Biometric',
        'An error occurred during biometric authentication. Please try again.',
      );
    });
  });

  it('shows an alert when logout fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = await render(
      <AppBiometricsUI
        signOut={jest.fn().mockRejectedValue(new Error('Server unavailable'))}
        unlockWithBiometrics={jest.fn()}
      />,
    );

    await fireEvent.press(getByText('Log Out'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Server Error!', 'Server unavailable');
    });
  });

});
