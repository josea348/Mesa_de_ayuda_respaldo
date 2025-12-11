# Mesa de Ayuda (Respaldo)

Proyecto full‑stack para gestión de tickets, reservas de ambientes/equipos y administración de usuarios. Incluye un backend en Node.js/Express con MySQL y un frontend en React con Vite.

## Arquitectura
- `backend`: API REST en Node.js/Express, vistas EJS para documentación y conexión a MySQL mediante `mysql2`.
- `Frontend`: SPA en React + Vite. Se comunica con el backend vía Axios (`baseURL` `http://localhost:4001`).

## Requisitos
- Node.js 18+ y npm.
- MySQL en ejecución (local o remoto).
- Opcional: XAMPP para facilitar MySQL en Windows.

## Backend
- Puerto por defecto: `4001`.
- Scripts:
  - `npm run dev`: inicia el servidor con `nodemon`.
- Variables de entorno: crear el archivo `backend/src/env/.env` con:
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_PORT`
  - `DB_DATABASE`

### Instalación y ejecución (backend)
1. `cd backend`
2. `npm install`
3. `npm run dev`
4. Documentación de la API disponible en `http://localhost:4001/documents`.

## Frontend
- Scripts:
  - `npm run dev`: inicia Vite en desarrollo.
  - `npm run build`: construye producción.
  - `npm run preview`: sirve la build local.
- Axios `baseURL`: `Frontend/src/apis/axios.js` apunta a `http://localhost:4001`. Asegúrate que el backend esté corriendo.

### Instalación y ejecución (frontend)
1. `cd Frontend`
2. `npm install`
3. `npm run dev`
4. Abre `http://localhost:5173` (puerto por defecto de Vite) o el que indique la consola.

## Flujo de autenticación
- El login (`/auth`) guarda el `token` en `localStorage`.
- El frontend agrega automáticamente el header `token` en cada petición (interceptor Axios).

## Estructura de carpetas
- `backend/`: código del servidor, `index.js`, `src/` (routers, controllers, database), `views/document.ejs` documentación.
- `Frontend/`: React + Vite (`src/` con contexts, components, apis).

## Desarrollo conjunto
- Ejecuta backend y frontend en terminales separadas.
- Verifica que ambos puertos (`4001` y `5173`) estén libres.

## Problemas comunes
- Error de conexión a BD: revisa credenciales en `backend/src/env/.env` y que MySQL esté activo.
- 401/403 por token: inicia sesión para obtener `token` y limpia `localStorage` si está corrupto.

## Licencia
Este repositorio es de uso interno. Ajusta o agrega una licencia si se requiere.