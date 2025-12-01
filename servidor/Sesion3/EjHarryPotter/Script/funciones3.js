// ========================================
// FILTRAR PERSONAJES POR CASA - HARRY POTTER
// ========================================


// FUNCIÓN PRINCIPAL: mostrarCasa(casaSeleccionada)
// -------------------------------------------------
// ¿Qué hace?
// - Es una función ASÍNCRONA que filtra y muestra personajes de una casa específica
// - Recibe como parámetro el nombre de la casa a filtrar
// - Obtiene TODOS los personajes de la API
// - FILTRA solo los personajes de la casa seleccionada
// - Crea y muestra las tarjetas de los personajes filtrados
// - Tiene sistema de IMAGEN POR DEFECTO (fallback)
//
// PARÁMETRO:
// - casaSeleccionada → String con el nombre de la casa 
//   (ejemplos: "Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw", "SinCasa")

async function mostrarCasa(casaSeleccionada) {

    // PASO 1: Obtener TODOS los personajes de la API
    // -----------------------------------------------
    // await → Espera a que se obtengan los datos antes de continuar
    // obtenerDatosHarryPotter() → Función que definiste antes (hace la llamada a la API)
    // Guarda el array COMPLETO de personajes en la variable personajes
    
    let personajes = await obtenerDatosHarryPotter();
    
    
    // PASO 2: Obtener el contenedor y LIMPIARLO
    // ------------------------------------------
    // document.getElementById("contenido-casas") → Busca el elemento con id="contenido-casas"
    // contenedor.innerHTML = "" → BORRA TODO el contenido anterior del contenedor
    // Esto es importante para que no se acumulen personajes al cambiar de casa
    
    let contenedor = document.getElementById("contenido-casas");
    contenedor.innerHTML = "";


    // PASO 3: FILTRAR los personajes según la casa seleccionada
    // -----------------------------------------------------------
    // Declaramos la variable filtrados que contendrá el array filtrado
    
    let filtrados;


    // CASO ESPECIAL: Personajes SIN casa
    // -----------------------------------
    // Si casaSeleccionada === "SinCasa" → Filtra personajes que NO tienen casa
    // 
    // personajes.filter(p => ...) → Método que crea un NUEVO array 
    //                               solo con los elementos que cumplan la condición
    // p → Variable que representa cada personaje en cada iteración
    // !p.house → Si house es null, undefined, o vacío
    // p.house.trim() === "" → Si después de quitar espacios está vacío
    // || → Operador OR, si CUALQUIERA de las dos condiciones es true, incluye el personaje
    //
    // RESUMEN: Incluye personajes sin casa o con casa vacía
    
    if (casaSeleccionada === "SinCasa") {
        filtrados = personajes.filter(p => !p.house || p.house.trim() === "");
        
    } else {
        // CASO NORMAL: Filtrar por casa específica
        // -----------------------------------------
        // personajes.filter(p => p.house === casaSeleccionada)
        // Solo incluye personajes cuya casa coincida EXACTAMENTE con casaSeleccionada
        //
        // Ejemplo: Si casaSeleccionada = "Gryffindor"
        //          Solo incluye personajes con p.house = "Gryffindor"
        
        filtrados = personajes.filter(p => p.house === casaSeleccionada);
    }


    // PASO 4: Recorrer los personajes FILTRADOS y crear sus tarjetas
    // ---------------------------------------------------------------
    // for...of → Recorre el array filtrados uno por uno
    // res → Variable que representa cada personaje filtrado en cada iteración
    // IMPORTANTE: Solo itera sobre los personajes de la casa seleccionada
    
    for (let res of filtrados) {

        // EXTRAER los datos de cada personaje
        // ------------------------------------
        let nomPersonaje = res.name;  // Nombre del personaje
        
        
        // NOMBRES ALTERNATIVOS con valor por defecto
        // -------------------------------------------
        // res.alternate_names || ["Sin nombres alternativos"]
        // - Si alternate_names existe (es un array) → usa ese array
        // - Si alternate_names es null/undefined/vacío → usa ["Sin nombres alternativos"]
        // NOTA: Aquí se guarda como ARRAY, no como string
        
        let altNombre = res.alternate_names || ["Sin nombres alternativos"];
        
        
        let imgPersonaje = res.image;  // URL de la imagen
        
        
        // AÑO DE NACIMIENTO con valor por defecto
        // ----------------------------------------
        // || → Si yearOfBirth es falsy (null, undefined, "", 0, false) usa "Año desconocido"
        
        let ayoNacimiento = res.yearOfBirth || "Año desconocido";


        // SISTEMA DE IMAGEN POR DEFECTO (FALLBACK)
        // -----------------------------------------
        // fallback → Ruta de la imagen por defecto
        // "../" significa "subir un nivel de carpeta"
        
        const fallback = "../assets/imagen_personaje_harrypotter.png";
        
        
        // COMPROBACIÓN INICIAL de la imagen
        // ----------------------------------
        // Si NO hay imagen válida → usa el fallback
        
        if (!imgPersonaje || imgPersonaje.trim() === "") {
            imgPersonaje = fallback;
        }


        // CREAR la tarjeta del personaje
        // -------------------------------
        // document.createElement("div") → Crea un elemento <div> nuevo
        // classList.add("ancho200") → Le añade la clase CSS "ancho200"
        
        let div = document.createElement("div");
        div.classList.add("ancho200");


        // CREAR la imagen
        // ---------------
        let img = document.createElement("img");
        img.src = imgPersonaje;
        
        
        // EVENTO ONERROR con ARROW FUNCTION
        // ----------------------------------
        // img.onerror = () => img.src = fallback;
        // 
        // Arrow function: () => expresión
        // Es una forma CORTA de escribir: function() { img.src = fallback; }
        //
        // ¿Qué hace?
        // - Si la imagen NO carga → cambia img.src a fallback
        // - Es más corto que la versión anterior porque no necesita el if
        //   (asume que siempre queremos cambiar a fallback si hay error)
        
        img.onerror = () => img.src = fallback;


        // EVENTO CLICK en la imagen
        // --------------------------
        // onclick → Se ejecuta cuando haces click en la imagen
        // ¿Qué hace?
        // 1. localStorage.setItem("personaje", JSON.stringify(res)) → 
        //    GUARDA el personaje actual (convertido a texto) con la clave 'personaje'
        //    NOTA: Aquí NO se hace localStorage.clear() primero
        // 2. window.location.href → NAVEGA a la página de detalle del personaje
        //    "../" sube un nivel porque estamos en una subcarpeta
        
        img.onclick = function () {
            localStorage.setItem("personaje", JSON.stringify(res));
            window.location.href = "../Personajes/personaje.html";
        };


        // CREAR el título H1 (nombre)
        // ----------------------------
        let h1 = document.createElement("h1");
        h1.innerText = nomPersonaje;


        // CREAR el párrafo P (nombres alternativos)
        // ------------------------------------------
        // IMPORTANTE: Aquí ya NO se usa .join(", ")
        // p.innerText = altNombre → Si altNombre es un array, JavaScript lo convierte
        //                           automáticamente a string separando con comas
        //
        // Ejemplo: ["Harry", "The Boy"] → Se muestra como "Harry,The Boy"
        //          (sin espacios después de la coma)
        //
        // Si altNombre = ["Sin nombres alternativos"] → Se muestra "Sin nombres alternativos"
        
        let p = document.createElement("p");
        p.innerText = altNombre; // ← Aquí ya no hay join, muestra el array tal cual


        // CREAR el párrafo P2 (año de nacimiento)
        // ----------------------------------------
        let p2 = document.createElement("p");
        p2.innerText = ayoNacimiento;


        // ENSAMBLAR toda la tarjeta
        // -------------------------
        // appendChild() → Añade cada elemento al div en orden
        // Orden: img → h1 → p → p2
        
        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(p);
        div.appendChild(p2);


        // AÑADIR la tarjeta completa al contenedor
        // -----------------------------------------
        contenedor.appendChild(div);
    }
}


