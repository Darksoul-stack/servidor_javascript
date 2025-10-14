// index.js
const express = require('express');
const path = require('path');
const sesion2 = require('./sesion2/sesion2');
const ejemplos = require('./ejemplo');

const app = express();
app.use(express.static(path.join(__dirname, '')));

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de desarrollo de entorno cliente web 🚀');
});

app.get('/ejemploshtml', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get('/ejemplo', (req, res) => {
  
  const resultado = ejemplos.ejemplo();
  res.send(`La variable pinta ${resultado}`);
});

//++ SESION2 
// Ejemplo: suma
app.get('/variables', (req, res) => {
  
  const resultado = sesion2.variables();
  res.send(`La variable pinta ${resultado}`);
});

app.get('/concatenar', (req, res) => {
  
  const resultado = sesion2.concatenar();
  res.send(true);
});

app.get('/sesion2/ejerciciobucles', (req, res) => {
  res.sendFile(path.join(__dirname, 'sesion2', 'ejerciciobucles.html'));
});

//-- SESION2



// Arrancamos el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});