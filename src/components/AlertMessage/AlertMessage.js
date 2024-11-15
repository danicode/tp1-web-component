class AlertMessage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['type', 'message'];
  }

  //Configurar reactividad en ambas propiedades,
  // en caso que modifique cualquier de las 2 variables se muestre una cosa u otra
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  //Por practicidad se hizo un metodo render para reutilizarlo tanto cuando se agrega a alguna
  // parte de la pagina como cuando cambia alguno de sus atribucos
  render() {
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';

    // En caso de ser enviado mensaje no se muestra el componente
    if (!message) {
        this.style.display = 'none';
        return;
    }

    this.style.display = 'block';

    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="./components/AlertMessage/alert-message.css">
      <div class="alert ${ type }">
          ${ message }
      </div>
    `;
  }
}

customElements.define('alert-message', AlertMessage);
