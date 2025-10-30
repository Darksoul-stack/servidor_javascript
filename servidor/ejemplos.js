// ejemplos.js

export function ejemplo() {
    let edad = 45; // Número
    let edadMasDiez = edad + 10;
    console.log("Edad + 10 =", edadMasDiez); // → 55
    return edadMasDiez;
}

export function saludar(usuario) {
    console.log(`Hola, ${usuario}`);
}

function secreto() {
    console.log("Ssssshh... es un secreto...");
}

export function despedir(usuario) {
    secreto();
    console.log(`Adiós, ${usuario}`);
}

// SOLO USA export → NADA DE module.exports