import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { isAuth: isUserLoggedIn, logout } = useUser();

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="/" className="navbar-brand">
              Brand name
            </a>
          </div>
          <ul className="navbar-nav">
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/welcome/saman">
                  Home
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/logout" onClick={logout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <div>
        Header
        <hr />
      </div>
    </>
  );
};

export default Header;
