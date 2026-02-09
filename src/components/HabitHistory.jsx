import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function HabitHistory({ habits, setShowHistory }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const sortedHabits = [...habits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowHistory(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-black text-white">📜 Historial de Hábitos</h1>
        </div>

        {/* Estadísticas */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-white/80 font-medium mb-1">Total de Hábitos</p>
              <p className="text-4xl font-black text-white">{habits.length}</p>
            </div>
            <div className="text-center">
              <p className="text-white/80 font-medium mb-1">Completados Hoy</p>
              <p className="text-4xl font-black text-green-300">{habits.filter(h => h.completed).length}</p>
            </div>
          </div>
        </div>

        {/* Lista de Hábitos */}
        {sortedHabits.length === 0 ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border-2 border-white/30">
            <Calendar className="w-14 h-14 text-white/60 mx-auto mb-3" />
            <p className="text-white/90 font-bold text-lg">No hay hábitos registrados</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {sortedHabits.map(habit => (
              <div
                key={habit.id}
                className="bg-white/20 backdrop-blur rounded-2xl p-5 border-2 border-white/30"
              >
                {/* Nombre del hábito */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-black text-xl">{habit.name}</h3>
                  {habit.completed && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Completado
                    </span>
                  )}
                </div>

                {/* Información de tiempo */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium text-sm">Creado: {formatDate(habit.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium text-sm">Hora programada: {habit.time}</span>
                  </div>
                </div>

                {/* Antigüedad */}
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-white/70 text-xs font-medium">
                    Creado hace {Math.floor((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24))} días
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
