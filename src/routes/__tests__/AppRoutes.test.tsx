import React from 'react';
import { render } from '@testing-library/react-native';
import AppRoutes from '../AppRoutes';

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

jest.mock('../../screens/MainAppScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Main App Screen Component</Text>;
});

jest.mock('../../screens/ProfileScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Profile Screen Component</Text>;
});

jest.mock('../../components/AppHeaderActions', () => {
  const { Text } = require('react-native');
  return () => <Text>Header Actions</Text>;
});

jest.mock('../../components/AppHeaderLogo', () => {
  const { Text } = require('react-native');
  return () => <Text>Header Logo</Text>;
});

describe('AppRoutes', () => {
  it('registers the main app and profile screens', async () => {
    const { getByText } = await render(<AppRoutes />);

    expect(getByText('Main App Screen')).toBeTruthy();
    expect(getByText('User Profile')).toBeTruthy();
    expect(getByText('Main App Screen Component')).toBeTruthy();
    expect(getByText('Profile Screen Component')).toBeTruthy();
  });
});
