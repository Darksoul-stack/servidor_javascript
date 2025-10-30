// sesion2/sesion2.js

export function variables() {
    var no_es_bloque = "hola";
    console.log("no_es_bloque", no_es_bloque);

    if (true) {
        let es_bloque = "bloque";
        console.log("es_bloque_dentro", es_bloque);
    }
    console.log("no_es_bloque", no_es_bloque);
    // console.log("es_bloque_fuera", es_bloque); // ← Esto daría error: es_bloque no está definido

    return true;
}

export function concatenar() {
    let cadena = "1";
    let num1 = 1;
    let num2 = 2;

    let conc = cadena + num1;
    let suma = num1 + num2;

    console.log("conc", conc);  // → "11"
    console.log("suma", suma);  // → 3

    return { conc, suma }; // opcional: devolver resultados
}
