import { ArrowLeft, Check, Globe } from 'lucide-react';
import { translations } from '../i18n';

export default function LanguageSelector({ currentLanguage, setLanguage, setShowLanguages, theme }) {
  const languages = Object.values(translations);
  const t = translations[currentLanguage];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} p-4`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowLanguages(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              <Globe className="w-8 h-8" />
              {t.languages}
            </h1>
            <p className="text-white/90 text-sm font-medium">{t.selectLanguage}</p>
          </div>
        </div>

        {/* Idioma Actual */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <p className="text-white/80 font-medium mb-2">{t.currentLanguage}</p>
          <div className="flex items-center gap-3">
            <span className="text-5xl">{translations[currentLanguage].flag}</span>
            <div>
              <p className="text-white font-black text-2xl">{translations[currentLanguage].name}</p>
            </div>
          </div>
        </div>

        {/* Lista de Idiomas */}
        <div className="space-y-3 mb-6">
          {languages.map(language => {
            const isActive = currentLanguage === language.code;

            return (
              <button
                key={language.code}
                onClick={() => setLanguage(language.code)}
                className={`w-full bg-white/20 backdrop-blur rounded-2xl p-6 border-2 ${
                  isActive ? 'border-white/70 scale-105' : 'border-white/30'
                } hover:scale-105 transition-all`}
              >
                <div className="flex items-center gap-4">
                  {/* Bandera */}
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center shadow-xl border-2 border-white/30">
                    <span className="text-5xl">{language.flag}</span>
                  </div>

                  {/* Nombre del idioma */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-black text-2xl">{language.name}</p>
                      {isActive && (
                        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30 text-center">
          <p className="text-white/80 text-sm">
            {currentLanguage === 'es' && 'El idioma se aplicará a toda la aplicación'}
            {currentLanguage === 'en' && 'The language will be applied to the entire app'}
            {currentLanguage === 'fr' && "La langue sera appliquée à toute l'application"}
            {currentLanguage === 'de' && 'Die Sprache wird auf die gesamte App angewendet'}
          </p>
        </div>
      </div>
    </div>
  );
}
