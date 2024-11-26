
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { createUser } from "../api/createAPI"; // API function for user creation
import Auth from '../utils/auth';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
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
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(userData); // API call to create a new user
      console.log("User created successfully:", response);
      navigate("/login"); // Redirect to login page after successful creation
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="container">
        {isLoggedIn ? (
        <div>
          <h1>User already logged in</h1>
          <button onClick={() => navigate('/profile')}>Go to Profile</button>
        </div>
      ) : (
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create User</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>
      )}
    </div>
  );
};

export default CreateUser;
