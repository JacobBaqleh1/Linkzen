import { useEffect, useState, useLayoutEffect } from 'react';
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
    

    return (
          <>
    {
      !loginCheck ? (
        <div>
          <h1>
            Login to create & view profile
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