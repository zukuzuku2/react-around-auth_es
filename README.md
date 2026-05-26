# Around the U.S. (con Registro y Autorización)

Este proyecto es una aplicación interactiva desarrollada en **React** que representa una galería de fotos sociales de lugares interesantes en los Estados Unidos. Permite a los usuarios compartir fotos, interactuar con tarjetas (dar/quitar "me gusta"), agregar y eliminar contenido, editar su perfil de usuario (nombre, ocupación y avatar), e integra un flujo completo de **Registro y Autorización** de usuarios de forma segura mediante un backend dedicado.

---

## 🚀 Características

* **Flujo Completo de Autenticación:**
  * Registro de nuevos usuarios (`Register.js`) e Inicio de sesión (`Login.js`).
  * Rutas Protegidas (`ProtectedRoute.js`) para evitar el acceso de usuarios no autenticados a la aplicación principal.
  * Gestión de tokens persistentes de manera segura en almacenamiento local.
  * Alertas interactivas mediante modales de éxito/error (`InfoTooltip.js`) al realizar acciones críticas de autenticación.
* **Gestión de Perfil e Interacciones:**
  * Edición del perfil de usuario y avatar en tiempo real utilizando modales.
  * Crear, visualizar en pantalla completa (Lightbox) y eliminar tarjetas de lugares personalizados.
  * Sistema interactivo de likes dinámicos vinculados a la API.
* **Seguridad y Profesionalismo:**
  * Totalmente auditado y corregido a **0 vulnerabilidades activas** mediante overrides configurados en `package.json` para dependencias sensibles (`uuid`, `webpack-dev-server`, `postcss`, etc.).
  * `.gitignore` profesional que previene la filtración de credenciales, claves locales y configuraciones locales de editores a GitHub.
  * Conexión segura e integrada con variables de entorno (`.env.example`).

---

## 🛠️ Tecnologías Utilizadas

* **Framework Core:** [React 17](https://react.dev/) (Hooks: `useState`, `useEffect`, `useContext`)
* **Enrutamiento y Rutas Protegidas:** [React Router DOM v5](https://v5.reactrouter.com/) (Switch, Route, Redirect)
* **Consumo de APIs y Backend:** 
  * API de Tarjetas y Perfiles: Integrada mediante la clase `Api` (`src/utils/api.js`).
  * API de Registro y Autenticación: Consumida de forma segura a través de `src/utils/auth.js` en `https://register.nomoreparties.co`.
* **Estilado:** Vanilla CSS estructurado bajo la metodología BEM (Bloque, Elemento, Modificador) y adaptado a todas las resoluciones móviles, tablets y de escritorio.

---

## 📦 Instalación y Configuración

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/zukuzuku2/react-around-auth_es.git
   cd react-around-auth_es
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
   *Nota: Esto descargará las librerías necesarias y aplicará automáticamente las resoluciones seguras contra vulnerabilidades.*

3. **Configurar variables de entorno:**
   Copia el archivo `.env.example` para crear tu configuración local `.env`:
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con tu token y URL de la API correspondiente:
   ```env
   REACT_APP_API_TOKEN="tu-token-aqui"
   REACT_APP_API_URL="https://api.nomoreparties.co/v1/cohorte-aqui"
   ```

---

## 🖥️ Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

* ### `npm start`
  Inicia el servidor local de desarrollo.\
  Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en el navegador con soporte de recarga rápida al guardar cambios.

* ### `npm run build`
  Compila la aplicación optimizándola de forma profesional y minificada para producción en la carpeta `build/`. Listo para su despliegue seguro.

* ### `npm test`
  Inicia el ejecutor interactivo de pruebas unitarias de Jest.
