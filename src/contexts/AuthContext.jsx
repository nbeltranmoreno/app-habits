import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Registrar nuevo usuario
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Actualizar el perfil de Firebase con el nombre de usuario
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    // Crear perfil en Supabase
    try {
      await supabase.from('users').insert([{
        userid: userCredential.user.uid,
        email: email,
        displayname: displayName || null,
        photourl: null
      }]);
    } catch (error) {
      console.error('Error creating user profile in Supabase:', error);
    }

    return userCredential;
  };

  // Iniciar sesión
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Iniciar sesión con Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Verificar si el usuario ya existe en Supabase
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('userid', result.user.uid)
        .single();

      // Si no existe, crear el perfil
      if (!existingUser) {
        await supabase.from('users').insert([{
          userid: result.user.uid,
          email: result.user.email,
          displayname: result.user.displayName || null,
          photourl: result.user.photoURL || null
        }]);
      }
    } catch (error) {
      console.error('Error managing user profile in Supabase:', error);
    }

    return result;
  };

  // Cerrar sesión
  const logout = async () => {
    return signOut(auth);
  };

  // Enviar email para restablecer contraseña
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Actualizar perfil de usuario
  const updateUserProfile = async (updates) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updates);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
