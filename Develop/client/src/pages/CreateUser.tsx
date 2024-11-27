
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { createUser } from "../api/createAPI"; // API function for user creation
import { UserData } from "../interfaces/UserData"; // Importing the UserData interface
import Auth from '../utils/auth';

const CreateUser = () => {
  const [newUser, setNewUser] = useState<UserData>({
    id: null,
    username: '',
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
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
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
          value={newUser.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={newUser.password || ''}
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>
      )}
    </div>
  );
};

export default CreateUser;
