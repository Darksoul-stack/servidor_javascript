// ========================================
// funciones2.js - TABLA (listado.html)
// ========================================


// FUNCIÓN 1: pintarTablaPersonajes(personajes)
// ---------------------------------------------
// ¿Qué hace?
// - Recibe un ARRAY de personajes como parámetro
// - Crea dinámicamente una TABLA HTML con todos los personajes
// - Excluye la columna 'description' (no la muestra)
// - Al hacer click en el NOMBRE: guarda el personaje y navega a su página de detalle
//
// PARÁMETRO:
// - personajes → Array con los datos de todos los personajes

function pintarTablaPersonajes(personajes) {
    
    // PASO 1: Obtener el contenedor principal y crear la tabla
    // ---------------------------------------------------------
    // document.getElementById('contenido') → Busca el elemento con id="contenido"
    // document.createElement('table') → Crea un elemento <table> nuevo
    // classList.add('tabla') → Le añade la clase CSS "tabla"
    
    let divContenido = document.getElementById('contenido');
    let table = document.createElement('table');
    table.classList.add('tabla');


    // PASO 2: CREAR ENCABEZADOS (th) de la tabla
    // -------------------------------------------
    // tr_th → Fila que contendrá los encabezados
    // for...in → Recorre todas las PROPIEDADES del primer personaje (personajes[0])
    // prop → Variable que representa cada propiedad (ej: "name", "id", "image", etc.)
    
    let tr_th = document.createElement('tr');  // Crea la fila <tr> para encabezados
    
    for (let prop in personajes[0]) {
        
        // EXCLUIR la propiedad 'description'
        // -----------------------------------
        // Si la propiedad NO es 'description' → la mostramos
        // Esto es para no incluir la descripción en la tabla
        
        if (prop != 'description') {
            
            // CREAR cada encabezado <th>
            // --------------------------
            // th.innerText = prop → El texto del encabezado es el nombre de la propiedad
            // Ejemplo: si prop = "name" → <th>name</th>
            
            let th = document.createElement('th');
            th.innerText = prop;
            tr_th.appendChild(th);  // Añade el <th> a la fila de encabezados
        }
    }
    
    table.appendChild(tr_th);  // Añade la fila de encabezados a la tabla


    // PASO 3: CREAR FILAS DE DATOS (td) de la tabla
    // ----------------------------------------------
    // for...of → Recorre el array de personajes uno por uno
    // res → Variable que representa cada personaje en cada iteración
    
    for (let res of personajes) {
        
        // Crear una FILA nueva para cada personaje
        let tr_td = document.createElement('tr');


        // Recorrer todas las PROPIEDADES del personaje actual
        // ----------------------------------------------------
        // for...in → Recorre todas las propiedades del objeto res
        // dat → Variable que representa cada propiedad (ej: "name", "id", "image")
        
        for (let dat in res) {
            
            // EXCLUIR la propiedad 'description'
            if (dat != 'description') {
                
                // CREAR cada celda <td>
                let td = document.createElement('td');


                // CASO ESPECIAL: Si la propiedad es 'name' (el nombre)
                // -----------------------------------------------------
                // Le damos un tratamiento especial al nombre:
                // 1. Cambiamos el cursor a "pointer" (manita)
                // 2. Cambiamos el color a azul (#0000FF)
                // 3. Le añadimos un evento click
                
                if (dat == 'name') {
                    td.innerText = res[dat];  // Establece el texto de la celda
                    td.style.cursor = 'pointer';  // Cursor de manita al pasar el mouse
                    td.style.color = '#0000FF';   // Color azul


                    // EVENTO CLICK en el nombre
                    // --------------------------
                    // onclick → Se ejecuta cuando haces click en el nombre
                    // ¿Qué hace al hacer click?:
                    // 1. localStorage.clear() → BORRA TODO lo que había en localStorage
                    // 2. localStorage.setItem('personaje', JSON.stringify(res)) → 
                    //    GUARDA el personaje actual (convertido a texto) con la clave 'personaje'
                    // 3. window.location.href → NAVEGA a la página de detalle del personaje
                    //    NOTA: '../' indica que sube un nivel en la carpeta (porque estamos en listado.html)
                    
                    td.onclick = function () {
                        localStorage.clear();  // Limpia localStorage
                        localStorage.setItem('personaje', JSON.stringify(res));  // Guarda el personaje
                        window.location.href = '../Personajes/personaje.html';  // Navega (sube un nivel)
                    };
                    
                } else {
                    // CASO NORMAL: Para el resto de propiedades (id, image, etc.)
                    // ------------------------------------------------------------
                    // Solo mostramos el valor, sin estilos ni eventos
                    // res[dat] → Accede al valor de esa propiedad
                    // Ejemplo: si dat = "id" y res.id = 5 → td.innerText = 5
                    
                    td.innerText = res[dat];
                }


                // AÑADIR la celda <td> a la fila
                tr_td.appendChild(td);
            }
        }
        
        // AÑADIR la fila completa a la tabla
        table.appendChild(tr_td);
    }


    // PASO 4: Añadir la tabla completa al contenedor principal
    // ---------------------------------------------------------
    divContenido.appendChild(table);
}


