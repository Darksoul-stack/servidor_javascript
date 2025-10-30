
//const { Electrico } = require('./electrico.js');
export class Coche{
    constructor(marca,modelo,anio){
        this.marca=marca;
        this.modelo=modelo;
        this.anio=anio;
    }
    mostrarInfo=function(){
        return `Marca:${this.marca} Modelo:${this.modelo} Año:${this.anio} `;
    }
    
}

