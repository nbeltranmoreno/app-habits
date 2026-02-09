import { ArrowLeft, Sparkles, ArrowUp } from 'lucide-react';
import KidCharacter from './KidCharacter';

export default function Equipment({
  equipment,
  availablePoints,
  toggleEquip,
  upgradeEquipment,
  getEquipmentBonus,
  setShowEquipment
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4 relative overflow-hidden">
      <button onClick={() => setShowEquipment(false)} className="absolute top-4 left-4 bg-white/20 backdrop-blur rounded-full p-2 z-50">
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Puntos disponibles */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
        <Sparkles className="w-5 h-5 text-yellow-100" />
        <span className="font-black text-white">{availablePoints}</span>
      </div>

      <h1 className="text-center text-2xl font-black text-white mt-12">⚔️ Equipamiento ⚔️</h1>

      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {/* Casco */}
          <div></div>
          <div onClick={() => toggleEquip('helmet')} className={`${equipment.helmet.equipped ? 'bg-amber-600 border-amber-400' : 'bg-slate-700 border-slate-500'} rounded-xl p-2 flex flex-col items-center cursor-pointer border-2`}>
            <span className="text-2xl">{equipment.helmet.icon}</span>
            <span className="text-white text-xs font-bold">Nv.{equipment.helmet.level}</span>
          </div>
          <div></div>

          {/* Arma - Personaje - Armadura */}
          <div onClick={() => toggleEquip('weapon')} className={`${equipment.weapon.equipped ? 'bg-red-600 border-red-400' : 'bg-slate-700 border-slate-500'} rounded-xl p-2 flex flex-col items-center cursor-pointer border-2`}>
            <span className="text-2xl">{equipment.weapon.icon}</span>
            <span className="text-white text-xs font-bold">Nv.{equipment.weapon.level}</span>
          </div>

          {/* Personaje niño */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-1 flex flex-col items-center border-2 border-blue-400">
            <KidCharacter isEnemy={false} equipment={equipment} size="small" />
          </div>

          <div onClick={() => toggleEquip('armor')} className={`${equipment.armor.equipped ? 'bg-blue-600 border-blue-400' : 'bg-slate-700 border-slate-500'} rounded-xl p-2 flex flex-col items-center cursor-pointer border-2`}>
            <span className="text-2xl">{equipment.armor.icon}</span>
            <span className="text-white text-xs font-bold">Nv.{equipment.armor.level}</span>
          </div>

          {/* Accesorio - Botas */}
          <div onClick={() => toggleEquip('accessory')} className={`${equipment.accessory.equipped ? 'bg-purple-600 border-purple-400' : 'bg-slate-700 border-slate-500'} rounded-xl p-2 flex flex-col items-center cursor-pointer border-2`}>
            <span className="text-2xl">{equipment.accessory.icon}</span>
            <span className="text-white text-xs font-bold">Nv.{equipment.accessory.level}</span>
          </div>
          <div onClick={() => toggleEquip('boots')} className={`${equipment.boots.equipped ? 'bg-green-600 border-green-400' : 'bg-slate-700 border-slate-500'} rounded-xl p-2 flex flex-col items-center cursor-pointer border-2`}>
            <span className="text-2xl">{equipment.boots.icon}</span>
            <span className="text-white text-xs font-bold">Nv.{equipment.boots.level}</span>
          </div>
          <div></div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-3">
        <h2 className="text-white font-bold mb-2">📊 Estadísticas</h2>
        <div className="flex justify-between text-white text-sm">
          <span>Bonus de Equipo:</span>
          <span className="font-bold text-amber-400">+{getEquipmentBonus()} daño</span>
        </div>
      </div>

      {/* Mejorar equipo */}
      <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-3">
        <h2 className="text-white font-bold mb-3">⬆️ Mejorar Equipo</h2>
        <div className="space-y-2">
          {Object.entries(equipment).map(([key, item]) => (
            <div key={key} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.name} Nv.{item.level}</p>
                <p className="text-white/60 text-xs">+{item.level * 2} daño</p>
              </div>
              <button
                onClick={() => upgradeEquipment(key)}
                disabled={availablePoints < item.upgradeCost}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold ${availablePoints >= item.upgradeCost ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'}`}
              >
                <ArrowUp className="w-4 h-4" />
                {item.upgradeCost}⭐
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-white/50 text-xs mt-3">
        💡 Toca items para equipar • Gasta puntos para mejorar
      </p>
    </div>
  );
}
