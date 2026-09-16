import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SignUpScreen from '../SignUpScreen';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockSignUp = jest.fn();
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
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

describe('SignUpScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders title, inputs, and action buttons correctly', async () => {
    const { getByText, getByPlaceholderText } = await render(<SignUpScreen />);

    expect(getByText('Create Quipu Account')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Create a password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account?')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('submits the form successfully with valid inputs', async () => {
    mockSignUp.mockResolvedValueOnce(undefined);

    const { getByPlaceholderText, getByText } = await render(<SignUpScreen />);

    await fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    await fireEvent.changeText(getByPlaceholderText('Create a password'), 'Password123!');
    await fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'Password123!');

    await fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'Password123!');
    });
  });

  it('displays an Alert when signUp authentication fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    mockSignUp.mockRejectedValueOnce(new Error('Email already in use'));

    const { findByPlaceholderText, findByText } = await render(<SignUpScreen />);

    await fireEvent.changeText(await findByPlaceholderText('Enter your email'), 'existing@example.com');
    await fireEvent.changeText(await findByPlaceholderText('Create a password'), 'Password123!');
    await fireEvent.changeText(await findByPlaceholderText('Confirm your password'), 'Password123!');

    await fireEvent.press(await findByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Sign Up Failed', 'Email already in use');
    });
  });

  it('navigates back to the Sign In screen when pressing the Sign In link', async () => {
    const { findByText } = await render(<SignUpScreen />);

    await fireEvent.press(await findByText('Sign In'));

    expect(mockNavigate).toHaveBeenCalled();
  });
});