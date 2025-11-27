async function mostrarCasa(casaSeleccionada) {

    let personajes = await obtenerDatosHarryPotter();
    let contenedor = document.getElementById("contenido-casas");
    contenedor.innerHTML = "";

    let filtrados;

    if (casaSeleccionada === "SinCasa") {
        filtrados = personajes.filter(p => !p.house || p.house.trim() === "");
    } else {
        filtrados = personajes.filter(p => p.house === casaSeleccionada);
    }

    for (let res of filtrados) {

        let nomPersonaje = res.name;
        let altNombre = res.alternate_names || ["Sin nombres alternativos"];
        let imgPersonaje = res.image;
        let ayoNacimiento = res.yearOfBirth || "Año desconocido";

        const fallback = "../assets/imagen_personaje_harrypotter.png";
        if (!imgPersonaje || imgPersonaje.trim() === "") {
            imgPersonaje = fallback;
        }

        // Tarjeta
        let div = document.createElement("div");
        div.classList.add("ancho200");

        let img = document.createElement("img");
        img.src = imgPersonaje;
        img.onerror = () => img.src = fallback;

        img.onclick = function () {
            localStorage.setItem("personaje", JSON.stringify(res));
            window.location.href = "../Personajes/personaje.html";
        };

        let h1 = document.createElement("h1");
        h1.innerText = nomPersonaje;

        let p = document.createElement("p");
        p.innerText = altNombre; // ← Aquí ya no hay join, muestra el array tal cual

        let p2 = document.createElement("p");
        p2.innerText = ayoNacimiento;

        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(p);
        div.appendChild(p2);

        contenedor.appendChild(div);
    }
}
mostrarCasa();