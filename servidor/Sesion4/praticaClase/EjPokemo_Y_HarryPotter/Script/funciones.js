// URLs de las APIs
const urlDB = 'https://dragonball-api.com/api/characters';
const urlHP = 'https://hp-api.onrender.com/api/characters';

// Creamos promesas con fetch (fetch devuelve promesa)
function promesaUrl(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error:', err);
      return null;
    });
}

//Defino las funciones de pintado
function pintarDB(oResult) {
  let divContenido = document.getElementById('contenidoDB');
  for (let res of oResult) {
    let nomPersonaje = res.name;
    let desPersonaje = res.description;
    let imgPersonaje = res.image;

    if (imgPersonaje != null && imgPersonaje != undefined) {
      //PASO 4 TENIENDO EL LA URL DE LA IMAGEN CREAMOS EL DIV Y LA IMAGEN QUE LO CONTIENE
      let divImg = document.createElement('div');
      divImg.classList.add('ancho200');
      let img = document.createElement('img');
      img.src = imgPersonaje;
      img.alt = nomPersonaje;
      img.title = nomPersonaje;
      //Añado la funcion onclick a la imagen
      img.onclick = function () {
        localStorage.clear();
        localStorage.setItem('personaje', JSON.stringify(res));
        document.location =
          'http://localhost:3000/sesion3/EjercicioFinal/Articulo';
      };
      //Inserto como hijo la imagen al div
      divImg.appendChild(img);

      //Inserto el titulo
      let h1 = document.createElement('h1');
      h1.innerText = nomPersonaje;
      //Inserto como hijo el titulo al div
      divImg.appendChild(h1);

      //Inserto el texto breve
      let p = document.createElement('p');
      p.innerText = desPersonaje;

      //Inserto como hijo el parrafo al div
      divImg.appendChild(p);

      //Inserto como hijo al div principal
      divContenido.appendChild(divImg);
    }
  }
}

function pintarHP(data, id = '', casa = 'Gryffindor') {
  if (id != '') {
    //Pinto ficha
    oResult = data.filter((x) => x.id == id);
  } else {
    if (casa == 'SinCasa') {
      oResult = data.filter(
        (x) =>
          x.house != 'Gryffindor' &&
          x.house != 'Hufflepuff' &&
          x.house != 'Ravenclaw' &&
          x.house != 'Slytherin'
      );
    } else {
      oResult = data.filter((x) => x.house == casa);
    }
  }

  oResult = oResult
    .map((x) => {
      let iAnio = 0;
      if (x.yearOfBirth && x.yearOfBirth != null && x.yearOfBirth != '') {
        iAnio = parseInt(x.yearOfBirth);
      } else {
        iAnio = 99999;
      }
      x.yearOfBirth = iAnio;
      return x;
    })
    .sort((a, b) => a.yearOfBirth - b.yearOfBirth);

  //console.log("oResult", oResult);
  //PASO 2 RECORREMOS EL ARRAY DE RESULTADOS CON UN FOR OF
  //Y ME CREO EL DIV PRINCIPAL DONDE METER LAS IMAGENES
  let divContenido = document.getElementById('contenidoHP');
  divContenido.innerHTML = '';
  //Funcion flecha q agrupa con reduce
  const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
      //Saco la casa
      const k = item[key];

      //Compruebo si es array vacio o no y si es asi inicializo el acumulador con vacio
      acc[k] = acc[k] || [];

      //Añado el item a cada casa
      acc[k].push(item);
      return acc;
    }, {});
  };

  let group = groupBy(oResult, 'house');
  //console.log("group", group);

  //Recorro cada una de las keys del arr group agrupado
  for (let casa in group) {
    //Extraigo el array de la casa
    let arr = group[casa];

    //Creo el div de la casa
    let divCasa = document.createElement('div');
    divCasa.id = casa;
    divCasa.className = 'casa';
    let h1Casa = document.createElement('h1');
    h1Casa.innerText = casa ? casa : 'No Afiliation';
    divCasa.appendChild(h1Casa);
    //Uso map para acceder a cada elemento del array
    arr.map((x) => {
      //Creo las etiquetas en memoria
      let divPersonaje = document.createElement('div');
      divPersonaje.className = 'personaje';
      let h3Personaje = document.createElement('h3');
      let h4Anio = document.createElement('h4');
      let imgPersonaje = document.createElement('img');
      let pPersonaje = document.createElement('p');

      //Doy contenido a las etiquetas
      h3Personaje.innerHTML = `<b>${x.name}</b>`;
      h4Anio.innerHTML = `<i>${
        x.yearOfBirth == 99999 ? 'Mas viejo que Jorge' : String(x.yearOfBirth)
      }</i>`;
      imgPersonaje.src = x.image ? x.image : './imagenes/Deafault.png';
      //Añado la funcion onclick a la imagen
      imgPersonaje.onclick = function () {
        localStorage.clear();
        localStorage.setItem('id', x.id);
        document.location =
          'http://localhost:3000/sesion3/ejercicioHarryPotter/Articulo';
      };
      pPersonaje.innerText =
        x.alternate_names.length > 0 ? x.alternate_names.join(',') : '';

      //Las añado al divPersonaje
      divPersonaje.appendChild(h3Personaje);
      divPersonaje.appendChild(h4Anio);
      divPersonaje.appendChild(imgPersonaje);
      divPersonaje.appendChild(pPersonaje);

      divCasa.appendChild(divPersonaje);
    });

    //Añado la casa al contenido
    divContenido.appendChild(divCasa);
  }
}
// Llamamos a ambas a la vez con Promise.all

Promise.all([promesaUrl(urlDB), promesaUrl(urlHP)]).then(([db, hp]) => {
  console.log('Dragon Ball:', db);
  console.log('Harry Potter:', hp);

  if (db?.items) pintarDB(db.items);
  if (hp) pintarHP(hp);
});

// comparamos cual carga primero con promise race
Promise.race([promesaUrl(urlDB), promesaUrl(urlHP)]).then((resultado) => {
  console.log('Ganador de la carrera:', resultado);

  if (resultado?.items) {
    pintarDB(resultado.items);
  } else {
    pintarHP(resultado);
  }
});

//Ejemplo con await
async function funcionAsincroona() {
  //Llamadas simples
  let aDB = await promesaUrl(urlDB);
  console.log('datosDB', aDB);
  pintarDB(aDB.items);

  let aHP = await promesaUrl(urlHP);
  console.log('datosHP', aHP);
  pintarHP(aHP);

  //Promise all
  let resultados = await Promise.all([pDB, pHP]);
  for (let res of resultados) {
    if (typeof res.items != 'undefined') {
      pintarDB(res.items);
    } else {
      pintarHP(res);
    }
  }

  //Echamos una carrera, Goku gana fijo hasta esperando (CHISTACO )
  let resultado = await Promise.race([pDB, pHP]);
  console.log(resultado);
  if (typeof resultado.items != 'undefined') {
    pintarDB(resultado.items);
  } else {
    pintarHP(resultado);
  }
}

funcionAsincroona();
