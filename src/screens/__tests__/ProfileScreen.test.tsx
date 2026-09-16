import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../ProfileScreen';

const mockSignOut = jest.fn();
const mockShowAlert = jest.fn();

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../hooks/useAlert', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../../hooks/useAppColors', () => ({
  useAppStyle: jest.fn(),
}));

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');

  return function LinearGradient({ children, ...props }: any) {
    return <View {...props}>{children}</View>;
  };
});

import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { useAppStyle } from '../../hooks/useAppColors';

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'john@example.com',
        displayName: 'John Doe',
      },
      signed: true,
      signOut: mockSignOut,
    });

    (useAlert as jest.Mock).mockReturnValue({
      showAlert: mockShowAlert,
    });

    (useAppStyle as jest.Mock).mockReturnValue({
      colors: {
        gradient: ['#ffffff', '#eeeeee'],
        white: '#ffffff',
      },
      styles: {
        keyboardView: {},
        containerNoColor: {},
        title: {},
        avatar: {},
        avatarText: {},
        card: {},
        cardLabel: {},
        cardValue: {},
        button: {},
        buttonText: {},
        buttonDisabled: {},
      },
    });
  });

  it('renders profile information', async() => {
    const { getByText } = await render(<ProfileScreen />);

    expect(getByText('My Profile')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Full Name')).toBeTruthy();
    expect(getByText('Sign Out')).toBeTruthy();
  });

  it('renders the first letter of the email as the avatar', async() => {
    const { getByText } = await render(<ProfileScreen />);

    expect(getByText('J')).toBeTruthy();
  });

  it('renders fallback values when profile data is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: undefined,
      signed: true,
      signOut: mockSignOut,
    });

    const { getByText } = await render(<ProfileScreen />);

    expect(getByText('U')).toBeTruthy();
    expect(getByText('No email available')).toBeTruthy();
    expect(getByText('Please set your full name')).toBeTruthy();
  });

  it('disables sign out when user is not signed in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'john@example.com',
        displayName: 'John Doe',
      },
      signed: false,
      signOut: mockSignOut,
    });

    const { getByRole } = await render(<ProfileScreen />);

    const button = getByRole('button');

    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('shows confirmation alert when sign out is pressed', async () => {
    const { getByText } = await render(<ProfileScreen />);

    fireEvent.press(getByText('Sign Out'));

    expect(mockShowAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Sign Out',
        message: 'Are you sure you want to sign out?',
        actionFn: expect.any(Function),
      }),
    );
  });

  it('calls signOut after confirming', async () => {
    mockSignOut.mockResolvedValue(undefined);

    const { getByText } = await render(<ProfileScreen />);

    fireEvent.press(getByText('Sign Out'));

    const alertConfig = mockShowAlert.mock.calls[0][0];

    await alertConfig.actionFn();

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('shows an error alert when signOut fails', async () => {
    mockSignOut.mockRejectedValue(new Error('Sign out failed'));

    const { getByText } = await render(<ProfileScreen />);

    fireEvent.press(getByText('Sign Out'));

    const alertConfig = mockShowAlert.mock.calls[0][0];

    await alertConfig.actionFn();

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'signOutButton Failed',
          message: 'Sign out failed',
          actionFn: expect.any(Function),
        }),
      );
    });
  });
});
