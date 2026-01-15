//  Funcion para llamar a cualquier Api
async function llamadaAPI(url) {
  // Hace la peticion a la api y espera su respuesta
  let cuerpo_respuesta = await fetch(url);
  // Convierta la repuesta en un json
  let datos = await cuerpo_respuesta.json();
  return datos; // Devuelve los datos obtenidos
}

// Funcion para obtener todos los datos de personajes de Harry Potter
async function obtenerDatosHarryPotter() {
  // La url de la Api de Harry Potter
  const url = 'https://hp-api.onrender.com/api/characters';
  // Llamos a la funcion llamadaApi y esperamos los datos
  let data = await llamadaAPI(url);
  console.log('Datos obtenidos:', data);
  return data; // Devuelve el array de todos los personajes
}

// Funcion para leer las casas guardadas en localStorage
function obtenerCasasGuardadas() {
  // Intentan obtener el dato guardado de casas
  let datos = localStorage.getItem('casas');

  //  Validamos si ese dato existe
  if (!datos) {
    console.error('No hay casas guardadas en localStorage');
    // devuelve null si no hay nada guardado
    return null;
  }
  // convierte el texto en un objeto y lo devuelve
  return JSON.parse(datos);
}

//  Funcion para guardar las casas en un localStorage
function guardarCasasEnLocalStorage(casas) {
  // Guardamos una casa  en el localStorage
  // Usamos JSON.stringify porque localStorage solo guarda strings
  localStorage.setItem('casas', JSON.stringify(casas));
}

// Funcion para crear el array de casa con su personaje
async function generarArrayCasas() {
  // Cargamos las casas desde el LocalStorage para no llamar a la api todo el rato
  let casasGuardadas = obtenerCasasGuardadas();

  // Si hay algo guardado y tiene longitud mayor que 0. Lo uso directamente
  if (casasGuardadas && casasGuardadas.length > 0) {
    console.log('Usando casas desde localStorage');
    return casasGuardadas;
  }

  //  Si no hay nada en localStorage. LLamo a la API para obtener los datos.
  let personajes = await obtenerDatosHarryPotter();
  // Inicializamos un array vacio para meter las casas
  let arrCasas = [];
  // Recorro uno a uno todos los personajes
  for (let p of personajes) {
    // Cojemos  la casa del personaje
    let casaPersonaje = p.house;

    // Si la casa es null, undefined o cadena vacía -> lo mando a "SinCasa" Comprobamos  si es nulo  la casa o personaje
    if (!casaPersonaje || casaPersonaje.trim() === '') {
      casaPersonaje = 'SinCasa';
    } // vuelata a escribir

    // Busco si en arrCasa si existe un objeto para esa casa
    // find() me devuelve la primera coincidencia de la casa encontrada
    let casaEncontrada = arrCasas.find((c) => c.nombreCasa === casaPersonaje);

    //  si la casa no existe en el array. La creo
    if (!casaEncontrada) {
      // Creo un objeto nuevo con el nombre y un array vacío de personajes
      casaEncontrada = {
        nombreCasa: casaPersonaje,
        personajes: []
      };

      // Añado la nueva casa al array de casas
      arrCasas.push(casaEncontrada);
    }

    // Añado el personaje actual al array de personajes de esa casa
    casaEncontrada.personajes.push(p);
  }

  // // Me aseguro de que existan todas las casas básicas (opcional).
  // let nombresBasicos = [
  //   'Gryffindor',
  //   'Hufflepuff',
  //   'Ravenclaw',
  //   'Slytherin',
  //   'SinCasa'
  // ];

  // for (let nombre of nombresBasicos) {
  //   // Miro si en arrCasas ya hay una entrada con ese nombre
  //   let existe = arrCasas.find((c) => c.nombreCasa === nombre);

  //   // Si NO existe, la creo con un array de personajes vacío
  //   if (!existe) {
  //     arrCasas.push({
  //       nombreCasa: nombre,
  //       personajes: []
  //     });
  //   }
  // }

  // 6. Guardo el resultado final en localStorage para reutilizarlo después
  guardarCasasEnLocalStorage(arrCasas);

  console.log('Array de casas generado:', arrCasas);

  // Devuelvo el array para poder usarlo en otros ficheros
  return arrCasas;
}
