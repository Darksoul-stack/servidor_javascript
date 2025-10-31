import datos from './datos.json' with { type: 'json' };

// Array con los días de la semana en castellano
const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
];

export function diaDeLaSemana(fecha) {
    // Obtener la fecha actual 'yyyy-MM-dd'
    const fechaActual = new Date(fecha);

    // Obtener el índice del día de la semana (0 es domingo, 6 es sábado)
    const diaSemanaIndex = fechaActual.getDay();

    // Obtener el nombre del día de la semana
    const diaSemanaTexto = diasSemana[diaSemanaIndex];
    return diaSemanaTexto;
}


const sAnio = "2025";
//PASO 1 RECORREMOS LOS MESES Y LOS VAMOS PINTANDO
export function pintar(){
    let anio=document.getElementById('anio').value;
    

    anio=anio!=null && anio!=''?anio:sAnio;
for (let mes of datos) {
    console.log("MES: ", mes[nombre]);
    document.writeln("MES: <b>"+ mes[nombre]+"</b><br>");
    //PASO 2 DENTRO DEL BUCLE DE MESES CONSTRUIMOS UN BUCLE QUE ME RECORRA LOS DIAS DEL MES USANDO COMO TOPE EL CAMPO DIAS DEL OBJETO
    for (let d = 1; d <= mes[dia]; d++) {
        //console.log("DIA: ", d);
        //PASO 3 DENTRO DEL BUCLE DE LOS DIAS LLAMAMOS A UNA FUNCION QUE A PARTIR DEL TEXTO DEL MES ME DEVUELVA EL NUMÉRICO DEL MES
        let sMes = sacarNumeroMes(mes.nombre); // en casa iterrar los dias y que se vayan aumentando. y impriendo en pantalla 

        //PASO 4 DENTRO DEL BUCLE DE LOS DIAS CONCATENAMOS AÑO NUMERO MES Y NUMERO DIA CON ESTE FORMATO 'yyyy-MM-dd'
        let sFecha = "";
        let sDia = d.toString();
        if (d < 10) {
            sDia = "0" + d.toString();
        }
        sFecha = anio + "-" + sMes + "-" + sDia; //yyyy-MM-dd

        //PASO 5 DENTRO DEL BUCLE DE LOS DIAS LLAMAMOS A LA FUNCION diaDeLaSemana(fecha concatenada) PARA QUE ME DEVUELVA EL DÍA DE LA SEMANA EN TEXTO
        let diaSemanaTexto = diaDeLaSemana(sFecha);

        //PASO 6 DENTRO DEL BUCLE DE LOS DIAS CONCATENAMOS EL DIA DE LA SEMANA EN TEXTO EL MES EN TEXTO Y EL AÑO Y LO METEMOS EN UNA VARIABLE
        let diaCompleto = "Hoy es " + diaSemanaTexto + " " + d.toString() + " de " + mes.nombre + " de " + anio;

        //PASO 7 DENTRO DEL BUCLE DE LOS DIAS PINTAMOS LA VARIABLE
        console.log(diaCompleto);
        document.writeln("<i>"+ diaCompleto+"</i><br>");

    }
}
}
// 🔹 Exponer la función al HTML
window.pintar = pintar;


