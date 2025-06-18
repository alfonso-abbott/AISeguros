# AISeguros

Este repositorio contiene un prototipo de sitio de seguros dividido en dos carpetas principales:

- **backend/** – Servicio en Node/Express que expone rutas bajo `/api`.
- **frontend/** – Aplicación React con Tailwind CSS creada con Vite.

El proyecto forma parte del trabajo para la asignatura *Ingeniería de Software 2* (Universidad Andrés Bello).

## Estructura

### Backend

- Express + CORS
- Servidor en `server.js` escuchando en el puerto `5000`.
- Ruta de prueba en `/api/ping` que responde con `pong`.

### Frontend

- SPA en React.
- Navegación con React Router.
- Páginas básicas ubicadas en `src/pages` (inicio, login, registro, comparador, subir póliza, recomendaciones y perfil).

## Uso rápido

```
cd backend
npm install
npm start
```

En otra terminal:

```
cd frontend
npm install
npm run dev
```

Luego visita `http://localhost:5173` para el frontend y `http://localhost:5000/api/ping` para probar el backend.

## Documentación

En la carpeta `docs/` se incluye el archivo **Solemne2.md** con el informe de la entrega, que detalla historias de usuario, diagramas y otros elementos del proyecto.

