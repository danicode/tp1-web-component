class LoginPage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="./pages/Login/login-page.css">
        <user-login></user-login>
        <alert-message></alert-message>
    `;

    //Manejar el evento de login y asociar el metodo handleLogin
    this.shadowRoot.addEventListener('login:access', this.handleLogin.bind(this));
  
    this.shadowRoot.addEventListener('login:info', this.handleInfo.bind(this));
  }

  handleLogin(event) {
    this.#showAlert(event);
  }

  handleInfo(event) {
    this.#showAlert(event);
  }

  //obtener el detalle del evento
  //actualizar el componente alerta.
  #showAlert(event) {
    const alertMessage = this.shadowRoot.querySelector('alert-message');
    alertMessage.setAttribute('type', event.detail.type);
    alertMessage.setAttribute('message', event.detail.message);
  }
}

customElements.define('login-page', LoginPage);
