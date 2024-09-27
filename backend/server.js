require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();
const port = 3000;

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database();
const ledStatusRef = db.ref('ledStatus');
const temperatureRef = db.ref('temperatura');
const humidityRef = db.ref('humedad');

app.use(express.static(path.join(__dirname, '../frontend')));

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  ledStatusRef.on('value', (snapshot) => {
    const status = snapshot.val();
    ws.send(JSON.stringify({ status }));
  });

  temperatureRef.on('value', (snapshot) => {
    const temperature = snapshot.val();
    ws.send(JSON.stringify({ temperature }));
  });

  humidityRef.on('value', (snapshot) => {
    const humidity = snapshot.val();
    ws.send(JSON.stringify({ humidity }));
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

app.get('/setLedStatus/:status', (req, res) => {
  const status = parseInt(req.params.status);
  
  if (status !== 0 && status !== 1) {
    return res.status(400).send('El estado debe ser 0 o 1.');
  }

  ledStatusRef.set(status)
    .then(() => {
      res.send(`LED status cambiado a ${status}`);
    })
    .catch((error) => {
      console.error('Error al cambiar el estado del LED:', error);
      res.status(500).send('Error al cambiar el estado del LED');
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const server = app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
