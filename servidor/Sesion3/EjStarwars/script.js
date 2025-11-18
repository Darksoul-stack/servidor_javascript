// Función que hace la llamada a la API y devuelve los datos en JSON
async function llamadaAPI(url) {
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

// Función principal que obtiene y guarda los personajes de Star Wars
async function datosStarWars() {
    const url = "https://swapi.dev/api/people/";

    // Obtener datos
    let data = await llamadaAPI(url);
    console.log("data:", data);

    for (let personaje of data.results) {
        let nombre = personaje.name;

        // Guardar en localStorage con clave = nombre
        localStorage.setItem(nombre, JSON.stringify(personaje));

        // Para comprobar que se ha guardado correctamente
        let datosGuardados = JSON.parse(localStorage.getItem(nombre));
        console.log("Guardado:", datosGuardados);
    }
}

datosStarWars();