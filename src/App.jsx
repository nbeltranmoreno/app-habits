import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import HabitList from './components/HabitList';
import HabitModal from './components/HabitModal';
import WorldMap from './components/WorldMap';
import Equipment from './components/Equipment';
import Navigation from './components/Navigation';
import NotificationBanner from './components/NotificationBanner';
import { useNotifications } from './hooks/useNotifications';
import { useBattle } from './hooks/useBattle';

export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Meditar', time: '07:00', completed: false },
    { id: 2, name: 'Ejercicio', time: '18:00', completed: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showWorld, setShowWorld] = useState(false);
  const [showFight, setShowFight] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [newTime, setNewTime] = useState('08:00');

  const [totalPoints, setTotalPoints] = useState(0);
  const [equipment, setEquipment] = useState({
    helmet: { name: 'Casco', level: 1, icon: '🪖', equipped: false, upgradeCost: 4 },
    armor: { name: 'Armadura', level: 1, icon: '🛡️', equipped: false, upgradeCost: 4 },
    weapon: { name: 'Espada', level: 1, icon: '⚔️', equipped: false, upgradeCost: 4 },
    boots: { name: 'Botas', level: 1, icon: '👢', equipped: false, upgradeCost: 4 },
    accessory: { name: 'Anillo', level: 1, icon: '💍', equipped: false, upgradeCost: 4 }
  });

  const completedHabits = habits.filter(h => h.completed).length;
  const points = completedHabits * 2;
  const availablePoints = points - totalPoints;
  const playerLevel = points >= 12 ? 5 : points >= 10 ? 4 : points >= 8 ? 3 : points >= 5 ? 2 : points >= 2 ? 1 : 0;

  const getEquipmentBonus = () => {
    return Object.values(equipment).filter(e => e.equipped).reduce((acc, e) => acc + e.level * 2, 0);
  };

  const { notifPermission, requestPermission } = useNotifications(habits);
  const battleState = useBattle(playerLevel, equipment, getEquipmentBonus);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, time: newTime, completed: false }]);
      setNewHabit('');
      setNewTime('08:00');
      setShowModal(false);
    }
  };

  const toggleHabit = (id) => setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  const deleteHabit = (id) => setHabits(habits.filter(h => h.id !== id));

  const toggleEquip = (slot) => {
    setEquipment(prev => ({
      ...prev,
      [slot]: { ...prev[slot], equipped: !prev[slot].equipped }
    }));
  };

  const upgradeEquipment = (slot) => {
    const item = equipment[slot];
    if (availablePoints >= item.upgradeCost) {
      setTotalPoints(prev => prev + item.upgradeCost);
      setEquipment(prev => ({
        ...prev,
        [slot]: {
          ...prev[slot],
          level: prev[slot].level + 1,
          upgradeCost: Math.floor(prev[slot].upgradeCost * 1.5)
        }
      }));
    }
  };

  const startFight = () => {
    battleState.resetFight();
    setShowFight(true);
  };

  // Pantalla de Equipamiento
  if (showEquipment) {
    return (
      <Equipment
        equipment={equipment}
        availablePoints={availablePoints}
        toggleEquip={toggleEquip}
        upgradeEquipment={upgradeEquipment}
        getEquipmentBonus={getEquipmentBonus}
        setShowEquipment={setShowEquipment}
      />
    );
  }

  // Pantalla del Mundo
  if (showWorld) {
    return (
      <WorldMap
        showFight={showFight}
        setShowFight={setShowFight}
        setShowWorld={setShowWorld}
        points={points}
        startFight={startFight}
        {...battleState}
        equipment={equipment}
        playerLevel={playerLevel}
      />
    );
  }

  // Pantalla Principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-5 py-2 flex items-center gap-2 shadow-xl">
          <Sparkles className="w-5 h-5 text-yellow-600" />
          <span className="font-black text-yellow-800 text-lg">{points}</span>
        </div>

        <header className="text-center py-6">
          <h1 className="text-4xl font-black text-white mb-2">✨ Mis Hábitos ✨</h1>
          <p className="text-white/90 font-medium">{completedHabits} de {habits.length} completados</p>
        </header>

        <NotificationBanner notifPermission={notifPermission} requestPermission={requestPermission} />

        <HabitList habits={habits} toggleHabit={toggleHabit} deleteHabit={deleteHabit} />

        <Navigation setShowModal={setShowModal} setShowWorld={setShowWorld} setShowEquipment={setShowEquipment} />

        <HabitModal
          showModal={showModal}
          setShowModal={setShowModal}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          newTime={newTime}
          setNewTime={setNewTime}
          addHabit={addHabit}
        />
      </div>
    </div>
  );
}
