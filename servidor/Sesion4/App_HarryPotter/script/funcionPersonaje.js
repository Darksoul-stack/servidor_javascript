class Personaje {
  constructor(datos) {
    // Guardo el nombre directamente
    this.name = datos.name;

    // La varita la guardo como un objeto con sus propias propiedades.
    this.wand = {
      // datos.wand puede existir o no, por eso uso datos.wand && datos.wand.wood
      // Si datos.wand existe, cojo wood/core/length. Si no, será undefined
      wood: datos.wand && datos.wand.wood,
      core: datos.wand && datos.wand.core,
      length: datos.wand && datos.wand.length
    };

    // isWizard guarda si es mago o no
    this.isWizard = datos.wizard;
  }
  // Funcion para saber si es mago o no
  esMago() {
    // Si la propiedad isWizard es true, devuelvo que es mago/maga
    if (this.isWizard) {
      return this.name + ' es mago/maga.';
    } else {
      // Si es false o undefined, devuelvo que NO es mago/maga
      return this.name + ' NO es mago/maga.';
    }
  }
  // funcion para descripcion de la varita
  descripcionVarita() {
    // “Asigna la madera de la varita, o ‘Madera desconocida’ si no existe.
    let madera = this.wand.wood ? this.wand.wood : 'Madera desconocida';
    let nucleo = this.wand.core ? this.wand.core : 'Núcleo desconocido';

    let longitud;

    // Guarda la longitud de la varita o indica que no se conoce si no tiene.
    if (this.wand.length) {
      longitud = this.wand.length;
    } else {
      longitud = 'Longitud desconocida';
    }

    // Devuelvo una frase con todos los datos juntos
    return (
      'La varita su Madera: ' +
      madera +
      ', Núcleo: ' +
      nucleo +
      ', Longitud: ' +
      longitud
    );
  }
}
