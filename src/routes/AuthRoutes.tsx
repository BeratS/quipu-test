import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONSTANTS } from '../Constants';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    {/* Sign In Screen Stack */}
    <AuthStack.Screen
      name={CONSTANTS.SCREENS.SIGN_IN}
      component={SignInScreen}
      options={{ headerShown: false }}
    />

    {/* Sign Up Screen Stack */}
    <AuthStack.Screen
      name={CONSTANTS.SCREENS.SIGN_UP}
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
