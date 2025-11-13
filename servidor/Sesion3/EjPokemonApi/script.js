const url = "https://pokeapi.co/api/v2/pokemon?offset=1&limit=120";
fetch(url).then(resultado => {
    resultado.json().then(data => {
        //REALMENTE TENÉIS QUE EMPEZAR A PROGRAMAR AQUI
        console.log("data", data);

        for (const Array of data.results) {
            for (let i = 0; i < 4; i++) {
                let padre = document.getElementById("Contenedor");
                let nuevoDivImag = document.createElement("div");
                let nuevoDivTitulo = document.createElement("div");
                let imagen = document.createElement("img");
                nuevoDivImag.appendChild(imagen);
                padre.appendChild(nuevoDivImag);
                padre.appendChild(nuevoDivTitulo);


                //  terminarlo en casa entendiendolo bien para saber usar chatgpt con la teoria y no copiar y pegar 
                //  sin saber 



            }
        }








    }).catch(errData => {
    });
})
    .catch(err => {
    });
