// index.js
//Express = el motor de tu servidor web.
//expres sirve para usar funciones app.get('/', (req, res) => res.send('Hola!'));
import express from 'express';
// path sirve para trabajar con las rutas en donde tienes tus documentos /sesion2/sesion2.js
//Path = el GPS que te dice dónde están tus archivos.
import path from 'path';

import * as sesion2 from './sesion2/sesion2.js';
import * as ejemplos from './EjemploClase/ejemplos.js';
import * as ejemplos2 from './EjemploClase/ejemplos2.js';
import { pintarCoches } from './sesion2/electrico.js'; 
import { fileURLToPath } from 'url'; 
import {  } from "module";
// const path = require('path');
// const sesion2 = require('./sesion2/sesion2');
// const ejemplos = require('./ejemplos');
// const ejemplos2 = require('./ejemplos2');
// const coche = require('./sesion2/coche');


// Creamos la app de Express
const app = express();

// Estas dos líneas crean __dirname y __filename
const __filename = fileURLToPath(import.meta.url); // ruta completa del archivo actual. por ejemplo todas la url
const __dirname = path.dirname(__filename);       // carpeta donde está este archivo__dirname apunta a la carpeta donde está ese server.js

// función de Express (express.static) que sirve para mostrar archivos “estáticos” (HTML, CSS, JS, imágenes, etc.)
//  join juntar rutas de forma segura tanto en linux o windows
app.use(express.static(path.join(__dirname, '')));

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de desarrollo de entorno cliente web 🚀');
});

// app.get('/ejemploshtml', (req, res) => {
//   res.sendFile(path.join(__dirname, '', 'index.html'));
// });


app.get('/ejemplos', (req, res) => {
  
  const resultado = ejemplos.ejemplo();
  res.send(`La variable pinta ${resultado}`);
});

app.get('/ejemplos2', (req, res) => {
  
  const saludar = ejemplos2.saludarexp();
  const saludar2 = ejemplos2.despedirexp();
  res.send(`La variable pinta ${saludar} y ${saludar2}`);
});

//++ SESION2 
// Ejemplo: suma
app.get('/variables', (req, res) => {
  
  const resultado = sesion2.variables();
  res.send(`La variable pinta ${resultado}`);
});

// app.get('/concatenar', (req, res) => {
  
//   const resultado = sesion2.concatenar();
//   res.send(true);
// });

app.get('/sesion2/coche', (req, res) => {
  
  const resultado=pintarCoches();
  res.send(resultado);
});

app.get('/sesion2/cocheHtml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sesion2', 'coches.html'));
});

app.get('/sesion2/ejerciciobucles', (req, res) => {
  res.sendFile(path.join(__dirname, 'sesion2', 'ejerciciobucles.html'));
});

app.get('/sesion2/ejercicioObjetos', (req, res) => {
  res.sendFile(path.join(__dirname, 'sesion2', 'ejercicioObjetos.html'));
});

app.get('/sesion2/ejercicioObjetos', (req, res) => {
  res.sendFile(path.join(__dirname, 'sesion2', 'ejercicioObjetos.html'));
});




app.get('/PraticaClase/EjercicioBucle', (req, res) => {
  res.sendFile(path.join(__dirname, 'PraticaClase', 'EjercicioBucle', 'index.html'));
});

app.get('/PraticaClase/EjercicioStarWars', (req, res) => {
  res.sendFile(path.join(__dirname, 'PraticaClase', 'EjercicioStarWars', 'index.html'));
});

app.get('/ProyectoI', (req, res) => {
  res.sendFile(path.join(__dirname, 'ProyectoI', 'index.html'));
});
//-- SESION2



// Arrancamos el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});