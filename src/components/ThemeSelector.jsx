import { ArrowLeft, Check } from 'lucide-react';
import { themes } from '../themes';

export default function ThemeSelector({ currentTheme, setTheme, setShowThemes }) {
  const themeList = Object.values(themes);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[currentTheme].gradient} p-4`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowThemes(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white">🎨 Temas</h1>
            <p className="text-white/90 text-sm font-medium">Personaliza tu experiencia</p>
          </div>
        </div>

        {/* Tema Actual */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-white/30">
          <p className="text-white/80 font-medium mb-2">Tema Actual</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{themes[currentTheme].icon}</span>
            <div>
              <p className="text-white font-black text-2xl">{themes[currentTheme].name}</p>
              <p className="text-white/70 text-sm">{themes[currentTheme].description}</p>
            </div>
          </div>
        </div>

        {/* Lista de Temas */}
        <div className="space-y-3 mb-6">
          {themeList.map(theme => {
            const isActive = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`w-full bg-white/20 backdrop-blur rounded-2xl p-5 border-2 ${
                  isActive ? 'border-white/70 scale-105' : 'border-white/30'
                } hover:scale-105 transition-all`}
              >
                <div className="flex items-center gap-4">
                  {/* Icono del tema */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${theme.gradient} rounded-xl flex items-center justify-center shadow-xl border-4 border-white/30`}>
                    <span className="text-3xl">{theme.icon}</span>
                  </div>

                  {/* Info del tema */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-black text-xl">{theme.name}</p>
                      {isActive && (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">{theme.description}</p>
                  </div>

                  {/* Preview de colores */}
                  <div className="flex flex-col gap-1">
                    <div className={`w-8 h-2 bg-gradient-to-r ${theme.primary} rounded-full`}></div>
                    <div className={`w-8 h-2 bg-gradient-to-r ${theme.secondary} rounded-full`}></div>
                    <div className={`w-8 h-2 bg-gradient-to-r ${theme.accent} rounded-full`}></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border-2 border-white/30 text-center">
          <p className="text-white/80 text-sm">
            El tema se aplicará a toda la aplicación
          </p>
        </div>
      </div>
    </div>
  );
}
