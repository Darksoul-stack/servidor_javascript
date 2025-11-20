// -------------------------------------------------------------
// async y await: explicación
// -------------------------------------------------------------
// async: se pone antes de una función para decir que esa función
// devolverá una "promesa" automáticamente y permitirá usar await dentro.
// await: se pone delante de una promesa para "esperar" a que se resuelva
// antes de continuar con el siguiente paso del código. Hace que la
// escritura sea más secuencial y fácil de leer que con .then()/.catch().
// -------------------------------------------------------------

// Función que hace la llamada a la API y devuelve los datos en JSON
async function llamadaAPI(url) {
    let respuesta = await fetch(url);      // Espera a que fetch obtenga la respuesta
    let datos = await respuesta.json();     // Espera a que la respuesta se convierta a objeto JS
    return datos;                           // Devuelve los datos ya como objeto
}

// Función principal que obtiene y muestra los Pokémon
async function datosPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=1&limit=100";

    // Llamamos a nuestra función para obtener los datos
    let data = await llamadaAPI(url);
    console.log("data", data);

    let oResult = data.results; // Array de Pokémon

    // Creamos un div principal donde se añadirán todas las cartas
    let divPrincipal = document.createElement('div');
    divPrincipal.id = 'divPrincipal';
    divPrincipal.classList.add('ancho500');

    // Recorremos el array de resultados
    for (let res of oResult) {
        let divPokemon = document.createElement('div');
        divPokemon.classList.add('pokemon');

        let nombrePokemon = res.name;
        let urlPokemon = res.url;

        // Llamamos a la URL de ese Pokémon para obtener más información
        let dataPok = await llamadaAPI(urlPokemon);
        console.log("dataPok", dataPok);

        // Obtenemos la URL de la imagen
        let urlimagen = dataPok.sprites.front_default;
        // → dataPok es un objeto con todos los datos del Pokémon
        // → sprites es un objeto dentro de dataPok que contiene las imágenes
        // → front_default es la imagen frontal por defecto

        if (urlimagen != null && urlimagen != undefined) {
            // Creamos el div que contendrá la imagen
            let divImg = document.createElement('div');
            divImg.classList.add('estiloImg');

            // Creamos la etiqueta img y añadimos sus atributos
            let img = document.createElement('img');
            img.src = urlimagen;       // URL de la imagen
            img.alt = nombrePokemon;   // Texto alternativo para accesibilidad
            img.title = nombrePokemon; // Texto que aparece al pasar el cursor
            img.onclick = function () {
                alert(nombrePokemon);  // Acción al hacer clic
            };

            // Añadimos la imagen al div
            divImg.appendChild(img);

            // Creamos el div que contendrá el nombre del Pokémon
            let divTitle = document.createElement('div');
            divTitle.innerText = nombrePokemon;
            divTitle.classList.add('nombre');

            // Añadimos la imagen y el nombre al div del Pokémon
            divPokemon.appendChild(divImg);
            divPokemon.appendChild(divTitle);
        }

        // Añadimos cada Pokémon al div principal
        divPrincipal.appendChild(divPokemon);
    }

    // Finalmente añadimos todo al body
    document.body.appendChild(divPrincipal);
}

// Llamamos a la función principal
datosPokemon();
