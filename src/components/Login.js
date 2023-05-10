import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Login({ isLoggedIn, onSuccesPopupOpen, handleStateInfo }) {
  const history = useHistory();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const [isUseEffect, setIsUseEffect] = useState(false);

  useEffect(() => {
    if (isUseEffect) {
      setValues({
        password: "",
        email: "",
      });
      isLoggedIn();
      onSuccesPopupOpen();
      history.push("/main");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    console.log(`me ejecuto`);
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .signin(values)
      .then(() => {
        debugger;
        if (localStorage.getItem("token")) {
          setIsUseEffect(true);
        } else {
          onSuccesPopupOpen(false);
          handleStateInfo();
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
