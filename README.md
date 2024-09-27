
# Control LED ArQ2

Este proyecto utiliza Firebase para controlar el estado de un LED a través de una aplicación web. Asegúrate de seguir los pasos a continuación para configurar y ejecutar la aplicación.

## Requisitos

- Node.js instalado
- Firebase configurado

## Estructura del Proyecto
La estructura es así:

```
control-LED-ArQ2/
├── backend
│   ├── server.js
│   └── serviceAccountKey.json
├── frontend
│   ├── index.html
│   └── styles.css
├── .env
├── package.json
├── README.md

```

## Configuración

1. **Agregar el archivo `serviceAccountKey.json`**:
   - Crea un archivo JSON en Firebase que contenga las credenciales de tu proyecto.
   - Coloca este archivo en la carpeta `backend` y nómbralo `serviceAccountKey.json`.

2. **Crear el archivo `.env`**:
   - En la raíz del proyecto, crea un archivo llamado `.env`.
   - Agrega la siguiente configuración:

   ```
   SERVICE_ACCOUNT_PATH=./backend/serviceAccountKey.json
   DATABASE_URL=your-firebase-database-url
   ```

## Instrucciones para Ejecutar

1. **Clona el repositorio**:
   ```
   git clone https://github.com/chrisaurr/control-LED-ArQ2
   cd control-LED-ArQ2
   ```

2. **Instala las dependencias**:
   ```
   npm install
   ```

3. **Ejecutar**:
   ```
   npm start
   ```
