import { comics } from "./datos.js";
import { Comic } from "./comic.js";

//functio para pintar otra lista por pantalla al aañadir un comic nuevo 
function pintar() {
    const lista = document.getElementById("lista");
    // Para añadir una nueva lista al cuerpo del HTML 
    lista.innerHTML = ''
    // Recorremos el array comics para añadir una lista completa con los cómics actuales
    for (let c of comics) {
        lista.innerHTML += `
      <div class="fila">
        <input type="text" id="titulo${c.id}" value="${c.titulo}">
        <input type="text" id="autor${c.id}" value="${c.autor}">
        
        <select id="estado${c.id}">
          <option value="pendiente" ${c.estado === 'pendiente' ? 'selected' : ''}>pendiente</option>
          <option value="leyendo" ${c.estado === 'leyendo' ? 'selected' : ''}>leyendo</option>
          <option value="leído" ${c.estado === 'leído' ? 'selected' : ''}>leído</option>
        </select>

        <input type="checkbox" id="prestar${c.id}" ${c.prestado ? 'checked' : ''}>

        <select id="localizacion${c.id}">
          <option value="estanteria1" ${c.localizacion === 'estanteria1' ? 'selected' : ''}>Estantería 1</option>
          <option value="estanteria2" ${c.localizacion === 'estanteria2' ? 'selected' : ''}>Estantería 2</option>
          <option value="mueble" ${c.localizacion === 'mueble' ? 'selected' : ''}>Mueble</option>
        </select>

        <div class="acciones">
          <input type="button" value="MOD" onclick="modificarComic(${c.id})">
          <input type="button" value="DEL" onclick="eliminarComic(${c.id})">
        </div>
      </div>`
    }
}

//  funcion para Añadir un  cómic
function anadirComic() {
    //obtenemos los elementos del formulario mediante id y eliminaos los espacios en blanco 

    let titulo = document.getElementById('titulo0').value.trim();
    let autor = document.getElementById('autor0').value.trim();

    // la condicion comprueba que título y autor no pueden estar vacíos

    if (titulo.trim() === '' || autor.trim() === '') {
        alert('Título y Autor son obligatorios.')
        return
    }
    //obtenemos los elementos del formulario mediante id

    let estado = document.getElementById('estado0').value;
    let prestado = document.getElementById('prestar0').checked;
    let localizacion = document.getElementById('localizacion0').value;

    // Encontrar id mayor existente
    let id = 1
    for (let c of comics) {
        if (c.id >= id) id = c.id + 1
    }
    // Construimos una instancia de la clase Comic para guardar los datos 
    id,titulo,autor,estado, localizacion

    let nuevo = new Comic(id, titulo, autor, estado, prestado, localizacion)
    //  Sirve para agregar la nueva instancia de Comic al array
    comics.push(nuevo)
    //llamamos a la funcion pintar 
    pintar()
}

// funcion para modificar un comic existente.
function modificarComic(id) {
    for (let c of comics) {
        // La condición comprueba si el id del cómic coincide exactamente
        if (c.id === id) {

            let t = document.getElementById('titulo' + id).value.trim();
            let a = document.getElementById('autor' + id).value.trim();

            // la condicion comprueba que  título y autor no pueden estar vacíos
            if (t.trim() === '' || a.trim() === '') {
                alert('Título y Autor no pueden estar vacíos.')
                return
            }
            // Modifica los valores del cómic con los nuevos datos introducidos
            c.titulo = t
            c.autor = a
            c.estado = document.getElementById('estado' + id).value
            c.prestado = document.getElementById('prestar' + id).checked
            c.localizacion = document.getElementById('localizacion' + id).value
        }
    }
    pintar()
}

// funcion para eliminar un comic existente 
function eliminarComic(id) {
    if (confirm('¿Quieres eliminar este cómic?')) {

        // Inicializamos la posición en -1  por si no se encuentra el cómic
        let pos = -1;
        for (let i = 0; i < comics.length; i++) {
            // Recorremos el array comics para encontrar el índice del cómic con su id exactamente 
            if (comics[i].id === id) {
                // la id coincide exactamente lo guardaos en su posicion  
                pos = i;
                break;
            }
        }

        //  splice (): sirve para modificar el array eliminando un elemento por su índice
        comics.splice(pos, 1)
        pintar()
    }
}

// funcion para  mostrar por  consola 
function listarComics() {
    console.log("Listado actual de cómics:")
    for (let c of comics) {
        console.log(c)
    }
}

// Exponer funciones al scope global para que peudan ser llamadas  desde el  HTML.
window.pintar = pintar
window.anadirComic = anadirComic
window.modificarComic = modificarComic
window.eliminarComic = eliminarComic
window.listarComics = listarComics

//  imprime la funcion  Pintar() automaticamente  al cargar la pagina.

window.onload = pintar