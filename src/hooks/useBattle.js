import { useState } from 'react';

export function useBattle(playerLevel, equipment, getEquipmentBonus) {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerAnim, setPlayerAnim] = useState('');
  const [enemyAnim, setEnemyAnim] = useState('');
  const [playerHit, setPlayerHit] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [battleMsg, setBattleMsg] = useState('¡Elige tu ataque!');
  const [fighting, setFighting] = useState(false);
  const [showDamage, setShowDamage] = useState({ show: false, amount: 0, isEnemy: false });
  const [comboCount, setComboCount] = useState(0);

  const attack = (type) => {
    if (fighting || enemyHP <= 0 || playerHP <= 0) return;
    setFighting(true);
    const baseDmg = type === 'fuerte' ? 22 : 14;
    const equipBonus = getEquipmentBonus();
    const dmg = baseDmg + playerLevel * 3 + comboCount * 2 + equipBonus;
    setPlayerAttacking(true);
    setPlayerAnim('translate-x-10');
    setBattleMsg(type === 'fuerte' ? '💥 ¡¡SUPER GOLPE!!' : '⚡ ¡Golpe rápido!');

    setTimeout(() => {
      setPlayerAnim(''); setPlayerAttacking(false); setEnemyHit(true);
      setShowDamage({ show: true, amount: dmg, isEnemy: true });
      setEnemyHP(prev => Math.max(0, prev - dmg));
      setComboCount(c => c + 1);

      setTimeout(() => {
        setEnemyHit(false); setShowDamage({ show: false, amount: 0, isEnemy: false });
        if (enemyHP - dmg <= 0) {
          setBattleMsg('🏆 ¡¡GANASTE!! 🏆');
          setFighting(false);
          return;
        }
        const eDmg = Math.floor(Math.random() * 12) + 8;
        setEnemyAttacking(true);
        setEnemyAnim('-translate-x-10');
        setBattleMsg('😈 ¡El malo ataca!');

        setTimeout(() => {
          setEnemyAnim(''); setEnemyAttacking(false); setPlayerHit(true);
          setShowDamage({ show: true, amount: eDmg, isEnemy: false });
          setPlayerHP(prev => Math.max(0, prev - eDmg));

          setTimeout(() => {
            setPlayerHit(false); setShowDamage({ show: false, amount: 0, isEnemy: false });
            if (playerHP - eDmg <= 0) {
              setBattleMsg('💀 ¡Oh no! 💀');
              setComboCount(0);
            } else {
              setBattleMsg(`🎯 ¡Tu turno! Combo: x${comboCount + 1}`);
            }
            setFighting(false);
          }, 400);
        }, 450);
      }, 500);
    }, 450);
  };

  const resetFight = () => {
    setPlayerHP(100);
    setEnemyHP(100);
    setBattleMsg('¡Elige tu ataque!');
    setComboCount(0);
  };

  return {
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
    attack,
    resetFight
  };
}
