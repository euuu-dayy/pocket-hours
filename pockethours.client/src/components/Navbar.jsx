import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useRef,
} from "react";

function Navbar() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const navbarRef =
    useRef(null);

  const togglerRef =
    useRef(null);

  useEffect(() => {

    const handleClickOutside =
      (event) => {

      const navbarCollapse =
        document.getElementById(
          "navbarContent"
        );

      const isOpen =
        navbarCollapse?.classList.contains(
          "show"
        );

      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(
          event.target
        )
      ) {

        togglerRef.current?.click();
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <nav
      ref={navbarRef}
      className="
        navbar
        navbar-expand-lg
        navbar-dark
        bg-dark
        fixed-top
        shadow
      "
    >

      <div className="container">

        <Link
          className="
            navbar-brand
            fw-bold
          "
          to="/"
        >
          Pocket Hours
        </Link>

        {/* MOBILE TOGGLER */}

        <button
          ref={togglerRef}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        {/* NAVBAR CONTENT */}

        <div
          className="
            collapse
            navbar-collapse
          "
          id="navbarContent"
        >

          <ul
            className="
              navbar-nav
              ms-auto
              align-items-lg-center
            "
          >

            <li className="nav-item">

              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>

            </li>

            {!token && (
              <>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>

              </>
            )}

            {token && (
              <>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/profile"
                  >
                    Profile
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/my-applications"
                  >
                    My Applications
                  </Link>

                </li>

                {user?.role ===
                  "Admin" && (

                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/admin"
                    >
                      Admin
                    </Link>

                  </li>

                )}

                <li className="nav-item">

                  <span
                    className="
                      nav-link
                      text-info
                    "
                  >
                    {user?.firstName}
                  </span>

                </li>

                <li
                  className="
                    nav-item
                    mt-2
                    mt-lg-0
                    ms-lg-2
                  "
                >

                  <button
                    className="
                      btn
                      btn-danger
                      btn-sm
                    "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </li>

              </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;