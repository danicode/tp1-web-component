class UserLogin extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
        <link rel="stylesheet" href="./components/UserLogin/user-login.css">
        <h1>🧊Ingresar <span id="info" title="Click para ver información">❔</span></h1>

        <form id='login-form' novalidate>
            <div class="form-group">
                <label>Usuario:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div class="form-group">
                <label>Contraseña:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

    this.shadowRoot.getElementById('info')
      .addEventListener('click', this.showInfo.bind(this))

    this.shadowRoot.getElementById('login-form')
      .addEventListener('submit', this.submitForm.bind(this));
  }

  disconnectedCallback() {
    //post entrega
    this.shadowRoot.getElementById('info').removeEventListener('click', this.showInfo.bind(this));
    this.shadowRoot.getElementById('login-form').removeEventListener('submit', this.submitForm.bind(this));
  }

  showInfo() {
    this.dispatchEvent(new CustomEvent('login:info', {
      detail: { type: 'info', message: 'ℹ️ Para ingresar <b>Usuario</b>: admin y <b>Contraseña</b>: admin :)' },
      bubbles: true,
      composed: true
    }));
  }

  submitForm(event) {
    event.preventDefault();

    const username = this.shadowRoot.querySelector('input[name="username"]').value;
    const password = this.shadowRoot.querySelector('input[name="password"]').value;

    // se obtiene el resultado de la validacion
    const { type, message } = this.#validationLogin(username, password);

    this.dispatchEvent(new CustomEvent('login:access', {
      detail: { type, message },
      bubbles: true,
      composed: true
    }));
  }

  // Logica de autenticacion
  // Dependiendo de la autenticacion se asigna un type para luego emitir el evento al padre LoginPage
  #validationLogin(username, password) {
    if (!username || !password) return { type: 'warning', message: '⚠️ Debe ingresar <b>Usuario</b> y <b>Contraseña</b>.' };
  
    if (username === 'admin' && password === 'admin') return { type: 'success', message: '✅ Inicio de sesión exitoso.' };

    return { type: 'error', message: '🔴 Error en el inicio de sesión.' };
  }
}

customElements.define('user-login', UserLogin);
