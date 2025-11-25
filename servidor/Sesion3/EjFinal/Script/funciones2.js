// ------------------------------
// FUNCIONES DE PINTADO
// ------------------------------
async function creacionPersonajes() {

    let oItems = await obtenerDatosDragonBall();

    let divPersonajes =
        document.getElementById('Container-principal') ||
        document.getElementById('Container-personaje');

    divPersonajes.classList.add('estiloPersonajes');

    for (let res of oItems) {

        let nombreDragonBall = res.name;
        let urlimagen = res.image;

        let divDragonBall = document.createElement('div');
        divDragonBall.classList.add('dragonBall');

        if (urlimagen) {

            let divImg = document.createElement('div');
            divImg.classList.add('estiloImg');

            let img = document.createElement('img');
            img.src = urlimagen;
            img.alt = nombreDragonBall;
            img.title = nombreDragonBall;

            // RUTA AUTOMÁTICA SEGÚN CARPETA
            img.addEventListener("click", () => {
                localStorage.setItem("personajeSeleccionado", res.name);

                let destino = window.location.pathname.includes("Listado")
                    ? "../Personajes/personaje.html"
                    : window.location.pathname.includes("Personajes")
                        ? "personaje.html"
                        : "Personajes/personaje.html";

                window.location.href = destino;
            });

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

// -----------------------------------------------------
// TABLA DE LISTADO
// -----------------------------------------------------
async function tablaDragonBall() {

    let datos = await obtenerDatosDragonBall();
    let contenedor = document.getElementById("contenedor-tabla");

    let tabla = document.createElement("table");
    tabla.border = "1";

    let thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Género</th>
        </tr>
    `;
    tabla.appendChild(thead);

    let tbody = document.createElement("tbody");

    for (let personaje of datos) {

        let fila = document.createElement("tr");

        let tdNombre = document.createElement("td");
        tdNombre.innerText = personaje.name;
        tdNombre.classList.add("clicable");

        tdNombre.addEventListener("click", () => {
            localStorage.setItem("personajeSeleccionado", personaje.name);
            window.location.href = "../Personajes/personaje.html";
        });

        let tdRaza = document.createElement("td");
        tdRaza.innerText = personaje.race;

        let tdGenero = document.createElement("td");
        tdGenero.innerText = personaje.gender;

        fila.appendChild(tdNombre);
        fila.appendChild(tdRaza);
        fila.appendChild(tdGenero);

        tbody.appendChild(fila);
    }

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

// -----------------------------------------------------
// FICHA INDIVIDUAL
// -----------------------------------------------------
function mostrarPersonaje() {

    let nombre = localStorage.getItem("personajeSeleccionado");
    let datos = JSON.parse(localStorage.getItem(nombre));

    let div = document.getElementById("Container-personaje");

    div.innerHTML = `
        <div id="contenedor-personaje">
            <h2>${datos.name}</h2>
            <img src="${datos.image}">
            <p><strong>Raza:</strong> ${datos.race}</p>
            <p><strong>Género:</strong> ${datos.gender}</p>
            <p><strong>Ki:</strong> ${datos.ki}</p>
            <p><strong>Max Ki:</strong> ${datos.maxKi}</p>

            <button id="volver" onclick="window.history.back()">Volver</button>
        </div>
    `;
}

// ============================
// AUTO-DETECCIÓN DE PÁGINA
// ============================
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("Container-principal")) {
        creacionPersonajes();
    }

    if (document.getElementById("contenedor-tabla")) {
        tablaDragonBall();
    }

    if (document.getElementById("Container-personaje")) {
        mostrarPersonaje();
    }
});
