import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { createUser } from "../api/createAPI"; // API function for user creation
import { UserData } from "../interfaces/UserData"; // Importing the UserData interface
import Auth from "../utils/auth";

const CreateUser = () => {
  const [newUser, setNewUser] = useState<UserData>({
    id: null,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      console.error("Both username and password are required");
      return;
    }
    try {
      const response = await createUser(newUser); // API call to create a new user
      console.log("User created successfully:", response);
      alert("User created successfully!");
      navigate("/login"); // Redirect to login page after successful creation
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      {isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">User already logged in</h1>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-md"
          >
            Go to Profile
          </button>
        </div>
      ) : (
        <form
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center mb-6">Create User</h1>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={newUser.username || ""}
              onChange={handleChange}
              className="w-full p-3 text-black rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={newUser.password || ""}
              onChange={handleChange}
              className="w-full p-3 text-black rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-white py-2 px-6 rounded-md w-full"
          >
            Create User
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateUser;
