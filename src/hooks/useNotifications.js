import { useState, useEffect } from 'react';

export function useNotifications(habits) {
  const [notifPermission, setNotifPermission] = useState('default');
  const [lastNotified, setLastNotified] = useState({});

  useEffect(() => {
    if ('Notification' in window) setNotifPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const p = await Notification.requestPermission();
      setNotifPermission(p);
    }
  };

  useEffect(() => {
    if (notifPermission !== 'granted') return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const today = now.toDateString();

      habits.forEach(habit => {
        if (habit.time === currentTime && !habit.completed) {
          const key = `${habit.id}-${today}`;
          if (!lastNotified[key]) {
            new Notification('⏰ Recordatorio', { body: `¡Es hora de: ${habit.name}!` });
            setLastNotified(prev => ({ ...prev, [key]: true }));
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [habits, notifPermission, lastNotified]);

  return { notifPermission, requestPermission };
}
