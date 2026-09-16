import { useEffect, useState } from 'react';
import { CalendarEvent, subscribeToEventsByDate } from '../services/meeting-events';
import { getDateISO } from '../utils/date-helper';

export function useBookedSlots(selectedDate: Date) {
  const [bookedEvents, setBookedEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dateKey = getDateISO(selectedDate)

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToEventsByDate(dateKey, (events) => {
      setBookedEvents(events);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dateKey]);

  // Extract all booked hours meeting events
  const bookedHours = bookedEvents.map((event) => event.hour);

  // Get Full Meeting Events Details
  const getEventByHour = (hour: string) => {
    return bookedEvents.find((event) => event.hour === hour);
  };

  return {
    bookedEvents,
    bookedHours,
    getEventByHour,
    loading,
  };
}