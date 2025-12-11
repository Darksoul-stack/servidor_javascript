class Peliculas {
  constructor(objeto) {
    this.name = objeto.name;
    this.eye_color = objeto.eye_color;
    this.gender = objeto.gender;
    this.films = objeto.films; // array de URLs de películas
  }

  async pintarTablaPersonaje() {
    const contenedor = document.getElementById('tabla-episodios');
    contenedor.innerHTML = '';

    if (!this.films || this.films.length === 0) {
      contenedor.innerHTML = '<p>Este personaje no aparece en películas.</p>';
      return;
    }

    // Creamos la tabla
    const table = document.createElement('table');
    table.innerHTML = `<tr><th>Personaje</th><th>Elenco compartido</th></tr>`;

    // Set para nombres únicos
    const elencoTotal = new Set();

    // Recorremos cada película
    for (let filmURL of this.films) {
      const filmData = await llamadaAPI(filmURL);

      // Recorremos los personajes de la película
      for (let charURL of filmData.characters) {
        const charData = await llamadaAPI(charURL);
        if (charData.name !== this.name) {
          elencoTotal.add(charData.name); // no repetimos ni incluimos al personaje principal
        }
      }
    }

    // Creamos la fila para el personaje
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${this.name}</td>
      <td>${[...elencoTotal].join(', ')}</td>
    `;
    table.appendChild(tr);

    contenedor.appendChild(table);
  }

  async inicializarTabla() {
    // Si no tiene datos, los obtiene de la API
    if (!this.films) {
      if (typeof obtenerDatosStarwars !== 'function') {
        console.error('La función obtenerDatosStarwars no está definida.');
        return;
      }

      const personajes = await obtenerDatosStarwars();
      const personajeData = personajes[0]; // ejemplo: primer personaje
      this.name = personajeData.name;
      this.eye_color = personajeData.eye_color;
      this.gender = personajeData.gender;
      this.films = personajeData.films;
    }

    await this.pintarTablaPersonaje();
  }
}

// USO
const peliculasApp = new Peliculas({});
peliculasApp.inicializarTabla();
