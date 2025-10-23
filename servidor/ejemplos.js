function ejemplo() {
    let edad = 45; // El usuario introduce 
    let edadMasDiez = edad + 10; 
    console.log(edadMasDiez); // "4010" en lugar de 50
    return edadMasDiez;
}

// Fichero miLibreria.js

function saludar(usuario) {
  console.log(`Hola, ${usuario}`);
}

function secreto() {
  console.log("Ssssshh... es un secreto...");
}

function despedir(usuario) {
  secreto();
  console.log(`Adiós, ${usuario}`);
}

// Solo exportamos las funciones que queremos que sean públicas
export { saludar, despedir };
module.exports = {ejemplo};