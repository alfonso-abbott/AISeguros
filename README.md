# AISeguros

Proyecto de ejemplo para ejecutar frontend y backend de forma local.

## Requisitos
- Node.js 18 o superior
- MongoDB en funcionamiento

## Configuración
1. Copiar el archivo `backend/.env.example` a `backend/.env` y ajustar las variables:
   ```
   MONGO_URI=mongodb://localhost/aiseguros
   PORT=5000
   ```
2. Instalar dependencias y levantar el backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. En otra terminal, instalar dependencias y levantar el frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

El frontend quedará disponible en `http://localhost:5173` y enviará las peticiones al backend `http://localhost:5000` gracias a la configuración del proxy.

Las rutas principales del frontend son:
- `/login`
- `/register`
- `/dashboard`
- `/contact`
- `/recommendations`

Estas páginas deberían mostrarse sin errores una vez que ambos servicios estén activos.

## Pruebas rápidas con Thunder Client

Puedes verificar el registro de usuarios y la obtención de la lista con las siguientes peticiones en Thunder Client:

**Registrar usuario**

```
POST http://localhost:5000/api/auth/register
{
  "name": "ejemplo",
  "email": "ejemplo@email.com",
  "password": "123456"
}
```

**Listar usuarios**

```
GET http://localhost:5000/api/auth/usuarios
```
