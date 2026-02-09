-- ================================================
-- SCHEMA DE BASE DE DATOS PARA APP DE HÁBITOS
-- ================================================
-- Ejecuta este archivo completo en Supabase SQL Editor
-- Supabase Dashboard → SQL Editor → New query → Pega todo y Run

-- ================================================
-- TABLA: users (Información de usuarios)
-- ================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userid TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  displayname TEXT,
  photourl TEXT,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: habits (Hábitos buenos)
-- ================================================
CREATE TABLE IF NOT EXISTS habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  time TEXT DEFAULT '08:00',
  completed BOOLEAN DEFAULT false,
  timesCompleted INTEGER DEFAULT 0,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: bad_habits (Hábitos malos a evitar)
-- ================================================
CREATE TABLE IF NOT EXISTS bad_habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  avoided BOOLEAN DEFAULT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: equipment (Equipamiento del jugador)
-- ================================================
CREATE TABLE IF NOT EXISTS equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userId TEXT NOT NULL UNIQUE,
  helmet_level INTEGER DEFAULT 1,
  helmet_equipped BOOLEAN DEFAULT false,
  helmet_upgrade_cost INTEGER DEFAULT 4,
  armor_level INTEGER DEFAULT 1,
  armor_equipped BOOLEAN DEFAULT false,
  armor_upgrade_cost INTEGER DEFAULT 4,
  weapon_level INTEGER DEFAULT 1,
  weapon_equipped BOOLEAN DEFAULT false,
  weapon_upgrade_cost INTEGER DEFAULT 4,
  boots_level INTEGER DEFAULT 1,
  boots_equipped BOOLEAN DEFAULT false,
  boots_upgrade_cost INTEGER DEFAULT 4,
  accessory_level INTEGER DEFAULT 1,
  accessory_equipped BOOLEAN DEFAULT false,
  accessory_upgrade_cost INTEGER DEFAULT 4,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: user_progress (Progreso del usuario)
-- ================================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userId TEXT NOT NULL UNIQUE,
  totalPoints INTEGER DEFAULT 0,
  currentTheme TEXT DEFAULT 'normal',
  currentLanguage TEXT DEFAULT 'es',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: redeemed_rewards (Recompensas canjeadas)
-- ================================================
CREATE TABLE IF NOT EXISTS redeemed_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  userId TEXT NOT NULL,
  rewardName TEXT NOT NULL,
  rewardCost INTEGER NOT NULL,
  redeemedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TABLA: habit_completions (Historial de completados)
-- ================================================
CREATE TABLE IF NOT EXISTS habit_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habitId UUID NOT NULL,
  userId TEXT NOT NULL,
  completedDate DATE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(habitId, completedDate)
);

-- ================================================
-- ÍNDICES para mejorar el rendimiento
-- ================================================
CREATE INDEX IF NOT EXISTS idx_users_userid ON users(userid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_habits_user ON habits(userId);
CREATE INDEX IF NOT EXISTS idx_habits_completed ON habits(completed);
CREATE INDEX IF NOT EXISTS idx_bad_habits_user ON bad_habits(userId);
CREATE INDEX IF NOT EXISTS idx_equipment_user ON equipment(userId);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(userId);
CREATE INDEX IF NOT EXISTS idx_redeemed_rewards_user ON redeemed_rewards(userId);
CREATE INDEX IF NOT EXISTS idx_habit_completions_user ON habit_completions(userId);
CREATE INDEX IF NOT EXISTS idx_habit_completions_habit ON habit_completions(habitId);
CREATE INDEX IF NOT EXISTS idx_habit_completions_date ON habit_completions(completedDate);

-- ================================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- TRIGGERS: Actualizar updatedAt en cada tabla
-- ================================================
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_habits_updated_at ON habits;
CREATE TRIGGER update_habits_updated_at
    BEFORE UPDATE ON habits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bad_habits_updated_at ON bad_habits;
CREATE TRIGGER update_bad_habits_updated_at
    BEFORE UPDATE ON bad_habits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
CREATE TRIGGER update_equipment_updated_at
    BEFORE UPDATE ON equipment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE bad_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE redeemed_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;

-- ================================================
-- POLÍTICAS DE SEGURIDAD: users
-- ================================================
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: habits
-- ================================================
-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own habits" ON habits;
DROP POLICY IF EXISTS "Users can insert own habits" ON habits;
DROP POLICY IF EXISTS "Users can update own habits" ON habits;
DROP POLICY IF EXISTS "Users can delete own habits" ON habits;

-- Crear políticas nuevas
CREATE POLICY "Users can view own habits"
  ON habits FOR SELECT
  USING (true); -- Por ahora permitir todo, ajustaremos con Firebase Auth

CREATE POLICY "Users can insert own habits"
  ON habits FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own habits"
  ON habits FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own habits"
  ON habits FOR DELETE
  USING (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: bad_habits
-- ================================================
DROP POLICY IF EXISTS "Users can view own bad habits" ON bad_habits;
DROP POLICY IF EXISTS "Users can insert own bad habits" ON bad_habits;
DROP POLICY IF EXISTS "Users can update own bad habits" ON bad_habits;
DROP POLICY IF EXISTS "Users can delete own bad habits" ON bad_habits;

CREATE POLICY "Users can view own bad habits"
  ON bad_habits FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own bad habits"
  ON bad_habits FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own bad habits"
  ON bad_habits FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own bad habits"
  ON bad_habits FOR DELETE
  USING (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: equipment
-- ================================================
DROP POLICY IF EXISTS "Users can view own equipment" ON equipment;
DROP POLICY IF EXISTS "Users can insert own equipment" ON equipment;
DROP POLICY IF EXISTS "Users can update own equipment" ON equipment;

CREATE POLICY "Users can view own equipment"
  ON equipment FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own equipment"
  ON equipment FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own equipment"
  ON equipment FOR UPDATE
  USING (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: user_progress
-- ================================================
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: redeemed_rewards
-- ================================================
DROP POLICY IF EXISTS "Users can view own rewards" ON redeemed_rewards;
DROP POLICY IF EXISTS "Users can insert own rewards" ON redeemed_rewards;

CREATE POLICY "Users can view own rewards"
  ON redeemed_rewards FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own rewards"
  ON redeemed_rewards FOR INSERT
  WITH CHECK (true);

-- ================================================
-- POLÍTICAS DE SEGURIDAD: habit_completions
-- ================================================
DROP POLICY IF EXISTS "Users can view own completions" ON habit_completions;
DROP POLICY IF EXISTS "Users can insert own completions" ON habit_completions;
DROP POLICY IF EXISTS "Users can delete own completions" ON habit_completions;

CREATE POLICY "Users can view own completions"
  ON habit_completions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own completions"
  ON habit_completions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own completions"
  ON habit_completions FOR DELETE
  USING (true);

-- ================================================
-- LISTO! 🎉
-- ================================================
-- Ahora tienes todas las tablas creadas
-- Las políticas están configuradas en modo permisivo para testing
-- Cuando Firebase Auth esté integrado, las ajustaremos para ser más seguras
