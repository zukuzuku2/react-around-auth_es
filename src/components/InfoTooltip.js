import React from "react";
import btnClose from "../images/closeIcon.svg";
import successIcon from "../images/succes.png";
import errorIcon from "../images/error.png";
import PopupWithForm from "./PopupWithForm";

export function InfoTooltip({ isOpen, onClose, state }) {
  return (
    <PopupWithForm
      name={`edit-profile`}
      title={`Cambiar foto de perfil`}
      isOpen={isOpen}
    >
      <div className="success">
        <img
          src={btnClose}
          alt="Boton para cerrar el modal o popup"
          className="form__close"
          onClick={onClose}
        />
        <img src={state ? successIcon : errorIcon} alt="icono de exito" />
        <h1 className="success__title">
          {" "}
          {state
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}{" "}
        </h1>
      </div>
    </PopupWithForm>
  );
}
