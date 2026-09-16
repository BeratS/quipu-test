import React from 'react';
import { render } from '@testing-library/react-native';
import AuthRoutes from '../AuthRoutes';

jest.mock('@react-navigation/native-stack', () => {
  const { Text, View } = require('react-native');

  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => (
        <View>{children}</View>
      ),
      Screen: ({
        name,
        component: Component,
      }: {
        name: string;
        component: React.ComponentType;
      }) => (
        <View>
          <Text>{name}</Text>
          <Component />
        </View>
      ),
    }),
  };
});

jest.mock('../../screens/Auth/SignInScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Sign In Screen Component</Text>;
});

jest.mock('../../screens/Auth/SignUpScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Sign Up Screen Component</Text>;
});

describe('AuthRoutes', () => {
  it('registers the sign-in and sign-up screens', async () => {
    const { getByText } = await render(<AuthRoutes />);

    expect(getByText('Sign In Screen')).toBeTruthy();
    expect(getByText('Sign Up Screen')).toBeTruthy();
    expect(getByText('Sign In Screen Component')).toBeTruthy();
    expect(getByText('Sign Up Screen Component')).toBeTruthy();
  });
});
