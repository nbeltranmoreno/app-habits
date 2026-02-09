import { ArrowLeft, Plus, XCircle, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function BadHabits({ badHabits, addBadHabit, toggleBadHabit, deleteBadHabit, setShowBadHabits, badHabitsPoints }) {
  const [showModal, setShowModal] = useState(false);
  const [newBadHabit, setNewBadHabit] = useState('');

  const handleAdd = () => {
    if (newBadHabit.trim()) {
      addBadHabit(newBadHabit);
      setNewBadHabit('');
      setShowModal(false);
    }
  };

  const avoidedCount = badHabits.filter(h => h.avoided).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-rose-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowBadHabits(false)}
              className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white">🚫 Abandonar Hábitos</h1>
              <p className="text-white/90 text-sm font-medium">Hábitos que quieres dejar</p>
            </div>
          </div>
        </div>

        {/* Puntos por evitar malos hábitos */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-900 font-medium mb-1">Puntos Ganados Hoy</p>
              <p className="text-white/90 text-sm font-medium">{avoidedCount} de {badHabits.length} evitados</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-900" />
              <p className="text-5xl font-black text-green-900">+{badHabitsPoints}</p>
            </div>
          </div>
        </div>

        {/* Info sobre cómo funciona */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6 border-2 border-white/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-bold text-sm mb-1">¿Cómo funciona?</p>
              <p className="text-white/80 text-xs">
                Marca con ✓ si <strong>EVITASTE</strong> el mal hábito hoy y ganarás +2 puntos.
                Marca con ✗ si <strong>CAÍSTE</strong> en él (sin puntos).
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Malos Hábitos */}
        {badHabits.length === 0 ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border-2 border-white/30">
            <XCircle className="w-14 h-14 text-white/60 mx-auto mb-3" />
            <p className="text-white/90 font-bold text-lg mb-2">No hay malos hábitos registrados</p>
            <p className="text-white/70 text-sm">Agrega hábitos que quieres abandonar</p>
          </div>
        ) : (
          <div className="space-y-3 mb-24">
            {badHabits.map(habit => (
              <div
                key={habit.id}
                className={`bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30 ${
                  habit.avoided === true ? 'opacity-75 border-green-400' : habit.avoided === false ? 'opacity-60 border-red-400' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Botones de estado */}
                  <div className="flex flex-col gap-2">
                    {/* Botón EVITADO (verde) */}
                    <button
                      onClick={() => toggleBadHabit(habit.id, true)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
                        habit.avoided === true
                          ? 'bg-green-500 border-4 border-green-300 scale-110'
                          : 'bg-white/30 border-4 border-white/50 hover:bg-green-400/50'
                      }`}
                      title="Evité este hábito malo hoy"
                    >
                      <CheckCircle className={`w-7 h-7 ${habit.avoided === true ? 'text-white' : 'text-white/60'}`} strokeWidth={3} />
                    </button>

                    {/* Botón CAÍSTE (rojo) */}
                    <button
                      onClick={() => toggleBadHabit(habit.id, false)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
                        habit.avoided === false
                          ? 'bg-red-500 border-4 border-red-300 scale-110'
                          : 'bg-white/30 border-4 border-white/50 hover:bg-red-400/50'
                      }`}
                      title="Caí en este hábito malo hoy"
                    >
                      <XCircle className={`w-7 h-7 ${habit.avoided === false ? 'text-white' : 'text-white/60'}`} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Información del hábito */}
                  <div className="flex-1">
                    <p className="text-white font-bold text-lg">{habit.name}</p>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                      {habit.avoided === true && (
                        <span className="text-green-300 font-black">✓ Evitado hoy +2 ⭐</span>
                      )}
                      {habit.avoided === false && (
                        <span className="text-red-300 font-black">✗ No evitado</span>
                      )}
                      {habit.avoided === null && (
                        <span className="text-white/60 font-medium">Pendiente</span>
                      )}
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => deleteBadHabit(habit.id)}
                    className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-500/60 border-2 border-white/30"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón flotante para agregar */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-red-300 z-50"
        >
          <Plus className="w-9 h-9 text-red-600" strokeWidth={3} />
        </button>

        {/* Modal para agregar malo hábito */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h2 className="text-2xl font-black text-gray-800 mb-4">🚫 Nuevo Mal Hábito</h2>
              <p className="text-gray-600 text-sm mb-4">Escribe un hábito que quieres abandonar</p>

              <input
                type="text"
                value={newBadHabit}
                onChange={(e) => setNewBadHabit(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="Ej: Fumar, Comer chatarra, Procrastinar..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 outline-none text-gray-800 font-medium mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewBadHabit('');
                  }}
                  className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!newBadHabit.trim()}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
