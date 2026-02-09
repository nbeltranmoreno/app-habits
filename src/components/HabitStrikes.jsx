import { ArrowLeft, Flame, Trophy, Target, Star } from 'lucide-react';

export default function HabitStrikes({ habits, setShowStrikes, t }) {
  // Ordenar hábitos por cantidad de veces completadas
  const sortedHabits = [...habits].sort((a, b) => (b.timesCompleted || 0) - (a.timesCompleted || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowStrikes(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              <Flame className="w-8 h-8" />
              {t.strikes || 'Rachas'}
            </h1>
            <p className="text-white/90 text-sm font-medium">{t.strikesSubtitle || 'Veces completadas por hábito'}</p>
          </div>
        </div>

        {/* Resumen General */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10 text-yellow-300" />
              <div>
                <p className="text-white/80 text-sm font-medium">{t.totalCompletions || 'Total completadas'}</p>
                <p className="text-4xl font-black text-white">
                  {habits.reduce((sum, h) => sum + (h.timesCompleted || 0), 0)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium">{t.activeHabits || 'Hábitos activos'}</p>
              <p className="text-4xl font-black text-yellow-300">{habits.length}</p>
            </div>
          </div>
        </div>

        {/* Lista de hábitos con rachas */}
        {habits.length === 0 ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center border-2 border-white/30">
            <Target className="w-14 h-14 text-white/60 mx-auto mb-3" />
            <p className="text-white/90 font-bold text-lg">{t.noHabitsStrikes || 'No hay hábitos registrados'}</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {sortedHabits.map((habit, index) => {
              const timesCompleted = habit.timesCompleted || 0;
              const isTopThree = index < 3;

              return (
                <div
                  key={habit.id}
                  className={`bg-white/20 backdrop-blur rounded-2xl p-5 border-2 transition-transform hover:scale-105 ${
                    isTopThree ? 'border-yellow-400/60' : 'border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Medalla para top 3 */}
                      {isTopThree && (
                        <div className="text-3xl">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                        </div>
                      )}

                      <div>
                        <h3 className="text-white font-black text-lg">{habit.name}</h3>
                        <p className="text-white/70 text-sm font-medium">{habit.time}</p>
                      </div>
                    </div>

                    {/* Contador grande */}
                    <div className="text-center">
                      <div className={`text-5xl font-black ${
                        timesCompleted >= 50 ? 'text-yellow-300' :
                        timesCompleted >= 20 ? 'text-orange-300' :
                        timesCompleted >= 10 ? 'text-pink-300' :
                        'text-white'
                      }`}>
                        {timesCompleted}
                      </div>
                      <p className="text-white/80 text-xs font-bold mt-1">{t.times || 'veces'}</p>
                    </div>
                  </div>

                  {/* Barra de progreso visual */}
                  <div className="relative">
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          timesCompleted >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          timesCompleted >= 20 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                          timesCompleted >= 10 ? 'bg-gradient-to-r from-pink-400 to-pink-600' :
                          'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${Math.min((timesCompleted / 50) * 100, 100)}%` }}
                      />
                    </div>

                    {/* Hitos */}
                    <div className="flex justify-between mt-2 text-xs font-bold text-white/60">
                      <span>0</span>
                      <span>10</span>
                      <span>20</span>
                      <span>50+</span>
                    </div>
                  </div>

                  {/* Badges de logros */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {timesCompleted >= 1 && (
                      <div className="bg-green-500/30 px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {t.beginner || 'Principiante'}
                      </div>
                    )}
                    {timesCompleted >= 10 && (
                      <div className="bg-blue-500/30 px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {t.dedicated || 'Dedicado'}
                      </div>
                    )}
                    {timesCompleted >= 20 && (
                      <div className="bg-purple-500/30 px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {t.expert || 'Experto'}
                      </div>
                    )}
                    {timesCompleted >= 50 && (
                      <div className="bg-yellow-500/30 px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {t.master || 'Maestro'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Información adicional */}
        {habits.length > 0 && (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 border-2 border-white/30">
            <h3 className="text-white font-black text-lg mb-3 flex items-center gap-2">
              <Star className="w-5 h-5" />
              {t.achievements || 'Logros'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-yellow-300">
                  {habits.filter(h => (h.timesCompleted || 0) >= 50).length}
                </p>
                <p className="text-white/80 text-xs font-bold mt-1">{t.masters || 'Maestros'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-orange-300">
                  {habits.filter(h => (h.timesCompleted || 0) >= 20).length}
                </p>
                <p className="text-white/80 text-xs font-bold mt-1">{t.experts || 'Expertos'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
