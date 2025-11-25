// ========================================
// funciones2.js - TABLA (listado.html)
// ========================================

// FUNCIÓN DE PINTADO (recibe datos como parámetro)
function pintarTablaPersonajes(personajes) {
    let divContenido = document.getElementById('contenido');
    let table = document.createElement('table');
    table.classList.add('tabla');

    // Crear encabezados
    let tr_th = document.createElement('tr');
    for (let prop in personajes[0]) {
        if (prop != 'description') {
            let th = document.createElement('th');
            th.innerText = prop;
            tr_th.appendChild(th);
        }
    }
    table.appendChild(tr_th);

    // Crear filas de datos
    for (let res of personajes) {
        let tr_td = document.createElement('tr');

        for (let dat in res) {
            if (dat != 'description') {
                let td = document.createElement('td');

                if (dat == 'name') {
                    td.innerText = res[dat];
                    td.style.cursor = 'pointer';
                    td.style.color = '#0000FF';

                    //  Al hacer click: guarda en localStorage y navega
                    td.onclick = function () {
                        localStorage.clear();
                        localStorage.setItem('personaje', JSON.stringify(res));
                        window.location.href = '../Personajes/personaje.html'; 
                    };
                } else {
                    td.innerText = res[dat];
                }

                tr_td.appendChild(td);
            }
        }
        table.appendChild(tr_td);
    }

    divContenido.appendChild(table);
}

// FUNCIÓN PRINCIPAL (obtiene datos y llama a pintar)
async function inicializarTabla() {
    let personajes = await obtenerDatosDragonBall();
    pintarTablaPersonajes(personajes);
}

inicializarTabla();