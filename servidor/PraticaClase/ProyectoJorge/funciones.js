import { Comic } from 'comic.js';
let comics = [];
let filTitulo = "";
let filAutor = "";
let filLocalizacion = "";
let filEstado = "";
let filPrestado = "";
let titulo;
let autor;
let estado;
let localizacion;
let prestado;
let sError = "";
export function anadir() {
    titulo = document.getElementById('titulo0');
    autor = document.getElementById('autor0');
    estado = document.getElementById('estado0');
    localizacion = document.getElementById('localizacion0');
    prestado = document.getElementById('prestado0');
    let ok = validarCampos();
    if (ok == true) {
        let id = generarIdComic(comics);

        let comic = new Comic();
        comic.id = id;
        comic.titulo = titulo.value;
        comic.autor = autor.value;
        comic.estado = estado.value;
        comic.localizacion = localizacion.value;
        comic.prestado = prestado.checked;

        comics.push(comic);
        listarComics();
    }
}

function validarCampos() {
    let bOk = true;
    sError = "";
    if (titulo == null || titulo.value == "") {
        sError += "título,";
        titulo.required = true;
        bOk = false;
    } else {
        titulo.required = false;
    }
    if (autor == null || autor.value == "") {
        sError += "autor,";
        autor.required = true;
        bOk = false;
    } else {
        autor.required = false;
    }

    if (estado == null || estado.value == "") {
        sError += "estado,";
        estado.required = true;
        bOk = false;
    } else {
        estado.required = false;
    }

    if (localizacion == null || localizacion.value == "") {
        sError += "localizacion,";
        localizacion.required = true;
        bOk = false;
    } else {
        localizacion.required = false;
    }

    if (bOk == false) {
        sError = sError.substring(0, sError.length - 1);
        alert('No has rellenado los siguientes campos obligatorios ' + sError);
    }
    return bOk;
}

export function modificar(id) {
    titulo = document.getElementById('titulo' + id);
    autor = document.getElementById('autor' + id);
    estado = document.getElementById('estado' + id);
    localizacion = document.getElementById('localizacion' + id);
    prestado = document.getElementById('prestado' + id);
    let ok = validarCampos();
    if (ok == true) {
        for (let comic of comics) {
            if (comic.id === parseInt(id)) {
                comic.titulo = titulo.value;
                comic.autor = autor.value;
                comic.estado = estado.value;
                comic.localizacion = localizacion.value;
                comic.prestado = prestado.checked;
            }
        }
        listarComics();
    }
}

export function eliminar(id) {
    if (confirm("Va a eliminar el comic. ¿Desea continuar?")) {
        comics = comics.filter(x => x.id != id);
    }

    listarComics();
}

// Función para obtener el elemento máximo según una propiedad
export function obtenerElementoMaximo(propiedad) {
    if (!comics || comics.length === 0) {
        return 0;
    }

    // Usamos reduce para encontrar el objeto con el valor máximo de la propiedad
    const maximo = comics.reduce((a, b) => {
        if (!a) return b;
        return (b.id > a.id) ? b : a;
    }, 0);

    return maximo.id;
}

// Función para generar un ID de tarea libre
export function generarIdComic(comics) {
    let id = 0;

    // Obtengo el máximo ID actual
    const maximo = obtenerElementoMaximo(comics, 'id') || 0;
    // Recorro desde 1 hasta el máximo para encontrar el primer ID libre
    for (let i = 1; i <= maximo; i++) {
        const existe = comics.find(comic => comic.id === i);
        if (!existe) {
            id = i;
            break;
        }
    }

    // Si no encontramos ningún ID libre, el siguiente es maximo + 1
    if (id === 0) {
        id = maximo + 1;
    }

    return id;
}

