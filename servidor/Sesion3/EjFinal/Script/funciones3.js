// ========================================
// funciones3.js - FICHA INDIVIDUAL (personaje.html)
// ========================================

//  FUNCIÓN DE PINTADO (recibe un personaje como parámetro)
function pintarFichaPersonaje(personaje) {
    let divContenido = document.getElementById('contenido');

    let nomPersonaje = personaje.name;
    let desPersonaje = personaje.description;
    let imgPersonaje = personaje.image;

    if (imgPersonaje != null && imgPersonaje != undefined) {
        let divImg = document.createElement('div');
        divImg.classList.add('ancho100p');

        let img = document.createElement('img');
        img.src = imgPersonaje;
        img.alt = nomPersonaje;
        img.title = nomPersonaje;

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

inicializarFicha()