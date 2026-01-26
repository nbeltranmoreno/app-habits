export default function KidCharacter({ isEnemy, anim, isHit, isAttacking, equipment, size = 'normal' }) {
  const scale = size === 'small' ? 0.5 : 1;
  const width = 95 * scale;
  const height = 175 * scale;

  return (
    <div className={`transition-all duration-300 ${anim} ${isHit ? 'brightness-125 scale-98' : ''} ${isAttacking ? 'scale-105' : ''}`}>
      <svg width={width} height={height} viewBox="0 0 95 175">
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
        <ellipse cx="47.5" cy="170" rx="18" ry="4" fill="rgba(0,0,0,0.12)"/>

        {/* ========== PIERNAS Y ZAPATOS ========== */}
        {/* Piernas de adolescente - más delgadas */}
        <path d="M34 118 L36 155 L44 155 L46 128 L46 128 L48 155 L56 155 L58 118"
              fill={isEnemy ? '#1a1a1a' : 'url(#jeansDark)'}/>
        {/* Costuras y pliegues del pantalón */}
        <path d="M38 126 Q39 138 38 150" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M54 126 Q53 138 54 150" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M40 132 Q41 135 40 138" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>
        <path d="M52 132 Q51 135 52 138" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>

        {/* Zapatos de adolescente */}
        <path d="M34 153 L32 162 Q34 167 46 167 L46 162 L44 153 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        <path d="M48 153 L46 162 Q49 167 61 167 L63 162 L56 153 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        {/* Detalles de zapatos */}
        <path d="M34 157 L44 157" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <path d="M48 157 L58 157" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <ellipse cx="39" cy="162" rx="4" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>
        <ellipse cx="53" cy="162" rx="4" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>

        {/* ========== TORSO DE ADOLESCENTE ========== */}
        {isEnemy ? (
          <>
            {/* Hoodie negro - hombros normales */}
            <path d="M26 62 Q18 68 16 80 L16 118 L79 118 L79 80 Q77 68 69 62 Z" fill="url(#blackHoodie)"/>
            {/* Sombras del hoodie */}
            <path d="M26 62 Q22 74 20 88 L20 116 L30 116 L32 70 Z" fill="#1f1f1f"/>
            <path d="M69 62 Q73 74 75 88 L75 116 L65 116 L63 70 Z" fill="#1f1f1f"/>
            {/* Bolsillo central */}
            <path d="M32 93 L32 113 L63 113 L63 93 Q47.5 88 32 93" fill="#2a2a2a" stroke="#353535" strokeWidth="0.5"/>
            {/* Capucha */}
            <path d="M28 62 Q33 55 47.5 58 Q62 55 67 62" fill="#2f2f2f"/>
            <path d="M26 64 Q31 58 47.5 60 Q64 58 69 64" stroke="#3a3a3a" strokeWidth="1" fill="none"/>
            {/* Cordones */}
            <line x1="44" y1="62" x2="42" y2="75" stroke="#555" strokeWidth="1.5"/>
            <line x1="51" y1="62" x2="53" y2="75" stroke="#555" strokeWidth="1.5"/>
            <circle cx="42" cy="77" r="2" fill="#555"/>
            <circle cx="53" cy="77" r="2" fill="#555"/>
          </>
        ) : (
          <>
            {/* Camiseta/armadura - torso de adolescente */}
            <path d="M26 62 Q18 68 16 80 L16 118 L79 118 L79 80 Q77 68 69 62 Z"
                  fill={equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)'}/>
            {/* Sombras laterales */}
            <path d="M26 62 Q22 74 20 88 L20 116 L30 116 L32 70 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>
            <path d="M69 62 Q73 74 75 88 L75 116 L65 116 L63 70 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>

            {equipment?.armor?.equipped ? (
              <>
                {/* Armadura ajustada */}
                <rect x="33" y="70" width="29" height="42" rx="2" fill="#8a9aab"/>
                <line x1="47.5" y1="70" x2="47.5" y2="112" stroke="#a8b5c4" strokeWidth="1.8"/>
                <line x1="33" y1="84" x2="62" y2="84" stroke="#a8b5c4" strokeWidth="1"/>
                <line x1="33" y1="98" x2="62" y2="98" stroke="#a8b5c4" strokeWidth="1"/>
                <ellipse cx="47.5" cy="77" rx="5" ry="3" fill="#b8c5d4" opacity="0.6"/>
                {/* Remaches */}
                <circle cx="36" cy="73" r="1.5" fill="#c8d0d8"/>
                <circle cx="59" cy="73" r="1.5" fill="#c8d0d8"/>
                <circle cx="36" cy="109" r="1.5" fill="#c8d0d8"/>
                <circle cx="59" cy="109" r="1.5" fill="#c8d0d8"/>
              </>
            ) : (
              <>
                {/* Cuello de camiseta */}
                <path d="M39 60 Q47.5 67 56 60" fill="#e8e8e8"/>
                <path d="M39 60 Q47.5 65 56 60" stroke="#d0d0d0" strokeWidth="0.5" fill="none"/>
                {/* Pliegues de tela */}
                <path d="M33 75 Q36 90 33 110" stroke="#2a5a90" strokeWidth="0.7" fill="none" opacity="0.4"/>
                <path d="M62 75 Q59 90 62 110" stroke="#2a5a90" strokeWidth="0.7" fill="none" opacity="0.4"/>
                <path d="M44 80 Q45 88 44 95" stroke="#2a5a90" strokeWidth="0.5" fill="none" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== BRAZOS DE ADOLESCENTE ========== */}
        {/* Brazo izquierdo - más delgado */}
        <path d="M16 68 Q10 75 8 88 L8 107 Q10 113 15 111 L18 108 Q16 95 18 82 L26 70 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>

        {/* Brazo derecho - más delgado */}
        <path d="M79 68 Q85 75 87 88 L87 107 Q85 113 80 111 L77 108 Q79 95 77 82 L69 70 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>

        {/* Manos de adolescente */}
        <ellipse cx="12" cy="113" rx="5" ry="6" fill="url(#skinLight)"/>
        <ellipse cx="83" cy="113" rx="5" ry="6" fill="url(#skinLight)"/>
        {/* Dedos sutiles */}
        <path d="M9 111 Q6 107 8 103" stroke="url(#skinLight)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M86 111 Q89 107 87 103" stroke="url(#skinLight)" strokeWidth="3" strokeLinecap="round"/>

        {/* Arma si está equipada */}
        {!isEnemy && equipment?.weapon?.equipped && (
          <>
            <rect x="85" y="93" width="4" height="28" fill="#8a8a8a" rx="1"/>
            <rect x="83" y="88" width="8" height="6" fill="#c9a227" rx="1"/>
            <rect x="84" y="85" width="6" height="4" fill="#a8850f"/>
            <line x1="87" y1="96" x2="87" y2="118" stroke="#a5a5a5" strokeWidth="0.8" opacity="0.5"/>
          </>
        )}

        {/* ========== CUELLO DE ADOLESCENTE ========== */}
        <path d="M40 52 L40 64 L55 64 L55 52" fill="url(#skinLight)"/>
        <path d="M42 54 Q44 57 42 61" stroke="url(#skinDark)" strokeWidth="0.7" fill="none" opacity="0.25"/>
        <path d="M53 54 Q51 57 53 61" stroke="url(#skinDark)" strokeWidth="0.7" fill="none" opacity="0.25"/>

        {/* ========== CABEZA DE ADOLESCENTE ========== */}
        {/* Forma de la cabeza - proporción juvenil */}
        <ellipse cx="47.5" cy="32" rx="21" ry="22" fill="url(#skinLight)"/>
        {/* Mandíbula suave de adolescente */}
        <path d="M26.5 38 L26.5 44 Q28 49 32 51 Q47.5 52 63 51 Q67 49 68.5 44 L68.5 38"
              fill="url(#skinLight)" stroke="url(#skinMid)" strokeWidth="0.3" opacity="0.4"/>

        {/* Estructura facial - sombras suaves de adolescente */}
        <path d="M27 34 Q29 40 31 46" stroke="url(#skinDark)" strokeWidth="1.5" fill="none" opacity="0.15"/>
        <path d="M68 34 Q66 40 64 46" stroke="url(#skinDark)" strokeWidth="1.5" fill="none" opacity="0.15"/>
        <ellipse cx="47.5" cy="44" rx="15" ry="8" fill="url(#skinMid)" opacity="0.1"/>

        {/* Orejas de adolescente */}
        <ellipse cx="25" cy="34" rx="4" ry="7.5" fill="url(#skinLight)"/>
        <ellipse cx="70" cy="34" rx="4" ry="7.5" fill="url(#skinLight)"/>
        <path d="M24 30 Q26 34 24 38" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M71 30 Q69 34 71 38" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="25" cy="34" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>
        <ellipse cx="70" cy="34" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>

        {/* ========== CABELLO ESTILO ADOLESCENTE ========== */}
        {isEnemy ? (
          <>
            {/* Cabello negro desordenado de adolescente */}
            <ellipse cx="47.5" cy="17" rx="23" ry="15" fill="url(#hairBlackBase)"/>
            {/* Volumen superior con más altura */}
            <path d="M24.5 28 Q27 16 37 13 Q47.5 9 58 13 Q68 16 70.5 28 L67 26 Q61 15 47.5 13 Q34 15 28 26 Z" fill="#1f1f1f"/>
            {/* Flequillo desordenado de adolescente */}
            <path d="M28 30 L32 35 L36 29 L41 34 L47.5 29 L54 34 L59 29 L63 35 L67 30" fill="url(#hairBlackBase)"/>
            {/* Mechón rebelde */}
            <path d="M44 24 Q46 30 50 32 L48 32 Q45 28 44 24 Z" fill="#151515"/>
            {/* Reflejos sutiles */}
            <ellipse cx="39" cy="15" rx="6" ry="2.5" fill="white" opacity="0.05"/>
            <ellipse cx="56" cy="14" rx="5" ry="2" fill="white" opacity="0.04"/>
          </>
        ) : (
          <>
            {/* Cabello castaño estilo adolescente moderno */}
            <ellipse cx="47.5" cy="16" rx="23" ry="15" fill="url(#hairBrownLight)"/>
            {/* Volumen superior con más altura */}
            <path d="M24.5 29 Q27 17 37 14 Q47.5 10 58 14 Q68 17 70.5 29 L66 27 Q59 16 47.5 14 Q36 16 29 27 Z" fill="url(#hairBrownDark)"/>
            {/* Flequillo moderno de adolescente */}
            <path d="M28 31 Q33 25 39 29 Q43 24 49 28 Q54 24 60 29 Q65 25 70 31
                     L68 33 Q63 28 58 31 Q52 27 47.5 30 Q43 27 37 31 Q32 29 28 33 Z" fill="url(#hairBrownLight)"/>
            {/* Patillas de adolescente */}
            <path d="M25 30 Q23 35 25 42 L27 40 Q26 35 27 30 Z" fill="url(#hairBrownDark)"/>
            <path d="M70 30 Q72 35 70 42 L68 40 Q69 35 68 30 Z" fill="url(#hairBrownDark)"/>
            {/* Reflejos naturales */}
            <ellipse cx="39" cy="17" rx="7" ry="3" fill="white" opacity="0.12"/>
            <ellipse cx="56" cy="16" rx="6" ry="2.5" fill="white" opacity="0.1"/>

            {/* Casco si está equipado */}
            {equipment?.helmet?.equipped && (
              <>
                <ellipse cx="47.5" cy="14" rx="21" ry="13" fill="#c9a227"/>
                <ellipse cx="47.5" cy="12" rx="18" ry="11" fill="#dab32f"/>
                <ellipse cx="47.5" cy="9" rx="14" ry="8" fill="#e8c547"/>
                <ellipse cx="47.5" cy="5" rx="5" ry="5" fill="#b83030"/>
                <ellipse cx="45.5" cy="3.5" rx="1.5" ry="1.5" fill="white" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== OJOS DE ADOLESCENTE ========== */}
        {isEnemy ? (
          <>
            {/* Ojos de adolescente */}
            <ellipse cx="37" cy="36" rx="6.5" ry="6" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="58" cy="36" rx="6.5" ry="6" fill="url(#eyeWhiteReal)"/>
            {/* Iris marrón/rojizo */}
            <ellipse cx="37" cy="37" rx="4.2" ry="4.8" fill="url(#irisRedReal)"/>
            <ellipse cx="58" cy="37" rx="4.2" ry="4.8" fill="url(#irisRedReal)"/>
            {/* Pupila */}
            <ellipse cx="37" cy="37.5" rx="2" ry="2.4" fill="#1a0a0a"/>
            <ellipse cx="58" cy="37.5" rx="2" ry="2.4" fill="#1a0a0a"/>
            {/* Reflejo de luz */}
            <circle cx="35" cy="35" r="1.4" fill="white" opacity="0.9"/>
            <circle cx="56" cy="35" r="1.4" fill="white" opacity="0.9"/>
            <circle cx="38" cy="38.5" r="0.7" fill="white" opacity="0.5"/>
            <circle cx="59" cy="38.5" r="0.7" fill="white" opacity="0.5"/>
            {/* Párpados */}
            <path d="M30.5 35 Q37 30 43.5 35" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            <path d="M51.5 35 Q58 30 64.5 35" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            {/* Línea inferior */}
            <path d="M31 38 Q37 39.5 43 38" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            <path d="M52 38 Q58 39.5 64 38" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            {/* Cejas fruncidas */}
            <path d="M29 29 L43 32" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M66 29 L52 32" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/>
          </>
        ) : (
          <>
            {/* Ojos expresivos de adolescente */}
            <ellipse cx="37" cy="36" rx="6.5" ry="6.5" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="58" cy="36" rx="6.5" ry="6.5" fill="url(#eyeWhiteReal)"/>
            {/* Párpado superior */}
            <path d="M30.5 35 Q37 30 43.5 35" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M51.5 35 Q58 30 64.5 35" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Pestañas sutiles */}
            <path d="M31 34 L29 31" stroke="#3a2a20" strokeWidth="1" strokeLinecap="round"/>
            <path d="M64 34 L66 31" stroke="#3a2a20" strokeWidth="1" strokeLinecap="round"/>
            {/* Iris azul */}
            <ellipse cx="37" cy="37" rx="4.2" ry="4.8" fill="url(#irisBlueReal)"/>
            <ellipse cx="58" cy="37" rx="4.2" ry="4.8" fill="url(#irisBlueReal)"/>
            {/* Borde del iris */}
            <ellipse cx="37" cy="37" rx="4.2" ry="4.8" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            <ellipse cx="58" cy="37" rx="4.2" ry="4.8" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            {/* Pupila */}
            <ellipse cx="37" cy="37.5" rx="2" ry="2.4" fill="#0a1520"/>
            <ellipse cx="58" cy="37.5" rx="2" ry="2.4" fill="#0a1520"/>
            {/* Reflejos */}
            <circle cx="35" cy="35.5" r="1.4" fill="white" opacity="0.85"/>
            <circle cx="56" cy="35.5" r="1.4" fill="white" opacity="0.85"/>
            <circle cx="38" cy="38.5" r="0.7" fill="white" opacity="0.4"/>
            <circle cx="59" cy="38.5" r="0.7" fill="white" opacity="0.4"/>
            {/* Línea inferior */}
            <path d="M31.5 39 Q37 40.5 42.5 39" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            <path d="M52.5 39 Q58 40.5 63.5 39" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            {/* Cejas naturales de adolescente */}
            <path d="M30 30 Q37 27 43 30" stroke="#4a3525" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
            <path d="M52 30 Q58 27 65 30" stroke="#4a3525" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
          </>
        )}

        {/* Rubor sutil de adolescente */}
        <ellipse cx="29" cy="42" rx="3.5" ry="2" fill="#e8a0a0" opacity="0.12"/>
        <ellipse cx="66" cy="42" rx="3.5" ry="2" fill="#e8a0a0" opacity="0.12"/>

        {/* Nariz de adolescente */}
        <path d="M47.5 39 L45.5 45 Q47.5 47 49.5 45 Z" fill="url(#skinMid)" opacity="0.45"/>
        <path d="M45.5 45 Q47.5 46.5 49.5 45" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.55"/>
        {/* Puente nasal sutil */}
        <path d="M46.5 39 L46.5 43" stroke="url(#skinDark)" strokeWidth="0.6" fill="none" opacity="0.18"/>
        <path d="M48.5 39 L48.5 43" stroke="url(#skinDark)" strokeWidth="0.6" fill="none" opacity="0.18"/>
        {/* Fosas nasales */}
        <ellipse cx="45" cy="45" rx="1.2" ry="0.7" fill="url(#skinDark)" opacity="0.25"/>
        <ellipse cx="50" cy="45" rx="1.2" ry="0.7" fill="url(#skinDark)" opacity="0.25"/>

        {/* Boca de adolescente */}
        {isEnemy ? (
          <>
            <path d="M39 51 Q47.5 50 56 51" stroke="#8a5050" strokeWidth="1.7" fill="none"/>
            <path d="M41 51 L41 50" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
            <path d="M54 51 L54 50" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
          </>
        ) : (
          <>
            {/* Labios de adolescente */}
            <path d="M39 50 Q47.5 53 56 50" stroke="#c47a7a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            <path d="M41 51 Q47.5 52.5 54 51" fill="#d4a0a0" opacity="0.35"/>
            {/* Línea del labio superior */}
            <path d="M42 49 Q47.5 48 53 49" stroke="#c47a7a" strokeWidth="0.5" fill="none" opacity="0.6"/>
            {/* Brillo sutil */}
            <ellipse cx="47.5" cy="50.5" rx="2" ry="0.8" fill="white" opacity="0.12"/>
          </>
        )}

        {/* Accesorio ajustado */}
        {!isEnemy && equipment?.accessory?.equipped && (
          <>
            <circle cx="70" cy="34" r="4" fill="#7c3aed"/>
            <circle cx="68.5" cy="32.5" r="1.2" fill="white" opacity="0.4"/>
          </>
        )}
      </svg>
    </div>
  );
}
