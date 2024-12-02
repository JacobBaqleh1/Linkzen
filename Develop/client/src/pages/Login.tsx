import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  const navigate = useNavigate(); // Using useNavigate to redirect the user to the home page after login

  useEffect(() => {
    if (Auth.loggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate("/profile");
      console.log("User logged in successfully:", data);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  // Function to navigate to the create user page
  const handleCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        {isLoggedIn ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">User already logged in</h1>
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-md"
            >
              Go to Profile
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={loginData.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md focus:outline-none"
            >
              Submit
            </button>
          </form>
        )}

        {!isLoggedIn && (
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              onClick={handleCreateUser}
              className="text-blue-400 hover:text-blue-300"
            >
              Create One
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
