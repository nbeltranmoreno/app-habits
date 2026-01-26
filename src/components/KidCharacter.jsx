export default function KidCharacter({ isEnemy, anim, isHit, isAttacking, equipment, size = 'normal' }) {
  const scale = size === 'small' ? 0.5 : 1;
  const width = 90 * scale;
  const height = 170 * scale;

  return (
    <div className={`transition-all duration-300 ${anim} ${isHit ? 'brightness-125 scale-98' : ''} ${isAttacking ? 'scale-105' : ''}`}>
      <svg width={width} height={height} viewBox="0 0 90 170">
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
        <ellipse cx="45" cy="167" rx="18" ry="4" fill="rgba(0,0,0,0.12)"/>

        {/* ========== PIERNAS Y ZAPATOS ========== */}
        {/* Piernas con jeans */}
        <path d="M32 118 L34 152 L44 152 L45 128 L45 128 L46 152 L56 152 L58 118"
              fill={isEnemy ? '#1a1a1a' : 'url(#jeansDark)'}/>
        {/* Costuras y pliegues del pantalón */}
        <path d="M36 125 Q38 135 36 148" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M54 125 Q52 135 54 148" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M40 130 Q42 132 40 135" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>
        <path d="M50 130 Q48 132 50 135" stroke={isEnemy ? '#252525' : '#3a4a5a'} strokeWidth="0.5" fill="none" opacity="0.3"/>

        {/* Zapatos realistas */}
        <path d="M32 150 L30 158 Q32 163 45 163 L45 158 L44 150 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        <path d="M46 150 L45 158 Q48 163 60 163 L62 158 L56 150 Z"
              fill={isEnemy ? '#1a1a1a' : (equipment?.boots?.equipped ? '#2d8a4e' : '#3a3a3a')}/>
        {/* Detalles de zapatos */}
        <path d="M32 154 L44 154" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <path d="M46 154 L58 154" stroke={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} strokeWidth="1"/>
        <ellipse cx="37" cy="158" rx="4" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>
        <ellipse cx="53" cy="158" rx="4" ry="2" fill={isEnemy ? '#252525' : (equipment?.boots?.equipped ? '#3a9a5e' : '#4a4a4a')} opacity="0.5"/>

        {/* ========== TORSO ========== */}
        {isEnemy ? (
          <>
            {/* Hoodie negro */}
            <path d="M25 62 Q18 68 16 80 L16 120 L74 120 L74 80 Q72 68 65 62 Z" fill="url(#blackHoodie)"/>
            {/* Sombras del hoodie */}
            <path d="M25 62 Q22 75 20 90 L20 118 L30 118 L32 70 Z" fill="#1f1f1f"/>
            <path d="M65 62 Q68 75 70 90 L70 118 L60 118 L58 70 Z" fill="#1f1f1f"/>
            {/* Bolsillo central */}
            <path d="M30 95 L30 115 L60 115 L60 95 Q45 90 30 95" fill="#2a2a2a" stroke="#353535" strokeWidth="0.5"/>
            {/* Capucha */}
            <path d="M28 62 Q32 55 45 58 Q58 55 62 62" fill="#2f2f2f"/>
            <path d="M25 64 Q28 58 45 60 Q62 58 65 64" stroke="#3a3a3a" strokeWidth="1" fill="none"/>
            {/* Cordones */}
            <line x1="42" y1="62" x2="40" y2="78" stroke="#555" strokeWidth="1.5"/>
            <line x1="48" y1="62" x2="50" y2="78" stroke="#555" strokeWidth="1.5"/>
            <circle cx="40" cy="80" r="2" fill="#555"/>
            <circle cx="50" cy="80" r="2" fill="#555"/>
          </>
        ) : (
          <>
            {/* Chaqueta/camiseta azul o armadura */}
            <path d="M25 62 Q18 68 16 80 L16 120 L74 120 L74 80 Q72 68 65 62 Z"
                  fill={equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)'}/>
            {/* Sombras laterales */}
            <path d="M25 62 Q22 75 20 90 L20 118 L30 118 L32 70 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>
            <path d="M65 62 Q68 75 70 90 L70 118 L60 118 L58 70 Z"
                  fill={equipment?.armor?.equipped ? '#5a6a7a' : '#1f5aaa'}/>

            {equipment?.armor?.equipped ? (
              <>
                {/* Armadura detallada */}
                <rect x="32" y="70" width="26" height="40" rx="2" fill="#8a9aab"/>
                <line x1="45" y1="70" x2="45" y2="110" stroke="#a8b5c4" strokeWidth="1.5"/>
                <line x1="32" y1="85" x2="58" y2="85" stroke="#a8b5c4" strokeWidth="1"/>
                <line x1="32" y1="100" x2="58" y2="100" stroke="#a8b5c4" strokeWidth="1"/>
                <ellipse cx="45" cy="78" rx="5" ry="3" fill="#b8c5d4" opacity="0.6"/>
                {/* Remaches */}
                <circle cx="35" cy="73" r="1.5" fill="#c8d0d8"/>
                <circle cx="55" cy="73" r="1.5" fill="#c8d0d8"/>
                <circle cx="35" cy="107" r="1.5" fill="#c8d0d8"/>
                <circle cx="55" cy="107" r="1.5" fill="#c8d0d8"/>
              </>
            ) : (
              <>
                {/* Cuello de camiseta */}
                <path d="M38 60 Q45 68 52 60" fill="#e8e8e8"/>
                <path d="M38 60 Q45 66 52 60" stroke="#d0d0d0" strokeWidth="0.5" fill="none"/>
                {/* Pliegues de tela */}
                <path d="M35 75 Q38 90 35 110" stroke="#2a5a90" strokeWidth="0.7" fill="none" opacity="0.4"/>
                <path d="M55 75 Q52 90 55 110" stroke="#2a5a90" strokeWidth="0.7" fill="none" opacity="0.4"/>
                <path d="M42 80 Q44 88 42 95" stroke="#2a5a90" strokeWidth="0.5" fill="none" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== BRAZOS ========== */}
        {/* Brazo izquierdo */}
        <path d="M16 68 Q10 75 8 88 L8 105 Q10 112 15 110 L18 108 Q16 95 18 82 L25 70 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>
        {/* Brazo derecho */}
        <path d="M74 68 Q80 75 82 88 L82 105 Q80 112 75 110 L72 108 Q74 95 72 82 L65 70 Z"
              fill={isEnemy ? 'url(#blackHoodie)' : (equipment?.armor?.equipped ? 'url(#armorMetal)' : 'url(#blueShirt)')}/>

        {/* Manos realistas */}
        <ellipse cx="12" cy="112" rx="5" ry="6" fill="url(#skinLight)"/>
        <ellipse cx="78" cy="112" rx="5" ry="6" fill="url(#skinLight)"/>
        {/* Dedos sutiles */}
        <path d="M9 110 Q6 106 8 102" stroke="url(#skinLight)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M81 110 Q84 106 82 102" stroke="url(#skinLight)" strokeWidth="3" strokeLinecap="round"/>

        {/* Arma si está equipada */}
        {!isEnemy && equipment?.weapon?.equipped && (
          <>
            <rect x="80" y="90" width="4" height="28" fill="#8a8a8a" rx="1"/>
            <rect x="78" y="85" width="8" height="6" fill="#c9a227" rx="1"/>
            <rect x="79" y="82" width="6" height="4" fill="#a8850f"/>
            <line x1="82" y1="93" x2="82" y2="115" stroke="#a5a5a5" strokeWidth="0.8" opacity="0.5"/>
          </>
        )}

        {/* ========== CUELLO ========== */}
        <path d="M38 52 L38 64 L52 64 L52 52" fill="url(#skinLight)"/>
        <path d="M40 55 Q42 58 40 62" stroke="url(#skinDark)" strokeWidth="0.8" fill="none" opacity="0.3"/>

        {/* ========== CABEZA ========== */}
        {/* Forma de la cabeza */}
        <ellipse cx="45" cy="32" rx="22" ry="24" fill="url(#skinLight)"/>

        {/* Estructura facial - sombras */}
        <path d="M28 35 Q30 42 33 48" stroke="url(#skinDark)" strokeWidth="1.5" fill="none" opacity="0.15"/>
        <path d="M62 35 Q60 42 57 48" stroke="url(#skinDark)" strokeWidth="1.5" fill="none" opacity="0.15"/>
        <ellipse cx="45" cy="45" rx="15" ry="8" fill="url(#skinMid)" opacity="0.1"/>

        {/* Orejas realistas */}
        <ellipse cx="23" cy="34" rx="4" ry="8" fill="url(#skinLight)"/>
        <ellipse cx="67" cy="34" rx="4" ry="8" fill="url(#skinLight)"/>
        <path d="M22 30 Q24 34 22 38" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M68 30 Q66 34 68 38" stroke="url(#skinDark)" strokeWidth="1" fill="none" opacity="0.4"/>
        <ellipse cx="23" cy="34" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>
        <ellipse cx="67" cy="34" rx="2" ry="4" fill="url(#skinMid)" opacity="0.3"/>

        {/* ========== CABELLO REALISTA ========== */}
        {isEnemy ? (
          <>
            {/* Base del cabello negro */}
            <ellipse cx="45" cy="18" rx="24" ry="18" fill="url(#hairBlackBase)"/>
            {/* Volumen superior */}
            <path d="M21 28 Q24 15 35 12 Q45 8 55 12 Q66 15 69 28 L65 26 Q60 15 45 13 Q30 15 25 26 Z" fill="#1f1f1f"/>
            {/* Mechones frontales desordenados */}
            <path d="M25 30 L30 38 L28 25 L36 36 L38 20 L45 35 L52 20 L54 36 L62 25 L60 38 L65 30" fill="url(#hairBlackBase)"/>
            {/* Mechón sobre el ojo */}
            <path d="M36 22 Q40 32 46 42 L42 42 Q36 34 34 25 Z" fill="#151515"/>
            {/* Reflejos muy sutiles */}
            <ellipse cx="38" cy="16" rx="6" ry="3" fill="white" opacity="0.05"/>
            <ellipse cx="55" cy="14" rx="5" ry="2" fill="white" opacity="0.04"/>
          </>
        ) : (
          <>
            {/* Base del cabello castaño */}
            <ellipse cx="45" cy="16" rx="24" ry="17" fill="url(#hairBrownLight)"/>
            {/* Volumen y capas */}
            <path d="M21 30 Q24 18 35 14 Q45 10 55 14 Q66 18 69 30 L64 28 Q58 18 45 16 Q32 18 26 28 Z" fill="url(#hairBrownDark)"/>
            {/* Flequillo natural con ondas suaves */}
            <path d="M26 32 Q32 24 38 30 Q42 22 48 28 Q52 22 56 30 Q62 24 66 32
                     L63 35 Q58 28 54 33 Q50 26 46 32 Q42 26 38 33 Q32 28 28 35 Z" fill="url(#hairBrownLight)"/>
            {/* Mechones laterales */}
            <path d="M21 30 Q18 42 22 55 L28 52 Q24 42 26 32 Z" fill="url(#hairBrownDark)"/>
            <path d="M69 30 Q72 42 68 55 L62 52 Q66 42 64 32 Z" fill="url(#hairBrownDark)"/>
            {/* Reflejos naturales sutiles */}
            <ellipse cx="36" cy="18" rx="7" ry="3" fill="white" opacity="0.1"/>
            <ellipse cx="54" cy="16" rx="6" ry="3" fill="white" opacity="0.08"/>

            {/* Casco si está equipado */}
            {equipment?.helmet?.equipped && (
              <>
                <ellipse cx="45" cy="14" rx="22" ry="14" fill="#c9a227"/>
                <ellipse cx="45" cy="12" rx="18" ry="11" fill="#dab32f"/>
                <ellipse cx="45" cy="10" rx="14" ry="8" fill="#e8c547"/>
                <ellipse cx="45" cy="6" rx="5" ry="5" fill="#b83030"/>
                <ellipse cx="43" cy="4" rx="1.5" ry="1.5" fill="white" opacity="0.3"/>
              </>
            )}
          </>
        )}

        {/* ========== OJOS REALISTAS ========== */}
        {isEnemy ? (
          <>
            {/* Forma de ojos más afilada */}
            <ellipse cx="36" cy="36" rx="7" ry="6" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="54" cy="36" rx="7" ry="6" fill="url(#eyeWhiteReal)"/>
            {/* Iris marrón/rojizo */}
            <ellipse cx="36" cy="37" rx="4.5" ry="5" fill="url(#irisRedReal)"/>
            <ellipse cx="54" cy="37" rx="4.5" ry="5" fill="url(#irisRedReal)"/>
            {/* Pupila */}
            <ellipse cx="36" cy="37.5" rx="2" ry="2.5" fill="#1a0a0a"/>
            <ellipse cx="54" cy="37.5" rx="2" ry="2.5" fill="#1a0a0a"/>
            {/* Reflejo de luz pequeño */}
            <circle cx="34" cy="35" r="1.5" fill="white" opacity="0.9"/>
            <circle cx="52" cy="35" r="1.5" fill="white" opacity="0.9"/>
            <circle cx="37" cy="38.5" r="0.8" fill="white" opacity="0.5"/>
            <circle cx="55" cy="38.5" r="0.8" fill="white" opacity="0.5"/>
            {/* Párpados */}
            <path d="M29 35 Q36 30 43 35" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
            <path d="M47 35 Q54 30 61 35" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
            {/* Línea de agua */}
            <path d="M29 38 Q36 40 43 38" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            <path d="M47 38 Q54 40 61 38" stroke="#d4a5a5" strokeWidth="0.5" fill="none" opacity="0.5"/>
            {/* Cejas fruncidas */}
            <path d="M28 28 L42 32" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M62 28 L48 32" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
          </>
        ) : (
          <>
            {/* Ojos expresivos pero realistas */}
            <ellipse cx="36" cy="36" rx="7" ry="7" fill="url(#eyeWhiteReal)"/>
            <ellipse cx="54" cy="36" rx="7" ry="7" fill="url(#eyeWhiteReal)"/>
            {/* Párpado superior con pestañas */}
            <path d="M29 35 Q36 29 43 35" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M47 35 Q54 29 61 35" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Pestañas sutiles */}
            <path d="M30 34 L28 31" stroke="#3a2a20" strokeWidth="1" strokeLinecap="round"/>
            <path d="M60 34 L62 31" stroke="#3a2a20" strokeWidth="1" strokeLinecap="round"/>
            {/* Iris azul realista */}
            <ellipse cx="36" cy="37" rx="4.5" ry="5" fill="url(#irisBlueReal)"/>
            <ellipse cx="54" cy="37" rx="4.5" ry="5" fill="url(#irisBlueReal)"/>
            {/* Borde del iris */}
            <ellipse cx="36" cy="37" rx="4.5" ry="5" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            <ellipse cx="54" cy="37" rx="4.5" ry="5" fill="none" stroke="#2a4a6a" strokeWidth="0.5" opacity="0.5"/>
            {/* Pupila */}
            <ellipse cx="36" cy="37.5" rx="2" ry="2.5" fill="#0a1520"/>
            <ellipse cx="54" cy="37.5" rx="2" ry="2.5" fill="#0a1520"/>
            {/* Reflejos de luz naturales */}
            <circle cx="34.5" cy="35.5" r="1.5" fill="white" opacity="0.85"/>
            <circle cx="52.5" cy="35.5" r="1.5" fill="white" opacity="0.85"/>
            <circle cx="37" cy="38.5" r="0.7" fill="white" opacity="0.4"/>
            <circle cx="55" cy="38.5" r="0.7" fill="white" opacity="0.4"/>
            {/* Línea de agua inferior */}
            <path d="M30 39 Q36 41 42 39" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            <path d="M48 39 Q54 41 60 39" stroke="#e8c8c8" strokeWidth="0.4" fill="none" opacity="0.4"/>
            {/* Cejas naturales */}
            <path d="M29 29 Q36 26 42 29" stroke="#4a3525" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M48 29 Q54 26 61 29" stroke="#4a3525" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </>
        )}

        {/* Rubor muy sutil y natural */}
        <ellipse cx="28" cy="42" rx="4" ry="2" fill="#e8a0a0" opacity="0.15"/>
        <ellipse cx="62" cy="42" rx="4" ry="2" fill="#e8a0a0" opacity="0.15"/>

        {/* Nariz realista */}
        <path d="M45 38 L43 46 Q45 48 47 46 Z" fill="url(#skinMid)" opacity="0.4"/>
        <path d="M43 46 Q45 47 47 46" stroke="url(#skinDark)" strokeWidth="0.8" fill="none" opacity="0.5"/>
        {/* Fosa nasal sutil */}
        <ellipse cx="44" cy="46" rx="1" ry="0.5" fill="url(#skinDark)" opacity="0.2"/>
        <ellipse cx="46" cy="46" rx="1" ry="0.5" fill="url(#skinDark)" opacity="0.2"/>

        {/* Boca realista */}
        {isEnemy ? (
          <>
            <path d="M38 52 Q45 50 52 52" stroke="#8a5050" strokeWidth="1.5" fill="none"/>
            <path d="M40 52 L40 51" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
            <path d="M50 52 L50 51" stroke="#8a5050" strokeWidth="0.5" opacity="0.5"/>
          </>
        ) : (
          <>
            {/* Labios con volumen */}
            <path d="M38 50 Q45 54 52 50" stroke="#c47a7a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M40 51 Q45 53 50 51" fill="#d4a0a0" opacity="0.4"/>
            {/* Línea del labio superior */}
            <path d="M42 49 Q45 48 48 49" stroke="#c47a7a" strokeWidth="0.5" fill="none" opacity="0.6"/>
            {/* Brillo sutil */}
            <ellipse cx="45" cy="50" rx="2" ry="0.8" fill="white" opacity="0.15"/>
          </>
        )}

        {/* Accesorio */}
        {!isEnemy && equipment?.accessory?.equipped && (
          <>
            <circle cx="67" cy="34" r="4" fill="#7c3aed"/>
            <circle cx="65.5" cy="32.5" r="1.2" fill="white" opacity="0.4"/>
          </>
        )}
      </svg>
    </div>
  );
}
