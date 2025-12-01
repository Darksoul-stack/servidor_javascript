// ========================================
// funciones1.js - GRID DE PERSONAJES (index.html)
// ========================================


// FUNCIÓN 1: pintarGridPersonajes(personajes)
// --------------------------------------------
// ¿Qué hace?
// - Recibe un ARRAY de personajes como parámetro
// - Crea dinámicamente las tarjetas HTML para cada personaje
// - Muestra imagen, nombre y descripción de cada personaje
// - Al hacer click en la imagen: guarda el personaje y navega a su página de detalle
//
// PARÁMETRO:
// - personajes → Array con los datos de todos los personajes

function pintarGridPersonajes(personajes) {
    
    // PASO 1: Obtener el contenedor principal del HTML
    // -------------------------------------------------
    // document.getElementById('contenido') → Busca el elemento con id="contenido"
    // Este div es donde se van a crear todas las tarjetas de personajes
    
    let divContenido = document.getElementById('contenido');


    // PASO 2: Recorrer cada personaje del array
    // ------------------------------------------
    // for...of → Recorre el array personajes uno por uno
    // res → Variable que representa cada personaje en cada iteración
    
    for (let res of personajes) {
        
        // EXTRAER los datos de cada personaje
        let nomPersonaje = res.name;           // Nombre del personaje
        let desPersonaje = res.description;    // Descripción del personaje
        let imgPersonaje = res.image;          // URL de la imagen del personaje


        // VALIDACIÓN: Verificar que la imagen existe
        // -------------------------------------------
        // Si imgPersonaje NO es null Y NO es undefined → entonces sí tiene imagen
        // Solo pintamos personajes que tengan imagen
        
        if (imgPersonaje != null && imgPersonaje != undefined) {
            
            // CREAR el contenedor DIV para cada tarjeta
            // ------------------------------------------
            // document.createElement('div') → Crea un elemento <div> nuevo
            // classList.add('ancho200') → Le añade la clase CSS "ancho200"
            
            let divImg = document.createElement('div');
            divImg.classList.add('ancho200');


            // CREAR la etiqueta IMG (imagen)
            // -------------------------------
            // Crea un elemento <img>
            // src → Establece la URL de la imagen
            // alt → Texto alternativo (accesibilidad)
            // title → Tooltip que aparece al pasar el mouse
            
            let img = document.createElement('img');
            img.src = imgPersonaje;
            img.alt = nomPersonaje;
            img.title = nomPersonaje;


            // EVENTO CLICK en la imagen
            // --------------------------
            // onclick → Se ejecuta cuando haces click en la imagen
            // ¿Qué hace al hacer click?:
            // 1. localStorage.clear() → BORRA TODO lo que había en localStorage
            // 2. localStorage.setItem('personaje', JSON.stringify(res)) → 
            //    GUARDA el personaje actual (convertido a texto) con la clave 'personaje'
            // 3. window.location.href → NAVEGA a la página de detalle del personaje
            //    (Cambia la URL del navegador a 'Personajes/personaje.html')
            
            img.onclick = function () {
                localStorage.clear();  // Limpia localStorage
                localStorage.setItem('personaje', JSON.stringify(res));  // Guarda el personaje
                window.location.href = 'Personajes/personaje.html';  // Navega a la página de detalle
            };


            // AÑADIR la imagen al contenedor divImg
            // --------------------------------------
            // appendChild() → Añade un elemento hijo dentro de otro elemento
            // Ahora divImg contiene: <div class="ancho200"><img></div>
            
            divImg.appendChild(img);


            // CREAR el título H1 (nombre del personaje)
            // ------------------------------------------
            // Crea un elemento <h1>
            // innerText → Establece el texto dentro del h1
            
            let h1 = document.createElement('h1');
            h1.innerText = nomPersonaje;
            divImg.appendChild(h1);  // Lo añade a divImg


            // CREAR el párrafo P (descripción del personaje)
            // -----------------------------------------------
            // Crea un elemento <p>
            // innerText → Establece el texto dentro del párrafo
            
            let p = document.createElement('p');
            p.innerText = desPersonaje;
            divImg.appendChild(p);  // Lo añade a divImg


            // AÑADIR toda la tarjeta al contenedor principal
            // ------------------------------------------------
            // Ahora divImg contiene: <div><img><h1><p></div>
            // appendChild() → Añade esta tarjeta completa al div con id="contenido"
            
            divContenido.appendChild(divImg);
        }
    }
}


// FUNCIÓN 2: inicializarGrid()
// -----------------------------
// ¿Qué hace?
// - Es la función PRINCIPAL que inicia todo el proceso
// - Es ASÍNCRONA porque necesita esperar los datos de la API
// - Obtiene los personajes de Dragon Ball
// - Llama a la función pintarGridPersonajes para mostrarlos
//
// RESUMEN: Coordina la obtención de datos y el pintado en pantalla

async function inicializarGrid() {
    
    // PASO 1: Obtener los personajes de la API
    // -----------------------------------------
    // await → Espera a que se obtengan los datos antes de continuar
    // obtenerDatosDragonBall() → Función que definiste antes (hace la llamada a la API)
    // Guarda el array de personajes en la variable personajes
    
    let personajes = await obtenerDatosDragonBall();
    
    
    // PASO 2: Pintar los personajes en el HTML
    // -----------------------------------------
    // Llama a pintarGridPersonajes pasándole el array de personajes
    
    pintarGridPersonajes(personajes);
}


// EJECUTAR la función principal al cargar el archivo
// ---------------------------------------------------
// Esto inicia todo el proceso automáticamente
inicializarGrid();


//===================================
// CONCEPTOS CLAVE:
//===================================
// - document.getElementById() → Busca un elemento HTML por su id
// - document.createElement() → Crea un nuevo elemento HTML
// - classList.add() → Añade una clase CSS a un elemento
// - appendChild() → Añade un elemento hijo dentro de otro
// - innerText → Establece el texto de un elemento
// - src, alt, title → Atributos de la etiqueta <img>
// - onclick → Evento que se ejecuta al hacer click
// - localStorage.clear() → Borra TODO el localStorage
// - localStorage.setItem() → Guarda un dato en localStorage
// - window.location.href → Cambia la URL del navegador (navega a otra página)
// - async/await → Para esperar datos asíncronos
// - for...of → Recorre arrays
// - Validación con if → Comprueba condiciones antes de ejecutar código


//===================================
// FLUJO COMPLETO DEL PROGRAMA:
//===================================
// 1. Se ejecuta inicializarGrid()
// 2. Se obtienen los personajes de la API (await obtenerDatosDragonBall())
// 3. Se llama a pintarGridPersonajes(personajes)
// 4. Se recorre cada personaje del array
// 5. Para cada personaje se crea: div > img + h1 + p
// 6. Se añaden todas las tarjetas al div con id="contenido"
// 7. Resultado: Grid de personajes visible en el navegador
// 8. Al hacer click en una imagen: guarda el personaje y navega a su detalle