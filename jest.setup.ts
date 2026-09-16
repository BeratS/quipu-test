import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock(
  "@react-native-async-storage/async-storage",
  () => mockAsyncStorage
);

// Mock the React Native Firebase App module
jest.mock('@react-native-firebase/app', () => {
  return {
    getApp: jest.fn(() => ({
      auth: jest.fn(),
      firestore: jest.fn(),
    }))
  };
});

// Mock individual modules you are utilizing (e.g., Auth)
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    getAuth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
      createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
      signOut: jest.fn(() => Promise.resolve()),
      onAuthStateChanged: jest.fn((callback) => {
        callback({ uid: 'mocked-user-id' });
        return jest.fn(); // Unsubscribe function mock
      }),
    }))
  });
});

// Mock individual modules you are utilizing (e.g., Auth)
jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    getFirestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          set: jest.fn(() => Promise.resolve()),
          get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
        })),
      })),
    }))
  });
});