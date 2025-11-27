//  FUNCIÓN DE PINTADO (recibe un personaje como parámetro)
function pintarFichaPersonaje(personaje) {
    let divContenido = document.getElementById('contenido-personaje');

    let nomPersonaje = personaje.name;
    let altNombre = personaje.alternate_names?.join(", ") || "Sin nombres alternativos";
    let imgPersonaje = personaje.image;
    let ayoNacimiento = personaje.yearOfBirth || "Año desconocido";
    let especie = personaje.species || "Desconocida";
    let casa = personaje.house || "Sin casa";
    let patronus = personaje.patronus || "Desconocido";

    // Imagen por defecto si falla
    const fallback = "../assets/imagen_personaje_harrypotter.png";

    if (!imgPersonaje || imgPersonaje.trim() === "") {
        imgPersonaje = fallback;
    }

    let divImg = document.createElement('div');
    divImg.classList.add('ancho100p');

    let img = document.createElement('img');
    img.src = imgPersonaje;
    img.alt = nomPersonaje;
    img.title = nomPersonaje;

    // Si la imagen falla → poner fallback
    img.onerror = function () {
        if (img.src !== fallback) {
            img.src = fallback;
        }
    };

    divImg.appendChild(img);

    let h1 = document.createElement('h1');
    h1.innerText = nomPersonaje;
    divImg.appendChild(h1);

    let p = document.createElement('p');
    p.innerHTML = `
        <strong>Nombres alternativos:</strong> ${altNombre}<br>
        <strong>Año de nacimiento:</strong> ${ayoNacimiento}<br>
        <strong>Especie:</strong> ${especie}<br>
        <strong>Casa:</strong> ${casa}<br>
        <strong>Patronus:</strong> ${patronus}
    `;
    divImg.appendChild(p);

    divContenido.appendChild(divImg);
}

//  FUNCIÓN PRINCIPAL (obtiene datos y llama a pintar)
function inicializarFicha() {
    let personaje = obtenerPersonajeGuardado();

    if (!personaje) {
        document.getElementById('contenido').innerHTML =
            '<p style="text-align:center; padding:50px;"> No se ha seleccionado ningún personaje.</p>';
        return;
    }

    pintarFichaPersonaje(personaje);
}

inicializarFicha();
