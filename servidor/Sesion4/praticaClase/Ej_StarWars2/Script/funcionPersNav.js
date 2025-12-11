class Personajes {
  constructor(objeto) {
    this.name = objeto.name;
    this.eye_color = objeto.eye_color;
    this.gender = objeto.gender;
    this.vehicles = objeto.vehicles;
    this.starships = objeto.starships;
  }

  async pintarconsola() {
    console.log(
      `Nombre: ${this.name}, Ojos: ${this.eye_color}, Género: ${this.gender}`
    );

    for (let vehiculoURL of this.vehicles) {
      const vehiculo = await llamadaAPI(vehiculoURL);
      console.log(` Vehículo: ${vehiculo.name}`);
    }

    for (let naveURL of this.starships) {
      const nave = await llamadaAPI(naveURL);
      console.log(` Starship: ${nave.name}`);
    }
  }

  async inicializarPintarconsola() {
    const personajesDatos = await obtenerDatosStarwars();
    this.personajesObjetos = personajesDatos.map(
      (dato) => new Personajes(dato)
    );

    for (let personaje of this.personajesObjetos) {
      await personaje.pintarconsola();
    }
  }
}

// Uso:
const app = new Personajes({});
app.inicializarPintarconsola();
