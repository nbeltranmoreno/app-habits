# CLAUDE.md - Guía para Modificaciones de Base de Datos

## 📋 Información del Proyecto

**Aplicación:** AppHabitos - Aplicación de seguimiento de hábitos con gamificación

**Stack Tecnológico:**
- **Frontend:** React + Vite + Tailwind CSS
- **Autenticación:** Firebase Authentication (Email/Password + Google Sign-In)
- **Base de datos:** Supabase PostgreSQL
- **Ubicación:** `c:\Users\WINDOWS\Desktop\Proyectos\AppHabitos`

---

## 🔧 Configuración de Supabase

### Credenciales (en `.env`)
```env
VITE_SUPABASE_URL=https://xbzrtmylhsjzyiajytmp.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_22x6pt9Q7XloNwAd2ucl1Q_LpAi-A0v
SUPABASE_DB_PASSWORD=dFroitkfjD123
```

### Conexión Correcta (LA QUE FUNCIONA)
```javascript
const connectionString = `postgresql://postgres.xbzrtmylhsjzyiajytmp:${password}@aws-0-us-west-2.pooler.supabase.com:5432/postgres`;

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});
```

**Detalles críticos:**
- Host: `aws-0-us-west-2.pooler.supabase.com` (región específica del proyecto)
- Puerto: `5432` (NO 6543)
- Usuario: `postgres.xbzrtmylhsjzyiajytmp`
- SSL habilitado

---

## 📊 Estructura Actual de la Base de Datos

### Tablas Existentes (6 total)

#### 1. `habits` (Hábitos buenos) - 8 columnas
```sql
- id (UUID, PK)
- userid (TEXT) - Firebase UID
- name (TEXT)
- time (TEXT) - Formato "HH:MM"
- completed (BOOLEAN)
- timescompleted (INTEGER)
- createdat (TIMESTAMP)
- updatedat (TIMESTAMP)
```

#### 2. `bad_habits` (Hábitos malos a evitar) - 6 columnas
```sql
- id (UUID, PK)
- userid (TEXT)
- name (TEXT)
- avoided (BOOLEAN)
- createdat (TIMESTAMP)
- updatedat (TIMESTAMP)
```

#### 3. `equipment` (Equipamiento del jugador) - 19 columnas
```sql
- id (UUID, PK)
- userid (TEXT, UNIQUE)
- helmet_level, helmet_equipped, helmet_upgrade_cost
- armor_level, armor_equipped, armor_upgrade_cost
- weapon_level, weapon_equipped, weapon_upgrade_cost
- boots_level, boots_equipped, boots_upgrade_cost
- accessory_level, accessory_equipped, accessory_upgrade_cost
- createdat, updatedat
```

#### 4. `user_progress` (Progreso del usuario) - 7 columnas
```sql
- id (UUID, PK)
- userid (TEXT, UNIQUE)
- totalpoints (INTEGER)
- currenttheme (TEXT)
- currentlanguage (TEXT)
- createdat (TIMESTAMP)
- updatedat (TIMESTAMP)
```

#### 5. `redeemed_rewards` (Recompensas canjeadas) - 5 columnas
```sql
- id (UUID, PK)
- userid (TEXT)
- rewardname (TEXT)
- rewardcost (INTEGER)
- redeemedat (TIMESTAMP)
```

#### 6. `habit_completions` (Historial de completados) - 5 columnas
```sql
- id (UUID, PK)
- habitid (UUID)
- userid (TEXT)
- completeddate (DATE)
- createdat (TIMESTAMP)
- UNIQUE(habitid, completeddate)
```

---

## ⚠️ IMPORTANTE: Nombres de Columnas

### ¡PostgreSQL Convierte TODO a Minúsculas!

**Problema descubierto:**
- Si creas columnas como `userId`, `createdAt`, `timesCompleted`
- PostgreSQL las convierte a: `userid`, `createdat`, `timescompleted`

**Solución aplicada:**
- Usar nombres en **minúsculas** directamente en el schema
- En JavaScript, mapear a camelCase solo en la capa de aplicación

**Ejemplo en código:**
```javascript
// ❌ MAL - No funciona
.eq('userId', user.uid)
.eq('createdAt', date)

// ✅ BIEN - Funciona
.eq('userid', user.uid)
.eq('createdat', date)

// Al leer, convertir a camelCase:
const formatted = data.map(h => ({
  id: h.id,
  createdAt: h.createdat,  // DB (minúsculas) → App (camelCase)
  timesCompleted: h.timescompleted
}));
```

---

## 🔄 Cómo Modificar la Base de Datos

### Paso 1: Modificar el Schema SQL

Edita el archivo `supabase-schema.sql`:

**Para AGREGAR una columna:**
```sql
ALTER TABLE habits ADD COLUMN IF NOT EXISTS newcolumn TEXT DEFAULT 'valor';
```

**Para AGREGAR una tabla:**
```sql
CREATE TABLE IF NOT EXISTS new_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userid TEXT NOT NULL,
  somedata TEXT,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para performance
CREATE INDEX IF NOT EXISTS idx_new_table_user ON new_table(userid);

-- Trigger para updatedat
DROP TRIGGER IF EXISTS update_new_table_updated_at ON new_table;
CREATE TRIGGER update_new_table_updated_at
    BEFORE UPDATE ON new_table
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own data" ON new_table;
CREATE POLICY "Users can view own data"
  ON new_table FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert own data" ON new_table;
CREATE POLICY "Users can insert own data"
  ON new_table FOR INSERT
  WITH CHECK (true);
```

**Para ELIMINAR una tabla:**
```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