// EJECUTAR la función al cargar el archivo
// -----------------------------------------
// mostrarCasa() → Se ejecuta SIN parámetros
// PROBLEMA: Si no se pasa parámetro, casaSeleccionada será undefined
// Esto hará que la condición del if sea false y entre al else
// En el else: filtrados = personajes.filter(p => p.house === undefined)
// RESULTADO: No mostrará ningún personaje (porque ninguno tiene house = undefined)
//
// NOTA: Probablemente FALTA pasarle un parámetro
// Ejemplos de cómo debería llamarse:
// - mostrarCasa("Gryffindor")
// - mostrarCasa("Slytherin")
// - mostrarCasa("SinCasa")

mostrarCasa();


//===================================
// CONCEPTOS CLAVE:
//===================================
// - async/await → Para esperar datos asíncronos de la API
// - document.getElementById() → Busca un elemento HTML por su id
// - innerHTML = "" → Borra TODO el contenido de un elemento
// - .filter() → Método de arrays que crea un NUEVO array solo con elementos que cumplan condición
// - Arrow function: () => expresión → Forma corta de escribir funciones
// - document.createElement() → Crea nuevos elementos HTML
// - classList.add() → Añade clases CSS
// - appendChild() → Añade elementos hijos
// - innerText → Establece texto
// - onclick → Evento al hacer click
// - onerror → Evento cuando falla la carga de imagen
// - localStorage.setItem() → Guarda datos
// - window.location.href → Navega a otra página
// - trim() → Quita espacios en blanco
// - Operador || → Valor por defecto si es falsy
// - for...of → Recorre arrays


