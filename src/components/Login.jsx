import { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }
        await signup(email, password, displayName);
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
      if (err.code === 'auth/invalid-credential') {
        setError('Email o contraseña incorrectos');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es muy débil');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else {
        setError(err.message || 'Ocurrió un error. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Error con Google:', err);
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Ingresa tu email primero');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      alert('Se envió un email para restablecer tu contraseña');
      setShowForgotPassword(false);
    } catch (err) {
      setError('Error al enviar el email');
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
        <div className="absolute bottom-20 left-10 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>💫</div>
        <div className="absolute top-1/3 left-10 text-7xl opacity-15">🌟</div>
        <div className="absolute bottom-1/3 right-10 text-7xl opacity-15">⭐</div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/20 p-8">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Recuperar Contraseña</h2>
              <p className="text-white/80">Te enviaremos un email para restablecer tu contraseña</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              {error && (
                <div className="bg-red-500/20 backdrop-blur border border-red-300/30 text-white px-4 py-3 rounded-2xl">
                  {error}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Email'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>💫</div>
      <div className="absolute top-1/3 left-10 text-7xl opacity-15">🌟</div>
      <div className="absolute bottom-1/3 right-10 text-7xl opacity-15">⭐</div>
      <div className="absolute top-1/2 right-5 text-6xl opacity-20 animate-pulse" style={{ animationDuration: '2s' }}>🎯</div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-6 py-3 shadow-2xl mb-4">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            <span className="font-black text-yellow-800 text-2xl">Habit Tracker</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            {isLogin ? '¡Bienvenido de nuevo!' : '¡Únete ahora!'}
          </h1>
          <p className="text-white/80 font-medium">
            {isLogin ? 'Continúa tu racha de hábitos' : 'Comienza tu aventura de hábitos'}
          </p>
        </div>

        {/* Card de Login/Registro */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 backdrop-blur border border-red-300/30 text-white px-4 py-3 rounded-2xl text-center font-medium">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-white/80 hover:text-white text-sm transition-colors underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Iniciando...' : 'Registrando...'}
                </span>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Registrarse'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/60 font-medium">o continúa con</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white/20 backdrop-blur border-2 border-white/30 text-white font-bold py-4 rounded-2xl hover:bg-white/30 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Toggle Login/Registro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              {isLogin ? (
                <>¿No tienes cuenta? <span className="underline font-bold">Regístrate</span></>
              ) : (
                <>¿Ya tienes cuenta? <span className="underline font-bold">Inicia sesión</span></>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 mt-6 text-sm">
          Construye mejores hábitos, un día a la vez ✨
        </p>
      </div>
    </div>
  );
}
