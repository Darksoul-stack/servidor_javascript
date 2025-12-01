// ==========================================
// EXPLICACIÓN DEL CÓDIGO - STAR WARS API
// ==========================================

// FUNCIÓN 1: llamadaAPI(url)
// ---------------------------
// ¿Qué hace?
// - Es una función ASÍNCRONA (async) que hace peticiones a internet
// - Recibe como parámetro una URL (dirección web)
// - fetch(url) → Hace la petición HTTP a esa dirección
// - await → Espera a que llegue la respuesta antes de continuar
// - respuesta.json() → Convierte la respuesta a formato JSON (objeto de JavaScript)
// - return datos → Devuelve esos datos para usarlos fuera de la función
// 
// RESUMEN: Pide información a una URL y te la devuelve en formato JSON

async function llamadaAPI(url) {
    let respuesta = await fetch(url);  // Hace la petición y espera la respuesta
    let datos = await respuesta.json();  // Convierte la respuesta a JSON
    return datos;  // Devuelve los datos
}


// FUNCIÓN 2: datosStarWars()
// ---------------------------
// Es la función PRINCIPAL, también asíncrona
// Define la URL de la API de Star Wars (endpoint de personajes)

async function datosStarWars() {
    const url = "https://swapi.dev/api/people/";  // URL de la API


    // PASO 1: Obtener datos de la API
    // --------------------------------
    // Llama a la función llamadaAPI pasándole la URL
    // await espera a que termine y guarda el resultado en data
    // console.log muestra en la consola qué datos llegaron
    
    let data = await llamadaAPI(url);
    console.log("data:", data);


    // PASO 2: Recorrer y guardar cada personaje
    // ------------------------------------------
    // data.results es un ARRAY (lista) con los personajes que devuelve la API
    // El bucle for...of recorre cada personaje uno por uno
    
    for (let personaje of data.results) {
        
        // Extrae el NOMBRE del personaje actual
        let nombre = personaje.name;


        // GUARDAR en localStorage
        // -----------------------
        // localStorage = almacenamiento del navegador (guarda datos aunque cierres la página)
        // setItem(clave, valor) → Guarda un dato con una clave específica
        // - CLAVE: El nombre del personaje (ej: "Luke Skywalker")
        // - VALOR: El objeto completo del personaje convertido a TEXTO con JSON.stringify()
        // ⚠️ IMPORTANTE: localStorage solo guarda TEXTO, por eso hay que convertir el objeto
        
        localStorage.setItem(nombre, JSON.stringify(personaje));


        // VERIFICAR que se guardó correctamente
        // -------------------------------------
        // localStorage.getItem(nombre) → Recupera el dato guardado con esa clave
        // JSON.parse() → Convierte el TEXTO de vuelta a OBJETO de JavaScript
        // console.log → Muestra en consola que se guardó correctamente
        
        let datosGuardados = JSON.parse(localStorage.getItem(nombre));
        console.log("Guardado:", datosGuardados);
    }
}


// EJECUTAR la función principal para que empiece todo el proceso
datosStarWars();


// ==========================================
// RESUMEN COMPLETO DEL FLUJO:
// ==========================================
// 1. LLAMAMOS a la API de Star Wars
// 2. RECIBIMOS una lista de personajes
// 3. RECORREMOS cada personaje con un bucle
// 4. GUARDAMOS cada personaje en localStorage usando su nombre como clave
// 5. VERIFICAMOS que se guardó bien mostrándolo en consola


// ==========================================
// CONCEPTOS CLAVE PARA EL EXAMEN:
// ==========================================
// - async/await → Para trabajar con código asíncrono (peticiones web)
// - fetch() → Hace peticiones HTTP
// - .json() → Convierte respuesta a formato JSON
// - for...of → Recorre arrays
// - localStorage.setItem() → Guarda datos
// - localStorage.getItem() → Recupera datos
// - JSON.stringify() → Convierte OBJETO a TEXTO
// - JSON.parse() → Convierte TEXTO a OBJETO