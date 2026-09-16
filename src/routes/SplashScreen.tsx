import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default function SplashScreen() {
  return (
    <View style={styles.center}>
      <ActivityIndicator testID="splash-indicator" size="large" color="#004f95" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});