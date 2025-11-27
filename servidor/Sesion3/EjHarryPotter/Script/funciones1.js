//  FUNCIÓN DE PINTADO (recibe datos como parámetro)
function pintarGridPersonajes(personajes) {
    let divContenido = document.getElementById('contenido-principal');

    for (let res of personajes) {

        let nomPersonaje = res.name;
        let altNombre = res.alternate_names;
        let imgPersonaje = res.image;
        let ayoNacimiento = res.yearOfBirth;

        let divImg = document.createElement('div');
        divImg.classList.add('ancho200');

        let img = document.createElement('img');

        // Imagen por defecto absoluta
        const fallback = "./assets/imagen_personaje_harrypotter.png";

        // Comprobación inicial
        if (!imgPersonaje || imgPersonaje.trim() === "") {
            imgPersonaje = fallback;
        }

        img.src = imgPersonaje;
        img.alt = nomPersonaje;
        img.title = nomPersonaje;

        //  ESTE ES EL FALLBACK QUE FUNCIONA SIEMPRE 
        img.onerror = function () {
            if (img.src !== fallback) {
                img.src = fallback;
            }
        };

        // Click → guardar personaje
        img.onclick = function () {
            localStorage.clear();
            localStorage.setItem('personaje', JSON.stringify(res));
            window.location.href = 'Personajes/personaje.html';
        };

        divImg.appendChild(img);

        let h1 = document.createElement('h1');
        h1.innerText = nomPersonaje;
        divImg.appendChild(h1);

        let p = document.createElement('p');
        p.innerText = altNombre?.join(", ") || "Sin nombres alternativos";
        divImg.appendChild(p);

        let p2 = document.createElement("p");
        p2.innerHTML = ayoNacimiento ?? "Año desconocido";
        divImg.appendChild(p2);

        divContenido.appendChild(divImg);
    }
}

// FUNCIÓN PRINCIPAL
async function inicializarGrid() {
    let personajes = await obtenerDatosHarryPotter();
    pintarGridPersonajes(personajes);
}

inicializarGrid();
