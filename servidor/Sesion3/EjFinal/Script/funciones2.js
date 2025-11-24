// ------------------------------
// FUNCIONES DE PINTADO
// ------------------------------

// Función principal que pinta los personajes en pantalla
async function datosDragonBall() {

    // 1. OBTENER los datos desde funciones1.js
    let oItems = await obtenerDatosDragonBall();

    // 2. PINTAR en pantalla
    let divPersonajes = document.getElementById('Container-personaje');
    divPersonajes.classList.add('estiloPersonajes');

    for (let res of oItems) {

        let nombreDragonBall = res.name;
        let urlDragonBall = res.links;

        let divDragonBall = document.createElement('div');
        divDragonBall.classList.add('dragonBall');

        // Llamada extra para información de detalle (tu lógica)
        let dataDrag = await llamadaAPI(urlDragonBall);
        console.log("dataPok", dataDrag);

        // Imagen correcta
        let urlimagen = res.image;

        if (urlimagen != null && urlimagen != undefined) {

            let divImg = document.createElement('div');
            divImg.classList.add('estiloImg');

            let img = document.createElement('img');
            img.src = urlimagen;
            img.alt = nombreDragonBall;
            img.title = nombreDragonBall;
            img.onclick = function () {
                alert(nombreDragonBall);
            };

            divImg.appendChild(img);

            let divTitle = document.createElement('div');
            divTitle.innerText = nombreDragonBall;
            divTitle.classList.add('nombre');

            divDragonBall.appendChild(divImg);
            divDragonBall.appendChild(divTitle);
        }

        divPersonajes.appendChild(divDragonBall);
    }
}

// Arranca automáticamente
datosDragonBall();