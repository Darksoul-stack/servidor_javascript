//===================================
// FUNCIONES SOLO PARA OBTENER DATOS 
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
    let cuerpo_respuesta = await fetch(url);  // Hace la petición y espera la respuesta
    let datos = await cuerpo_respuesta.json();  // Convierte la respuesta a JSON
    return datos;  // Devuelve los datos obtenidos
}


// FUNCIÓN 2: obtenerDatosDragonBall()
// ------------------------------------
// ¿Qué hace?
// - Función ESPECÍFICA para obtener personajes de Dragon Ball
// - También es ASÍNCRONA (usa async/await)
// - Define la URL de la API de Dragon Ball (endpoint de personajes)
// - Llama a la función llamadaAPI para hacer la petición
// - Muestra en consola los datos recibidos
// - Devuelve SOLO el array de personajes (data.items)
//
// NOTA: La API de Dragon Ball devuelve un objeto con varias propiedades,
//       pero solo nos interesa "items" que contiene el array de personajes

async function obtenerDatosDragonBall() {
    const url = "https://dragonball-api.com/api/characters";  // URL de la API
    
    let data = await llamadaAPI(url);  // Llama a la función genérica y espera los datos
    console.log(" Datos obtenidos:", data);  // Muestra en consola qué llegó
    
    return data.items;  // Devuelve SOLO el array de personajes (no todo el objeto)
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
    let sres = localStorage.getItem('personaje');  // Intenta obtener el dato guardado
    
    // VALIDACIÓN: Verifica si existe el dato
    if (!sres) {
        console.error(" No hay personaje guardado en localStorage");
        return null;  // Devuelve null si no hay nada guardado
    }
    
    return JSON.parse(sres);  // Convierte el TEXTO a OBJETO y lo devuelve
}


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
//