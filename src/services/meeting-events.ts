import { auth, db } from '../utils/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  date: string; // ISO format: YYYY-MM-DD
  hour: string; // e.g. "09:00 AM"
  userId?: string;
  createdAt?: unknown;
}

const EVENTS_COLLECTION = 'events';

/**
 * Fetch all booked hours for a given date (One-time fetch)
 */
export const fetchBookedHoursByDate = async (dateIsoString: string): Promise<string[]> => {
  try {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const q = query(eventsRef, where('date', '==', dateIsoString));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data().hour as string);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return [];
  }
};

/**
 * Subscribe to real-time events for a given date
 */
export const subscribeToEventsByDate = (
  dateIsoString: string,
  onUpdate: (events: CalendarEvent[]) => void
) => {
  const eventsRef = collection(db, EVENTS_COLLECTION);
  const q = query(eventsRef, where('date', '==', dateIsoString));

  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot) {
        onUpdate([]);
        return;
      }

      // Map doc data and include the Firestore document ID
      const events = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...(docSnapshot.data() as Omit<CalendarEvent, 'id'>),
      }));

      onUpdate(events);
    },
    (error) => {
      console.error('Error subscribing to events:', error);
      onUpdate([]);
    }
  );
};

/**
 * Save a new event to Firestore
 */
export const createEvent = async (event: Omit<CalendarEvent, 'userId'>): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User must be logged in to create an event.');
  }

  const eventsRef = collection(db, EVENTS_COLLECTION);
  await addDoc(eventsRef, {
    ...event,
    userId: currentUser.uid,
    createdAt: serverTimestamp(),
  });
};

/**
 * Update an existing event in Firestore
 */
export const updateEvent = async (
  eventId: string,
  data: Partial<Pick<CalendarEvent, 'title' | 'description' | 'hour' | 'date'>>
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User must be logged in to update an event.');
  }

  const eventRef = doc(db, EVENTS_COLLECTION, eventId);

  await updateDoc(eventRef, {
    ...data,
    userId: currentUser.uid, // Explicitly send userId with payload
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete an event from Firestore by ID
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('User must be logged in to delete an event.');
  }

  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  await deleteDoc(eventRef);
};