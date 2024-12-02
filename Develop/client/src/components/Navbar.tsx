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
    <div className="nav bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="nav-title text-white text-3xl font-bold">
          <Link to="/">Linkzen</Link>
        </div>
        <ul className="flex space-x-6">
          {!loginCheck ? (
            <li className="nav-item">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-600 rounded-lg px-4 py-2 font-medium transition duration-300"
              >
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
                className="text-white bg-red-700 hover:bg-red-600 rounded-lg px-4 py-2 font-medium transition duration-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
