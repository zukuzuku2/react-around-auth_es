import { React, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <form
        className="sign-up"
        noValidate
        name="sign-up"
        onSubmit={handleSubmit}
      >
        <h1 className="sign-up-title">Regístrate</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="sign-up__input"
          minLength="2"
          maxLength="50"
          required
          // value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="sign-up__input"
          minLength="2"
          maxLength="50"
          required
        />
        <button className="sign-up__button" type="submit">
          <p className="sign-up__button-text">Regístrate</p>
        </button>
        <Link to="/signin" className="sign-up__text">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
    </>
  );
}

export default Register;
