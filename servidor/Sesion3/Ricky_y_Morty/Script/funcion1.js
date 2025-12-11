// funcion pare pintar el grid de personajes
function pintarGridPersonajes(personajes) {
  // Obtenemos el contenedor del HTML donde vamos a insertar las tarjetas
  let divContenido = document.getElementById('contenido-principal');

  // Recorremos el array de personajes
  for (let res of personajes) {
    // Extraemos los datos que necesitamos de cada personaje
    let nomPersonaje = res.name;
    let imgPersonaje = res.image;
    let especiePersonaje = res.species;

    // Creamos un enlace <a> que envuelve todo el contenedor.
    // para que el contenedor principal sea clicable.
    let divImg = document.createElement('a');
    divImg.classList.add('ancho200');
    divImg.href = './listado/ficha.html';

    //Asignamos el color de fondo según la especie, el rojo si es humano, verde si no
    if (especiePersonaje === 'Human') {
      divImg.style.backgroundColor = 'red';
    } else {
      divImg.style.backgroundColor = 'green';
    }

    // Creamos el elemento img para la foto
    let img = document.createElement('img');

    // Imagen por defecto en caso de error de carga
    const fallback = './assets/imagen_default.png';
    // validamos si imagen esta vacio , nulo , undefined y Si después de quitar espacios está vacío
    if (!imgPersonaje || imgPersonaje.trim() === '') {
      // si cumple la condice te saca la imagen por defecto
      imgPersonaje = fallback;
    }
    //  establecer  la imagen
    img.src = imgPersonaje;
    img.alt = nomPersonaje;
    img.title = nomPersonaje;

    // Usamos una imagen por defecto si la original no carga
    // onerror, que yo vi  en el master de Full Stack  sirve cuando se ejecuta, si la imagen no carga
    img.onerror = function () {
      // validamos si la imagen esta ya cargada por defecto
      if (img.src !== fallback) {
        //Cambia a la imagen por defecto
        img.src = fallback;
      }
    };

    // Añadimos la imagen al contenedor
    divImg.appendChild(img);

    // Creamos el título con el nombre del personaje
    let h1 = document.createElement('h1');
    h1.innerText = nomPersonaje;
    divImg.appendChild(h1);

    // Creamos un evento click para guardar el personaje y abrir su ficha
    divImg.onclick = function (event) {
      event.preventDefault();

      // Guardamos el personaje en localStorage usando la función de datos.js
      guardarPersonaje(res);

      // Abrimos la página de ficha
      window.location.href = './listado/ficha.html';
    };

    // Añadimos la tarjeta completa al contenedor principal
    divContenido.appendChild(divImg);
  }
}

// funcion para inicializar pintarGridPersonajes()
async function inicializarGrid() {
  // Obtenemos todos los personajes con la función de datos.js
  let personajes = await obtenerDatosRickMorty();

  // Pintamos los personajes en el HTML
  pintarGridPersonajes(personajes);
}

// Ejecutamos la función al cargar la página
inicializarGrid();
