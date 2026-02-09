import { ArrowLeft, CheckCircle, XCircle, TrendingUp, Clock } from 'lucide-react';

export default function IndividualHabitStats({ habits, setShowIndividualStats, t }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowIndividualStats(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white">📊 {t.statistics}</h1>
            <p className="text-white/90 text-sm font-medium">Por hábito individual</p>
          </div>
        </div>

        {/* Resumen General */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-white" />
              <div>
                <p className="text-white/80 text-sm font-medium">{t.totalHabits}</p>
                <p className="text-3xl font-black text-white">{habits.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium">{t.completedToday}</p>
              <p className="text-3xl font-black text-green-300">{habits.filter(h => h.completed).length}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas por Hábito */}
        {habits.length === 0 ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border-2 border-white/30">
            <Clock className="w-14 h-14 text-white/60 mx-auto mb-3" />
            <p className="text-white/90 font-bold text-lg">{t.noHabitsRegistered}</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {habits.map(habit => {
              const isCompleted = habit.completed;
              const percentage = isCompleted ? 100 : 0;

              return (
                <div
                  key={habit.id}
                  className={`bg-white/20 backdrop-blur rounded-2xl p-5 border-2 ${
                    isCompleted ? 'border-green-400/50' : 'border-white/30'
                  } hover:scale-105 transition-transform`}
                >
                  {/* Nombre y Estado */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : 'bg-white/30'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
                        ) : (
                          <XCircle className="w-7 h-7 text-white/60" strokeWidth={2.5} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-black text-lg">{habit.name}</h3>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{habit.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-4xl font-black ${
                        isCompleted ? 'text-green-300' : 'text-white/50'
                      }`}>
                        {percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="w-full bg-white/20 rounded-full h-6 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 0 && (
                        <span className="text-white font-black text-xs">{percentage}%</span>
                      )}
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <>
                          <span className="text-green-300 font-bold text-sm">✓ {t.completed}</span>
                          <span className="text-yellow-300 font-black text-sm">+2 ⭐</span>
                        </>
                      ) : (
                        <span className="text-white/60 font-bold text-sm">✗ {t.pending}</span>
                      )}
                    </div>
                    {habit.createdAt && (
                      <div className="text-white/60 text-xs font-medium">
                        {Math.floor((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24))} {t.createdDaysAgo}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Resumen Final */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-5 border-2 border-white/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-white/80 text-sm font-medium mb-1">{t.yes}</p>
              <p className="text-3xl font-black text-green-300">{habits.filter(h => h.completed).length}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-white/80 text-sm font-medium mb-1">{t.no}</p>
              <p className="text-3xl font-black text-red-300">{habits.filter(h => !h.completed).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
