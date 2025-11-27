
// Función genérica para llamar a cualquier API
async function llamadaAPI(url) {
    let cuerpo_respuesta = await fetch(url);
    let datos = await cuerpo_respuesta.json();
    return datos;
}

// Función específica para obtener personajes de Dragon Ball
async function obtenerDatosHarryPotter() {
    const url = "https://hp-api.onrender.com/api/characters";
    let data = await llamadaAPI(url);
    console.log(" Datos obtenidos:", data);
    return data; // Devuelve solo el array de personajes
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

//ver los datos de HarryPotter
obtenerDatosHarryPotter();