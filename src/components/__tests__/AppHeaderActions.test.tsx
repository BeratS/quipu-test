import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppHeaderActions from '../AppHeaderActions';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('AppHeaderActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the profile action', async () => {
    const { getByText } = await render(<AppHeaderActions />);

    expect(getByText('👤')).toBeTruthy();
  });

  it('navigates to the profile screen when pressed', async () => {
    const { getByText } = await render(<AppHeaderActions />);

    await fireEvent.press(getByText('👤'));

    expect(mockNavigate).toHaveBeenCalledWith('User Profile');
  });
});
