import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the LinkZen</h1>
            <button onClick={handleLogin} style={{ margin: '10px', padding: '10px 20px' }}>
                Login
            </button>
            <button onClick={handleCreateUser} style={{ margin: '10px', padding: '10px 20px' }}>
                Create User
            </button>
        </div>
    );
};

export default HomePage;