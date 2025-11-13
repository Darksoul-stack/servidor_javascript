import { movieTitles,bestMovies } from '../datos.js'

//++ PARTE 1 DEL EJERCICIO
//Ordeno alfabeticamente
movieTitles.sort();
console.log("movieTitlesSort", movieTitles);

//Saco del 11 al 15
let m11al15 = movieTitles.slice(11, 16);
console.log("movieTitlesslice", m11al15);

let arrCopia = movieTitles;

arrCopia.splice(14, 2, 'RAN', 'Infinity War');
console.log("arrCopia", arrCopia);

arrCopia.unshift("Amelie");
arrCopia.push("El Último Mohicano");
console.log("arrCopia", arrCopia);
//-- PARTE 1 DEL EJERCICIO

//++ PARTE 2 DEL EJERCICIO

//Saco del 11 al 15
let m11al15Obj = bestMovies.slice(11, 16);
console.log("bestMoviessslice", m11al15Obj);

let arrCopiaObj = bestMovies;

arrCopiaObj.splice(15, 2, { title: "RAN", director: "Akira Kurosawa", actor: "Toshiro Mifune" }, { title: "Infinity war", director: "Russo Brothers", actor: "Robert Downey Junior" });
console.log("arrCopiaObj", arrCopiaObj);

arrCopiaObj.unshift({ title: "Amelie", director: "Jean Pierre Jeunet", actor: "Audrey Tautou" });
arrCopiaObj.push({ title: "El Último Mohicano", director: "Michael Mann", actor: "Daniel Day Lewis" });
console.log("arrCopiaObj", arrCopiaObj);
//-- PARTE 2 DEL EJERCICIO

//++ parte 3 del ejercicio
function comprobarDirector(dir) {
    let arrPelis=[];
    //recorro el array de objetos agrupados comprobando si el director existe
    let bExiste = false;
    for (let obj_gru of arrObjAgrupado) {
        if (obj_gru.director == dir.director) {
            bExiste = true;
            obj_gru.numero_veces++;
            arrPelis=obj_gru.pelis;
            arrPelis.push(dir.peli);
            obj_gru.pelis=arrPelis;
        }
    }

    if (bExiste == false) {
        //Chekeo que no sea nolan
        let bNolan = false;
        if (dir.director == 'Christopher Nolan') {
            bNolan = true;
        }
        //Añado uno nuevo con el director y numero veces a uno

        arrPelis.push(dir.peli);
        arrObjAgrupado.push({
            director: dir.director,
            numero_veces: 1,
            pesado: bNolan,
            pelis:arrPelis
        });
    }
}

console.log("bestMovies", bestMovies);
let arrObjAgrupado = [];
let objNuevo = {
    director: '',
    numero_veces: 0,
    pesado: false,
    pelis:[]
}

let arrDirectores = [];

//Hago un array con los directores
for (let peli of bestMovies) {
  //  console.log("peli",peli);
    arrDirectores.push({director:peli.director,peli:peli})
}
console.log("arrDirectores",arrDirectores);

//Recorro el array de textos de directores y saco
for (let dir of arrDirectores) {
    //Llamo a lo funcion comprobar director
    comprobarDirector(dir);
}
console.log("arrObjAgrupado",arrObjAgrupado);

//-- parte 3 del ejercicio
