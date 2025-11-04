//  Importamos los datos correctamente
import { naves } from "./datos.js";

//  Accedemos al array de resultados dentro del objeto naves
const listaNaves = naves.results;

//  ERROR: 'arrNav' no existe en tu código
//  CORRECCIÓN: usa 'listaNaves' que ya contiene las naves
let passMore100 = listaNaves.filter(x => {
  //  passengers es un string, hay que convertirlo a número
  const pasajeros = parseInt(x.passengers);
  //  devolvemos solo las que tienen pasajeros válidos y mayores a 100
  return !isNaN(pasajeros) && pasajeros > 100;
});

//  Creamos un nuevo arreglo solo con el nombre y el modelo
let modelName = passMore100.map(x => ({
  name: x.name,
  model: x.model
}));

console.log(" modelName:", modelName);

// ERROR: 'arrNav' tampoco existe aquí
// CORRECCIÓN: usamos listaNaves nuevamente
//  También convertimos passengers a número y controlamos "unknown"
let passLess100B = listaNaves.filter(x => {
  const pasajeros = parseInt(x.passengers);
  // Si no se puede convertir (NaN), asumimos que es "unknown"
  return isNaN(pasajeros) || pasajeros <= 100;
});

console.log(" passLess100B:", passLess100B);


// ERROR: estás usando variables no definidas: 'navesMas100' y 'navesMenos100'
// CORRECCIÓN: usamos las variables que sí existen: 'passMore100' y 'passLess100B'

// Mostrar resultados
console.log(" Naves con más de 100 pasajeros:");
for (const nave of passMore100) {
  console.log(`Nombre: ${nave.name}, Modelo: ${nave.model}, Pasajeros: ${nave.passengers}`);
}

console.log("\n Naves con menos de 100 pasajeros:");
for (const nave of passLess100B) {
  console.log(`Nombre: ${nave.name}, Modelo: ${nave.model}, Pasajeros: ${nave.passengers}`);
}
