// sesion2/coche.js

export class Coche {
  constructor(marca, modelo, anio) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
  }

  // CORREGIDO: No se puede usar = function(), debe ser método normal
  mostrarInfo() {
    return `Marca: ${this.marca} | Modelo: ${this.modelo} | Año: ${this.anio}`;
  }
}
