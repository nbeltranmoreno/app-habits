# 🚀 Guía de Deployment

## Pasos para Subir la App a GitHub Pages

### 1. Preparar el Proyecto

#### Instalar dependencias:
```bash
cd habit-tracker
npm install
```

### 2. Probar Localmente

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` para probar la app.
Presiona `Ctrl+C` en la terminal para detener el servidor.

### 3. Conectar con GitHub

En la terminal, ejecuta estos comandos:

```bash
# Asegúrate de estar en la carpeta habit-tracker
cd habit-tracker

# Agrega los cambios
git add .

# Crea un commit
git commit -m "Add GitHub Actions workflow"

# Conecta con el repositorio (si no está conectado)
git remote add origin https://github.com/nbeltranmoreno/app-habits.git

# Sube el código
git push -u origin master
```

### 4. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/nbeltranmoreno/app-habits
2. Click en "Settings" (arriba)
3. En el menú izquierdo, click en "Pages"
4. En "Source", selecciona "GitHub Actions"
5. ¡Listo! El workflow se ejecutará automáticamente

### 5. ¡Listo! 🎉

Tu app estará disponible en:
```
https://nbeltranmoreno.github.io/app-habits/
```

**Nota**: Puede tomar 1-2 minutos en aparecer la primera vez.

---

## Comandos Útiles

### Desarrollo local
```bash
npm run dev          # Inicia el servidor de desarrollo
```

### Build
```bash
npm run build        # Crea el build de producción
npm run preview      # Preview del build localmente
```

### Git
```bash
git status           # Ver el estado de los archivos
git add .            # Agregar todos los cambios
git commit -m "msg"  # Crear un commit
git push             # Subir cambios a GitHub
```

---

## Actualizar la App Después

Si haces cambios a la app y quieres actualizarla en GitHub Pages:

```bash
# 1. Guarda los cambios
git add .
git commit -m "Descripción de los cambios"

# 2. Sube los cambios
git push

# 3. El workflow de GitHub Actions desplegará automáticamente
```

---

## Arquitectura del Proyecto

```
habit-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── public/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Battle.jsx
│   │   ├── Equipment.jsx
│   │   ├── HabitList.jsx
│   │   ├── HabitModal.jsx
│   │   ├── KidCharacter.jsx
│   │   ├── Navigation.jsx
│   │   ├── NotificationBanner.jsx
│   │   └── WorldMap.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useBattle.js
│   │   └── useNotifications.js
│   ├── App.jsx              # Componente principal
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
└── vite.config.js           # Configuración de Vite

```

---

## Tecnologías Utilizadas

- **React 19** - Framework de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS v3** - Framework de CSS
- **Lucide React** - Iconos
- **GitHub Actions** - CI/CD y deployment automático
- **GitHub Pages** - Hosting gratuito