// FUNCIÓN 2: inicializarTabla()
// ------------------------------
// ¿Qué hace?
// - Es la función PRINCIPAL que inicia todo el proceso
// - Es ASÍNCRONA porque necesita esperar los datos de la API
// - Obtiene los personajes de Dragon Ball
// - Llama a la función pintarTablaPersonajes para mostrarlos en una tabla
//
// RESUMEN: Coordina la obtención de datos y el pintado de la tabla

async function inicializarTabla() {
    
    // PASO 1: Obtener los personajes de la API
    // -----------------------------------------
    // await → Espera a que se obtengan los datos antes de continuar
    // obtenerDatosDragonBall() → Función que definiste antes (hace la llamada a la API)
    // Guarda el array de personajes en la variable personajes
    
    let personajes = await obtenerDatosDragonBall();
    
    
    // PASO 2: Pintar la tabla en el HTML
    // -----------------------------------
    // Llama a pintarTablaPersonajes pasándole el array de personajes
    
    pintarTablaPersonajes(personajes);
}


// EJECUTAR la función principal al cargar el archivo
// ---------------------------------------------------
// Esto inicia todo el proceso automáticamente
inicializarTabla();


//===================================
// CONCEPTOS CLAVE:
//===================================
// - document.getElementById() → Busca un elemento HTML por su id
// - document.createElement() → Crea un nuevo elemento HTML
// - classList.add() → Añade una clase CSS a un elemento
// - appendChild() → Añade un elemento hijo dentro de otro
// - innerText → Establece el texto de un elemento
// - for...in → Recorre las PROPIEDADES de un objeto
// - for...of → Recorre los ELEMENTOS de un array
// - res[dat] → Acceso dinámico a propiedades (notación de corchetes)
// - style.cursor → Cambia el estilo del cursor
// - style.color → Cambia el color del texto
// - onclick → Evento que se ejecuta al hacer click
// - localStorage.clear() → Borra TODO el localStorage
// - localStorage.setItem() → Guarda un dato en localStorage
// - window.location.href → Cambia la URL del navegador (navega a otra página)
// - '../' → Ruta relativa que sube un nivel de carpeta
// - async/await → Para esperar datos asíncronos


//===================================
// DIFERENCIAS ENTRE for...in y for...of:
//===================================
// for...in → Recorre PROPIEDADES de un objeto
//            Ejemplo: for (let prop in {name: "Goku", id: 1}) → prop = "name", "id"
//
// for...of → Recorre ELEMENTOS de un array
//            Ejemplo: for (let item of [1, 2, 3]) → item = 1, 2, 3


//===================================
// FLUJO COMPLETO DEL PROGRAMA:
//===================================
// 1. Se ejecuta inicializarTabla()
// 2. Se obtienen los personajes de la API (await obtenerDatosDragonBall())
// 3. Se llama a pintarTablaPersonajes(personajes)
// 4. Se crea una tabla vacía
// 5. Se crean los encabezados (th) recorriendo las propiedades del primer personaje
// 6. Se crean las filas (tr) y celdas (td) recorriendo todos los personajes
// 7. Se excluye la columna 'description'
// 8. El nombre se marca en azul con cursor pointer y evento click
// 9. Se añade la tabla completa al div con id="contenido"
// 10. Resultado: Tabla con todos los personajes visible en el navegador
// 11. Al hacer click en un nombre: guarda el personaje y navega a su detalle