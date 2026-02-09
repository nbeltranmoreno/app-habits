import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para gestionar el perfil del usuario en Supabase
 */
export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  // Cargar perfil del usuario
  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('userid', user.uid)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned, es esperado si el usuario es nuevo
        throw error;
      }

      if (data) {
        setProfile({
          id: data.id,
          userId: data.userid,
          email: data.email,
          displayName: data.displayname,
          photoUrl: data.photourl,
          createdAt: data.createdat,
          updatedAt: data.updatedat
        });
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Crear perfil de usuario (se llama al registrarse)
  const createProfile = async (email, displayName = null, photoUrl = null) => {
    if (!user) return;

    try {
      const newProfile = {
        userid: user.uid,
        email,
        displayname: displayName,
        photourl: photoUrl
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newProfile])
        .select()
        .single();

      if (error) throw error;

      setProfile({
        id: data.id,
        userId: data.userid,
        email: data.email,
        displayName: data.displayname,
        photoUrl: data.photourl,
        createdAt: data.createdat,
        updatedAt: data.updatedat
      });

      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  // Actualizar perfil
  const updateProfile = async (updates) => {
    if (!user) return;

    try {
      // Convertir camelCase a lowercase para DB
      const dbUpdates = {};
      if (updates.displayName !== undefined) dbUpdates.displayname = updates.displayName;
      if (updates.photoUrl !== undefined) dbUpdates.photourl = updates.photoUrl;

      const { data, error } = await supabase
        .from('users')
        .update(dbUpdates)
        .eq('userid', user.uid)
        .select()
        .single();

      if (error) throw error;

      setProfile({
        id: data.id,
        userId: data.userid,
        email: data.email,
        displayName: data.displayname,
        photoUrl: data.photourl,
        createdAt: data.createdat,
        updatedAt: data.updatedat
      });

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    refreshProfile: loadProfile
  };
};
