// ========================================
// funciones3.js - FICHA INDIVIDUAL (personaje.html)
// ========================================


// FUNCIÓN 1: pintarFichaPersonaje(personaje)
// -------------------------------------------
// ¿Qué hace?
// - Recibe UN SOLO personaje como parámetro (no un array)
// - Crea dinámicamente la ficha HTML del personaje seleccionado
// - Muestra imagen, nombre y descripción del personaje
// - Esta función es para mostrar el DETALLE completo de un personaje
//
// PARÁMETRO:
// - personaje → Objeto con los datos de UN personaje específico

function pintarFichaPersonaje(personaje) {
    
    // PASO 1: Obtener el contenedor principal del HTML
    // -------------------------------------------------
    // document.getElementById('contenido') → Busca el elemento con id="contenido"
    // Este div es donde se va a crear la ficha del personaje
    
    let divContenido = document.getElementById('contenido');


    // PASO 2: EXTRAER los datos del personaje
    // ----------------------------------------
    // Como solo tenemos UN personaje (no un array), accedemos directamente a sus propiedades
    
    let nomPersonaje = personaje.name;           // Nombre del personaje
    let desPersonaje = personaje.description;    // Descripción del personaje
    let imgPersonaje = personaje.image;          // URL de la imagen del personaje


    // PASO 3: VALIDACIÓN - Verificar que la imagen existe
    // ----------------------------------------------------
    // Si imgPersonaje NO es null Y NO es undefined → entonces sí tiene imagen
    // Solo pintamos la ficha si el personaje tiene imagen
    
    if (imgPersonaje != null && imgPersonaje != undefined) {
        
        // CREAR el contenedor DIV para la ficha
        // --------------------------------------
        // document.createElement('div') → Crea un elemento <div> nuevo
        // classList.add('ancho100p') → Le añade la clase CSS "ancho100p"
        // (Esta clase probablemente hace que ocupe el 100% del ancho)
        
        let divImg = document.createElement('div');
        divImg.classList.add('ancho100p');


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


        // AÑADIR la imagen al contenedor divImg
        // --------------------------------------
        // appendChild() → Añade la imagen dentro del div
        // Ahora divImg contiene: <div class="ancho100p"><img></div>
        
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


        // AÑADIR toda la ficha al contenedor principal
        // ---------------------------------------------
        // Ahora divImg contiene: <div><img><h1><p></div>
        // appendChild() → Añade esta ficha completa al div con id="contenido"
        
        divContenido.appendChild(divImg);
    }
}


// FUNCIÓN 2: inicializarFicha()
// ------------------------------
// ¿Qué hace?
// - Es la función PRINCIPAL que inicia todo el proceso
// - Es SÍNCRONA (no usa async/await) porque solo lee de localStorage
// - Obtiene el personaje guardado en localStorage
// - Verifica que existe un personaje guardado
// - Si NO hay personaje → muestra un mensaje de error
// - Si SÍ hay personaje → llama a la función pintarFichaPersonaje
//
// RESUMEN: Coordina la obtención del personaje y el pintado de su ficha

function inicializarFicha() {
    
    // PASO 1: Obtener el personaje guardado en localStorage
    // ------------------------------------------------------
    // obtenerPersonajeGuardado() → Función que definiste antes
    // Recupera el personaje que se guardó al hacer click en el grid o tabla
    // Si no hay nada guardado → devuelve null
    
    let personaje = obtenerPersonajeGuardado();
    
    
    // PASO 2: VALIDACIÓN - Verificar que existe un personaje
    // -------------------------------------------------------
    // if (!personaje) → Si personaje es null, undefined, o falsy
    // Esto sucede cuando el usuario accede directamente a personaje.html sin haber hecho click
    
    if (!personaje) {
        
        // MOSTRAR MENSAJE DE ERROR
        // ------------------------
        // document.getElementById('contenido').innerHTML → Reemplaza TODO el contenido del div
        // Inserta un mensaje HTML indicando que no hay personaje seleccionado
        // style="text-align:center; padding:50px;" → Estilos inline para centrar el mensaje
        
        document.getElementById('contenido').innerHTML = 
            '<p style="text-align:center; padding:50px;"> No se ha seleccionado ningún personaje.</p>';
        
        
        // SALIR DE LA FUNCIÓN
        // -------------------
        // return → Detiene la ejecución de la función aquí
        // No continúa ejecutando el código que viene después
        
        return;
    }
    
    
    // PASO 3: Pintar la ficha del personaje
    // --------------------------------------
    // Solo llega aquí si personaje NO es null (existe)
    // Llama a pintarFichaPersonaje pasándole el objeto personaje
    
    pintarFichaPersonaje(personaje);
}


// EJECUTAR la función principal al cargar el archivo
// ---------------------------------------------------
// Esto inicia todo el proceso automáticamente cuando se carga personaje.html
inicializarFicha();


//===================================
// CONCEPTOS CLAVE:
//===================================
// - document.getElementById() → Busca un elemento HTML por su id
// - document.createElement() → Crea un nuevo elemento HTML
// - classList.add() → Añade una clase CSS a un elemento
// - appendChild() → Añade un elemento hijo dentro de otro
// - innerText → Establece el texto de un elemento
// - innerHTML → Reemplaza TODO el contenido HTML de un elemento
// - src, alt, title → Atributos de la etiqueta <img>
// - Validación con if (!variable) → Comprueba si algo NO existe o es null/undefined
// - return → Sale de la función inmediatamente
// - Estilos inline con style="" → Aplica CSS directamente en el HTML


//===================================
// DIFERENCIAS CON funciones1.js y funciones2.js:
//===================================
// funciones1.js → Muestra un GRID de TODOS los personajes
// funciones2.js → Muestra una TABLA de TODOS los personajes
// funciones3.js → Muestra la FICHA de UN SOLO personaje (el que se guardó en localStorage)


//===================================
// FLUJO COMPLETO DEL PROGRAMA:
//===================================
// 1. Se ejecuta inicializarFicha()
// 2. Se intenta obtener el personaje de localStorage (obtenerPersonajeGuardado())
// 3a. Si NO hay personaje guardado:
//     - Muestra mensaje de error: "No se ha seleccionado ningún personaje"
//     - Termina la ejecución (return)
// 3b. Si SÍ hay personaje guardado:
//     - Continúa con el paso 4
// 4. Se llama a pintarFichaPersonaje(personaje)
// 5. Se extraen los datos del personaje (nombre, descripción, imagen)
// 6. Se valida que tenga imagen
// 7. Se crea: div > img + h1 + p
// 8. Se añade la ficha completa al div con id="contenido"
// 9. Resultado: Ficha del personaje visible en el navegador


//===================================
// CÓMO LLEGÓ EL PERSONAJE AQUÍ:
//===================================
// 1. Usuario está en index.html (grid) o listado.html (tabla)
// 2. Usuario hace click en una imagen o nombre
// 3. Se ejecuta el evento onclick
// 4. Se guarda el personaje en localStorage con la clave 'personaje'
// 5. Se navega a personaje.html
// 6. personaje.html carga funciones3.js
// 7. funciones3.js lee el personaje de localStorage
// 8. funciones3.js pinta la ficha del personaje