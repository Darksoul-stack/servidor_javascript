async function llamadaAPI(url) {
  let respuesta = await fetch(url);
  let datos = await respuesta.json();
  return datos;
}

async function obtenerDatosStarwars() {
  let personajes = [];
  let url = 'https://swapi.dev/api/people'; // URL inicial

  while (url) {
    const data = await llamadaAPI(url); // data.results es un array
    personajes = [...personajes, ...data.results];
    url = data.next; // pasamos a la siguiente página
  }

  //  traer naves de cada personaje
  for (let personaje of personajes) {
    if (personaje.vehicles.length > 0) {
      personaje.vehiculosData = [];
      for (let vehiculoUrl of personaje.vehicles) {
        const vehiculo = await llamadaAPI(vehiculoUrl);
        personaje.vehiculosData.push(vehiculo);
      }
    }
  }

  console.log('Total personajes con sus vehículos:', personajes.length);
  return personajes;
}
obtenerDatosStarwars();
