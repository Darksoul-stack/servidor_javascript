//===================================
// funciones solo para obtener datos 
//===================================

// Función genérica para llamar a cualquier API
async function llamadaAPI(url) {
    let cuerpo_respuesta = await fetch(url);
    let datos = await cuerpo_respuesta.json();
    return datos;
}

// Función específica para obtener personajes de Dragon Ball
async function obtenerDatosDragonBall() {
    const url = "https://dragonball-api.com/api/characters";
    let data = await llamadaAPI(url);
    console.log(" Datos obtenidos:", data);
    return data.items; // Devuelve SOLO el array de personajes
}

// Función para obtener personaje desde localStorage
function obtenerPersonajeGuardado() {
    let sres = localStorage.getItem('personaje');
    if (!sres) {
        console.error(" No hay personaje guardado en localStorage");
        return null;
    }
    return JSON.parse(sres);
}