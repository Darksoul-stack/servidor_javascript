// ========================================
// GRID DE PERSONAJES - HARRY POTTER
// ========================================


// FUNCIÓN 1: pintarGridPersonajes(personajes)
// --------------------------------------------
// ¿Qué hace?
// - Recibe un ARRAY de personajes de Harry Potter como parámetro
// - Crea dinámicamente las tarjetas HTML para cada personaje
// - Muestra imagen, nombre, nombres alternativos y año de nacimiento
// - Tiene un sistema de IMAGEN POR DEFECTO (fallback) si la imagen no carga
// - Al hacer click en la imagen: guarda el personaje y navega a su página de detalle
//
// PARÁMETRO:
// - personajes → Array con los datos de todos los personajes de Harry Potter

function pintarGridPersonajes(personajes) {
    
    // PASO 1: Obtener el contenedor principal del HTML
    // -------------------------------------------------
    // document.getElementById('contenido-principal') → Busca el elemento con id="contenido-principal"
    // Este div es donde se van a crear todas las tarjetas de personajes
    
    let divContenido = document.getElementById('contenido-principal');


    // PASO 2: Recorrer cada personaje del array
    // ------------------------------------------
    // for...of → Recorre el array personajes uno por uno
    // res → Variable que representa cada personaje en cada iteración
    
    for (let res of personajes) {
        
        // EXTRAER los datos de cada personaje
        // ------------------------------------
        let nomPersonaje = res.name;              // Nombre del personaje
        let altNombre = res.alternate_names;      // Array de nombres alternativos
        let imgPersonaje = res.image;             // URL de la imagen del personaje
        let ayoNacimiento = res.yearOfBirth;      // Año de nacimiento del personaje


        // CREAR el contenedor DIV para cada tarjeta
        // ------------------------------------------
        // document.createElement('div') → Crea un elemento <div> nuevo
        // classList.add('ancho200') → Le añade la clase CSS "ancho200"
        
        let divImg = document.createElement('div');
        divImg.classList.add('ancho200');


        // CREAR la etiqueta IMG (imagen)
        // -------------------------------
        let img = document.createElement('img');


        // SISTEMA DE IMAGEN POR DEFECTO (FALLBACK)
        // -----------------------------------------
        // fallback → Ruta de la imagen que se mostrará si la original no carga
        // "./assets/imagen_personaje_harrypotter.png" → Imagen por defecto
        // NOTA: "./" significa "carpeta actual"
        
        const fallback = "./assets/imagen_personaje_harrypotter.png";


        // COMPROBACIÓN INICIAL: Verificar si la URL de la imagen existe
        // --------------------------------------------------------------
        // !imgPersonaje → Si imgPersonaje es null, undefined, o vacío
        // imgPersonaje.trim() === "" → Si después de quitar espacios está vacío
        // Si NO hay imagen válida → usa la imagen por defecto
        
        if (!imgPersonaje || imgPersonaje.trim() === "") {
            imgPersonaje = fallback;
        }


        // ESTABLECER la imagen
        // --------------------
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


        // EVENTO CLICK en la imagen
        // --------------------------
        // onclick → Se ejecuta cuando haces click en la imagen
        // ¿Qué hace al hacer click?:
        // 1. localStorage.clear() → BORRA TODO lo que había en localStorage
        // 2. localStorage.setItem('personaje', JSON.stringify(res)) → 
        //    GUARDA el personaje actual (convertido a texto) con la clave 'personaje'
        // 3. window.location.href → NAVEGA a la página de detalle del personaje
        
        img.onclick = function () {
            localStorage.clear();  // Limpia localStorage
            localStorage.setItem('personaje', JSON.stringify(res));  // Guarda el personaje
            window.location.href = 'Personajes/personaje.html';  // Navega a la página de detalle
        };


        // AÑADIR la imagen al contenedor divImg
        // --------------------------------------
        divImg.appendChild(img);


        // CREAR el título H1 (nombre del personaje)
        // ------------------------------------------
        let h1 = document.createElement('h1');
        h1.innerText = nomPersonaje;
        divImg.appendChild(h1);


        // CREAR el párrafo P (nombres alternativos)
        // ------------------------------------------
        // altNombre?.join(", ") → OPERADOR OPCIONAL CHAINING (?.)
        // ¿Qué hace?
        // - Si altNombre existe y es un array → join(", ") une todos los nombres con comas
        //   Ejemplo: ["Harry", "The Boy Who Lived"] → "Harry, The Boy Who Lived"
        // - Si altNombre es null o undefined → NO da error, simplemente devuelve undefined
        // - || "Sin nombres alternativos" → Si el resultado es undefined o vacío, muestra este texto
        //
        // RESUMEN: Muestra los nombres alternativos separados por comas, o un texto por defecto
        
        let p = document.createElement('p');
        p.innerText = altNombre?.join(", ") || "Sin nombres alternativos";
        divImg.appendChild(p);


        // CREAR el párrafo P2 (año de nacimiento)
        // ----------------------------------------
        // ayoNacimiento ?? "Año desconocido" → OPERADOR NULLISH COALESCING (??)
        // ¿Qué hace?
        // - Si ayoNacimiento tiene un valor (no es null ni undefined) → muestra ese valor
        // - Si ayoNacimiento es null o undefined → muestra "Año desconocido"
        //
        // DIFERENCIA con || :
        // - ?? solo considera null y undefined como "vacío"
        // - || considera null, undefined, 0, false, "" como "vacío"
        // - En este caso usamos ?? porque si el año es 0, queremos mostrarlo (no reemplazarlo)
        //
        // innerHTML vs innerText:
        // - innerHTML → Interpreta el contenido como HTML (permite etiquetas)
        // - innerText → Muestra el contenido como texto plano
        // Aquí usamos innerHTML aunque solo hay texto (ambos funcionarían igual)
        
        let p2 = document.createElement("p");
        p2.innerHTML = ayoNacimiento ?? "Año desconocido";
        divImg.appendChild(p2);


        // AÑADIR toda la tarjeta al contenedor principal
        // -----------------------------------------------
        divContenido.appendChild(divImg);
    }
}


