/***************************************************
 * CUSTOM ELEMENTS – LO QUE HEMOS APRENDIDO
 * -------------------------------------------------
 * - Creamos etiquetas personalizadas (Custom Elements)
 * - Los atributos observados actualizan el componente
 * - connectedCallback → al entrar al DOM
 * - disconnectedCallback → al salir del DOM
 * - attributeChangedCallback → si cambia un atributo
 * - Shadow DOM → para encapsular HTML y CSS
 * - render() → función que actualiza el contenido
 ***************************************************/



/***************************************************
 * 1️⃣  EJEMPLO: MI-CONTADOR
 * -------------------------------------------------
 * ✔ Elemento personalizado que incrementa al hacer clic
 * ✔ Usa atributos: "valor" y "pepino"
 * ✔ Renderiza con textContent
 ***************************************************/
class MiContador extends HTMLElement {

  // Atributos que queremos vigilar
  static get observedAttributes() {
    return ['valor', 'pepino'];
  }

  constructor() {
    super();
    // El atributo “valor” se convierte en número (si existe)
    this.valor = parseInt(this.getAttribute('valor')) || 0;
  }

  // Cuando aparece en el DOM
  connectedCallback() {
    this.render();
    this.addEventListener('click', this.incrementar);
    this.addEventListener('click', this.cambiarValorPepino);
  }

  // Cuando desaparece del DOM
  disconnectedCallback() {
    this.removeEventListener('click', this.incrementar);
  }

  // Cuando cambia un atributo observado
  attributeChangedCallback(nombre, valorAntiguo, valorNuevo) {
    if (nombre === 'valor') {
      this.valor = parseInt(valorNuevo);
      this.render();
    }
  }

  // Incrementa el contador
  incrementar = () => {
    this.valor++;
    this.setAttribute('valor', this.valor); // Importante: cambiar atributo dispara render
  }

  // Cambia el atributo pepino
  cambiarValorPepino = () => {
    this.setAttribute('pepino', 'Pepino Marino ' + this.valor);
  }

  // Dibuja el contenido
  render() {
    this.textContent = `Contador: ${this.valor}`;
  }
}



/***************************************************
 * 2️⃣  MI-RESTADOR
 * -------------------------------------------------
 * ✔ Igual que MiContador, pero resta valores
 ***************************************************/
class MiRestador extends HTMLElement {

  static get observedAttributes() {
    return ['valorrestado'];
  }

  constructor() {
    super();
    this.valorrestado = parseInt(this.getAttribute('valorrestado')) || 0;
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.restar);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.restar);
  }

  attributeChangedCallback(nombre, oldVal, newVal) {
    if (nombre === 'valorrestado') {
      this.valorrestado = parseInt(newVal);
      this.render();
    }
  }

  restar = () => {
    this.valorrestado--;
    this.setAttribute('valorrestado', this.valorrestado);
  }

  render() {
    this.textContent = `Contador Restado: ${this.valorrestado}`;
  }
}



/***************************************************
 * 3️⃣  MI-MULTIPLICADOR
 * -------------------------------------------------
 * ✔ Igual que contador pero multiplica ×2
 ***************************************************/
class MiMultiplicador extends HTMLElement {

  static get observedAttributes() {
    return ['valor'];
  }

  constructor() {
    super();
    this.valor = parseInt(this.getAttribute('valor')) || 1;
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.multiplicar);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.multiplicar);
  }

  attributeChangedCallback(nombre, oldVal, newVal) {
    if (nombre === 'valor') {
      this.valor = parseInt(newVal);
      this.render();
    }
  }

  multiplicar = () => {
    this.valor *= 2;
    this.setAttribute('valor', this.valor);
  }

  render() {
    this.textContent = `Contador: ${this.valor}`;
  }
}



/***************************************************
 * 4️⃣  MI-TABLA
 * -------------------------------------------------
 * ✔ Usa SHADOW DOM (modo open)
 * ✔ Dibuja una tabla con datos JSON
 * ✔ Encapsula estilos dentro del shadowRoot
 ***************************************************/
class MiTabla extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = [];
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    // Datos por defecto
    this.data = [
      { nombre: 'Ana', edad: 28, ciudad: 'Madrid' },
      { nombre: 'Luis', edad: 35, ciudad: 'Valencia' },
    ];
  }

  render() {
    if (!this.shadowRoot) return;

    const data = this._data || [];

    this.shadowRoot.innerHTML = `
      <style>
        table { border-collapse: collapse; width: 100%; font-family: sans-serif; }
        th, td { border: 1px solid #ccc; padding: 8px; }
        th { background: #f4f4f4; }
      </style>
      <table>
        <thead>
          <tr>${data.length ? Object.keys(data[0]).map(k => `<th>${k}</th>`).join('') : ''}</tr>
        </thead>
        <tbody>
          ${data.map(row => `<tr>${Object.values(row).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  }
}



/***************************************************
 * 5️⃣  Componentes con DIV + SHADOW DOM (sin table)
 ***************************************************/
class MiDivTabluno extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.dataDiv = [];
  }

  set dataDiv(value) {
    this._dataDiv = value;
    this.render();
  }

  get dataDiv() {
    return this._dataDiv;
  }

  connectedCallback() {
    this.dataDiv = [
      { nombre: 'Ana', edad: 28, ciudad: 'Madrid' },
      { nombre: 'Luis', edad: 35, ciudad: 'Valencia' },
    ];
  }

  render() {
    if (!this.shadowRoot) return;

    const data = this._dataDiv || [];
    let html = `<link rel="stylesheet" href="estilos.css"><div>`;

    if (data.length) {
      // CABECERA
      html += `<div id="Cabecera">`;
      for (let k of Object.keys(data[0])) html += `<div>${k}</div>`;
      html += `</div>`;

      // FILAS
      for (let row of data) {
        html += `<div class="fila">`;
        for (let v of Object.values(row)) html += `<div>${v}</div>`;
        html += `</div>`;
      }
    }

    html += `</div>`;
    this.shadowRoot.innerHTML = html;
  }
}



/***************************************************
 * 6️⃣  REGISTRO DE COMPONENTES
 ***************************************************/
customElements.define('mi-contador', MiContador);
customElements.define('mi-restador', MiRestador);
customElements.define('mi-multiplicador', MiMultiplicador);

customElements.define('mi-tabla', MiTabla);
customElements.define('mi-div-tabluno', MiDivTabluno);



/***************************************************
 * 7️⃣  MODIFICAR DATOS DESDE FUERA (IMPORTANTE)
 ***************************************************/
const tabla = document.querySelector('mi-tabla');
tabla.data = [
  { nombre: 'Mario', edad: 30, ciudad: 'Bilbao' },
  { nombre: 'Lucía', edad: 25, ciudad: 'Granada' },
];

const div = document.querySelector('mi-div-tabluno');
div.dataDiv = [
  { nombre: 'Mario', edad: 30, ciudad: 'Bilbao' },
  { nombre: 'Lucía', edad: 25, ciudad: 'Granada' },
];
