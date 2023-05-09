import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function Header(props) {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, []);
  return (
    <header className="header">
      <img src={props.image} alt="Banner Header" className="header__pic" />
      <div className="header__text">
        <Link to="#" className="header__mail">
          {props.email}
        </Link>
        <Link
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
          className="header__login"
        >
          {location.pathname === "/signin" ? `Iniciar Sesión` : "Regístrate"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
