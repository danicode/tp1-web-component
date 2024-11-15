# tp1-web-component

## Descripción
Este proyecto consiste en la creación de componentes web personalizados utilizando la API de Custom Elements y Shadow DOM de JavaScript. Los componentes incluyen un mensaje de alerta y un formulario de inicio de sesión, integrados en una página de inicio de sesión.

## Arquitectura de Carpetas
- **components/**: Contiene los archivos JavaScript de los componentes personalizados.
  - `alert-message.js`: Componente de mensaje de alerta.
  - `user-login.js`: Componente de formulario de inicio de sesión.
  - `login-page.js`: Componente contenedor que integra los otros componentes.
- **pages/**: Contiene las páginas HTML del proyecto.
  - `index.html`: Página principal del proyecto.
- **styles/**: Contiene los archivos CSS para estilos globales y variables de colores.
  - `global.css`: Estilos globales aplicados a toda la aplicación.
  - `variables.css`: Variables de colores utilizadas en los estilos.
- **index.js**: Archivo principal de JavaScript que inicializa y configura los componentes.

## Diseño y Funcionamiento de los Componentes

### `alert-message`
Este componente muestra mensajes de alerta con diferentes estilos según el tipo de alerta (`success`, `warning`, `error`, `info`). Se oculta automáticamente si el atributo `message` está vacío o no se proporciona.

- **Atributos**:
  - `type`: Especifica el tipo de alerta (`success`, `warning`, `error`, `info`).
  - `message`: Especifica el mensaje que se mostrará en la alerta.

### `user-login`
Este componente muestra un formulario de inicio de sesión con campos para ingresar el nombre de usuario y la contraseña. Cuando se envía el formulario, emite un evento personalizado `login:access` con el resultado del inicio de sesión (`success` o `error`).

- **Eventos**:
  - `login:access`: Emitido después de que se haya enviado el formulario de inicio de sesión, proporcionando el resultado del inicio de sesión como detalle del evento.

### `login-page`
Este componente contenedor intercepta el evento `login:access` emitido por `user-login` y actualiza las propiedades de `alert-message` en función del resultado del inicio de sesión.

- **Funcionamiento**:
  - Escucha el evento `login:access` y actualiza el mensaje de alerta con el resultado del inicio de sesión.

## Estilos y Patrón Barril
Los estilos se gestionan utilizando archivos CSS globales y variables para colores. El patrón barril se utiliza para importar y organizar los archivos JavaScript y CSS de manera eficiente.
