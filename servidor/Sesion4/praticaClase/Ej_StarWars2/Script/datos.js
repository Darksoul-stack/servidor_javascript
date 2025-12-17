async function llamadaAPI(url) {
  let respuesta = await fetch(url);
  let datos = await respuesta.json();
  return datos;
}

async function obtenerDatosStarwars() {
  let personajes = [];
  let url = 'https://swapi.py4e.com/api/people/'; // URL inicial

  while (url) {
    const data = await llamadaAPI(url); // data.results es un array
    personajes = [...personajes, ...data.results];
    url = data.next; // pasamos a la siguiente página
  }

  // Recorre cada personaje
  for (let personaje of personajes) {
    // comprobamos  si tiene vehículos
    if (personaje.vehicles.length > 0) {
      // Inicializa un array vacío en el personaje para almacenar  datos  de  vehículos
      personaje.vehiculosData = [];
      // recomeros el array inicializado
      for (let vehiculoUrl of personaje.vehicles) {
        //  llamada a la funcion  API para obtener datos
        const vehiculo = await llamadaAPI(vehiculoUrl);
        //los almacena en vehiculosData de personaje
        personaje.vehiculosData.push(vehiculo);
      }
    }
  }

  console.log('Total personajes con sus vehículos:', personajes.length);
  return personajes; // devuleve personajes
}
obtenerDatosStarwars();
