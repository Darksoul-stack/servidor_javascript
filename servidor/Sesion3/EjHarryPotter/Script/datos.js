//===================================
// FUNCIONES PARA HARRY POTTER API
//===================================

// FUNCIÓN 1: llamadaAPI(url)
// ---------------------------
// ¿Qué hace?
// - Es una función GENÉRICA (sirve para cualquier API)
// - Es ASÍNCRONA (async) porque hace peticiones a internet
// - Recibe una URL como parámetro
// - fetch(url) → Hace la petición HTTP a esa dirección
// - await → Espera a que llegue la respuesta antes de continuar
// - cuerpo_respuesta.json() → Convierte la respuesta a formato JSON
// - return datos → Devuelve los datos para usarlos donde se llame
//
// RESUMEN: Función reutilizable que pide datos a cualquier URL y los devuelve en JSON

async function llamadaAPI(url) {
  let cuerpo_respuesta = await fetch(url); // Hace la petición y espera la respuesta
  let datos = await cuerpo_respuesta.json(); // Convierte la respuesta a JSON
  return datos; // Devuelve los datos obtenidos
}

// FUNCIÓN 2: obtenerDatosHarryPotter()
// -------------------------------------
// ¿Qué hace?
// - Función ESPECÍFICA para obtener personajes de Harry Potter
// - También es ASÍNCRONA (usa async/await)
// - Define la URL de la API de Harry Potter (endpoint de personajes)
// - Llama a la función llamadaAPI para hacer la petición
// - Muestra en consola los datos recibidos
// - Devuelve el array COMPLETO de personajes (data)
//
// NOTA: A diferencia de obtenerDatosDragonBall(), aquí devolvemos "data" directamente
//       porque la API de Harry Potter devuelve directamente el array de personajes,
//       NO un objeto con propiedades como {items: [...]}

async function obtenerDatosHarryPotter() {
  const url = 'https://hp-api.onrender.com/api/characters'; // URL de la API de Harry Potter

  let data = await llamadaAPI(url); // Llama a la función genérica y espera los datos
  console.log(' Datos obtenidos:', data); // Muestra en consola qué llegó

  return data; // Devuelve el array COMPLETO de personajes (no data.items)
}

// FUNCIÓN 3: obtenerPersonajeGuardado()
// --------------------------------------
// ¿Qué hace?
// - Función SÍNCRONA (no usa async/await porque solo lee de localStorage)
// - Recupera un personaje guardado previamente en localStorage
// - localStorage.getItem('personaje') → Busca el dato con la clave 'personaje'
// - Si NO existe (!sres) → Muestra un error en consola y devuelve null
// - Si SÍ existe → Lo convierte de TEXTO a OBJETO con JSON.parse() y lo devuelve
//
// RESUMEN: Lee el personaje guardado en localStorage y lo devuelve como objeto
//          Si no hay nada guardado, devuelve null

function obtenerPersonajeGuardado() {
  let sres = localStorage.getItem('personaje'); // Intenta obtener el dato guardado

  // VALIDACIÓN: Verifica si existe el dato
  if (!sres) {
    console.error(' No hay personaje guardado en localStorage');
    return null; // Devuelve null si no hay nada guardado
  }

  return JSON.parse(sres); // Convierte el TEXTO a OBJETO y lo devuelve
}

// EJECUTAR la función para ver los datos de Harry Potter
// -------------------------------------------------------
// Esto hace una llamada a la API al cargar el archivo
// Los datos se mostrarán en la consola del navegador (F12 → Console)
obtenerDatosHarryPotter();

//===================================
// CONCEPTOS CLAVE:
//===================================
// - async/await → Para operaciones asíncronas (peticiones web)
// - fetch() → Hace peticiones HTTP
// - .json() → Convierte respuesta a formato JSON
// - localStorage.getItem() → Recupera datos del almacenamiento local
// - JSON.parse() → Convierte TEXTO a OBJETO
// - return → Devuelve un valor para usarlo fuera de la función
// - Validación con if (!variable) → Comprueba si algo NO existe o es null/undefined
// - console.log() → Muestra información en la consola (para depurar)
// - console.error() → Muestra errores en la consola

//===================================
// DIFERENCIA IMPORTANTE CON DRAGON BALL:
//===================================
// Dragon Ball API:
// - Devuelve: {items: [...personajes...], meta: {...}, links: {...}}
// - Por eso usamos: return data.items (solo el array)
//
// Harry Potter API:
// - Devuelve directamente: [...personajes...]
// - Por eso usamos: return data (el array completo)
//
// AMBAS SON VÁLIDAS, depende de cómo esté estructurada cada API

//===================================
// PARA QUÉ SIRVE ESTE ARCHIVO:
//===================================
// Este archivo contiene las funciones necesarias para trabajar con la API de Harry Potter
// Puedes usarlo de la misma manera que usaste las funciones de Dragon Ball:
// 1. obtenerDatosHarryPotter() → Para obtener todos los personajes
// 2. obtenerPersonajeGuardado() → Para leer el personaje seleccionado
// 3. Luego puedes usar pintarGridPersonajes(), pintarTablaPersonajes(), etc.
//    solo cambiando la llamada a obtenerDatosHarryPotter() en lugar de obtenerDatosDragonBall()
