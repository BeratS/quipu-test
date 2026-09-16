import { render } from '@testing-library/react-native';
import React from 'react';
import SplashScreen from '../SplashScreen';

describe('SplashScreen', () => {
  it('renders a loading indicator', async () => {
    const { getByTestId } = await render(<SplashScreen />);
    const indicator = getByTestId('splash-indicator');

    expect(indicator.props).toEqual(
      expect.objectContaining({
        size: 'large',
        color: '#004f95',
      }),
    );
  });
});
