import { ArrowLeft, Sparkles, Check, Swords, Lock, Trophy } from 'lucide-react';
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
  // Generar niveles del 1 al 100
  const generateLevels = () => {
    const levelsArray = [];
    let totalPointsNeeded = 0;
    for (let i = 1; i <= 100; i++) {
      totalPointsNeeded += i + 1; // Mismo cálculo que en App.jsx
      levelsArray.push({ num: i, pts: totalPointsNeeded });
    }
    return levelsArray;
  };

  const levels = generateLevels();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-sky-400 to-emerald-500 p-3 relative">
      {/* Nubes decorativas */}
      <div className="absolute top-6 left-6 w-28 h-14 bg-white rounded-full opacity-60 pointer-events-none" />
      <div className="absolute top-4 right-20 w-32 h-16 bg-white rounded-full opacity-60 pointer-events-none" />

      {/* Sol */}
      <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none">
        <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse opacity-80" />
        <div className="absolute inset-3 bg-yellow-200 rounded-full" />
      </div>

      <button onClick={() => { setShowWorld(false); setShowFight(false); }} className="absolute top-3 left-3 bg-white/50 backdrop-blur rounded-full p-2 z-50 hover:scale-110 transition">
        <ArrowLeft className="w-6 h-6 text-indigo-700" />
      </button>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-5 py-2 flex items-center gap-2 shadow-xl z-50">
        <Sparkles className="w-5 h-5 text-yellow-600" />
        <span className="font-black text-yellow-800 text-lg">{points}</span>
      </div>

      {!showFight ? (
        <div className="max-w-md mx-auto">
          <h1 className="text-center text-3xl font-black text-white mt-14 drop-shadow-xl mb-2">🌟 Mi Mundo 🌟</h1>
          <p className="text-center text-white font-bold mb-4">Nivel {playerLevel} / 100</p>

          {/* Botón de pelear */}
          <button onClick={startFight} className="w-full mb-4 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl border-4 border-red-400 hover:scale-105 transition">
            <Swords className="w-7 h-7" />
            ¡¡PELEAR!!
          </button>

          {/* Mapa HIPER-REALISTA con máximo detalle */}
          <div className="bg-gradient-to-b from-sky-400 via-emerald-300 to-stone-200 rounded-2xl p-6 max-h-[500px] overflow-y-auto relative shadow-2xl border-4 border-stone-800" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
            `,
            backgroundBlendMode: 'overlay'
          }}>
            {/* Header con fondo semi-transparente */}
            <div className="sticky top-0 z-50 mb-4">
              <h2 className="text-white font-black text-lg flex items-center gap-2 px-4 py-3 shadow-2xl border-3 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(5, 46, 22, 0.9), rgba(6, 78, 59, 0.9), rgba(4, 120, 87, 0.9))',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(134, 239, 172, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.2)'
              }}>
                <Trophy className="w-6 h-6 drop-shadow-lg" />
                🗺️ Mapa del Mundo
              </h2>
            </div>

            {/* Nubes decorativas flotantes */}
            <div className="absolute top-16 left-8 w-20 h-10 bg-white/70 rounded-full blur-sm pointer-events-none z-30 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-20 right-12 w-24 h-12 bg-white/60 rounded-full blur-sm pointer-events-none z-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }} />
            <div className="absolute top-40 left-1/4 w-16 h-8 bg-white/50 rounded-full blur-sm pointer-events-none z-30 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4.5s' }} />
            <div className="absolute top-64 right-1/4 w-18 h-10 bg-white/65 rounded-full blur-sm pointer-events-none z-30 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '5.5s' }} />

            {/* Mapa SUPER realista con biomas detallados */}
            <div className="relative">
              {/* BIOMA 1: PRADERAS VIVIENTES - Textura ultra detallada (niveles 1-25) */}
              <div className="absolute top-0 left-0 right-0 h-80 rounded-t-xl pointer-events-none" style={{
                zIndex: 1,
                background: `
                  linear-gradient(to bottom, #86efac 0%, #84cc16 20%, #a3e635 50%, #bef264 80%, #d9f99d 100%),
                  repeating-linear-gradient(90deg, transparent 0%, transparent 8px, rgba(132, 204, 22, 0.1) 8px, rgba(132, 204, 22, 0.1) 16px),
                  repeating-linear-gradient(45deg, transparent 0%, transparent 12px, rgba(163, 230, 53, 0.05) 12px, rgba(163, 230, 53, 0.05) 24px)
                `,
                boxShadow: 'inset 0 -30px 60px rgba(0,0,0,0.15), inset 0 4px 12px rgba(255,255,255,0.3)',
                backgroundBlendMode: 'overlay'
              }} />

              {/* Transición pradera-bosque */}
              <div className="absolute left-0 right-0 h-20 pointer-events-none" style={{
                top: '300px',
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(163, 230, 53, 0.8), rgba(21, 128, 61, 0.8))',
                filter: 'blur(8px)'
              }} />

              {/* BIOMA 2: BOSQUE MÍSTICO - Textura profunda (niveles 26-50) */}
              <div className="absolute left-0 right-0 h-80 pointer-events-none" style={{
                top: '320px',
                zIndex: 1,
                background: `
                  linear-gradient(to bottom, #15803d 0%, #166534 25%, #14532d 60%, #052e16 90%, #022c22 100%),
                  repeating-linear-gradient(60deg, transparent 0%, transparent 20px, rgba(5, 46, 22, 0.3) 20px, rgba(5, 46, 22, 0.3) 40px),
                  radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.1), transparent 60%),
                  radial-gradient(circle at 70% 70%, rgba(6, 78, 59, 0.2), transparent 50%)
                `,
                boxShadow: 'inset 0 30px 60px rgba(0,0,0,0.4), inset 0 -30px 60px rgba(0,0,0,0.3), inset 0 0 100px rgba(5, 46, 22, 0.5)',
                backgroundBlendMode: 'multiply'
              }} />

              {/* Transición bosque-montaña */}
              <div className="absolute left-0 right-0 h-24 pointer-events-none" style={{
                top: '620px',
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(20, 83, 45, 0.9), rgba(120, 113, 108, 0.9))',
                filter: 'blur(10px)'
              }} />

              {/* BIOMA 3: MONTAÑAS ÉPICAS - Textura rocosa (niveles 51-75) */}
              <div className="absolute left-0 right-0 h-80 pointer-events-none" style={{
                top: '640px',
                zIndex: 1,
                background: `
                  linear-gradient(to bottom, #78716c 0%, #57534e 20%, #44403c 50%, #292524 75%, #1c1917 100%),
                  repeating-linear-gradient(135deg, transparent 0%, transparent 15px, rgba(68, 64, 60, 0.4) 15px, rgba(68, 64, 60, 0.4) 30px),
                  repeating-linear-gradient(-45deg, transparent 0%, transparent 25px, rgba(41, 37, 36, 0.3) 25px, rgba(41, 37, 36, 0.3) 50px),
                  radial-gradient(circle at 25% 35%, rgba(87, 83, 78, 0.3), transparent 70%)
                `,
                boxShadow: 'inset 0 40px 80px rgba(0,0,0,0.5), inset 0 -40px 80px rgba(0,0,0,0.6), inset 20px 0 60px rgba(0,0,0,0.3), inset -20px 0 60px rgba(0,0,0,0.3)',
                backgroundBlendMode: 'overlay'
              }} />

              {/* Transición montaña-nieve */}
              <div className="absolute left-0 right-0 h-28 pointer-events-none" style={{
                top: '940px',
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(41, 37, 36, 0.9), rgba(186, 230, 253, 0.9))',
                filter: 'blur(12px)'
              }} />

              {/* BIOMA 4: CIMA GLACIAL - Textura helada (niveles 76-100) */}
              <div className="absolute left-0 right-0 h-80 pointer-events-none" style={{
                top: '960px',
                zIndex: 1,
                background: `
                  linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 20%, #f0f9ff 50%, #ffffff 80%, #f8fafc 100%),
                  repeating-linear-gradient(30deg, transparent 0%, transparent 10px, rgba(147, 197, 253, 0.15) 10px, rgba(147, 197, 253, 0.15) 20px),
                  repeating-linear-gradient(-60deg, transparent 0%, transparent 15px, rgba(59, 130, 246, 0.08) 15px, rgba(59, 130, 246, 0.08) 30px),
                  radial-gradient(circle at 40% 50%, rgba(103, 232, 249, 0.2), transparent 60%),
                  radial-gradient(circle at 80% 30%, rgba(224, 242, 254, 0.3), transparent 50%)
                `,
                boxShadow: 'inset 0 30px 70px rgba(147, 197, 253, 0.4), inset 0 -20px 50px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(186, 230, 253, 0.2)',
                backgroundBlendMode: 'screen'
              }} />

              {/* Efecto de niebla en nieve */}
              <div className="absolute left-0 right-0 h-80 pointer-events-none z-3" style={{
                top: '960px',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.3), transparent 70%)',
                animation: 'pulse 8s ease-in-out infinite'
              }} />

              {/* ===== DECORACIONES PRADERAS (Niveles 1-25) ===== */}
              {/* Flora abundante */}
              <div className="absolute top-8 left-6 text-2xl opacity-75 pointer-events-none z-10">🌻</div>
              <div className="absolute top-16 left-20 text-lg opacity-70 pointer-events-none z-10">🌼</div>
              <div className="absolute top-12 right-10 text-xl opacity-75 pointer-events-none z-10">🌸</div>
              <div className="absolute top-28 left-12 text-base opacity-65 pointer-events-none z-10">🌿</div>
              <div className="absolute top-24 right-24 text-xl opacity-70 pointer-events-none z-10">🌺</div>
              <div className="absolute top-40 left-28 text-sm opacity-60 pointer-events-none z-10">🌾</div>
              <div className="absolute top-36 right-16 text-lg opacity-65 pointer-events-none z-10">🌻</div>
              <div className="absolute top-52 left-8 text-base opacity-60 pointer-events-none z-10">🌿</div>
              <div className="absolute top-48 right-28 text-xl opacity-70 pointer-events-none z-10">🌼</div>
              <div className="absolute top-64 left-16 text-base opacity-65 pointer-events-none z-10">🌾</div>
              <div className="absolute top-60 right-12 text-lg opacity-70 pointer-events-none z-10">🌸</div>
              <div className="absolute top-76 left-24 text-sm opacity-60 pointer-events-none z-10">🌿</div>
              <div className="absolute top-72 right-20 text-base opacity-65 pointer-events-none z-10">🌾</div>

              {/* Fauna */}
              <div className="absolute top-20 left-32 text-xl opacity-70 pointer-events-none z-10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>🦋</div>
              <div className="absolute top-44 right-32 text-lg opacity-65 pointer-events-none z-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🐝</div>
              <div className="absolute top-68 left-36 text-base opacity-60 pointer-events-none z-10">🐛</div>

              {/* Gran estanque con vida */}
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-28 bg-gradient-to-br from-blue-300 via-cyan-300 to-blue-500 rounded-full opacity-80 pointer-events-none z-5 shadow-2xl" style={{ top: '170px', border: '3px solid rgba(59, 130, 246, 0.5)' }}>
                {/* Reflejos de agua */}
                <div className="absolute top-2 left-4 w-4 h-4 bg-white rounded-full opacity-70 animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="absolute top-4 right-6 w-3 h-3 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-4 left-5 w-3 h-3 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.2s', animationDuration: '3s' }} />
                <div className="absolute bottom-3 right-7 w-2 h-2 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }} />

                {/* Lirios de agua */}
                <div className="absolute top-1/2 left-1/3 text-sm opacity-80">🪷</div>
                <div className="absolute top-1/3 right-1/3 text-xs opacity-75">🪷</div>
              </div>

              {/* Patos en el estanque */}
              <div className="absolute left-1/2 text-base opacity-70 pointer-events-none z-10" style={{ top: '185px' }}>🦆</div>

              {/* Árboles frutales dispersos */}
              <div className="absolute top-32 left-40 text-2xl opacity-75 pointer-events-none z-10">🌳</div>
              <div className="absolute top-56 right-36 text-2xl opacity-70 pointer-events-none z-10">🌳</div>
              <div className="absolute top-88 left-32 text-xl opacity-70 pointer-events-none z-10">🌳</div>

              {/* Casitas y granjas */}
              <div className="absolute top-100 right-16 text-2xl opacity-80 pointer-events-none z-10 drop-shadow-lg">🏡</div>
              <div className="absolute top-144 left-20 text-xl opacity-75 pointer-events-none z-10">🛖</div>

              {/* Molino de viento */}
              <div className="absolute top-120 left-12 text-2xl opacity-75 pointer-events-none z-10">🏘️</div>

              {/* Camino de piedras decorativo */}
              <div className="absolute top-60 left-16 text-xs opacity-50 pointer-events-none z-5">🪨</div>
              <div className="absolute top-62 left-18 text-xs opacity-50 pointer-events-none z-5">🪨</div>
              <div className="absolute top-64 left-20 text-xs opacity-50 pointer-events-none z-5">🪨</div>

              {/* Más fauna */}
              <div className="absolute top-84 right-28 text-base opacity-60 pointer-events-none z-10">🐇</div>
              <div className="absolute top-112 left-36 text-sm opacity-55 pointer-events-none z-10">🦔</div>

              {/* ===== DECORACIONES BOSQUE DENSO (Niveles 26-50) ===== */}
              {/* Árboles abundantes */}
              <div className="absolute left-4 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '340px' }}>🌲</div>
              <div className="absolute left-14 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '355px' }}>🌲</div>
              <div className="absolute right-8 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '345px' }}>🌲</div>
              <div className="absolute right-20 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '360px' }}>🌲</div>
              <div className="absolute left-24 text-2xl opacity-75 pointer-events-none z-10" style={{ top: '380px' }}>🌳</div>
              <div className="absolute right-28 text-xl opacity-75 pointer-events-none z-10" style={{ top: '385px' }}>🌳</div>
              <div className="absolute left-8 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '410px' }}>🌲</div>
              <div className="absolute right-12 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '405px' }}>🌲</div>
              <div className="absolute left-32 text-xl opacity-75 pointer-events-none z-10" style={{ top: '435px' }}>🌳</div>
              <div className="absolute right-24 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '440px' }}>🌲</div>
              <div className="absolute left-16 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '465px' }}>🌲</div>
              <div className="absolute right-32 text-xl opacity-75 pointer-events-none z-10" style={{ top: '470px' }}>🌳</div>
              <div className="absolute left-6 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '495px' }}>🌲</div>
              <div className="absolute right-16 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '500px' }}>🌲</div>
              <div className="absolute left-28 text-xl opacity-75 pointer-events-none z-10" style={{ top: '525px' }}>🌳</div>
              <div className="absolute right-6 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '530px' }}>🌲</div>

              {/* Vida del bosque */}
              <div className="absolute left-20 text-lg opacity-70 pointer-events-none z-10" style={{ top: '400px' }}>🍄</div>
              <div className="absolute right-16 text-base opacity-65 pointer-events-none z-10" style={{ top: '425px' }}>🍄</div>
              <div className="absolute left-12 text-sm opacity-60 pointer-events-none z-10" style={{ top: '455px' }}>🪵</div>
              <div className="absolute right-20 text-base opacity-65 pointer-events-none z-10" style={{ top: '480px' }}>🍄</div>
              <div className="absolute left-36 text-sm opacity-60 pointer-events-none z-10" style={{ top: '510px' }}>🪵</div>
              <div className="absolute right-28 text-lg opacity-70 pointer-events-none z-10" style={{ top: '515px' }}>🍄</div>

              {/* Animales del bosque */}
              <div className="absolute left-16 text-base opacity-60 pointer-events-none z-10" style={{ top: '430px' }}>🦌</div>
              <div className="absolute right-24 text-sm opacity-55 pointer-events-none z-10" style={{ top: '475px' }}>🦊</div>
              <div className="absolute left-28 text-sm opacity-55 pointer-events-none z-10" style={{ top: '520px' }}>🐿️</div>

              {/* Río caudaloso con puente */}
              <div className="absolute left-1/2 -translate-x-1/2 w-16 h-64 pointer-events-none z-5" style={{ top: '380px' }}>
                {/* Río principal */}
                <div className="w-full h-full bg-gradient-to-b from-blue-400/70 via-blue-500/75 to-blue-600/70 shadow-2xl" style={{
                  borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
                  border: '2px solid rgba(59, 130, 246, 0.5)',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.4), 0 6px 20px rgba(59, 130, 246, 0.4)'
                }} />

                {/* Reflejos de agua animados */}
                <div className="absolute top-8 left-3 w-4 h-4 bg-white/60 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
                <div className="absolute top-20 right-2 w-3 h-3 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s', animationDuration: '3s' }} />
                <div className="absolute top-36 left-4 w-3 h-3 bg-white/55 rounded-full animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />

                {/* Peces */}
                <div className="absolute top-24 left-1/2 text-sm opacity-70 animate-pulse" style={{ animationDuration: '4s' }}>🐟</div>
              </div>

              {/* Puente de madera cruzando el río */}
              <div className="absolute left-1/2 -translate-x-1/2 w-20 h-4 pointer-events-none z-10" style={{ top: '460px' }}>
                <div className="w-full h-full bg-amber-800 rounded-sm shadow-xl" style={{
                  background: 'linear-gradient(to right, #78350f, #92400e, #78350f)',
                  border: '1px solid #451a03',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  {/* Barandales */}
                  <div className="absolute top-0 left-1 w-1 h-2 bg-amber-900" />
                  <div className="absolute top-0 left-4 w-1 h-2 bg-amber-900" />
                  <div className="absolute top-0 right-4 w-1 h-2 bg-amber-900" />
                  <div className="absolute top-0 right-1 w-1 h-2 bg-amber-900" />
                </div>
              </div>

              {/* Campamento con fogata */}
              <div className="absolute left-8 pointer-events-none z-10" style={{ top: '550px' }}>
                <div className="text-2xl opacity-85 mb-1">⛺</div>
                <div className="text-base opacity-80 ml-2">🔥</div>
              </div>

              {/* Torre de vigía */}
              <div className="absolute right-8 text-3xl opacity-85 pointer-events-none z-10 drop-shadow-xl" style={{ top: '560px' }}>🗼</div>

              {/* Troncos caídos más grandes */}
              <div className="absolute left-24 pointer-events-none z-10" style={{ top: '590px' }}>
                <div className="text-2xl opacity-70 rotate-12">🪵</div>
              </div>
              <div className="absolute right-20 pointer-events-none z-10" style={{ top: '610px' }}>
                <div className="text-xl opacity-65 -rotate-12">🪵</div>
              </div>

              {/* ===== DECORACIONES MONTAÑAS (Niveles 51-75) ===== */}
              {/* Formaciones rocosas */}
              <div className="absolute left-6 text-4xl opacity-90 pointer-events-none z-10" style={{ top: '660px', filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute right-12 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '670px', filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute left-20 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '695px', filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute right-24 text-4xl opacity-90 pointer-events-none z-10" style={{ top: '700px', filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute left-32 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '730px' }}>⛰️</div>
              <div className="absolute right-8 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '740px', filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute left-12 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '765px', filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))' }}>⛰️</div>
              <div className="absolute right-32 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '775px' }}>⛰️</div>

              {/* Rocas y peñascos */}
              <div className="absolute left-16 text-2xl opacity-75 pointer-events-none z-10" style={{ top: '685px' }}>🪨</div>
              <div className="absolute right-20 text-xl opacity-70 pointer-events-none z-10" style={{ top: '720px' }}>🪨</div>
              <div className="absolute left-28 text-2xl opacity-75 pointer-events-none z-10" style={{ top: '750px' }}>🪨</div>
              <div className="absolute right-16 text-xl opacity-70 pointer-events-none z-10" style={{ top: '785px' }}>🪨</div>
              <div className="absolute left-8 text-base opacity-65 pointer-events-none z-10" style={{ top: '800px' }}>🪨</div>

              {/* Fauna de montaña */}
              <div className="absolute left-24 text-xl opacity-70 pointer-events-none z-10 animate-bounce" style={{ top: '710px', animationDuration: '6s' }}>🦅</div>
              <div className="absolute right-28 text-lg opacity-65 pointer-events-none z-10" style={{ top: '760px' }}>🐐</div>

              {/* Cavernas grandes */}
              <div className="absolute left-32 pointer-events-none z-10" style={{ top: '710px' }}>
                <div className="text-3xl opacity-85 drop-shadow-2xl">🕳️</div>
                <div className="text-base opacity-70 mt-1 ml-2">🦇</div>
              </div>
              <div className="absolute right-28 text-2xl opacity-80 pointer-events-none z-10 drop-shadow-xl" style={{ top: '820px' }}>🕳️</div>

              {/* Campamento base de escalada */}
              <div className="absolute left-16 pointer-events-none z-10" style={{ top: '850px' }}>
                <div className="text-2xl opacity-80">⛺</div>
                <div className="text-xs opacity-70 ml-1">⛏️</div>
              </div>

              {/* Señales de advertencia */}
              <div className="absolute right-12 text-xl opacity-75 pointer-events-none z-10" style={{ top: '880px' }}>⚠️</div>

              {/* Escalador */}
              <div className="absolute left-10 text-lg opacity-70 pointer-events-none z-10" style={{ top: '750px' }}>🧗</div>

              {/* Cascada de rocas */}
              <div className="absolute right-16 pointer-events-none z-10" style={{ top: '730px' }}>
                <div className="text-base opacity-70">🪨</div>
                <div className="text-sm opacity-65 ml-2">🪨</div>
                <div className="text-xs opacity-60 ml-1">🪨</div>
              </div>

              {/* Refugio de montaña */}
              <div className="absolute left-28 text-2xl opacity-80 pointer-events-none z-10 drop-shadow-lg" style={{ top: '900px' }}>🛖</div>

              {/* ===== DECORACIONES NIEVE (Niveles 76-100) ===== */}
              {/* Picos nevados */}
              <div className="absolute left-8 text-4xl opacity-90 pointer-events-none z-10" style={{ top: '980px', filter: 'drop-shadow(2px 2px 8px rgba(59, 130, 246, 0.5))' }}>🏔️</div>
              <div className="absolute right-14 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '990px', filter: 'drop-shadow(2px 2px 6px rgba(59, 130, 246, 0.4))' }}>🏔️</div>
              <div className="absolute left-24 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '1015px', filter: 'drop-shadow(2px 2px 6px rgba(59, 130, 246, 0.4))' }}>🏔️</div>
              <div className="absolute right-8 text-4xl opacity-90 pointer-events-none z-10" style={{ top: '1025px', filter: 'drop-shadow(2px 2px 8px rgba(59, 130, 246, 0.5))' }}>🏔️</div>
              <div className="absolute left-16 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '1050px' }}>🏔️</div>
              <div className="absolute right-28 text-3xl opacity-85 pointer-events-none z-10" style={{ top: '1060px', filter: 'drop-shadow(2px 2px 6px rgba(59, 130, 246, 0.4))' }}>🏔️</div>

              {/* Copos de nieve animados */}
              <div className="absolute left-12 text-2xl opacity-75 pointer-events-none z-10 animate-pulse" style={{ top: '1000px', animationDuration: '3s' }}>❄️</div>
              <div className="absolute right-20 text-xl opacity-70 pointer-events-none z-10 animate-pulse" style={{ top: '1010px', animationDelay: '0.5s', animationDuration: '3.5s' }}>❄️</div>
              <div className="absolute left-32 text-lg opacity-65 pointer-events-none z-10 animate-pulse" style={{ top: '1035px', animationDelay: '1s', animationDuration: '4s' }}>❄️</div>
              <div className="absolute right-12 text-2xl opacity-75 pointer-events-none z-10 animate-pulse" style={{ top: '1045px', animationDelay: '1.5s', animationDuration: '3s' }}>❄️</div>
              <div className="absolute left-20 text-xl opacity-70 pointer-events-none z-10 animate-pulse" style={{ top: '1070px', animationDelay: '0.3s', animationDuration: '3.5s' }}>❄️</div>
              <div className="absolute right-32 text-base opacity-65 pointer-events-none z-10 animate-pulse" style={{ top: '1080px', animationDelay: '0.8s', animationDuration: '4s' }}>❄️</div>

              {/* Muñecos de nieve y vida invernal */}
              <div className="absolute left-28 text-2xl opacity-75 pointer-events-none z-10" style={{ top: '1020px' }}>⛄</div>
              <div className="absolute right-24 text-xl opacity-70 pointer-events-none z-10" style={{ top: '1055px' }}>⛄</div>
              <div className="absolute left-36 text-lg opacity-65 pointer-events-none z-10" style={{ top: '1085px' }}>⛄</div>

              {/* Fauna ártica */}
              <div className="absolute left-10 text-lg opacity-65 pointer-events-none z-10" style={{ top: '1030px' }}>🐧</div>
              <div className="absolute right-16 text-base opacity-60 pointer-events-none z-10" style={{ top: '1065px' }}>🦉</div>

              {/* Gran lago helado con patinadores */}
              <div className="absolute left-1/2 -translate-x-1/2 w-36 h-32 bg-gradient-to-br from-cyan-100/90 via-blue-200/85 to-cyan-300/80 rounded-full opacity-95 pointer-events-none z-5 shadow-2xl" style={{
                top: '1000px',
                border: '4px solid rgba(191, 219, 254, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 4px 16px rgba(255, 255, 255, 0.5)'
              }}>
                {/* Cristales de hielo brillantes */}
                <div className="absolute top-2 left-4 w-5 h-5 bg-white rounded-full opacity-80 animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="absolute top-5 right-6 w-4 h-4 bg-white rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2.3s' }} />
                <div className="absolute bottom-4 left-6 w-4 h-4 bg-white rounded-full opacity-65 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-3 right-7 w-3 h-3 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />

                {/* Patinadores */}
                <div className="absolute top-1/3 left-1/3 text-sm opacity-75">⛸️</div>
              </div>

              {/* Iglúes y aldea */}
              <div className="absolute left-12 pointer-events-none z-10" style={{ top: '1100px' }}>
                <div className="text-2xl opacity-85">🏔️</div>
                <div className="text-xl opacity-80 ml-3">⛺</div>
              </div>
              <div className="absolute right-20 text-2xl opacity-80 pointer-events-none z-10" style={{ top: '1120px' }}>🏔️</div>

              {/* Estación de esquí */}
              <div className="absolute left-28 pointer-events-none z-10" style={{ top: '1140px' }}>
                <div className="text-2xl opacity-85 drop-shadow-lg">🎿</div>
                <div className="text-lg opacity-75 ml-2">🏂</div>
              </div>

              {/* Teleférico */}
              <div className="absolute right-14 text-xl opacity-80 pointer-events-none z-10 drop-shadow-lg" style={{ top: '1150px' }}>🚡</div>

              {/* Trineos y perros */}
              <div className="absolute left-20 pointer-events-none z-10" style={{ top: '1180px' }}>
                <div className="text-base opacity-75">🛷</div>
                <div className="text-sm opacity-70 ml-3">🐕</div>
              </div>

              {/* Aurora boreal (efecto visual) */}
              <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-8" style={{
                top: '980px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.2) 20%, rgba(59, 130, 246, 0.2) 40%, rgba(139, 92, 246, 0.2) 60%, rgba(34, 211, 238, 0.2) 80%, transparent 100%)',
                opacity: 0.6,
                animation: 'pulse 12s ease-in-out infinite'
              }} />

              {/* Ventisca (efecto de nieve cayendo) */}
              <div className="absolute text-xs opacity-40 pointer-events-none z-12 animate-bounce" style={{ top: '1005px', left: '15%', animationDuration: '3s', animationDelay: '0s' }}>❄️</div>
              <div className="absolute text-xs opacity-35 pointer-events-none z-12 animate-bounce" style={{ top: '1020px', left: '35%', animationDuration: '3.5s', animationDelay: '0.5s' }}>❄️</div>
              <div className="absolute text-xs opacity-40 pointer-events-none z-12 animate-bounce" style={{ top: '1015px', right: '25%', animationDuration: '3.2s', animationDelay: '0.8s' }}>❄️</div>
              <div className="absolute text-xs opacity-30 pointer-events-none z-12 animate-bounce" style={{ top: '1030px', right: '15%', animationDuration: '3.8s', animationDelay: '1.2s' }}>❄️</div>

              {/* Yeti escondido */}
              <div className="absolute right-8 text-xl opacity-60 pointer-events-none z-10" style={{ top: '1200px' }}>👣</div>

              {/* Niveles en el mapa */}
              {levels.map((lvl, index) => {
                const isUnlocked = points >= lvl.pts;
                const isCurrent = playerLevel === lvl.num;

                // Posicionamiento en zigzag
                const row = Math.floor(index / 3);
                const col = index % 3;
                const isEvenRow = row % 2 === 0;

                let xPos;
                if (isEvenRow) {
                  xPos = col * 33 + 5;
                } else {
                  xPos = (2 - col) * 33 + 5;
                }

                const yPos = row * 32 + (col % 2 === 0 ? 0 : 5);

                // Determinar bioma según nivel
                let biomeBg, biomeIcon, biomeBorder;
                if (lvl.num <= 25) {
                  // Praderas
                  biomeBg = isUnlocked ? 'from-lime-400 to-green-500' : 'from-gray-400 to-gray-500';
                  biomeIcon = '🏡';
                  biomeBorder = 'border-lime-300';
                } else if (lvl.num <= 50) {
                  // Bosque
                  biomeBg = isUnlocked ? 'from-emerald-500 to-green-700' : 'from-gray-400 to-gray-500';
                  biomeIcon = '🏕️';
                  biomeBorder = 'border-emerald-400';
                } else if (lvl.num <= 75) {
                  // Montañas
                  biomeBg = isUnlocked ? 'from-stone-400 to-stone-600' : 'from-gray-400 to-gray-500';
                  biomeIcon = '🏔️';
                  biomeBorder = 'border-stone-300';
                } else {
                  // Nieve
                  biomeBg = isUnlocked ? 'from-cyan-200 to-blue-400' : 'from-gray-400 to-gray-500';
                  biomeIcon = '⛄';
                  biomeBorder = 'border-cyan-200';
                }

                // Calcular siguiente posición para el camino
                const showPath = index < levels.length - 1;
                const nextRow = Math.floor((index + 1) / 3);
                const nextCol = (index + 1) % 3;
                const nextIsEvenRow = nextRow % 2 === 0;

                let nextXPos;
                if (nextIsEvenRow) {
                  nextXPos = nextCol * 33 + 5;
                } else {
                  nextXPos = (2 - nextCol) * 33 + 5;
                }
                const nextYPos = nextRow * 32 + (nextCol % 2 === 0 ? 0 : 5);

                return (
                  <div key={lvl.num} className="absolute z-20" style={{ left: `${xPos}%`, top: `${yPos}px` }}>
                    {/* Sendero orgánico ultra realista conectando niveles */}
                    {showPath && isUnlocked && (
                      <>
                        {/* Sombra del camino */}
                        <div
                          className="absolute blur-md"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: `${Math.abs(nextXPos - xPos) * 3.8 + 45}px`,
                            height: '14px',
                            background: 'rgba(0,0,0,0.4)',
                            transform: `rotate(${Math.atan2(nextYPos - yPos, (nextXPos - xPos) * 3.8) * (180 / Math.PI)}deg) translateY(3px)`,
                            transformOrigin: '0 50%',
                            zIndex: 14,
                            borderRadius: '7px'
                          }}
                        />

                        {/* Camino principal con textura según bioma */}
                        <div
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: `${Math.abs(nextXPos - xPos) * 3.8 + 45}px`,
                            height: '12px',
                            background: lvl.num <= 25
                              ? 'linear-gradient(to right, #a16207 0%, #ca8a04 20%, #eab308 50%, #ca8a04 80%, #a16207 100%)'
                              : lvl.num <= 50
                              ? 'linear-gradient(to right, #78350f 0%, #92400e 20%, #a16207 50%, #92400e 80%, #78350f 100%)'
                              : lvl.num <= 75
                              ? 'linear-gradient(to right, #57534e 0%, #78716c 20%, #a8a29e 50%, #78716c 80%, #57534e 100%)'
                              : 'linear-gradient(to right, #0891b2 0%, #06b6d4 20%, #67e8f9 50%, #06b6d4 80%, #0891b2 100%)',
                            transform: `rotate(${Math.atan2(nextYPos - yPos, (nextXPos - xPos) * 3.8) * (180 / Math.PI)}deg)`,
                            transformOrigin: '0 50%',
                            zIndex: 15,
                            borderRadius: '6px',
                            border: lvl.num <= 75 ? '2px solid rgba(92, 64, 40, 0.7)' : '2px solid rgba(6, 182, 212, 0.6)',
                            boxShadow: `
                              inset 0 2px 6px rgba(0,0,0,0.4),
                              inset 0 -1px 4px rgba(255,255,255,0.3),
                              0 6px 12px rgba(0,0,0,0.5)
                            `,
                            backgroundImage: lvl.num <= 75
                              ? 'repeating-linear-gradient(90deg, transparent 0%, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)'
                              : 'repeating-linear-gradient(90deg, transparent 0%, transparent 3px, rgba(255,255,255,0.2) 3px, rgba(255,255,255,0.2) 6px)'
                          }}
                        />

                        {/* Piedras pequeñas en el camino */}
                        {lvl.num % 5 === 0 && (
                          <div
                            className="absolute text-xs opacity-60"
                            style={{
                              left: '55%',
                              top: '50%',
                              transform: `rotate(${Math.atan2(nextYPos - yPos, (nextXPos - xPos) * 3.8) * (180 / Math.PI)}deg)`,
                              transformOrigin: '0 50%',
                              zIndex: 16
                            }}
                          >
                            🪨
                          </div>
                        )}
                      </>
                    )}

                    {/* Nivel con estilo de construcción realista */}
                    <div className="relative">
                      {/* Sombra profunda realista */}
                      <div
                        className="absolute bg-black/50 rounded-full blur-xl"
                        style={{
                          top: '8px',
                          left: '2px',
                          right: '2px',
                          bottom: '-2px',
                          zIndex: 14
                        }}
                      />

                      {/* Base del nivel con efecto 3D ultra realista */}
                      <div
                        className={`relative w-24 h-24 rounded-3xl flex flex-col items-center justify-center font-black text-sm transition-all ${
                          isCurrent
                            ? 'scale-140 animate-pulse'
                            : 'scale-100 hover:scale-110'
                        }`}
                        style={{
                          zIndex: 20,
                          boxShadow: `
                            0 15px 40px rgba(0,0,0,0.6),
                            0 8px 16px rgba(0,0,0,0.4),
                            inset 0 -3px 12px rgba(0,0,0,0.4),
                            inset 0 3px 12px rgba(255,255,255,0.4),
                            inset 2px 0 8px rgba(255,255,255,0.2),
                            inset -2px 0 8px rgba(0,0,0,0.2)
                          `,
                          transform: isCurrent ? 'translateY(-4px)' : 'translateY(0)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {/* Estructura del nivel con arquitectura según bioma */}
                        <div
                          className={`w-full h-full rounded-3xl border-5 flex flex-col items-center justify-center ${
                            isCurrent
                              ? 'border-yellow-100'
                              : isUnlocked
                              ? biomeBorder
                              : 'border-gray-800'
                          }`}
                          style={{
                            background: isCurrent
                              ? 'linear-gradient(145deg, #fef3c7 0%, #fde047 15%, #fbbf24 40%, #f59e0b 70%, #d97706 90%, #b45309 100%)'
                              : isUnlocked
                              ? `linear-gradient(145deg, ${
                                  lvl.num <= 25
                                    ? '#ecfccb 0%, #d9f99d 20%, #a3e635 50%, #84cc16 75%, #65a30d 100%'
                                    : lvl.num <= 50
                                    ? '#d1fae5 0%, #6ee7b7 20%, #10b981 50%, #059669 75%, #047857 100%'
                                    : lvl.num <= 75
                                    ? '#e7e5e4 0%, #a8a29e 25%, #78716c 55%, #57534e 80%, #44403c 100%'
                                    : '#f0f9ff 0%, #bae6fd 20%, #67e8f9 45%, #22d3ee 70%, #06b6d4 90%, #0891b2 100%'
                                })`
                              : 'linear-gradient(145deg, #9ca3af 0%, #6b7280 30%, #4b5563 60%, #374151 90%, #1f2937 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: `
                              inset 0 2px 8px rgba(255,255,255,0.5),
                              inset 0 -2px 8px rgba(0,0,0,0.4)
                            `
                          }}
                        >
                          {/* Efecto de luz superior mejorado */}
                          <div
                            className="absolute top-0 left-0 right-0 h-2/5 rounded-t-2xl"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Brillo lateral izquierdo */}
                          <div
                            className="absolute top-0 left-0 bottom-0 w-1/4 rounded-l-2xl"
                            style={{
                              background: 'linear-gradient(to right, rgba(255,255,255,0.3), transparent)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Sombra inferior derecha */}
                          <div
                            className="absolute bottom-0 right-0 w-3/5 h-2/5 rounded-br-2xl"
                            style={{
                              background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.3), transparent 70%)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Textura según bioma */}
                          <div
                            className="absolute inset-0 rounded-2xl opacity-10"
                            style={{
                              backgroundImage: lvl.num <= 25
                                ? 'repeating-linear-gradient(45deg, transparent 0%, transparent 3px, rgba(132, 204, 22, 0.3) 3px, rgba(132, 204, 22, 0.3) 6px)'
                                : lvl.num <= 50
                                ? 'repeating-linear-gradient(90deg, transparent 0%, transparent 4px, rgba(5, 150, 105, 0.4) 4px, rgba(5, 150, 105, 0.4) 8px)'
                                : lvl.num <= 75
                                ? 'repeating-linear-gradient(30deg, transparent 0%, transparent 2px, rgba(68, 64, 60, 0.5) 2px, rgba(68, 64, 60, 0.5) 4px)'
                                : 'repeating-linear-gradient(60deg, transparent 0%, transparent 3px, rgba(34, 211, 238, 0.4) 3px, rgba(34, 211, 238, 0.4) 6px)',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Contenido del nivel mejorado */}
                          {isUnlocked ? (
                            <div className="flex flex-col items-center justify-center z-10 relative gap-1">
                              <span
                                className="text-2xl font-extrabold drop-shadow-2xl"
                                style={{
                                  textShadow: '3px 3px 6px rgba(0,0,0,0.6), 1px 1px 3px rgba(0,0,0,0.8)',
                                  color: isCurrent ? '#78350f' : '#ffffff'
                                }}
                              >
                                {lvl.num}
                              </span>
                              <span
                                className="text-xl opacity-95 drop-shadow-xl"
                                style={{
                                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                                }}
                              >
                                {biomeIcon}
                              </span>

                              {/* Indicador de nivel actual mejorado */}
                              {isCurrent && (
                                <div
                                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-2xl animate-pulse"
                                  style={{
                                    background: 'linear-gradient(145deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
                                    boxShadow: '0 6px 16px rgba(34, 197, 94, 0.8), inset 0 2px 4px rgba(255,255,255,0.4)'
                                  }}
                                >
                                  <Check className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={4} />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center z-10 relative gap-1">
                              <Lock
                                className="w-6 h-6 mb-1 drop-shadow-2xl opacity-80"
                                style={{
                                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.7))'
                                }}
                              />
                              <span
                                className="text-sm font-bold drop-shadow-lg opacity-70"
                                style={{
                                  textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
                                }}
                              >
                                {lvl.num}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hitos especiales con efectos mejorados */}
                      {lvl.num % 10 === 0 && isUnlocked && (
                        <div
                          className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-bounce z-25"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(251, 191, 36, 0.8))',
                            animationDuration: '2s'
                          }}
                        >
                          🏆
                        </div>
                      )}
                      {lvl.num % 25 === 0 && isUnlocked && (
                        <div
                          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-3xl z-25 animate-pulse"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(234, 179, 8, 0.8))',
                            animationDuration: '3s'
                          }}
                        >
                          ⭐
                        </div>
                      )}

                      {/* Nivel 100 - Corona especial */}
                      {lvl.num === 100 && isUnlocked && (
                        <div
                          className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl z-25"
                          style={{
                            filter: 'drop-shadow(0 6px 12px rgba(234, 179, 8, 1))',
                            animation: 'bounce 1.5s infinite'
                          }}
                        >
                          👑
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Altura dinámica */}
              <div style={{ height: `${Math.ceil(100 / 3) * 32 + 100}px` }} />
            </div>
          </div>

          {/* Información del siguiente nivel */}
          {playerLevel < 100 && (
            <div className="mt-4 bg-white/30 backdrop-blur rounded-xl p-4">
              <h3 className="text-white font-bold mb-2">🎯 Siguiente Nivel</h3>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Nivel {playerLevel + 1}</span>
                <span className="text-white font-bold">{levels[playerLevel].pts - points} puntos más</span>
              </div>
              <div className="mt-2 w-full bg-white/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500"
                  style={{
                    width: `${playerLevel > 0 ? ((points - levels[playerLevel - 1].pts) / (levels[playerLevel].pts - levels[playerLevel - 1].pts)) * 100 : (points / levels[0].pts) * 100}%`
                  }}
                />
              </div>
            </div>
          )}

          {/* Nivel máximo alcanzado */}
          {playerLevel === 100 && (
            <div className="mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-amber-900">🏆 ¡NIVEL MÁXIMO!</p>
              <p className="text-amber-900 font-bold">¡Eres un maestro de los hábitos!</p>
            </div>
          )}
        </div>
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
