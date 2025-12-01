// ========================================
// FICHA INDIVIDUAL - HARRY POTTER
// ========================================


// FUNCIÓN 1: pintarFichaPersonaje(personaje)
// -------------------------------------------
// ¿Qué hace?
// - Recibe UN SOLO personaje de Harry Potter como parámetro (no un array)
// - Crea dinámicamente la ficha HTML del personaje seleccionado
// - Muestra: imagen, nombre, nombres alternativos, año, especie, casa y patronus
// - Tiene sistema de IMAGEN POR DEFECTO (fallback) si la imagen no carga
// - Esta función es para mostrar el DETALLE completo de un personaje
//
// PARÁMETRO:
// - personaje → Objeto con los datos de UN personaje específico de Harry Potter

function pintarFichaPersonaje(personaje) {
    
    // PASO 1: Obtener el contenedor principal del HTML
    // -------------------------------------------------
    // document.getElementById('contenido-personaje') → Busca el elemento con id="contenido-personaje"
    // Este div es donde se va a crear la ficha del personaje
    
    let divContenido = document.getElementById('contenido-personaje');


    // PASO 2: EXTRAER los datos del personaje
    // ----------------------------------------
    // Como solo tenemos UN personaje (no un array), accedemos directamente a sus propiedades
    
    let nomPersonaje = personaje.name;  // Nombre del personaje
    
    
    // NOMBRES ALTERNATIVOS con Optional Chaining y OR
    // ------------------------------------------------
    // personaje.alternate_names?.join(", ") → 
    // - ?. (Optional Chaining): Si alternate_names existe y es un array, ejecuta join(", ")
    // - join(", "): Une todos los nombres del array separados por comas
    // - Si alternate_names es null/undefined → devuelve undefined (no da error)
    // - || "Sin nombres alternativos": Si el resultado es undefined/vacío, usa este texto
    //
    // Ejemplo: ["Harry", "The Boy Who Lived"] → "Harry, The Boy Who Lived"
    
    let altNombre = personaje.alternate_names?.join(", ") || "Sin nombres alternativos";
    
    
    let imgPersonaje = personaje.image;  // URL de la imagen


    // VALORES CON OPERADOR OR (||) - Valores por defecto
    // ---------------------------------------------------
    // || → Si el valor de la izquierda es falsy (null, undefined, "", 0, false) 
    //      usa el valor de la derecha
    //
    // IMPORTANTE: Aquí usamos || en lugar de ?? porque queremos que "" (string vacío)
    //            también use el valor por defecto
    
    let ayoNacimiento = personaje.yearOfBirth || "Año desconocido";
    let especie = personaje.species || "Desconocida";
    let casa = personaje.house || "Sin casa";
    let patronus = personaje.patronus || "Desconocido";


    // SISTEMA DE IMAGEN POR DEFECTO (FALLBACK)
    // -----------------------------------------
    // fallback → Ruta de la imagen que se mostrará si la original no carga
    // "../assets/imagen_personaje_harrypotter.png" → Imagen por defecto
    // NOTA: "../" significa "subir un nivel de carpeta" 
    //       (porque estamos en Personajes/personaje.html)
    
    const fallback = "../assets/imagen_personaje_harrypotter.png";


    // COMPROBACIÓN INICIAL: Verificar si la URL de la imagen existe
    // --------------------------------------------------------------
    // !imgPersonaje → Si imgPersonaje es null, undefined, o vacío
    // imgPersonaje.trim() === "" → Si después de quitar espacios está vacío
    // Si NO hay imagen válida → usa la imagen por defecto
    
    if (!imgPersonaje || imgPersonaje.trim() === "") {
        imgPersonaje = fallback;
    }


    // CREAR el contenedor DIV para la ficha
    // --------------------------------------
    // document.createElement('div') → Crea un elemento <div> nuevo
    // classList.add('ancho100p') → Le añade la clase CSS "ancho100p"
    // (Esta clase probablemente hace que ocupe el 100% del ancho)
    
    let divImg = document.createElement('div');
    divImg.classList.add('ancho100p');


    // CREAR la etiqueta IMG (imagen)
    // -------------------------------
    let img = document.createElement('img');
    img.src = imgPersonaje;      // URL de la imagen (original o fallback)
    img.alt = nomPersonaje;      // Texto alternativo (accesibilidad)
    img.title = nomPersonaje;    // Tooltip que aparece al pasar el mouse


    // EVENTO ONERROR: FALLBACK QUE SIEMPRE FUNCIONA
    // ----------------------------------------------
    // ¿Qué hace?
    // - onerror → Se ejecuta cuando la imagen NO se puede cargar (error 404, URL inválida, etc.)
    // - if (img.src !== fallback) → Verifica que no esté ya usando la imagen por defecto
    //   (para evitar un bucle infinito si el fallback también falla)
    // - img.src = fallback → Cambia a la imagen por defecto
    //
    // IMPORTANTE: Este es el SEGUNDO nivel de protección
    // 1er nivel: La comprobación inicial (if (!imgPersonaje...))
    // 2do nivel: onerror (si la URL existe pero la imagen no carga)
    
    img.onerror = function () {
        if (img.src !== fallback) {
            img.src = fallback;
        }
    };


    // AÑADIR la imagen al contenedor divImg
    // --------------------------------------
    divImg.appendChild(img);


    // CREAR el título H1 (nombre del personaje)
    // ------------------------------------------
    let h1 = document.createElement('h1');
    h1.innerText = nomPersonaje;
    divImg.appendChild(h1);


    // CREAR el párrafo P con TODA la información del personaje
    // ---------------------------------------------------------
    // innerHTML → Permite insertar código HTML (etiquetas)
    // Template Literals (backticks ``) → Permiten escribir strings en múltiples líneas
    //                                     y usar ${variable} para insertar variables
    //
    // <strong> → Negrita
    // <br> → Salto de línea
    // ${variable} → Inserta el valor de la variable en el string
    //
    // ESTRUCTURA:
    // - Cada línea tiene: <strong>Etiqueta:</strong> valor <br>
    // - El <br> hace que cada dato aparezca en una línea nueva
    
    let p = document.createElement('p');
    p.innerHTML = `
        <strong>Nombres alternativos:</strong> ${altNombre}<br>
        <strong>Año de nacimiento:</strong> ${ayoNacimiento}<br>
        <strong>Especie:</strong> ${especie}<br>
        <strong>Casa:</strong> ${casa}<br>
        <strong>Patronus:</strong> ${patronus}
    `;
    divImg.appendChild(p);


    // AÑADIR toda la ficha al contenedor principal
    // ---------------------------------------------
    // Ahora divImg contiene: <div><img><h1><p></div>
    // appendChild() → Añade esta ficha completa al div con id="contenido-personaje"
    
    divContenido.appendChild(divImg);
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
    // Recupera el personaje que se guardó al hacer click en el grid
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
        // NOTA: Aquí usa 'contenido', no 'contenido-personaje'
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
// - innerHTML → Establece el contenido HTML de un elemento (permite etiquetas)
// - src, alt, title → Atributos de la etiqueta <img>
// - onerror → Evento que se ejecuta cuando una imagen NO carga
// - trim() → Elimina espacios en blanco al inicio y final de un string
// - join(", ") → Une elementos de un array en un string separados por comas
// - Operador ?. (Optional Chaining) → Accede a propiedades sin error si son null/undefined
// - Operador || (OR lógico) → Devuelve valor por defecto si el primero es falsy
// - Template Literals (``) → Strings con múltiples líneas y ${variables}
// - Validación con if (!variable) → Comprueba si algo NO existe o es null/undefined
// - return → Sale de la función inmediatamente
// - Estilos inline con style="" → Aplica CSS directamente en el HTML


//===================================
// DIFERENCIAS IMPORTANTES:
//===================================
// innerHTML vs innerText:
// - innerHTML → Interpreta el contenido como HTML (permite <strong>, <br>, etc.)
// - innerText → Muestra el contenido como texto plano (ignora etiquetas HTML)
//
// En este código:
// - h1.innerText → Solo texto simple
// - p.innerHTML → Necesitamos <strong> y <br>, por eso usamos innerHTML


//===================================
// TEMPLATE LITERALS (BACKTICKS):
//===================================
// Sintaxis: `texto ${variable} más texto`
//
// Ventajas:
// 1. Múltiples líneas sin necesidad de concatenar (+)
// 2. Insertar variables con ${variable}
// 3. Más legible y fácil de mantener
//
// Ejemplo sin template literals (forma antigua):
// p.innerHTML = "<strong>Nombre:</strong> " + nomPersonaje + "<br>" +
//               "<strong>Casa:</strong> " + casa + "<br>";
//
// Ejemplo con template literals (forma moderna):
// p.innerHTML = `
//     <strong>Nombre:</strong> ${nomPersonaje}<br>
//     <strong>Casa:</strong> ${casa}<br>
// `;


//===================================
// SISTEMA DE FALLBACK (IMAGEN POR DEFECTO):
//===================================
// Tiene DOS niveles de protección:
//
// 1er nivel (COMPROBACIÓN INICIAL):
// - if (!imgPersonaje || imgPersonaje.trim() === "")
// - Se ejecuta ANTES de asignar img.src
// - Previene que se intente cargar una URL vacía o inválida
//
// 2do nivel (EVENTO ONERROR):
// - img.onerror = function() {...}
// - Se ejecuta SI la imagen falla al cargar (404, URL rota, etc.)
// - Es el respaldo en caso de que la URL exista pero la imagen no cargue
//
// RESULTADO: Si CUALQUIER imagen falla, se muestra la imagen por defecto


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
// 5. Se extraen TODOS los datos del personaje (nombre, nombres alt., año, especie, casa, patronus)
// 6. Se aplican valores por defecto con || para datos que puedan estar vacíos
// 7. Se valida que tenga imagen (si no, usa fallback)
// 8. Se crea: div > img + h1 + p (con toda la info formateada)
// 9. Se configura el evento onerror como segundo nivel de protección
// 10. Se añade la ficha completa al div con id="contenido-personaje"
// 11. Resultado: Ficha completa del personaje visible en el navegador


//===================================
// CÓMO LLEGÓ EL PERSONAJE AQUÍ:
//===================================
// 1. Usuario está en index.html (grid de Harry Potter)
// 2. Usuario hace click en una imagen de un personaje
// 3. Se ejecuta el evento onclick
// 4. Se guarda el personaje en localStorage con la clave 'personaje'
// 5. Se navega a Personajes/personaje.html
// 6. personaje.html carga este archivo JavaScript
// 7. Este archivo lee el personaje de localStorage
// 8. Este archivo pinta la ficha completa del personaje