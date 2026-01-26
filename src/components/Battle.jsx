import { Heart, Zap, Flame, TreePine, Sword, Sparkles } from 'lucide-react';
import KidCharacter from './KidCharacter';

export default function Battle({
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
  resetFight,
  setShowFight
}) {
  return (
    <>
      <h1 className="text-center text-2xl font-black text-white mt-10">⚔️ ¡¡BATALLA!! ⚔️</h1>

      <div className="flex justify-between mt-3 px-1">
        <div className="bg-blue-700/80 rounded-xl p-2 border-2 border-blue-400">
          <p className="font-bold text-white text-sm">🦸 Tú Nv.{playerLevel}</p>
          <div className="flex items-center gap-1 mt-1">
            <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
            <span className="text-white text-sm font-bold">{playerHP}</span>
          </div>
          <div className="w-20 h-3 bg-gray-900 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-green-500 transition-all" style={{width: `${playerHP}%`}} />
          </div>
        </div>
        <div className="bg-red-700/80 rounded-xl p-2 border-2 border-red-400 text-right">
          <p className="font-bold text-white text-sm">👿 Malo Nv.3</p>
          <div className="flex items-center gap-1 mt-1 justify-end">
            <span className="text-white text-sm font-bold">{enemyHP}</span>
            <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
          </div>
          <div className="w-20 h-3 bg-gray-900 rounded-full overflow-hidden mt-1 ml-auto">
            <div className="h-full bg-red-500 transition-all" style={{width: `${enemyHP}%`}} />
          </div>
        </div>
      </div>

      {comboCount > 0 && (
        <div className="text-center mt-2">
          <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full font-black text-sm animate-pulse">
            🔥 COMBO x{comboCount} 🔥
          </span>
        </div>
      )}

      <div className="relative h-52 mt-1">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-700 via-green-600 to-green-500 rounded-t-3xl" />

        <TreePine className="absolute text-green-800 w-12 h-12" style={{left: '-2%', bottom: '60px'}} />
        <TreePine className="absolute text-green-700 w-10 h-10" style={{right: '2%', bottom: '65px'}} />

        {showDamage.show && (
          <div className={`absolute top-0 ${showDamage.isEnemy ? 'right-8' : 'left-8'} z-50`}>
            <span className="text-4xl font-black text-red-500 animate-bounce" style={{textShadow: '2px 2px 0 white'}}>
              -{showDamage.amount}
            </span>
          </div>
        )}

        <div className="absolute bottom-6 left-2">
          <KidCharacter isEnemy={false} anim={playerAnim} isHit={playerHit} isAttacking={playerAttacking} equipment={equipment} />
        </div>
        <div className="absolute bottom-6 right-2">
          <KidCharacter isEnemy={true} anim={enemyAnim} isHit={enemyHit} isAttacking={enemyAttacking} />
        </div>
      </div>

      <div className="bg-purple-700/80 rounded-xl p-3 text-center border-2 border-purple-400">
        <p className="text-white font-black text-lg">{battleMsg}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {/* Ataque Básico - Siempre disponible */}
        <button onClick={() => attack('básico')} disabled={fighting || playerHP <= 0 || enemyHP <= 0}
          className="py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-black text-lg rounded-xl disabled:opacity-50 shadow-xl flex flex-col items-center justify-center gap-1">
          <Sword className="w-6 h-6" />
          <span>Básico</span>
          <span className="text-xs font-normal opacity-80">Nv.0</span>
        </button>

        {/* Ataque Rápido - Nivel 2+ */}
        <button onClick={() => attack('rápido')} disabled={fighting || playerHP <= 0 || enemyHP <= 0 || playerLevel < 2}
          className="py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-lg rounded-xl disabled:opacity-50 shadow-xl flex flex-col items-center justify-center gap-1 relative">
          <Zap className="w-6 h-6" />
          <span>Rápido</span>
          <span className="text-xs font-normal opacity-80">Nv.2</span>
          {playerLevel < 2 && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <span className="text-sm">🔒 Nv.2</span>
            </div>
          )}
        </button>

        {/* Ataque Fuerte - Nivel 3+ */}
        <button onClick={() => attack('fuerte')} disabled={fighting || playerHP <= 0 || enemyHP <= 0 || playerLevel < 3}
          className="py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-lg rounded-xl disabled:opacity-50 shadow-xl flex flex-col items-center justify-center gap-1 relative">
          <Flame className="w-6 h-6" />
          <span>Fuerte</span>
          <span className="text-xs font-normal opacity-80">Nv.3</span>
          {playerLevel < 3 && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <span className="text-sm">🔒 Nv.3</span>
            </div>
          )}
        </button>

        {/* Ataque Crítico - Nivel 4+ */}
        <button onClick={() => attack('crítico')} disabled={fighting || playerHP <= 0 || enemyHP <= 0 || playerLevel < 4}
          className="py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg rounded-xl disabled:opacity-50 shadow-xl flex flex-col items-center justify-center gap-1 relative">
          <Sparkles className="w-6 h-6" />
          <span>Crítico</span>
          <span className="text-xs font-normal opacity-80">Nv.4</span>
          {playerLevel < 4 && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <span className="text-sm">🔒 Nv.4</span>
            </div>
          )}
        </button>
      </div>

      {(playerHP <= 0 || enemyHP <= 0) && (
        <button onClick={resetFight} className="w-full mt-3 py-4 bg-purple-600 text-white font-black rounded-xl">
          🔄 ¡Otra vez!
        </button>
      )}

      <button onClick={() => setShowFight(false)} className="w-full mt-2 py-2 text-white/80 font-bold">
        ← Volver al mapa
      </button>
    </>
  );
}
