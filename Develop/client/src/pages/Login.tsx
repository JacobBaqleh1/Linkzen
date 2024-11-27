import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; //Importing useNavigate from react-router-dom
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); //State to check if the user is logged in
  const navigate = useNavigate(); //Using useNavigate to redirect the user to the home page after login

  useEffect(() => {
    if (Auth.loggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate('/profile');
      console.log('User logged in successfully:', data);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  // Function to navigate to the create user page
  const handleCreateUser = () => {
    navigate('/create-user');
  };


  return (
    <div className='container'>
      {isLoggedIn ? (
        <div>
          <h1>User already logged in</h1>
          <button onClick={() => navigate('/profile')}>Go to Profile</button>
        </div>
      ) : (
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
      )}
      {!isLoggedIn && (
        <p>Don't have an account? <button onClick={handleCreateUser}>Create One</button></p>
      )}
    </div>
    
  )
};

export default Login;
