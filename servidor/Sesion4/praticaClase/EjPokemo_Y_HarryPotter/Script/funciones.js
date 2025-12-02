// URLs de las APIs
let urlDragonBall = 'https://dragonball-api.com/api/characters';
let urlHarryPotter = 'https://hp-api.onrender.com/api/characters';

// Creamos promesas con fetch (fetch devuelve promesa)
let promesaDragonBall = fetch(urlDragonBall).then((resultado) =>
  resultado.json()
);
let promesaHarryPotter = fetch(urlHarryPotter).then((resultado) =>
  resultado.json()
);

// Llamamos a ambas a la vez con Promise.all
Promise.all([promesaDragonBall, promesaHarryPotter])
  .then((resultados) => {
    console.log('Dragon Ball:', resultados[0]);
    console.log('Harry Potter:', resultados[1]);
  })
  .catch((error) => {
    console.log('Error al traer los datos:', error);
  });

// comparamos cual carga primero con promise race
