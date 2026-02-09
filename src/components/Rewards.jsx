import { ArrowLeft, Gift, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';

export default function Rewards({ availablePoints, onRedeemReward, setShowRewards, redeemedRewards }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rewards = [
    // Recompensas Pequeñas (2-6 puntos)
    { id: 1, name: '🍫 Chocolate', description: 'Tu chocolate favorito', cost: 2, category: 'small', icon: '🍫' },
    { id: 2, name: '🍿 Palomitas', description: 'Palomitas mientras ves algo', cost: 2, category: 'small', icon: '🍿' },
    { id: 3, name: '☕ Café Premium', description: 'Un café especial', cost: 4, category: 'small', icon: '☕' },
    { id: 4, name: '🎮 30 min Gaming', description: '30 minutos de videojuegos', cost: 4, category: 'small', icon: '🎮' },
    { id: 5, name: '📱 Redes Sociales', description: '20 minutos sin culpa', cost: 2, category: 'small', icon: '📱' },
    { id: 6, name: '🛌 Siesta', description: '30 minutos de siesta', cost: 6, category: 'small', icon: '🛌' },

    // Recompensas Medianas (8-14 puntos)
    { id: 7, name: '🍕 Pizza Favorita', description: 'Tu pizza preferida', cost: 8, category: 'medium', icon: '🍕' },
    { id: 8, name: '🎬 Película', description: 'Ver una película', cost: 8, category: 'medium', icon: '🎬' },
    { id: 9, name: '🎧 Álbum Nuevo', description: 'Comprar música nueva', cost: 10, category: 'medium', icon: '🎧' },
    { id: 10, name: '📚 Libro', description: 'Comprar un libro nuevo', cost: 12, category: 'medium', icon: '📚' },
    { id: 11, name: '🍔 Comida Favorita', description: 'Tu restaurante favorito', cost: 14, category: 'medium', icon: '🍔' },
    { id: 12, name: '💆 Masaje', description: 'Masaje de 1 hora', cost: 14, category: 'medium', icon: '💆' },

    // Recompensas Grandes (16-30 puntos)
    { id: 13, name: '👕 Ropa Nueva', description: 'Comprar ropa que te guste', cost: 16, category: 'large', icon: '👕' },
    { id: 14, name: '🎯 Hobby Especial', description: 'Invertir en tu hobby', cost: 18, category: 'large', icon: '🎯' },
    { id: 15, name: '🎮 Videojuego', description: 'Comprar un juego nuevo', cost: 20, category: 'large', icon: '🎮' },
    { id: 16, name: '🎨 Actividad Especial', description: 'Clase o taller que te guste', cost: 22, category: 'large', icon: '🎨' },
    { id: 17, name: '🎪 Salida Especial', description: 'Cine, concierto, evento', cost: 24, category: 'large', icon: '🎪' },
    { id: 18, name: '🎁 Regalo Grande', description: 'Un regalo costoso para ti', cost: 30, category: 'large', icon: '🎁' },
  ];

  const categories = [
    { id: 'all', name: 'Todas', color: 'bg-purple-500' },
    { id: 'small', name: 'Pequeñas', color: 'bg-green-500' },
    { id: 'medium', name: 'Medianas', color: 'bg-yellow-500' },
    { id: 'large', name: 'Grandes', color: 'bg-red-500' }
  ];

  const filteredRewards = selectedCategory === 'all'
    ? rewards
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward) => {
    if (availablePoints >= reward.cost) {
      onRedeemReward(reward);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'small': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'large': return 'from-red-400 to-red-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'small': return { text: 'Pequeña', color: 'bg-green-500' };
      case 'medium': return { text: 'Mediana', color: 'bg-yellow-500' };
      case 'large': return { text: 'Grande', color: 'bg-red-500' };
      default: return { text: '', color: '' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowRewards(false)}
              className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-3xl font-black text-white">🎁 Recompensas</h1>
          </div>
        </div>

        {/* Puntos Disponibles */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-medium mb-1">Puntos Disponibles</p>
              <p className="text-5xl font-black text-yellow-900">{availablePoints}</p>
            </div>
            <Sparkles className="w-16 h-16 text-yellow-600" />
          </div>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-bold text-white whitespace-nowrap transition-transform hover:scale-105 ${
                selectedCategory === cat.id ? cat.color : 'bg-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Historial de Recompensas Canjeadas */}
        {redeemedRewards.length > 0 && (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6 border-2 border-white/30">
            <h3 className="text-white font-black text-lg mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              Canjeadas Recientemente
            </h3>
            <div className="space-y-2">
              {redeemedRewards.slice(-3).reverse().map((reward, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{reward.name}</p>
                    <p className="text-white/70 text-xs">{reward.cost} puntos</p>
                  </div>
                  <span className="text-green-300 font-black text-xs">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de Recompensas */}
        <div className="space-y-3 mb-6">
          {filteredRewards.map(reward => {
            const canAfford = availablePoints >= reward.cost;
            const badge = getCategoryBadge(reward.category);

            return (
              <div
                key={reward.id}
                className={`bg-white/20 backdrop-blur rounded-2xl p-5 border-2 border-white/30 transition-all ${
                  canAfford ? 'hover:scale-105' : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icono */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(reward.category)} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                    {reward.icon}
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white font-black text-lg">{reward.name}</h3>
                      <span className={`${badge.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-3">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-yellow-300 font-black">{reward.cost} puntos</span>
                      </div>

                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-full font-bold text-white transition-all ${
                          canAfford
                            ? 'bg-gradient-to-r from-green-400 to-green-600 hover:scale-110 shadow-lg'
                            : 'bg-gray-500/50 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Canjear' : 'No alcanza'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
