class Casa {
  constructor(nombreCasa, personajesCasa) {
    // Propiedad nombre de la casa
    this.nombreCasa = nombreCasa;

    // Guarda la lista de personajes de una casa en la variable
    this.personajesCasa = personajesCasa;

    // Una lista donde guardaré personajes.
    this.arrPersonajesObj = [];

    // Lo rellenamos con personajes creados a partir de los datos originales.
    for (let datos of this.personajesCasa) {
      // Crea un personaje nuevo a partir de sus datos.
      let p = new Personaje(datos);
      // Añade ese personaje a la lista de personajes que ya existen.
      this.arrPersonajesObj.push(p);
    }
  }
  // Funcion para contar hombres masculinos
  contarMasculinos() {
    // iniciamos un contador
    let contador = 0;

    // Recorro el array original de personajes de la casa
    for (let p of this.personajesCasa) {
      // Cuenta cuántos personajes son hombres y aumenta el contador cuando encuentra uno.
      if (p.gender && p.gender.toLowerCase() === 'male') {
        contador++;
      }
    }
    // Devuelve el contador
    return contador;
  }

  enumerarPersonajesDeCasa() {
    // Contenedor principal dentro del main
    let contenedor = document.getElementById('contenido-casas');

    // Limpio el contenido por si antes se mostró otra casa
    contenedor.innerHTML = '';

    // Div principal para esta casa
    let divPrincipal = document.createElement('div');
    divPrincipal.classList.add('contenedor-casa');

    // Titulo para casa
    let h1 = document.createElement('h1');
    // Muestro el título de la casa. Al hacer clic en él, se mostrarán los chicos.
    h1.innerText = 'Casa: ' + this.nombreCasa;

    // Al hacer clic, muestra cuántos personajes hay y cuántos son chicos.
    h1.onclick = () => {
      // Cuenta cuantos personajes hay en la casa.
      let total = this.personajesCasa.length;
      // Cuenta cuatos personajes son chicos.
      let chicos = this.contarMasculinos();
      alert(
        'Personajes que hay en la casa son ' +
          total +
          ' y  ' +
          chicos +
          ' son chicos.'
      );
    };

    divPrincipal.appendChild(h1);

    // grid personajes
    let divGrid = document.createElement('div');
    divGrid.classList.add('grid-personajes');

    // Imagen por defecto si falla la de la API
    const fallback = 'assets/imagen_personaje_harrypotter.png';

    // Recorremos los personajes de esta casa
    for (let per of this.arrPersonajesObj) {
      // Tarjeta del personaje
      let divTarjeta = document.createElement('div');
      divTarjeta.classList.add('ancho200');

      // Busco el objeto original para obtener la imagen y la casa.
      let original = this.personajesCasa.find((x) => x.name === per.name);

      // Color de fondo según sea mago o no
      if (per.isWizard) {
        divTarjeta.style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
      } else {
        divTarjeta.style.backgroundColor = 'rgba(128, 0, 0, 0.2)';
      }

      // Imagen del personaje
      let img = document.createElement('img');
      // Guarda la imagen del personaje o deja vacío si no tiene.
      let imgPersonaje = original && original.image ? original.image : '';

      // Si no hay imagen utilizo la de default
      if (!imgPersonaje || imgPersonaje.trim() === '') {
        imgPersonaje = fallback;
      }
      // Establecemos la imagen
      img.src = imgPersonaje;
      img.alt = per.name;
      img.title = per.name;

      // Usamos una imagen por defecto si la original no carga
      // onerror, que yo vi  en el master de Full Stack  sirve cuando se ejecuta  si la imagen no carga
      img.onerror = function () {
        // validamos si la imagen esta ya cargada por defecto
        if (img.src !== fallback) {
          //Cambia a la imagen por defecto
          img.src = fallback;
        }
      };
      // Añadimos la imagen al contenedor
      divTarjeta.appendChild(img);

      // Nombre del personaje
      let h2 = document.createElement('h2');
      h2.innerText = per.name;
      divTarjeta.appendChild(h2);

      // Texto con la casa
      let pCasa = document.createElement('p');
      // Muestra el nombre de la casa del personaje o Sin casa si no tiene.
      pCasa.innerText =
        'Casa: ' + (original && original.house ? original.house : 'Sin casa');
      // Añadimos la etiqueta al contenedor
      divTarjeta.appendChild(pCasa);

      //  Al hacer clic, muestra si es mago y las caracteristicas de la varita
      divTarjeta.onclick = () => {
        // Guarda en textoMago si el personaje es un mago o no.
        let textoMago = per.esMago();
        // Guarda en textoVarita la descripcion.
        let textoVarita = per.descripcionVarita();
        alert(textoMago + '\n' + textoVarita);
      };

      // Añadimos la tarjeta al grid
      divGrid.appendChild(divTarjeta);
    }

    // Añadimos el grid al contenedor principal de la casa
    divPrincipal.appendChild(divGrid);

    // Metemos todo dentro del div contenido-casas del HTML
    contenedor.appendChild(divPrincipal);
  }
}

// Aquí guardaremos cada casa como un objeto.
let arrCasasObjetos = [];

// Funcion Para inicializar las casas
async function inicializarCasas() {
  // obtenemos el array de casas desde datos.js
  let arrCasas = await generarArrayCasas();

  arrCasasObjetos = [];

  // Por cada entrada del array. Creamos un objeto  de Casa
  for (let c of arrCasas) {
    let casaObj = new Casa(c.nombreCasa, c.personajes);
    arrCasasObjetos.push(casaObj);
  }
}

// Función para mostrar la casa
function mostrarCasa(nombreCasa) {
  // Buscamos la casa correspondiente en arrCasasObjetos
  let casa = arrCasasObjetos.find((c) => c.nombreCasa === nombreCasa);

  if (!casa) {
    console.error('No se encontró la casa:', nombreCasa);
    return;
  }

  // Si existe, pintamos sus personajes en el DOM
  casa.enumerarPersonajesDeCasa();
}

// Cuando el DOM esté cargado  para no esperar todas las imagenes
document.addEventListener('DOMContentLoaded', function () {
  inicializarCasas();
});
