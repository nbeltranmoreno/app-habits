import { X, Sparkles, Clock } from 'lucide-react';

export default function HabitModal({ showModal, setShowModal, newHabit, setNewHabit, newTime, setNewTime, addHabit }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border-4 border-purple-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Nuevo Hábito
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block font-bold text-gray-700 mb-2">¿Qué hábito quieres crear?</label>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Ej: Leer 30 minutos"
              className="w-full px-4 py-4 rounded-xl bg-gray-100 border-3 border-transparent focus:border-purple-500 outline-none text-lg font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Hora del recordatorio
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-100 border-3 border-transparent focus:border-purple-500 outline-none text-lg font-medium"
            />
            <p className="text-sm text-gray-500 mt-2 font-medium">💡 Cada hábito = +2 puntos</p>
          </div>
          <button
            onClick={addHabit}
            disabled={!newHabit.trim()}
            className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-black text-xl rounded-xl disabled:opacity-50 shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            ¡Crear!
          </button>
        </div>
      </div>
    </div>
  );
}
