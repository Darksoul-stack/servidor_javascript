class TablaPersonajes {
  constructor(objeto) {
    this.name = objeto.name;
    this.vehicles = objeto.vehicles;
    this.starships = objeto.starships;
  }
  // funcion para pintar personajes
  async pintarTablaPersonajes(personajes) {
    // Obtiene del DOM el elemento con id tabla-episodios y lo guarda en la variable contenedor
    const contenedor = document.getElementById('tabla-episodios');
    // Vacía todo el contenido HTML del elemento contenedor
    contenedor.innerHTML = '';
    // creamos una etiqueta tabla
    const table = document.createElement('table');
    table.border = '1';
    // Creamos una tabla con sus propiedades
    table.innerHTML = `
    <tr>
      <th>Personaje</th>
      <th>Vehículos / Naves pilotadas</th>
    </tr>
  `;
    // recorremos personajes
    for (let personaje of personajes) {
      // Combina los arrays de vehículos y naves del personaje en un solo array
      const arrTotal = personaje.vehicles.concat(personaje.starships);

      let textoFinal = 'No ha pilotado ningún vehículo ni nave';
      // comprueba si hay vehiculos y naves
      if (arrTotal.length > 0) {
        // inicializamos un array vacio
        let modelos = [];
        // Recorre cada URL del array
        for (let url of arrTotal) {
          // obtiene los datos de la API
          const datos = await llamadaAPI(url);
          //si tienen modelo lo añade al array de modelos
          if (datos && datos.model) {
            modelos.push(datos.model);
          }
        }

        textoFinal = modelos.join(', ');
      }
      // Crea una fila de tabla con el nombre del personaje y su texto de vehículos/naves pilotadas
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${personaje.name}</td>
      <td>${textoFinal}</td>
    `;
      // Añade la fila creada como hijo del elemento table
      table.appendChild(tr);
    }
    //Añade  al elemento  padre la tabla
    contenedor.appendChild(table);
  }
  // Obtiene los datos de personajes de Star Wars y luego los pinta en una tabla
  async inicializarTabla() {
    const personajes = await obtenerDatosStarwars();
    await this.pintarTablaPersonajes(personajes);
  }
}

// Crea una instancia de TablaPersonajes
const tablaApp = new TablaPersonajes({});
//inicia la carga y visualización de la tabla
tablaApp.inicializarTabla();
