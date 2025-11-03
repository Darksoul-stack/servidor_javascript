let Meses = [
    {
        nombre: 'Enero',
        dias: 31
    },
    {
        nombre: 'Febrero',
        dias: 29
    },
    {
        nombre: 'Marzo',
        dias: 31
    },
    {
        nombre: 'Abril',
        dias: 30
    },
    {
        nombre: 'Mayo',
        dias: 31
    },
    {
        nombre: 'Junio',
        dias: 30
    },
    {
        nombre: 'Julio',
        dias: 31
    },
    {
        nombre: 'Agosto',
        dias: 31
    },
    {
        nombre: 'Septiembre',
        dias: 30
    },
    {
        nombre: 'Octubre',
        dias: 31
    },
    {
        nombre: 'Noviembre',
        dias: 30
    },
    {
        nombre: 'Diciembre',
        dias: 31
    }];

function sacarNumeroMes(mes) {
    let sMes = "";
    switch (mes) {
        case "Enero": sMes = "01"; break;
        case "Febrero": sMes = "02"; break;
        case "Marzo": sMes = "03"; break;
        case "Abril": sMes = "04"; break;
        case "Mayo": sMes = "05"; break;
        case "Junio": sMes = "06"; break;
        case "Julio": sMes = "07"; break;
        case "Agosto": sMes = "08"; break;
        case "Septiembre": sMes = "09"; break;
        case "Octubre": sMes = "10"; break;
        case "Noviembre": sMes = "11"; break;
        case "Diciembre": sMes = "12"; break;
    }
    return sMes;
}

const diasSemana = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
];

function diaDeLaSemana(fecha) {
    const fechaActual = new Date(fecha);
    const diaSemanaIndex = fechaActual.getDay();
    return diasSemana[diaSemanaIndex];
}

const sAnio = "2025";

//PASO 1 RECORREMOS LOS MESES Y LOS VAMOS PINTANDO
export function pintar(){
    let anio=document.getElementById('anio').value;
    debugger;

    anio=anio!=null && anio!=''?anio:sAnio;
for (let mes of Meses) {
    console.log("MES: ", mes.nombre);
    document.writeln("MES: <b>"+ mes.nombre+"</b><br>");
    //PASO 2 DENTRO DEL BUCLE DE MESES CONSTRUIMOS UN BUCLE QUE ME RECORRA LOS DIAS DEL MES USANDO COMO TOPE EL CAMPO DIAS DEL OBJETO
    for (let d = 1; d <= mes.dias; d++) {
        //console.log("DIA: ", d);
        //PASO 3 DENTRO DEL BUCLE DE LOS DIAS LLAMAMOS A UNA FUNCION QUE A PARTIR DEL TEXTO DEL MES ME DEVUELVA EL NUMÉRICO DEL MES
        let sMes = sacarNumeroMes(mes.nombre);

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
