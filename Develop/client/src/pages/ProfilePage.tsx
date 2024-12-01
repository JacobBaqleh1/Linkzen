import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const ProfilePage = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if(auth.loggedIn()) {
          setLoginCheck(true);
        }
      }

      useLayoutEffect(() => {
        checkLogin();
      }, []);
    
      useEffect(() => {
        if(loginCheck) {
            console.log('Logged in');
        }
      }, [loginCheck]);
    
      const navigate = useNavigate();

      const handleLogin = () => {
          // Navigate to login page
          navigate('/login');
      };
  
      const handleCreateUser = () => {
          // Navigate to signup page
          navigate('/create-user');
      };
    return (
          <>
    {
      !loginCheck ? (
        <div>
          <h1>
            Login to create & view profile
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the LinkZen</h1>
            <button onClick={handleLogin} style={{ margin: '10px', padding: '10px 20px' }}>
                Login
            </button>
            <button onClick={handleCreateUser} style={{ margin: '10px', padding: '10px 20px' }}>
                Create User
            </button>
        </div>
          </h1>
        </div>  
      ) : (
        <div>
        <h1>You are logged into Profile Page</h1>
        </div>
      )
    }
    </>
    );
};

export default ProfilePage;