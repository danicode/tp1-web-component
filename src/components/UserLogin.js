class UserLogin extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>

          h1 {
              color: var(--secondary-color);
              font-size: 16px;
          }

          .form-group {
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
              gap: 10px'
          }

          form {
              display: flex;
              flex-direction: column;
              padding: 20px;
              border: 1px solid var(--secondary-color);
              border-radius: 5px;
              background-color: var(--primary-color);
              gap: 10px;
          }

          form label {
              color: var(--terciary-color);
              font-size: 12px;
          }

          form input {
              background-color: var(--primary-color);
              border: 1px solid var(--secondary-color);
              padding: 5px;
              color: var(--terciary-color);
              font-size: 12px;
          }

          button {
              background-color: var(--secondary-color);
              color: var(--primary-color);
              cursor: pointer;
              border: none;
              padding: 5px;
              border-radius: 5px;
              font-size: 15px;
              font-weight: bold;
          }
      </style>

      <h1>Ingresar</h1>

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

    this.shadowRoot.getElementById('login-form')
      .addEventListener('submit', this.submitForm.bind(this));
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
    if (!username || !password) return { type: 'warning', message: 'Debe ingresar Usuario y Contraseña.' };
  
    if (username === 'admin' && password === 'admin') return { type: 'success', message: 'Inicio de sesión exitoso.' };

    return { type: 'error', message: 'Error en el inicio de sesión.' };
  }
}

customElements.define('user-login', UserLogin);
