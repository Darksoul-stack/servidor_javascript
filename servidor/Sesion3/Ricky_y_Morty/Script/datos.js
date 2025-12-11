// funcion para llamar a una api
// Recibe una URL y devuelve los datos en formato JSON
async function llamadaAPI(url) {
  // Hace la petición y espera la respuesta
  let cuerpo_respuesta = await fetch(url);
  // Convierte la respuesta a JSON
  let datos = await cuerpo_respuesta.json();
  // devuelve los datos obtenidos
  return datos;
}

// funcion para obtener los datos de personajes de la api
async function obtenerDatosRickMorty() {
  // creamos un array vacio para meter los personajes
  let todosLosPersonajes = [];
  let url = 'https://rickandmortyapi.com/api/character';
  // El bucle while para recorrer las paginas mientras exista una url .
  while (url) {
    let data = await llamadaAPI(url);

    // metemos los personajes de la pagina en un array total.
    // utilizamos el operador spread para combinar arrays
    todosLosPersonajes = [...todosLosPersonajes, ...data.results];

    // Actualizamos la URL con la siguiente página
    // Si es la última página, info.next será null y el bucle termina
    url = data.info.next;

    console.log('Página descargada. Total:', todosLosPersonajes.length);
  }

  console.log('Todos los personajes obtenidos:', todosLosPersonajes.length);
  return todosLosPersonajes;
}

// funcion  para el LocalStore
function guardarPersonaje(personaje) {
  // guardamos un personaje en el localStorage
  // Usamos JSON.stringify porque localStorage solo guarda strings
  localStorage.setItem('personaje', JSON.stringify(personaje));
}

// Recupera el personaje guardado en localStorage
// Usamos JSON.parse para convertir el string de nuevo a objeto
function obtenerPersonajeGuardado() {
  let datos = localStorage.getItem('personaje');

  // Si no hay datos guardados devolvemos un null
  if (!datos) {
    console.error('No hay personaje guardado');
    return null;
  }
  // devuevel los datos en un json
  return JSON.parse(datos);
}
