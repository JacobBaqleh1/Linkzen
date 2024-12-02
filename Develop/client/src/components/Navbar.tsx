import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="nav border-b-4 border-black">
      <div className="nav-title">
        <Link to="/">Linkzen</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <button
              type="button"
              onClick={() => {
                auth.logout();
                setLoginCheck(false);
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
