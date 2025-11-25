// ========================================
// funciones1.js - GRID DE PERSONAJES (index.html)
// ========================================

// ✅ FUNCIÓN DE PINTADO (recibe datos como parámetro)
function pintarGridPersonajes(personajes) {
    let divContenido = document.getElementById('contenido');

    for (let res of personajes) {
        let nomPersonaje = res.name;
        let desPersonaje = res.description;
        let imgPersonaje = res.image;

        if (imgPersonaje != null && imgPersonaje != undefined) {
            let divImg = document.createElement('div');
            divImg.classList.add('ancho200');

            let img = document.createElement('img');
            img.src = imgPersonaje;
            img.alt = nomPersonaje;
            img.title = nomPersonaje;

            // ⭐ Al hacer click: guarda en localStorage y navega
            img.onclick = function () {
                localStorage.clear();
                localStorage.setItem('personaje', JSON.stringify(res));
                window.location.href = 'Personajes/personaje.html'; // ✅ Ruta relativa desde index.html
            };

            divImg.appendChild(img);

            let h1 = document.createElement('h1');
            h1.innerText = nomPersonaje;
            divImg.appendChild(h1);

            let p = document.createElement('p');
            p.innerText = desPersonaje;
            divImg.appendChild(p);

            divContenido.appendChild(divImg);
        }
    }
}

// ✅ FUNCIÓN PRINCIPAL (obtiene datos y llama a pintar)
async function inicializarGrid() {
    let personajes = await obtenerDatosDragonBall();
    pintarGridPersonajes(personajes);
}

inicializarGrid();