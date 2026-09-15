import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppHeaderActions from '../components/AppHeaderActions';
import AppHeaderLogo from '../components/AppHeaderLogo';
import { CONSTANTS } from '../Constants';
import MainAppScreen from '../screens/MainAppScreen';
import ProfileScreen from '../screens/ProfileScreen';


const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator>
      {/* Main App Screen */}
      <AppStack.Screen
        name={CONSTANTS.SCREENS.MAIN_APP}
        component={MainAppScreen}
        options={({}) => ({
          headerBackVisible: false,
          headerTitle: AppHeaderLogo,
          headerRight: AppHeaderActions,
        })}
      />

      {/* Profile Screen */}
      <AppStack.Screen
        name={CONSTANTS.SCREENS.PROFILE}
        component={ProfileScreen}
        options={({}) => ({
          headerBackVisible: true,
          // headerTitle: () => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Profile</Text>,
        })}
      />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
