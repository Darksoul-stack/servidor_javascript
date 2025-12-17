// creamos una clase personaje
class PersonajeSW {
  constructor(datos) {
    this.name = datos.name;
    this.vehicles = datos.vehicles;
    this.starships = datos.starships;
  }
  // funcion par
  async haPilotado() {
    // Combina los arrays de vehículos y naves en un solo array llamado arrTotal
    const arrTotal = this.vehicles.concat(this.starships);
    // Comprueba los dos arrays para saber si hay naves.
    if (arrTotal.length === 0) {
      return `${this.name} no ha conducido ningún vehículo ni nave`;
    }
    // inicializamos un array vacio
    let modelos = [];
    // recorremos los dos arrays
    for (let url of arrTotal) {
      // guardamos en una variable la llamada a una api
      const datos = await llamadaAPI(url);
      // Si existen los datos y tienen la propiedad model
      if (datos && datos.model) {
        //  añadimos  el modelo al array de modelos
        modelos.push(datos.model);
      }
    }

    return `${this.name} se montó en: ${modelos.join(', ')}`;
  }
}

// funcionar para iniciar por consola (no hace falta )
async function iniciarApp() {
  // guardamos en una variable los datos obtenidos
  const datos = await obtenerDatosStarwars();
  // Recorre los datos de personajes
  for (let personajeData of datos) {
    // creamos un objeto
    const personaje = new PersonajeSW(personajeData);
    // utiliza un metodo de la clase personaje
    const resultado = await personaje.haPilotado();
    console.log(resultado);
  }
}

// iniciarApp();
