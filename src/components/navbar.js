// import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// uselocation is just use to get the pathname or we can say the location
export const Navbar = () => {
  const history = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handlelogout = () => {
    localStorage.removeItem("token");
    history("/Login")
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : " "
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : " "
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link class="btn btn-primary mx-2" to="/login" role="button">
                  Login
                </Link>
                <Link class="btn btn-primary" to="/SignUp" role="button">
                  Sign Up
                </Link>
              </form>
            ) : (
              <Link
                class="btn btn-primary"
                onClick={handlelogout}
                role="button"
              >
                Log Out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
