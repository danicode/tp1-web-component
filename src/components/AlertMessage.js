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
      <style>
          :host {
              display: block;
              margin: 10px 0;
          }
          .alert {
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 10px;
              color: white;
          }
          .success {
              background-color: #4caf50;
          }
          .warning {
              background-color: #ffcc00;
          }
          .error {
              background-color: #ff4c4c;
          }
          .info {
              background-color: #1a4c8e
          }
      </style>
      <div class="alert ${ type }">
          ${ message }
      </div>
    `;
  }
}

customElements.define('alert-message', AlertMessage);
