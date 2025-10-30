import { Coche } from './coche.js';
import coches from './coches.json' with {type:'json'};
class Electrico extends Coche{
     constructor(marca,modelo,anio,autonomia){
        super(marca,modelo,anio);
        this.autonomia=autonomia;
    }
     mostrarInfo=function(){
        return `Marca:${this.marca} Modelo:${this.modelo} Año:${this.anio} autonomia:${this.autonomia}`;
    }
}

function pintarCoches(){
    let info="";
    for(let burumm of coches){
        
        if (burumm.electrico==true){
            let elec= new Electrico(burumm.marca,burumm.modelo,burumm.anio,burumm.autonomia);
            info+=elec.mostrarInfo()+'<br>';
        }else{
            let carb= new Coche(burumm.marca,burumm.modelo,burumm.anio);
            info+=carb.mostrarInfo()+'<br>';
        }
        
    }
    return info;
}

function pintarCochesConsole(){
    let info="";
    for(let burumm of coches){
        
        if (burumm.electrico==true){
            let elec= new Electrico(burumm.marca,burumm.modelo,burumm.anio,burumm.autonomia);
            info=elec.mostrarInfo();
        }else{
            let carb= new Coche(burumm.marca,burumm.modelo,burumm.anio);
            info=carb.mostrarInfo();
        }
        console.log("info",info);    
    }
    
}

export {pintarCoches,pintarCochesConsole}
