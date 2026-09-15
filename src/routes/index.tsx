import React from 'react';

import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import SplashAnimation from './SplashAnimation';
import { useAuth } from '../hooks/useAuth';

const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <SplashAnimation />
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
