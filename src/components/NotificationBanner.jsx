import { Bell, BellRing, BellOff } from 'lucide-react';

export default function NotificationBanner({ notifPermission, requestPermission }) {
  if (notifPermission === 'granted') {
    return (
      <div className="mb-4 py-2 px-4 bg-green-500/30 rounded-xl flex items-center justify-center gap-2 text-white border-2 border-green-400/50">
        <Bell className="w-5 h-5" />
        <span className="font-bold">Notificaciones ✓</span>
      </div>
    );
  }

  return (
    <button
      onClick={requestPermission}
      className="w-full mb-4 py-3 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center gap-2 text-white border-2 border-white/30 font-bold"
    >
      {notifPermission === 'denied' ? (
        <>
          <BellOff className="w-5 h-5" />
          <span>Bloqueadas</span>
        </>
      ) : (
        <>
          <BellRing className="w-5 h-5" />
          <span>Activar notificaciones</span>
        </>
      )}
    </button>
  );
}
