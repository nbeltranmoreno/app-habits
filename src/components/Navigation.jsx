import { Plus } from 'lucide-react';

export default function Navigation({ setShowModal, setShowWorld, setShowEquipment }) {
  return (
    <>
      {/* Botón de Equipamiento */}
      <div onClick={() => setShowEquipment(true)} className="fixed bottom-24 left-4 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-amber-300">
          <span className="text-3xl">⚔️</span>
        </div>
        <span className="text-white text-sm mt-1 font-black drop-shadow-xl">Equipo</span>
      </div>

      {/* Botón de Mundo */}
      <div onClick={() => setShowWorld(true)} className="fixed bottom-24 right-4 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-emerald-300">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 2L3 5v16l6-3 6 3 6-3V2l-6 3-6-3z" />
            <path d="M9 2v16" /><path d="M15 5v16" />
          </svg>
        </div>
        <span className="text-white text-sm mt-1 font-black drop-shadow-xl">Mundo</span>
      </div>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-full px-8 py-3 flex items-center gap-12 border-2 border-white/30 shadow-2xl">
        <button className="text-white font-bold">Hoy</button>
        <button onClick={() => setShowModal(true)} className="w-16 h-16 -mt-10 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-purple-300">
          <Plus className="w-9 h-9 text-purple-600" strokeWidth={3} />
        </button>
        <button className="text-white font-bold">Stats</button>
      </nav>
    </>
  );
}
