export default function KidCharacter({ isEnemy, anim, isHit, isAttacking, equipment, size = 'normal' }) {
  const scale = size === 'small' ? 0.5 : 1;
  const width = 100 * scale;
  const height = 180 * scale;

  return (
    <div className={`transition-all duration-300 ${anim} ${isHit ? 'brightness-125 scale-98' : ''} ${isAttacking ? 'scale-105' : ''}`}>
      <svg width={width} height={height} viewBox="0 0 100 180">
        <defs>
          {/* Gradientes de piel realista */}
          <linearGradient id="skinLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fce4d6"/>
            <stop offset="30%" stopColor="#f5d5c8"/>
            <stop offset="70%" stopColor="#eec4b3"/>
            <stop offset="100%" stopColor="#e5b5a0"/>
          </linearGradient>
          <linearGradient id="skinMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5d5c8"/>
            <stop offset="100%" stopColor="#daa590"/>
          </linearGradient>
          <linearGradient id="skinDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#daa590"/>
            <stop offset="100%" stopColor="#c99580"/>
          </linearGradient>

          {/* Gradientes de cabello */}
          <linearGradient id="hairBrownLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b4423"/>
            <stop offset="50%" stopColor="#5a3a1f"/>
            <stop offset="100%" stopColor="#4a2f18"/>
          </linearGradient>
          <linearGradient id="hairBrownDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a2f18"/>
            <stop offset="100%" stopColor="#3a2410"/>
          </linearGradient>
          <linearGradient id="hairBlackBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a"/>
            <stop offset="50%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#0f0f0f"/>
          </linearGradient>

          {/* Gradientes de ojos */}
          <radialGradient id="eyeWhiteReal" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="70%" stopColor="#f8f8f8"/>
            <stop offset="100%" stopColor="#e8e8e8"/>
          </radialGradient>
          <radialGradient id="irisBlueReal" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#6ba3d6"/>
            <stop offset="30%" stopColor="#4a8bc4"/>
            <stop offset="60%" stopColor="#3a7ab5"/>
            <stop offset="100%" stopColor="#2a5a8a"/>
          </radialGradient>
          <radialGradient id="irisRedReal" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#c46a6a"/>
            <stop offset="30%" stopColor="#a54545"/>
            <stop offset="60%" stopColor="#8a3030"/>
            <stop offset="100%" stopColor="#5a1a1a"/>
          </radialGradient>

          {/* Gradientes de ropa */}
          <linearGradient id="blueShirt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b7dd8"/>
            <stop offset="50%" stopColor="#2d6bc4"/>
            <stop offset="100%" stopColor="#1f5aaa"/>
          </linearGradient>
          <linearGradient id="blackHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a3a3a"/>
            <stop offset="50%" stopColor="#2a2a2a"/>
            <stop offset="100%" stopColor="#1a1a1a"/>
          </linearGradient>
          <linearGradient id="armorMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a8b5c4"/>
            <stop offset="30%" stopColor="#8a9aab"/>
            <stop offset="70%" stopColor="#6a7a8b"/>
            <stop offset="100%" stopColor="#5a6a7a"/>
          </linearGradient>
          <linearGradient id="jeansDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a3a50"/>
            <stop offset="100%" stopColor="#1a2a3a"/>
          </linearGradient>
        </defs>

        {/* Sombra suave en el suelo */}
        <ellipse cx="50" cy="175" rx="20" ry="4" fill="rgba(0,0,0,0.12)"/>

        {/* ========== PIERNAS Y ZAPATOS ========== */}
        {/* Piernas más largas y definidas para adulto */}
        <path d="M35 120 L37 160 L46 160 L48 130 L48 130 L50 160 L59 160 L61 120"
              fill={isEnemy ? '#1a1a1a' : 'url(#jeansDark)'}/>
        {/* Costuras y pliegues del pantalón */}
        <path d="M39 128 Q40 140 39 155" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M57 128 Q56 140 57 155" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M42 135 Q43 138 42 142" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>
        <path d="M54 135 Q53 138 54 142" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>

        {/* Zapatos más grandes para adulto */}
        <path d="M35 158 L33 167 Q35 172 48 172 L48 167 L46 158 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        <path d="M50 158 L48 167 Q51 172 64 172 L66 167 L59 158 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        {/* Detalles de zapatos */}
        <path d="M35 162 L46 162" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <path d="M50 162 L61 162" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <ellipse cx="40" cy="167" rx="5" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>
        <ellipse cx="56" cy="167" rx="5" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>

        {/* ========== TORSO MÁS ANCHO (HOMBRE ADULTO) ========== */}
        {isEnemy ? (
          <>
            {/* Hoodie negro - hombros más anchos */}
            <path d="M22 60 Q12 66 10 78 L10 120 L86 120 L86 78 Q84 66 74 60 Z" fill="url(#blackHoodie)"/>
            {/* Sombras del hoodie */}
            <path d="M22 60 Q18 72 15 88 L15 118 L28 118 L30 68 Z" fill="#1f1f1f"/>
            <path d="M74 60 Q78 72 81 88 L81 118 L68 118 L66 68 Z" fill="#1f1f1f"/>
            {/* Bolsillo central */}
            <path d="M32 95 L32 115 L64 115 L64 95 Q48 90 32 95" fill="#2a2a2a" stroke="#353535" strokeWidth="0.5"/>
            {/* Capucha */}
            <path d="M25 60 Q32 53 48 56 Q64 53 71 60" fill="#2f2f2f"/>
            <path d="M22 62 Q28 56 48 58 Q68 56 74 62" stroke="#3a3a3a" strokeWidth="1" fill="none"/>
            {/* Cordones */}
            <line x1="44" y1="60" x2="42" y2="76" stroke="#555" strokeWidth="1.5"/>
            <line x1="52" y1="60" x2="54" y2="76" stroke="#555" strokeWidth="1.5"/>
            <circle cx="42" cy="78" r="2" fill="#555"/>
            <circle cx="54" cy="78" r="2" fill="#555"/>
          </>
        ) : (
          <>
            {/* Camiseta/armadura - torso más ancho y musculoso */}
            <path d="M22 60 Q12 66 10 78 L10 120 L86 120 L86 78 Q84 66 74 60 Z"
                  fill={equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)'}/>
            {/* Sombras laterales - definición muscular */}
            <path d="M22 60 Q18 72 15 88 L15 118 L28 118 L30 68 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>
            <path d="M74 60 Q78 72 81 88 L81 118 L68 118 L66 68 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>

            {/* Definición pectoral */}
            <path d="M30 72 Q35 78 40 75 Q48 73 48 78" stroke={equipment?.armor?.equipped ? '#6a7a8a' : '#2a5a9a'}
                  strokeWidth="1.2" fill="none" opacity="0.3"/>
            <path d="M66 72 Q61 78 56 75 Q48 73 48 78" stroke={equipment?.armor?.equipped ? '#6a7a8a' : '#2a5a9a'}
                  strokeWidth="1.2" fill="none" opacity="0.3"/>

            {equipment?.armor?.equipped ? (
              <>
                {/* Armadura más grande y detallada */}
                <rect x="32" y="68" width="32" height="45" rx="2" fill="#8a9aab"/>
                <line x1="48" y1="68" x2="48" y2="113" stroke="#a8b5c4" strokeWidth="2"/>
                <line x1="32" y1="82" x2="64" y2="82" stroke="#a8b5c4" strokeWidth="1.2"/>
                <line x1="32" y1="98" x2="64" y2="98" stroke="#a8b5c4" strokeWidth="1.2"/>
                <ellipse cx="48" cy="75" rx="6" ry="4" fill="#b8c5d4" opacity="0.6"/>
                {/* Remaches */}
                <circle cx="36" cy="71" r="2" fill="#c8d0d8"/>
                <circle cx="60" cy="71" r="2" fill="#c8d0d8"/>
                <circle cx="36" cy="110" r="2" fill="#c8d0d8"/>
                <circle cx="60" cy="110" r="2" fill="#c8d0d8"/>
              </>
            ) : (
              <>
                {/* Cuello de camiseta */}
                <path d="M38 58 Q48 66 58 58" fill="#e8e8e8"/>
                <path d="M38 58 Q48 64 58 58" stroke="#d0d0d0" strokeWidth="0.5" fill="none"/>
                {/* Pliegues de tela */}
                <path d="M32 75 Q35 90 32 110" stroke="#2a5a90" strokeWidth="0.8" fill="none" opacity="0.4"/>
                <path d="M64 75 Q61 90 64 110" stroke="#2a5a90" strokeWidth="0.8" fill="none" opacity="0.4"/>
                <path d="M44 80 Q46 88 44 95" stroke="#2a5a90" strokeWidth="0.6" fill="none" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== BRAZOS MÁS MUSCULOSOS (ADULTO) ========== */}
        {/* Brazo izquierdo - más grueso */}
        <path d="M10 66 Q4 73 2 86 L2 106 Q4 115 10 113 L14 110 Q12 96 14 80 L22 68 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>
        {/* Definición bíceps izquierdo */}
        <path d="M12 72 Q8 78 10 88" stroke={isEnemy ? '#252525' : (equipment?.armor?.equipped ? '#6a7a8a' : '#1f4a8a')}
              strokeWidth="1.5" fill="none" opacity="0.3"/>

        {/* Brazo derecho - más grueso */}
        <path d="M86 66 Q92 73 94 86 L94 106 Q92 115 86 113 L82 110 Q84 96 82 80 L74 68 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>
        {/* Definición bíceps derecho */}
        <path d="M84 72 Q88 78 86 88" stroke={isEnemy ? '#252525' : (equipment?.armor?.equipped ? '#6a7a8a' : '#1f4a8a')}
              strokeWidth="1.5" fill="none" opacity="0.3"/>

        {/* Manos más grandes y masculinas */}
        <ellipse cx="8" cy="115" rx="6" ry="7" fill="url(#skinLight)"/>
        <ellipse cx="88" cy="115" rx="6" ry="7" fill="url(#skinLight)"/>
        {/* Dedos más definidos */}
        <path d="M4 113 Q1 108 3 103" stroke="url(#skinLight)" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M92 113 Q95 108 93 103" stroke="url(#skinLight)" strokeWidth="3.5" strokeLinecap="round"/>
        {/* Nudillos sutiles */}
        <ellipse cx="6" cy="114" rx="1.5" ry="1" fill="url(#skinDark)" opacity="0.2"/>
        <ellipse cx="90" cy="114" rx="1.5" ry="1" fill="url(#skinDark)" opacity="0.2"/>

        {/* Arma si está equipada - posición ajustada */}
        {!isEnemy && equipment?.weapon?.equipped && (
          <>
            <rect x="90" y="92" width="5" height="30" fill="#8a8a8a" rx="1"/>
            <rect x="88" y="87" width="9" height="7" fill="#c9a227" rx="1"/>
            <rect x="89" y="84" width="7" height="5" fill="#a8850f"/>
            <line x1="92.5" y1="95" x2="92.5" y2="119" stroke="#a5a5a5" strokeWidth="1" opacity="0.5"/>
          </>
        )}

        {/* ========== CUELLO MÁS GRUESO (ADULTO) ========== */}
        <path d="M38 48 L38 62 L58 62 L58 48" fill="url(#skinLight)"/>
        {/* Nuez de Adán */}
        <ellipse cx="48" cy="54" rx="3" ry="4" fill="url(#skinMid)" opacity="0.3"/>
        <path d="M42 52 Q44 56 42 60" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.3"/>
        <path d="M54 52 Q52 56 54 60" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.3"/>

        {/* ========== CABEZA MÁS PEQUEÑA Y MASCULINA ========== */}
        {/* Forma de la cabeza - proporción adulta con mandíbula definida */}
        <ellipse cx="48" cy="30" rx="20" ry="20" fill="url(#skinLight)"/>
        {/* Mandíbula más cuadrada y definida */}
        <path d="M28 35 L28 42 Q30 48 35 50 Q48 52 61 50 Q66 48 68 42 L68 35"
              fill="url(#skinLight)" stroke="url(#skinMid)" strokeWidth="0.5" opacity="0.5"/>

        {/* Estructura facial - sombras más marcadas para hombre */}
        <path d="M28 32 Q30 38 32 45" stroke="url(#skinDark)" strokeWidth="2" fill="none" opacity="0.2"/>
        <path d="M68 32 Q66 38 64 45" stroke="url(#skinDark)" strokeWidth="2" fill="none" opacity="0.2"/>
        <ellipse cx="48" cy="42" rx="16" ry="8" fill="url(#skinMid)" opacity="0.12"/>

        {/* Sombra de barba/vello facial */}
        {!isEnemy && (
          <>
            <ellipse cx="48" cy="46" rx="12" ry="6" fill="#3a3a3a" opacity="0.08"/>
            <path d="M36 44 Q42 46 48 46 Q54 46 60 44" stroke="#3a3a3a" strokeWidth="1.5" fill="none" opacity="0.1"/>
            <path d="M32 40 Q35 45 35 48" stroke="#3a3a3a" strokeWidth="1" fill="none" opacity="0.08"/>
            <path d="M64 40 Q61 45 61 48" stroke="#3a3a3a" strokeWidth="1" fill="none" opacity="0.08"/>
          </>
        )}

        {/* Orejas ajustadas para adulto */}
        <ellipse cx="25" cy="32" rx="4" ry="7" fill="url(#skinLight)"/>
        <ellipse cx="71" cy="32" rx="4" ry="7" fill="url(#skinLight)"/>
        <path d="M24 28 Q26 32 24 36" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M72 28 Q70 32 72 36" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="25" cy="32" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>
        <ellipse cx="71" cy="32" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>

        {/* ========== CABELLO CORTO ESTILO ADULTO ========== */}
        {isEnemy ? (
          <>
            {/* Cabello negro corto y desordenado */}
            <ellipse cx="48" cy="16" rx="22" ry="14" fill="url(#hairBlackBase)"/>
            {/* Volumen superior corto */}
            <path d="M26 26 Q28 16 38 13 Q48 10 58 13 Q68 16 70 26 L67 24 Q62 16 48 14 Q34 16 29 24 Z" fill="#1f1f1f"/>
            {/* Flequillo corto */}
            <path d="M30 28 L34 32 L38 28 L42 32 L48 28 L54 32 L58 28 L62 32 L66 28" fill="url(#hairBlackBase)"/>
            {/* Reflejos muy sutiles */}
            <ellipse cx="40" cy="14" rx="5" ry="2" fill="white" opacity="0.05"/>
            <ellipse cx="56" cy="13" rx="4" ry="2" fill="white" opacity="0.04"/>
          </>
        ) : (
          <>
            {/* Cabello castaño corto estilo hombre */}
            <ellipse cx="48" cy="14" rx="22" ry="13" fill="url(#hairBrownLight)"/>
            {/* Volumen superior */}
            <path d="M26 27 Q28 17 38 14 Q48 11 58 14 Q68 17 70 27 L66 25 Q60 17 48 15 Q36 17 30 25 Z" fill="url(#hairBrownDark)"/>
            {/* Flequillo corto y peinado hacia un lado */}
            <path d="M30 29 Q34 24 40 27 Q44 24 50 27 Q56 25 62 28 Q66 26 70 29
                     L68 31 Q64 27 58 29 Q52 27 48 29 Q42 27 36 30 Q32 28 30 31 Z" fill="url(#hairBrownLight)"/>
            {/* Patillas cortas */}
            <path d="M26 28 Q24 32 26 38 L28 36 Q27 32 28 28 Z" fill="url(#hairBrownDark)"/>
            <path d="M70 28 Q72 32 70 38 L68 36 Q69 32 68 28 Z" fill="url(#hairBrownDark)"/>
            {/* Reflejos naturales */}
            <ellipse cx="40" cy="16" rx="6" ry="2.5" fill="white" opacity="0.12"/>
            <ellipse cx="56" cy="15" rx="5" ry="2" fill="white" opacity="0.1"/>

            {/* Casco si está equipado - ajustado */}
            {equipment?.helmet?.equipped && (
              <>
                <ellipse cx="48" cy="12" rx="20" ry="12" fill="#c9a227"/>
                <ellipse cx="48" cy="10" rx="17" ry="10" fill="#dab32f"/>
                <ellipse cx="48" cy="8" rx="13" ry="7" fill="#e8c547"/>
                <ellipse cx="48" cy="4" rx="4" ry="4" fill="#b83030"/>
                <ellipse cx="46" cy="3" rx="1.5" ry="1.5" fill="white" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== OJOS MÁS PEQUEÑOS (ADULTO) ========== */}
        {isEnemy ? (
          <>
            {/* Ojos más pequeños y afilados */}
            <ellipse cx="38" cy="32" rx="6" ry="5" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="58" cy="32" rx="6" ry="5" fill="url(#eyeWhiteReal)"/>
            {/* Iris marrón/rojizo */}
            <ellipse cx="38" cy="33" rx="4" ry="4.5" fill="url(#irisRedReal)"/>
            <ellipse cx="58" cy="33" rx="4" ry="4.5" fill="url(#irisRedReal)"/>
            {/* Pupila */}
            <ellipse cx="38" cy="33.5" rx="1.8" ry="2.2" fill="#1a0a0a"/>
            <ellipse cx="58" cy="33.5" rx="1.8" ry="2.2" fill="#1a0a0a"/>
            {/* Reflejo de luz */}
            <circle cx="36.5" cy="31.5" r="1.2" fill="white" opacity="0.9"/>
            <circle cx="56.5" cy="31.5" r="1.2" fill="white" opacity="0.9"/>
            {/* Párpados más gruesos */}
            <path d="M32 31 Q38 27 44 31" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            <path d="M52 31 Q58 27 64 31" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            {/* Línea inferior */}
            <path d="M32 34 Q38 35 44 34" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            <path d="M52 34 Q58 35 64 34" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            {/* Cejas más gruesas y fruncidas */}
            <path d="M30 25 L44 28" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M66 25 L52 28" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
          </>
        ) : (
          <>
            {/* Ojos más pequeños y masculinos */}
            <ellipse cx="38" cy="32" rx="6" ry="5.5" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="58" cy="32" rx="6" ry="5.5" fill="url(#eyeWhiteReal)"/>
            {/* Párpado superior */}
            <path d="M32 31 Q38 27 44 31" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M52 31 Q58 27 64 31" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Iris azul */}
            <ellipse cx="38" cy="33" rx="4" ry="4.5" fill="url(#irisBlueReal)"/>
            <ellipse cx="58" cy="33" rx="4" ry="4.5" fill="url(#irisBlueReal)"/>
            {/* Borde del iris */}
            <ellipse cx="38" cy="33" rx="4" ry="4.5" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            <ellipse cx="58" cy="33" rx="4" ry="4.5" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            {/* Pupila */}
            <ellipse cx="38" cy="33.5" rx="1.8" ry="2.2" fill="#0a1520"/>
            <ellipse cx="58" cy="33.5" rx="1.8" ry="2.2" fill="#0a1520"/>
            {/* Reflejos */}
            <circle cx="36.5" cy="31.5" r="1.3" fill="white" opacity="0.85"/>
            <circle cx="56.5" cy="31.5" r="1.3" fill="white" opacity="0.85"/>
            <circle cx="39" cy="34" r="0.6" fill="white" opacity="0.4"/>
            <circle cx="59" cy="34" r="0.6" fill="white" opacity="0.4"/>
            {/* Línea inferior */}
            <path d="M33 35 Q38 36 43 35" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            <path d="M53 35 Q58 36 63 35" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            {/* Cejas más gruesas y masculinas */}
            <path d="M31 26 Q38 24 44 26" stroke="#4a3525" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M52 26 Q58 24 65 26" stroke="#4a3525" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </>
        )}

        {/* Rubor muy sutil (menos en hombres) */}
        <ellipse cx="30" cy="38" rx="3" ry="1.5" fill="#e8a0a0" opacity="0.08"/>
        <ellipse cx="66" cy="38" rx="3" ry="1.5" fill="#e8a0a0" opacity="0.08"/>

        {/* Nariz más grande y masculina */}
        <path d="M48 36 L46 42 Q48 44 50 42 Z" fill="url(#skinMid)" opacity="0.5"/>
        <path d="M46 42 Q48 43.5 50 42" stroke="url(#skinDark)" strokeWidth="1.2" fill="none" opacity="0.6"/>
        {/* Puente nasal más definido */}
        <path d="M47 36 L47 40" stroke="url(#skinDark)" strokeWidth="0.8" fill="none" opacity="0.2"/>
        <path d="M49 36 L49 40" stroke="url(#skinDark)" strokeWidth="0.8" fill="none" opacity="0.2"/>
        {/* Fosas nasales más grandes */}
        <ellipse cx="45.5" cy="42" rx="1.5" ry="0.8" fill="url(#skinDark)" opacity="0.3"/>
        <ellipse cx="50.5" cy="42" rx="1.5" ry="0.8" fill="url(#skinDark)" opacity="0.3"/>

        {/* Boca más grande y masculina */}
        {isEnemy ? (
          <>
            <path d="M38 48 Q48 47 58 48" stroke="#8a5050" strokeWidth="2" fill="none"/>
            <path d="M40 48 L40 47" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
            <path d="M56 48 L56 47" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
          </>
        ) : (
          <>
            {/* Labios más finos y masculinos */}
            <path d="M38 46 Q48 48 58 46" stroke="#b87070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M40 47 Q48 48 56 47" fill="#d4a0a0" opacity="0.2"/>
            {/* Línea del labio superior */}
            <path d="M42 45 Q48 44 54 45" stroke="#b87070" strokeWidth="0.6" fill="none" opacity="0.5"/>
            {/* Comisuras definidas */}
            <path d="M38 46 Q36 47 36 48" stroke="url(#skinDark)" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M58 46 Q60 47 60 48" stroke="url(#skinDark)" strokeWidth="0.5" fill="none" opacity="0.3"/>
          </>
        )}

        {/* Accesorio ajustado a nueva posición de oreja */}
        {!isEnemy && equipment?.accessory?.equipped && (
          <>
            <circle cx="71" cy="32" r="4" fill="#7c3aed"/>
            <circle cx="69.5" cy="30.5" r="1.2" fill="white" opacity="0.4"/>
          </>
        )}
      </svg>
    </div>
  );
}