**Para MODIFICAR una columna:**
```sql
ALTER TABLE habits ALTER COLUMN time SET DEFAULT '09:00';
ALTER TABLE habits ALTER COLUMN name SET NOT NULL;
```

### Paso 2: Ejecutar la Migración

```bash
node db-migrate-correct.js
```

Este script:
- Se conecta a Supabase con la configuración correcta
- Lee `supabase-schema.sql`
- Ejecuta el SQL completo
- Verifica las tablas creadas
- Tiempo estimado: 10-30 segundos

### Paso 3: Verificar Columnas (si hay dudas)

```bash
node check-columns.js
```

Este script muestra los nombres REALES de las columnas en la BD.

### Paso 4: Actualizar el Código JavaScript

Si agregaste/modificaste columnas, actualiza los hooks:

**Archivo:** `src/hooks/useHabitsSync.js`

```javascript
// Ejemplo: Agregar campo "priority"
const newHabit = {
  userid: user.uid,
  name,
  time,
  priority: 'medium',  // Nueva columna
  completed: false,
  timescompleted: 0
};

// Al leer, mapear a camelCase
const formatted = data.map(h => ({
  id: h.id,
  name: h.name,
  priority: h.priority,  // Nueva columna
  createdAt: h.createdat
}));
```

---

## 🛠️ Archivos Clave del Proyecto

### Base de Datos
- `supabase-schema.sql` - Schema completo de la BD
- `db-migrate-correct.js` - Script de migración (EL ÚNICO QUE FUNCIONA)
- `check-columns.js` - Verificar nombres reales de columnas
- `.env` - Credenciales de Supabase y Firebase

### Configuración
- `src/config/supabase.js` - Cliente de Supabase
- `src/config/firebase.js` - Configuración de Firebase Auth

### Hooks de Base de Datos
- `src/hooks/useHabitsSync.js` - CRUD de hábitos buenos
- `src/hooks/useSupabase.js` - Hook genérico de Supabase

### Autenticación
- `src/contexts/AuthContext.jsx` - Contexto de autenticación global
- `src/components/Login.jsx` - Pantalla de login/registro

---

## 📝 Ejemplos de Modificaciones Comunes

### Ejemplo 1: Agregar campo "category" a habits

**1. Modificar `supabase-schema.sql`:**
```sql
ALTER TABLE habits ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
```

**2. Ejecutar migración:**
```bash
node db-migrate-correct.js
```

**3. Actualizar `useHabitsSync.js`:**
```javascript
// En addHabit
const newHabit = {
  userid: user.uid,
  name,
  time,
  category: 'health',  // Nuevo campo
  completed: false,
  timescompleted: 0
};

// En loadHabits
const formatted = data.map(h => ({
  id: h.id,
  name: h.name,
  category: h.category,  // Nuevo campo
  // ...resto
}));
```

### Ejemplo 2: Crear tabla de "achievements"

**1. Agregar al final de `supabase-schema.sql`:**
```sql
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userid TEXT NOT NULL,
  achievementname TEXT NOT NULL,
  achievementdescription TEXT,
  unlockedat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(userid);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  WITH CHECK (true);
```

**2. Ejecutar:**
```bash
node db-migrate-correct.js
```

**3. Crear hook `src/hooks/useAchievements.js`:**
```javascript
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);

  const loadAchievements = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('userid', user.uid)
      .order('unlockedat', { ascending: false });

    if (error) {
      console.error('Error loading achievements:', error);
      return;
    }

    // Convertir a camelCase
    const formatted = data.map(a => ({
      id: a.id,
      achievementName: a.achievementname,
      achievementDescription: a.achievementdescription,
      unlockedAt: a.unlockedat
    }));

    setAchievements(formatted);
  };

  useEffect(() => {
    loadAchievements();
  }, [user]);

  return { achievements, loadAchievements };
};
```

---

## 🐛 Troubleshooting

### Error: "Could not find column X"
- **Causa:** Nombre de columna en camelCase en código
- **Solución:** Usar minúsculas: `createdAt` → `createdat`

### Error: "Tenant or user not found"
- **Causa:** Connection string incorrecta
- **Solución:** Verificar que uses `db-migrate-correct.js` con la config correcta

### Error: "ENOTFOUND"
- **Causa:** Firewall/DNS bloqueando
- **Solución:** Usar Connection Pooler (ya configurado en `db-migrate-correct.js`)

### Verificar que la tabla existe
```bash
node check-columns.js
```

### Ver todas las tablas
```bash
node db-migrate-correct.js
```
(Muestra lista de tablas al final)

---

## 💡 Consejos Finales

1. **SIEMPRE usa nombres en minúsculas** en el SQL
2. **Mapea a camelCase** solo en JavaScript
3. **Ejecuta `check-columns.js`** si tienes dudas sobre nombres
4. **Las políticas RLS están en modo permisivo** (`USING (true)`) para desarrollo
5. **Los triggers `updatedat`** se actualizan automáticamente en UPDATE
6. **UUID se genera automático** con `gen_random_uuid()`
7. **Índices en `userid`** ya están creados para mejor performance

---

## 🎯 Resumen de Comandos

```bash
# Modificar base de datos
node db-migrate-correct.js

# Verificar nombres de columnas
node check-columns.js

# Iniciar app
npm run dev

# Ver logs del servidor
# (ya está corriendo en http://localhost:5174/app-habits/)
```

---

**Fecha de creación:** 2026-02-08
**Última actualización:** 2026-02-08
**Versión de PostgreSQL:** 17.6
**Región de Supabase:** us-west-2
