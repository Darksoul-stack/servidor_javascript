// Guardamos la URL de la API donde pedimos la lista de Pokémon
const url = 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=120'
// -------------------------------------------------------------
// fetch() hace una petición a una API.
// IMPORTANTE: fetch DEVUELVE UNA PROMESA.
// → Tú la pides (fetch())
// → Todavía no la tienes (PROMESA en estado "pendiente")
// → Cuando llega, te avisan y tú haces algo con ella (.then())
// → Si algo falla, te avisan también (.catch())
//
// Por eso fetch funciona con .then() y .catch()
// -------------------------------------------------------------
fetch(url)
  // fetch(url) hace la petición a la API y devuelve una promesa.
  // Esa respuesta NO es todavía un objeto usable de JavaScript.
  // Es como un "sobre cerrado" que contiene JSON en texto.
  //
  .then((resultado) => resultado.json())
  // resultado NO es todavía los datos.
  // resultado.json() abre ese sobre y convierte el JSON (texto)
  // en un objeto o array de JavaScript que podemos usar.
  // Aquí "data" ya es un objeto o array de JavaScript
  // recibe los resultados
  .then((data) => {
    // AQUÍ sí tienes los datos de verdad: los Pokémon.
    console.log('Lista recibida:', data)
    // recorremos el objecto de los datos de la api con los results
    for (const pokemon of data.results) {
      // hacemos una peticion a la api para que me envie los url
      fetch(pokemon.url)
        .then((resp) => resp.json()) // convierte la respuesta de la url en objecto
        .then((infoPokemon) => {

          console.log('url:', infoPokemon)
          let tarjeta = document.createElement('div')
          tarjeta.classList.add('tarjeta')

          let divImagen = document.createElement('div')
          divImagen.classList.add('imagen')

          let img = document.createElement('img')
          img.src = infoPokemon.sprites.front_default

          let divTitulo = document.createElement('div')
          divTitulo.classList.add('titulo')

          let enlace = document.createElement('a')
           // crear un href  para poner la url 
          enlace.href = pokemon.url
          // crear un texto para anadir su nombre
          enlace.textContent = pokemon.name

          divImagen.appendChild(img)
          divTitulo.appendChild(enlace)
          tarjeta.appendChild(divImagen)
          tarjeta.appendChild(divTitulo)

          document.getElementById('contenedor').appendChild(tarjeta)
        })
        .catch((errData) => {
          // Si ocurre un error convirtiendo a JSON
          console.error(
            `Error convirtiendo a JSON del Pokémon ${pokemon.name}:`,
            errData
          )
        })
    }
  })
  .catch((err) => {
    // Si fetch falla (no hay internet, url mal, etc.)
    console.error('Error en la petición:', err)
  })

//otra forma
/* const url = 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=120';

fetch(url)
  .then(resultado => resultado.json())
  .then(data => {
    console.log("Lista recibida:", data);
    
    const contenedor = document.getElementById("contenedor");
    let fila; // fila actual
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = data.results[i];
      
      // Crear una nueva fila cada 4 tarjetas
      if (i % 4 === 0) {
        fila = document.createElement("div");
        fila.classList.add("fila");
        contenedor.appendChild(fila);
      }

      // Creamos la tarjeta vacía aquí para poder añadirla a la fila en cuanto tenga contenido
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      // Agregamos la tarjeta a la fila (aunque aún esté vacía)
      fila.appendChild(tarjeta);

      // Ahora hacemos fetch para los datos del Pokémon para completar la tarjeta
      fetch(pokemon.url)
        .then(resp => resp.json())
        .then(infoPokemon => {
          // Crear el contenido de la tarjeta
          let divImagen = document.createElement("div");
          divImagen.classList.add("imagen");

          let img = document.createElement("img");
          img.src = infoPokemon.sprites.front_default;

          let divTitulo = document.createElement("div");
          divTitulo.classList.add("titulo");

          let enlace = document.createElement("a");
          enlace.href = pokemon.url;
          enlace.textContent = pokemon.name;

          divImagen.appendChild(img);
          divTitulo.appendChild(enlace);

          // Limpiamos la tarjeta (por si acaso) y añadimos contenido
          tarjeta.innerHTML = '';
          tarjeta.appendChild(divImagen);
          tarjeta.appendChild(divTitulo);
        })
        .catch(errData => {
          console.error(`Error convirtiendo a JSON del Pokémon ${pokemon.name}:`, errData);
        });
    }
  })
  .catch(err => {
    console.error("Error en la petición:", err);
  });
*/
