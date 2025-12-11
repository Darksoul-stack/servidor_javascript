// funcion para pintar la ficha del personaje
function pintarFichaPersonaje(personaje) {
  // Obtenemos el contenedor donde mostraremos la ficha
  let divContenido = document.getElementById('contenido-personaje');

  // Extraemos los datos que necesitamos de cada personaje
  let nomPersonaje = personaje.name;
  let imgPersonaje = personaje.image;
  let especiePersonaje = personaje.species;

  // Creamos un div como contenedor de la ficha
  let divImg = document.createElement('div');
  divImg.classList.add('ancho100p');

  //Asignamos el color de fondo según la especie, el rojo si es humano, verde si no
  if (especiePersonaje === 'Human') {
    divImg.style.backgroundColor = 'red';
  } else {
    divImg.style.backgroundColor = 'green';
  }

  // Creamos la imagen
  let img = document.createElement('img');
  // Imagen por defecto en caso de error de carga
  const fallback = '../assets/imagen_default.png';
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
  // onerror, que yo vi  en el master de Full Stack  sirve cuando se ejecuta  si la imagen no carga
  img.onerror = function () {
    // validamos si la imagen esta ya cargada por defecto
    if (img.src !== fallback) {
      //Cambia a la imagen por defecto
      img.src = fallback;
    }
  };
  // Añadimos la imagen al contenedor
  divImg.appendChild(img);

  // Creamos el título con el nombre
  let h1 = document.createElement('h1');
  h1.innerText = nomPersonaje;
  divImg.appendChild(h1);

  // Añadimos la ficha al contenedor
  divContenido.appendChild(divImg);
}

// funcion para pintar tabla de episodios
async function pintarTablaEpisodios(personaje) {
  // Obtenemos el contenedor donde irá la tabla
  let divTabla = document.getElementById('tabla-episodios');
  divTabla.innerHTML = ''; // limpiamos la tabla

  // Obtenemos el array de URLs de los episodios del personaje
  let episodiosURLs = personaje.episode;

  // Comprobamos que haya episodios
  if (!episodiosURLs || episodiosURLs.length === 0) {
    divTabla.innerHTML = '<p>No hay episodios para este personaje.</p>';
    return;
  }

  // Creamos la tabla
  let table = document.createElement('table');
  table.classList.add('tabla');

  // Creamos la fila de encabezados
  let tr_th = document.createElement('tr');

  let thNombre = document.createElement('th');
  thNombre.innerText = 'Nombre del Episodio';
  tr_th.appendChild(thNombre);

  let thEpisodio = document.createElement('th');
  thEpisodio.innerText = 'Código';
  tr_th.appendChild(thEpisodio);

  table.appendChild(tr_th);

  // Recorremos cada URL de episodio
  for (let url of episodiosURLs) {
    // Hacemos fetch de cada episodio para obtener sus datos
    let data = await llamadaAPI(url);

    // Creamos una fila para este episodio
    let tr = document.createElement('tr');

    // Mostramos el nombre del episodio como enlace al JSON
    let tdNombre = document.createElement('td');
    let a = document.createElement('a');
    a.href = url;
    // Hace que al hacer click, el enlace no reemplace la página actual
    a.target = '_blank';
    a.innerText = data.name;
    tdNombre.appendChild(a);
    tr.appendChild(tdNombre);

    // Mostramos el código del episodio en la segunda celda
    let tdCodigo = document.createElement('td');
    tdCodigo.innerText = data.episode;
    tr.appendChild(tdCodigo);

    table.appendChild(tr);
  }

  // Añadimos la tabla completa al contenedor
  divTabla.appendChild(table);
}
// funcion para iniciaizar las dos funciones tanto pintarTablaEpisodios() y pintarTablaEpisodios()
async function inicializarFicha() {
  // Recuperamos el personaje de localStorage
  let personaje = obtenerPersonajeGuardado();
  // Validamos que exista un personaje guardado
  if (!personaje) {
    document.getElementById('contenido-personaje').innerHTML =
      '<p style="text-align:center; padding:50px;">No hay personaje seleccionado. <a href="../index.html">Volver al inicio</a></p>';
    return;
  }
  // Pintamos la ficha con foto, nombre y fondo de color
  pintarFichaPersonaje(personaje);
  // Pintamos la tabla con los episodios del personaje
  await pintarTablaEpisodios(personaje);
}
// Llamamos a la función al cargar la página
inicializarFicha();
