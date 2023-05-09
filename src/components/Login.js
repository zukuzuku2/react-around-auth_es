import { React, useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        className="sign-in"
        noValidate
        name="sign-in"
        onSubmit={handleSubmit}
      >
        <h1 className="sign-in__title">{`Inicia sesión`}</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="sign-in__input"
          minLength="2"
          maxLength="50"
          required
          // value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="sign-in__input"
          minLength="2"
          maxLength="50"
          required
        />
        <button className="sign-in__button" type="submit">
          <p className="sign-in__button-text">Iniciar sesión</p>
        </button>
        <Link to="/signup" className="sign-in__text">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </>
  );
}

export default Login;
