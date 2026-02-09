import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

export default function Navigation({ setShowModal, setShowWorld, setShowEquipment, setShowHistory, setShowRewards, setShowStats, setShowIndividualStats, setShowBadHabits, setShowStrikes, theme, t }) {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('Usuario:', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    }
  }, [user]);

  const handleLogout = async () => {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      try {
        await logout();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };

  return (
    <>
      {/* Perfil de usuario en esquina superior derecha */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2 border-2 border-white/30 shadow-2xl">
        {user?.photoURL && !imageError ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Usuario'}
            className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
            referrerPolicy="no-referrer"
            onError={() => {
              console.log('Error cargando imagen, mostrando avatar');
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg">
            <span className="text-white font-bold text-lg">
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm drop-shadow-lg">
            {user?.displayName || 'Usuario'}
          </span>
          <span className="text-white/80 text-xs drop-shadow-lg">
            {user?.email}
          </span>
        </div>
      </div>

      {/* Botón de Equipamiento */}
      <div onClick={() => setShowEquipment(true)} className="fixed bottom-24 left-4 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-amber-300">
          <span className="text-3xl">⚔️</span>
        </div>
        <span className="text-white text-sm mt-1 font-black drop-shadow-xl">{t.equipment}</span>
      </div>

      {/* Botón de Malos Hábitos */}
      <div onClick={() => setShowBadHabits(true)} className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-red-300">
          <span className="text-3xl">🚫</span>
        </div>
        <span className="text-white text-sm mt-1 font-black drop-shadow-xl">{t.abandon}</span>
      </div>

      {/* Botón de Mundo */}
      <div onClick={() => setShowWorld(true)} className="fixed bottom-24 right-4 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-emerald-300">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 2L3 5v16l6-3 6 3 6-3V2l-6 3-6-3z" />
            <path d="M9 2v16" /><path d="M15 5v16" />
          </svg>
        </div>
        <span className="text-white text-sm mt-1 font-black drop-shadow-xl">{t.world}</span>
      </div>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-full px-3 py-3 flex items-center gap-3 border-2 border-white/30 shadow-2xl">
        <button onClick={() => setShowStats(true)} className="text-white font-bold hover:scale-110 transition-transform text-sm">📊</button>
        <button onClick={() => setShowIndividualStats(true)} className="text-white font-bold hover:scale-110 transition-transform text-sm">📈</button>
        <button onClick={() => setShowStrikes(true)} className="text-white font-bold hover:scale-110 transition-transform text-sm">🔥</button>
        <button onClick={() => setShowRewards(true)} className="text-white font-bold hover:scale-110 transition-transform text-sm">🎁</button>
        <button onClick={() => setShowModal(true)} className="w-16 h-16 -mt-10 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-white/40">
          <Plus className={`w-9 h-9 ${theme.textPrimary}`} strokeWidth={3} />
        </button>
        <button onClick={() => setShowHistory(true)} className="text-white font-bold hover:scale-110 transition-transform text-sm">📜</button>
        <button onClick={handleLogout} className="text-white font-bold hover:scale-110 transition-transform text-sm p-2 hover:bg-white/10 rounded-full" title="Cerrar sesión">
          <LogOut className="w-5 h-5" />
        </button>
      </nav>
    </>
  );
}
