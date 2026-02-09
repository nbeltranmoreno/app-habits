import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import HabitList from './components/HabitList';
import HabitModal from './components/HabitModal';
import WorldMap from './components/WorldMap';
import Equipment from './components/Equipment';
import Navigation from './components/Navigation';
import NotificationBanner from './components/NotificationBanner';
import HabitHistory from './components/HabitHistory';
import Rewards from './components/Rewards';
import HabitStats from './components/HabitStats';
import IndividualHabitStats from './components/IndividualHabitStats';
import BadHabits from './components/BadHabits';
import ThemeSelector from './components/ThemeSelector';
import LanguageSelector from './components/LanguageSelector';
import HabitStrikes from './components/HabitStrikes';
import Login from './components/Login';
import { useAuth } from './contexts/AuthContext';
import { useHabitsSync } from './hooks/useHabitsSync';
import { useNotifications } from './hooks/useNotifications';
import { useBattle } from './hooks/useBattle';
import { themes } from './themes';
import { translations } from './i18n';

export default function App() {
  const { user } = useAuth();
  const { habits, loading: habitsLoading, addHabit: addHabitDB, toggleHabit: toggleHabitDB, deleteHabit: deleteHabitDB } = useHabitsSync();

  // TODOS los hooks deben ir ANTES de cualquier return condicional
  const [showModal, setShowModal] = useState(false);
  const [showWorld, setShowWorld] = useState(false);
  const [showFight, setShowFight] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showIndividualStats, setShowIndividualStats] = useState(false);
  const [showBadHabits, setShowBadHabits] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showStrikes, setShowStrikes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('normal');
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [newHabit, setNewHabit] = useState('');
  const [newTime, setNewTime] = useState('08:00');
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const [badHabits, setBadHabits] = useState([
    { id: 1, name: 'Comer chatarra', avoided: null },
    { id: 2, name: 'Procrastinar', avoided: null }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [equipment, setEquipment] = useState({
    helmet: { name: 'Casco', level: 1, icon: '🪖', equipped: false, upgradeCost: 4 },
    armor: { name: 'Armadura', level: 1, icon: '🛡️', equipped: false, upgradeCost: 4 },
    weapon: { name: 'Espada', level: 1, icon: '⚔️', equipped: false, upgradeCost: 4 },
    boots: { name: 'Botas', level: 1, icon: '👢', equipped: false, upgradeCost: 4 },
    accessory: { name: 'Anillo', level: 1, icon: '💍', equipped: false, upgradeCost: 4 }
  });

  const completedHabits = habits.filter(h => h.completed).length;
  const avoidedBadHabits = badHabits.filter(h => h.avoided === true).length;
  const goodHabitsPoints = completedHabits * 2;
  const badHabitsPoints = avoidedBadHabits * 2;
  const points = goodHabitsPoints + badHabitsPoints;
  const availablePoints = points - totalPoints;

  // Calcular nivel del jugador (1-100)
  const calculatePlayerLevel = (pts) => {
    if (pts < 2) return 0;
    // Cada nivel requiere más puntos: nivel 1 = 2pts, nivel 2 = 4pts, nivel 3 = 7pts, etc.
    let level = 0;
    let totalPointsNeeded = 0;
    for (let i = 1; i <= 100; i++) {
      totalPointsNeeded += i + 1; // Nivel 1 necesita 2, nivel 2 necesita 3 más (total 5), etc.
      if (pts >= totalPointsNeeded) {
        level = i;
      } else {
        break;
      }
    }
    return level;
  };

  const playerLevel = calculatePlayerLevel(points);

  const getEquipmentBonus = () => {
    return Object.values(equipment).filter(e => e.equipped).reduce((acc, e) => acc + e.level * 2, 0);
  };

  const { notifPermission, requestPermission } = useNotifications(habits);
  const battleState = useBattle(playerLevel, equipment, getEquipmentBonus);

  // AHORA SÍ podemos hacer returns condicionales (después de todos los hooks)
  // Si no hay usuario, mostrar pantalla de login
  if (!user) {
    return <Login />;
  }

  const addHabit = async () => {
    if (newHabit.trim()) {
      try {
        await addHabitDB(newHabit, newTime);
        setNewHabit('');
        setNewTime('08:00');
        setShowModal(false);
      } catch (error) {
        console.error('Error adding habit:', error);
        alert('Error al agregar el hábito. Intenta de nuevo.');
      }
    }
  };

  const toggleHabit = async (id) => {
    await toggleHabitDB(id);
  };

  const deleteHabit = async (id) => {
    try {
      await deleteHabitDB(id);
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Error al eliminar el hábito. Intenta de nuevo.');
    }
  };

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

  const redeemReward = (reward) => {
    if (availablePoints >= reward.cost) {
      setTotalPoints(prev => prev + reward.cost);
      setRedeemedRewards(prev => [...prev, { ...reward, redeemedAt: new Date().toISOString() }]);
    }
  };

  const addBadHabit = (name) => {
    setBadHabits([...badHabits, { id: Date.now(), name, avoided: null }]);
  };

  const toggleBadHabit = (id, avoided) => {
    setBadHabits(badHabits.map(h => h.id === id ? { ...h, avoided } : h));
  };

  const deleteBadHabit = (id) => {
    setBadHabits(badHabits.filter(h => h.id !== id));
  };

  const theme = themes[currentTheme];
  const t = translations[currentLanguage];

  // Pantalla de carga
  if (habitsLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">✨</div>
          <p className="text-white font-bold text-xl">Cargando tus hábitos...</p>
        </div>
      </div>
    );
  }

  // Pantalla de Idiomas
  if (showLanguages) {
    return (
      <LanguageSelector
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
        setShowLanguages={setShowLanguages}
        theme={theme}
      />
    );
  }

  // Pantalla de Temas
  if (showThemes) {
    return (
      <ThemeSelector
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
        setShowThemes={setShowThemes}
      />
    );
  }

  // Pantalla de Malos Hábitos
  if (showBadHabits) {
    return (
      <BadHabits
        badHabits={badHabits}
        addBadHabit={addBadHabit}
        toggleBadHabit={toggleBadHabit}
        deleteBadHabit={deleteBadHabit}
        setShowBadHabits={setShowBadHabits}
        badHabitsPoints={badHabitsPoints}
      />
    );
  }

  // Pantalla de Estadísticas
  if (showStats) {
    return (
      <HabitStats
        habits={habits}
        setShowStats={setShowStats}
      />
    );
  }

  // Pantalla de Estadísticas Individuales
  if (showIndividualStats) {
    return (
      <IndividualHabitStats
        habits={habits}
        setShowIndividualStats={setShowIndividualStats}
        t={t}
      />
    );
  }

  // Pantalla de Rachas
  if (showStrikes) {
    return (
      <HabitStrikes
        habits={habits}
        setShowStrikes={setShowStrikes}
        t={t}
      />
    );
  }

  // Pantalla de Recompensas
  if (showRewards) {
    return (
      <Rewards
        availablePoints={availablePoints}
        onRedeemReward={redeemReward}
        setShowRewards={setShowRewards}
        redeemedRewards={redeemedRewards}
      />
    );
  }

  // Pantalla de Historial
  if (showHistory) {
    return (
      <HabitHistory
        habits={habits}
        setShowHistory={setShowHistory}
      />
    );
  }

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
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} p-4 relative overflow-hidden`}>
      {/* Elementos decorativos según el tema */}
      {currentTheme === 'volleyball' && (
        <>
          <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🏐</div>
          <div className="absolute bottom-20 left-5 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🏐</div>
          <div className="absolute top-1/3 left-10 text-7xl opacity-15">🥅</div>
          <div className="absolute bottom-1/3 right-10 text-7xl opacity-15">🥅</div>
        </>
      )}
      {currentTheme === 'football' && (
        <>
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>⚽</div>
          <div className="absolute bottom-32 right-5 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>⚽</div>
          <div className="absolute top-1/4 right-5 text-8xl opacity-15">🥅</div>
          <div className="absolute bottom-1/4 left-5 text-8xl opacity-15">🥅</div>
        </>
      )}
      {currentTheme === 'anime' && (
        <>
          <div className="absolute top-10 right-10 text-6xl opacity-25 animate-pulse" style={{ animationDuration: '2s' }}>🌸</div>
          <div className="absolute bottom-20 left-5 text-5xl opacity-25 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>💮</div>
          <div className="absolute top-1/3 left-5 text-6xl opacity-20">🎎</div>
          <div className="absolute bottom-1/3 right-5 text-6xl opacity-20">🎭</div>
          <div className="absolute top-1/2 right-10 text-5xl opacity-25 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>✨</div>
        </>
      )}
      {currentTheme === 'basketball' && (
        <>
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🏀</div>
          <div className="absolute bottom-32 right-5 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🏀</div>
          <div className="absolute top-1/4 right-5 text-7xl opacity-15">🏁</div>
          <div className="absolute bottom-1/4 left-5 text-6xl opacity-15">🎯</div>
        </>
      )}

      <div className="max-w-md mx-auto relative z-10">
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-5 py-2 flex items-center gap-2 shadow-xl z-20">
          <Sparkles className="w-5 h-5 text-yellow-600" />
          <span className="font-black text-yellow-800 text-lg">{points}</span>
        </div>

        {/* Botón de Temas */}
        <button
          onClick={() => setShowThemes(true)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center border-2 border-white/30 hover:scale-110 transition-transform shadow-xl z-20"
          title={t.themes}
        >
          <span className="text-2xl">{theme.icon}</span>
        </button>

        {/* Botón de Idiomas */}
        <button
          onClick={() => setShowLanguages(true)}
          className="absolute top-4 left-20 bg-white/20 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center border-2 border-white/30 hover:scale-110 transition-transform shadow-xl z-20"
          title={t.languages}
        >
          <span className="text-2xl">{translations[currentLanguage].flag}</span>
        </button>

        <header className="text-center py-6">
          <h1 className="text-4xl font-black text-white mb-2">✨ {t.myHabits} ✨</h1>
          <p className="text-white/90 font-medium">{completedHabits} {t.completedOf} {habits.length} {t.completed}</p>
        </header>

        <NotificationBanner notifPermission={notifPermission} requestPermission={requestPermission} />

        <HabitList habits={habits} toggleHabit={toggleHabit} deleteHabit={deleteHabit} t={t} />

        <Navigation setShowModal={setShowModal} setShowWorld={setShowWorld} setShowEquipment={setShowEquipment} setShowHistory={setShowHistory} setShowRewards={setShowRewards} setShowStats={setShowStats} setShowIndividualStats={setShowIndividualStats} setShowBadHabits={setShowBadHabits} setShowStrikes={setShowStrikes} theme={theme} t={t} />

        <HabitModal
          showModal={showModal}
          setShowModal={setShowModal}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          newTime={newTime}
          setNewTime={setNewTime}
          addHabit={addHabit}
          theme={theme}
          t={t}
        />
      </div>
    </div>
  );
}
