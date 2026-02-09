import { ArrowLeft, CheckCircle, XCircle, TrendingUp, Calendar } from 'lucide-react';

export default function HabitStats({ habits, setShowStats }) {
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const notCompletedHabits = totalHabits - completedHabits;

  const completedPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const notCompletedPercentage = totalHabits > 0 ? Math.round((notCompletedHabits / totalHabits) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowStats(false)}
              className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-3xl font-black text-white">📊 Estadísticas</h1>
          </div>
        </div>

        {/* Resumen General */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-white" />
              <div>
                <p className="text-white/80 text-sm font-medium">Total de Hábitos</p>
                <p className="text-3xl font-black text-white">{totalHabits}</p>
              </div>
            </div>
            <Calendar className="w-12 h-12 text-white/40" />
          </div>
        </div>

        {/* Gráfico de Porcentajes */}
        <div className="space-y-4 mb-6">
          {/* Sección NO Completados */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-black text-2xl">NO</p>
                  <p className="text-white/80 text-sm font-medium">No Completados</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black text-red-300">{notCompletedPercentage}%</p>
                <p className="text-white/70 text-sm font-medium">{notCompletedHabits} de {totalHabits}</p>
              </div>
            </div>

            {/* Barra de progreso NO */}
            <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center"
                style={{ width: `${notCompletedPercentage}%` }}
              >
                {notCompletedPercentage > 0 && (
                  <span className="text-white font-black text-xs">{notCompletedPercentage}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Sección SÍ Completados */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 border-2 border-white/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-black text-2xl">SÍ</p>
                  <p className="text-white/80 text-sm font-medium">Completados</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black text-green-300">{completedPercentage}%</p>
                <p className="text-white/70 text-sm font-medium">{completedHabits} de {totalHabits}</p>
              </div>
            </div>

            {/* Barra de progreso SÍ */}
            <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center"
                style={{ width: `${completedPercentage}%` }}
              >
                {completedPercentage > 0 && (
                  <span className="text-white font-black text-xs">{completedPercentage}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico Circular Visual */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 border-2 border-white/30">
          <h3 className="text-white font-black text-lg mb-4 text-center">Vista Circular</h3>
          <div className="relative w-64 h-64 mx-auto">
            {/* Círculo visual */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Fondo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="20"
              />

              {/* Progreso NO (rojo) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ef4444"
                strokeWidth="20"
                strokeDasharray={`${notCompletedPercentage * 2.51} 251`}
                strokeLinecap="round"
              />

              {/* Progreso SÍ (verde) - comienza donde termina el rojo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${completedPercentage * 2.51} 251`}
                strokeDashoffset={-notCompletedPercentage * 2.51}
                strokeLinecap="round"
              />
            </svg>

            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-white/70 text-sm font-medium">Hoy</p>
              <p className="text-white font-black text-4xl">{completedPercentage}%</p>
              <p className="text-white/70 text-xs font-medium">Completado</p>
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-white text-sm font-medium">NO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-white text-sm font-medium">SÍ</span>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-6 bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30 text-center">
          {completedPercentage === 100 ? (
            <p className="text-white font-bold text-lg">🎉 ¡Increíble! ¡Has completado todos tus hábitos hoy!</p>
          ) : completedPercentage >= 75 ? (
            <p className="text-white font-bold text-lg">🌟 ¡Excelente trabajo! Vas muy bien.</p>
          ) : completedPercentage >= 50 ? (
            <p className="text-white font-bold text-lg">💪 ¡Buen progreso! Sigue así.</p>
          ) : completedPercentage > 0 ? (
            <p className="text-white font-bold text-lg">🚀 ¡Vamos! Aún puedes completar más hábitos.</p>
          ) : (
            <p className="text-white font-bold text-lg">⭐ ¡Empieza hoy! Cada hábito cuenta.</p>
          )}
        </div>
      </div>
    </div>
  );
}