//===================================
// MÉTODO .filter() - MUY IMPORTANTE:
//===================================
// array.filter(función) → Crea un NUEVO array con elementos que cumplan condición
//
// Sintaxis:
// let nuevoArray = array.filter(elemento => condición);
//
// Ejemplos:
// let numeros = [1, 2, 3, 4, 5];
// let pares = numeros.filter(n => n % 2 === 0);
// // Resultado: [2, 4]
//
// let personajes = [{name: "Harry", house: "Gryffindor"}, {name: "Draco", house: "Slytherin"}];
// let gryffindor = personajes.filter(p => p.house === "Gryffindor");
// // Resultado: [{name: "Harry", house: "Gryffindor"}]


//===================================
// ARROW FUNCTIONS - EXPLICACIÓN:
//===================================
// Forma tradicional:
// img.onerror = function() {
//     if (img.src !== fallback) {
//         img.src = fallback;
//     }
// };
//
// Forma con arrow function (corta):
// img.onerror = () => img.src = fallback;
//
// Ventaja: Más concisa y legible para funciones simples


//===================================
// DIFERENCIA: innerText con array vs con string:
//===================================
// Con .join(", "):
// let altNombre = res.alternate_names?.join(", ") || "Sin nombres";
// p.innerText = altNombre;
// Resultado: "Harry, The Boy Who Lived" (con espacios después de comas)
//
// Sin .join():
// let altNombre = res.alternate_names || ["Sin nombres"];
// p.innerText = altNombre;
// Resultado: "Harry,The Boy Who Lived" (SIN espacios después de comas)
//
// RECOMENDACIÓN: Usar .join(", ") para mejor formato


//===================================
// PROBLEMA DETECTADO:
//===================================
// La función se ejecuta sin parámetro: mostrarCasa()
// Esto hace que casaSeleccionada = undefined
// No mostrará ningún personaje
//
// SOLUCIÓN: Llamar con parámetro
// mostrarCasa("Gryffindor") → Muestra personajes de Gryffindor
// mostrarCasa("Slytherin") → Muestra personajes de Slytherin
// mostrarCasa("SinCasa") → Muestra personajes sin casa


//===================================
// FLUJO COMPLETO DEL PROGRAMA:
//===================================
// 1. Se ejecuta mostrarCasa(casaSeleccionada)
// 2. Se obtienen TODOS los personajes de la API
// 3. Se limpia el contenedor (innerHTML = "")
// 4. Se FILTRA el array según la casa seleccionada
// 5. Si es "SinCasa" → filtra personajes sin casa
// 6. Si es otra casa → filtra personajes de esa casa específica
// 7. Se recorre el array FILTRADO (solo personajes de la casa)
// 8. Para cada personaje filtrado se crea una tarjeta: div > img + h1 + p + p2
// 9. Se valida la imagen (fallback si falla)
// 10. Se añaden todas las tarjetas al contenedor
// 11. Resultado: Solo se muestran personajes de la casa seleccionada
// 12. Al hacer click en imagen: guarda personaje y navega a detalle