// FUNCIÓN 2: inicializarGrid()
// -----------------------------
// ¿Qué hace?
// - Es la función PRINCIPAL que inicia todo el proceso
// - Es ASÍNCRONA porque necesita esperar los datos de la API
// - Obtiene los personajes de Harry Potter
// - Llama a la función pintarGridPersonajes para mostrarlos
//
// RESUMEN: Coordina la obtención de datos y el pintado en pantalla

async function inicializarGrid() {
    
    // PASO 1: Obtener los personajes de la API
    // -----------------------------------------
    // await → Espera a que se obtengan los datos antes de continuar
    // obtenerDatosHarryPotter() → Función que definiste antes (hace la llamada a la API)
    // Guarda el array de personajes en la variable personajes
    
    let personajes = await obtenerDatosHarryPotter();
    
    
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
// - innerHTML → Establece el contenido HTML de un elemento
// - src, alt, title → Atributos de la etiqueta <img>
// - onclick → Evento que se ejecuta al hacer click
// - onerror → Evento que se ejecuta cuando una imagen NO carga
// - trim() → Elimina espacios en blanco al inicio y final de un string
// - join(", ") → Une elementos de un array en un string separados por comas
// - Operador ?. (Optional Chaining) → Accede a propiedades sin error si son null/undefined
// - Operador ?? (Nullish Coalescing) → Devuelve valor por defecto solo si es null/undefined
// - localStorage.clear() → Borra TODO el localStorage
// - localStorage.setItem() → Guarda un dato en localStorage
// - window.location.href → Cambia la URL del navegador (navega a otra página)
// - async/await → Para esperar datos asíncronos
// - for...of → Recorre arrays


//===================================
// DIFERENCIAS IMPORTANTES:
//===================================
// Optional Chaining (?.) vs Nullish Coalescing (??)
//
// ?. (Optional Chaining):
// - Se usa para acceder a propiedades de objetos/arrays
// - Evita errores si la variable es null/undefined
// - Ejemplo: altNombre?.join(",") → Si altNombre es null, NO da error
//
// ?? (Nullish Coalescing):
// - Se usa para valores por defecto
// - Solo considera null y undefined como "vacío"
// - Ejemplo: ayoNacimiento ?? "Desconocido" → Si es null/undefined usa "Desconocido"
//
// || (OR lógico):
// - Similar a ?? pero considera CUALQUIER valor falsy (0, false, "", null, undefined)
// - Ejemplo: 0 || "Default" → Devuelve "Default" (porque 0 es falsy)
// - Ejemplo: 0 ?? "Default" → Devuelve 0 (porque 0 NO es null/undefined)


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
// 1. Se ejecuta inicializarGrid()
// 2. Se obtienen los personajes de la API (await obtenerDatosHarryPotter())
// 3. Se llama a pintarGridPersonajes(personajes)
// 4. Se recorre cada personaje del array
// 5. Para cada personaje se extrae: nombre, nombres alternativos, imagen, año
// 6. Se verifica que la imagen sea válida (si no, usa fallback)
// 7. Se crea: div > img + h1 + p (nombres alt.) + p2 (año)
// 8. Se configura el evento onerror como segundo nivel de protección
// 9. Se configura el evento onclick para navegar al detalle
// 10. Se añaden todas las tarjetas al div con id="contenido-principal"
// 11. Resultado: Grid de personajes visible en el navegador
// 12. Al hacer click en una imagen: guarda el personaje y navega a su detalle