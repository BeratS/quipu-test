import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// 1. Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
  };
});

// 2. Mock AuthProvider and Contexts
jest.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// 3. Mock Routes component
jest.mock('../routes', () => {
  const { Text } = require('react-native');
  return function MockRoutes() {
    return <Text testID="mock-routes">Mocked Routes Component</Text>;
  };
});

// 4. Mock React Navigation Container
jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('App Component', () => {
  // 1. Mark test function as async
  it('renders correctly without crashing', async () => {
    // 2. Await the render call
    const { getByTestId } = await render(<App />);
    
    expect(getByTestId('mock-routes')).toBeTruthy();
  });

  it('matches snapshot', async () => {
    const component = await render(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});