export function listarComics() {
    let sHTML = '';

    let filComics = [...comics];
    //let filComics = comics;

    let listado = document.getElementById('listado');

    if (filTitulo != null && filTitulo != '') {
        filComics = filComics.filter(x => x.titulo.toUpperCase().indexOf(filTitulo.toUpperCase()) > -1);
    }

    if (filAutor != null && filAutor != '') {
        filComics = filComics.filter(x => x.autor.toUpperCase().indexOf(filAutor.toUpperCase()) > -1);
    }

    if (filLocalizacion != null && filLocalizacion != '') {
        filComics = filComics.filter(x => x.localizacion.toUpperCase().indexOf(filLocalizacion.toUpperCase()) > -1);
    }

    if (filEstado != null && filEstado != '') {
        filComics = filComics.filter(x => x.estado.toUpperCase().indexOf(filEstado.toUpperCase()) > -1);
    }

    if (filPrestado != null && filPrestado != '') {
        filComics = filComics.filter(x => x.prestado == filPrestado);
    }

    for (let comic of filComics) {
        sHTML += `<div class="fila">
                    <div><input type="text"
                            id="titulo${comic.id}"
                            value="${comic.titulo}" required />
                    </div>
                    <div><input type="text"
                            id="autor${comic.id}"
                            value="${comic.autor}" required />
                    </div>
                    <div> <select id="estado${comic.id}"
                            name="estado${comic.id}" required>
                            <option value=""></option>
                            <option value="pendiente de leer" ${comic.estado === 'pendiente de leer' ? 'selected' : ''}>pendiente
                                de leer
                            </option>
                            <option value="leyendo" ${comic.estado === 'leyendo' ? 'selected' : ''}>leyendo
                            </option>
                            <option value="leido" ${comic.estado === 'leido' ? 'selected' : ''}>leído
                            </option>
                        </select>
                    </div>
                    <div><input type="checkbox"
                            id="prestado${comic.id}"
                            ${comic.prestado === true ? 'checked' : ''}/>
                    </div>
                    <div>
                        <select id="localizacion${comic.id}"
                            name="localizacion${comic.id}"
                            required>
                            <option value=""></option>
                            <option value="Estanteria1" ${comic.localizacion === 'Estanteria1' ? 'selected' : ''}>Estantería
                                1</option>
                            <option value="Estanteria2" ${comic.localizacion === 'Estanteria2' ? 'selected' : ''}>Estantería
                                2</option>
                            <option value="Estanteria3" ${comic.localizacion === 'Estanteria3' ? 'selected' : ''}>Estantería
                                3</option>
                        </select>
                    </div>
                    <div>
                        <input type="button" id="btnAnadir" onclick="anadirFila();" value="NUEVO" />
                        <input type="button" id="btnAnadir"
                            onclick="modificar('${comic.id}');"
                            value="MOD" />
                        <input type="button" id="btnAnadir"
                            onclick="eliminar('${comic.id}');"
                            value="DEL" />
                    </div>
                </div>`
    }

    listado.innerHTML = sHTML;

}

export function filtrar() {

    filTitulo = document.getElementById('filTitulo').value;
    filAutor = document.getElementById('filAutor').value;
    filEstado = document.getElementById('filEstado').value;
    filLocalizacion = document.getElementById('filLocalizacion').value;
    filPrestado = document.getElementById('filPrestado').checked;

    listarComics();
}


export function anadirFila() {
    let listado = document.getElementById('listado');

    let lhtml = listado.innerHTML;

    let fila = `<div class="fila" id="filNue"><div><input type="text"
                            id="titulo0"
                            value="" required/>
                    </div>
                    <div><input type="text"
                            id="autor0"
                            value="" required />
                    </div>
                    <div><select id="estado0" name="estado0" required>
                        <option value=""></option>
                        <option value="pendiente de leer">pendiente de leer</option>
                        <option value="leyendo">leyendo</option>
                        <option value="leido">leído</option>
                    </select>
                    </div>
                    <div><input type="checkbox" id="prestado0" />
                    </div>
                    <div>
                    <select id="localizacion0"
                        name="localizacion0" required>
                        <option value=""></option>
                        <option value="Estanteria1">Estantería
                            1
                        </option>
                        <option value="Estanteria2">Estantería
                            2</option>
                        <option value="Estanteria3">Estantería
                            3
                        </option>
                    </select>
                </div>
                    <div>
                        <input type="button" id="btnAnadir" onclick="anadir();" value="ADD" />
                        <input type="button" id="btnCancel" onclick="cancelar();" value="CANCEL" />
                        
                    </div></div>`
    listado.innerHTML = lhtml + fila;
}


export function cancelar() {
    const elemento = document.getElementById("filNue");
    elemento.remove(); // elimina el elemento del DOM
}

window.anadir = anadir;
window.anadirFila = anadirFila;
window.modificar = modificar;
window.eliminar = eliminar;
window.listarComics = listarComics;
window.filtrar = filtrar;
window.cancelar = cancelar;

