import React from 'react';
import { render } from '@testing-library/react-native';
import AppHeaderLogo from '../AppHeaderLogo';

describe('AppHeaderLogo', () => {
  it('renders the application name', async () => {
    const { getByText } = await render(<AppHeaderLogo />);

    expect(getByText('Quipu App')).toBeTruthy();
  });
});
