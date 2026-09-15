// Initialize the app instance from the app firebase module
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

// Export firebase instances
export const app = getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);