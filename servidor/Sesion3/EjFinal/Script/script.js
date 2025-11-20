// Función que hace la llamada a la API y devuelve los datos en JSON
async function llamadaAPI(url) {
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

// Función principal que obtiene y muestra los personajes
async function datosDragonBall() {
    const url = "https://dragonball-api.com/api/characters";

    // Llamamos a nuestra función para obtener los datos
    let data = await llamadaAPI(url);
    console.log("data", data);

    let oItems = data.items; // Array de Dragon Ball

    // Creamos un div principal donde se añadirán todos los personajes
    let divPersonajes = document.getElementById('Container-personaje');
    divPersonajes.classList.add('estiloPersonajes');

    // Recorremos el array de resultados
    for (let res of oItems) {

        let nombreDragonBall = res.name;  // ← Esto debe ir ANTES de usarlo
        let urlDragonBall = res.links;

        // Guardar en localStorage con clave = nombre
        localStorage.setItem(nombreDragonBall, JSON.stringify(res));

        // Para comprobar que se ha guardado correctamente
        let datosGuardados = JSON.parse(localStorage.getItem(nombreDragonBall));
        console.log("Guardado:", datosGuardados);

        let divDragonBall = document.createElement('div');
        divDragonBall.classList.add('dragonBall');

        // Llamamos al link de ese personaje para obtener más información
        let dataDrag = await llamadaAPI(urlDragonBall);
        console.log("dataPok", dataDrag);

        // Obtenemos la imagen correcta
        let urlimagen = res.image; // ← esta es la imagen de cada personaje

        if (urlimagen != null && urlimagen != undefined) {

            // Contenedor de imagen
            let divImg = document.createElement('div');
            divImg.classList.add('estiloImg');

            // IMG
            let img = document.createElement('img');
            img.src = urlimagen;
            img.alt = nombreDragonBall;
            img.title = nombreDragonBall;
            img.onclick = function () {
                alert(nombreDragonBall);
            };

            divImg.appendChild(img);

            // Nombre
            let divTitle = document.createElement('div');
            divTitle.innerText = nombreDragonBall;
            divTitle.classList.add('nombre');

            // Añadir img + nombre al personaje
            divDragonBall.appendChild(divImg);
            divDragonBall.appendChild(divTitle);
        }

        // Añadir personaje al contenedor principal
        divPersonajes.appendChild(divDragonBall);
    }
}

// Llamamos a la función principal
datosDragonBall();
