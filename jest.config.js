module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@react-navigation|@react-native-firebase|firebase|@firebase|@react-native-async-storage)'
  ],
};
