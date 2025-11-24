// ------------------------------
// FUNCIONES DE DATOS (API + localStorage)
// ------------------------------

// Llamada genérica a API
async function llamadaAPI(url) {
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

// Obtener solo los datos de Dragon Ball (NO dibuja)
async function obtenerDatosDragonBall() {
    const url = "https://dragonball-api.com/api/characters";

    let data = await llamadaAPI(url);
    console.log("data:", data);

    let personajes = data.items;

    // Guardar cada personaje en localStorage
    for (let res of personajes) {
        let nombreDragonBall = res.name;

        localStorage.setItem(nombreDragonBall, JSON.stringify(res));

        let datosGuardados = JSON.parse(localStorage.getItem(nombreDragonBall));
        console.log("Guardado:", datosGuardados);
    }

    // Muy importante: DEVOLVER los datos a funciones2.js
    return personajes;
}




