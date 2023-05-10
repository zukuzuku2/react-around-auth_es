import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Login({ isLoggedIn, isRegistered }) {
  const history = useHistory();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const [isUseEffect, setIsUseEffect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .signin(values)
      .then(() => {
        if (localStorage.getItem("token")) {
          setValues(
            {
              password: "",
              email: "",
            },
            () => {
              isLoggedIn();
              isRegistered();
              history.push("/main");
            }
          );
        }
      })
      .catch((err) => console.log(err));
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
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Contraseña"
          className="sign-in__input"
          minLength="2"
          maxLength="50"
          required
          value={values.password}
          onChange={handleChange}
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
