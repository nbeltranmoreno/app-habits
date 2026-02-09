import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook personalizado para operaciones con Supabase
 * @param {string} table - Nombre de la tabla en Supabase
 * @param {object} filters - Filtros para las consultas (opcional)
 */
export const useSupabase = (table, filters = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Obtener datos
  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(table).select('*');

      // Aplicar filtros si existen
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      // Filtrar por usuario si está autenticado
      if (user && !filters.userId) {
        query = query.eq('userId', user.uid);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setData(result || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Insertar datos
  const insert = async (newData) => {
    try {
      const dataWithUser = user ? { ...newData, userId: user.uid } : newData;

      const { data: result, error: insertError } = await supabase
        .from(table)
        .insert([dataWithUser])
        .select();

      if (insertError) throw insertError;

      // Actualizar datos localmente
      setData(prev => [...prev, ...result]);
      return { data: result, error: null };
    } catch (err) {
      console.error('Error inserting data:', err);
      return { data: null, error: err.message };
    }
  };

  // Actualizar datos
  const update = async (id, updates) => {
    try {
      const { data: result, error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;

      // Actualizar datos localmente
      setData(prev =>
        prev.map(item => (item.id === id ? { ...item, ...updates } : item))
      );
      return { data: result, error: null };
    } catch (err) {
      console.error('Error updating data:', err);
      return { data: null, error: err.message };
    }
  };

  // Eliminar datos
  const remove = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Actualizar datos localmente
      setData(prev => prev.filter(item => item.id !== id));
      return { error: null };
    } catch (err) {
      console.error('Error deleting data:', err);
      return { error: err.message };
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [user, JSON.stringify(filters)]);

  return {
    data,
    loading,
    error,
    insert,
    update,
    remove,
    refresh: fetchData
  };
};

/**
 * Hook para consultas personalizadas en Supabase
 */
export const useSupabaseQuery = () => {
  const { user } = useAuth();

  const query = async (queryFn) => {
    try {
      const result = await queryFn(supabase, user);
      return result;
    } catch (err) {
      console.error('Error in custom query:', err);
      return { data: null, error: err.message };
    }
  };

  return { query };
};
