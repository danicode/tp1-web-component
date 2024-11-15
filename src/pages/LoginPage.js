class LoginPage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 80vh;
          gap: 10px;
        }
      </style>
      <user-login></user-login>
      <alert-message></alert-message>
    `;

    //Manejar el evento de login y asociar el metodo handleLogin
    this.shadowRoot.addEventListener('login:access', this.handleLogin.bind(this));
  }

  handleLogin(event) {
    //obtener el detalle del evento
    //actualizar el componente alerta.
    const alertMessage = this.shadowRoot.querySelector('alert-message');
    alertMessage.setAttribute('type', event.detail.type);
    alertMessage.setAttribute('message', event.detail.message);
  }
}

customElements.define('login-page', LoginPage);
