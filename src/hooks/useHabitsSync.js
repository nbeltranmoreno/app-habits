import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para sincronizar hábitos con Supabase
 * Carga automáticamente y guarda cambios
 */
export const useHabitsSync = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Cargar hábitos desde Supabase
  useEffect(() => {
    if (user) {
      loadHabits();
    } else {
      setHabits([]);
      setLoading(false);
    }
  }, [user]);

  const loadHabits = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('userid', user.uid)
        .order('createdat', { ascending: true });

      if (error) throw error;

      // Convertir de formato DB (minúsculas) a formato App (camelCase)
      const formattedHabits = (data || []).map(h => ({
        id: h.id,
        name: h.name,
        time: h.time,
        completed: h.completed,
        createdAt: h.createdat,
        timesCompleted: h.timescompleted || 0
      }));

      setHabits(formattedHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nuevo hábito
  const addHabit = async (name, time) => {
    if (!user) return;

    try {
      setSyncing(true);
      const newHabit = {
        userid: user.uid,
        name,
        time,
        completed: false,
        timescompleted: 0
      };

      console.log('Insertando hábito:', newHabit);

      const { data, error } = await supabase
        .from('habits')
        .insert([newHabit])
        .select()
        .single();

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      console.log('Hábito creado:', data);

      // Agregar a estado local (convertir a camelCase)
      setHabits(prev => [...prev, {
        id: data.id,
        name: data.name,
        time: data.time,
        completed: data.completed,
        createdAt: data.createdat,
        timesCompleted: data.timescompleted || 0
      }]);

      return data;
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    } finally {
      setSyncing(false);
    }
  };

  // Actualizar hábito (toggle completed)
  const toggleHabit = async (id) => {
    if (!user) return;

    try {
      // Actualizar localmente primero (optimistic update)
      const habit = habits.find(h => h.id === id);
      if (!habit) return;

      const newCompleted = !habit.completed;
      const newTimesCompleted = newCompleted ? habit.timesCompleted + 1 : habit.timesCompleted;

      setHabits(prev => prev.map(h =>
        h.id === id
          ? { ...h, completed: newCompleted, timesCompleted: newTimesCompleted }
          : h
      ));

      // Sincronizar con Supabase (usar nombres en minúsculas)
      const { error } = await supabase
        .from('habits')
        .update({
          completed: newCompleted,
          timescompleted: newTimesCompleted
        })
        .eq('id', id)
        .eq('userid', user.uid);

      if (error) throw error;

    } catch (error) {
      console.error('Error toggling habit:', error);
      // Revertir cambio local si falla
      loadHabits();
    }
  };

  // Eliminar hábito
  const deleteHabit = async (id) => {
    if (!user) return;

    try {
      setSyncing(true);

      // Eliminar de Supabase
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('userid', user.uid);

      if (error) throw error;

      // Eliminar del estado local
      setHabits(prev => prev.filter(h => h.id !== id));

    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    } finally {
      setSyncing(false);
    }
  };

  return {
    habits,
    loading,
    syncing,
    addHabit,
    toggleHabit,
    deleteHabit,
    refreshHabits: loadHabits
  };
};
