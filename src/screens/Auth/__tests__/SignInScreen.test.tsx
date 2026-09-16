import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SignInScreen from '../SignInScreen';

// 1. Mock dependencies
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockSignIn = jest.fn();
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
}));

jest.mock('../../../hooks/useAppColors', () => ({
  useAppStyle: () => ({
    styles: {
      keyboardView: {},
      containerNoColor: {},
      containerGrow: {},
      title: {},
      inputGroup: {},
      label: {},
      input: {},
      inputError: {},
      errorText: {},
      button: {},
      buttonDisabled: {},
      buttonText: {},
    },
    colors: {
      gradient: ['#000', '#fff'],
      white: '#fff',
      textMuted: '#666',
      primary: '#0066cc',
    },
  }),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('SignInScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders input fields and buttons correctly', async () => {
    const { getByPlaceholderText, getByText } = await render(<SignInScreen />);

    expect(getByText('Welcome to Quipu App')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('submits form successfully when valid data is entered', async () => {
    mockSignIn.mockResolvedValueOnce(undefined);

    const { getByPlaceholderText, getByText } = await render(<SignInScreen />);

    // Fill in inputs
    await fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    await fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');

    // Submit form
    await fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows alert when signIn fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { findByPlaceholderText, findByText } = await render(<SignInScreen />);

    await fireEvent.changeText(await findByPlaceholderText('Enter your email'), 'test@example.com');
    await fireEvent.changeText(await findByPlaceholderText('Enter your password'), 'wrongpass');

    await fireEvent.press(await findByText('Sign In'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Sign In Failed', 'Invalid credentials');
    });
  });

  it('navigates to Sign Up screen when link is pressed', async () => {
    const { findByText } = await render(<SignInScreen />);

    await fireEvent.press(await findByText('Sign Up'));

    expect(mockNavigate).toHaveBeenCalled();
  });
});