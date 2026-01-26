import { ArrowLeft, Sparkles, Check, Swords, TreePine, Mountain, Home, Flag } from 'lucide-react';
import Battle from './Battle';

export default function WorldMap({
  showFight,
  setShowFight,
  setShowWorld,
  points,
  startFight,
  // Battle props
  playerHP,
  enemyHP,
  playerAnim,
  enemyAnim,
  playerHit,
  enemyHit,
  playerAttacking,
  enemyAttacking,
  battleMsg,
  fighting,
  showDamage,
  comboCount,
  equipment,
  playerLevel,
  attack,
  resetFight
}) {
  const levels = [
    { num: 1, pts: 2, x: 20, y: 85 },
    { num: 2, pts: 5, x: 35, y: 68 },
    { num: 3, pts: 8, x: 65, y: 55 },
    { num: 4, pts: 10, x: 40, y: 40 },
    { num: 5, pts: 12, x: 50, y: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-sky-400 to-emerald-500 p-3 relative overflow-hidden">
      {/* Nubes */}
      <div className="absolute top-6 left-6 w-28 h-14 bg-white rounded-full opacity-90" />
      <div className="absolute top-4 right-20 w-32 h-16 bg-white rounded-full opacity-90" />

      {/* Sol */}
      <div className="absolute top-2 right-2 w-16 h-16">
        <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" />
        <div className="absolute inset-3 bg-yellow-200 rounded-full" />
      </div>

      <button onClick={() => { setShowWorld(false); setShowFight(false); }} className="absolute top-3 left-3 bg-white/50 backdrop-blur rounded-full p-2 z-50">
        <ArrowLeft className="w-6 h-6 text-indigo-700" />
      </button>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-5 py-2 flex items-center gap-2 shadow-xl z-50">
        <Sparkles className="w-5 h-5 text-yellow-600" />
        <span className="font-black text-yellow-800 text-lg">{points}</span>
      </div>

      {!showFight ? (
        <>
          <h1 className="text-center text-3xl font-black text-white mt-14 drop-shadow-xl">🌟 Mi Mundo 🌟</h1>

          <div className="relative w-full h-60 mt-4">
            {points >= 2 && <TreePine className="absolute text-green-700 w-14 h-14" style={{left: '3%', top: '60%'}} />}
            {points >= 5 && <TreePine className="absolute text-green-700 w-16 h-16" style={{left: '68%', top: '45%'}} />}
            {points >= 8 && <Mountain className="absolute text-slate-500 w-24 h-24" style={{left: '5%', top: '15%'}} />}
            {points >= 12 && <Home className="absolute text-amber-600 w-16 h-16" style={{left: '45%', top: '0%'}} />}
            {points >= 12 && <Flag className="absolute text-red-500 w-12 h-12" style={{left: '58%', top: '-2%'}} />}

            <svg className="absolute inset-0 w-full h-full">
              {levels.map((lvl, i) => {
                if (i < levels.length - 1) {
                  const next = levels[i + 1];
                  return <line key={i} x1={`${lvl.x}%`} y1={`${lvl.y}%`} x2={`${next.x}%`} y2={`${next.y}%`}
                    stroke={points >= lvl.pts ? '#22c55e' : '#6b7280'} strokeWidth="5"
                    strokeDasharray={points >= lvl.pts ? '0' : '10'} strokeLinecap="round" />;
                }
                return null;
              })}
            </svg>

            {levels.map(lvl => (
              <div key={lvl.num} className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-xl border-4
                ${points >= lvl.pts ? 'bg-green-500 text-white border-green-300' : 'bg-gray-400 text-gray-600 border-gray-300'}`}
                style={{left: `${lvl.x}%`, top: `${lvl.y}%`, transform: 'translate(-50%, -50%)'}}>
                {lvl.num}
              </div>
            ))}
          </div>

          <button onClick={startFight} className="w-full mt-3 py-5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-2xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl border-4 border-red-400">
            <Swords className="w-8 h-8" />
            ¡¡PELEAR!!
          </button>

          <div className="mt-3 bg-white/30 backdrop-blur rounded-xl p-3">
            <h2 className="text-white font-bold mb-2">🎯 Progreso</h2>
            <div className="grid grid-cols-3 gap-2">
              {levels.map(lvl => (
                <div key={lvl.num} className={`flex items-center gap-1 p-1 rounded-lg text-sm ${points >= lvl.pts ? 'bg-green-500/40 text-white' : 'bg-white/20 text-white/60'}`}>
                  {points >= lvl.pts ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-white/40" />}
                  <span className="font-bold">Nv.{lvl.num}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Battle
          playerHP={playerHP}
          enemyHP={enemyHP}
          playerAnim={playerAnim}
          enemyAnim={enemyAnim}
          playerHit={playerHit}
          enemyHit={enemyHit}
          playerAttacking={playerAttacking}
          enemyAttacking={enemyAttacking}
          battleMsg={battleMsg}
          fighting={fighting}
          showDamage={showDamage}
          comboCount={comboCount}
          equipment={equipment}
          playerLevel={playerLevel}
          attack={attack}
          resetFight={resetFight}
          setShowFight={setShowFight}
        />
      )}
    </div>
  );
}
